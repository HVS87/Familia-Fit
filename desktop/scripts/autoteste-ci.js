/* Corre o autoteste do programa empacotado neste sistema (Windows, macOS ou
   Linux) e falha se alguma verificação falhar. É o que a automação corre em
   cada sistema depois de empacotar — a única forma de saber, sem ter os três
   computadores, que o programa abre e funciona em todos. No Linux precisa de
   um ecrã virtual (xvfb-run). */
const {spawn}=require('child_process'), fs=require('fs'), path=require('path'), os=require('os');
const out=path.join(os.tmpdir(),'ffit-autoteste-ci-'+process.pid+'.json');
const dist=path.join(__dirname,'..','dist');
let exe, args=[];
if(process.platform==='win32'){ const w=path.join(dist,'win-unpacked'); exe=path.join(w, fs.readdirSync(w).find(x=>/.exe$/i.test(x) && !/^(elevate|uninstall)/i.test(x))); }
else if(process.platform==='darwin'){
  /* corre a versão da arquitetura desta máquina: mac-arm64 no Apple Silicon, mac na Intel */
  const quer= process.arch==='arm64'? 'mac-arm64' : 'mac';
  const dirs=fs.readdirSync(dist).filter(x=>/^mac/.test(x) && fs.statSync(path.join(dist,x)).isDirectory());
  const d=dirs.includes(quer)? quer : dirs[0];
  const app=fs.readdirSync(path.join(dist,d)).find(x=>x.endsWith('.app'));
  const bin=path.join(dist,d,app,'Contents','MacOS');
  exe=path.join(bin, fs.readdirSync(bin)[0]);
} else { exe='xvfb-run'; args=['-a', path.join(dist,'linux-unpacked','familia-fit'), '--no-sandbox', '--disable-gpu']; }
console.log('a correr', exe, args.join(' '));
/* a saída de erro guarda-se para, se o programa morrer, se ver porquê nas anotações */
const p=spawn(exe,args,{env:Object.assign({},process.env,{FFIT_AUTOTESTE:out, ELECTRON_ENABLE_LOGGING:'1', ELECTRON_ENABLE_STACK_DUMPING:'1'}), stdio:['ignore','inherit','pipe']});
let erroTxt=''; p.stderr.on('data',b=>{ const t=b.toString(); process.stderr.write(t); erroTxt=(erroTxt+t).slice(-6000); });
const ultimas=()=>erroTxt.split(String.fromCharCode(10)).filter(l=>l.trim()).slice(-12);
/* se o programa morrer à nascença (no macOS, por exemplo, quando a assinatura não serve), diz-se logo como morreu */
p.on('exit',(code,sig)=>{ if(fs.existsSync(out)) return; const m='o programa terminou sem resultado (código '+code+', sinal '+sig+')'; console.error(m); if(process.env.GITHUB_ACTIONS){ console.log('::error title=Autoteste ('+process.platform+')::'+m); ultimas().forEach(l=>console.log('::warning title=Saída do programa ('+process.platform+')::'+l.slice(0,400))); } process.exit(1); });
p.on('error',e=>{ console.error('não arrancou:',e.message); if(process.env.GITHUB_ACTIONS) console.log('::error title=Autoteste ('+process.platform+')::não arrancou: '+e.message); process.exit(1); });
const t0=Date.now();
const vigia=setInterval(()=>{
  if(fs.existsSync(out)){
    clearInterval(vigia);
    setTimeout(()=>{
      const j=JSON.parse(fs.readFileSync(out,'utf8'));
      console.log(JSON.stringify(j,null,1));
      /* no GitHub, cada falha vira uma anotação, que se lê sem abrir o registo */
      if(process.env.GITHUB_ACTIONS) j.falhas.forEach(f=>console.log('::error title=Autoteste ('+process.platform+')::'+String(f).replace(/\s+/g,' ')));
      if(process.env.GITHUB_ACTIONS) console.log('::notice title=Autoteste ('+process.platform+')::'+j.ok.length+' verificações certas, '+j.falhas.length+' falhas, '+j.ecras+' ecrã(s)');
      try{ p.kill(); }catch(e){}
      process.exit(j.falhas.length? 1 : 0);
    },1000);
  } else if(Date.now()-t0>180000){ console.error('o autoteste não respondeu em 3 minutos'); if(process.env.GITHUB_ACTIONS) console.log('::error title=Autoteste ('+process.platform+')::o programa não respondeu em 3 minutos'); try{ p.kill(); }catch(e){} process.exit(1); }
},1000);
