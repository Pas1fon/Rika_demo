(() => {
 'use strict';
 document.querySelectorAll('[data-inline-rate]').forEach(button=>button.addEventListener('click',()=>{
  const section=button.closest('#rates');
  section.querySelectorAll('[data-inline-rate]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  section.querySelectorAll('[data-inline-panel]').forEach(panel=>panel.hidden=panel.dataset.inlinePanel!==button.dataset.inlineRate);
 }));
 document.querySelectorAll('[data-quantity-step]').forEach(button=>button.addEventListener('click',()=>{
  const input=button.closest('.quantity-control').querySelector('input');
  const value=Number(input.value)||0,step=Number(button.dataset.quantityStep);
  input.value=String(Math.max(Number(input.min)||5,Math.min(Number(input.max)||1000000,value+step)));
  input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));
 }));
 const cities=window.RIKA_CITY_ROUTING||[],offices=window.RIKA_OFFICES||[];
 if(!cities.length)return;
 const lang=()=>document.documentElement.lang;
 const t=k=>window.RIKA_I18N[lang()]?.[k]||window.RIKA_I18N.ru[k]||k;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let selected='Астана';try{selected=localStorage.getItem('rika-my-city')||selected;}catch{}
 if(!cities.some(c=>c.name===selected))selected='Астана';
 const update=()=>{const city=cities.find(c=>c.name===selected);const office=offices.find(o=>o.id===city.officeId);if(!office)return;
  document.querySelectorAll('#my-city,#map-city,.courier-city').forEach(s=>s.value=city.name);
  document.querySelectorAll('.courier-whatsapp-form').forEach(form=>{
   const info=form.querySelector('.courier-wa-office');
   info.innerHTML=`<strong>${esc(t('courierOffice'))}: ${esc(office.city[lang()]||office.city.ru)}</strong><p>${city.routed?esc(t('servedByAstana'))+' · ':''}<a href="tel:${esc(office.phone)}">${esc(office.displayPhone)}</a></p>`;
   form.querySelector('.courier-wa-result').hidden=true;
  });
  const contact=document.querySelector('.floating-contact');if(contact){contact.textContent=`WhatsApp · ${city.labels[lang()]||city.name}`;if(city.whatsapp){contact.href='https://wa.me/'+city.whatsapp.replace(/\D/g,'');contact.target='_blank';contact.rel='noopener noreferrer';}else{contact.href='tel:'+office.phone;contact.textContent=t('phoneAction')+' · '+(city.labels[lang()]||city.name);contact.removeAttribute('target');}}
  document.querySelectorAll('[data-map-city]').forEach(p=>p.setAttribute('aria-pressed',String(p.dataset.mapCity===selected)));
  const panel=document.querySelector('#map-office-card');if(panel){panel.innerHTML=`<p class="map-selected-city">${esc(city.labels[lang()]||city.name)}</p>${city.routed?`<p class="served-by">${esc(t('servedByAstana'))}</p>`:''}<h3>${esc(office.type[lang()]||office.type.ru)} · ${esc(office.city[lang()]||office.city.ru)}</h3><p class="map-address">${esc(office.address[lang()]||office.address.ru)}</p><a class="map-phone" href="tel:${esc(office.phone)}">${esc(office.displayPhone)}</a><p class="map-hours">${esc(office.hours[lang()]||office.hours.ru)}</p>${office.email?`<a class="map-email" href="mailto:${esc(office.email)}">${esc(office.email)}</a>`:''}<div class="map-contact-actions"><a class="button dark" href="tel:${esc(office.phone)}">${esc(t('phoneAction'))}</a>${city.whatsapp?`<a class="button secondary" href="https://wa.me/${city.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`:''}</div>`;}
 };
 const choose=value=>{if(!cities.some(c=>c.name===value))return;selected=value;try{localStorage.setItem('rika-my-city',selected);}catch{}update();document.dispatchEvent(new CustomEvent('rika:city',{detail:selected}));};
 document.querySelectorAll('#my-city,#map-city,.courier-city').forEach(s=>s.addEventListener('change',()=>choose(s.value)));

 document.querySelectorAll('.courier-whatsapp-form,.contact-request[data-kind=business]').forEach(form=>{
  const phone=form.elements.phone,check=form.elements.check;
  const left=2+Math.floor(Math.random()*8),right=1+Math.floor(Math.random()*9);
  form.querySelector('.check-question').textContent=`${left} + ${right} =`;
  const normalizePhone=value=>{let digits=value.replace(/\D/g,'');if(digits.length===11&&digits[0]==='8')digits='7'+digits.slice(1);if(digits.length===10)digits='7'+digits;return digits;};
  const validatePhone=(show=false)=>{const digits=normalizePhone(phone.value),ok=/^7[67][0-9]{9}$/.test(digits)&&!/^7([0-9])\1{9}$/.test(digits);phone.setCustomValidity(ok?'':t('phoneInvalid'));phone.setAttribute('aria-invalid',String(show&&!ok));form.querySelector('.phone-error').textContent=show&&!ok?t('phoneInvalid'):'';return ok;};
  phone.addEventListener('input',()=>{phone.value=phone.value.replace(/[^0-9+ ()-]/g,'').replace(/(?!^)\+/g,'');validatePhone(false);});
  phone.addEventListener('blur',()=>{if(validatePhone(true))phone.value='+'+normalizePhone(phone.value);});
  phone.addEventListener('invalid',()=>validatePhone(true));
  check.addEventListener('input',()=>{check.value=check.value.replace(/\D/g,'');check.setCustomValidity('');form.querySelector('.check-error').textContent='';});
  document.addEventListener('rika:language',()=>{if(phone.value)validatePhone(phone.getAttribute('aria-invalid')==='true');check.setCustomValidity('');});
  if(form.dataset.kind==='business'){
   form.addEventListener('submit',event=>{
    validatePhone(true);const ok=check.value.trim()!==''&&Number(check.value)===left+right;
    check.setCustomValidity(ok?'':t('checkInvalid'));form.querySelector('.check-error').textContent=ok?'':t('checkInvalid');
    if(!form.reportValidity()){event.preventDefault();event.stopImmediatePropagation();return;}
    phone.value='+'+normalizePhone(phone.value);
   },true);
   return;
  }
  form.addEventListener('input',()=>form.querySelector('.courier-wa-result').hidden=true);
  form.addEventListener('submit',event=>{
   event.preventDefault();validatePhone(true);const checkOk=check.value.trim()!==''&&Number(check.value)===left+right;check.setCustomValidity(checkOk?'':t('checkInvalid'));form.querySelector('.check-error').textContent=checkOk?'':t('checkInvalid');if(!form.reportValidity())return;phone.value='+'+normalizePhone(phone.value);
   const city=cities.find(c=>c.name===form.elements.city.value),office=offices.find(o=>o.id===city.officeId),result=form.querySelector('.courier-wa-result');
   const values=new FormData(form);
   const text=[t('courierAction'),...Object.entries({name:'senderName',phone:'phoneLabel',city:'cityLabel',address:'addressLabel',notes:'notes'}).filter(([key])=>String(values.get(key)||'').trim()).map(([key,label])=>t(label)+': '+String(values.get(key)).trim())].join('\n');
   result.innerHTML=`<pre class="request-text">${esc(text)}</pre><p>${esc(t('courierWhatsAppNote'))}</p>${city.whatsapp?`<a class="button primary" href="https://wa.me/${city.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${esc(t('openWhatsAppRequest'))}</a>`:`<p>${esc(t('courierNoWhatsApp'))}</p><a class="button primary" href="tel:${esc(office.phone)}">${esc(t('phoneAction'))}</a>`}`;
   result.hidden=false;
  });
 });
 document.querySelectorAll('[data-map-city]').forEach(p=>p.addEventListener('click',()=>choose(p.dataset.mapCity)));
 document.addEventListener('rika:language',update);
 window.addEventListener('storage',e=>{if(e.key==='rika-my-city'&&cities.some(c=>c.name===e.newValue)){selected=e.newValue;update();}});
 update();
})();
