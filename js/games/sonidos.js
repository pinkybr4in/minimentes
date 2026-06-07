const GameSonidos = {
  idx:0, correct:0, answered:false, order:[],
  synth: null,

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.sonidos.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="so-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="so-plabel"></div>
      </div>
      <div id="so-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const total=DATA.sonidos.length;
    const q=DATA.sonidos[this.order[this.idx%total]];
    document.getElementById('so-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('so-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#C77DFF','#FF9F43','#6BCB77','#6EC6F5'];
    const optsHTML=opts.map((o,i)=>
      `<button class="shadow-opt" id="sob-${encodeURIComponent(o.label)}"
        onclick="GameSonidos.answer('${o.label}','${q.answer}')" style="font-size:2.5rem">
        ${o.emoji}
      </button>`
    ).join('');

    document.getElementById('so-area').innerHTML=`
      <div style="text-align:center;padding:20px 14px 10px">
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:16px">
          🔊 ¿Qué hace este sonido?
        </div>
        <button class="english-sound-btn" style="width:90px;height:90px;font-size:3rem;border-radius:50%;background:linear-gradient(135deg,#6EC6F5,#C77DFF);border:none;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,0.2);margin-bottom:16px"
          onclick="GameSonidos.playSound()" id="so-playbtn">🔊</button>
        <div style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#aaa">Toca para escuchar</div>
      </div>
      <div class="shadow-options" style="justify-content:center;gap:14px;flex-wrap:wrap;padding:0 14px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="so-next" onclick="GameSonidos.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    // Auto-play after short delay
    setTimeout(()=>this.playSound(), 700);
  },

  playSound() {
    const q=DATA.sonidos[this.order[this.idx%DATA.sonidos.length]];
    const btn=document.getElementById('so-playbtn');
    if(btn){ btn.style.transform='scale(0.9)'; setTimeout(()=>btn.style.transform='',200); }
    // Use speech synthesis to speak the sound description
    App.speak(q.sound, 'es-ES');
  },

  answer(val, correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const btn=document.getElementById('sob-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'correct-opt':'wrong-opt');
    if(!ok){
      const cb=document.getElementById('sob-'+encodeURIComponent(correct));
      if(cb) cb.classList.add('correct-opt');
    }
    if(ok){this.correct++;App.confetti();}
    const q=DATA.sonidos[this.order[this.idx%DATA.sonidos.length]];
    App.speak(ok?`¡Correcto! Es ${q.correctLabel}`:`Es ${q.correctLabel}`);
    App.showFeedback(ok);
    document.querySelectorAll('.shadow-opt').forEach(b=>b.disabled=true);
    document.getElementById('so-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.sonidos.length){
      const stars=Math.round((this.correct/DATA.sonidos.length)*5);
      App.levelComplete('sonidos',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.sonidos.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
