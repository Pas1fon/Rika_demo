import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import services from './service-pages.mjs';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const read=n=>fs.readFileSync(path.join(dist,n),'utf8');
const write=(n,s)=>fs.writeFileSync(path.join(dist,n),s);
const ctx={window:{}};vm.runInNewContext(read('i18n.js'),ctx);const dict=ctx.window.RIKA_I18N;
const add=(k,ru,kk,en)=>{for(const [l,v]of Object.entries({ru,kk,en}))dict[l][k]=v;};
add('internationalNav','Международная доставка','Халықаралық жеткізу','International delivery');
add('internationalLead','Отправка документов и посылок за рубеж для частных клиентов и компаний. Выберите услугу и проверьте тарифную зону страны назначения.','Жеке клиенттер мен компанияларға құжаттар мен сәлемдемелерді шетелге жеткізу. Қызметті таңдап, алушы елдің тарифтік аймағын тексеріңіз.','Send documents and parcels abroad as an individual or a business. Choose a service and check your destination country’s rate zone.');
add('internationalDocuments','Документы за рубеж','Құжаттарды шетелге жеткізу','Documents abroad');
add('internationalParcels','Посылки за рубеж','Сәлемдемелерді шетелге жеткізу','Parcels abroad');
add('tariffZonesNav','Тарифные зоны','Тарифтік аймақтар','Rate zones');
add('internationalZones','Международные тарифные зоны','Халықаралық тарифтік аймақтар','International rate zones');
add('internationalZonesLead','Найдите страну назначения и её зону для документов и посылок. Номер зоны соответствует столбцу в тарифной таблице выбранной услуги.','Алушы елді және құжаттар мен сәлемдемелерге арналған аймақты табыңыз. Аймақ нөмірі таңдалған қызметтің тариф кестесіндегі бағанға сәйкес келеді.','Find your destination country and its zone for documents and parcels. The zone number matches a column in the selected service’s rate table.');
add('countrySearch','Поиск по стране','Ел бойынша іздеу','Search by country');
add('countryLabel','Страна назначения · RU','Алушы ел · RU','Destination country · RU');
add('documentZone','Документы: зона','Құжаттар: аймақ','Documents: zone');
add('parcelZone','Посылки: зона','Сәлемдемелер: аймақ','Parcels: zone');
add('backPersonal','К частным клиентам','Жеке клиенттерге оралу','Back to personal delivery');
add('backBusiness','К доставке для бизнеса','Бизнес жеткізуіне оралу','Back to business delivery');
add('kzZonesTitle','Зоны доставки по Казахстану','Қазақстан бойынша жеткізу аймақтары','Kazakhstan delivery zones');
add('kzZonesLead','Для частных клиентов и бизнеса состав отдельных зон различается. Выберите тип клиента при проверке маршрута.','Жеке клиенттер мен бизнес үшін кейбір аймақтардың құрамы әртүрлі. Бағытты тексергенде клиент түрін таңдаңыз.','Some zones differ for individuals and businesses. Select the customer type when checking your route.');
add('zoneOne','Внутри города','Қала ішінде','Within a city');
add('zoneTwo','Между основными городами','Негізгі қалалар арасында','Between main cities');
add('zoneThree','Специальные направления','Арнайы бағыттар','Special destinations');
add('zoneFour','Другие населённые пункты','Басқа елді мекендер','Other settlements');
add('findCityZone','Найти город и проверить зону','Қаланы тауып, аймақты тексеру','Find a city and check its zone');
add('noCountry','Страна не найдена. Измените запрос или уточните направление в офисе РИКА.','Ел табылмады. Сұрауды өзгертіңіз немесе бағытты РИКА кеңсесінен нақтылаңыз.','Country not found. Change your search or contact RIKA to confirm your destination.');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=(k,tag='span')=>`<${tag} data-i18n="${k}">${esc(dict.ru[k]||k)}</${tag}>`;
const a=(url,k,cls='button secondary')=>`<a class="${cls}" href="${url}">${t(k)} <span aria-hidden="true">↗</span></a>`;
const returns=`<nav class="audience-return" aria-label="Разделы клиентов">${a('private.html','backPersonal')}${a('service-business.html','backBusiness')}</nav>`;
function newPage(slug,title,lead,body){let h=read('private.html');h=h.replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main"><div class="container"><nav class="breadcrumbs">${a('index.html','home','')} / ${t(title)}</nav><div class="inner-hero"><div>${t(title,'h1')}${t(lead,'p')}</div></div></div>${body}</main>`).replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(dict.ru[title])} — РИКА</title>`).replace(/data-page-title="[^"]*"/,`data-page-title="${title}"`);write(slug,h);}
const tables=JSON.parse(fs.readFileSync(path.join(root,'tools/official-tables.json'),'utf8'));
const countries=new Map();
for(const [slug,kind]of [['service-documents.html','documents'],['service-international.html','parcels']]){
 const rows=tables[slug].at(-1);
 for(const row of rows)for(let i=0;i+1<row.length;i+=2){const country=row[i].trim(),zone=row[i+1].trim();if(!country||!/^\d+$/.test(zone))continue;const entry=countries.get(country)||{country};entry[kind]=zone;countries.set(country,entry);}
}
newPage('international-zones.html','internationalZones','internationalZonesLead',`<section class="container"><label class="country-search">${t('countrySearch')}<input id="country-query" type="search" maxlength="100" autocomplete="off" aria-label="Поиск по стране" data-i18n-aria="countrySearch"></label><div class="tariff-table-wrap"><table class="tariff-table country-zones"><thead><tr>${t('countryLabel','th')}${t('documentZone','th')}${t('parcelZone','th')}</tr></thead><tbody>${[...countries.values()].sort((a,b)=>a.country.localeCompare(b.country,'ru')).map(c=>`<tr data-country-row><th scope="row">${esc(c.country)}</th><td>${c.documents||'—'}</td><td>${c.parcels||'—'}</td></tr>`).join('')}</tbody></table></div><p id="country-empty" hidden role="status">${t('noCountry')}</p><div class="task-grid">${a('service-documents.html','internationalDocuments')}${a('service-international.html','internationalParcels')}${a('international.html','internationalNav')}</div>${returns}</section>`);
add('internationalLead','Документы и посылки за рубеж: условия отправки, поиск страны, тарифные зоны и стоимость — на одной странице.','Құжаттар мен сәлемдемелерді шетелге жеткізу: жөнелту шарттары, елді іздеу, тарифтік аймақтар және құны бір бетте.','Documents and parcels abroad: shipping conditions, country search, rate zones and prices on one page.');
add('documentRates','Тарифы на документы · KZT','Құжаттар тарифтері · KZT','Document rates · KZT');
add('parcelRates','Тарифы на посылки · KZT','Сәлемдемелер тарифтері · KZT','Parcel rates · KZT');
add('ratesScrollHint','Найдите зону страны выше и нужный вес в таблице. Широкую таблицу можно прокручивать вбок.','Жоғарыдан елдің аймағын, ал кестеден қажетті салмақты табыңыз. Кең кестені көлденең айналдыруға болады.','Find the country’s zone above and your shipment weight in the table. Wide tables can be scrolled sideways.');
add('countryScrollHint','Прокручивайте список внутри окна или найдите страну по названию.','Тізімді терезе ішінде айналдырыңыз немесе елді атауы бойынша табыңыз.','Scroll within the list or search for a country by name.');
add('countryPlaceholder','Введите название страны','Ел атауын енгізіңіз','Enter a country name');
function localized(k,value,tag){add(k,value.ru,value.kk,value.en);return t(k,tag);}
const descriptions=[['service-documents.html','documents'],['service-international.html','parcels']].map(([slug,id])=>{const service=services.find(s=>s.slug===slug);return `<article id="${id}" class="international-description">${localized(id+'UnifiedTitle',service.title,'h2')}${localized(id+'UnifiedLead',service.lead,'p')}<dl class="international-facts">${service.facts.map((fact,i)=>`<div>${localized(id+'FactLabel'+i,fact.label,'dt')}${localized(id+'FactValue'+i,fact.value,'dd')}</div>`).join('')}</dl>${service.sections.map((s,i)=>`${localized(id+'Section'+i,s.heading,'h3')}${s.paragraphs.map((p,j)=>localized(id+'Paragraph'+i+'_'+j,p,'p')).join('')}`).join('')}</article>`;}).join('');
let zoneContent=read('international-zones.html').match(/<section class="container">([\s\S]*?)<div class="task-grid">/)[1];
zoneContent=zoneContent.replace('class="tariff-table-wrap"','class="tariff-table-wrap international-country-scroll" tabindex="0" role="region" data-i18n-aria="internationalZones" aria-label="Международные тарифные зоны"').replace('id="country-query"','id="country-query" placeholder="Введите название страны" data-i18n-placeholder="countryPlaceholder"');
zoneContent=t('countryScrollHint','p')+zoneContent;
const rateTable=(slug,key,documentOnly=false)=>`<section class="container international-rates">${t(key,'h2')}${t('ratesScrollHint','p')}${(documentOnly?tables[slug].slice(0,1):tables[slug].slice(0,-1)).map(rows=>`<div class="tariff-table-wrap international-rate-scroll" tabindex="0" role="region" aria-label="${esc(dict.ru[key])}"><table class="tariff-table"><thead><tr>${rows[0].map(v=>`<th scope="col">${esc(v)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`).join('')}</section>`;
newPage('international.html','internationalNav','internationalLead',`<section class="container international-descriptions">${descriptions}</section><section id="zones" class="container unified-zones">${t('internationalZones','h2')}${t('internationalZonesLead','p')}${zoneContent}</section>${rateTable('service-documents.html','documentRates',true)}${rateTable('service-international.html','parcelRates')}<section class="container">${t('tableSource','p')}${returns}</section>`);
const kzBlock=`<section class="container zones-highlight"><div class="zone-heading">${t('kzZonesTitle','h2')}${a('delivery-zones.html','findCityZone')}</div><div class="zone-overview">${['zoneOne','zoneTwo','zoneThree','zoneFour'].map((k,i)=>`<a href="delivery-zones.html"><strong>0${i+1}</strong>${t(k)}</a>`).join('')}</div>${t('kzZonesLead','p')}</section>`;
const worldBlock=`<section class="container zones-highlight"><div class="zone-heading">${t('internationalZones','h2')}${a('international-zones.html','countrySearch','button primary')}</div>${t('internationalZonesLead','p')}<div class="task-grid">${a('international.html','internationalNav')}${a('private.html','backPersonal')}${a('service-business.html','backBusiness')}</div></section>`;
const domestic=new Set(['private.html','service-business.html','service-kazakhstan.html','service-economy.html','tariffs.html','business-tariffs.html','calculator.html','courier.html','extra-services.html','services.html']);
function afterHero(h,block){const start=h.indexOf('class="inner-hero');const end=h.indexOf('</div></div></div>',start);if(start>=0&&end>=0)return h.slice(0,end+18)+block+h.slice(end+18);return h.replace('</main>',block+'</main>');}
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){let h=read(name);
 const nav=[['private.html','privateNav'],['service-business.html','businessNav'],['international.html','internationalNav'],['tariffs.html','tariffs'],['delivery-zones.html','tariffZonesNav'],['contacts.html','contacts']].map(([u,k])=>a(u,k,'')).join('');
 h=h.replace(/<nav class="desktop-nav"[\s\S]*?<\/nav>/,`<nav class="desktop-nav" aria-label="Главная навигация">${nav}</nav>`).replace(/<nav id="mobile-menu"[\s\S]*?<\/nav>/,`<nav id="mobile-menu" class="mobile-menu" hidden aria-label="Мобильная навигация">${nav}${a('international-zones.html','internationalZones','')}${a('documents.html','documentsHeading','')}${a('news.html','news','')}${a('about.html','company','')}${a('courier.html','courierAction','')}</nav>`);
 if(name==='private.html')h=h.replace('<section class="container task-grid">','<section class="container task-grid">'+a('international.html','internationalNav'));
 if(name==='service-business.html')h=h.replace('<div class="task-grid">','<div class="task-grid">'+a('international.html','internationalNav'));
 if(domestic.has(name))h=afterHero(h,kzBlock);
 if(['service-documents.html','service-international.html'].includes(name))h=afterHero(h,worldBlock);
 if(name==='index.html')h=h.replace('href="service-international.html"','href="international.html"');
 if(name==='sitemap.html')h=h.replace('<div class="container sitemap-grid">','<div class="container sitemap-grid">'+a('international.html','internationalNav','')+a('international-zones.html','internationalZones',''));
 h=h.replace(/href="service-documents.html"/g,'href="international.html#documents"').replace(/href="service-international.html"/g,'href="international.html#parcels"').replace(/href="international-zones.html"/g,'href="international.html#zones"');
 write(name,h);
}
write('i18n.js','window.RIKA_I18N='+JSON.stringify(dict)+';');
// Content-based versions make GitHub Pages fetch updated styles and scripts.
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){
 const h=read(name).replace(/(href|src)="([^"?]+\.(?:css|js))(?:\?[^\"]*)?"/g,(all,attribute,file)=>{
  const asset=path.join(dist,file);if(!fs.existsSync(asset))return all;
  const hash=createHash('sha256').update(fs.readFileSync(asset)).digest('hex').slice(0,10);
  return `${attribute}="${file}?v=${hash}"`;
 });write(name,h);
}
console.log(`International navigation and visible zones added; ${countries.size} destination countries.`);
