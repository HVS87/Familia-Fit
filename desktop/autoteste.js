/* Autoteste da versão para computador. Corre só com FFIT_AUTOTESTE=<ficheiro>:
   arranca o programa, verifica a app e o segundo ecrã por dentro, escreve o
   resultado nesse ficheiro e sai. É o que a QA usa para testar o .exe tal
   como sai do empacotamento. */
module.exports=async function({app, BrowserWindow, screen, fs, principal, segundoAtual}){
  const out={versao:app.getVersion(), plataforma:process.platform, ecras:screen.getAllDisplays().length, ok:[], falhas:[]};
  const regista=(n,c,x)=>(c? out.ok : out.falhas).push(n+(x!==undefined? ' · '+JSON.stringify(x) : ''));
  const espera=ms=>new Promise(r=>setTimeout(r,ms));
  const erros=[];
  const ouvir=wc=>wc.on('console-message',(ev,...a)=>{ const lvl=ev&&ev.level!==undefined? ev.level : a[0], msg=ev&&ev.message!==undefined? ev.message : a[1];
    if(lvl===3||lvl==='error') erros.push(String(msg).slice(0,200)); });
  ouvir(principal.webContents);
  const fim=()=>{ try{ fs.writeFileSync(process.env.FFIT_AUTOTESTE, JSON.stringify(out,null,1)); }catch(e){} app.exit(out.falhas.length? 1 : 0); };
  setTimeout(()=>{ regista('autoteste dentro do tempo', false); fim(); }, 90000);
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
    regista('sem erros na consola', !erros.length, erros.slice(0,5));
    /* o fecho pelo X com dados sem cópia: tem de perguntar e de fechar */
    await js('S.meta.avisarAoSair=true; S.meta.semCopia=true; S.members.length||semearFamiliaExemplo(); writeLS(); true');
    principal.close(); await espera(3000);
    regista('fecha pelo X com dados sem cópia', principal.isDestroyed(), {perguntou:!!global.__perguntouSair});
  }catch(e){ regista('excepção no autoteste', false, String(e&&e.message||e)); }
  fim();
};
