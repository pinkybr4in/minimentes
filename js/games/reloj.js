const GameReloj = {
  idx:0, correct:0, answered:false, order:[],

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.reloj.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="rl-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="rl-plabel"></div>
      </div>
      <div id="rl-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const total=DATA.reloj.length;
    const q=DATA.reloj[this.order[this.idx%total]];
    document.getElementById('rl-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('rl-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    // Format time in 24h style: pad hours to 2 digits
    const fmt=(h,m)=>{
      const hh=String(h).padStart(2,'0');
      const mm=String(m).padStart(2,'0');
      return `${hh}:${mm}`;
    };

    // Rebuild options using 24h format
    const correctStr=fmt(q.hours,q.minutes);
    // Generate 3 wrong options from the base options list but reformat to 24h
    const wrongOpts=q.options
      .filter(o=>o!==q.answer) // remove old 12h correct
      .map(o=>{
        // Parse the old 12h string and convert
        const parts=o.split(':');
        let h=parseInt(parts[0]); const m=parseInt(parts[1]||0);
        // Keep as-is but pad
        return fmt(h,m);
      })
      .filter(o=>o!==correctStr)
      .slice(0,3);

    // Fill to 3 wrong if needed with nearby times
    while(wrongOpts.length<3){
      const h=(q.hours+wrongOpts.length+1)%24;
      const candidate=fmt(h,q.minutes);
      if(!wrongOpts.includes(candidate)&&candidate!==correctStr) wrongOpts.push(candidate);
    }

    const opts=App.shuffle([correctStr,...wrongOpts.slice(0,3)]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D'];
    const optsHTML=opts.map((o,i)=>`
      <button class="count-btn" id="rlb-${encodeURIComponent(o)}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.1rem;width:auto;min-width:80px;height:58px;padding:0 16px;border-radius:16px;font-family:'Fredoka One',cursive"
        onclick="GameReloj.answer('${o}','${correctStr}')">
        ${o}
      </button>`).join('');

    document.getElementById('rl-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 10px">
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:14px">¿Qué hora marca el reloj?</div>
        <canvas id="rl-clock" width="200" height="200" style="border-radius:50%;box-shadow:0 4px 16px rgba(0,0,0,0.15);margin-bottom:16px"></canvas>
      </div>
      <div class="count-options" style="justify-content:center;padding:0 14px;gap:12px;flex-wrap:wrap">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="rl-next" onclick="GameReloj.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    this.drawClock(q.hours,q.minutes);
    const spoken=`${String(q.hours).padStart(2,'0')} y ${q.minutes===0?'en punto':q.minutes+' minutos'}`;
    App.speak('¿Qué hora marca el reloj?');
  },

  drawClock(hours,minutes) {
    const canvas=document.getElementById('rl-clock');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const cx=100,cy=100,r=90;
    ctx.clearRect(0,0,200,200);
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.fillStyle='white'; ctx.fill();
    ctx.strokeStyle='#333'; ctx.lineWidth=4; ctx.stroke();
    for(let i=0;i<12;i++){
      const angle=i*Math.PI/6-Math.PI/2;
      const len=i%3===0?12:6;
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(angle)*(r-4),cy+Math.sin(angle)*(r-4));
      ctx.lineTo(cx+Math.cos(angle)*(r-4-len),cy+Math.sin(angle)*(r-4-len));
      ctx.strokeStyle='#333'; ctx.lineWidth=i%3===0?3:1.5; ctx.stroke();
    }
    ctx.fillStyle='#333'; ctx.font='bold 15px Nunito'; ctx.textAlign='center'; ctx.textBaseline='middle';
    [{n:'12',x:cx,y:cy-68},{n:'3',x:cx+68,y:cy},{n:'6',x:cx,y:cy+68},{n:'9',x:cx-68,y:cy}]
      .forEach(p=>ctx.fillText(p.n,p.x,p.y));
    const hAngle=((hours%12)+minutes/60)*Math.PI/6-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(hAngle)*52,cy+Math.sin(hAngle)*52);
    ctx.strokeStyle='#333'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.stroke();
    const mAngle=minutes*Math.PI/30-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(mAngle)*72,cy+Math.sin(mAngle)*72);
    ctx.strokeStyle='#FF6B6B'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2); ctx.fillStyle='#333'; ctx.fill();
  },

  answer(val,correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const btn=document.getElementById('rlb-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){ const cb=document.getElementById('rlb-'+encodeURIComponent(correct)); if(cb) cb.classList.add('correct-btn'); }
    if(ok){ this.correct++; App.confetti(); }
    App.speak(ok?`¡Correcto! Son las ${correct}`:`Son las ${correct}`);
    App.showFeedback(ok);
    document.querySelectorAll('#rl-area .count-btn').forEach(b=>b.disabled=true);
    document.getElementById('rl-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.reloj.length){
      const stars=Math.round((this.correct/DATA.reloj.length)*5);
      App.levelComplete('reloj',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.reloj.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
