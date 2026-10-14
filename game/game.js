(() => {
  'use strict';
  const canvas = document.querySelector('#stage');
  const ctx = canvas.getContext('2d');
  const $ = (s) => document.querySelector(s);
  const ui = {score:$('#score'),combo:$('#combo'),accuracy:$('#accuracy'),progress:$('#progress'),time:$('#time-left'),overlay:$('#overlay'),title:$('#overlay-title'),copy:$('#overlay-copy'),start:$('#start'),pause:$('#pause'),mute:$('#mute'),status:$('#status'),flash:$('#hit-flash'),announce:$('#announcer')};
  const BPM = 90, BEAT = 60 / BPM, DURATION = 60, APPROACH = 1.55, HIT_Y = .75;
  let width=960,height=498,dpr=1,notes=[],particles=[],state='ready',startAt=0,pausedAt=0,score=0,combo=0,hits=0,misses=0,nextNote=0,lastBeat=-1,lastFrame=0,muted=false,audio=null,beatTimer=0,announceTimer=0;
  const patterns=[
    [[0,'b','up'],[.5,'r','down'],[1,'b','down'],[1.5,'r','up'],[2,'b','right'],[2.5,'r','left'],[3,'b','up'],[3.5,'r','down']],
    [[0,'r','left'],[.5,'b','right'],[1,'r','up'],[1.5,'b','down'],[2,'r','right'],[2.5,'b','left'],[3,'r','down'],[3.5,'b','up']],
    [[0,'b','up'],[.25,'r','up'],[.75,'b','down'],[1.5,'r','right'],[2,'b','left'],[2.5,'r','down'],[3,'b','right'],[3.5,'r','up']],
    [[0,'r','down'],[.5,'b','up'],[1,'r','left'],[1.5,'b','right'],[2,'r','up'],[2.25,'b','up'],[3,'r','down'],[3.5,'b','left']]
  ];
  function makeChart(){
    notes=[];
    // Intro, build, peak, and outro; patterns repeat with alternating variations.
    const sections=[{from:2,to:12,density:.5},{from:12,to:27,density:.5},{from:27,to:45,density:.5},{from:45,to:58,density:.5}];
    for(let bar=0;bar<Math.ceil(DURATION/(BEAT*4));bar++){
      const barStart=bar*BEAT*4;
      const section=sections.find(s=>barStart>=s.from&&barStart<s.to); if(!section)continue;
      const pattern=patterns[Math.floor(bar/2)%patterns.length];
      for(const [offset,lane,dir] of pattern){
        const t=barStart+offset*BEAT;
        if(t<section.from||t>=section.to||t>DURATION-.3)continue;
        // Leave a little air in the opening bars, then build density gradually.
        if(t<12 && offset===3.5 && bar%2===0)continue;
        notes.push({t,lane,dir,status:'pending',judged:false});
      }
    }
    notes.sort((a,b)=>a.t-b.t);
  }
  function resize(){
    const rect=canvas.getBoundingClientRect(); if(!rect.width)return;
    dpr=Math.min(window.devicePixelRatio||1,2); width=Math.max(320,Math.round(rect.width)); height=Math.max(320,Math.round(rect.width*(innerWidth<700?1:.51875)));
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  const lerp=(a,b,t)=>a+(b-a)*t;
  function roundedRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  function drawBackground(now){
    const cx=width/2, horizon=height*.16, ground=height*.9;
    const bg=ctx.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#0b0d14');bg.addColorStop(.5,'#12131d');bg.addColorStop(1,'#090a10');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
    // Distant atmospheric rings and a restrained stage glow.
    const glow=ctx.createRadialGradient(cx,ground*.83,0,cx,ground*.83,width*.58);glow.addColorStop(0,'#34202b44');glow.addColorStop(1,'#0b0d1400');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    ctx.strokeStyle='#f5f5ff0b';ctx.lineWidth=1;
    for(let i=0;i<11;i++){const p=(i/10);const y=lerp(horizon,ground,p*p);ctx.beginPath();ctx.moveTo(cx-width*.45*p,y);ctx.lineTo(cx+width*.45*p,y);ctx.stroke()}
    for(let i=-5;i<=5;i++){ctx.beginPath();ctx.moveTo(cx,horizon);ctx.lineTo(cx+i*width*.13,ground);ctx.stroke()}
    const beatPulse=(state==='playing'?Math.max(0,1-((now%BEAT)/BEAT)*3):0);
    ctx.save();ctx.globalAlpha=.05+beatPulse*.08;ctx.strokeStyle='#ff526c';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(cx,ground*.9,width*.31,height*.13,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    const laneGap=width*.21, laneW=width*.30, laneY=height*.21, laneH=height*.62;
    for(const [index,color] of [[-1,'#51c9ff'],[1,'#ff405f']]){
      const x=cx+index*laneGap-laneW/2;const lane=ctx.createLinearGradient(0,laneY,0,laneY+laneH);lane.addColorStop(0,'#171a25aa');lane.addColorStop(1,'#17182033');ctx.fillStyle=lane;roundedRect(x,laneY,laneW,laneH,12);ctx.fill();
      ctx.strokeStyle=color+'25';ctx.lineWidth=1;roundedRect(x,laneY,laneW,laneH,12);ctx.stroke();
      ctx.fillStyle=color+'10';ctx.fillRect(x+laneW*.45,laneY,1,laneH);
    }
    // Bright strike rail spans both fixed color lanes.
    const lineY=height*HIT_Y;
    const lineGlow=ctx.createLinearGradient(0,lineY-16,0,lineY+16);lineGlow.addColorStop(0,'#ffffff00');lineGlow.addColorStop(.5,'#ffffffbb');lineGlow.addColorStop(1,'#ffffff00');ctx.fillStyle=lineGlow;ctx.fillRect(width*.13,lineY-16,width*.74,32);
    ctx.fillStyle='#f3f3ff';ctx.shadowColor='#fff';ctx.shadowBlur=14;ctx.fillRect(width*.16,lineY-1,width*.68,2);ctx.shadowBlur=0;
    ctx.fillStyle='#bfc0ce';ctx.font=`${Math.max(8,width*.009)}px ${getComputedStyle(document.body).fontFamily}`;ctx.textAlign='center';ctx.fillText('CUT ON THE LINE',cx,lineY-height*.045);
  }
  function drawNote(note,now){
    const until=note.t-now; if(until>APPROACH||note.status==='hit'||note.status==='miss')return;
    const progress=Math.max(0,Math.min(1,1-until/APPROACH));
    const laneIndex=note.lane==='b'?-1:1, laneCenter=width/2+laneIndex*width*.21;
    const x=laneCenter;const scale=lerp(.42,1,progress);const size=width*.074*scale;const y=lerp(height*.27,height*HIT_Y,progress);
    const color=note.lane==='b'?'#51c9ff':'#ff405f';
    ctx.save();ctx.translate(x,y);ctx.rotate(progress*Math.PI*.045);
    ctx.shadowColor=color;ctx.shadowBlur=17*scale;ctx.fillStyle=color;
    roundedRect(-size/2,-size/2,size,size,size*.12);ctx.fill();ctx.shadowBlur=0;
    ctx.strokeStyle='#ffffff88';ctx.lineWidth=Math.max(1,2*scale);roundedRect(-size/2+2,-size/2+2,size-4,size-4,size*.1);ctx.stroke();
    // Directional chevron.
    ctx.translate(0,0);ctx.rotate(({up:0,right:Math.PI/2,down:Math.PI,left:-Math.PI/2})[note.dir]);ctx.strokeStyle='#091019';ctx.lineWidth=Math.max(2,size*.09);ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(0,size*.23);ctx.lineTo(0,-size*.21);ctx.moveTo(-size*.16,-size*.04);ctx.lineTo(0,-size*.21);ctx.lineTo(size*.16,-size*.04);ctx.stroke();ctx.restore();
  }
  function drawParticles(dt){
    particles=particles.filter(p=>p.life>0);for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;ctx.globalAlpha=Math.max(0,p.life/p.total);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  }
  function burst(color,lane){const x=width/2+(lane==='b'?-1:1)*width*.21,y=height*HIT_Y;for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,s=70+Math.random()*220;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.25+Math.random()*.35,total:.6,size:1.5+Math.random()*2.8,color})}ui.flash.classList.remove('active');void ui.flash.offsetWidth;ui.flash.classList.add('active')}
  function draw(now,dt){drawBackground(now);for(const n of notes)drawNote(n,now);drawParticles(dt);if(state==='playing')updateNotes(now);}
  function updateNotes(now){
    for(const n of notes){if(n.status==='pending'&&now>n.t+.18){n.status='miss';misses++;combo=0;updateHud();}}
    while(nextNote<notes.length&&notes[nextNote].t-APPROACH<=now)nextNote++;
  }
  function updateHud(){ui.score.textContent=String(score).padStart(6,'0');ui.combo.textContent=combo;ui.accuracy.textContent=(hits+misses)?`${Math.round(hits/(hits+misses)*100)}%`:'—';}
  function unlockAudio(){if(!audio){const C=window.AudioContext||window.webkitAudioContext;if(C)audio=new C()}if(audio?.state==='suspended')audio.resume()}
  function tone(freq,time,duration,type='sine',gain=.035,endFreq=null){if(!audio||muted)return;const osc=audio.createOscillator(),vol=audio.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,time);if(endFreq)osc.frequency.exponentialRampToValueAtTime(Math.max(1,endFreq),time+duration);vol.gain.setValueAtTime(gain,time);vol.gain.exponentialRampToValueAtTime(.0001,time+duration);osc.connect(vol).connect(audio.destination);osc.start(time);osc.stop(time+duration+.01)}
  function kick(t){tone(115,t,.2,'sine',.12,42)}
  function snare(t){if(!audio||muted)return;const buffer=audio.createBuffer(1,audio.sampleRate*.12,audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,1.5);const src=audio.createBufferSource(),g=audio.createGain();src.buffer=buffer;g.gain.setValueAtTime(.045,t);g.gain.exponentialRampToValueAtTime(.0001,t+.12);src.connect(g).connect(audio.destination);src.start(t);tone(180,t,.09,'triangle',.04,85)}
  function synthBeat(now){if(!audio||muted||state!=='playing')return;const elapsed=now-startAt;if(elapsed<0)return;const beat=Math.floor(elapsed/BEAT);if(beat===lastBeat)return;lastBeat=beat;const t=audio.currentTime+.015;if(beat%4===0)kick(t);else if(beat%4===2)snare(t);else tone(880,t,.035,'square',.008);if(beat%2===0)tone(58,t,.18,'triangle',.025,45);}
  function hit(lane){if(state!=='playing')return;const now=(performance.now()-startAt)/1000;let candidate=null,best=Infinity;for(const n of notes){if(n.status!=='pending'||n.lane!==lane)continue;const diff=Math.abs(n.t-now);if(diff<best){best=diff;candidate=n}}if(candidate&&best<=.22){candidate.status='hit';hits++;combo++;const quality=best<.085?100:best<.15?70:45;score+=quality+Math.min(combo,50)*2;burst(lane==='b'?'#51c9ff':'#ff405f',lane);announce(quality===100?'Perfect!':quality===70?'Good cut!':'Cut!');updateHud()}else{combo=0;announce('Miss');updateHud()}}
  function announce(text){clearTimeout(announceTimer);ui.announce.textContent=text;announceTimer=setTimeout(()=>ui.announce.textContent='',550)}
  function start(){unlockAudio();makeChart();score=0;combo=0;hits=0;misses=0;nextNote=0;lastBeat=-1;particles=[];startAt=performance.now();state='playing';ui.overlay.classList.add('hidden');ui.pause.textContent='Ⅱ';ui.pause.setAttribute('aria-label','Pause game');ui.status.textContent='RUN IN PROGRESS';document.body.classList.remove('is-paused');updateHud();}
  function pause(){if(state==='playing'){state='paused';pausedAt=performance.now();ui.overlay.classList.remove('hidden');ui.title.innerHTML='Take a<br><em>breather.</em>';ui.copy.textContent='Your run is paused. Pick up where you left off when you are ready.';ui.start.innerHTML='Resume run <span aria-hidden="true">→</span>';ui.pause.textContent='▶';ui.pause.setAttribute('aria-label','Resume game');ui.status.textContent='PAUSED';document.body.classList.add('is-paused')}else if(state==='paused'){startAt+=performance.now()-pausedAt;state='playing';ui.overlay.classList.add('hidden');ui.pause.textContent='Ⅱ';ui.pause.setAttribute('aria-label','Pause game');ui.status.textContent='RUN IN PROGRESS';document.body.classList.remove('is-paused')}}
  function finish(){state='done';ui.overlay.classList.remove('hidden');const accuracy=(hits+misses)?Math.round(hits/(hits+misses)*100):0;ui.title.innerHTML='Run<br><em>complete.</em>';ui.copy.textContent=`${score.toLocaleString()} points · ${accuracy}% accuracy · ${hits} cuts landed. ${accuracy>=80?'Clean work.':'Run it back and find your flow.'}`;ui.start.innerHTML='Play again <span aria-hidden="true">→</span>';ui.status.textContent='RUN COMPLETE';ui.pause.textContent='Ⅱ';ui.pause.setAttribute('aria-label','Pause game');ui.announce.textContent='Run complete';}
  function frame(ts){if(!lastFrame)lastFrame=ts;const dt=Math.min(.04,(ts-lastFrame)/1000);lastFrame=ts;const now=state==='playing'?(ts-startAt)/1000:state==='paused'?(pausedAt-startAt)/1000:0;draw(now,dt);
    if(state==='playing'){synthBeat(now);const elapsed=Math.min(DURATION,now);ui.progress.style.width=`${elapsed/DURATION*100}%`;const left=Math.max(0,Math.ceil(DURATION-elapsed));ui.time.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;if(elapsed>=DURATION)finish()}
    requestAnimationFrame(frame);
  }
  ui.start.addEventListener('click',()=>{if(state==='paused')pause();else start()});
  ui.pause.addEventListener('click',()=>{if(state==='playing'||state==='paused')pause()});
  ui.mute.addEventListener('click',()=>{muted=!muted;ui.mute.textContent=muted?'♫̸':'♫';ui.mute.setAttribute('aria-label',muted?'Unmute audio':'Mute audio');ui.status.textContent=muted&&state==='playing'?'RUN IN PROGRESS · MUTED':state==='playing'?'RUN IN PROGRESS':state==='paused'?'PAUSED':'READY WHEN YOU ARE';if(!muted&&state==='playing'&&audio?.state==='suspended')audio.resume()});
  addEventListener('keydown',e=>{if(['a','A','ArrowLeft'].includes(e.key)){e.preventDefault();hit('b')}else if(['l','L','ArrowRight'].includes(e.key)){e.preventDefault();hit('r')}else if(e.key==='Escape'||e.key===' '){e.preventDefault();if(state==='playing'||state==='paused')pause();else if(state==='ready'||state==='done')start()}});
  canvas.addEventListener('pointerdown',e=>{const rect=canvas.getBoundingClientRect();hit(e.clientX-rect.left<rect.width/2?'b':'r')});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')pause()});
  new ResizeObserver(resize).observe(canvas);resize();makeChart();updateHud();requestAnimationFrame(frame);
})();
