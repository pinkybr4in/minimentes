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

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D'];
    const optsHTML=opts.map((o,i)=>`
      <button class="count-btn" id="rlb-${encodeURIComponent(o)}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1rem;width:auto;min-width:80px;height:56px;padding:0 14px;border-radius:16px"
        onclick="GameReloj.answer('${o}','${q.answer}')">
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

    this.drawClock(q.hours, q.minutes);
    App.speak('¿Qué hora marca el reloj?');
  },

  drawClock(hours, minutes) {
    const canvas=document.getElementById('rl-clock');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const cx=100, cy=100, r=90;
    ctx.clearRect(0,0,200,200);

    // Face
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.fillStyle='white'; ctx.fill();
    ctx.strokeStyle='#333'; ctx.lineWidth=4; ctx.stroke();

    // Hour markers
    for(let i=0;i<12;i++){
      const angle=i*Math.PI/6 - Math.PI/2;
      const len=i%3===0?12:6;
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(angle)*(r-4), cy+Math.sin(angle)*(r-4));
      ctx.lineTo(cx+Math.cos(angle)*(r-4-len), cy+Math.sin(angle)*(r-4-len));
      ctx.strokeStyle='#333'; ctx.lineWidth=i%3===0?3:1.5; ctx.stroke();
    }

    // Numbers 12,3,6,9
    ctx.fillStyle='#333'; ctx.font='bold 16px Nunito'; ctx.textAlign='center'; ctx.textBaseline='middle';
    [{n:'12',x:cx,y:cy-68},{n:'3',x:cx+68,y:cy},{n:'6',x:cx,y:cy+68},{n:'9',x:cx-68,y:cy}]
      .forEach(p=>ctx.fillText(p.n,p.x,p.y));

    // Hour hand
    const hAngle=((hours%12)+minutes/60)*Math.PI/6 - Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(hAngle)*52, cy+Math.sin(hAngle)*52);
    ctx.strokeStyle='#333'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.stroke();

    // Minute hand
    const mAngle=minutes*Math.PI/30 - Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(mAngle)*72, cy+Math.sin(mAngle)*72);
    ctx.strokeStyle='#FF6B6B'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.stroke();

    // Center dot
    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2);
    ctx.fillStyle='#333'; ctx.fill();
  },

  answer(val, correct) {
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
