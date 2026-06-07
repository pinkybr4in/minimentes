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

    // Build word display: shown letters + blank slots
    const letters=q.word.split('');
    const displayHTML=letters.map((ch,i)=>{
      if(q.blanks.includes(i)){
        return `<span class="word-blank" id="blank-${i}" data-pos="${i}">_</span>`;
      }
      return `<span class="word-letter">${ch}</span>`;
    }).join('');

    // Options — always strings, safe to iterate
    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];

    const optsHTML=opts.map((opt,i)=>{
      const safeOpt=String(opt);
      const safeId='cpb_'+safeOpt.replace(/[^a-zA-Z0-9]/g,'_')+'_'+i;
      return `<button class="count-btn"
        id="${safeId}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.3rem;min-width:60px;height:60px;padding:0 10px"
        onclick="GameCompleta.answer(this,'${safeOpt.replace(/'/g,"\\'")}')">
        ${safeOpt}
      </button>`;
    }).join('');

    document.getElementById('cp-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:4rem;margin-bottom:8px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:12px">
          ¿Qué letra falta? Toca la respuesta
        </div>
        <div class="word-display" style="margin-bottom:16px">${displayHTML}</div>
      </div>
      <div class="count-options" style="justify-content:center;padding:10px 14px;gap:12px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="cp-next" onclick="GameCompleta.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word);
  },

  answer(btnEl, val) {
    if(this.answered) return;
    this.answered=true;

    const items=DATA.completa[this.level];
    const q=items[this.order[this.idx%items.length]];

    // Check if val matches any of the accepted answers
    const ok=q.answers.map(a=>String(a).toUpperCase()).includes(String(val).toUpperCase());

    if(ok){
      // Fill all blanks with the chosen letter
      document.querySelectorAll('.word-blank').forEach(b=>{
        b.textContent=val;
        b.style.color='#45a352';
        b.style.borderBottomColor='#45a352';
      });
      this.correct++;
      App.confetti();
      App.speak('¡Correcto! '+q.word);
    } else {
      btnEl.classList.add('wrong-btn');
      // Reveal correct answer in blanks
      q.blanks.forEach(pos=>{
        const bl=document.getElementById('blank-'+pos);
        if(bl){ bl.textContent=q.word[pos]; bl.style.color='#c94e4e'; bl.style.borderBottomColor='#c94e4e'; }
      });
      App.speak('La respuesta es '+q.word);
    }

    btnEl.classList.add(ok?'correct-btn':'wrong-btn');
    // Disable all buttons
    document.querySelectorAll('#cp-area .count-btn').forEach(b=>{ b.disabled=true; b.style.cursor='default'; });
    App.showFeedback(ok);
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
