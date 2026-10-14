(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const lang=()=>document.documentElement.lang;
  const t=k=>window.RIKA_I18N[lang()]?.[k]??window.RIKA_I18N.ru[k]??k;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>s.normalize('NFKC').toLocaleLowerCase().replace(/ё/g,'е').trim();
  function filterOffices(){if(!$('#office-query'))return;const query=normalize($('#office-query').value),region=$('#office-region').value;let count=0;$$('[data-office-card]').forEach(card=>{const office=window.RIKA_OFFICES.find(o=>o.id===card.dataset.officeId);const hay=normalize(Object.values(office.city).join(' ')+' '+Object.values(office.address).join(' ')+' '+office.displayPhone);const show=(!query||hay.includes(query))&&(region==='all'||card.dataset.region===region);card.hidden=!show;if(show)count++});$('#office-count').textContent=t('found').replace('{count}',count);$('#office-empty').hidden=count>0;}
  $('#office-query')?.addEventListener('input',filterOffices);$('#office-region')?.addEventListener('change',filterOffices);$('#office-reset')?.addEventListener('click',()=>{$('#office-query').value='';$('#office-region').value='all';filterOffices();$('#office-query').focus()});
  function filterZones(){if(!$('#zone-query'))return;const query=normalize($('#zone-query').value);let count=0;$$('[data-zone-city]').forEach((card,index)=>{const zone=window.RIKA_ZONES[index];const show=!query||normalize(Object.values(zone.city).join(' ')).includes(query);card.hidden=!show;if(show)count++});$('#zone-count').textContent=t('citiesFound').replace('{count}',count);$('#zone-empty').hidden=count>0;}
  $('#zone-query')?.addEventListener('input',filterZones);
  let newsCategory='all';
  function filterNews(){if(!$('#news-query'))return;const query=normalize($('#news-query').value);let count=0;$$('[data-news-card]').forEach(card=>{const show=(!query||normalize(card.textContent).includes(query))&&(newsCategory==='all'||card.dataset.category===newsCategory);card.hidden=!show;if(show)count++});$('#news-count').textContent=t('newsFound').replace('{count}',count);$('#news-empty').hidden=count>0;}
  $('#news-query')?.addEventListener('input',filterNews);$$('[data-news-category]').forEach(button=>button.addEventListener('click',()=>{newsCategory=button.dataset.newsCategory;$$('[data-news-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterNews()}));
  let courierReviewed=false;
  const row=(label,value)=>`<dt>${escape(t(label))}</dt><dd>${escape(value)}</dd>`;
  function courierPreview(){if(!courierReviewed)return;const city=$('#pickup-city').selectedOptions[0].textContent;$('#courier-preview').innerHTML=`<span class="mode-badge">${escape(t('demoBadge'))}</span><h3>${escape(t('notSent'))}</h3><p>${escape(t('notSentBody'))}</p><dl class="preview-summary">${row('senderName',$('#sender-name').value)}${row('phoneLabel',$('#sender-phone').value)}${row('cityLabel',city)}${row('addressLabel',$('#pickup-address').value)}${row('parcelType',t($('#parcel-type').value))}</dl><a class="subtle-link" href="contacts.html">${escape(t('contactHelp'))} →</a>`;$('#courier-preview').hidden=false;}
  $('#courier-demo-form')?.addEventListener('submit',event=>{event.preventDefault();courierReviewed=true;courierPreview()});
  $('#courier-demo-form')?.addEventListener('input',()=>{courierReviewed=false;$('#courier-preview').hidden=true});
  $('#courier-sample')?.addEventListener('click',()=>{$('#sender-name').value=lang()==='ru'?'Демо Отправитель':lang()==='kk'?'Демо Жіберуші':'Demo Sender';$('#sender-phone').value='+7 000 000 00 00';$('#pickup-address').value=lang()==='ru'?'Демонстрационная улица, 1':lang()==='kk'?'Демо көшесі, 1':'Demo Street, 1';courierReviewed=false;$('#courier-preview').hidden=true;$('#sender-name').focus()});
  let qualityReviewed=false;
  function qualityPreview(){if(!qualityReviewed)return;const rating=$('input[name="rating"]:checked').value;$('#quality-preview').innerHTML=`<span class="mode-badge">${escape(t('demoBadge'))}</span><h3>${escape(t('feedbackNotSent'))}</h3><p>${escape(t('feedbackNote'))}</p><dl class="preview-summary">${row('rating',rating+' / 5')}${row('reviewMessage',$('#review-message').value)}</dl>`;$('#quality-preview').hidden=false;}
  $('#quality-form')?.addEventListener('submit',event=>{event.preventDefault();qualityReviewed=true;qualityPreview()});$('#quality-form')?.addEventListener('input',()=>{qualityReviewed=false;$('#quality-preview').hidden=true});
  function refresh(){filterOffices();filterZones();filterNews();courierPreview();qualityPreview();}
  document.addEventListener('rika:language',refresh);refresh();
})();
