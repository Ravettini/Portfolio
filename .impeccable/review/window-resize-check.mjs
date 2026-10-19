import {chromium} from '../tools/node_modules/playwright/index.mjs';
import {resizeWindowRect, resizeEdges, resizeCursors} from '../../lib/window-resize.ts';
import fs from 'node:fs/promises';
const checks=[],errors=[];
const ok=(value,label)=>{if(!value)throw Error(label);checks.push(label);console.log('PASS',label);};
for(const edge of resizeEdges){
 const start={left:200,top:200,width:500,height:400};
 const r=resizeWindowRect(start,edge,20,20,{width:1440,height:960});
 ok((r.left===200+(edge.includes('w')?20:0))&&(r.top===200+(edge.includes('n')?20:0))&&r.width===500+(edge.includes('e')?20:edge.includes('w')?-20:0)&&r.height===400+(edge.includes('s')?20:edge.includes('n')?-20:0),'Geometry anchors opposite edges: '+edge);
}
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const p=await b.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>sessionStorage.setItem('ravettini-os-session','visitor'));
 await p.goto(process.env.PORTFOLIO_TEST_URL||'http://localhost:3001',{waitUntil:'networkidle'});
 const win=p.locator('[data-app-window="welcome"]');
 const box=()=>win.boundingBox();
 const drag=async(host,edge,dx,dy)=>{const h=host.locator(`[data-resize-edge="${edge}"]`);const r=await h.boundingBox();await p.mouse.move(r.x+r.width/2,r.y+r.height/2);await p.mouse.down();await p.mouse.move(r.x+r.width/2+dx,r.y+r.height/2+dy,{steps:8});await p.mouse.up();};
 ok(await win.locator('[data-resize-edge]').count()===8,'Floating windows expose four edges and four corners');
 for(const edge of resizeEdges){
 const target=win.locator(`[data-resize-edge="${edge}"]`);await target.hover();
 ok(await target.evaluate(el=>getComputedStyle(el).cursor)===resizeCursors[edge],'Hover uses native directional cursor: '+edge);
 const hb=await target.boundingBox();await p.mouse.move(hb.x+hb.width/2,hb.y+hb.height/2);await p.mouse.down();
 ok(await p.locator('.os-desktop').evaluate(el=>getComputedStyle(el).cursor)===resizeCursors[edge]&&await target.evaluate(el=>getComputedStyle(el).cursor)===resizeCursors[edge],'Dragging preserves directional cursor: '+edge);
 await p.mouse.up();
 const before=await box();await drag(win,edge,edge.includes('w')?-12:12,edge.includes('n')?-12:12);const after=await box();ok(after.width>=before.width&&after.height>=before.height&&(after.width>before.width||after.height>before.height),'Pointer resizes '+edge);}
 let before=await box();const handle=win.locator('[data-resize-edge="se"]');let r=await handle.boundingBox();
 await p.mouse.move(r.x+8,r.y+8);await p.mouse.down();await p.mouse.move(r.x+50,r.y+50);await p.keyboard.press('Escape');await p.mouse.up();
 ok(JSON.stringify(await box())===JSON.stringify(before),'Escape cancels resizing and restores original geometry');
 r=await handle.boundingBox();await p.mouse.move(r.x+8,r.y+8);await p.mouse.down();await p.mouse.move(r.x+40,r.y+40);
 await handle.dispatchEvent('pointercancel',{pointerId:1});await p.mouse.up();
 ok(JSON.stringify(await box())===JSON.stringify(before),'Canceled pointer gesture restores original geometry');
 await drag(win,'se',-2000,-2000);let small=await box();ok(small.width===320&&small.height===220,'Minimum size keeps titlebar and content usable');
 await win.locator('[data-resize-edge="e"]').focus();await p.keyboard.press('ArrowRight');ok((await box()).width===330,'Keyboard arrows resize a focused edge');
 before=await box();await win.getByRole('button',{name:'Ampliar Bienvenida',exact:true}).click();ok(await win.locator('[data-resize-edge]').count()===0,'Maximized windows have no resize targets');
 await win.getByRole('button',{name:'Restaurar Bienvenida',exact:true}).click();ok(JSON.stringify(await box())===JSON.stringify(before),'Restoring retains custom size and position');
 await p.locator('[data-launcher="acreditapp"]').click();const browser=p.locator('[data-app-window="acreditapp"]');await browser.getByRole('button',{name:'Restaurar Acreditapp',exact:true}).click();
 const frame=await browser.locator('iframe').elementHandle();const content=await frame.contentFrame();await content.getByRole('button',{name:'Explorar demo',exact:true}).click();
 const frameUrl=content.url();const rb=await browser.boundingBox();await drag(browser,'e',-160,0);
 ok(Math.round((await browser.boundingBox()).width)===Math.round(rb.width-160),'Browser width follows dragging over embedded content');
 ok(await frame.evaluate(el=>el.isConnected)&&content.url()===frameUrl,'Resize preserves the live demo and navigation');
 await drag(browser,'se',2000,2000);const big=await browser.boundingBox();ok(big.x+big.width<=1440&&big.y+big.height<=948,'Window cannot expand beyond workspace edges');
 await p.setViewportSize({width:1024,height:768});const fit=await browser.boundingBox();ok(fit.x+fit.width<=1024&&fit.y+fit.height<=756,'Custom geometry adapts when viewport shrinks');
 await p.waitForTimeout(400); // Let the embedded app finish its responsive sidebar transition.
 await p.screenshot({path:'.impeccable/review/window-resize-desktop.png'});
 await p.setViewportSize({width:390,height:844});ok(await browser.locator('[data-resize-edge]').count()===0,'Mobile retains its full-width sheets without resize targets');
 const mobile=await browser.boundingBox();ok(mobile.x===0&&mobile.width===390&&mobile.y+mobile.height===844,'Custom-sized browser still fits mobile screen');
 await p.waitForTimeout(400);
 await p.screenshot({path:'.impeccable/review/window-resize-mobile.png'});
 await browser.getByRole('button',{name:'Cerrar Acreditapp',exact:true}).click();ok(!await browser.count(),'Window controls still close resized windows');
 ok(errors.length===0,'No runtime errors');await fs.writeFile('.impeccable/review/window-resize-verification.json',JSON.stringify({checks,errors},null,2));
}finally{await b.close();}

