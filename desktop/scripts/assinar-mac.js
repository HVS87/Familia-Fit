/* Assinatura ad hoc do programa para macOS, logo depois de empacotar e antes
   de criar o .dmg. Sem assinatura válida, o macOS mata o programa ao arrancar
   (no Apple Silicon) e quem o descarrega vê «está danificado». Uma assinatura
   ad hoc não é a da Apple — o Gatekeeper continua a pedir clique direito →
   Abrir na primeira vez —, mas é o que faz o programa abrir. */
const {execFileSync}=require('child_process');
const path=require('path'), fs=require('fs');
exports.default=async function(ctx){
  if(ctx.electronPlatformName!=='darwin') return;
  const app=fs.readdirSync(ctx.appOutDir).find(x=>x.endsWith('.app'));
  if(!app) return;
  const p=path.join(ctx.appOutDir,app);
  execFileSync('codesign',['--force','--deep','--sign','-',p],{stdio:'inherit'});
  execFileSync('codesign',['--verify','--deep','--strict','--verbose=2',p],{stdio:'inherit'});
  console.log('assinado (ad hoc):',p);
};
