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
  function refresh(){filterOffices();filterZones();filterNews();}
  document.addEventListener('rika:language',refresh);refresh();
})();
