const GameCompleta = {
  level:'easy', idx:0, correct:0, answered:false, order:[],
  pendingBlanks:[], // blanks still to fill
  filledBlanks:{},  // pos -> letter

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
    this.answered=false; this.filledBlanks={}; this.pendingBlanks=[];
    const items=DATA.completa[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('cp-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('cp-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    // KEY FIX: each blank position is INDEPENDENT.
    // blanks = array of positions. Each position needs ONE specific letter.
    // We show ONE question at a time: fill blank[0], then blank[1], etc.
    this.currentQ = q;
    this.pendingBlanks = [...q.blanks]; // copy
    this.filledBlanks = {};

    this.renderQuestion();
  },

  renderQuestion() {
    const q = this.currentQ;
    const letters = q.word.split('');

    // Build word display
    const displayHTML = letters.map((ch, i) => {
      if (this.filledBlanks[i] !== undefined) {
        // Already filled
        return `<span class="word-letter" style="color:#45a352">${this.filledBlanks[i]}</span>`;
      } else if (this.pendingBlanks[0] === i) {
        // Current blank to fill — highlighted
        return `<span class="word-blank active-blank" id="blank-${i}">_</span>`;
      } else if (this.pendingBlanks.includes(i)) {
        // Future blank — greyed out
        return `<span class="word-blank" style="opacity:0.4" id="blank-${i}">_</span>`;
      } else {
        return `<span class="word-letter">${ch}</span>`;
      }
    }).join('');

    // Current blank to fill
    const currentBlankPos = this.pendingBlanks[0];
    const correctLetter = q.word[currentBlankPos].toUpperCase();

    // Build options — include correct + distractors, always distinct
    // The options pool from q.options but we ensure correct is in there
    let optPool = [...q.options].map(o => o.toUpperCase());
    if (!optPool.includes(correctLetter)) optPool[0] = correctLetter;
    // Remove duplicates, shuffle
    optPool = [...new Set(optPool)];
    while (optPool.length < 3) optPool.push(['A','E','I','O','U'].find(v=>!optPool.includes(v))||'X');
    const opts = App.shuffle(optPool.slice(0,4));

    const colors = ['#FF6B6B','#6EC6F5','#6BCB77','#FFD93D','#C77DFF','#FF9F43'];
    const optsHTML = opts.map((opt, i) => {
      const safeId = `cpb_${i}_${opt.replace(/[^a-zA-Z0-9]/g,'_')}`;
      return `<button class="count-btn" id="${safeId}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.4rem;min-width:60px;height:64px;padding:0 14px"
        onclick="GameCompleta.pickLetter('${opt}','${correctLetter}',${currentBlankPos})">
        ${opt}
      </button>`;
    }).join('');

    const blankNum = q.blanks.indexOf(currentBlankPos) + 1;
    const totalBlanks = q.blanks.length;
    const hint = totalBlanks > 1 ? ` (hueco ${blankNum} de ${totalBlanks})` : '';

    document.getElementById('cp-area').innerHTML = `
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:4rem;margin-bottom:8px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:12px">
          ¿Qué letra falta?${hint}
        </div>
        <div class="word-display" style="margin-bottom:20px">${displayHTML}</div>
      </div>
      <div class="count-options" style="justify-content:center;padding:10px 14px;gap:12px">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="cp-next" onclick="GameCompleta.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word);
  },

  pickLetter(chosen, correct, blankPos) {
    if (this.answered) return;
    const ok = chosen.toUpperCase() === correct.toUpperCase();

    // Disable all option buttons immediately
    document.querySelectorAll('#cp-area .count-btn').forEach(b => b.disabled = true);

    if (ok) {
      // Fill this blank and move to next
      this.filledBlanks[blankPos] = chosen;
      this.pendingBlanks.shift(); // remove first pending

      if (this.pendingBlanks.length === 0) {
        // All blanks filled correctly!
        this.correct++;
        this.answered = true;
        App.confetti();
        App.speak('¡Correcto! ' + this.currentQ.word);
        App.showFeedback(true);
        setTimeout(() => {
          document.getElementById('cp-next').style.display = '';
        }, 800);
      } else {
        // More blanks to fill — show next blank after brief pause
        App.speak('¡Bien! Siguiente hueco');
        setTimeout(() => this.renderQuestion(), 700);
      }
    } else {
      // Wrong — show correct answer, mark as failed
      this.answered = true;
      const slot = document.getElementById('blank-' + blankPos);
      if (slot) { slot.textContent = correct; slot.style.color = '#c94e4e'; slot.style.borderBottomColor = '#c94e4e'; }
      App.speak('La letra es ' + correct);
      App.showFeedback(false);
      setTimeout(() => {
        document.getElementById('cp-next').style.display = '';
      }, 800);
    }
  },

  next() {
    this.idx++;
    const total = DATA.completa[this.level].length;
    if (this.idx >= total) {
      const stars = Math.round((this.correct / total) * 5);
      const levels = ['easy','medium','hard'];
      const nextLvl = levels[levels.indexOf(this.level) + 1];
      App.levelComplete('completa', stars,
        () => GameCompleta.setLevel(this.level),
        nextLvl ? () => GameCompleta.setLevel(nextLvl) : null, !!nextLvl);
    } else { this.loadQuestion(); }
  }
};
