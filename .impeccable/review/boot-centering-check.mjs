import {chromium} from '../tools/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const checks=[],errors=[];const ok=(v,label)=>{if(!v)throw Error(label);checks.push(label);console.log('PASS',label);};
try{
for(const [width,height] of [[1536,704],[1920,880],[320,616]]){
 const p=await b.newPage({viewport:{width,height}});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{const timer=window.setTimeout.bind(window);window.setTimeout=(callback,delay,...args)=>timer(callback,delay===1700?30000:delay,...args);});
 await p.goto('http://localhost:3001',{waitUntil:'networkidle'});const boot=p.locator('.os-boot');await boot.waitFor();
 const center=boot.locator('.boot-center');await center.evaluate(async el=>{await Promise.allSettled(el.getAnimations().map(a=>a.finished));});
 const r=await center.boundingBox();ok(Math.abs(r.x+r.width/2-width/2)<1&&Math.abs(r.y+r.height/2-height/2)<1,'Loading group is centered on both axes at '+width+'x'+height);
 ok(r.height<height*.7&&await center.evaluate(el=>el.offsetHeight<el.parentElement.clientHeight),'Loading content keeps intrinsic height at '+width+'px');
 ok(await boot.evaluate(el=>el.scrollHeight===el.clientHeight&&el.scrollWidth===el.clientWidth),'Boot screen does not scroll at '+width+'px');
 if(width===1536)await p.screenshot({path:'.impeccable/review/boot-centered-laptop.png'});
 if(width===320)await p.screenshot({path:'.impeccable/review/boot-centered-mobile.png'});
 await boot.getByRole('button',{name:'Omitir animación',exact:true}).click();const login=p.locator('.os-login');await login.waitFor();ok(await login.evaluate(el=>el.scrollHeight===el.clientHeight&&getComputedStyle(el,'::before').position==='fixed'),'User selection retains fit and fixed blur at '+width+'px');
 await login.getByRole('button',{name:'Entrar como visitante',exact:true}).click();await p.locator('.os-session[data-phase="desktop"]').waitFor();ok(true,'Skip and visitor entry still work at '+width+'px');await p.close();
}
ok(errors.length===0,'No runtime errors');await fs.writeFile('.impeccable/review/boot-centering-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}
