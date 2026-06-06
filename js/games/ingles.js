const GameIngles = {
  category: 'transport',
  idx: 0,
  correct: 0,
  answered: false,
  order: [],

  init(container) {
    this.category = 'transport'; this.idx = 0; this.correct = 0; this.answered = false;
    this.order = [];
    container.innerHTML = `
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="il-tr" onclick="GameIngles.setCategory('transport')">🚗 Transportes</button>
        <button class="lvl-btn lvl-med" id="il-pr" onclick="GameIngles.setCategory('professions')">👩‍⚕️ Profesiones</button>
        <button class="lvl-btn lvl-hard" id="il-an" onclick="GameIngles.setCategory('animals')">🐘 Animales</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="en-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="en-plabel"></div>
      </div>
      <div id="en-area" style="padding-bottom:30px"></div>`;
    this.startCategory();
  },

  setCategory(cat) {
    this.category = cat; this.idx = 0; this.correct = 0; this.answered = false;
    ['tr','pr','an'].forEach(l => document.getElementById('il-'+l)?.classList.remove('active'));
    document.getElementById('il-'+({transport:'tr',professions:'pr',animals:'an'}[cat]))?.classList.add('active');
    this.startCategory();
  },

  startCategory() {
    const items = DATA.ingles[this.category];
    this.order = App.shuffle([...Array(items.length).keys()]);
    this.idx = 0; this.correct = 0;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered = false;
    const items = DATA.ingles[this.category];
    const total = items.length;
    const q = items[this.order[this.idx % total]];
    const pct = (this.idx/total)*100;
    document.getElementById('en-pbar').style.width = pct+'%';
    document.getElementById('en-plabel').textContent = `Pregunta ${this.idx+1} de ${total}`;

    // 3 options: correct + 2 random wrong
    const wrongPool = items.filter(i => i.word !== q.word);
    const wrongs = App.shuffle(wrongPool).slice(0,2);
    const options = App.shuffle([q, ...wrongs]);

    const optColors = ['#FF6B6B','#C77DFF','#FF9F43','#6BCB77','#6EC6F5'];
    const optsHTML = options.map((o, i) =>
      `<button class="english-btn" style="background:${optColors[i%optColors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2)"
        id="enb-${encodeURIComponent(o.word)}" onclick="GameIngles.answer('${o.word}','${q.word}','${q.english}')">
        <span class="english-btn-icon">${o.emoji}</span> ${o.word}
      </button>`
    ).join('');

    document.getElementById('en-area').innerHTML = `
      <div class="english-scene">
        <div class="english-category">${this.categoryLabel()}</div>
        <div class="english-image">${q.emoji}</div>
        <button class="english-sound-btn" onclick="GameIngles.speak('${q.english}')" title="Escuchar">🔊</button>
      </div>
      <div class="english-question">¿Cómo se dice en inglés? 🇬🇧</div>
      <div class="english-options">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="en-next" onclick="GameIngles.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    // Auto-speak the word in English after a short pause
    setTimeout(() => this.speak(q.english), 600);
  },

  categoryLabel() {
    return {transport:'🚗 Transportes', professions:'👩‍⚕️ Profesiones', animals:'🐘 Animales'}[this.category];
  },

  speak(word) {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-GB'; u.rate = 0.8; u.pitch = 1.1;
      speechSynthesis.speak(u);
    }
  },

  answer(val, correct, englishWord) {
    if (this.answered) return;
    this.answered = true;
    const ok = val === correct;
    const btn = document.getElementById('enb-'+encodeURIComponent(val));
    if (btn) btn.classList.add(ok ? 'correct-en' : 'wrong-en');
    if (!ok) {
      const cb = document.getElementById('enb-'+encodeURIComponent(correct));
      if (cb) cb.classList.add('correct-en');
    }
    if (ok) { this.correct++; App.confetti(); }
    // Speak the correct English word
    setTimeout(() => this.speak(englishWord), 400);
    App.showFeedback(ok);
    document.querySelectorAll('.english-btn').forEach(b => b.disabled = true);
    document.getElementById('en-next').style.display = '';
  },

  next() {
    this.idx++;
    const total = DATA.ingles[this.category].length;
    if (this.idx >= total) {
      const stars = Math.round((this.correct/total)*5);
      const cats = ['transport','professions','animals'];
      const nextCat = cats[cats.indexOf(this.category)+1];
      App.levelComplete('ingles', stars,
        () => GameIngles.setCategory(this.category),
        nextCat ? () => GameIngles.setCategory(nextCat) : null,
        !!nextCat
      );
    } else { this.loadQuestion(); }
  }
};
