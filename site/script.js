'use strict';
const chipButtons=Array.from(document.querySelectorAll('[data-filter]'));
const evidenceCards=Array.from(document.querySelectorAll('.evidence-card'));
chipButtons.forEach(b=>b.addEventListener('click',()=>{const selected=b.dataset.filter;chipButtons.forEach(chip=>{const active=chip===b;chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));});evidenceCards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.type!==selected;});const live=document.getElementById('filter-status');if(live){const shown=evidenceCards.filter(card=>!card.hidden).length;live.textContent='Showing '+shown+' of '+evidenceCards.length+' findings';}}));
const content={
history:{severity:'DOCUMENTED IN LOCAL ADAPTER',heading:'Tagged history replay',body:'One MCC configuration replayed earlier reasoning as literal <think> tags, and requested max effort was mapped to high. Either could alter subsequent model behavior without proving weight quantization.'},
protocol:{severity:'SUPPORTED BY FIELD-LEVEL SYMPTOMS',heading:'Reasoning / content mapping',body:'The local investigation reported a closing delimiter inside the incoming reasoning_content field and no ordinary answer content in one case. Streaming conversion, backend chat templates and adapter normalization need controlled testing.'},
context:{severity:'PLAUSIBLE CONTRIBUTOR',heading:'Context-length / decoding instability',body:'The observed session and screenshots involve long context and tool-rich workflows. Context pressure, prompt contamination, sampler parameters, output budgets or stopping behavior could also drive looping and malformed continuations.'},
ui:{severity:'NOT EXCLUDED BY SCREENSHOTS',heading:'Client rendering / exposed Thought panel',body:'Native OpenCode screenshots show a Thought display, but they do not by themselves prove that reasoning was exposed unintentionally. Raw model fields and UI render events are needed to separate display behavior from server output.'}};
const tabs=Array.from(document.querySelectorAll('.hypo-tab'));const panel=document.getElementById('hypo-panel');
tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(a=>{const on=t===a;a.classList.toggle('active',on);a.setAttribute('aria-selected',String(on));a.tabIndex=on?0:-1;});const x=content[t.dataset.hypo];if(!x||!panel)return;const rating=document.createElement('div');rating.className='alt-rating';rating.textContent=x.severity;const title=document.createElement('h4');title.textContent=x.heading;const p=document.createElement('p');p.textContent=x.body;const l=document.createElement('a');l.href='#reproduce';l.textContent='How to distinguish causes ↗';panel.replaceChildren(rating,title,p,l);}));
// Arrow keys, Home and End switch explanation tabs for keyboard users.
tabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{
  let next=null;
  if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
  if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=tabs.length-1;
  if(next!==null){event.preventDefault();tabs[next].focus();tabs[next].click();}
}));
const menu=document.getElementById('menu-toggle');const nav=document.getElementById('mobile-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.hidden=!open;});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.hidden=true;menu.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu&&nav&&!nav.hidden){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus();}});
const snippet=`{"provider":"[go | official | other]","model_revision":"[verified version]","harness":"[native | bridge]","context_tokens":0,"effort_sent":"[recorded]","reasoning_valid":true,"tool_calls_valid":true,"json_schema_valid":true,"loop_detected":false,"stop_reason":"[observed]"}`;
const btn=document.getElementById('copy-template');btn?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(snippet);btn.textContent='Copied ✓';}catch{btn.textContent='Use HTTPS to enable copying';}setTimeout(()=>btn.textContent='Copy test template ⧉',2500);});

// Full silent video is available directly on the homepage; chapters are real playback controls.
const homepageVideo=document.getElementById('home-evidence-video');
const homepageChapters=Array.from(document.querySelectorAll('[data-home-seek]'));
const selectVideoChapter=(target)=>{
  homepageChapters.forEach(b=>{
    const active=b===target;
    b.classList.toggle('is-active',active);
    if(active)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');
  });
};
if(homepageVideo){
  homepageChapters.forEach(button=>button.addEventListener('click',()=>{
    const sec=Number(button.dataset.homeSeek);
    if(!Number.isFinite(sec))return;
    try{homepageVideo.currentTime=Math.max(0,sec);}catch{}
    selectVideoChapter(button);
    homepageVideo.play().catch(()=>{});
  }));
  homepageVideo.addEventListener('timeupdate',()=>{
    if(!homepageVideo.duration)return;
    const t=homepageVideo.currentTime;
    const current=homepageChapters.reduce((prev,b)=>{
      const n=Number(b.dataset.homeSeek);
      return n<=t?b:prev;
    },homepageChapters[0]);
    if(current)selectVideoChapter(current);
  });
}
