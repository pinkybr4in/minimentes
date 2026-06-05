const GameLetras = {
  mode: 'upper',
  idx: 0,
  ctx: null, canvas: null,
  drawing: false,
  lastX: 0, lastY: 0,
  strokes: 0,

  init(container) {
    this.mode = 'upper'; this.idx = 0; this.strokes = 0;
    container.innerHTML = `
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="ll-up" onclick="GameLetras.setMode('upper')">🔠 Mayús.</button>
        <button class="lvl-btn lvl-med" id="ll-lo" onclick="GameLetras.setMode('lower')">🔡 Minús.</button>
        <button class="lvl-btn lvl-hard" id="ll-nu" onclick="GameLetras.setMode('nums')">🔢 Números</button>
      </div>
      <div class="dots-info" id="l-info">¡Traza la letra con el dedo!</div>
      <div class="letter-canvas-wrap" id="l-wrap">
        <div class="letter-hint"><div class="letter-hint-char" id="l-hint"></div></div>
        <canvas id="l-canvas"></canvas>
      </div>
      <div class="letter-nav">
        <button class="letter-nav-btn btn-prev-letter" onclick="GameLetras.prev()">◀ Anterior</button>
        <button class="letter-nav-btn btn-clear-letter" onclick="GameLetras.clearCanvas()">🗑️ Limpiar</button>
        <button class="letter-nav-btn btn-next-letter" onclick="GameLetras.next()">Siguiente ▶</button>
      </div>
      <div style="text-align:center;font-family:'Fredoka One',cursive;font-size:0.85rem;color:#aaa;padding:6px">
        Toca el botón cuando termines
      </div>
      <div class="action-row" style="padding-bottom:16px">
        <button class="btn-action btn-check" onclick="GameLetras.celebrate()">🌟 ¡Listo!</button>
      </div>`;
    this.setupCanvas();
    this.renderLetter();
  },

  setupCanvas() {
    this.canvas = document.getElementById('l-canvas');
    this.ctx = this.canvas.getContext('2d');
    const wrap = document.getElementById('l-wrap');
    const w = Math.min(wrap.clientWidth, 360);
    this.canvas.width = w; this.canvas.height = w * 0.75;

    const evts = [
      ['mousedown',  e => this.startDraw(e)],
      ['mousemove',  e => this.draw(e)],
      ['mouseup',    () => { this.drawing = false; }],
      ['touchstart', e => { e.preventDefault(); this.startDraw(e.touches[0]); }, {passive:false}],
      ['touchmove',  e => { e.preventDefault(); this.draw(e.touches[0]); }, {passive:false}],
      ['touchend',   () => { this.drawing = false; }],
    ];
    evts.forEach(([ev,fn,opts]) => this.canvas.addEventListener(ev, fn, opts||{}));
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const sx = this.canvas.width/rect.width, sy = this.canvas.height/rect.height;
    return { x:(e.clientX-rect.left)*sx, y:(e.clientY-rect.top)*sy };
  },

  startDraw(e) {
    this.drawing = true;
    const p = this.getPos(e);
    this.lastX = p.x; this.lastY = p.y;
    const ctx = this.ctx;
    ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI*2);
    ctx.fillStyle = '#6EC6F5'; ctx.fill();
  },

  draw(e) {
    if (!this.drawing) return;
    const p = this.getPos(e);
    const ctx = this.ctx;
    ctx.beginPath(); ctx.moveTo(this.lastX, this.lastY); ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 18; ctx.lineCap='round'; ctx.stroke();
    this.lastX = p.x; this.lastY = p.y;
    this.strokes++;
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.strokes = 0;
  },

  currentChar() {
    const list = DATA.letras[this.mode];
    return list[this.idx % list.length];
  },

  renderLetter() {
    this.clearCanvas();
    const ch = this.currentChar();
    document.getElementById('l-hint').textContent = ch;
    document.getElementById('l-info').textContent = `Traza la ${this.mode==='nums'?'cifra':'letra'}: ${ch}`;
    App.speak(ch);
  },

  setMode(m) {
    this.mode = m; this.idx = 0;
    ['up','lo','nu'].forEach(l => document.getElementById('ll-'+l)?.classList.remove('active'));
    document.getElementById('ll-'+({upper:'up',lower:'lo',nums:'nu'}[m]))?.classList.add('active');
    this.renderLetter();
  },

  prev() { const list = DATA.letras[this.mode]; this.idx = (this.idx-1+list.length)%list.length; this.renderLetter(); },
  next() { const list = DATA.letras[this.mode]; this.idx = (this.idx+1)%list.length; this.renderLetter(); },

  celebrate() {
    if (this.strokes < 5) { App.speak('¡Dibuja la letra primero!'); return; }
    App.confetti(); App.showFeedback(true);
    App.speak('¡Muy bien! ¡Qué bonita letra!');
    App.saveScore('letras', Math.min(this.idx+1, 5));
    setTimeout(() => this.next(), 1600);
  }
};
