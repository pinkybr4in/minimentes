// EMOCIONES - Identify emotions from faces
const GameEmociones = {
  level:'easy', idx:0, correct:0, order:[], answered:false,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="em-easy" onclick="GameEmociones.setLevel('easy')">🌱 Básicas</button>
        <button class="lvl-btn lvl-med"  id="em-med"  onclick="GameEmociones.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="em-hard" onclick="GameEmociones.setLevel('hard')">🚀 Todas</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="em-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="em-plabel"></div>
      </div>
      <div id="em-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('em-'+l)?.classList.remove('active'));
    document.getElementById('em-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.emociones[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.answered=false;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const items=DATA.emociones[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('em-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('em-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];
    const optsHTML=opts.map((o,i)=>
      `<button class="count-btn" id="emb-${i}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:0.95rem;height:auto;min-width:80px;padding:12px 16px;border-radius:16px"
        onclick="GameEmociones.answer(${i})">${o}</button>`
    ).join('');

    // Also show a scenario image to give context
    document.getElementById('em-area').innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.08);text-align:center">
        <div style="font-size:6rem;margin-bottom:8px">${q.emoji}</div>
        ${q.scenario?`<div style="font-size:2rem;margin-bottom:8px">${q.scenario}</div>`:''}
        <div style="font-family:'Fredoka One',cursive;font-size:1.1rem;color:#555">¿Cómo se siente?</div>
      </div>
      <div class="count-options" style="justify-content:center;padding:12px 14px;gap:10px;flex-wrap:wrap">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="em-next" onclick="GameEmociones.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    this._opts=opts; this._correct=q.answer;
    App.speak('¿Cómo se siente?');
  },

  _opts:[], _correct:'',

  answer(idx) {
    if(this.answered) return;
    this.answered=true;
    const val=this._opts[idx];
    const ok=val===this._correct;
    const btn=document.getElementById('emb-'+idx);
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){
      this._opts.forEach((o,i)=>{
        if(o===this._correct){ const cb=document.getElementById('emb-'+i); if(cb) cb.classList.add('correct-btn'); }
      });
    }
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?'¡Correcto! Está '+this._correct:'Está '+this._correct);
    App.showFeedback(ok);
    document.querySelectorAll('#em-area .count-btn').forEach(b=>b.disabled=true);
    document.getElementById('em-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.emociones[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('emociones',stars,
        ()=>GameEmociones.setLevel(this.level),
        nextLvl?()=>GameEmociones.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
