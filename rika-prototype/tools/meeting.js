(() => {
 'use strict';
 document.querySelectorAll('[data-inline-rate]').forEach(button=>button.addEventListener('click',()=>{
  const section=button.closest('#rates');
  section.querySelectorAll('[data-inline-rate]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  section.querySelectorAll('[data-inline-panel]').forEach(panel=>panel.hidden=panel.dataset.inlinePanel!==button.dataset.inlineRate);
 }));
 const cities=window.RIKA_CITY_ROUTING||[],offices=window.RIKA_OFFICES||[];
 if(!cities.length)return;
 const lang=()=>document.documentElement.lang;
 const t=k=>window.RIKA_I18N[lang()]?.[k]||window.RIKA_I18N.ru[k]||k;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let selected='Астана';try{selected=localStorage.getItem('rika-my-city')||selected;}catch{}
 if(!cities.some(c=>c.name===selected))selected='Астана';
 const update=()=>{const city=cities.find(c=>c.name===selected);const office=offices.find(o=>o.id===city.officeId);if(!office)return;
  document.querySelectorAll('#my-city,#map-city').forEach(s=>s.value=city.name);
  const contact=document.querySelector('.floating-contact');if(contact){contact.textContent=`WhatsApp · ${city.labels[lang()]||city.name}`;if(city.whatsapp){contact.href='https://wa.me/'+city.whatsapp.replace(/\D/g,'');contact.target='_blank';contact.rel='noopener noreferrer';}else{contact.href='tel:'+office.phone;contact.textContent=t('phoneAction')+' · '+(city.labels[lang()]||city.name);contact.removeAttribute('target');}}
  document.querySelectorAll('[data-map-city]').forEach(p=>p.setAttribute('aria-pressed',String(p.dataset.mapCity===selected)));
  const panel=document.querySelector('#map-office-card');if(panel){panel.innerHTML=`<p class="map-selected-city">${esc(city.labels[lang()]||city.name)}</p>${city.routed?`<p class="served-by">${esc(t('servedByAstana'))}</p>`:''}<h3>${esc(office.type[lang()]||office.type.ru)} · ${esc(office.city[lang()]||office.city.ru)}</h3><p class="map-address">${esc(office.address[lang()]||office.address.ru)}</p><a class="map-phone" href="tel:${esc(office.phone)}">${esc(office.displayPhone)}</a><p class="map-hours">${esc(office.hours[lang()]||office.hours.ru)}</p>${office.email?`<a class="map-email" href="mailto:${esc(office.email)}">${esc(office.email)}</a>`:''}<div class="map-contact-actions"><a class="button dark" href="tel:${esc(office.phone)}">${esc(t('phoneAction'))}</a>${city.whatsapp?`<a class="button secondary" href="https://wa.me/${city.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`:''}</div>`;}
 };
 const choose=value=>{if(!cities.some(c=>c.name===value))return;selected=value;try{localStorage.setItem('rika-my-city',selected);}catch{}update();document.dispatchEvent(new CustomEvent('rika:city',{detail:selected}));};
 document.querySelectorAll('#my-city,#map-city').forEach(s=>s.addEventListener('change',()=>choose(s.value)));
 document.querySelectorAll('[data-map-city]').forEach(p=>p.addEventListener('click',()=>choose(p.dataset.mapCity)));
 document.addEventListener('rika:language',update);
 window.addEventListener('storage',e=>{if(e.key==='rika-my-city'&&cities.some(c=>c.name===e.newValue)){selected=e.newValue;update();}});
 update();
})();
