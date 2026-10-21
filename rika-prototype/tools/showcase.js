(() => {
 'use strict';
 const t=k=>window.RIKA_I18N[document.documentElement.lang]?.[k]||window.RIKA_I18N.ru[k]||k;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const route=document.querySelector('#route-result');
 function updateRoute(){if(!route)return;const from=document.querySelector('#route-from').value,to=document.querySelector('#route-to').value,business=document.querySelector('#route-person').value==='business';const data=window.RIKA_ROUTE_DATA;const zoneFor=city=>{const z=data.privateZones.find(z=>z.city.ru===city);if(z)return String(z.zone).includes('3')?3:2;return business&&data.businessOnly.includes(city)?3:4;};const z=Math.max(zoneFor(from),zoneFor(to));const zone=from===to&&z===2?1:z;const points=(window.RIKA_OFFICES||[]).filter(o=>[from,to].includes(o.city.ru));route.innerHTML=`<h3>${escape(from)} → ${escape(to)}</h3><p><strong>${escape(t('rateZone'))}: ${zone}</strong></p><p class="source-note">${escape(t('routeConfirmation'))}</p><div class="route-points">${points.length?points.map(o=>`<article><strong>${escape(o.city[document.documentElement.lang]||o.city.ru)}</strong><p>${escape(o.address[document.documentElement.lang]||o.address.ru)}</p><a href="tel:${escape(o.phone)}">${escape(o.displayPhone)}</a></article>`).join(''):`<p>${escape(t('noOffice'))}</p>`}</div>`;}
 document.querySelectorAll('[id^="route-"]').forEach(n=>n.addEventListener('change',updateRoute));document.addEventListener('rika:language',updateRoute);updateRoute();
 document.querySelectorAll('.contact-request').forEach(form=>{
  let prepared='';
  const contact=form.querySelector('.office-contact');
  const office=()=>{const city=form.elements.city?.value;return (window.RIKA_OFFICES||[]).find(o=>o.city.ru===city&&o.email)||(window.RIKA_OFFICES||[]).find(o=>o.city.ru===city);};
  const update=()=>{const legal=form.dataset.kind==='business'||form.elements.person?.value==='legal';const group=form.querySelector('.company-fields');if(group){group.hidden=!legal;group.querySelectorAll('input').forEach(n=>{n.required=legal;n.disabled=!legal;});}if(contact){const o=office();contact.innerHTML=o?`<strong>${escape(t('officeContact'))}</strong><p>${escape(o.city[document.documentElement.lang]||o.city.ru)} · <a href="tel:${escape(o.phone)}">${escape(o.displayPhone)}</a>${o.email?` · <a href="mailto:${escape(o.email)}">${escape(o.email)}</a>`:''}</p>`:'';}};
  form.addEventListener('change',()=>{update();form.querySelector('.request-result').hidden=true;});
  form.addEventListener('input',()=>{form.querySelector('.request-result').hidden=true;});
  form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
   const values=new FormData(form);const kind=form.dataset.kind;
   const subject=kind==='business'?t('offerAction'):kind==='quality'?t('reviewMessage'):t('courierAction');
   const labels={company:'companyName',bin:'bin',name:'senderName',phone:'phoneLabel',email:'emailLabel',city:'cityLabel',address:'addressLabel',monthly:'monthly',routes:'routes',notes:'notes',international:'internationalNeed'};
   prepared=subject+'\n'+Object.entries(labels).filter(([key])=>values.has(key)&&values.get(key)).map(([key,label])=>t(label)+': '+(key==='international'?'✓':values.get(key))).join('\n');
   const email=kind==='business'?'davlatbek.kh@gmail.com':kind==='quality'?'info@rika.kz':office()?.email;
   const result=form.querySelector('.request-result');
   result.innerHTML=`<h3>${escape(t('requestReady'))}</h3><p>${escape(t(kind==='business'?'businessEmailNote':'formNote'))}</p><pre class="request-text">${escape(prepared)}</pre><div class="task-grid">${email?`<a class="button primary" href="mailto:${escape(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prepared)}">${escape(t('prepareEmail'))} ↗</a>`:''}<button class="button secondary copy-request" type="button">${escape(t('copyRequest'))}</button></div>${!email?`<a class="button primary" href="tel:${escape(office()?.phone||'+77172270300')}">${escape(t('phoneAction'))}</a>`:''}`;
   result.hidden=false;
   result.querySelector('.copy-request').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(prepared);e.target.textContent='✓';}catch{const text=result.querySelector('pre');const range=document.createRange();range.selectNodeContents(text);getSelection().removeAllRanges();getSelection().addRange(range);}});
   result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  });
  document.addEventListener('rika:language',()=>{update();form.querySelector('.request-result').hidden=true;});update();
 });
 // Offer WhatsApp only for mobile numbers published for the selected office.
 const contactButton=document.createElement('a');contactButton.className='floating-contact';contactButton.href='contacts.html';contactButton.textContent='Связаться с РИКА ↗';document.body.append(contactButton);
 const mobile=(window.RIKA_OFFICES||[]).find(o=>o.id==='astana-office')?.additionalPhones?.[0]?.phone;
 if(mobile){contactButton.href='https://wa.me/'+mobile.replace(/\D/g,'');contactButton.target='_blank';contactButton.rel='noopener noreferrer';}
 const translateContact=()=>contactButton.textContent=t(mobile?'whatsappAstana':'contactRika')+' ↗';document.addEventListener('rika:language',translateContact);translateContact();
})();
(() => {
 const input=document.querySelector('#country-query');
 if(!input)return;
 input.addEventListener('input',()=>{const query=input.value.normalize('NFKC').toLocaleLowerCase().replace(/ё/g,'е').trim();let count=0;document.querySelectorAll('[data-country-row]').forEach(row=>{const show=row.querySelector('th').textContent.toLocaleLowerCase().replace(/ё/g,'е').includes(query);row.hidden=!show;if(show)count++;});document.querySelector('#country-empty').hidden=count>0;});
})();
