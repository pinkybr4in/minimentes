const GameContar = {
  level: 'easy',
  idx: 0,
  correct: 0,
  answered: false,

  init(container) {
    this.level = 'easy'; this.idx = 0; this.correct = 0; this.answered = false;
    container.innerHTML = `
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="cl-easy" onclick="GameContar.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med" id="cl-med" onclick="GameContar.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="cl-hard" onclick="GameContar.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="co-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="co-plabel"></div>
      </div>
      <div class="game-wrap" style="padding-bottom:30px" id="co-area"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered = false;
    const questions = DATA.contar[this.level];
    const total = questions.length;
    const q = questions[this.idx % total];
    const pct = (this.idx/total)*100;
    document.getElementById('co-pbar').style.width = pct+'%';
    document.getElementById('co-plabel').textContent = `Pregunta ${this.idx+1} de ${total}`;

    const emojis = Array(q.count).fill(q.emoji);
    const emojiHTML = emojis.map((e,i) =>
      `<span class="count-emoji" style="animation-delay:${i*0.06}s">${e}</span>`
    ).join('');

    const optColors = ['#FF6B6B','#6EC6F5','#6BCB77'];
    const opts = App.shuffle([...q.options]);
    const optsHTML = opts.map((o,i) =>
      `<button class="count-btn" style="background:${optColors[i]};box-shadow:0 4px 0 rgba(0,0,0,0.2)"
        id="cob-${o}" onclick="GameContar.answer(${o},${q.count})">${o}</button>`
    ).join('');

    document.getElementById('co-area').innerHTML = `
      <div class="count-scene" id="co-scene">${emojiHTML}</div>
      <div class="count-question">¿Cuántos ${q.emoji} hay?</div>
      <div class="count-options">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="co-next" onclick="GameContar.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    // Animate emojis in
    setTimeout(() => {
      document.querySelectorAll('.count-emoji').forEach((el,i) => {
        setTimeout(() => el.classList.add('pop'), i*60);
      });
    }, 50);

    App.speak(`¿Cuántos ${q.emoji.replace(/\uFE0F/g,'')} hay?`);
  },

  answer(val, correct) {
    if (this.answered) return;
    this.answered = true;
    const ok = val === correct;
    const btn = document.getElementById('cob-'+val);
    if (btn) btn.classList.add(ok ? 'correct-btn' : 'wrong-btn');
    if (ok) {
      this.correct++;
      App.confetti(); App.speak('¡Muy bien! Son ' + correct);
    } else {
      const correctBtn = document.getElementById('cob-'+correct);
      if (correctBtn) correctBtn.classList.add('correct-btn');
      App.speak('Son ' + correct);
    }
    App.showFeedback(ok);
    document.querySelectorAll('.count-btn').forEach(b => b.disabled = true);
    document.getElementById('co-next').style.display = '';
  },

  next() {
    this.idx++;
    const total = DATA.contar[this.level].length;
    if (this.idx >= total) {
      const stars = Math.round((this.correct/total)*5);
      const levels = ['easy','medium','hard'];
      const nextLvl = levels[levels.indexOf(this.level)+1];
      App.levelComplete('contar', stars,
        () => GameContar.setLevel(this.level),
        nextLvl ? () => GameContar.setLevel(nextLvl) : null,
        !!nextLvl
      );
    } else {
      this.loadQuestion();
    }
  },

  setLevel(lvl) {
    this.level = lvl; this.idx = 0; this.correct = 0;
    ['easy','med','hard'].forEach(l => document.getElementById('cl-'+l)?.classList.remove('active'));
    document.getElementById('cl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadQuestion();
  }
};
