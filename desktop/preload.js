/* A ponte entre o programa e a app: só o que a app precisa de saber do
   computador — quantos ecrãs há, quando isso muda, a versão e o sistema.
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
  plataformaNome:({win32:'Windows', darwin:'macOS', linux:'Linux'})[process.platform]||process.platform
});
