// PARTES DEL CUERPO - Tap on the correct body part
const GamePartesCuerpo = {
  idx:0, correct:0, order:[], answered:false,

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.partesCuerpo.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="pc-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="pc-plabel"></div>
      </div>
      <div id="pc-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const total=DATA.partesCuerpo.length;
    const q=DATA.partesCuerpo[this.order[this.idx%total]];
    document.getElementById('pc-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('pc-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];
    const optsHTML=opts.map((o,i)=>
      `<button class="count-btn" id="pcb-${i}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1rem;height:auto;min-width:80px;padding:10px 14px;border-radius:16px"
        onclick="GamePartesCuerpo.answer(${i})">${o}</button>`
    ).join('');

    document.getElementById('pc-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:6rem;margin-bottom:10px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1.2rem;color:#555;margin-bottom:16px">
          ¿Qué parte del cuerpo es?
        </div>
      </div>
      <div class="count-options" style="justify-content:center;padding:0 14px;gap:10px;flex-wrap:wrap">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="pc-next" onclick="GamePartesCuerpo.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    this._opts=opts; this._correct=q.answer;
    App.speak('¿Qué parte del cuerpo ves?');
  },

  _opts:[], _correct:'',

  answer(idx) {
    if(this.answered) return;
    this.answered=true;
    const val=this._opts[idx];
    const ok=val===this._correct;
    const btn=document.getElementById('pcb-'+idx);
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){
      this._opts.forEach((o,i)=>{
        if(o===this._correct){ const cb=document.getElementById('pcb-'+i); if(cb) cb.classList.add('correct-btn'); }
      });
    }
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?'¡Correcto! Es '+this._correct:'Es '+this._correct);
    App.showFeedback(ok);
    document.querySelectorAll('#pc-area .count-btn').forEach(b=>b.disabled=true);
    document.getElementById('pc-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.partesCuerpo.length){
      const stars=Math.round((this.correct/DATA.partesCuerpo.length)*5);
      App.levelComplete('partes_cuerpo',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.partesCuerpo.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
