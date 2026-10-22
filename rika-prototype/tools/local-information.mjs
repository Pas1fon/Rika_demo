import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import articles from './client-articles.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
const read=n=>fs.readFileSync(path.join(dist,n),'utf8'),write=(n,s)=>fs.writeFileSync(path.join(dist,n),s);
const ctx={window:{}};vm.runInNewContext(read('i18n.js'),ctx);const dict=ctx.window.RIKA_I18N;
const add=(key,values)=>{['ru','kk','en'].forEach((lang,i)=>dict[lang][key]=values[i]);};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=(key,tag='span')=>`<${tag} data-i18n="${key}">${esc(dict.ru[key]||key)}</${tag}>`;
const resources=JSON.parse(fs.readFileSync(path.join(root,'tools/client-resources.json'),'utf8'));
add('localFullInfo',['Подробнее','Толығырақ','Read more']);add('backToDocuments',['Все документы и правила','Барлық құжаттар мен ережелер','All documents and guidance']);add('articleDownloads',['Файлы для скачивания','Жүктеп алуға арналған файлдар','Downloads']);
const template=read('documents.html');const localUrls=new Map();
for(const [index,resource]of resources.entries()){
 const name='info-'+resource.slug+'.html',key='resourceTitle'+index;localUrls.set(resource.source,name);
 const content=articles[index].map((section,i)=>{add(`article${index}Heading${i}`,section.title);add(`article${index}Text${i}`,section.text);return `<section class="copy-section">${t(`article${index}Heading${i}`,'h2')}${t(`article${index}Text${i}`,'p')}</section>`;}).join('');
 const files=resource.files.length?`<section class="article-downloads">${t('articleDownloads','h2')}<div class="resource-files">${resource.files.map(file=>`<a href="${esc(file.href)}" download>${t('downloadDocument')} ${esc(path.extname(file.href).slice(1).toUpperCase())}</a>`).join('')}</div></section>`:'';
 const body=`<main id="main"><div class="container"><nav class="breadcrumbs"><a href="index.html">${t('home')}</a> / <a href="documents.html">${t('documentsHeading')}</a></nav><div class="inner-hero"><div>${t(key,'h1')}</div></div></div><article class="container local-info-article">${content}${files}<nav class="task-grid"><a class="button secondary" href="documents.html#client-resources">${t('backToDocuments')}</a><a class="button primary" href="contacts.html">${t('contacts')}</a></nav></article></main>`;
 let h=template.replace(/<main id="main">[\s\S]*?<\/main>/,body).replace(/data-page-title="[^"]+"/,`data-page-title="${key}"`).replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(dict.ru[key])} — РИКА</title>`);write(name,h);
}
let documents=template;
for(const [source,local]of localUrls)documents=documents.replaceAll(`href="${source}" target="_blank" rel="noopener noreferrer"`,`href="${local}"`);
documents=documents.replaceAll('class="source-link"','class="local-info-link"').replaceAll('data-i18n="officialPublication"','data-i18n="localFullInfo"').replaceAll('Полная информация на сайте РИКА','Подробнее');write('documents.html',documents);
// Guarantee shortcut in navigation; international preparation points to local documents.
add('guaranteeNav',['Гарантийное обязательство','Кепілдік міндеттеме','Guarantee undertaking']);
add('internationalDocumentsPrompt',['Перед международной отправкой ознакомьтесь с документами','Халықаралық жөнелтім алдында құжаттармен танысыңыз','Review the documents before your international shipment']);
add('reviewDocuments',['Документы и правила','Құжаттар мен ережелер','Documents and rules']);
const guarantee=template.match(/<a class="guarantee-link button primary" href="([^"]+)"/)[1];
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){let h=read(name);if(!h.includes('class="site-header"'))continue;
const shortcut=`<a class="guarantee-nav" href="${guarantee}" target="_blank" rel="noopener noreferrer" aria-label="${esc(dict.ru.guaranteeTitle)}" title="${esc(dict.ru.guaranteeTitle)}" data-i18n-aria="guaranteeTitle" data-i18n-title="guaranteeTitle">${t('guaranteeNav')}</a>`;
h=h.replace(/(<nav class="desktop-nav"[^>]*>)([\s\S]*?)(<\/nav>)/,(_,start,body,end)=>start+body+shortcut+end).replace(/(<nav id="mobile-menu"[^>]*>)([\s\S]*?)(<\/nav>)/,(_,start,body,end)=>start+body+shortcut+end);
if(name==='international.html')h=h.replace(/(<section[^>]*class="[^"]*international-descriptions[^"]*"[^>]*>)/,`<aside class="container international-documents-notice">${t('internationalDocumentsPrompt','p')}<a href="documents.html#client-resources">${t('reviewDocuments')}</a></aside>$1`);
write(name,h);}
// Keep the guarantee entry in navigation, without repeating the TrustMe button in downloads.
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){let h=read(name).replace(/<a class="guarantee-link button primary"[\s\S]*?<\/a>/g,'');
if(['private.html','service-business.html','tariffs.html'].includes(name))h=h.replace(/<table class="tariff-table">([\s\S]*?)<\/table>/g,(_,body)=>{
 if(!body.includes('data-i18n="tableService"'))return `<table class="tariff-table">${body}</table>`;
 body=body.replace(/<tbody>([\s\S]*?)<\/tbody>/,(_,rows)=>'<tbody>'+rows.replace(/<tr>([\s\S]*?)<\/tr>/g,(_,cells)=>{let index=0;return '<tr>'+cells.replace(/<(td|th)([^>]*)>([\s\S]*?)<\/\1>/g,(all,tag,attrs,value)=>{const column=index++;if([1,2].includes(column)&&/^[0-9 \u00a0]+$/.test(value))value+=' ₸';return `<${tag}${attrs}>${value}</${tag}>`;})+'</tr>';})+'</tbody>');
 return `<table class="tariff-table unified-rates">${body}</table>`;
});write(name,h);}
// No public links or resource requests may depend on the retired website.
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){const h=read(name);for(const [,url]of h.matchAll(/(?:href|src)="(https?:\/\/[^\"]+)"/g)){if(['rika.kz','www.rika.kz'].includes(new URL(url).hostname))throw new Error(`Old-site dependency in ${name}: ${url}`);}}
let sitemap=read('sitemap.html').replace(/<a\b[^>]*href="info-[^"]+"[^>]*>[\s\S]*?<\/a>/g,'');sitemap=sitemap.replace(/(<div class="container sitemap-grid">)/,'$1'+resources.map((r,i)=>`<a href="info-${r.slug}.html">${t('resourceTitle'+i)}</a>`).join(''));write('sitemap.html',sitemap);
write('i18n.js','window.RIKA_I18N='+JSON.stringify(dict)+';');
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){write(name,read(name).replace(/(href|src)="([^"?]+\.(?:css|js))(?:\?[^\"]*)?"/g,(all,attribute,file)=>{const p=path.join(dist,file);return fs.existsSync(p)?`${attribute}="${file}?v=${createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0,10)}"`:all;}));}
console.log('10 local customer information pages created; no old-site links or assets remain.');

