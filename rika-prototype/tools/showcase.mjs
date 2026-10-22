import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const read=n=>fs.readFileSync(path.join(dist,n),'utf8');
const write=(n,s)=>fs.writeFileSync(path.join(dist,n),s);
const offices=JSON.parse(fs.readFileSync(path.join(root,'tools/offices.json'),'utf8').replace(/^\uFEFF/,''));
const ctx={window:{}};vm.runInNewContext(read('i18n.js'),ctx);vm.runInNewContext(read('pages-i18n.js'),ctx);
const dict=ctx.window.RIKA_I18N;
const forbidden=/демо|прототип|учебн|вымышлен|ойдан|prototype|demonstration|\bdemo\b|fictional|illustrative|draft/i;
function clean(s){return s.split(/(?<=[.!?])\s+/).filter(x=>!forbidden.test(x)).join(' ').replace(/Концепция (?:обновлённого|нового) сайта/g,'Экспресс-почта РИКА');}
for(const values of Object.values(dict))for(const k of Object.keys(values))if(forbidden.test(values[k]))values[k]=clean(values[k]);
const add=(key,ru,kk,en)=>{for(const [l,s]of Object.entries({ru,kk,en}))dict[l][key]=s;};
add('copyright','ТОО «РИКА». Все права защищены.','«РИКА» ЖШС. Барлық құқықтар қорғалған.','RIKA LLP. All rights reserved.');
add('economyTitle','Эконом-доставка','Үнемді жеткізу','Economy delivery');
add('whatsappAstana','WhatsApp · Астана','WhatsApp · Астана','WhatsApp · Astana');
add('contactRika','Связаться с РИКА','РИКА-мен байланысу','Contact RIKA');
add('officialTables','Полные тарифы и зоны · RU','Толық тарифтер мен аймақтар · RU','Full rates and zones · RU');
add('tableSource','Таблицы РИКА на 19.10.2026. Стоимость в KZT; условия и примечания — на странице источника.','19.10.2026 күнгі РИКА кестелері. Құны KZT; шарттар мен ескертпелер дереккөз бетінде.','RIKA tables as of 19 Oct 2026. Prices in KZT; terms and notes are on the source page.');
add('contactsEyebrow','КОНТАКТЫ И ОФИСЫ','БАЙЛАНЫСТАР МЕН КЕҢСЕЛЕР','CONTACTS AND OFFICES');
for(const [key,value]of Object.entries(dict.ru)){
 if(value==='Для всего, что важно')add(key,'Услуги доставки','Жеткізу қызметтері','Delivery services');
 if(value==='Когда нужно больше доставки')add(key,'Дополнительные услуги','Қосымша қызметтер','Additional services');
}
add('heroTitle1','Экспресс-доставка','Экспресс-жеткізу','Express delivery');
add('heroTitle2','по Казахстану и миру','Қазақстан және әлем бойынша','across Kazakhstan and worldwide');
add('heroDescription','Отправляйте документы и посылки с РИКА. 30 лет опыта, доставка до двери и решения для бизнеса.','РИКА арқылы құжаттар мен сәлемдемелерді жіберіңіз. 30 жылдық тәжірибе, есікке дейін жеткізу және бизнеске арналған шешімдер.','Send documents and parcels with RIKA. 30 years of experience, door delivery and business solutions.');
add('heroEyebrow','РИКА · ЭКСПРЕСС-ПОЧТА','РИКА · ЭКСПРЕСС-ПОШТА','RIKA · EXPRESS MAIL');
add('servicesTitle','Выберите способ доставки','Жеткізу тәсілін таңдаңыз','Choose your delivery service');
add('contactsTitle','Контакты и офисы РИКА','РИКА байланыстары мен кеңселері','RIKA contacts and offices');
add('footerNote','РИКА · Экспресс-почта по Казахстану и миру','РИКА · Қазақстан және әлем бойынша экспресс-пошта','RIKA · Express mail across Kazakhstan and worldwide');
add('accountPrivacy','Вход в личный кабинет РИКА через Courierexe.','Courierexe арқылы РИКА жеке кабинетіне кіру.','Sign in to your RIKA account through Courierexe.');
add('courierPrivacy','Выберите свой город и свяжитесь с ближайшим офисом.','Қалаңызды таңдап, жақын кеңсеге хабарласыңыз.','Choose your city and contact the nearest office.');
add('courierOriginal','Подготовить обращение','Өтініш дайындау','Prepare a request');
add('courierDesc','Укажите город и адрес забора, затем свяжитесь с офисом.','Қала мен алып кету мекенжайын көрсетіп, кеңсеге хабарласыңыз.','Enter the pickup city and address, then contact your office.');
add('newsArchiveNote','Новости и изменения в работе РИКА.','РИКА жаңалықтары мен жұмысындағы өзгерістер.','RIKA news and service updates.');
add('privateNav','Частным лицам','Жеке тұлғаларға','Personal');add('businessNav','Бизнесу','Бизнеске','Business');
add('offerAction','Получить предложение','Ұсыныс алу','Request an offer');
add('calculatorAction','Рассчитать доставку','Жеткізуді есептеу','Calculate delivery');
add('trackingAction','Отследить посылку','Сәлемдемені бақылау','Track a parcel');
add('courierAction','Вызвать курьера','Курьер шақыру','Book a courier');
add('formNote','Заполните данные и подготовьте письмо. Откроется ваша почта; отправьте письмо самостоятельно. Обращение обрабатывается после подтверждения сотрудником РИКА.','Деректерді толтырып, хат дайындаңыз. Пошта қолданбасы ашылады; хатты өзіңіз жіберіңіз. Өтініш РИКА қызметкері растағаннан кейін өңделеді.','Fill in your details and prepare an email. Your email app will open; send the message yourself. RIKA will confirm your request.');
add('prepareEmail','Подготовить письмо','Хат дайындау','Prepare email');add('copyRequest','Скопировать текст','Мәтінді көшіру','Copy text');
add('requestReady','Текст обращения готов','Өтініш мәтіні дайын','Your request text is ready');
add('companyName','Название компании','Компания атауы','Company name');add('bin','БИН (12 цифр)','БСН (12 сан)','Business ID (12 digits)');
add('senderName','Контактное лицо','Байланыс тұлғасы','Contact name');add('phoneLabel','Телефон','Телефон','Phone');
add('emailLabel','Электронная почта','Электрондық пошта','Email');add('cityLabel','Город','Қала','City');
add('addressLabel','Адрес забора','Алып кету мекенжайы','Pickup address');add('personType','Тип клиента','Клиент түрі','Customer type');
add('legalPerson','Юридическое лицо','Заңды тұлға','Company');add('privatePerson','Физическое лицо','Жеке тұлға','Individual');
add('monthly','Отправлений в месяц','Айына жөнелтім саны','Shipments per month');add('routes','Основные направления','Негізгі бағыттар','Main routes');
add('internationalNeed','Нужна международная доставка','Халықаралық жеткізу қажет','International delivery needed');
add('notes','Комментарий','Пікір','Comments');add('officeContact','Контакт вашего офиса','Кеңсе байланыстары','Your office contact');
add('documentsHeading','Документы и правила','Құжаттар мен ережелер','Documents and rules');
add('routeTitle','Проверьте ваш маршрут','Бағытыңызды тексеріңіз','Check your route');
add('routeLead','Выберите города: покажем тарифную зону и контакты пунктов.','Қалаларды таңдаңыз: тарифтік аймақ пен пункттердің байланыстарын көрсетеміз.','Choose cities to see the rate zone and location contacts.');
add('fromCity','Откуда','Қайдан','From');add('toCity','Куда','Қайда','To');
add('noOffice','В справочнике нет пункта этого города. Уточните забор и доставку в офисе РИКА.','Анықтамалықта бұл қаланың пункті жоқ. Алып кету мен жеткізуді РИКА кеңсесінен нақтылаңыз.','No location for this city is listed. Contact RIKA to confirm collection and delivery.');
add('rateZone','Тарифная зона','Тарифтік аймақ','Rate zone');
add('routeConfirmation','Тарифную зону маршрута и условия забора подтвердит офис. Для малых населённых пунктов доступность проверяется отдельно.','Бағыттың тарифтік аймағы мен алып кету шарттарын кеңсе растайды. Шағын елді мекендер үшін қолжетімділік бөлек тексеріледі.','The office confirms the route zone and collection terms. Availability for smaller settlements requires confirmation.');
add('businessTitle','Доставка для бизнеса','Бизнеске арналған жеткізу','Business delivery');
add('businessDescription','Регулярные отправления по Казахстану и за рубеж, обслуживание по договору и корпоративные условия.','Қазақстан және шетел бойынша тұрақты жөнелтімдер, шарт бойынша қызмет және корпоративтік талаптар.','Regular shipments across Kazakhstan and abroad, contract service and corporate terms.');
add('businessButton','Получить предложение','Ұсыныс алу','Request an offer');
add('privateLead','Тарифы, отправка посылок и документов, вызов курьера и поиск ближайшего пункта.','Тарифтер, құжаттар мен сәлемдемелерді жіберу, курьер шақыру және жақын пунктті іздеу.','Rates, parcel and document delivery, courier pickup and nearby locations.');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tr=(k,tag='span',attr='')=>`<${tag} data-i18n="${k}" ${attr}>${esc(dict.ru[k]||k)}</${tag}>`;
const a=(href,k,cls='button secondary')=>`<a class="${cls}" href="${href}">${tr(k)} <span aria-hidden="true">↗</span></a>`;
const input=(key,name,attrs='')=>`<label>${tr(key)}<input name="${name}" ${attrs}></label>`;
const cities=[...new Set(offices.map(o=>o.city.ru))];
function form(kind){const business=kind==='business';return `<form class="inner-form contact-request" data-kind="${kind}"><p class="form-note">${tr('formNote')}</p><div class="form-grid">${!business?`<label>${tr('personType')}<select name="person"><option value="private" data-i18n="privatePerson">Физическое лицо</option><option value="legal" data-i18n="legalPerson">Юридическое лицо</option></select></label>`:''}<div class="company-fields full-span" ${!business?'hidden':''}><div class="form-grid">${input('companyName','company','maxlength="140" '+(business?'required':''))}${input('bin','bin','inputmode="numeric" pattern="[0-9]{12}" minlength="12" maxlength="12" '+(business?'required':''))}</div></div>${input('senderName','name','required minlength="2" maxlength="80" autocomplete="name"')}${input('phoneLabel','phone','required type="tel" pattern="[+]?[0-9 ()-]{10,22}" maxlength="22" autocomplete="tel"')}${input('emailLabel','email','type="email" required maxlength="120" autocomplete="email"')}<label>${tr('cityLabel')}<select name="city">${cities.map(c=>`<option>${esc(c)}</option>`).join('')}</select></label>${business?`${input('monthly','monthly','type="number" min="1" max="1000000" required')}${input('routes','routes','required maxlength="250"')}<label class="checkbox-line full-span"><input name="international" type="checkbox">${tr('internationalNeed')}</label>`:input('addressLabel','address','required minlength="5" maxlength="200"')}<label class="full-span">${tr('notes')}<textarea name="notes" rows="3" maxlength="1000"></textarea></label></div><div class="office-contact"></div><button type="submit" class="button primary">${tr('prepareEmail')} →</button><div class="request-result result-box" role="status" hidden></div></form>`;}
let home=read('index.html');
const oldHeader=home.match(/<div class="prototype-bar">[\s\S]*?<\/header>/)[0];
let header=oldHeader.replace(/<div class="prototype-bar">[\s\S]*?<\/div><\/div>/,'');
const nav=()=>[['private.html','privateNav'],['service-business.html','businessNav'],['tariffs.html','tariffs'],['delivery-zones.html','geography'],['contacts.html','contacts']].map(([url,k])=>a(url,k,'')).join('');
header=header.replace(/<nav class="desktop-nav"[\s\S]*?<\/nav>/,`<nav class="desktop-nav" aria-label="Главная навигация">${nav()}</nav>`).replace(/<nav id="mobile-menu"[\s\S]*?<\/nav>/,`<nav id="mobile-menu" class="mobile-menu" hidden aria-label="Мобильная навигация">${nav()}${a('documents.html','documentsHeading','')}${a('news.html','news','')}${a('about.html','company','')}${a('courier.html','courierAction','')}</nav>`);
const oldFooter=home.match(/<footer[\s\S]*?<\/footer>/)[0];
const footer=oldFooter.replace(/(<span data-i18n="footerClients">[\s\S]*?<\/span>)/,'$1'+a('documents.html','documentsHeading','')+a('tariffs.html','tariffs','')+a('courier.html','courierAction',''));
const symbols=home.match(/<svg class="icon-defs"[\s\S]*?<\/svg>/)[0];
function page(slug,titleKey,leadKey,body){write(slug,`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(dict.ru[titleKey])} — РИКА</title><link rel="icon" href="assets/favicon.png"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="inner.css"><script src="i18n.js" defer></script><script src="pages-i18n.js" defer></script><script src="data.js" defer></script><script src="app.js" defer></script><script src="inner.js" defer></script></head><body data-page-title="${titleKey}">${header}<main id="main"><div class="container"><nav class="breadcrumbs">${a('index.html','home','')} / ${tr(titleKey)}</nav><div class="inner-hero"><div>${tr(titleKey,'h1')}${tr(leadKey,'p','class="inner-lead"')}</div></div></div>${body}</main>${footer}${symbols}</body></html>`);}
const taskCards=`<section class="container audience-grid">${a('private.html','privateNav','audience-card')}${a('service-business.html','businessNav','audience-card')}${a('documents.html','documentsHeading','audience-card')}</section>`;
const privateZones=JSON.parse(fs.readFileSync(path.join(root,'tools/zones.json'),'utf8').replace(/^\uFEFF/,''));
const officialTables=JSON.parse(fs.readFileSync(path.join(root,'tools/official-tables.json'),'utf8'));
const tableSources={'service-documents.html':'https://rika.kz/ru/service/dokumenty-sng-dz/','service-international.html':'https://rika.kz/ru/service/posylky-sng-dz/','extra-services.html':'https://rika.kz/ru/publikatsii/article/dopolnitelnye-uslugi.html'};
const businessOnly=[];
const routeCities=[...new Set([...privateZones.map(z=>z.city.ru),...businessOnly,...cities])].sort((a,b)=>a.localeCompare(b,'ru'));
const routeSearch=`<section class="container route-search"><h2>${tr('routeTitle')}</h2><p>${tr('routeLead')}</p><div class="form-grid"><label>${tr('personType')}<select id="route-person"><option value="private" data-i18n="privatePerson">Физическое лицо</option><option value="business" data-i18n="legalPerson">Юридическое лицо</option></select></label>${['from','to'].map((side,i)=>`<label>${tr(i?'toCity':'fromCity')}<select id="route-${side}">${routeCities.map(c=>`<option ${c===(i?'Алматы':'Астана')?'selected':''}>${esc(c)}</option>`).join('')}</select></label>`).join('')}</div><div id="route-result" role="status"></div><div class="task-grid">${a('calculator.html','calculatorAction')}${a('tariffs.html','tariffs')}${a('courier.html','courierAction')}</div></section>`;
write('route-data.js','window.RIKA_ROUTE_DATA='+JSON.stringify({privateZones,businessOnly})+';');
page('private.html','privateNav','privateLead',`<section class="container task-grid">${a('tariffs.html','tariffs')}${a('calculator.html','calculatorAction')}${a('courier.html','courierAction')}${a('tracking.html','trackingAction')}${a('contacts.html','contacts')}${a('documents.html','documentsHeading')}</section>`);
page('courier.html','courierAction','courierDesc',`<section class="container narrow-section">${form('courier')}</section>`);
page('service-business.html','businessTitle','businessDescription',`<section class="container"><div class="benefit-grid">${[['01','Работа по договору','Шарт бойынша қызмет','Contract service'],['02','Регулярные отправления','Тұрақты жөнелтімдер','Regular shipments'],['03','Казахстан и мир','Қазақстан және әлем','Kazakhstan and worldwide']].map(([n,ru,kk,en],i)=>{add('benefit'+i,ru,kk,en);return `<article><strong>${n}</strong>${tr('benefit'+i,'h2')}</article>`}).join('')}</div><div class="task-grid">${a('business-tariffs.html','tariffs')}${a('documents.html','documentsHeading')}${a('#offer','offerAction')}</div></section><section class="container narrow-section section" id="offer">${tr('offerAction','h2')}${form('business')}</section>`);
add('contractHeading','Подключение к обслуживанию','Қызметке қосылу','Start working with RIKA');
add('contractSteps','1. Ознакомьтесь с договором. 2. Заполните анкету организации. 3. Отправьте документы на tse21@rika.kz и согласуйте подписание.','1. Шартпен танысыңыз. 2. Ұйым сауалнамасын толтырыңыз. 3. Құжаттарды tse21@rika.kz мекенжайына жіберіп, қол қоюды келісіңіз.','1. Read the contract. 2. Complete the company questionnaire. 3. Email the documents to tse21@rika.kz and arrange signing.');
page('contract.html','contractHeading','contractSteps',`<section class="container task-grid">${a('documents.html','documentsHeading')}${a('service-business.html#offer','offerAction')}<a class="button primary" href="mailto:tse21@rika.kz">tse21@rika.kz ↗</a><a class="button secondary" href="tel:+77013096808">+7 701 309 68 08</a></section>`);
add('documentsLead','Документы для договора и полезная информация перед отправкой.','Шартқа арналған құжаттар және жөнелту алдындағы пайдалы ақпарат.','Contract documents and useful information before sending.');
const officialDocs=[['Типовой договор · DOCX','Үлгілік шарт · DOCX','Standard contract · DOCX','documents/contract.docx'],['Анкета организации · DOCX','Ұйым сауалнамасы · DOCX','Company questionnaire · DOCX','documents/questionnaire.docx'],['Правила и информация для клиентов','Клиенттерге арналған ережелер','Client information','clients.html'],['Порядок заключения договора','Шарт жасасу тәртібі','How to arrange a contract','contract.html']];
add('openDocument','Открыть документ','Құжатты ашу','Open document');
add('openSection','Перейти в раздел','Бөлімге өту','Open section');
page('documents.html','documentsHeading','documentsLead',`<section class="container catalog-grid">${officialDocs.map(([ru,kk,en,url],i)=>{add('doc'+i,ru,kk,en);return `<a class="catalog-card color-${i%3}" href="${url}">${tr('doc'+i,'h2')}${tr(url.endsWith('.docx')?'openDocument':'openSection')}<span aria-hidden="true">↗</span></a>`}).join('')}</section>`);
// Published corporate table, checked against rika.kz on 19 October 2026.
add('businessRates','Тарифы для бизнеса','Бизнес тарифтері','Business rates');add('ratesLead','Экспресс-доставка по Казахстану. Цены в тенге, включая НДС 16%.','Қазақстан бойынша экспресс-жеткізу. Бағалар теңгемен, ҚҚС 16% қосылған.','Express delivery in Kazakhstan. Prices in KZT, including 16% VAT.');
const rows=[['Внутри города','Қала ішінде','Within city','1 760','520','1–2','1'],['Межгород','Қалааралық','Intercity','2 900','520','1–4','2'],['Межгород специальный','Арнайы қалааралық','Special intercity','3 350','520','3–6','3'],['Другие населённые пункты','Басқа елді мекендер','Other settlements','5 860','650','3–10','4']];
add('ratesNotes','До 0,5 кг; доплата за каждые следующие 0,5 кг. День приёма не входит в срок. Внутригородские отправления свыше 10 кг — по согласованию. Расчётный вес: большее из фактического и объёмного (Д × Ш × В / 5000).','0,5 кг дейін; әр келесі 0,5 кг үшін қосымша төлем. Қабылдау күні мерзімге кірмейді. Қала ішінде 10 кг-нан жоғары — келісім бойынша. Есептік салмақ: нақты және көлемдік салмақтың үлкені (Ұ × Е × Б / 5000).','Base price up to 0.5 kg; surcharge per additional 0.5 kg. Collection day is excluded. City shipments over 10 kg require confirmation. Chargeable weight is the greater of actual and volumetric weight (L × W × H / 5000).');
page('business-tariffs.html','businessRates','ratesLead',`<section class="container"><div class="tariff-table-wrap"><table class="tariff-table"><thead><tr>${['tableService','tableHalf','tableExtra','tableDays','zone'].map(k=>tr(k,'th')).join('')}</tr></thead><tbody>${rows.map(([ru,kk,en,...v],i)=>{add('businessRate'+i,ru,kk,en);return `<tr>${tr('businessRate'+i,'th')}${v.map(x=>`<td>${x}</td>`).join('')}</tr>`}).join('')}</tbody></table></div>${tr('ratesNotes','p','class="source-note"')}<div class="task-grid">${a('delivery-zones.html','geography')}${a('calculator.html','calculatorAction')}${a('service-business.html#offer','offerAction')}</div><p class="source-note"><a href="https://rika.kz/ru/service/pochta-dlya-biznesa/">Источник: rika.kz · 19.10.2026 ↗</a></p></section>`);
// Remove obsolete offline examples entirely; retain provider services.
for(const name of fs.readdirSync(dist).filter(n=>n.endsWith('.html'))){let h=read(name);h=h.replace(oldHeader,header).replace(oldFooter,footer).replace(/<details class="demo-details">[\s\S]*?<\/details>/g,'').replace(/<div class="prototype-bar">[\s\S]*?<\/div><\/div>/g,'');
 h=h.replace(/src="assets\/logo.png"/g,'src="assets/logo-official.png"').replace(/width="135" height="101"/g,'width="70" height="110"');
 h=h.replace(/(<(?:span|p|h[1-6]|a)\b[^>]*data-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/(?:span|p|h[1-6]|a)>)/g,(all,start,k,body,end)=>dict.ru[k]!==undefined?start+esc(dict.ru[k]).replace(/&lt;br\s*\/?&gt;/g,'<br>')+end:all);
 h=h.replace(/<noscript>[\s\S]*?<\/noscript>/g,'<noscript><p>Навигация и телефоны доступны без JavaScript.</p></noscript>');
 if(name==='index.html'){h=h.replace('</head>','<script src="data.js" defer></script></head>');h=h.replace(/<a class="text-link" href="services.html"><span data-i18n="heroLink">[\s\S]*?<\/a>/,`<div class="hero-actions">${a('calculator.html','calculatorAction','button primary')}${a('tracking.html','trackingAction')}</div>`);h=h.replace(/(<section class="facts container")/,taskCards+'$1');h=h.replace('href="contract.html" id="contract-link"','href="service-business.html#offer" id="contract-link"');}
 if(name==='tariffs.html'){h=h.replace('<section class="tariff-snapshot">',`<div class="task-grid">${a('business-tariffs.html','businessRates')}${a('service-economy.html','economyTitle')}${a('service-documents.html','documents')}${a('service-international.html','internationalTitle')}</div><section class="tariff-snapshot">`);}
 if(name==='sitemap.html')h=h.replace('<div class="container sitemap-grid">',`<div class="container sitemap-grid">${a('private.html','privateNav','')}${a('documents.html','documentsHeading','')}${a('business-tariffs.html','businessRates','')}`);
 if(name==='delivery-zones.html')h=h.replace('<div class="zone-summary">',`</section>${routeSearch}<section class="container"><div class="zone-summary">`).replace('</head>','<script src="route-data.js" defer></script></head>');
 if(name==='calculator.html')h=h.replace('</main>',`<section class="container task-grid">${a('courier.html','courierAction')}${a('contacts.html','contacts')}${a('tariffs.html','tariffs')}</section></main>`);
 if(officialTables[name])h=h.replace('</main>',`<section class="container section"><details class="published-rates"><summary>${tr('officialTables')}</summary>${tr('tableSource','p','class="source-note"')}${officialTables[name].map(rows=>`<div class="tariff-table-wrap" tabindex="0" role="region" aria-label="Тарифная таблица РИКА"><table class="tariff-table"><thead><tr>${rows[0].map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`).join('')}<p><a href="${tableSources[name]}" target="_blank" rel="noopener noreferrer">rika.kz · Условия и примечания ↗</a></p></details></section></main>`);
 if(name==='service-economy.html'){
  add('economyRates','Алматы ↔ Астана ↔ Караганда · 7–10 рабочих дней','Алматы ↔ Астана ↔ Қарағанды · 7–10 жұмыс күні','Almaty ↔ Astana ↔ Karaganda · 7–10 business days');
  add('economyConditions','До 1 000 кг, в черте города; действует в обе стороны. От 50 кг или сумме измерений от 270 см — коэффициент 1,25; погрузка и разгрузка свыше 50 кг оплачиваются отдельно. Берётся больший из фактического и объёмного веса (Д × Ш × В / 5000).','1 000 кг дейін, қала шегінде, екі бағытта да. 50 кг бастап немесе өлшемдер қосындысы 270 см бастап — 1,25 коэффициенті; 50 кг-нан жоғары тиеу мен түсіру бөлек төленеді. Нақты және көлемдік салмақтың үлкені алынады (Ұ × Е × Б / 5000).','Up to 1,000 kg within city limits, in either direction. A factor of 1.25 applies from 50 kg or 270 cm combined dimensions; loading and unloading over 50 kg cost extra. Chargeable weight is the greater of actual and volumetric weight (L × W × H / 5000).');
  h=h.replace('</main>',`<section class="container">${tr('economyRates','h2')}<div class="tariff-table-wrap"><table class="tariff-table"><thead><tr><th>≤ 5 kg</th><th>≤ 10 kg</th><th>≤ 20 kg</th><th>≤ 30 kg</th><th>+ 1 kg</th></tr></thead><tbody><tr><td>4 000 ₸</td><td>5 000 ₸</td><td>6 000 ₸</td><td>7 500 ₸</td><td>310 ₸</td></tr></tbody></table></div>${tr('economyConditions','p','class="source-note"')}<p class="source-note"><a href="https://rika.kz/ru/service/tarif-ekonom/">Источник: rika.kz ↗</a></p></section></main>`);
 }
 h=h.replace('</head>','<link rel="stylesheet" href="showcase.css"><script src="showcase.js" defer></script></head>');
 // Any remaining obsolete unkeyed copy is removed, rather than relabelled as a working service.
 h=h.replace(/>([^<>]+)</g,(all,s)=>forbidden.test(s)?'>'+esc(clean(s))+'<':all);
 // References remain documented without sending visitors to the previous website.
 h=h.replace(/<a\b[^>]*href="https:\/\/rika\.kz[^\"]*"[^>]*>([\s\S]*?)<\/a>/g,'<span class="source-reference">$1</span>');
 write(name,h);
}
// Feedback uses the same explicit email handoff as other requests.
let q=read('quality.html');q=q.replace(/<form id="quality-form"[\s\S]*?<\/form>/,`<form class="inner-form contact-request" data-kind="quality"><p>${tr('formNote')}</p>${input('senderName','name','required maxlength="80"')}${input('emailLabel','email','type="email" required')}<label>${tr('reviewMessage')}<textarea name="notes" required minlength="10" maxlength="1000" rows="5"></textarea></label><button class="button primary">${tr('prepareEmail')}</button><div class="request-result result-box" role="status" hidden></div></form>`).replace(/<div class="demo-callout">[\s\S]*?<\/div>/,'');write('quality.html',q);
write('i18n.js','window.RIKA_I18N='+JSON.stringify(dict)+';');write('pages-i18n.js','/* Translations are bundled in i18n.js. */');
for(const n of ['showcase.js','showcase.css'])fs.copyFileSync(path.join(root,'tools',n),path.join(dist,n));
console.log('Presentation update prepared: '+fs.readdirSync(dist).filter(n=>n.endsWith('.html')).length+' pages.');
