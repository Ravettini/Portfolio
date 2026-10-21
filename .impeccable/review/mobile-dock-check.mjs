import {chromium} from '../tools/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const checks=[],errors=[];const ok=(v,label)=>{if(!v)throw Error(label);checks.push(label);console.log('PASS',label);};
try{
for(const [width,height,motion] of [[320,616,'no-preference'],[375,667,'no-preference'],[390,844,'reduce'],[844,390,'no-preference']]){
 const p=await b.newPage({viewport:{width,height},isMobile:true,hasTouch:true,reducedMotion:motion});p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>sessionStorage.setItem('ravettini-os-session','visitor'));await p.goto('http://localhost:3001',{waitUntil:'networkidle'});const root=p.locator('.os-desktop'),dock=p.locator('.os-dock');await p.locator('.os-session[data-phase="desktop"]').waitFor();await p.waitForFunction(()=>{const s=getComputedStyle(document.querySelector('.os-desktop'));return s.transform==='none'&&s.filter==='none';});
 const start=await dock.boundingBox();ok(Math.abs(start.y+start.height-(height-14))<1&&start.x>=0&&start.x+start.width<=width,'Dock fits and anchors below at '+width+'x'+height+' '+motion);
 const buttons=await dock.locator('.dock-app:not(.dock-app--minimized)').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};}));ok(buttons.length===5&&buttons.every(r=>r.x>=start.x&&r.x+r.width<=start.x+start.width+1&&r.width>=44&&r.height>=44),'Five usable dock targets fit at '+width+'px');
 await root.evaluate(el=>el.scrollTop=el.scrollHeight);await p.waitForTimeout(50);const end=await dock.boundingBox();ok(JSON.stringify(start)===JSON.stringify(end),'Dock stays fixed while desktop scrolls at '+width+'px');
 const menu=await p.locator('.os-menu-bar').boundingBox();ok(Math.abs(menu.y)<1,'System menu stays at top after scrolling at '+width+'px');
 ok(await root.evaluate(el=>el.scrollWidth<=el.clientWidth),'No horizontal desktop overflow at '+width+'px');
 const last=p.locator('[data-launcher="sofijobs-cv-analyzer"]');const lastRect=await last.boundingBox();ok(lastRect.y>=menu.height&&lastRect.y+lastRect.height<end.y,'Last project row can scroll above dock at '+width+'px');
 await p.locator('.os-dock [data-launcher="contact"]').click();const app=p.locator('[data-app-window="contact"]');const r=await app.boundingBox();ok(r.y>=38&&r.y+r.height<=height&&r.x>=0&&r.x+r.width<=width,'Dock opens visible application after scrolling at '+width+'px');await app.locator('.window-control--close').click();
 if(width===320)await p.screenshot({path:'.impeccable/review/mobile-dock-320.png'});
 if(width===390)await p.screenshot({path:'.impeccable/review/mobile-dock-390.png'});
 await p.close();
}
const desktop=await b.newPage({viewport:{width:1440,height:960}});desktop.on('pageerror',e=>errors.push(e.message));await desktop.addInitScript(()=>sessionStorage.setItem('ravettini-os-session','visitor'));await desktop.goto('http://localhost:3001',{waitUntil:'networkidle'});await desktop.waitForFunction(()=>getComputedStyle(document.querySelector('.os-desktop')).transform==='none');const d=await desktop.locator('.os-dock').boundingBox();ok(d.x>0&&d.x+d.width<1440&&Math.abs(d.y+d.height-938)<1,'Desktop dock retains established geometry');await desktop.close();
ok(errors.length===0,'No runtime exceptions');await fs.writeFile('.impeccable/review/mobile-dock-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}
