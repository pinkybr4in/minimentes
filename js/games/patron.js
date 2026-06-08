const GamePatron = {
  level:'easy', idx:0, correct:0, order:[], answered:false,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="pt-easy" onclick="GamePatron.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="pt-med"  onclick="GamePatron.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="pt-hard" onclick="GamePatron.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="pt-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="pt-plabel"></div>
      </div>
      <div id="pt-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('pt-'+l)?.classList.remove('active'));
    document.getElementById('pt-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.patron[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.answered=false;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const items=DATA.patron[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('pt-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('pt-plabel').textContent=`Patrón ${this.idx+1} de ${total}`;

    const seqHTML=q.sequence.map((item,i)=>
      item==='?'
        ? `<div class="patron-slot" id="pt-blank">?</div>`
        : `<div class="patron-item">${item}</div>`
    ).join('');

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF'];
    const optsHTML=opts.map((o,i)=>`
      <button class="count-btn" id="ptb-${encodeURIComponent(o)}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.8rem;width:68px;height:68px"
        onclick="GamePatron.answer('${o.replace(/'/g,"\\'")}','${q.answer.replace(/'/g,"\\'")}')">
        ${o}
      </button>`).join('');

    document.getElementById('pt-area').innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:16px;box-shadow:0 4px 16px rgba(0,0,0,0.08)">
        <div style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#aaa;text-align:center;margin-bottom:10px">
          ¿Qué sigue en el patrón?
        </div>
        <div class="patron-sequence">${seqHTML}</div>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#aaa;text-align:center;padding:12px 0 8px">
        Elige la respuesta correcta 👇
      </div>
      <div class="count-options" style="justify-content:center;padding:0 14px;gap:12px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="pt-next" onclick="GamePatron.next()" style="display:none">Siguiente ➡️</button>
      </div>`;
  },

  answer(val, correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const blank=document.getElementById('pt-blank');
    if(blank){ blank.textContent=ok?val:correct; blank.style.background=ok?'#f0fff4':'#fff0f0'; blank.style.borderColor=ok?'#6BCB77':'#FF6B6B'; }
    const btn=document.getElementById('ptb-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){ const cb=document.getElementById('ptb-'+encodeURIComponent(correct)); if(cb) cb.classList.add('correct-btn'); }
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?'¡Correcto!':'La respuesta es '+correct);
    App.showFeedback(ok);
    document.querySelectorAll('#pt-area .count-btn').forEach(b=>b.disabled=true);
    document.getElementById('pt-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.patron[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('patron',stars,
        ()=>GamePatron.setLevel(this.level),
        nextLvl?()=>GamePatron.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
