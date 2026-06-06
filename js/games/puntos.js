const GamePuntos = {
  level: 'easy',
  puzzleIdx: 0,
  nextPoint: 1,
  ctx: null, canvas: null,
  complete: false,

  init(container) {
    this.level = 'easy'; this.puzzleIdx = 0; this.nextPoint = 1; this.complete = false;
    container.innerHTML = `
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="pl-easy" onclick="GamePuntos.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med" id="pl-med" onclick="GamePuntos.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="pl-hard" onclick="GamePuntos.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="p-info">¡Toca el número 1 para empezar!</div>
      <div class="dots-canvas-wrap" id="p-wrap"><canvas id="p-canvas"></canvas></div>
      <div class="action-row" style="padding-bottom:10px">
        <button class="btn-action btn-clear2" onclick="GamePuntos.restart()">🔄 Reiniciar</button>
        <button class="btn-action btn-next" id="p-next" onclick="GamePuntos.nextPuzzle()" style="display:none">Siguiente ➡️</button>
      </div>`;
    this.setupCanvas();
    this.loadPuzzle();
  },

  setupCanvas() {
    this.canvas = document.getElementById('p-canvas');
    this.ctx = this.canvas.getContext('2d');
    const wrap = document.getElementById('p-wrap');
    const w = Math.min(wrap.clientWidth, 360);
    this.canvas.width = w; this.canvas.height = w;
    this.canvas.addEventListener('click', e => this.handleTap(e));
    this.canvas.addEventListener('touchstart', e => { e.preventDefault(); this.handleTap(e.touches[0]); }, {passive:false});
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = this.canvas.width / rect.width;
    return { x:(e.clientX-rect.left)*scale, y:(e.clientY-rect.top)*scale };
  },

  currentPuzzle() {
    const lvl = DATA.puntos[this.level];
    return lvl[this.puzzleIdx % lvl.length];
  },

  scalePoint(pt) {
    const s = this.canvas.width / 300;
    return { x: pt.x*s, y: pt.y*s, n: pt.n };
  },

  loadPuzzle() {
    this.nextPoint = 1; this.complete = false;
    document.getElementById('p-next').style.display = 'none';
    const p = this.currentPuzzle();
    document.getElementById('p-info').textContent = `${p.name} · ¡Busca el número 1!`;
    this.render();
  },

  render() {
    const ctx = this.ctx; const canvas = this.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const puzzle = this.currentPuzzle();
    const pts = puzzle.points.map(p => this.scalePoint(p));

    // Completed lines
    if (this.nextPoint > 1) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < Math.min(this.nextPoint-1, pts.length); i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 4;
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke();
    }

    // All dots — NO red highlight for next, all look the same (white with number)
    pts.forEach((pt, i) => {
      const done = i+1 < this.nextPoint;
      // Done = green filled. Not done = white with grey border, no distinction for "next"
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 14, 0, Math.PI*2);
      ctx.fillStyle = done ? '#6BCB77' : 'white';
      ctx.fill();
      ctx.strokeStyle = done ? '#45a352' : '#aaa';
      ctx.lineWidth = 2.5; ctx.stroke();

      ctx.fillStyle = done ? 'white' : '#555';
      ctx.font = `bold ${done?11:12}px Nunito`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(pt.n, pt.x, pt.y);
    });

    if (this.complete && pts.length > 2) {
      ctx.beginPath();
      pts.forEach((p,i) => i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
      ctx.closePath();
      ctx.fillStyle = 'rgba(110,198,245,0.18)'; ctx.fill();
    }
  },

  handleTap(e) {
    if (this.complete) return;
    const pos = this.getPos(e);
    const puzzle = this.currentPuzzle();
    const pts = puzzle.points.map(p => this.scalePoint(p));
    const target = pts.find(p => p.n === this.nextPoint);
    if (!target) return;
    const dist = Math.hypot(pos.x - target.x, pos.y - target.y);
    const info = document.getElementById('p-info');
    if (dist < 34) {
      this.nextPoint++;
      if (this.nextPoint > pts.length) {
        this.complete = true;
        info.textContent = `🎉 ¡${puzzle.name} completado!`;
        App.confetti(); App.speak('¡Lo has conseguido!');
        App.saveScore('puntos', Math.min(this.puzzleIdx+1, 5));
        document.getElementById('p-next').style.display = '';
      } else {
        info.textContent = `¡Bien! Ahora busca el número ${this.nextPoint}`;
      }
      this.render();
    } else {
      // Tapped wrong spot — give hint about which number to find but NOT where
      info.textContent = `¡Sigue buscando el número ${this.nextPoint}! 🔍`;
    }
  },

  restart() { this.loadPuzzle(); },

  nextPuzzle() {
    this.puzzleIdx++;
    const lvl = DATA.puntos[this.level];
    if (this.puzzleIdx >= lvl.length) {
      const levels = ['easy','medium','hard'];
      const nextLvl = levels[levels.indexOf(this.level)+1];
      App.levelComplete('puntos', 5,
        () => GamePuntos.setLevel(this.level),
        nextLvl ? () => GamePuntos.setLevel(nextLvl) : null,
        !!nextLvl
      );
    } else { this.loadPuzzle(); }
  },

  setLevel(lvl) {
    this.level = lvl; this.puzzleIdx = 0;
    ['easy','med','hard'].forEach(l => document.getElementById('pl-'+l)?.classList.remove('active'));
    document.getElementById('pl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadPuzzle();
  }
};
