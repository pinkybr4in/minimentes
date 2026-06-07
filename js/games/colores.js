const GameColores = {
  idx:0, correct:0, answered:false, order:[],

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.colores.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="co2-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="co2-plabel"></div>
      </div>
      <div id="co2-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const total=DATA.colores.length;
    const q=DATA.colores[this.order[this.idx%total]];
    document.getElementById('co2-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('co2-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.options]);
    const optsHTML=opts.map(o=>`
      <button class="color-choice-btn" id="ccb-${encodeURIComponent(o.label)}"
        onclick="GameColores.answer('${o.label}','${q.correct}')"
        style="background:${o.hex};box-shadow:0 4px 0 rgba(0,0,0,0.2)">
        ${o.label}
      </button>`).join('');

    document.getElementById('co2-area').innerHTML=`
      <div style="text-align:center;padding:20px 14px 10px">
        <div style="font-size:6rem;line-height:1;margin-bottom:12px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1.1rem;color:#555;margin-bottom:16px">
          ¿De qué color es ${q.article} ${q.name}?
        </div>
      </div>
      <div class="color-choices">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="co2-next" onclick="GameColores.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(`¿De qué color es ${q.article} ${q.name}?`);
  },

  answer(val, correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const btn=document.getElementById('ccb-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'color-correct':'color-wrong');
    if(!ok){
      const cb=document.getElementById('ccb-'+encodeURIComponent(correct));
      if(cb) cb.classList.add('color-correct');
    }
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?`¡Correcto! Es ${correct}`:`Es ${correct}`);
    App.showFeedback(ok);
    document.querySelectorAll('.color-choice-btn').forEach(b=>b.disabled=true);
    document.getElementById('co2-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.colores.length){
      const stars=Math.round((this.correct/DATA.colores.length)*5);
      App.levelComplete('colores',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.colores.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
