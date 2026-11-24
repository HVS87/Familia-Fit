/* Copia a app da web (a raiz do repositório) para dentro do programa. A app é
   uma só: o que se empacota é exatamente o index.html que está publicado. */
const fs=require('fs'), path=require('path');
const raiz=path.join(__dirname,'..','..'), destino=path.join(__dirname,'..','app');
const FICHEIROS=['index.html','manifest.webmanifest','sw.js','icon.svg','icon-180.png','icon-192.png','icon-512.png'];
fs.rmSync(destino,{recursive:true, force:true}); fs.mkdirSync(destino,{recursive:true});
FICHEIROS.forEach(f=>fs.copyFileSync(path.join(raiz,f), path.join(destino,f)));
fs.mkdirSync(path.join(__dirname,'..','build'),{recursive:true});
fs.copyFileSync(path.join(raiz,'icon-512.png'), path.join(__dirname,'..','build','icon.png'));
console.log('app copiada para desktop/app ('+FICHEIROS.length+' ficheiros)');
