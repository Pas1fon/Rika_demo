(() => {
 'use strict';
 const tabs=[...document.querySelectorAll('.rates-tabs [role="tab"]')];
 const selectHash=()=>{const key=location.hash.slice(1);const button=tabs.find(b=>b.getAttribute('aria-controls')===key);if(button)button.click();};
 tabs.forEach(b=>b.addEventListener('click',()=>history.replaceState(null,'','#'+b.getAttribute('aria-controls'))));
 if(tabs.length){selectHash();window.addEventListener('hashchange',selectHash);}
 const cities=document.querySelector('#office-city');
 if(cities){const value=new URLSearchParams(location.search).get('city');if(value&&[...cities.options].some(o=>o.value===value)){cities.value=value;cities.dispatchEvent(new Event('change'));}}
})();
