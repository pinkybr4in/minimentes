const GameFrases = {
  level: 'easy',
  idx: 0,
  answer: [],
  checked: false,
  correct: 0,
  total: 0,

  init(container) {
    this.level = 'easy'; this.idx = 0; this.answer = [];
    this.checked = false; this.correct = 0;
    container.innerHTML = `
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="fl-easy"  onclick="GameFrases.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="fl-med"   onclick="GameFrases.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="fl-hard"  onclick="GameFrases.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="f-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="f-plabel"></div>
      </div>
      <div class="game-wrap">
        <div class="sentence-label">👆 Pon las palabras en orden</div>
        <div class="drop-zone" id="f-drop"></div>
        <div class="bank-label">📦 Palabras disponibles</div>
        <div class="word-bank" id="f-bank"></div>
        <div class="action-row">
          <button class="btn-action btn-clear2" onclick="GameFrases.clear()">🔄 Borrar</button>
          <button class="btn-action btn-check" id="f-check" onclick="GameFrases.check()" disabled>✔️ Comprobar</button>
          <button class="btn-action btn-next" id="f-next" onclick="GameFrases.next()" style="display:none">Siguiente ➡️</button>
        </div>
      </div>`;
    this.loadSentence();
  },

  setLevel(lvl) {
    this.level = lvl; this.idx = 0; this.correct = 0;
    ['easy','med','hard'].forEach(l => document.getElementById('fl-'+l)?.classList.remove('active'));
    document.getElementById('fl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadSentence();
  },

  loadSentence() {
    this.answer = []; this.checked = false;
    const sentences = DATA.frases[this.level];
    this.total = sentences.length;
    const sent = sentences[this.idx % sentences.length];
    const shuffled = App.shuffle(sent);

    // Progress
    const pct = (this.idx / this.total) * 100;
    document.getElementById('f-pbar').style.width = pct + '%';
    document.getElementById('f-plabel').textContent = `Frase ${this.idx+1} de ${this.total}`;

    // Drop zone
    const drop = document.getElementById('f-drop');
    drop.innerHTML = '<span class="drop-placeholder">Toca las palabras de abajo...</span>';
    drop.className = 'drop-zone';

    // Bank
    const bank = document.getElementById('f-bank');
    bank.innerHTML = '';
    shuffled.forEach((word, i) => {
      const btn = document.createElement('button');
      btn.className = `word-tile wc${i % 6}`;
      btn.textContent = word;
      btn.dataset.idx = i;
      btn.dataset.word = word;
      btn.dataset.color = `wc${i % 6}`;
      btn.onclick = () => this.addWord(btn);
      bank.appendChild(btn);
    });

    document.getElementById('f-check').disabled = true;
    document.getElementById('f-check').style.display = '';
    document.getElementById('f-next').style.display = 'none';
  },

  addWord(btn) {
    if (btn.classList.contains('used') || this.checked) return;
    this.answer.push({ word: btn.dataset.word, idx: btn.dataset.idx, color: btn.dataset.color });
    btn.classList.add('used');
    this.renderDrop();
    const tiles = document.querySelectorAll('#f-bank .word-tile');
    const allUsed = [...tiles].every(t => t.classList.contains('used'));
    document.getElementById('f-check').disabled = !allUsed;
    document.getElementById('f-drop').classList.add('has-words');
  },

  removeWord(pos) {
    if (this.checked) return;
    const removed = this.answer.splice(pos, 1)[0];
    document.querySelectorAll('#f-bank .word-tile').forEach(btn => {
      if (btn.dataset.idx == removed.idx) btn.classList.remove('used');
    });
    this.renderDrop();
    document.getElementById('f-check').disabled = true;
    if (!this.answer.length) document.getElementById('f-drop').className = 'drop-zone';
  },

  renderDrop() {
    const drop = document.getElementById('f-drop');
    drop.innerHTML = '';
    if (!this.answer.length) { drop.innerHTML = '<span class="drop-placeholder">Toca las palabras de abajo...</span>'; return; }
    this.answer.forEach((item, i) => {
      const t = document.createElement('button');
      t.className = `answer-tile ${item.color}`;
      t.textContent = item.word;
      t.onclick = () => this.removeWord(i);
      drop.appendChild(t);
    });
  },

  clear() {
    if (this.checked) return;
    this.answer = [];
    document.querySelectorAll('#f-bank .word-tile').forEach(b => b.classList.remove('used'));
    const drop = document.getElementById('f-drop');
    drop.innerHTML = '<span class="drop-placeholder">Toca las palabras de abajo...</span>';
    drop.className = 'drop-zone';
    document.getElementById('f-check').disabled = true;
  },

  check() {
    this.checked = true;
    const sentences = DATA.frases[this.level];
    const correct = sentences[this.idx % sentences.length];
    const userAnswer = this.answer.map(a => a.word);
    const ok = JSON.stringify(userAnswer) === JSON.stringify(correct);
    const drop = document.getElementById('f-drop');
    drop.classList.add(ok ? 'correct' : 'wrong');
    if (ok) { this.correct++; App.confetti(); App.speak(correct.join(' ')); }
    App.showFeedback(ok);
    document.getElementById('f-check').style.display = 'none';
    document.getElementById('f-next').style.display = '';
  },

  next() {
    this.idx++;
    if (this.idx >= this.total) {
      const stars = Math.round((this.correct / this.total) * 5);
      const levels = ['easy','medium','hard'];
      const nextLvl = levels[levels.indexOf(this.level) + 1];
      App.levelComplete(
        'frases', stars,
        () => GameFrases.setLevel(this.level),
        nextLvl ? () => GameFrases.setLevel(nextLvl) : null,
        !!nextLvl
      );
    } else {
      this.loadSentence();
    }
  }
};
