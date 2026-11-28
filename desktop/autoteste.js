/* Autoteste da versão para computador. Corre só com FFIT_AUTOTESTE=<ficheiro>:
   arranca o programa, verifica a app e o segundo ecrã por dentro, escreve o
   resultado nesse ficheiro e sai. É o que a QA usa para testar o .exe tal
   como sai do empacotamento. */
module.exports=async function({app, BrowserWindow, screen, fs, principal, segundoAtual}){
  const path=require('path'), os=require('os'), http=require('http'), crypto=require('crypto');
  const out={versao:app.getVersion(), plataforma:process.platform, ecras:screen.getAllDisplays().length, ok:[], falhas:[]};
  const regista=(n,c,x)=>(c? out.ok : out.falhas).push(n+(x!==undefined? ' · '+JSON.stringify(x) : ''));
  const espera=ms=>new Promise(r=>setTimeout(r,ms));
  const erros=[];
  const ouvir=wc=>wc.on('console-message',(ev,...a)=>{ const lvl=ev&&ev.level!==undefined? ev.level : a[0], msg=ev&&ev.message!==undefined? ev.message : a[1];
    if(lvl===3||lvl==='error') erros.push(String(msg).slice(0,200)); });
  ouvir(principal.webContents);
  const fim=()=>{ try{ fs.writeFileSync(process.env.FFIT_AUTOTESTE, JSON.stringify(out,null,1)); }catch(e){} app.exit(out.falhas.length? 1 : 0); };
  setTimeout(()=>{ regista('autoteste dentro do tempo', false); fim(); }, 200000);
  try{
    if(principal.webContents.isLoading()) await new Promise(r=>principal.webContents.once('did-finish-load',r));
    await espera(2500);
    const js=c=>principal.webContents.executeJavaScript(c,true);
    regista('a app carrega', await js('typeof RECIPES!=="undefined" && RECIPES.length>1000'), await js('typeof RECIPES!=="undefined"? RECIPES.length : 0'));
    regista('título da janela', principal.getTitle().indexOf('Família Fit')>=0, principal.getTitle());
    regista('ponte do computador', await js('!!window.fitDesktop && typeof window.fitDesktop.ecras==="function" && window.fitDesktop.ecras()>=1'));
    regista('origem segura para a cifra', await js('isSecureContext && !!(window.crypto&&crypto.subtle)'));
    regista('armazenamento local', await js('(()=>{ try{ localStorage.setItem("__ffit_t","1"); const ok=localStorage.getItem("__ffit_t")==="1"; localStorage.removeItem("__ffit_t"); return ok; }catch(e){ return false; } })()'));
    regista('botão do segundo ecrã visível', await js('!document.getElementById("btn-ecra2").hidden'));
    regista('cartão da versão para computador', await js('(go("dados"), /Versão para computador/.test(document.querySelector("main").innerText))'));
    regista('cartão da sincronização', await js('!!document.querySelector("[data-col=dados-sync]")'));
    regista('QR gerado', await js('qrSvg("https://exemplo.pt/#par=ABCDEFGHJKMNPQRS").indexOf("<svg")===0'));
    /* definições e acessibilidade */
    regista('roda dentada no botão das definições', await js('!!document.querySelector("#btn-defs svg path") && /^M10\.22/.test(document.querySelector("#btn-defs svg path").getAttribute("d"))'));
    regista('cartão de acessibilidade', await js('(go("dados"), !!document.querySelector("[data-col=dados-acess]"))'));
    const corOk=await js('(setVisao("rg"), getComputedStyle(document.documentElement).getPropertyValue("--ok").trim())');
    regista('modo vermelho-verde troca as cores de estado', ['#0A63BD','#8FC8F0'].indexOf(corOk.toUpperCase())>=0, corOk);
    await js('setVisao("normal")');
    const zoom=await js('(setLetra("maior"), [getComputedStyle(document.getElementById("main")).zoom, getComputedStyle(document.querySelector("header")).zoom].join("/"))');
    regista('letra maior amplia o conteúdo e não o cabeçalho', zoom==='1.25/1', zoom);
    const bolha=await js('(()=>{ go("dados"); const d=[...document.querySelectorAll("main .dica")].find(x=>x.getBoundingClientRect().width>0&&x.querySelector(".dica-bolha")); if(!d) return -1; d.scrollIntoView({block:"center"}); posicionaDica(d); d.classList.add("on"); const i=d.getBoundingClientRect(), b=d.querySelector(".dica-bolha").getBoundingClientRect(); d.classList.remove("on"); return Math.round(Math.min(Math.abs(b.top-i.bottom),Math.abs(i.top-b.bottom))); })()');
    regista('com letra maior, a bolha «i» abre junto do ícone', bolha>=0 && bolha<=20, bolha);
    await js('setLetra("normal")');
    regista('aviso: sem fins lucrativos e sem recolha de dados', await js('/sem fins lucrativos/.test(avisoResponsabilidade()) && /não recolhe nenhuns dados/.test(avisoResponsabilidade())'));
    await js('go("hoje")');
    await js('abrirSegundoEcra()'); await espera(3500);
    const seg=segundoAtual();
    regista('abre o segundo ecrã', !!seg);
    if(seg){
      ouvir(seg.webContents);
      if(seg.webContents.isLoading()) await new Promise(r=>seg.webContents.once('did-finish-load',r));
      await espera(1500);
      const js2=c=>seg.webContents.executeJavaScript(c,true);
      regista('segundo ecrã em modo companheiro', await js2('ECRA2===true && !!document.querySelector(".e2-barra")'));
      regista('principal sabe que está aberto', await js('_ecra2Aberto===true'));
      await js('go("plano")'); await espera(1200);
      regista('acompanha: Refeições → compras', (await js2('S.ui.tab'))==='mercearia', await js2('S.ui.tab'));
      await js('go("receitas"); abrirFicha(RECIPES[0].id,2)'); await espera(1200);
      regista('acompanha: ficha → modo cozinha', !!(await js2('S.ui.cozinha && S.ui.cozinha.r')));
      await js('fecharFicha()');
      await js('setVisao("tri"); setLetra("grande")'); await espera(1500);
      const e2=await js2('document.documentElement.dataset.visao+"/"+document.documentElement.dataset.letra');
      regista('acompanha: visão das cores e letra', e2==='tri/grande', e2);
      await js('setVisao("normal"); setLetra("normal")');
      if(out.ecras>1){ const d=screen.getDisplayMatching(seg.getBounds()), p=screen.getDisplayMatching(principal.getBounds());
        regista('nasce no outro monitor', d.id!==p.id, {segundo:d.id, principal:p.id}); }
      else regista('com um só ecrã, abre ao lado no mesmo', true);
      seg.close(); await espera(1500);
      regista('ao fechar, o principal dá por isso', (await js('_ecra2Aberto'))===false);
    }
    /* ---- atualizações ----
       Um servidor local faz de site com duas versões «novas»: uma boa e uma
       estragada (nunca diz «arranquei»). Passa-se pelo ciclo inteiro: procurar,
       descarregar e conferir, trocar, ver que os dados e as preferências
       ficaram, a cópia de segurança, e o regresso à anterior quando a nova não
       arranca. */
    regista('ponte das atualizações', await js('typeof window.fitDesktop.atualizacoes.procurar==="function" && typeof procurarAtualizacoes==="function"'));
    regista('cartão de atualizações nas definições', await js('(go("dados"), !!document.querySelector("[data-col=dados-upd]"))'));
    regista('procurar ao iniciar, ligado por omissão', await js('updAoIniciar()===true'));
    const pasta=fs.mkdtempSync(path.join(os.tmpdir(),'ffit-upd-')), appDir=path.join(__dirname,'app');
    const fazer=(v,estragada)=>{ const d=path.join(pasta,v); fs.mkdirSync(d,{recursive:true}); const fich={};
      for(const n of fs.readdirSync(appDir)){ let b=fs.readFileSync(path.join(appDir,n));
        if(n==='index.html'){ let t=b.toString('utf8').replace(/const VERSAO_APP='[^']+'/, "const VERSAO_APP='"+v+"'");
          if(estragada) t=t.replace('window.fitDesktop.atualizacoes.arrancou(VERSAO_APP)','0');
          b=Buffer.from(t,'utf8'); }
        fs.writeFileSync(path.join(d,n),b); fich[n]=crypto.createHash('sha256').update(b).digest('hex'); }
      fs.writeFileSync(path.join(d,'versao.json'), JSON.stringify({versao:v, programa:app.getVersion(), etiqueta:'v0', programaMinimo:app.getVersion(), notas:'versão de teste', ficheiros:fich})); };
    fazer('2999.1.1'); fazer('2999.2.2', true);
    let servir='2999.1.1';
    const srv=http.createServer((q,r)=>{ const n=decodeURIComponent(q.url.split('?')[0]).replace(/^\//,''); const f=path.join(pasta,servir,n);
      if(!/^[A-Za-z0-9._-]+$/.test(n) || !fs.existsSync(f)){ r.writeHead(404); return r.end(); } r.writeHead(200); r.end(fs.readFileSync(f)); });
    await new Promise(ok=>srv.listen(0,'127.0.0.1',ok));
    process.env.FFIT_URL_VERSAO='http://127.0.0.1:'+srv.address().port+'/versao.json';
    process.env.FFIT_UPD_ESPERA='6000';
    const vApp=async()=>{ for(let i=0;i<60;i++){ try{ const v=await js('typeof VERSAO_APP!=="undefined" && typeof S!=="undefined" && S.meta? VERSAO_APP : ""'); if(v) return v; }catch(e){} await espera(500); } return ''; };
    const esperaPronta=async v=>{ for(let i=0;i<40;i++){ const p=await js('_upd.pronta||""'); if(p===v) return p; await espera(500); } return await js('_upd.pronta+" / erro: "+_upd.erro'); };
    const original=await js('VERSAO_APP');
    await js('S.festas=(S.festas||[]).concat({id:uid(),md:"01-02",n:"marca-da-atualizacao"}); save("teste"); S.ui.visao="rg"; S.ui.letra="grande"; S.ui.paleta="figo"; saveMeta(); aplicarTema(); true');
    await js('procurarAtualizacoes(true)');
    const pr=await esperaPronta('2999.1.1');
    regista('encontra, descarrega e confere a versão nova', pr==='2999.1.1', pr);
    regista('ponto de aviso na roda dentada', await js('document.getElementById("btn-defs").classList.contains("tem-upd")'));
    await js('aplicarAtualizacao()'); await espera(2500);
    const v1=await vApp();
    regista('passa à versão nova sem reinstalar', v1==='2999.1.1', {antes:original, depois:v1});
    regista('os dados ficam', await js('(S.festas||[]).some(f=>f.n==="marca-da-atualizacao")'));
    const pref=await js('[S.ui.visao,S.ui.letra,S.ui.paleta,document.documentElement.dataset.visao].join("/")');
    regista('as preferências ficam', pref==='rg/grande/figo/rg', pref);
    const dCop=path.join(app.getPath('userData'),'copias');
    const cop=fs.existsSync(dCop)? fs.readdirSync(dCop).filter(x=>x.startsWith('antes-de-atualizar-')) : [];
    regista('cópia de segurança antes de atualizar', cop.length>0 && fs.readFileSync(path.join(dCop,cop[cop.length-1]),'utf8').indexOf('marca-da-atualizacao')>=0, cop.length);
    await espera(1500);
    const est=()=>{ try{ return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'),'atualizacoes','estado.json'),'utf8')); }catch(e){ return {}; } };
    regista('a versão nova confirma que arrancou', est().confirmada==='2999.1.1', est());
    servir='2999.2.2';
    await js('procurarAtualizacoes(true)');
    const pr2=await esperaPronta('2999.2.2');
    await js('aplicarAtualizacao()');
    await espera(9000);
    const v2=await vApp();
    regista('volta à anterior se a nova não arrancar', pr2==='2999.2.2' && v2==='2999.1.1' && (est().mas||[]).indexOf('2999.2.2')>=0, {descarregada:pr2, agora:v2, mas:est().mas});
    regista('e os dados continuam lá', await js('(S.festas||[]).some(f=>f.n==="marca-da-atualizacao")'));
    /* um ficheiro que não confere com a impressão digital anunciada é recusado */
    fazer('2999.3.3'); const vj=path.join(pasta,'2999.3.3','versao.json'), vo=JSON.parse(fs.readFileSync(vj,'utf8'));
    vo.ficheiros['index.html']='0'.repeat(64); fs.writeFileSync(vj, JSON.stringify(vo)); servir='2999.3.3';
    await js('procurarAtualizacoes(true)'); await espera(3000);
    const adult=await js('JSON.stringify({erro:_upd.erro, pronta:_upd.pronta, v:VERSAO_APP})');
    regista('recusa um ficheiro adulterado', /não confere/.test(adult) && /"v":"2999.1.1"/.test(adult) && !/"pronta":"2999.3.3"/.test(adult), adult);
    srv.close();
    regista('sem erros na consola', !erros.length, erros.slice(0,5));
    /* o fecho pelo X com dados sem cópia: tem de perguntar e de fechar */
    await js('S.meta.avisarAoSair=true; S.meta.semCopia=true; S.members.length||semearFamiliaExemplo(); writeLS(); true');
    principal.close(); await espera(3000);
    regista('fecha pelo X com dados sem cópia', principal.isDestroyed(), {perguntou:!!global.__perguntouSair});
  }catch(e){ regista('excepção no autoteste', false, String(e&&e.message||e)); }
  fim();
};
