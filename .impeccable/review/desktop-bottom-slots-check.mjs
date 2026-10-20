import {chromium} from '../tools/node_modules/playwright/index.mjs';
import {desktopGrid,placeDesktopIcon,placeDesktopGroup,moveDesktopIcon,normalizeDesktopIcons} from '../../lib/desktop-grid.ts';
import fs from 'node:fs/promises';
const checks=[],errors=[];const ok=(v,label)=>{if(!v)throw Error(label);checks.push(label);console.log('PASS',label);};
const overlaps=(p,r)=>p.x<r.x+r.width+8&&p.x+94>r.x-8&&p.y<r.y+r.height+8&&p.y+94>r.y-8;
for(const [width,height] of [[1536,666],[1536,704],[1440,960],[901,580]]){
 const g=desktopGrid(width,height),y=g.y+(g.rows-1)*g.rowHeight;
 const obstacles=[{x:width/2-200,y:height-100,width:400,height:80},{x:28,y:height-60,width:190,height:36}];
 const x=g.x+3*g.columnWidth;const bottom=placeDesktopIcon('a',{x,y},{},width,height,obstacles);
 ok(bottom.y===y&&bottom.x===x&&bottom.y+94<=height-12,'Bottom side slots available at '+width+'x'+height);
 const dock=placeDesktopIcon('a',{x:width/2,y},{},width,height,obstacles);ok(obstacles.every(r=>!overlaps(dock,r)),'Dock and search area excluded at '+width+'x'+height);
 const normalized=normalizeDesktopIcons(['a','b'],{a:bottom,b:bottom},width,height,obstacles);ok(new Set(Object.values(normalized).map(p=>p.x+','+p.y)).size===2&&Object.values(normalized).every(p=>obstacles.every(r=>!overlaps(p,r))),'Saved layout avoids occupied and reserved cells at '+width+'x'+height);
 const group=placeDesktopGroup(['a','b'],{a:{x,y},b:{x:x+109,y}},{a:{x:g.x,y:g.y},b:{x:g.x+109,y:g.y}},width,height,obstacles);ok(Object.values(group).every(p=>obstacles.every(r=>!overlaps(p,r))),'Group respects dock reservation at '+width+'x'+height);
}
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const p=await b.newPage({viewport:{width:1536,height:704},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>sessionStorage.setItem('ravettini-os-session','visitor'));await p.goto('http://localhost:3001',{waitUntil:'networkidle'});await p.getByRole('button',{name:'Cerrar Bienvenida',exact:true}).click();
 const position=async(id)=>{const r=await p.locator(`[data-launcher="${id}"]`).boundingBox();return{x:r.x,y:r.y};};
 const areas=()=>p.locator('.os-dock,.desktop-hint').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};}));
 const drag=async(id,to)=>{const r=await p.locator(`[data-launcher="${id}"]`).boundingBox();await p.mouse.move(r.x+47,r.y+24);await p.mouse.down();await p.mouse.move(to.x+47,to.y+24,{steps:12});await p.mouse.up();};
 const g=desktopGrid(1536,704),bottom={x:g.x+3*g.columnWidth,y:g.y+(g.rows-1)*g.rowHeight};
 await drag('acreditapp',bottom);ok(JSON.stringify(await position('acreditapp'))===JSON.stringify(bottom),'Pointer drag reaches formerly blocked bottom row');
 await p.waitForTimeout(400);await p.reload({waitUntil:'networkidle'});ok(JSON.stringify(await position('acreditapp'))===JSON.stringify(bottom),'Bottom row position survives reload');
 const right={x:g.x+(g.columns-1)*g.columnWidth,y:bottom.y};await drag('sigma',right);ok(JSON.stringify(await position('sigma'))===JSON.stringify(right),'Lower-right desktop slots are also available');
 const obstacle=(await areas())[0];await drag('sigma',{x:obstacle.x+30,y:obstacle.y});let current=await position('sigma');ok((await areas()).every(r=>!overlaps(current,r)),'Drop over dock resolves to a nearby free slot');
 await drag('sigma',{x:bottom.x+109,y:bottom.y-105});await p.locator('[data-launcher="sigma"]').focus();await p.keyboard.press('Alt+ArrowDown');current=await position('sigma');ok(current.y===bottom.y&&current.x!==bottom.x,'Keyboard reaches bottom row without overlapping another icon');
 // Start a fresh two-icon selection explicitly, avoiding any previous single selection.
 await p.mouse.click(1200,180);await p.locator('[data-launcher="acreditapp"]').click({modifiers:['Control']});await p.locator('[data-launcher="sigma"]').click({modifiers:['Control']});
 await drag('acreditapp',{x:bottom.x-109,y:bottom.y});
 const group=[await position('acreditapp'),await position('sigma')];const groupAreas=await areas();ok(group[1].x-group[0].x===109&&group[0].y===group[1].y&&group.every(pos=>groupAreas.every(area=>!overlaps(pos,area))),'Group movement preserves formation in bottom slots');
 await p.mouse.click(1200,180);await drag('sigma',{x:bottom.x+109,y:bottom.y});const beforeGrow=await position('sigma');
 await p.locator('[data-launcher="spaceweb"]').click();await p.getByRole('button',{name:'Minimizar Spaceweb',exact:true}).click();await p.waitForTimeout(350);
 const all=await p.locator('.desktop-applications [data-launcher]').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y};}));const reserved=await areas();ok(JSON.stringify(await position('sigma'))!==JSON.stringify(beforeGrow),'Dock growth relocates newly covered icon');ok(all.every(pos=>reserved.every(r=>!overlaps(pos,r))),'Growing dock repacks any icons it would cover');
 await p.screenshot({path:'.impeccable/review/desktop-bottom-slots.png'});
 await p.setViewportSize({width:1000,height:650});await p.waitForTimeout(350);const small=await p.locator('.desktop-applications [data-launcher]').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y};}));const smallAreas=await areas();ok(small.every(pos=>pos.x+94<=1000&&pos.y+94<=638&&smallAreas.every(r=>!overlaps(pos,r))),'Viewport resize preserves accessible slots and dock clearance');
 ok(errors.length===0,'No runtime exceptions');await fs.writeFile('.impeccable/review/desktop-bottom-slots-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}

