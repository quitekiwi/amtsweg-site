/*
  Amtsweg engine.
  Reads window.PACK (see packs/berlin.js) and builds the page:
  questions → your steps, shown as a route → progress saved on this device only.
  Nothing in here is specific to one country.
*/
(function(){
// Language: ?lang=de|en, else the visitor's last choice, else the browser's language
const LANGS = ['en', 'de'];
const LANG = (()=>{
  const q = new URLSearchParams(location.search).get('lang');
  if(LANGS.includes(q)){ try{ localStorage.setItem('amtsweg:lang', q); }catch(e){} return q; }
  try{ const s = localStorage.getItem('amtsweg:lang'); if(LANGS.includes(s)) return s; }catch(e){}
  return /^de\b/i.test(navigator.language || '') ? 'de' : 'en';
})();
// A translation file (packs/<id>.<lang>.js) has the same shape as the pack but only the words
function merge(base, over){
  if(over === undefined || over === null) return base;
  if(Array.isArray(base) && Array.isArray(over)) return base.map((b, i)=>merge(b, over[i]));
  if(base && typeof base === 'object' && typeof over === 'object' && !Array.isArray(over)){
    const out = Object.assign({}, base);
    Object.keys(over).forEach(k=>{ out[k] = merge(base[k], over[k]); });
    return out;
  }
  return over;
}
const PACK = (LANG !== 'en' && window.PACK_I18N && window.PACK_I18N[LANG]) ? merge(window.PACK, window.PACK_I18N[LANG]) : window.PACK;
document.documentElement.lang = LANG;

// Interface words
const UI = {
  en: {
    stillToAnswer: 'Still to answer: ', and: ' and ',
    tierOfficial: 'Official source', tierLegal: 'Immigration guide', tierAggregator: 'Aggregator / relocation blog',
    deadline: 'Deadline', where: 'Where', bring: 'Bring', cost: 'Cost', when: 'When',
    inShort: 'In short', moreDetail: 'More detail',
    sourcesDiffer: 'Sources differ: ', relyDefault: 'Rely on the official source first. If the difference matters for your case, ask the office.',
    sourcesChecked: (name, date)=>`Sources: checked against ${name}, ${date}`, sourcesUnchecked: 'Sources: not yet checked against an official source',
    confirmedAgainst: 'Confirmed against', officialNewTab: ' (official source, opens in a new tab)', newTab: ' (opens in a new tab)',
    checkedOn: 'checked', whatEachSays: 'What each source says: ', alsoUseful: 'Also useful',
    step: n=>`Step ${n}: `, stepDone: n=>`Step ${n}, done: `, doneSuffix: ' (done)',
    markDone: 'Mark as done', markNotDone: 'Mark as not done',
    announceDone: (i, done, n, total)=>`Step ${i} ${done ? 'marked done' : 'marked not done'}. ${n} of ${total} done.`,
    progress: (n, total)=>`${n} of ${total} done`, allChecked: 'all checked against official sources', someChecked: (c, total)=>`${c} of ${total} checked against official sources`,
    firstStep: 'Your first step:', nextStep: 'Your next step:',
    allDone: 'All your steps are marked done. Keep your receipts and documents together for renewals.',
    saveFailed: "Couldn't save on this device: your browser may be blocking storage (for example in a private window). Everything still works, but your progress won't be remembered next time.",
    saved: 'Saved on this device.',
    verifyAll: d=>`Every step is checked against an official source · last checked ${d}`,
    verifySome: (c, total, d)=>`${c} of ${total} steps checked against an official source · last checked ${d}`,
    nameLine: '<span lang="de">auf dem Amtsweg</span>: German for “through official channels”'
  },
  de: {
    stillToAnswer: 'Noch offen: ', and: ' und ',
    tierOfficial: 'Offizielle Quelle', tierLegal: 'Ratgeber', tierAggregator: 'Sammelseite / Umzugsblog',
    deadline: 'Frist', where: 'Wo', bring: 'Mitbringen', cost: 'Kosten', when: 'Wann',
    inShort: 'Kurz gesagt', moreDetail: 'Mehr dazu',
    sourcesDiffer: 'Quellen widersprechen sich: ', relyDefault: 'Verlassen Sie sich zuerst auf die offizielle Quelle. Wenn der Unterschied für Ihren Fall wichtig ist, fragen Sie bei der Behörde nach.',
    sourcesChecked: (name, date)=>`Quellen: geprüft anhand von ${name}, ${date}`, sourcesUnchecked: 'Quellen: noch nicht anhand einer offiziellen Quelle geprüft',
    confirmedAgainst: 'Geprüft anhand von', officialNewTab: ' (offizielle Quelle, öffnet in neuem Tab)', newTab: ' (öffnet in neuem Tab)',
    checkedOn: 'geprüft am', whatEachSays: 'Was die Quellen sagen: ', alsoUseful: 'Ebenfalls nützlich',
    step: n=>`Schritt ${n}: `, stepDone: n=>`Schritt ${n}, erledigt: `, doneSuffix: ' (erledigt)',
    markDone: 'Als erledigt markieren', markNotDone: 'Doch nicht erledigt',
    announceDone: (i, done, n, total)=>`Schritt ${i} ${done ? 'als erledigt markiert' : 'nicht mehr als erledigt markiert'}. ${n} von ${total} erledigt.`,
    progress: (n, total)=>`${n} von ${total} erledigt`, allChecked: 'alle anhand offizieller Quellen geprüft', someChecked: (c, total)=>`${c} von ${total} anhand offizieller Quellen geprüft`,
    firstStep: 'Ihr erster Schritt:', nextStep: 'Ihr nächster Schritt:',
    allDone: 'Alle Schritte sind erledigt. Bewahren Sie Belege und Unterlagen gut auf: Sie brauchen sie für Verlängerungen.',
    saveFailed: 'Speichern auf diesem Gerät ist nicht möglich: Ihr Browser blockiert vielleicht den Speicher (zum Beispiel im privaten Fenster). Alles funktioniert trotzdem, aber Ihr Fortschritt wird beim nächsten Mal nicht mehr da sein.',
    saved: 'Auf diesem Gerät gespeichert.',
    verifyAll: d=>`Jeder Schritt ist anhand einer offiziellen Quelle geprüft · zuletzt geprüft am ${d}`,
    verifySome: (c, total, d)=>`${c} von ${total} Schritten anhand einer offiziellen Quelle geprüft · zuletzt geprüft am ${d}`,
    nameLine: 'Auf dem Amtsweg, aber in der richtigen Reihenfolge.'
  }
};
const T = UI[LANG];
// Static page words, keyed by data-i18n in index.html
const STATIC = {
  de: {
    yourSteps: 'Ihre Schritte', changeAnswers: 'Antworten ändern', openStep: 'Schritt öffnen',
    staleText: 'Ihre Antworten haben sich geändert, seit diese Schritte erstellt wurden. Erledigte Schritte bleiben erledigt.',
    updateSteps: 'Schritte aktualisieren', print: 'Drucken oder als PDF speichern', startOver: 'Neu beginnen',
    resetQ: 'Neu beginnen? Das löscht Ihre Antworten und die erledigten Schritte auf diesem Gerät.',
    clearAll: 'Alles löschen', cancel: 'Abbrechen',
    footLine: 'Unabhängiger Wegweiser · keine Behördenseite · keine Rechtsberatung · keine Cookies, nichts zu bestätigen',
    impressum: 'Impressum', privacy: 'Datenschutz', reportMistake: 'Fehler melden'
  }
};
// Dates are written "19 Oct 2026" in the pack; German readers get "19. Okt. 2026"
const MON_DE = { Jan:'Jan.', Feb:'Feb.', Mar:'März', Apr:'Apr.', May:'Mai', Jun:'Juni', Jul:'Juli', Aug:'Aug.', Sep:'Sept.', Oct:'Okt.', Nov:'Nov.', Dec:'Dez.' };
function fmtDate(d){
  if(LANG !== 'de') return d;
  const m = /^(\d{1,2}) (\w{3})\w* (\d{4})$/.exec(d || '');
  return m ? `${m[1]}. ${MON_DE[m[2]] || m[2]} ${m[3]}` : d;
}
// answers: what the questions currently say. built: the answers the shown steps were made from.
const state = { answers: {}, built: null, done: new Set() };
const STORE_KEY = 'progress:' + PACK.id;
const $ = id => document.getElementById(id);

// Glyphs drawn for Amtsweg in one brush-like hand (not an icon library)
const ICON = {
  check: '<svg class="icon icon-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 12.9c1.6-.1 3.4 1.2 5 3.7 2.4-5.4 6.4-9.6 12.2-12.7.4-.2.7.3.3.6-4.9 3.5-8.5 8.1-10.9 13.9-.3.7-1.2.8-1.6.1-1.4-2.3-2.9-3.9-5-4.9-.4-.2-.4-.7 0-.7z"/></svg>',
  chevron: '<svg class="icon chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 9.5c2.4 1.6 4.6 3.6 6.5 5.6 1.9-2.1 4-4 6.5-5.6"/></svg>',
  info: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.5c.2 2.2.1 4.4-.3 6.7"/><path d="M12.1 7.2h.01" stroke-width="2.6"/><path d="M19.6 8.4A8.6 8.6 0 1 0 20 15"/></svg>',
  confirmed: '<svg class="icon icon-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 12.9c1.6-.1 3.4 1.2 5 3.7 2.4-5.4 6.4-9.6 12.2-12.7.4-.2.7.3.3.6-4.9 3.5-8.5 8.1-10.9 13.9-.3.7-1.2.8-1.6.1-1.4-2.3-2.9-3.9-5-4.9-.4-.2-.4-.7 0-.7z"/></svg>',
  unchecked: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h3.5M10.5 12h3M15.5 12H19"/></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.7 9.6A8.3 8.3 0 1 0 20 14.2"/><path d="M12 7.6v4.8l3 1.9"/></svg>',
  compare: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5c4.6-.7 9.6-.6 15 .2M15.8 5.5l3.3 3.2-3.1 3.1"/><path d="M20 15.5c-4.6.7-9.6.6-15-.2M8.2 18.5L4.9 15.3 8 12.2"/></svg>',
  external: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16.2c3.3-3.6 6.6-6.9 10-9.9M12 6c2.1-.2 4.2-.2 6.3.1.3 2.1.3 4.2.1 6.3"/></svg>'
};

/* ---------- Reading the content pack ---------- */

// Which answers count as "matching" a key like "work,family" or "default"
function pickCase(obj, value){
  if(value != null){
    for(const k of Object.keys(obj)){
      if(k === 'by' || k === 'default') continue;
      if(k.split(',').map(s=>s.trim()).includes(value)) return obj[k];
    }
  }
  return Object.prototype.hasOwnProperty.call(obj, 'default') ? obj.default : undefined;
}

// Turn a field (plain text, or { by: ..., ... }) into final text for a set of answers
function resolve(val, ans){
  if(val && typeof val === 'object' && val.by) val = pickCase(val, ans[val.by]);
  if(typeof val === 'string') return fill(val, ans);
  return val == null ? null : val;
}

function vars(ans){
  const v = { verified: PACK.verified };
  PACK.questions.forEach(q=>{
    const opt = q.options.find(o=>o.val === ans[q.id]);
    if(opt) v[q.id + 'Short'] = opt.short || opt.label;
  });
  Object.entries(PACK.vars || {}).forEach(([k, def])=>{
    const r = def && def.by ? pickCase(def, ans[def.by]) : def;
    if(r != null) v[k] = r;
  });
  return v;
}
function fill(text, ans){
  const v = vars(ans);
  return text.replace(/\{(\w+)\}/g, (m, k)=> v[k] != null ? v[k] : m);
}

// Small caps for abbreviations, no breaks inside dates or "§ 81", typographic apostrophes and quotes
const ABBR = /\b(LEA|BZSt|BAMF|GKV|PKV|IdNr|AufenthG|AufenthV|BMG|SGB|ZKG|VVG|ZAB|BaFin|EHIC|PIN|PUK|PDF|BA)\b/g;
function typo(text, noCaps){
  if(typeof text !== 'string') return text;
  return text
    .replace(/(\w)'(\w)/g, '$1\u2019$2')
    .replace(/(^|[\s(\[])'/g, '$1\u2018')
    .replace(/'/g, '\u2019')
    .replace(/§ ?(\d)/g, '§\u00A0$1')
    .replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)([a-z]*) (\d{4})/g, '$1\u00A0$2$3\u00A0$4')
    .replace(/(\d{1,2})\. (Jan\.|Feb\.|März|Apr\.|Mai|Juni|Juli|Aug\.|Sept\.|Okt\.|Nov\.|Dez\.) (\d{4})/g, '$1.\u00A0$2\u00A0$3')
    .replace(/(\d) €/g, '$1\u00A0€')
    .replace(ABBR, noCaps ? '$1' : '<span class="sc">$1</span>');
}

function matches(when, ans){
  return Object.entries(when || {}).every(([k, want])=>{
    const wants = Array.isArray(want) ? want : [want];
    return wants.includes(ans[k]);
  });
}

function visibleQuestions(ans){
  return PACK.questions.filter(q=>matches(q.showIf, ans));
}

function pathFor(ans){
  const p = PACK.paths.find(p=>matches(p.when, ans));
  return p ? p.steps : [];
}

const TIER_ORDER = { official: 0, legal: 1, aggregator: 2 };

function buildStep(id, ans){
  const raw = PACK.steps[id];
  let merged = Object.assign({}, raw);
  delete merged.variants;
  // A variant's disagreement is shown alongside the step's own, not instead of it.
  // Either can itself vary by answer ({ by: ..., ... }).
  const discrepancies = [];
  const addDisc = d=>{ const r = d && d.by ? pickCase(d, ans[d.by]) : d; if(r) discrepancies.push(r); };
  addDisc(raw.discrepancy);
  if(raw.variants){
    const v = pickCase(raw.variants, ans[raw.variants.by]);
    if(v){
      merged = Object.assign(merged, v);
      addDisc(v.discrepancy);
    }
  }
  const out = { id, checked: merged.checked || PACK.verified };
  ['title','meta','short','deadline','what','where','docs','cost','time'].forEach(f=>{ out[f] = resolve(merged[f], ans); });
  out.plainTitle = out.title;
  ['title','meta','short','deadline','what','where','docs','cost','time'].forEach(f=>{ out[f] = typo(out[f], f === 'title'); });
  // flag can be one note or a list of notes; `notes` adds more without replacing a variant's flag
  out.flags = [].concat(resolve(merged.flag, ans) || [], resolve(merged.notes, ans) || [])
    .filter(Boolean).map(f=>typo(fill(f, ans)));
  const srcKey = resolve(merged.source, ans);
  out.source = srcKey ? PACK.sources[srcKey] : null;
  const also = resolve(merged.also, ans) || [];
  out.also = also.map(k=>PACK.sources[k]).filter(x=>x && x !== out.source);
  out.discrepancies = discrepancies;
  return out;
}

function sameAnswers(a, b){
  if(!a || !b) return false;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].every(k=>a[k] === b[k]);
}

/* ---------- Questions (built once; only visibility changes) ---------- */

const qBox = $('questions');

function renderQuestions(){
  qBox.innerHTML = '';
  PACK.questions.forEach(q=>{
    const fs = document.createElement('fieldset');
    fs.id = 'q-' + q.id;
    fs.innerHTML = `<legend>${q.label}</legend><div class="options"></div>`;
    const grid = fs.querySelector('.options');
    q.options.forEach(o=>{
      const id = `opt-${q.id}-${o.val}`;
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `
        <input type="radio" name="${q.id}" value="${o.val}" id="${id}" aria-labelledby="${id}-name"${o.small ? ` aria-describedby="${id}-hint"` : ''}>
        <span class="opt-text"><span class="opt-name" id="${id}-name">${o.label}</span>${o.small ? `<span class="opt-hint" id="${id}-hint">${o.small}</span>` : ''}</span>`;
      label.querySelector('input').addEventListener('change', ()=>{
        state.answers[q.id] = o.val;
        syncQuestions();
        saveProgress(true);
      });
      grid.appendChild(label);
    });
    qBox.appendChild(fs);
  });
  syncQuestions();
}

// Reflect state.answers in the form without rebuilding it (keeps keyboard focus where it is)
function syncQuestions(){
  PACK.questions.forEach(q=>{
    const show = matches(q.showIf, state.answers);
    if(!show) delete state.answers[q.id];
    const fs = $('q-' + q.id);
    fs.hidden = !show;
    fs.querySelectorAll('input').forEach(inp=>{ inp.checked = state.answers[q.id] === inp.value; });
  });
  updateGo();
  updateStale();
}

function missingQuestions(){
  return visibleQuestions(state.answers).filter(q=>!state.answers[q.id]);
}

function updateGo(){
  const missing = missingQuestions();
  const btn = $('go-btn');
  btn.setAttribute('aria-disabled', missing.length ? 'true' : 'false');
  $('go-hint').textContent = missing.length
    ? T.stillToAnswer + missing.map(q=>LANG === 'de' ? `„${q.label}“` : `“${q.label}”`).join(T.and) + '.'
    : '';
}

$('questions-panel').addEventListener('submit', (e)=>{
  e.preventDefault();
  const missing = missingQuestions();
  if(missing.length){
    const first = $('q-' + missing[0].id).querySelector('input');
    if(first) first.focus();
    return;
  }
  build();
  $('dossier').scrollIntoView({behavior: smooth(), block:'start'});
  $('dossier-title').focus({preventScroll:true});
});

const smooth = ()=> matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/* ---------- Your steps ---------- */

function build(){
  state.built = Object.assign({}, state.answers);
  // Done marks are kept: a step that is still on the new route stays done.
  renderDossier();

  saveProgress();
  count('dossier:' + visibleQuestions(state.built).map(q=>state.built[q.id]).join('-'));
}

function updateStale(){
  const stale = !!state.built && !sameAnswers(state.answers, state.built) && missingQuestions().length === 0;
  $('stale-notice').hidden = !stale;
}
$('update-btn').addEventListener('click', ()=>{
  build();
  $('dossier-title').focus();
});

function tierLabel(t){
  if(t==='official') return T.tierOfficial;
  if(t==='legal') return T.tierLegal;
  return T.tierAggregator;
}

// What a closed step shows about itself, in the right-hand column: deadline, checked date, disagreement
const MON = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
function shortDate(d){ const m = /^(\d{1,2}) (\w{3})\w* (\d{4})$/.exec(d || ''); return m ? `${m[1].padStart(2,'0')}.${String(MON[m[2]]).padStart(2,'0')}.${m[3].slice(2)}` : d; }
function asideHtml(s, id){
  // A closed step shows only what you need to plan: its deadline, if it has one
  return `<div class="step-aside" id="aside-${id}">` + (s.deadline
    ? `<span class="a-line a-deadline">${ICON.clock}<span><span class="visually-hidden">${T.deadline}: </span>${s.deadline}</span></span>` : '') + '</div>';
}

// Disagreements stay visible as one line plus what to rely on; the side-by-side claims open on request
function differHtml(s){
  return s.discrepancies.map(d=>`<div class="differ">${ICON.compare}<p><strong>${T.sourcesDiffer}${typo(d.label)}</strong> ${typo(d.rely || T.relyDefault)}</p></div>`).join('');
}
function sourcesHtml(s){
  const summary = s.source
    ? `${ICON.confirmed}<span>${T.sourcesChecked(typo(s.source.name, true), typo(fmtDate(s.checked)))}</span>`
    : `${ICON.unchecked}<span>${T.sourcesUnchecked}</span>`;
  let h = `<details class="more sources"><summary>${summary}${ICON.chevron}</summary><div class="more-body">`;
  if(s.source){
    h += `<p class="source-row">${ICON.confirmed}<span>${T.confirmedAgainst} <a class="source-link" href="${s.source.url}" target="_blank" rel="noopener">${typo(s.source.name, true)}<span class="visually-hidden">${T.officialNewTab}</span></a> <span class="checked-date">${T.checkedOn} ${typo(fmtDate(s.checked))}</span></span></p>`;
  }
  s.discrepancies.forEach(d=>{
    const claims = d.claims.slice().sort((a,b)=>(TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9));
    h += `<div class="disagree"><p class="disagree-title">${T.whatEachSays}${typo(d.label)}</p><ul class="claims">`;
    claims.forEach(c=>{
      h += `<li class="claim"><span class="tier tier-${c.tier}">${tierLabel(c.tier)}<span class="visually-hidden">: </span></span>${typo(c.text)}</li>`;
    });
    h += `</ul></div>`;
  });
  if(s.also.length){
    h += `<div class="also"><p class="also-title">${T.alsoUseful}</p><ul>` + s.also.map(src=>
      `<li><a class="source-link" href="${src.url}" target="_blank" rel="noopener">${typo(src.name, true)}<span class="visually-hidden">${T.newTab}</span></a></li>`).join('') + `</ul></div>`;
  }
  return h + `</div></details>`;
}

function renderDossier(){
  const ans = state.built;
  const ids = pathFor(ans);
  $('situation').textContent = resolve(PACK.dossierTitle, ans) || '';
  $('steps').style.setProperty('--n', ids.length);
  const list = $('steps');
  list.innerHTML = '';
  ids.forEach((id, i)=>{
    const s = buildStep(id, ans);
    const li = document.createElement('li');
    li.className = 'stop';
    li.dataset.id = id;
    li.innerHTML = `
      <span class="node" aria-hidden="true"></span>
      <div class="step" id="step-${id}">
        <div class="step-row">
          <div class="step-heading">
            <h3 class="step-h">
              <button type="button" class="step-head" aria-expanded="false" aria-controls="body-${id}" aria-describedby="about-${id} aside-${id}">
                <span class="step-title"><span class="visually-hidden">${T.step(i+1)}</span>${s.title}</span>
              </button>
            </h3>
            <div class="step-about" id="about-${id}">
              <span class="step-meta">${s.meta}</span>
            </div>
          </div>
          ${asideHtml(s, id)}
          ${ICON.chevron}
        </div>
        <div class="step-body" id="body-${id}" hidden>
          <p class="short"><span class="short-label">${T.inShort}</span> ${s.short || ''}</p>
          <dl class="facts">
            ${s.deadline ? `<dt>${T.deadline}</dt><dd class="deadline-dd">${s.deadline}</dd>` : ''}
            <dt>${T.where}</dt><dd>${s.where}</dd>
            <dt>${T.bring}</dt><dd>${s.docs}</dd>
            <dt>${T.cost}</dt><dd>${s.cost}</dd>
            <dt>${T.when}</dt><dd>${s.time}</dd>
          </dl>
          ${s.flags.map(f=>`<p class="note">${f}</p>`).join('')}
          <div class="step-actions">
            <button type="button" class="btn btn-primary mark-done"></button>
          </div>
          ${differHtml(s)}
          <details class="more"><summary><span>${T.moreDetail}</span>${ICON.chevron}</summary><div class="more-body"><p class="what">${s.what}</p></div></details>
          ${sourcesHtml(s)}
        </div>
      </div>`;
    li.dataset.num = i + 1;
    li.style.setProperty('--i', i);
    li.dataset.title = s.plainTitle;
    const head = li.querySelector('.step-head');
    head.addEventListener('click', ()=> setOpen(li, head.getAttribute('aria-expanded') !== 'true'));
    li.querySelectorAll('.sources a').forEach(a=>a.addEventListener('click', ()=>countOnce('source:' + id)));
    li.querySelector('.mark-done').addEventListener('click', ()=>{
      const nowDone = !state.done.has(id);
      if(nowDone){ state.done.add(id); countOnce('done:' + id); state.fresh = i; }
      else state.done.delete(id);
      refreshProgress();
      state.fresh = null;
      if(nowDone){ li.classList.add('just-done'); setTimeout(()=>li.classList.remove('just-done'), 500); }
      saveProgress();
      const n = ids.filter(x=>state.done.has(x)).length;
      announce(T.announceDone(i+1, nowDone, n, ids.length));
    });
    list.appendChild(li);
  });
  $('dossier').hidden = false;
  updateStale();
  refreshProgress();
}

function setOpen(li, open){
  const head = li.querySelector('.step-head');
  head.setAttribute('aria-expanded', open ? 'true' : 'false');
  li.querySelector('.step-body').hidden = !open;
  li.querySelector('.step').classList.toggle('open', open);
  if(open) countOnce('open:' + li.dataset.id);
}

// Route nodes, done chips, buttons, progress and "your next step"
function refreshProgress(){
  const stops = [...document.querySelectorAll('#steps .stop')];
  const ids = stops.map(li=>li.dataset.id);
  const nextId = ids.find(id=>!state.done.has(id));
  stops.forEach(li=>{
    const done = state.done.has(li.dataset.id);
    li.classList.toggle('done', done);
    li.classList.toggle('next-stop', li.dataset.id === nextId);
    // the numeral, and this step's dot (pale until done, wine when it's next)
    const piece = window.Logogram ? `<span class="node-ink">${Logogram.strokeSvg(stops.indexOf(li), stops.length, { seed: 4, plain: true, weight: 1.35 })}</span>` : '';
    li.querySelector('.node').innerHTML = `<span class="node-num">${li.dataset.num}</span>${piece}` + (done ? `<span class="visually-hidden">${T.doneSuffix}</span>` : '');
    li.querySelector('.step-head .visually-hidden').textContent = done ? T.stepDone(li.dataset.num) : T.step(li.dataset.num);
    const btn = li.querySelector('.mark-done');
    btn.innerHTML = done ? T.markNotDone : `${ICON.check}${T.markDone}`;
  });
  const n = ids.filter(id=>state.done.has(id)).length;
  // Verification is the product: progress and checked status in one line
  const built = ids.map(id=>buildStep(id, state.built));
  const checked = built.filter(s=>s.source);
  const dates = [...new Set(checked.map(s=>s.checked))];
  $('progress-text').innerHTML = `${T.progress(n, ids.length)} <span class="progress-sep">·</span> <span class="progress-checked">${ICON.check}` +
    (checked.length === ids.length ? T.allChecked : T.someChecked(checked.length, ids.length)) +
    (dates.length === 1 ? ` ${typo(fmtDate(dates[0]))}` : '') + `</span>`;
  // the progress logogram: one ink stroke per step, inked when that step is done
  if(window.Logogram){
    $('progress-mark').innerHTML = Logogram.svg({ n: ids.length, done: ids.map(id=>state.done.has(id)), color: '#F4EEEE', ghost: 'rgba(244,238,238,.34)', seed: 4, fresh: state.fresh, plain: true, weight: 1.35, rough: 3 });
  }

  const panel = $('next-panel');
  if(nextId){
    const li = stops.find(x=>x.dataset.id === nextId);
    panel.classList.remove('all-done');
    $('next-label').textContent = n === 0 ? T.firstStep : T.nextStep;
    $('next-num').textContent = li.dataset.num;
    $('next-title').innerHTML = `<span class="visually-hidden">${T.step(li.dataset.num)}</span>`;
    $('next-title').append(li.dataset.title);
    $('next-open').hidden = false;
  } else {
    panel.classList.add('all-done');
    $('next-label').textContent = '';
    $('next-num').textContent = '';
    $('next-title').innerHTML = `<span class="welcome" lang="de">Willkommen in Berlin.</span> ${T.allDone}`;
    $('next-open').hidden = true;
  }
}

$('next-open').addEventListener('click', ()=>{
  const li = document.querySelector('#steps .stop.next-stop');
  if(!li) return;
  setOpen(li, true);
  li.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
  li.querySelector('.step-head').focus({preventScroll:true});
});

$('change-link').addEventListener('click', (e)=>{
  e.preventDefault();
  $('questions-panel').scrollIntoView({behavior:smooth(), block:'start'});
  const checked = $('questions-panel').querySelector('input:checked') || $('questions-panel').querySelector('input');
  if(checked) checked.focus({preventScroll:true});
});

// Print shows every step open (handled in the print stylesheet)
$('print-btn').addEventListener('click', ()=>{ count('print'); window.print(); });
// a printed copy has everything: open every tap-to-open section first
window.addEventListener('beforeprint', ()=>document.querySelectorAll('#steps details').forEach(d=>{ d.open = true; }));

/* ---------- Start over, with confirmation ---------- */

$('reset').addEventListener('click', ()=>{
  $('reset-confirm').hidden = false;
  $('reset').hidden = true;
  $('reset-no').focus();
});
$('reset-no').addEventListener('click', ()=>{
  $('reset-confirm').hidden = true;
  $('reset').hidden = false;
  $('reset').focus();
});
$('reset-yes').addEventListener('click', async ()=>{
  state.answers = {}; state.built = null; state.done = new Set();
  $('reset-confirm').hidden = true;
  $('reset').hidden = false;
  $('dossier').hidden = true;
  syncQuestions();
  await storeDelete(STORE_KEY);
  window.scrollTo({top:0, behavior:smooth()});
  const first = $('questions-panel').querySelector('input');
  if(first) first.focus({preventScroll:true});
});

/* ---------- Saving progress on this device only ---------- */
// Uses Claude's artifact storage when previewed there, plain localStorage on the real site.

async function storeSet(key, value){
  try{ if(window.storage){ await window.storage.set(key, value, false); return true; } }catch(err){}
  try{ localStorage.setItem(key, value); return true; }catch(err){ return false; }
}
async function storeGet(key){
  try{ if(window.storage){ const r = await window.storage.get(key, false); return r ? r.value : null; } }catch(err){}
  try{ return localStorage.getItem(key); }catch(err){ return null; }
}
async function storeDelete(key){
  try{ if(window.storage){ await window.storage.delete(key, false); return; } }catch(err){}
  try{ localStorage.removeItem(key); }catch(err){}
}

let noteTimer;
function announce(text){
  const el = $('save-note');
  el.textContent = text;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(()=>{ el.textContent = ''; }, 6000);
}

async function saveProgress(quiet){
  const ok = await storeSet(STORE_KEY, JSON.stringify({ answers: state.answers, built: state.built, done: Array.from(state.done) }));
  if(!ok) announce(T.saveFailed);
  else if(!quiet) announce(T.saved);
}

async function restoreProgress(){
  try{
    const raw = await storeGet(STORE_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    // Keep only answers that still exist in this pack (content can change between visits)
    const clean = a=>{
      if(!a || typeof a !== 'object') return null;
      const out = {};
      PACK.questions.forEach(q=>{ if(q.options.some(o=>o.val === a[q.id])) out[q.id] = a[q.id]; });
      return out;
    };
    state.answers = clean(saved.answers) || {};
    state.done = new Set((Array.isArray(saved.done) ? saved.done : []).filter(id=>typeof id === 'string' && PACK.steps[id]));
    // Older saves had no separate "built" answers: they were the same thing
    state.built = clean(saved.built !== undefined ? saved.built : saved.answers);
    syncQuestions();
    if(state.built && visibleQuestions(state.built).every(q=>state.built[q.id])) renderDossier();
    else state.built = null;
  }catch(err){
    // no saved progress, or corrupted — start fresh silently
  }
}

/* ---------- Anonymous counting ----------
   Sends only an event name such as "open:permesso" to our own server, which adds 1 to a
   monthly total. No cookies, no IDs, nothing stored on the device, no IP kept, no
   third-party scripts. Skipped entirely when the browser asks not to be tracked. */

// Where anonymous counts go. Empty = counting is off (nothing is ever sent).
const COUNTER_URL = '';
const counted = new Set();
const optedOut = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
function count(event){
  if(!COUNTER_URL || optedOut || !/^https?:$/.test(location.protocol) || /^(localhost|127\.)/.test(location.hostname)) return;
  const url = COUNTER_URL + '?p=' + encodeURIComponent(PACK.id) + '&e=' + encodeURIComponent(event);
  try{ navigator.sendBeacon ? navigator.sendBeacon(url) : fetch(url, {method:'POST', keepalive:true}); }catch(err){}
}
function countOnce(event){
  if(counted.has(event)) return;
  counted.add(event);
  count(event);
}

/* ---------- Start ---------- */

document.title = PACK.page.title;
if(window.Logogram){
  $('mark').innerHTML = Logogram.svg({ n: 7, done: 7, color: '#F4EEEE', seed: 4, weight: 1.1 });
  $('foot-mark').innerHTML = Logogram.svg({ n: 7, done: 7, color: '#F4EEEE', seed: 4, weight: 1.25, rough: 3.4 });
}
$('heading').textContent = PACK.page.heading;
$('sub').innerHTML = typo(PACK.page.sub);
$('meta-line').innerHTML = typo(PACK.page.meta);
$('go-btn').textContent = PACK.page.button;
$('footer-text').textContent = fill(PACK.page.footer, {});
{
  const all = Object.values(PACK.steps);
  const checked = all.filter(st=>st.source || (st.variants && Object.values(st.variants).some(v=>v && v.source))).length;
  $('verify-band-text').innerHTML = typo(checked === all.length ? T.verifyAll(fmtDate(PACK.verified)) : T.verifySome(checked, all.length, fmtDate(PACK.verified)));
}
$('name-line').innerHTML = T.nameLine;
if(STATIC[LANG]) document.querySelectorAll('[data-i18n]').forEach(el=>{ const v = STATIC[LANG][el.dataset.i18n]; if(v) el.textContent = v; });
document.querySelectorAll('[data-lang]').forEach(a=>{ if(a.dataset.lang === LANG) a.setAttribute('aria-current', 'true'); a.addEventListener('click', ()=>{ try{ localStorage.setItem('amtsweg:lang', a.dataset.lang); }catch(e){} }); });
renderQuestions();
count('visit');
restoreProgress();
})();
