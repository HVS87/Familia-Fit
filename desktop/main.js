/* Família Fit — versão para computador (Windows, macOS e Linux).

   É a mesma app da web, num ficheiro só, servida de dentro do programa por um
   endereço próprio (app://fit). Com uma origem fixa e segura, o
   armazenamento local persiste entre arranques e a cifra da sincronização
   (WebCrypto) funciona como num site com https.

   O que o computador acrescenta:
   · sabe quantos monitores há e onde estão, e abre a janela companheira (o
     segundo ecrã) maximizada no outro monitor — e trá-la para o principal se
     esse monitor for desligado;
   · lembra-se do tamanho e do sítio da janela;
   · uma só instância: abrir o programa outra vez traz a janela à frente;
   · ligações externas abrem no browser do sistema, nunca dentro do programa. */
const {app, BrowserWindow, protocol, net, screen, ipcMain, shell, Menu, dialog} = require('electron');
const path=require('path');
const fs=require('fs');
const {pathToFileURL}=require('url');

/* O AppImage corre sem instalar, e no Ubuntu 24.04 e seguintes o sistema
   recusa a caixa de areia do Chromium a programas que não vêm de um pacote.
   Só nesse caso se desliga — o .deb e os outros sistemas ficam com ela. */
if(process.platform==='linux' && process.env.APPIMAGE) app.commandLine.appendSwitch('no-sandbox');
protocol.registerSchemesAsPrivileged([{scheme:'app', privileges:{standard:true, secure:true, supportFetchAPI:true, corsEnabled:true, stream:true}}]);

const RAIZ=path.join(__dirname,'app');
const ENDERECO='app://fit/index.html';
const PAGINA_PROJETO='https://github.com/HVS87/Familia-Fit';
const ehMac=process.platform==='darwin';
let principal=null, segundo=null;

/* O nome interno do programa é ASCII («Familia Fit»): no macOS, um acento no
   nome dos executáveis auxiliares fazia o Electron não os encontrar e abortar
   ao arrancar. Os dados continuam na pasta «Família Fit» de sempre. */
app.setName('Família Fit');
if(!process.env.FFIT_AUTOTESTE) app.setPath('userData', path.join(app.getPath('appData'), 'Família Fit'));
/* o autoteste corre num perfil descartável: nunca toca nos dados de quem usa o programa */
if(process.env.FFIT_AUTOTESTE) app.setPath("userData", path.join(require("os").tmpdir(), "ffit-autoteste-"+process.pid));
if(!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance',()=>{ if(!principal) return; if(principal.isMinimized()) principal.restore(); principal.show(); principal.focus(); });
if(process.platform==='win32') app.setAppUserModelId('pt.familiafit.app');

/* ---- o tamanho e o sítio da janela ---- */
const FICH_JANELA=()=>path.join(app.getPath('userData'),'janela.json');
function lerJanela(){
  try{ const j=JSON.parse(fs.readFileSync(FICH_JANELA(),'utf8'));
    /* só se repõe a posição se ainda couber num dos ecrãs ligados — um monitor
       que já não existe deixava a janela fora do alcance */
    const dentro=screen.getAllDisplays().some(d=>{ const a=d.workArea;
      return j.x>=a.x-40 && j.y>=a.y-40 && j.x<a.x+a.width-100 && j.y<a.y+a.height-100; });
    return dentro? j : {w:j.w, h:j.h, max:j.max};
  }catch(e){ return {}; }
}
function guardarJanela(){
  if(!principal || principal.isDestroyed()) return;
  const b=principal.getNormalBounds();
  try{ fs.writeFileSync(FICH_JANELA(), JSON.stringify({x:b.x, y:b.y, w:b.width, h:b.height, max:principal.isMaximized()})); }catch(e){}
}

/* ---- os ecrãs ---- */
function ecraDe(janela){ return janela && !janela.isDestroyed()? screen.getDisplayMatching(janela.getBounds()) : screen.getPrimaryDisplay(); }
function outroEcra(){ const aqui=ecraDe(principal); return screen.getAllDisplays().find(d=>d.id!==aqui.id) || null; }
function opcoesSegundo(){
  const d=outroEcra(), a=(d||ecraDe(principal)).workArea;
  const w=d? a.width : Math.round(a.width*0.55), h=d? a.height : Math.round(a.height*0.85);
  return {x: d? a.x : a.x+a.width-w-24, y: d? a.y : a.y+24, width:w, height:h, minWidth:420, minHeight:500,
    title:'Família Fit — segundo ecrã', autoHideMenuBar:true, backgroundColor:'#11161c', icon:icone(),
    webPreferences:{preload:path.join(__dirname,'preload.js'), contextIsolation:true, sandbox:true}};
}
function trazerSegundoParaAqui(){
  if(!segundo || segundo.isDestroyed() || outroEcra()) return;
  const a=ecraDe(principal).workArea;
  if(segundo.isMaximized()) segundo.unmaximize();
  segundo.setBounds({x:a.x+a.width-Math.round(a.width*0.55)-24, y:a.y+24, width:Math.round(a.width*0.55), height:Math.round(a.height*0.85)});
}
function avisarEcras(){
  const n=screen.getAllDisplays().length;
  BrowserWindow.getAllWindows().forEach(w=>{ try{ w.webContents.send('ecras-mudaram', n); }catch(e){} });
}

function soDentro(e,url){ if(!url.startsWith('app://fit/')){ e.preventDefault(); if(/^https?:/i.test(url)) shell.openExternal(url); } }
function icone(){ const p=path.join(__dirname,'app','icon-512.png'); return fs.existsSync(p)? p : undefined; }
function criarPrincipal(){
  const j=lerJanela();
  principal=new BrowserWindow({width:j.w||1380, height:j.h||900, x:j.x, y:j.y, minWidth:380, minHeight:560,
    title:'Família Fit', backgroundColor:'#11161c', icon:icone(), autoHideMenuBar:!ehMac, show:false,
    webPreferences:{preload:path.join(__dirname,'preload.js'), contextIsolation:true, sandbox:true, spellcheck:true}});
  if(j.max) principal.maximize();
  principal.once('ready-to-show',()=>principal.show());
  principal.loadURL(ENDERECO);
  const wc=principal.webContents;
  /* a app abre o segundo ecrã com window.open(«?ecra=2»): é aqui que se decide
     em que monitor nasce */
  wc.setWindowOpenHandler(({url})=>{
    if(url.startsWith('app://fit/') && /[?&]ecra=2(&|$)/.test(url)) return {action:'allow', overrideBrowserWindowOptions:opcoesSegundo()};
    if(/^(https?|mailto):/i.test(url)) shell.openExternal(url);
    return {action:'deny'};
  });
  wc.on('did-create-window', w=>{
    segundo=w;
    if(outroEcra()) w.maximize();
    w.webContents.setWindowOpenHandler(({url})=>{ if(/^(https?|mailto):/i.test(url)) shell.openExternal(url); return {action:'deny'}; });
    w.webContents.on('will-navigate', soDentro);
    w.webContents.on('will-prevent-unload', e=>e.preventDefault());
    w.on('closed',()=>{ segundo=null; });
  });
  wc.on('will-navigate', soDentro);
  /* A app pede confirmação para sair quando há dados sem cópia exportada. Num
     browser isso é a caixa do próprio browser; aqui, sem resposta, o fecho era
     anulado em silêncio e a janela não fechava pelo X. Pergunta-se em
     português, e os dados ficam gravados neste computador de qualquer forma. */
  wc.on('will-prevent-unload', e=>{
    if(process.env.FFIT_AUTOTESTE){ global.__perguntouSair=true; return e.preventDefault(); }
    const r=dialog.showMessageBoxSync(principal,{type:'question', buttons:['Sair','Ficar'], defaultId:0, cancelId:1,
      title:'Família Fit', message:'Sair da Família Fit?',
      detail:'Os dados estão gravados neste computador. Ainda não exportaste uma cópia de segurança desde a última alteração — podes fazê-lo em Definições.'});
    if(r===0) e.preventDefault();
  });
  principal.on('close', guardarJanela);
  principal.on('closed',()=>{ principal=null; if(segundo && !segundo.isDestroyed()) segundo.close(); });
}

/* ---- menu, em português, com os atalhos do sistema ---- */
function correr(js){ const w=BrowserWindow.getFocusedWindow()||principal; if(w) w.webContents.executeJavaScript(js).catch(()=>{}); }
function menu(){
  const mod=ehMac? 'Cmd' : 'Ctrl';
  const t=[];
  if(ehMac) t.push({label:'Família Fit', submenu:[{role:'about', label:'Acerca da Família Fit'},{type:'separator'},
    {role:'hide', label:'Ocultar'},{role:'hideOthers', label:'Ocultar os outros'},{role:'unhide', label:'Mostrar tudo'},{type:'separator'},{role:'quit', label:'Sair'}]});
  t.push({label:'Ficheiro', submenu:[
    {label:'Procurar ou registar', accelerator:mod+'+K', click:()=>correr('abrirPesquisa()')},
    {label:'Segundo ecrã', accelerator:mod+'+Shift+2', click:()=>correr('abrirSegundoEcra()')},
    {type:'separator'},
    ehMac? {role:'close', label:'Fechar janela'} : {role:'quit', label:'Sair'}]});
  t.push({label:'Editar', submenu:[{role:'undo', label:'Desfazer'},{role:'redo', label:'Refazer'},{type:'separator'},
    {role:'cut', label:'Cortar'},{role:'copy', label:'Copiar'},{role:'paste', label:'Colar'},{role:'selectAll', label:'Selecionar tudo'}]});
  t.push({label:'Ver', submenu:[{role:'reload', label:'Recarregar'},{type:'separator'},
    {role:'resetZoom', label:'Tamanho real'},{role:'zoomIn', label:'Aumentar'},{role:'zoomOut', label:'Diminuir'},{type:'separator'},
    {role:'togglefullscreen', label:'Ecrã inteiro'}]});
  t.push({label:'Janela', submenu:[{role:'minimize', label:'Minimizar'},{role:'zoom', label:'Ampliar'},{role:'close', label:'Fechar'}]});
  t.push({label:'Ajuda', submenu:[{label:'Ajuda da app', click:()=>correr('abrirAjuda()')},
    {label:'Página do projeto', click:()=>shell.openExternal(PAGINA_PROJETO)},
    {type:'separator'}, {label:'Versão '+app.getVersion(), enabled:false}]});
  return Menu.buildFromTemplate(t);
}

app.whenReady().then(()=>{
  protocol.handle('app', req=>{
    const u=new URL(req.url);
    let p=decodeURIComponent(u.pathname); if(!p || p==='/') p='/index.html';
    const f=path.normalize(path.join(RAIZ,p));
    if((f!==RAIZ && !f.startsWith(RAIZ+path.sep)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return new Response('Não encontrado',{status:404});
    return net.fetch(pathToFileURL(f).toString());
  });
  ipcMain.on('ecras', e=>{ e.returnValue=screen.getAllDisplays().length; });
  ipcMain.on('versao', e=>{ e.returnValue=app.getVersion(); });
  ['display-added','display-removed','display-metrics-changed'].forEach(ev=>screen.on(ev,()=>{ avisarEcras(); trazerSegundoParaAqui(); }));
  Menu.setApplicationMenu(menu());
  criarPrincipal();
  if(process.env.FFIT_AUTOTESTE) require('./autoteste.js')({app, BrowserWindow, screen, fs, principal, segundoAtual:()=>segundo});
});
app.on('window-all-closed',()=>{ if(!ehMac && !process.env.FFIT_AUTOTESTE) app.quit(); });
app.on('activate',()=>{ if(!principal) criarPrincipal(); });
