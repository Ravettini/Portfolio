import {chromium} from '../tools/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const checks=[],errors=[];const ok=(v,label)=>{if(!v)throw Error(label);checks.push(label);console.log('PASS',label);};
try{
for(const [width,height,reducedMotion] of [[1536,704,'no-preference'],[1366,617,'no-preference'],[1280,570,'reduce'],[1920,880,'no-preference'],[320,616,'no-preference'],[390,844,'reduce'],[844,390,'no-preference']]){
 const p=await b.newPage({viewport:{width,height},reducedMotion});p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:3001',{waitUntil:'networkidle'});const login=p.locator('.os-login');await login.waitFor();await login.evaluate(async el=>{await Promise.allSettled(el.getAnimations().map(a=>a.finished));});
 const metrics=await login.evaluate(el=>({client:el.clientHeight,scroll:el.scrollHeight,width:el.clientWidth,scrollWidth:el.scrollWidth}));
 if(height>=570)ok(metrics.scroll===metrics.client,'User selection fits without scroll at '+width+'x'+height);
 ok(metrics.scrollWidth===metrics.width,'No horizontal overflow at '+width+'x'+height);
 ok(await p.getByRole('button',{name:'Entrar como visitante',exact:true}).evaluate(el=>el===document.activeElement),'Visitor entry retains initial keyboard focus at '+width+'px');
 const footer=await login.locator('.login-footer').boundingBox();if(height>=570)ok(footer.y+footer.height<=height+1,'Restart and contact remain in viewport at '+width+'px');
 const targetRects=await login.locator('.login-footer button,.login-footer a').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().height));ok(targetRects.every(h=>h>=44),'Footer actions remain usable at '+width+'px');
 await login.evaluate(el=>el.scrollTop=el.scrollHeight);const after=await login.evaluate(el=>{const s=getComputedStyle(el,'::before');return{position:s.position,top:s.top,bottom:s.bottom,filter:s.backdropFilter,scrollTop:el.scrollTop};});
 ok(after.position==='fixed'&&after.top==='0px'&&after.bottom==='0px'&&after.filter.includes('blur(14px)'),'Blur stays viewport-fixed after scroll at '+width+'x'+height);
 if(height===390)ok(after.scrollTop>0,'Constrained height keeps necessary scrolling instead of clipping controls');
 if(width===1536)await p.screenshot({path:'.impeccable/review/login-laptop-fit.png'});
 if(width===320)await p.screenshot({path:'.impeccable/review/login-mobile-fit.png'});
 if(height===390)await p.screenshot({path:'.impeccable/review/login-short-scrolled.png'});
 await p.getByRole('button',{name:'Entrar como visitante',exact:true}).scrollIntoViewIfNeeded();await p.keyboard.press('Enter');await p.locator('.os-session[data-phase="desktop"]').waitFor();ok(!await login.count(),'Entering visitor session still works at '+width+'px');
 if(width===1536){await p.getByRole('button',{name:'Menú de ravettiniOS',exact:true}).click();await p.getByRole('button',{name:'Cambiar usuario',exact:true}).click();await login.waitFor();ok(await login.evaluate(el=>el.scrollHeight===el.clientHeight),'Switching user returns to fitted login screen');}
 await p.close();
}
ok(errors.length===0,'No runtime exceptions');await fs.writeFile('.impeccable/review/login-fit-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}
