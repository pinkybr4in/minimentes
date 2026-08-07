// OPUESTOS - Find the opposite (antonyms, visual opposites)
const GameOpuestos = {
  level:'easy', idx:0, correct:0, order:[], answered:false,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="op-easy" onclick="GameOpuestos.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="op-med"  onclick="GameOpuestos.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="op-hard" onclick="GameOpuestos.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="op-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="op-plabel"></div>
      </div>
      <div id="op-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('op-'+l)?.classList.remove('active'));
    document.getElementById('op-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.opuestos[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.answered=false;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const items=DATA.opuestos[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('op-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('op-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];
    const optsHTML=opts.map((o,i)=>`
      <button class="shadow-opt" id="opb-${i}" data-idx="${i}"
        style="font-size:2.8rem;width:100px;height:100px;border-radius:20px;border:none;background:white;box-shadow:0 4px 0 #ccc;cursor:pointer;transition:transform 0.1s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px"
        onclick="GameOpuestos.answer(${i})">
        <span>${o.emoji}</span>
        <span style="font-family:'Fredoka One',cursive;font-size:0.7rem;color:#888">${o.word}</span>
      </button>`).join('');

    document.getElementById('op-area').innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.08);text-align:center">
        <div style="font-size:5rem;margin-bottom:8px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1.5rem;color:#333;margin-bottom:4px">${q.word}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#aaa">¿Cuál es lo contrario?</div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:14px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="op-next" onclick="GameOpuestos.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word + '. ¿Cuál es lo contrario?');
    // Store for answer lookup
    this._opts=opts; this._correct=q.answer;
  },

  _opts:[], _correct:'',

  answer(idx) {
    if(this.answered) return;
    this.answered=true;
    const val=this._opts[idx];
    const ok=val.word===this._correct;
    const btn=document.getElementById('opb-'+idx);
    if(btn) btn.classList.add(ok?'correct-opt':'wrong-opt');
    if(!ok){
      this._opts.forEach((o,i)=>{
        if(o.word===this._correct){ const cb=document.getElementById('opb-'+i); if(cb) cb.classList.add('correct-opt'); }
      });
    }
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?'¡Correcto! Lo contrario es '+this._correct:'Lo contrario es '+this._correct);
    App.showFeedback(ok);
    document.querySelectorAll('#op-area .shadow-opt').forEach(b=>b.disabled=true);
    document.getElementById('op-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.opuestos[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('opuestos',stars,
        ()=>GameOpuestos.setLevel(this.level),
        nextLvl?()=>GameOpuestos.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
