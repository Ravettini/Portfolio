import { chromium } from '../tools/node_modules/playwright/index.mjs';
import { desktopGrid, normalizeDesktopIcons, placeDesktopIcon } from '../../lib/desktop-grid.ts';
import fs from 'node:fs/promises';
const ids = ['acreditapp','recursos-humanos-ssccrs','buscador-dotacion-gcba','v-mail-validator','acqua-di-colbert','sigma','dermatologia-tod','simulacro-entrevistas','media-compressor','utilities','doom'];
const checks = [], errors = [];
const assert = (condition, message) => { if (!condition) throw new Error(message); checks.push(message); };
function valid(positions, width, height) {
  const grid = desktopGrid(width, height);
  const values = Object.values(positions);
  return new Set(values.map(p => `${p.x},${p.y}`)).size === ids.length && values.every(p => Number.isInteger((p.x-grid.x)/grid.columnWidth) && Number.isInteger((p.y-grid.y)/grid.rowHeight) && p.x >= grid.x && p.y >= grid.y && p.x + 94 <= width && p.y + 94 <= Math.max(height,580)-120);
}
for (const [width,height] of [[1440,960],[1536,704],[1920,880],[901,580],[901,300]]) {
  const legacy = Object.fromEntries(ids.map(id => [id, {x:57.2,y:345.6}]));
  const positions = normalizeDesktopIcons(ids,legacy,width,height);
  assert(valid(positions,width,height), `Legacy overlapping positions become distinct valid slots at ${width}x${height}`);
  positions.sigma = placeDesktopIcon('sigma',positions.acreditapp,positions,width,height);
  assert(valid(positions,width,height), `Occupied-cell placement never overlaps at ${width}x${height}`);
}
const browser = await chromium.launch({ executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless:true });
const page = await browser.newPage({ viewport:{width:1440,height:960}, reducedMotion:'reduce' });
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(({ids}) => {
  sessionStorage.setItem('ravettini-os-session','visitor');
  if (!sessionStorage.getItem('grid-test-seeded')) {
    localStorage.setItem('ravettini-os-icon-positions',JSON.stringify(Object.fromEntries(ids.map(id=>[id,{x:57.2,y:345.6}]))));
    sessionStorage.setItem('grid-test-seeded','true');
  }
}, {ids});
const baseURL = process.env.PORTFOLIO_TEST_URL || 'http://localhost:3000';
await page.goto(baseURL,{waitUntil:'networkidle'});
await page.locator('.os-session[data-phase="desktop"]').waitFor();
await page.getByRole('button',{name:'Cerrar Bienvenida',exact:true}).click();
const iconPositions = () => page.locator('.desktop-app').evaluateAll(els=>Object.fromEntries(els.map(el=>{ const r=el.getBoundingClientRect(); return [el.getAttribute('data-launcher'),{x:r.x,y:r.y}]; })));
let positions = await iconPositions();
assert(valid(positions,1440,960),'Browser migrates old overlapping saved positions to unique slots');
async function drag(id, dx, dy) {
  const r=await page.locator(`.desktop-app[data-launcher="${id}"]`).boundingBox();
  await page.mouse.move(r.x+47,r.y+24); await page.mouse.down(); await page.mouse.move(r.x+47+dx,r.y+24+dy,{steps:10}); await page.mouse.up();
}
const sigmaBefore=positions.sigma;
await drag('sigma',333,57);
positions=await iconPositions();
assert(valid(positions,1440,960),'Dragging snaps to the grid instead of leaving arbitrary coordinates');
assert(positions.sigma.x !== sigmaBefore.x || positions.sigma.y !== sigmaBefore.y,'Dragging moves the icon to another slot');
assert(await page.locator('[data-app-window="sigma"]').count()===0,'Grid dragging does not launch the app');
const occupied=positions.acreditapp, source=positions.sigma;
await drag('sigma',occupied.x-source.x,occupied.y-source.y);
positions=await iconPositions();
assert(valid(positions,1440,960),'Dropping directly onto another icon chooses a free cell');
assert(positions.acreditapp.x===occupied.x && positions.acreditapp.y===occupied.y,'Occupied icon remains in its own cell');
const beforeKeys=positions.sigma;
await page.locator('.desktop-app[data-launcher="sigma"]').focus(); await page.keyboard.press('Alt+ArrowRight');
positions=await iconPositions();
assert(valid(positions,1440,960),'Keyboard movement also uses collision-free slots');
assert(positions.sigma.x!==beforeKeys.x,'Alt-arrow moves by slots');
await page.waitForTimeout(450);
const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('ravettini-os-icon-positions')));
assert(valid(saved,1440,960),'Persisted layout contains only unique grid cells');
await page.reload({waitUntil:'networkidle'});
await page.locator('.os-session[data-phase="desktop"]').waitFor();
positions=await iconPositions();
assert(JSON.stringify(positions)===JSON.stringify(saved),'Reload preserves the snapped layout without introducing collisions');
await page.setViewportSize({width:1000,height:650});
await page.waitForTimeout(450);
positions=await iconPositions();
assert(valid(positions,1000,650),'Resizing repacks icons into valid non-overlapping cells');
await page.screenshot({path:'.impeccable/review/icon-grid-resized.png',fullPage:true});
await page.setViewportSize({width:1440,height:960});
await page.waitForTimeout(450);
await page.screenshot({path:'.impeccable/review/icon-grid-desktop.png',fullPage:true});
await page.locator('.desktop-app[data-launcher="sigma"]').click();
assert(await page.locator('[data-app-window="sigma"]').isVisible(),'Normal click still launches application');
assert(errors.length===0,'No client runtime exceptions');
await fs.writeFile('.impeccable/review/icon-grid-verification.json',JSON.stringify({checks,errors},null,2));
console.log(JSON.stringify({passed:checks.length,checks,errors},null,2));
await browser.close();
