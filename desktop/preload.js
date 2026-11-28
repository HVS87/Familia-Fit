/* A ponte entre o programa e a app: só o que a app precisa de saber do
   computador — quantos ecrãs há, quando isso muda, a versão, o sistema e as
   atualizações.
   Nada de acesso a ficheiros nem ao sistema a partir da página. */
const {contextBridge, ipcRenderer}=require('electron');
let n=ipcRenderer.sendSync('ecras');
const quem=[];
ipcRenderer.on('ecras-mudaram',(e,v)=>{ n=v; quem.slice().forEach(f=>{ try{ f(v); }catch(err){} }); });
contextBridge.exposeInMainWorld('fitDesktop',{
  desktop:true,
  ecras:()=>n,
  aoMudarEcras:f=>{ if(typeof f==='function') quem.push(f); },
  versao:ipcRenderer.sendSync('versao'),
  plataforma:process.platform,
  plataformaNome:({win32:'Windows', darwin:'macOS', linux:'Linux'})[process.platform]||process.platform,
  /* as atualizações: procurar, descarregar, trocar de versão, a cópia de
     segurança de antes e o programa em si — tudo feito pelo programa, que
     confere as impressões digitais; a página só pede */
  atualizacoes:{
    procurar:()=>ipcRenderer.invoke('upd-procurar'),
    descarregar:()=>ipcRenderer.invoke('upd-descarregar'),
    reiniciar:()=>ipcRenderer.send('upd-reiniciar'),
    copia:txt=>ipcRenderer.invoke('upd-copia', String(txt)),
    programa:()=>ipcRenderer.invoke('upd-programa'),
    arrancou:v=>ipcRenderer.send('upd-arrancou', String(v||'')),
    modo:ipcRenderer.sendSync('upd-modo')
  }
});
