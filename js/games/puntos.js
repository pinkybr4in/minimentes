const GamePuntos = {
  level:'easy', puzzleIdx:0, nextPoint:1,
  canvas:null, ctx:null, complete:false,
  // Track pointer state
  isDown:false, curX:0, curY:0,

  init(container) {
    this.level='easy'; this.puzzleIdx=0; this.nextPoint=1; this.complete=false; this.isDown=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="pl-easy" onclick="GamePuntos.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="pl-med"  onclick="GamePuntos.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="pl-hard" onclick="GamePuntos.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="p-info" style="padding:6px 14px;text-align:center;font-family:'Fredoka One',cursive;font-size:0.95rem;color:#888">
        Toca el punto 1 y desliza hasta el 2, 3...
      </div>
      <div class="dots-canvas-wrap" id="p-wrap" style="display:flex;justify-content:center;padding:4px 14px">
        <canvas id="p-canvas" style="border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.1);display:block;touch-action:none"></canvas>
      </div>
      <div class="action-row" style="padding:10px 14px 30px">
        <button class="btn-action btn-clear2" onclick="GamePuntos.restart()">🔄 Reiniciar</button>
        <button class="btn-action btn-next" id="p-next" onclick="GamePuntos.nextPuzzle()" style="display:none">Siguiente ➡️</button>
      </div>`;
    // Wait for layout before measuring
    requestAnimationFrame(() => { this.setupCanvas(); this.loadPuzzle(); });
  },

  setupCanvas() {
    this.canvas = document.getElementById('p-canvas');
    this.ctx = this.canvas.getContext('2d');
    const wrap = document.getElementById('p-wrap');
    const w = Math.min(wrap.clientWidth - 28, 360);
    this.canvas.width  = Math.max(w, 280);
    this.canvas.height = Math.max(w, 280);

    // Single unified handler — works for both mouse and touch
    const xy = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const s = this.canvas.width / rect.width;
      const src = e.touches ? e.touches[0] : e.changedTouches ? e.changedTouches[0] : e;
      return { x: (src.clientX - rect.left) * s, y: (src.clientY - rect.top) * s };
    };

    const down = (e) => {
      e.preventDefault();
      if (this.complete) return;
      const p = xy(e);
      const pts = this.spts();
      const target = pts.find(pt => pt.n === this.nextPoint);
      if (target && dist(p, target) < 38) {
        this.isDown = true;
        this.curX = p.x; this.curY = p.y;
      }
    };
    const move = (e) => {
      e.preventDefault();
      if (!this.isDown || this.complete) return;
      const p = xy(e);
      this.curX = p.x; this.curY = p.y;
      // Check if we've reached the target
      const pts = this.spts();
      const target = pts.find(pt => pt.n === this.nextPoint);
      if (target && dist(p, target) < 38) {
        this.arrive();
      }
      this.render(p); // pass current finger pos for preview line
    };
    const up = (e) => {
      e.preventDefault();
      this.isDown = false;
      this.render();
    };

    this.canvas.addEventListener('touchstart', down, { passive: false });
    this.canvas.addEventListener('touchmove',  move, { passive: false });
    this.canvas.addEventListener('touchend',   up,   { passive: false });
    this.canvas.addEventListener('mousedown',  down);
    this.canvas.addEventListener('mousemove',  move);
    this.canvas.addEventListener('mouseup',    up);
    this.canvas.addEventListener('mouseleave', up);
  },

  spts() { // scaled points, sorted by n
    const s = this.canvas.width / 300;
    return [...this.currentPuzzle().points]
      .sort((a, b) => a.n - b.n)
      .map(p => ({ x: p.x * s, y: p.y * s, n: p.n }));
  },

  arrive() {
    this.isDown = false; // reset so user must re-touch next point
    const pts = this.spts();
    this.nextPoint++;
    const info = document.getElementById('p-info');
    if (this.nextPoint > pts.length) {
      this.complete = true;
      info.textContent = `🎉 ¡${this.currentPuzzle().name} completado!`;
      App.confetti(); App.speak('¡Lo has conseguido!');
      App.saveScore('puntos', Math.min(this.puzzleIdx + 1, 5));
      document.getElementById('p-next').style.display = '';
      this.render();
    } else {
      info.textContent = `¡Bien! Ahora toca el número ${this.nextPoint} 🔍`;
      this.render();
    }
  },

  currentPuzzle() {
    const lvl = DATA.puntos[this.level];
    return lvl[this.puzzleIdx % lvl.length];
  },

  loadPuzzle() {
    this.nextPoint = 1; this.complete = false; this.isDown = false;
    document.getElementById('p-next').style.display = 'none';
    document.getElementById('p-info').textContent = `${this.currentPuzzle().name} · Toca el 1 y desliza`;
    this.render();
  },

  render(fingerPos) {
    const ctx = this.ctx, C = this.canvas;
    ctx.clearRect(0, 0, C.width, C.height);
    ctx.fillStyle = 'white'; ctx.fillRect(0, 0, C.width, C.height);
    const pts = this.spts();

    // Completed path
    if (this.nextPoint > 1) {
      const drawn = pts.filter(p => p.n < this.nextPoint);
      ctx.beginPath(); ctx.moveTo(drawn[0].x, drawn[0].y);
      drawn.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    }

    // Preview line while dragging
    if (fingerPos && this.isDown && this.nextPoint <= pts.length) {
      const prev = pts.find(p => p.n === this.nextPoint - 1) || pts[0];
      if (prev) {
        ctx.save();
        ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(fingerPos.x, fingerPos.y);
        ctx.strokeStyle = 'rgba(110,198,245,0.45)'; ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      }
    }

    // Completed shape fill
    if (this.complete) {
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.closePath(); ctx.fillStyle = 'rgba(110,198,245,0.15)'; ctx.fill();
      ctx.strokeStyle = '#6EC6F5'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.stroke();
    }

    // Dots
    pts.forEach(pt => {
      const done = pt.n < this.nextPoint;
      const isCurrent = pt.n === this.nextPoint;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = done ? '#6BCB77' : isCurrent ? '#FFD93D' : 'white';
      ctx.fill();
      ctx.strokeStyle = done ? '#45a352' : isCurrent ? '#c9a820' : '#bbb';
      ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = done ? 'white' : '#444';
      ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(pt.n, pt.x, pt.y);
    });
  },

  restart() { this.loadPuzzle(); },

  nextPuzzle() {
    this.puzzleIdx++;
    const lvl = DATA.puntos[this.level];
    if (this.puzzleIdx >= lvl.length) {
      const levels = ['easy','medium','hard'];
      const nextLvl = levels[levels.indexOf(this.level) + 1];
      App.levelComplete('puntos', 5,
        () => GamePuntos.setLevel(this.level),
        nextLvl ? () => GamePuntos.setLevel(nextLvl) : null, !!nextLvl);
    } else { this.loadPuzzle(); }
  },

  setLevel(lvl) {
    this.level = lvl; this.puzzleIdx = 0;
    ['easy','med','hard'].forEach(l => document.getElementById('pl-'+l)?.classList.remove('active'));
    document.getElementById('pl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    requestAnimationFrame(() => { this.setupCanvas(); this.loadPuzzle(); });
  }
};

function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
