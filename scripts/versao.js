/* Gera o versao.json que o site publica ao lado da app — é por ele que o
   telemóvel e o computador sabem se há uma versão nova, e é com as impressões
   digitais dele que o programa de computador confere o que descarrega.

     node scripts/versao.js                    escreve o versao.json
     node scripts/versao.js --notas "texto"    idem, com uma frase sobre a versão
     node scripts/versao.js --minimo 2026.11.28   a versão mínima do programa
                                               de computador que aguenta esta app
     node scripts/versao.js --verificar        falha se o versao.json não
                                               corresponder aos ficheiros

   A versão da app vem do próprio index.html (VERSAO_APP) e a do programa do
   desktop/package.json: nada se escreve duas vezes à mão. */
const fs=require('fs'), path=require('path'), crypto=require('crypto');
const raiz=path.join(__dirname,'..');
const FICHEIROS=['index.html','manifest.webmanifest','sw.js','icon.svg','icon-180.png','icon-192.png','icon-512.png'];
const args=process.argv.slice(2), arg=n=>{ const i=args.indexOf(n); return i>=0? args[i+1] : undefined; };
const destino=path.join(raiz,'versao.json');
let antigo={}; try{ antigo=JSON.parse(fs.readFileSync(destino,'utf8')); }catch(e){}

const html=fs.readFileSync(path.join(raiz,'index.html'),'utf8');
const m=/const VERSAO_APP='([0-9.\-]+)'/.exec(html);
if(!m){ console.error('Não encontrei VERSAO_APP no index.html'); process.exit(1); }
const programa=JSON.parse(fs.readFileSync(path.join(raiz,'desktop','package.json'),'utf8')).version;
const ficheiros={};
FICHEIROS.forEach(f=>{ ficheiros[f]=crypto.createHash('sha256').update(fs.readFileSync(path.join(raiz,f))).digest('hex'); });
const novo={
  app:'familia-fit',
  versao:m[1],
  programa,
  /* a etiqueta da release do programa: 2026.11.25-2 publica-se como v2026.11.25.2 */
  etiqueta:'v'+programa.replace(/-/g,'.'),
  programaMinimo: arg('--minimo') || antigo.programaMinimo || programa,
  notas: arg('--notas')!==undefined? arg('--notas') : (antigo.versao===m[1]? antigo.notas||'' : ''),
  ficheiros
};

if(args.includes('--verificar')){
  const difs=[];
  ['versao','programa','etiqueta'].forEach(k=>{ if(antigo[k]!==novo[k]) difs.push(k+': '+antigo[k]+' ≠ '+novo[k]); });
  FICHEIROS.forEach(f=>{ if(!antigo.ficheiros || antigo.ficheiros[f]!==ficheiros[f]) difs.push(f+' mudou desde que o versao.json foi gerado'); });
  if(difs.length){ console.error('O versao.json está desatualizado — corre «node scripts/versao.js»:\n  '+difs.join('\n  ')); process.exit(1); }
  console.log('versao.json certo: app '+novo.versao+', programa '+novo.programa);
  process.exit(0);
}
fs.writeFileSync(destino, JSON.stringify(novo,null,1)+'\n');
console.log('versao.json: app '+novo.versao+', programa '+novo.programa+' ('+novo.etiqueta+'), mínimo '+novo.programaMinimo);
