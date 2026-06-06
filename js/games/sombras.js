const GameSombras = {
  idx: 0,
  correct: 0,
  answered: false,
  order: [],

  init(container) {
    this.idx = 0; this.correct = 0; this.answered = false;
    this.order = App.shuffle([...Array(DATA.sombras.length).keys()]);
    container.innerHTML = `
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="sh-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="sh-plabel"></div>
      </div>
      <div class="game-wrap" style="padding-bottom:30px" id="sh-area"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered = false;
    const total = DATA.sombras.length;
    const q = DATA.sombras[this.order[this.idx % total]];
    const pct = (this.idx/total)*100;
    document.getElementById('sh-pbar').style.width = pct+'%';
    document.getElementById('sh-plabel').textContent = `Pregunta ${this.idx+1} de ${total}`;

    const opts = App.shuffle([...q.options]);
    const optsHTML = opts.map(o =>
      `<button class="shadow-opt" id="sho-${encodeURIComponent(o)}" onclick="GameSombras.answer('${o}','${q.answer}','${q.label}')">${o}</button>`
    ).join('');

    // BUGFIX: silhouette uses CSS filter:grayscale+brightness(0) to show as black shadow
    // Options shown normally (colorful emojis to choose from)
    document.getElementById('sh-area').innerHTML = `
      <div class="shadow-wrap">
        <div class="shadow-question">¿Qué animal es esta sombra? 🌑</div>
        <div class="shadow-silhouette-box">
          <span class="shadow-emoji" id="sh-sil">${q.answer}</span>
        </div>
        <div style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#aaa;text-align:center;margin-bottom:10px">
          Elige la respuesta correcta 👇
        </div>
        <div class="shadow-options">${optsHTML}</div>
      </div>
      <div class="action-row">
        <button class="btn-action btn-next" id="sh-next" onclick="GameSombras.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak('¿Qué animal es esta sombra?');
  },

  answer(val, correct, label) {
    if (this.answered) return;
    this.answered = true;
    const ok = val === correct;
    // Reveal the silhouette in color
    const sil = document.getElementById('sh-sil');
    if (sil) sil.classList.add('revealed');

    const btn = document.getElementById('sho-'+encodeURIComponent(val));
    if (btn) btn.classList.add(ok ? 'correct-opt' : 'wrong-opt');
    if (!ok) {
      const cb = document.getElementById('sho-'+encodeURIComponent(correct));
      if (cb) cb.classList.add('correct-opt');
    }
    if (ok) { this.correct++; App.confetti(); }
    App.speak(ok ? '¡Correcto! Es un ' + label : 'Es un ' + label);
    App.showFeedback(ok);
    document.querySelectorAll('.shadow-opt').forEach(b => b.disabled = true);
    document.getElementById('sh-next').style.display = '';
  },

  next() {
    this.idx++;
    const total = DATA.sombras.length;
    if (this.idx >= total) {
      const stars = Math.round((this.correct/total)*5);
      App.levelComplete('sombras', stars,
        () => { this.idx=0; this.correct=0; this.order=App.shuffle([...Array(total).keys()]); this.loadQuestion(); },
        null, false
      );
    } else { this.loadQuestion(); }
  }
};
