(() => {
 'use strict';
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const cities=window.RIKA_CITY_ROUTING||[],offices=window.RIKA_OFFICES||[];
 const language=()=>document.documentElement.lang;
 const t=k=>window.RIKA_I18N?.[language()]?.[k]||window.RIKA_I18N?.ru?.[k]||k;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const local=value=>value?.[language()]||value?.ru||'';
 const mobile=office=>[...(office.additionalPhones||[]).map(p=>p.phone),office.phone].find(p=>/^\+7(?:70|77)\d{8}$/.test(p));
 let selected='Астана';try{selected=localStorage.getItem('rika-my-city')||selected;}catch{}
 if(!cities.some(c=>c.name===selected))selected='Астана';
 let mapCity=selected,mapIndex=0;
 const officeFor=name=>offices.find(o=>o.id===cities.find(c=>c.name===name)?.officeId);
 const mapOffices=()=>{const city=cities.find(c=>c.name===mapCity);return city?.routed?[officeFor(mapCity)]:offices.filter(o=>o.city.ru===mapCity);};
 function renderMap(){
  const panel=$('#map-office-card');if(!panel)return;
  const city=cities.find(c=>c.name===mapCity),items=mapOffices();if(!items.length)return;
  mapIndex=(mapIndex+items.length)%items.length;const office=items[mapIndex],wa=mobile(office);
  $('#map-city').value=mapCity;
  all('[data-map-city]').forEach(pin=>pin.setAttribute('aria-pressed',String(pin.dataset.mapCity===mapCity)));
  panel.innerHTML=`<p class="map-selected-city">${esc(local(city.labels))}</p>${city.routed?`<p class="served-by">${esc(t('servedByAstana'))}</p>`:''}${items.length>1?`<div class="office-switcher"><button type="button" data-office-step="-1" aria-label="${esc(t('previousOffice'))}">‹</button><span>${esc(t('officeDetails'))} ${mapIndex+1} / ${items.length}</span><button type="button" data-office-step="1" aria-label="${esc(t('nextOffice'))}">›</button></div>`:''}<h3>${esc(local(office.type))}</h3><p class="map-address">${esc(local(office.address))}</p><a class="map-phone" href="tel:${esc(office.phone)}">${esc(office.displayPhone)}</a><p class="map-hours">${esc(local(office.hours))}</p>${office.email?`<a class="map-email" href="mailto:${esc(office.email)}">${esc(office.email)}</a>`:''}<div class="map-contact-actions"><a class="button dark" href="tel:${esc(office.phone)}">${esc(t('phoneAction'))}</a>${wa?`<a class="button secondary" href="https://wa.me/${wa.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`:''}</div>`;
 }
 $('#map-office-card')?.addEventListener('click',e=>{const button=e.target.closest('[data-office-step]');if(!button)return;mapIndex+=Number(button.dataset.officeStep);renderMap();$('#map-office-card').querySelector(`[data-office-step="${button.dataset.officeStep}"]`)?.focus();});
 const chooseMap=name=>{if(!cities.some(c=>c.name===name))return;mapCity=name;mapIndex=0;renderMap();};
 $('#map-city')?.addEventListener('change',e=>chooseMap(e.target.value));
 all('[data-map-city]').forEach(pin=>pin.addEventListener('click',()=>chooseMap(pin.dataset.mapCity)));
 function updateCity(){
  const city=cities.find(c=>c.name===selected),office=officeFor(selected);if(!city||!office)return;
  all('#my-city,.courier-city').forEach(select=>select.value=selected);
  const contact=$('.floating-contact');if(contact){contact.textContent=(city.whatsapp?'WhatsApp':t('phoneAction'))+' · '+local(city.labels);contact.href=city.whatsapp?'https://wa.me/'+city.whatsapp.replace(/\D/g,''):'tel:'+office.phone;}
  all('.courier-whatsapp-form').forEach(form=>{form.querySelector('.courier-wa-office').innerHTML=`<strong>${esc(t('courierOffice'))}: ${esc(local(office.city))}</strong><p>${city.routed?esc(t('servedByAstana'))+' · ':''}<a href="tel:${esc(office.phone)}">${esc(office.displayPhone)}</a></p>`;});
 }
 const chooseCity=name=>{if(!cities.some(c=>c.name===name))return;selected=name;try{localStorage.setItem('rika-my-city',name);}catch{}updateCity();};
 all('#my-city,.courier-city').forEach(select=>select.addEventListener('change',()=>chooseCity(select.value)));
 window.addEventListener('storage',e=>{if(e.key==='rika-my-city'&&cities.some(c=>c.name===e.newValue)){selected=e.newValue;updateCity();}});
 all('[data-inline-rate]').forEach(button=>button.addEventListener('click',()=>{const section=button.closest('#rates');section.querySelectorAll('[data-inline-rate]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));section.querySelectorAll('[data-inline-panel]').forEach(panel=>panel.hidden=panel.dataset.inlinePanel!==button.dataset.inlineRate);}));
 all('[data-quantity-step]').forEach(button=>button.addEventListener('click',()=>{const input=button.closest('.quantity-control').querySelector('input');input.value=String(Math.max(1,Math.min(Number(input.max)||1000000,(Number(input.value)||0)+Number(button.dataset.quantityStep))));input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}));
 all('.courier-whatsapp-form,.contact-request[data-kind=business]').forEach(form=>{
  const phone=form.elements.phone,check=form.elements.check;
  const left=2+Math.floor(Math.random()*8),right=1+Math.floor(Math.random()*9);
  if(check)form.querySelector('.check-question').textContent=`${left} + ${right} =`;
  const normalize=value=>{let digits=value.replace(/\D/g,'');if(digits.length===11&&digits[0]==='8')digits='7'+digits.slice(1);if(digits.length===10)digits='7'+digits;return digits;};
  const validate=(show=false)=>{const digits=normalize(phone.value),ok=/^7[67][0-9]{9}$/.test(digits)&&!/^7([0-9])\1{9}$/.test(digits);phone.setCustomValidity(ok?'':t('phoneInvalid'));phone.setAttribute('aria-invalid',String(show&&!ok));form.querySelector('.phone-error').textContent=show&&!ok?t('phoneInvalid'):'';return ok;};
  phone.addEventListener('input',()=>{phone.value=phone.value.replace(/[^0-9+ ()-]/g,'').replace(/(?!^)\+/g,'');validate();});phone.addEventListener('blur',()=>{if(validate(true))phone.value='+'+normalize(phone.value);});phone.addEventListener('invalid',()=>validate(true));
  form.elements.bin?.addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,''));
  check?.addEventListener('input',()=>{check.value=check.value.replace(/\D/g,'');check.setCustomValidity('');form.querySelector('.check-error').textContent='';});
  form.addEventListener('submit',event=>{
   event.preventDefault();event.stopImmediatePropagation();validate(true);
   if(check){const ok=check.value.trim()!==''&&Number(check.value)===left+right;check.setCustomValidity(ok?'':t('checkInvalid'));form.querySelector('.check-error').textContent=ok?'':t('checkInvalid');}
   if(!form.reportValidity())return;phone.value='+'+normalize(phone.value);
   const business=form.dataset.kind==='business',values=new FormData(form),subject=t(business?'offerAction':'courierAction');
   const labels=business?{company:'companyName',bin:'bin',name:'senderName',phone:'phoneLabel',email:'emailLabel',city:'cityLabel',monthly:'monthly',routes:'routes',notes:'notes',international:'internationalNeed'}:{name:'senderName',bin:'binIin',phone:'phoneLabel',city:'cityLabel',address:'addressLabel',notes:'notes'};
   const text=[subject,...Object.entries(labels).filter(([key])=>String(values.get(key)||'').trim()).map(([key,label])=>t(label)+': '+(key==='international'?t('yesAnswer'):String(values.get(key)).trim()))].join('\n');
   if(business){window.location.href='mailto:davlatbek.kh@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(text);return;}
   const city=cities.find(c=>c.name===values.get('city')),office=officeFor(city.name);
   if(city.whatsapp)window.open('https://wa.me/'+city.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');else window.location.href='tel:'+office.phone;
  },true);
  document.addEventListener('rika:language',()=>{if(phone.value)validate(phone.getAttribute('aria-invalid')==='true');check?.setCustomValidity('');});
 });
 function updateVideo(){all('video[data-weight-video]').forEach(video=>{const lang=language();if(video.dataset.videoLang===lang)return;video.pause();video.dataset.videoLang=lang;video.poster=`assets/volume-weight-${lang}.jpg`;video.querySelector('source').src=`assets/volume-weight-${lang}.mp4`;const track=video.querySelector('track');track.src=`assets/volume-weight-${lang}.vtt`;track.srclang=lang;track.label={ru:'Русский',kk:'Қазақша',en:'English'}[lang];video.load();});}
 document.addEventListener('rika:language',()=>{updateCity();renderMap();updateVideo();});updateCity();renderMap();updateVideo();
})();

// Synchronize Courierexe through its own language endpoint before reloading embeds.
(() => {
 const frames=[...document.querySelectorAll('iframe.service-frame')].filter(frame=>frame.src.startsWith('https://home.courierexe.ru/350/'));
 if(!frames.length)return;
 const codes={ru:1,en:2,kk:3};
 let revision=0,setter=null;
 const sync=()=>{
  const code=codes[document.documentElement.lang];if(!code)return;
  const current=++revision;
  if(setter)setter.remove();
  setter=document.createElement('iframe');setter.hidden=true;setter.title='Courierexe language';setter.setAttribute('aria-hidden','true');
  setter.addEventListener('load',()=>{if(current!==revision)return;frames.forEach(frame=>{const url=frame.getAttribute('src');frame.setAttribute('src',url);});setter.remove();setter=null;},{once:true});
  setter.src='https://home.courierexe.ru/translate/lang?lang='+code;
  document.body.append(setter);
 };
 document.addEventListener('rika:language',sync);sync();
})();
