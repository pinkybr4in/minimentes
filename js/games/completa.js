const GameCompleta = {
  level:'easy', idx:0, correct:0, answered:false, order:[],
  currentQ:null, pendingBlanks:[], filledBlanks:{},

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="cp-easy" onclick="GameCompleta.setLevel('easy')">🌱 Fácil</button>
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
    this.answered=false; this.filledBlanks={}; this.pendingBlanks=[];
    const items=DATA.completa[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    this.currentQ=q;
    this.pendingBlanks=[...q.blanks]; // copy of blank positions
    document.getElementById('cp-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('cp-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;
    this.renderQuestion();
  },

  renderQuestion() {
    const q=this.currentQ;
    const letters=q.word.split('');
    const currentBlankPos=this.pendingBlanks[0];
    // The correct letter for the CURRENT blank
    const correctLetter=q.word[currentBlankPos].toUpperCase();

    // Word display
    const displayHTML=letters.map((ch,i)=>{
      if(this.filledBlanks[i]!==undefined)
        return `<span class="word-letter" style="color:#45a352">${this.filledBlanks[i]}</span>`;
      if(i===currentBlankPos)
        return `<span class="word-blank active-blank" id="blank-${i}" style="border-bottom:3px solid #6EC6F5;color:#6EC6F5;min-width:28px;text-align:center">_</span>`;
      if(this.pendingBlanks.includes(i))
        return `<span class="word-blank" style="opacity:0.35;border-bottom:3px solid #ccc;min-width:28px;text-align:center">_</span>`;
      return `<span class="word-letter">${ch}</span>`;
    }).join('');

    // Options: use q.options directly — they are pre-validated to include the correct letter
    // Shuffle them so position varies each render
    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];

    const optsHTML=opts.map((opt,i)=>`
      <button class="count-btn"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.4rem;min-width:62px;height:64px;padding:0 14px"
        onclick="GameCompleta.pickLetter('${opt}','${correctLetter}',${currentBlankPos})">
        ${opt}
      </button>`).join('');

    const blankNum=q.blanks.indexOf(currentBlankPos)+1;
    const totalBlanks=q.blanks.length;
    const hint=totalBlanks>1?` — hueco ${blankNum} de ${totalBlanks}`:'';

    document.getElementById('cp-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:4rem;margin-bottom:8px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:14px">
          ¿Qué letra falta?${hint}
        </div>
        <div class="word-display" style="margin-bottom:20px;font-size:2rem;gap:8px">${displayHTML}</div>
      </div>
      <div class="count-options" style="justify-content:center;padding:10px 14px;gap:12px;flex-wrap:wrap">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="cp-next" onclick="GameCompleta.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word);
  },

  pickLetter(chosen, correct, blankPos) {
    if(this.answered) return;
    // Disable all buttons immediately to prevent double-tap
    document.querySelectorAll('#cp-area .count-btn').forEach(b=>{b.disabled=true; b.style.cursor='default';});

    const ok=chosen.toUpperCase()===correct.toUpperCase();

    if(ok){
      this.filledBlanks[blankPos]=chosen;
      this.pendingBlanks.shift();
      if(this.pendingBlanks.length===0){
        // All blanks done!
        this.answered=true;
        this.correct++;
        App.confetti();
        App.speak('¡Correcto! '+this.currentQ.word);
        App.showFeedback(true);
        setTimeout(()=>{document.getElementById('cp-next').style.display='';},900);
      } else {
        // More blanks — brief pause then next
        App.speak('¡Bien!');
        setTimeout(()=>this.renderQuestion(), 650);
      }
    } else {
      this.answered=true;
      // Show correct letter in the blank
      const slot=document.getElementById('blank-'+blankPos);
      if(slot){slot.textContent=correct; slot.style.color='#c94e4e'; slot.style.borderBottomColor='#c94e4e';}
      App.speak('La letra es '+correct);
      App.showFeedback(false);
      setTimeout(()=>{document.getElementById('cp-next').style.display='';},900);
    }
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
