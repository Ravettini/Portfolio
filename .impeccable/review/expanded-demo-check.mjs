import {chromium} from '../tools/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const live=process.argv.includes('--live');const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const checks=[],errors=[],inventory={};const ok=(v,m)=>{if(!v)throw Error(m);checks.push(m);console.log('PASS',m);};
const base=(app,port)=>live?'https://ravettini-demo-'+app+'.vercel.app':'http://127.0.0.1:'+port;
const page=await browser.newPage({viewport:{width:1440,height:960}});page.on('pageerror',e=>{errors.push(e.message);console.log('ERROR',e.message);});page.on('dialog',d=>d.accept());
await page.addInitScript(()=>{for(const slug of ['acreditapp','recursos-humanos','sigma','produccion','buscador-dotacion'])sessionStorage.setItem('portfolio-demo-welcome-v1:'+slug,'seen');});
const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('portfolio-demo-v1')));
await page.goto(base('recursos-humanos',4102)+'/hojas-ruta',{waitUntil:'networkidle'});
let s=await state();inventory.rh={people:s.people.length,routeSheets:s.routeSheets.length,desks:s.desks.length,assignments:s.assignments.length,vacations:s.vacations.length,tickets:s.tickets.length};
ok(s.people.length===96&&s.routeSheets.length>2000&&s.assignments.length>700,'HR includes a populated team, route sheets and desk assignments');
ok(await page.locator('table tbody tr').count()>20,'HR route sheets are visible in the actual UI');
await page.getByRole('button',{name:'Cargar desvío',exact:true}).first().click();
await page.locator('#hdr-lugar').fill('Sede Demo — prueba de funcionamiento');await page.locator('#hdr-llegada').fill('09:00');await page.locator('#hdr-salida').fill('17:00');await page.locator('#hdr-actividad').fill('Revisión funcional del circuito de demostración');
await page.getByRole('dialog').getByRole('button',{name:/Guardar|Cargar|Registrar/}).last().click();
await page.getByRole('dialog').waitFor({state:'hidden'});await page.reload({waitUntil:'networkidle'});
s=await state();ok(s.routeSheets.some(x=>x.actividad==='Revisión funcional del circuito de demostración'),'New route sheet persists after reloading');
for(const route of ['/hojas-ruta/calendario?view=all','/escritorios','/vacaciones/admin','/metricas','/panel','/reclamos/gestion','/capacitaciones/equipo']){await page.goto(base('recursos-humanos',4102)+route,{waitUntil:'networkidle'});const body=await page.locator('body').innerText();ok(!/Esta sección aún no|Error al cargar|Invalid Date|NaN/.test(body),'HR populated section works: '+route);}
await page.goto(base('acreditapp',4101)+'/events/event-1',{waitUntil:'networkidle'});s=await state();inventory.acreditapp={events:s.events.length,eventPeople:Object.values(s.people).reduce((n,a)=>n+a.length,0)};
ok(s.events.length===12&&s.people['event-1'].length===120,'Acreditapp includes 12 events and hundreds of registrations');
await page.locator('#live-cuil-search').fill('Alma Ejemplo 01');await page.waitForTimeout(600);await page.locator('#live-cuil-search').press('Enter');await page.getByRole('dialog').getByRole('button',{name:'Acreditar',exact:true}).click();await page.reload({waitUntil:'networkidle'});s=await state();ok(s.people['event-1'][0].status==='accredited','Acreditapp accreditation persists against the expanded dataset');
await page.goto(base('produccion',4104)+'/events/event-1',{waitUntil:'networkidle'});s=await state();inventory.produccion={events:s.events.length,proposals:s.proposals.length};ok(s.events.length===36&&s.proposals.length===144,'Production has 36 events and 144 requirements with history');
ok((await page.locator('body').innerText()).includes('4 requerimientos'),'Production event shows its associated requirements');await page.getByRole('button',{name:'Duplicar evento',exact:true}).click();await page.waitForTimeout(200);await page.reload({waitUntil:'networkidle'});s=await state();ok(s.events.length===37,'Production duplication persists with the populated dataset');
await page.goto(base('sigma',4105)+'/mis-envios',{waitUntil:'networkidle'});s=await state();inventory.sigma={areas:s.areas.length,projects:s.proyectos.length,indicators:s.indicadores.length,submissions:s.cargas.length,tickets:s.tickets.length};ok(s.proyectos.length===24&&s.indicadores.length===72&&s.cargas.length>=72,'SIGMA contains a complete hierarchy and monthly submission history');
for(const route of ['/publicadas','/admin/tickets','/admin/auditoria','/mis-tickets']){await page.goto(base('sigma',4105)+route,{waitUntil:'networkidle'});ok(!/Invalid Date|NaN|Error al cargar/.test(await page.locator('body').innerText()),'SIGMA populated section works: '+route);}
await page.goto(base('buscador-dotacion',4103)+'/buscar',{waitUntil:'networkidle'});const metadata=await page.request.get(base('buscador-dotacion',4103)+'/api/metadata');const meta=await metadata.json();inventory.dotacion={people:meta.counts.total};ok(meta.counts.total===1200,'Dotacion includes 1200 synthetic directory records');
await page.getByPlaceholder('Nombre, CUIL, DNI o email').fill('Alma');await page.getByRole('button',{name:'Buscar',exact:true}).click();await page.getByText('Alma Ejemplo 1',{exact:true}).waitFor();ok(!(await page.locator('body').innerText()).includes('Bruno Prueba 1'),'Dotacion search filters the large dataset correctly');
ok(errors.length===0,'No runtime exceptions in populated demo flows');await fs.writeFile('.impeccable/review/expanded-demo-'+(live?'live':'local')+'-verification.json',JSON.stringify({checks,errors,inventory},null,2));await browser.close();
