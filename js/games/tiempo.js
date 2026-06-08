const GameTiempo = {
  idx:0, correct:0, answered:false, order:[],

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.tiempo.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="ti-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="ti-plabel"></div>
      </div>
      <div id="ti-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const total=DATA.tiempo.length;
    const q=DATA.tiempo[this.order[this.idx%total]];
    document.getElementById('ti-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('ti-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.clothing]);
    const optsHTML=opts.map((c,i)=>`
      <button class="shadow-opt" id="tib-${encodeURIComponent(c.label)}"
        style="width:100px;height:100px;border-radius:20px;font-size:3rem"
        onclick="GameTiempo.answer('${c.label}','${q.correct}')">
        ${c.emoji}
      </button>`).join('');

    document.getElementById('ti-area').innerHTML=`
      <div style="background:${q.bgColor};margin:8px 14px;border-radius:20px;padding:24px;text-align:center;min-height:130px;box-shadow:0 4px 16px rgba(0,0,0,0.1)">
        <div style="font-size:5rem">${q.scene}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:${q.textColor||'#fff'};margin-top:8px">${q.weatherName}</div>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#555;text-align:center;padding:12px 14px 8px">
        ¿Qué ropa es mejor ponerse? 👕
      </div>
      <div class="shadow-options" style="justify-content:center;gap:14px;padding:0 14px;flex-wrap:wrap">${optsHTML}</div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.8rem;color:#aaa;text-align:center;padding:8px">
        Toca la ropa correcta
      </div>
      <div class="action-row">
        <button class="btn-action btn-next" id="ti-next" onclick="GameTiempo.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(`Hace ${q.weatherName}. ¿Qué ropa te pones?`);
  },

  answer(val, correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const btn=document.getElementById('tib-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'correct-opt':'wrong-opt');
    if(!ok){ const cb=document.getElementById('tib-'+encodeURIComponent(correct)); if(cb) cb.classList.add('correct-opt'); }
    if(ok){ this.correct++; App.confetti(); }
    App.speak(ok?'¡Muy bien!':'¡Casi! Hay que abrigarse bien');
    App.showFeedback(ok);
    document.querySelectorAll('.shadow-opt').forEach(b=>b.disabled=true);
    document.getElementById('ti-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.tiempo.length){
      const stars=Math.round((this.correct/DATA.tiempo.length)*5);
      App.levelComplete('tiempo',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.tiempo.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
