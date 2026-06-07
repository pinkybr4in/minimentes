const GameCompleta = {
  level:'easy', idx:0, correct:0, answered:false, order:[],

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="cp-easy" onclick="GameCompleta.setLevel('easy')">🌱 Vocales</button>
        <button class="lvl-btn lvl-med"  id="cp-med"  onclick="GameCompleta.setLevel('medium')">🌻 Letras</button>
        <button class="lvl-btn lvl-hard" id="cp-hard" onclick="GameCompleta.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="cp-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="cp-plabel"></div>
      </div>
      <div id="cp-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('cp-'+l)?.classList.remove('active'));
    document.getElementById('cp-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.completa[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.answered=false;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false;
    const items=DATA.completa[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('cp-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('cp-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    // Build displayed word with blanks
    const display=q.word.split('').map((ch,i)=>
      q.blanks.includes(i)
        ? `<span class="word-blank" id="blank-${i}">_</span>`
        : `<span class="word-letter">${ch}</span>`
    ).join('');

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF'];
    const optsHTML=opts.map((o,i)=>
      `<button class="count-btn" style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.4rem;width:64px;height:64px"
        id="cpb-${encodeURIComponent(o)}" onclick="GameCompleta.answer('${o}',${JSON.stringify(q.answers)})">${o}</button>`
    ).join('');

    document.getElementById('cp-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:4rem;margin-bottom:8px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:10px">¿Qué letras faltan?</div>
        <div class="word-display">${display}</div>
      </div>
      <div class="count-options" style="justify-content:center;padding:10px 14px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="cp-next" onclick="GameCompleta.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word);
  },

  answer(val, answers) {
    if(this.answered) return;
    const ok=answers.includes(val);
    if(ok) {
      // Fill blanks
      document.querySelectorAll('.word-blank').forEach(b=>{ b.textContent=val; b.style.color='#6BCB77'; });
      this.correct++; App.confetti();
    }
    const btn=document.getElementById('cpb-'+encodeURIComponent(val));
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok) {
      // Show a correct option
      const cb=document.getElementById('cpb-'+encodeURIComponent(answers[0]));
      if(cb) cb.classList.add('correct-btn');
    }
    this.answered=true;
    App.showFeedback(ok);
    document.querySelectorAll('.count-btn').forEach(b=>b.disabled=true);
    document.getElementById('cp-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.completa[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('completa',stars,
        ()=>GameCompleta.setLevel(this.level),
        nextLvl?()=>GameCompleta.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
