import {chromium} from '../tools/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import {defaultDesktopIcons,normalizeDesktopIcons} from '../../lib/desktop-grid.ts';
const old=['acreditapp','recursos-humanos-ssccrs','buscador-dotacion-gcba','v-mail-validator','acqua-di-colbert','sigma','produccion-eventos','dermatologia-tod','simulacro-entrevistas','media-compressor','utilities','doom'];
const ids=[...old,'spaceweb','sofijobs-cv-analyzer'];
const saved=defaultDesktopIcons(old,1440,960),migrated=normalizeDesktopIcons(ids,saved,1440,960);
const checks=[],errors=[];const ok=(v,label)=>{if(!v)throw Error(label);checks.push(label);console.log('PASS',label);};
ok(old.every(id=>JSON.stringify(saved[id])===JSON.stringify(migrated[id])),'New projects preserve existing saved icon positions');
ok(new Set(Object.values(migrated).map(p=>p.x+','+p.y)).size===ids.length,'New desktop icons use separate grid slots');
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const p=await b.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(saved=>{sessionStorage.setItem('ravettini-os-session','visitor');localStorage.setItem('ravettini-os-icon-positions',JSON.stringify(saved));},saved);
 await p.goto('http://localhost:3001',{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Cerrar Bienvenida',exact:true}).click();
 ok(await p.locator('.desktop-applications [data-launcher]').count()===14,'Both projects are available on the desktop');
 for(const id of ['acreditapp','recursos-humanos-ssccrs','buscador-dotacion-gcba','produccion-eventos','sigma','spaceweb']){
  const img=p.locator(`[data-launcher="${id}"] img`);await img.evaluate(el=>el.decode());
  ok(await img.evaluate(el=>el.naturalWidth>0&&getComputedStyle(el).objectFit==='contain'&&getComputedStyle(el.parentElement).backgroundImage==='none'),id+' uses original local favicon without stretching');
 }
 await p.screenshot({path:'.impeccable/review/project-additions-desktop.png'});
 for(const id of ['dermatologia-tod','simulacro-entrevistas','v-mail-validator','media-compressor','acqua-di-colbert','spaceweb','sofijobs-cv-analyzer']){
  await p.locator(`[data-launcher="${id}"]`).click();const w=p.locator(`[data-app-window="${id}"]`);const r=await w.boundingBox();
  ok(Math.abs(r.x+r.width/2-720)<1&&Math.abs(r.y+r.height/2-480)<1,id+' opens in the center');
  if(id==='spaceweb'||id==='sofijobs-cv-analyzer'){
   const href=id==='spaceweb'?'https://spaceweb2.vercel.app/':'https://sofijobs-cv-analyzer.vercel.app/';
   ok(await w.getByRole('link',{name:'Abrir sitio',exact:true}).getAttribute('href')===href,id+' links to provided site');
  }
  await w.locator('.window-control--close').click();
 }
 await p.locator('[data-launcher="spaceweb"]').click();const w=p.locator('[data-app-window="spaceweb"]');const start=await w.boundingBox();const bar=await w.locator('.os-window-bar').boundingBox();
 await p.mouse.move(bar.x+bar.width/2,bar.y+22);await p.mouse.down();await p.mouse.move(bar.x+bar.width/2+70,bar.y+62,{steps:8});await p.mouse.up();const moved=await w.boundingBox();
 ok(Math.abs(moved.x-start.x-70)<1&&Math.abs(moved.y-start.y-40)<1,'Centered window drags without translation jumps');
 const h=await w.locator('[data-resize-edge="se"]').boundingBox();await p.mouse.move(h.x+8,h.y+8);await p.mouse.down();await p.mouse.move(h.x+68,h.y+48,{steps:8});await p.mouse.up();const resized=await w.boundingBox();
 ok(Math.abs(resized.x-moved.x)<1&&Math.abs(resized.y-moved.y)<1&&Math.abs(resized.width-moved.width-60)<1,'Centered window resizes with anchored position');
 await w.locator('.window-control--maximize').click();await w.locator('.window-control--maximize').click();ok(JSON.stringify(await w.boundingBox())===JSON.stringify(resized),'Maximize and restore retain chosen geometry');
 await w.locator('.window-control--close').click();
 for(const id of ['acreditapp','recursos-humanos-ssccrs','buscador-dotacion-gcba','produccion-eventos','sigma']){
  await p.locator(`[data-launcher="${id}"]`).click();const app=p.locator(`[data-app-window="${id}"]`);
  ok(await app.evaluate(el=>el.classList.contains('os-window--maximized'))&&await app.locator('iframe').count()===1,id+' keeps interactive maximized demo');await app.locator('.window-control--close').click();
 }
 await p.locator('[aria-label="Buscar aplicaciones (Ctrl o Command K)"]').click();await p.locator('.spotlight input').fill('Sofijobs');ok(await p.locator('.spotlight').getByRole('button',{name:/Sofijobs CV/}).isVisible(),'New project appears in application search');await p.locator('.spotlight input').fill('Analizador');ok(await p.locator('.spotlight').getByRole('button',{name:/Sofijobs CV/}).isVisible(),'Full project title is searchable');await p.keyboard.press('Escape');
 await p.setViewportSize({width:390,height:844});
 for(const id of ['spaceweb','sofijobs-cv-analyzer']){await p.locator(`[data-launcher="${id}"]`).click();const app=p.locator(`[data-app-window="${id}"]`);const r=await app.boundingBox();ok(r.x>=0&&r.x+r.width<=390,id+' fits mobile sheet');if(id==='sofijobs-cv-analyzer'){ok(await app.getByText(/ortograf\u00eda/).isVisible(),'New project copy preserves UTF-8 accents');}if(id==='sofijobs-cv-analyzer')await p.screenshot({path:'.impeccable/review/project-additions-mobile.png'});await app.locator('.window-control--close').click();}
 ok(errors.length===0,'No runtime errors');await fs.writeFile('.impeccable/review/project-additions-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}

