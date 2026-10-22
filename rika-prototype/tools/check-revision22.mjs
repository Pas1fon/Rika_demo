import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist'),read=n=>fs.readFileSync(path.join(dist,n),'utf8');
const data={window:{}};for(const file of ['i18n.js','city-routing.js','data.js'])vm.runInNewContext(read(file),data);
const script=fs.readFileSync(path.join(root,'tools/meeting.js'),'utf8').split('// Synchronize Courierexe')[0];
function field(value=''){return {value,custom:'',attrs:{},listeners:{},setCustomValidity(value){this.custom=value;},setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k];},addEventListener(k,fn){this.listeners[k]=fn;}};}
function runForm(business=false){
 const entries={name:'Sample Sender',bin:'123456789012',phone:'87015317608',city:'Кокшетау',address:'Example street 1',notes:'Box',company:'Example company',email:'example@example.com',monthly:'7',routes:'Алматы'};
 const elements=Object.fromEntries(Object.entries(entries).map(([k,v])=>[k,field(v)]));if(business)elements.check=field('3');
 const ui=Object.fromEntries(['.phone-error','.check-error','.check-question','.courier-wa-office'].map(k=>[k,{textContent:'',innerHTML:''}]));let submit;
 const form={elements,dataset:business?{kind:'business'}:{},querySelector:k=>ui[k],reportValidity:()=>!elements.phone.custom&&(!business||!elements.check.custom),addEventListener:(type,fn)=>{if(type==='submit')submit=fn;}};
 const result={opened:[],location:{href:''}};
 const math=Object.create(Math);math.random=()=>0;
 const context={window:{...data.window,location:result.location,open:(...args)=>result.opened.push(args),addEventListener(){}},document:{documentElement:{lang:'ru'},querySelector:()=>null,querySelectorAll:selector=>selector==='.courier-whatsapp-form,.contact-request[data-kind=business]'?[form]:selector==='.courier-whatsapp-form'&&!business?[form]:[],addEventListener(){}},localStorage:{getItem:()=>null},Math:math,FormData:class{get(k){return elements[k]?.value||null;}},Event:class{}};
 vm.runInNewContext(script,context);
 elements.phone.listeners.input();assert.equal(elements.phone.custom,'');
 submit({preventDefault(){},stopImmediatePropagation(){}});
 if(business){assert.match(result.location.href,/^mailto:davlatbek\.kh@gmail\.com\?/);assert.ok(decodeURIComponent(result.location.href).includes('7'));}else{assert.equal(result.opened.length,1);assert.match(result.opened[0][0],/^https:\/\/wa\.me\/77015317608\?/);assert.ok(decodeURIComponent(result.opened[0][0]).includes('123456789012'));}
 elements.phone.value='123';elements.phone.listeners.input();assert.notEqual(elements.phone.custom,'');
 const before=result.opened.length,previous=result.location.href;submit({preventDefault(){},stopImmediatePropagation(){}});assert.equal(result.opened.length,before);assert.equal(result.location.href,previous);
}
runForm();runForm(true);
for(const file of ['index.html','courier.html']){assert.ok(read(file).includes('name="bin" required'));assert.ok(!read(file).includes('courier-simple-check'));assert.ok(!read(file).includes('courier-wa-result'));}
for(const file of ['private.html','service-business.html']){assert.equal((read(file).match(/<article class="client-zone">/g)||[]).length,4);assert.equal((read(file).match(/class="extra-group"/g)||[]).length,3);}
assert.ok(read('service-business.html').includes('min="1" max="1000000" step="1"'));assert.equal((read('contacts.html').match(/data-office-card/g)||[]).length,24);
assert.equal((read('international.html').match(/<tr data-country-row>/g)||[]).length,214);
for(const row of read('international.html').matchAll(/<tr data-country-row>(.*?)<\/tr>/g))assert.equal((row[1].match(/<td>/g)||[]).length,1);
for(const lang of ['ru','kk','en'])for(const ext of ['mp4','jpg','vtt'])assert.ok(fs.statSync(path.join(dist,'assets',`volume-weight-${lang}.${ext}`)).size>0);
for(const resource of JSON.parse(fs.readFileSync(path.join(root,'tools/client-resources.json'),'utf8')))for(const file of resource.files)assert.equal(fs.statSync(path.join(dist,file.href)).size,file.bytes);
console.log('Revision 22 checks passed: forms, no-send validation, payloads, zones, directory, files and localized video.');

for(const file of fs.readdirSync(dist).filter(n=>n.endsWith('.html')))for(const [,url]of read(file).matchAll(/(?:href|src)="(https?:\/\/[^\"]+)"/g))assert.ok(!['rika.kz','www.rika.kz'].includes(new URL(url).hostname),file+' depends on the old site');
assert.equal(fs.readdirSync(dist).filter(n=>n.startsWith('info-')&&n.endsWith('.html')).length,10);
