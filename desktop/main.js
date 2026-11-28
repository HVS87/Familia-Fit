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
   · ligações externas abrem no browser do sistema, nunca dentro do programa;
   · atualiza-se sem reinstalar (ver «Atualizações», mais abaixo). */
const {app, BrowserWindow, protocol, net, screen, ipcMain, shell, Menu, dialog} = require('electron');
const path=require('path');
const fs=require('fs');
const {pathToFileURL}=require('url');
const crypto=require('crypto');

/* O AppImage corre sem instalar, e no Ubuntu 24.04 e seguintes o sistema
   recusa a caixa de areia do Chromium a programas que não vêm de um pacote.
   Só nesse caso se desliga — o .deb e os outros sistemas ficam com ela. */
if(process.platform==='linux' && process.env.APPIMAGE) app.commandLine.appendSwitch('no-sandbox');
protocol.registerSchemesAsPrivileged([{scheme:'app', privileges:{standard:true, secure:true, supportFetchAPI:true, corsEnabled:true, stream:true}}]);

/* A app que o programa serve: a que veio com ele, ou uma mais recente que ele
   próprio descarregou (ver «Atualizações»). */
const RAIZ_EMBUTIDA=path.join(__dirname,'app');
let RAIZ=RAIZ_EMBUTIDA;
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
    w.webContents.on('render-process-gone', ()=>{});
    w.on('closed',()=>{ segundo=null; });
  });
  wc.on('will-navigate', soDentro);
  /* A app pede confirmação para sair quando há dados sem cópia exportada. Num
     browser isso é a caixa do próprio browser; aqui, sem resposta, o fecho era
     anulado em silêncio e a janela não fechava pelo X. Pergunta-se em
     português, e os dados ficam gravados neste computador de qualquer forma. */
  wc.on('will-prevent-unload', e=>{
    if(_aReiniciar) return e.preventDefault();
    if(process.env.FFIT_AUTOTESTE){ global.__perguntouSair=true; return e.preventDefault(); }
    const r=dialog.showMessageBoxSync(principal,{type:'question', buttons:['Sair','Ficar'], defaultId:0, cancelId:1,
      title:'Família Fit', message:'Sair da Família Fit?',
      detail:'Os dados estão gravados neste computador. Ainda não exportaste uma cópia de segurança desde a última alteração — podes fazê-lo em Definições.'});
    if(r===0) e.preventDefault();
  });
  /* uma versão descarregada que rebenta antes de dizer «arranquei» volta atrás */
  wc.on('render-process-gone', ()=>{ if(aExperimentar()) reverter('a página da versão nova terminou'); });
  wc.on('did-fail-load', (e,code,desc,url,principalFrame)=>{ if(principalFrame && code!==-3 && aExperimentar()) reverter('a versão nova não carregou ('+desc+')'); });
  wc.on('did-finish-load', ()=>{ _aReiniciar=false; });
  principal.on('close', guardarJanela);
  principal.on('closed',()=>{ principal=null; if(segundo && !segundo.isDestroyed()) segundo.close(); });
}

/* ================= ATUALIZAÇÕES =================
   A app (o index.html e os ícones) atualiza-se sozinha: o programa lê o
   versao.json do site, descarrega os ficheiros novos para a pasta do
   programa (userData/atualizacoes/<versão>), confere cada um pela impressão
   digital SHA-256 anunciada e passa a servi-los no MESMO endereço app://fit.
   O armazenamento local é o desse endereço — os dados e as preferências
   ficam exatamente onde estavam.

   Segurança contra uma versão estragada: até a página nova dizer
   «arranquei» (fitDesktop.atualizacoes.arrancou), está a ser experimentada.
   Se não o disser em 30 s, se a página rebentar ou não carregar, a versão é
   marcada como má e o programa volta à anterior.

   O programa em si (esta casca) muda raramente. Quando muda: o instalador do
   Windows corre por cima em silêncio e reabre o programa; o AppImage do Linux
   troca-se pelo novo; nos outros formatos (portátil, .deb, macOS) abre-se a
   página da versão. Tudo confere pela impressão digital publicada na
   release (programa.json). */
const urlVersao=()=>process.env.FFIT_URL_VERSAO||'https://hvs87.github.io/Familia-Fit/versao.json';
const urlReleases=()=>process.env.FFIT_URL_RELEASES||(PAGINA_PROJETO+'/releases/download/');
const ESPERA_ARRANQUE=()=>+process.env.FFIT_UPD_ESPERA||30000;
const PASTA_UPD=()=>path.join(app.getPath('userData'),'atualizacoes');
const FICH_UPD=()=>path.join(PASTA_UPD(),'estado.json');
const NOME_OK=/^[A-Za-z0-9._-]+$/, VERSAO_OK=/^[0-9]+([.-][0-9]+)*$/;
let _remoto=null, _aReiniciar=false, _vigiaArranque=null;
function versaoDe(raiz){ try{ const m=/const VERSAO_APP='([^']+)'/.exec(fs.readFileSync(path.join(raiz,'index.html'),'utf8')); return m? m[1] : '0'; }catch(e){ return '0'; } }
function cmpVersao(a,b){
  const pa=String(a||'0').split(/[.-]/).map(n=>parseInt(n,10)||0), pb=String(b||'0').split(/[.-]/).map(n=>parseInt(n,10)||0);
  for(let i=0;i<Math.max(pa.length,pb.length);i++){ const d=(pa[i]||0)-(pb[i]||0); if(d) return d>0? 1 : -1; }
  return 0;
}
function lerUpd(){ try{ return JSON.parse(fs.readFileSync(FICH_UPD(),'utf8'))||{}; }catch(e){ return {}; } }
function gravarUpd(o){ fs.mkdirSync(PASTA_UPD(),{recursive:true}); fs.writeFileSync(FICH_UPD(), JSON.stringify(o,null,1)); }
function versaoEmbutida(){ return versaoDe(RAIZ_EMBUTIDA); }
function versaoConteudo(){ return versaoDe(RAIZ); }
/* Uma versão descarregada serve se: não foi marcada como má, é mais recente
   do que a que veio com o programa, este programa é novo que chegue para
   ela, e os ficheiros estão lá e são dessa versão. */
function serve(v, e){
  if(!v || !VERSAO_OK.test(v) || (e.mas||[]).indexOf(v)>=0) return null;
  if(cmpVersao(v, versaoEmbutida())<=0) return null;
  const min=(e.minimos||{})[v]; if(min && cmpVersao(app.getVersion(), min)<0) return null;
  const p=path.join(PASTA_UPD(), v);
  return fs.existsSync(path.join(p,'index.html')) && versaoDe(p)===v? p : null;
}
function escolherRaiz(){ const e=lerUpd(); RAIZ=serve(e.versao,e) || serve(e.anterior,e) || RAIZ_EMBUTIDA; }
function aExperimentar(){ const e=lerUpd(); return RAIZ!==RAIZ_EMBUTIDA && e.confirmada!==versaoConteudo(); }
function vigiarArranque(){
  clearTimeout(_vigiaArranque);
  if(aExperimentar()) _vigiaArranque=setTimeout(()=>reverter('não arrancou em '+Math.round(ESPERA_ARRANQUE()/1000)+' segundos'), ESPERA_ARRANQUE());
}
function reverter(motivo){
  clearTimeout(_vigiaArranque);
  const e=lerUpd(), v=versaoConteudo();
  if(RAIZ===RAIZ_EMBUTIDA) return;
  e.mas=(e.mas||[]).concat(v).slice(-10); e.motivo=v+': '+motivo; gravarUpd(e);
  console.error('Família Fit — atualização '+v+' revertida: '+motivo);
  escolherRaiz(); vigiarArranque(); recarregarJanelas();
}
function recarregarJanelas(){
  _aReiniciar=true;
  if(segundo && !segundo.isDestroyed()) segundo.webContents.reload();
  if(principal && !principal.isDestroyed()) principal.loadURL(ENDERECO);
}
function limparAntigas(){
  const e=lerUpd(), fica=[e.versao, e.anterior].filter(Boolean);
  try{ fs.readdirSync(PASTA_UPD()).forEach(n=>{ if(n!=='estado.json' && fica.indexOf(n)<0) fs.rmSync(path.join(PASTA_UPD(),n),{recursive:true, force:true}); }); }catch(err){}
}
function modoPrograma(){
  if(process.platform==='win32' && !process.env.PORTABLE_EXECUTABLE_FILE
     && fs.existsSync(path.join(path.dirname(process.execPath),'Uninstall Familia Fit.exe'))) return 'instalador';
  if(process.platform==='linux' && process.env.APPIMAGE) return 'appimage';
  return 'pagina';
}
async function lerJson(url){
  const r=await net.fetch(url+(url.indexOf('?')<0?'?':'&')+'t='+Date.now(), {cache:'no-store'});
  if(!r.ok) throw new Error('o site respondeu '+r.status);
  return r.json();
}
const sha256=buf=>crypto.createHash('sha256').update(buf).digest('hex');
function ligarAtualizacoes(){
  ipcMain.on('upd-modo', e=>{ e.returnValue=modoPrograma(); });
  ipcMain.on('upd-arrancou', (ev,v)=>{
    if(ev.sender!==(principal&&principal.webContents)) return;
    clearTimeout(_vigiaArranque);
    const e=lerUpd();
    if(RAIZ!==RAIZ_EMBUTIDA && v===versaoConteudo() && e.confirmada!==v){ e.confirmada=v; gravarUpd(e); limparAntigas(); }
  });
  ipcMain.handle('upd-procurar', async()=>{
    try{
      const j=await lerJson(urlVersao());
      if(!j || !VERSAO_OK.test(j.versao||'')) return {erro:'resposta inválida do site'};
      _remoto=j;
      const atual=versaoConteudo(), e=lerUpd();
      const nova= cmpVersao(j.versao, atual)>0 && (e.mas||[]).indexOf(j.versao)<0;
      const precisa= !!(j.programaMinimo && cmpVersao(app.getVersion(), j.programaMinimo)<0);
      const pend= e.versao && e.versao!==atual && serve(e.versao,e)? e.versao : '';
      return {atual, disponivel: nova && !precisa? j.versao : '', pronta:pend, precisaPrograma: nova && precisa, notas: String(j.notas||'').slice(0,400),
        programa:{atual:app.getVersion(), disponivel: j.programa && VERSAO_OK.test(j.programa) && cmpVersao(j.programa, app.getVersion())>0? j.programa : '', modo:modoPrograma()}};
    }catch(err){ return {erro:String(err&&err.message||err)}; }
  });
  ipcMain.handle('upd-descarregar', async()=>{
    const j=_remoto; if(!j) return {erro:'procura primeiro'};
    const nomes=Object.keys(j.ficheiros||{});
    if(nomes.indexOf('index.html')<0) return {erro:'a versão anunciada não traz o index.html'};
    if(nomes.some(n=>!NOME_OK.test(n) || !/^[0-9a-f]{64}$/.test(String(j.ficheiros[n])))) return {erro:'a lista de ficheiros é inválida'};
    const base=new URL('./', urlVersao()).href;
    const tmp=path.join(PASTA_UPD(), j.versao+'.parcial');
    try{
      fs.rmSync(tmp,{recursive:true, force:true}); fs.mkdirSync(tmp,{recursive:true});
      for(const n of nomes){
        const r=await net.fetch(base+n+'?v='+encodeURIComponent(j.versao), {cache:'no-store'});
        if(!r.ok) throw new Error(n+': o site respondeu '+r.status);
        const buf=Buffer.from(await r.arrayBuffer());
        if(sha256(buf)!==j.ficheiros[n]) throw new Error(n+' não confere com a impressão digital anunciada — o site pode estar a meio de uma publicação');
        fs.writeFileSync(path.join(tmp,n), buf);
      }
      if(versaoDe(tmp)!==j.versao) throw new Error('o index.html descarregado não é da versão anunciada');
      const dest=path.join(PASTA_UPD(), j.versao);
      fs.rmSync(dest,{recursive:true, force:true}); fs.renameSync(tmp, dest);
      const e=lerUpd(), atual=versaoConteudo();
      const minimos=Object.assign({}, e.minimos||{}); if(j.programaMinimo) minimos[j.versao]=j.programaMinimo;
      gravarUpd({versao:j.versao, anterior: RAIZ!==RAIZ_EMBUTIDA? atual : '', confirmada:e.confirmada||'', mas:(e.mas||[]).filter(v=>v!==j.versao),
        minimos, descarregadaEm:new Date().toISOString()});
      return {ok:true, versao:j.versao};
    }catch(err){ fs.rmSync(tmp,{recursive:true, force:true}); return {erro:String(err&&err.message||err)}; }
  });
  ipcMain.on('upd-reiniciar', ev=>{
    if(ev.sender!==(principal&&principal.webContents)) return;
    escolherRaiz(); vigiarArranque(); recarregarJanelas();
  });
  /* a cópia de segurança antes de cada atualização: fica na pasta do
     programa, as cinco mais recentes */
  ipcMain.handle('upd-copia', (ev,txt)=>{
    try{
      if(typeof txt!=='string' || !txt.length || txt.length>80e6) return {erro:'cópia inválida'};
      const d=path.join(app.getPath('userData'),'copias'); fs.mkdirSync(d,{recursive:true});
      const f=path.join(d,'antes-de-atualizar-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json');
      fs.writeFileSync(f, txt);
      fs.readdirSync(d).filter(x=>x.startsWith('antes-de-atualizar-')).sort().slice(0,-5).forEach(x=>fs.rmSync(path.join(d,x),{force:true}));
      return {ok:true, ficheiro:f};
    }catch(err){ return {erro:String(err&&err.message||err)}; }
  });
  ipcMain.handle('upd-programa', async()=>{
    const j=_remoto; if(!j || !j.programa) return {erro:'procura primeiro'};
    const etiqueta=j.etiqueta && NOME_OK.test(j.etiqueta)? j.etiqueta : 'v'+j.programa;
    const pagina=PAGINA_PROJETO+'/releases/tag/'+encodeURIComponent(etiqueta);
    const modo=modoPrograma();
    if(modo==='pagina'){ shell.openExternal(pagina); return {pagina:true}; }
    try{
      const base=urlReleases()+encodeURIComponent(etiqueta)+'/';
      const info=await lerJson(base+'programa.json');
      const f=info && info.ficheiros && info.ficheiros[modo];
      if(!f || !NOME_OK.test(f.nome||'') || !/^[0-9a-f]{64}$/.test(f.sha256||'')) throw new Error('a versão nova não traz este formato');
      const r=await net.fetch(base+f.nome); if(!r.ok) throw new Error('a descarga respondeu '+r.status);
      const buf=Buffer.from(await r.arrayBuffer());
      if(sha256(buf)!==f.sha256) throw new Error('o ficheiro descarregado não confere com a impressão digital publicada');
      if(modo==='instalador'){
        const dest=path.join(app.getPath('temp'), f.nome); fs.writeFileSync(dest, buf);
        /* o instalador fecha o programa, instala por cima na mesma pasta (os
           dados estão noutra, que não toca) e volta a abri-lo */
        require('child_process').spawn(dest, ['/S','--updated','--force-run'], {detached:true, stdio:'ignore'}).unref();
        _aReiniciar=true; setTimeout(()=>app.quit(), 400);
        return {ok:true};
      }
      if(modo==='appimage'){
        const alvo=process.env.APPIMAGE, novo=alvo+'.novo';
        fs.writeFileSync(novo, buf, {mode:0o755}); fs.renameSync(novo, alvo);
        _aReiniciar=true; app.relaunch({execPath:alvo, args:process.argv.slice(1)}); setTimeout(()=>app.exit(0), 200);
        return {ok:true};
      }
      return {erro:'formato desconhecido'};
    }catch(err){ shell.openExternal(pagina); return {erro:String(err&&err.message||err), pagina:true}; }
  });
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
    {label:'Procurar atualizações', click:()=>correr('go("dados"); procurarAtualizacoes(true)')},
    {label:'Página do projeto', click:()=>shell.openExternal(PAGINA_PROJETO)},
    {type:'separator'}, {label:'Versão '+app.getVersion(), enabled:false}]});
  return Menu.buildFromTemplate(t);
}

app.whenReady().then(()=>{
  escolherRaiz();
  ligarAtualizacoes();
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
  vigiarArranque();
  if(process.env.FFIT_AUTOTESTE) require('./autoteste.js')({app, BrowserWindow, screen, fs, principal, segundoAtual:()=>segundo, principalAtual:()=>principal});
});
app.on('window-all-closed',()=>{ if(!ehMac && !process.env.FFIT_AUTOTESTE) app.quit(); });
app.on('activate',()=>{ if(!principal) criarPrincipal(); });
