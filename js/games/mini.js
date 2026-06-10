// ===== ¿DÓNDE ESTÁ MINI? =====
// Nivel de dificultad tipo "Donde esta Wally": 150-200 personajes por escena,
// objetivo pequeño y mezclado entre muchos distractores similares.

const GameMini = {
  sceneIdx: 0,
  targetIdx: 0,
  order: [],
  solved: 0,
  scale: 1,
  canvasW: 0, canvasH: 0,
  hintUsed: false,
  attempts: 0,

  init(container) {
    this.sceneIdx = 0; this.targetIdx = 0; this.solved = 0;
    this.order = App.shuffle([...Array(DATA.mini.length).keys()]);
    container.innerHTML = `
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="mi-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="mi-plabel"></div>
      </div>
      <div id="mi-area" style="padding-bottom:30px"></div>`;
    this.loadScene();
  },

  loadScene() {
    this.targetIdx = 0; this.hintUsed = false; this.attempts = 0;
    const total = DATA.mini.length;
    const scene = DATA.mini[this.order[this.sceneIdx % total]];
    document.getElementById('mi-pbar').style.width = (this.sceneIdx / total * 100) + '%';
    document.getElementById('mi-plabel').textContent = `Escena ${this.sceneIdx + 1} de ${total}`;

    const target = scene.targets[0];
    document.getElementById('mi-area').innerHTML = `
      <!-- Target strip -->
      <div style="display:flex;align-items:center;gap:10px;padding:8px 14px;background:white;border-bottom:2px solid #eee">
        <div style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#888;white-space:nowrap">Busca:</div>
        <div id="mi-target-badge" style="display:flex;align-items:center;gap:6px;background:#FFD93D;border-radius:20px;padding:5px 12px">
          <span style="font-size:1.8rem" id="mi-target-emoji">${target.emoji}</span>
          <span style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#7a5c00" id="mi-target-name">${target.name}</span>
        </div>
        <div style="font-family:'Fredoka One',cursive;font-size:0.75rem;color:#aaa" id="mi-progress-targets">
          ${scene.targets.map((t,i)=>
            `<span id="mi-t-${i}" style="opacity:${i===0?1:0.3}">${t.emoji}</span>`
          ).join(' ')}
        </div>
      </div>
      <!-- Canvas scroll container -->
      <div id="mi-scroll" style="overflow:auto;-webkit-overflow-scrolling:touch;max-height:58vh;border-bottom:2px solid #eee;position:relative">
        <canvas id="mi-canvas" style="display:block;cursor:crosshair;touch-action:pan-x pan-y"></canvas>
      </div>
      <!-- Controls -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px">
        <div id="mi-msg" style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#888;flex:1">
          Toca para encontrar a ${target.name}
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-action" style="padding:8px 14px;font-size:0.85rem;background:#fff0e0;color:#cc7a1e;box-shadow:0 3px 0 #e8b87a"
            onclick="GameMini.showHint()">💡 Pista</button>
          <button class="btn-action btn-next" id="mi-next" onclick="GameMini.nextScene()" style="display:none;padding:8px 14px;font-size:0.85rem">
            Siguiente ➡️
          </button>
        </div>
      </div>`;

    this.buildCanvas(scene);
    this.setupTap(scene);
    App.speak('Busca ' + target.name);
  },

  buildCanvas(scene) {
    const canvas = document.getElementById('mi-canvas');
    const scroll = document.getElementById('mi-scroll');
    const vw = scroll.clientWidth || 360;

    // Large canvas — 2x viewport width so you have to scroll/explore
    const CW = Math.round(vw * 2.2);
    const CH = Math.round(vw * 1.6);
    canvas.width = CW; canvas.height = CH;
    this.canvasW = CW; this.canvasH = CH;

    const ctx = canvas.getContext('2d');

    // ---- Background ----
    scene.drawBg(ctx, CW, CH);

    // ---- Build character grid: place ALL elements ----
    // We store final positions for hit-testing
    scene._placed = [];

    // 1. Place ~180 distractors randomly but densely
    const cellW = Math.round(CW / 18);
    const cellH = Math.round(CH / 14);
    const fontSize = Math.max(14, Math.round(cellW * 0.78));

    for (let row = 0; row < 14; row++) {
      for (let col = 0; col < 18; col++) {
        // Jitter position within cell
        const jx = (Math.random() - 0.5) * cellW * 0.6;
        const jy = (Math.random() - 0.5) * cellH * 0.6;
        const x = Math.round(cellW * col + cellW / 2 + jx);
        const y = Math.round(cellH * row + cellH / 2 + jy);
        if (x < 0 || x > CW || y < 0 || y > CH) continue;

        // Pick distractor
        const d = scene.distractors[Math.floor(Math.random() * scene.distractors.length)];
        const size = fontSize * (0.75 + Math.random() * 0.5);
        ctx.save();
        // Occasionally mirror or tint slightly
        if (Math.random() < 0.3) {
          ctx.translate(x, y); ctx.scale(-1, 1); ctx.translate(-x, -y);
        }
        ctx.font = `${Math.round(size)}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.85 + Math.random() * 0.15;
        ctx.fillText(d, x, y);
        ctx.restore();
        scene._placed.push({ x, y, r: size * 0.5, type: 'distractor' });
      }
    }

    // 2. Place targets at random positions (not too close to each other or edges)
    const usedPositions = [];
    scene.targets.forEach((t, ti) => {
      let tx, ty, tries = 0;
      do {
        tx = Math.round(CW * (0.08 + Math.random() * 0.84));
        ty = Math.round(CH * (0.08 + Math.random() * 0.84));
        tries++;
      } while (tries < 50 && usedPositions.some(p => Math.hypot(p.x - tx, p.y - ty) < CW * 0.15));
      usedPositions.push({ x: tx, y: ty });

      // Draw target at slightly SMALLER size (harder to spot)
      const tSize = fontSize * 0.85;
      ctx.save();
      ctx.font = `${Math.round(tSize)}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.globalAlpha = 1;
      ctx.fillText(t.emoji, tx, ty);
      ctx.restore();

      // Store for hit-testing
      t._x = tx; t._y = ty; t._r = tSize * 0.55;
      scene._placed.push({ x: tx, y: ty, r: tSize * 0.55, type: 'target', idx: ti });
    });

    // 3. Draw some "cover" elements on top (partial occlusion)
    scene.overlays.forEach(ov => {
      const x = Math.round(ov.rx * CW), y = Math.round(ov.ry * CH);
      ctx.save();
      ctx.font = `${Math.round(CW * ov.size)}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.globalAlpha = ov.alpha || 1;
      ctx.fillText(ov.emoji, x, y);
      ctx.restore();
    });
  },

  setupTap(scene) {
    const canvas = document.getElementById('mi-canvas');
    const scroll = document.getElementById('mi-scroll');

    const getXY = (e) => {
      const rect = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      // Account for scroll offset
      return {
        x: (src.clientX - rect.left),
        y: (src.clientY - rect.top)
      };
    };

    let tapTimeout = null;
    const onTap = (e) => {
      // Only fire on actual taps, not scroll gestures
      if (tapTimeout) return;
      tapTimeout = setTimeout(() => { tapTimeout = null; }, 300);

      const pos = getXY(e);
      const target = scene.targets[this.targetIdx];
      if (!target) return;

      const dx = Math.abs(pos.x - target._x);
      const dy = Math.abs(pos.y - target._y);
      const hitR = Math.max(target._r * 2, 30); // generous hit area

      this.attempts++;
      if (dx < hitR && dy < hitR) {
        this.onFound(canvas, scene, target);
      } else {
        this.onMiss();
      }
    };

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      onTap(e);
    }, { passive: false });
    canvas.addEventListener('click', onTap);
  },

  onFound(canvas, scene, target) {
    const ctx = canvas.getContext('2d');
    // Draw pulsing circle around found target
    ctx.save();
    ctx.beginPath();
    ctx.arc(target._x, target._y, target._r * 2.2, 0, Math.PI * 2);
    ctx.strokeStyle = '#6BCB77'; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = 'rgba(107,203,119,0.25)'; ctx.fill();
    // Draw checkmark
    ctx.font = `${Math.round(target._r * 1.5)}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('✅', target._x, target._y - target._r * 2.5);
    ctx.restore();

    App.confetti();
    App.speak('¡Encontrado! ' + target.name);

    // Mark in target strip
    const chip = document.getElementById('mi-t-' + this.targetIdx);
    if (chip) { chip.style.opacity = '1'; chip.style.textDecoration = 'line-through'; }

    this.targetIdx++;
    if (this.targetIdx >= scene.targets.length) {
      const stars = this.hintUsed ? 3 : this.attempts <= scene.targets.length * 3 ? 5 : 4;
      App.saveScore('mini', stars);
      document.getElementById('mi-msg').textContent = '🎉 ¡Encontraste a todos!';
      document.getElementById('mi-next').style.display = '';
      App.speak('¡Increíble! ¡Los encontraste todos!');
    } else {
      const next = scene.targets[this.targetIdx];
      // Update target badge
      document.getElementById('mi-target-emoji').textContent = next.emoji;
      document.getElementById('mi-target-name').textContent = next.name;
      document.getElementById('mi-target-badge').style.background = '#FF9F43';
      document.getElementById('mi-msg').textContent = `Ahora busca: ${next.emoji} ${next.name}`;
      // Mark next as active
      const nextChip = document.getElementById('mi-t-' + this.targetIdx);
      if (nextChip) nextChip.style.opacity = '1';
      App.speak('Ahora busca ' + next.name);
    }
  },

  onMiss() {
    const msg = document.getElementById('mi-msg');
    const prev = msg.textContent;
    msg.style.color = '#FF6B6B';
    msg.textContent = '¡No está ahí! Sigue buscando 🔍';
    setTimeout(() => { msg.style.color = ''; msg.textContent = prev; }, 1000);
  },

  showHint() {
    this.hintUsed = true;
    const scene = DATA.mini[this.order[this.sceneIdx % DATA.mini.length]];
    const target = scene.targets[this.targetIdx];
    if (!target) return;

    const canvas = document.getElementById('mi-canvas');
    const scroll = document.getElementById('mi-scroll');
    const ctx = canvas.getContext('2d');

    // Draw a subtle arrow pointing toward the target
    ctx.save();
    ctx.strokeStyle = '#FFD93D'; ctx.lineWidth = 5;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.arc(target._x, target._y, target._r * 4, 0, Math.PI * 2);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();

    // Scroll to roughly where the target is
    const scaleX = canvas.getBoundingClientRect().width / canvas.width;
    const scrollLeft = target._x * scaleX - scroll.clientWidth / 2;
    const scrollTop  = target._y * scaleX - scroll.clientHeight / 2;
    scroll.scrollTo({ left: Math.max(0, scrollLeft), top: Math.max(0, scrollTop), behavior: 'smooth' });

    document.getElementById('mi-msg').textContent = '💡 Mira en esa zona…';
    App.speak('Busca por aquí');
  },

  nextScene() {
    this.sceneIdx++;
    if (this.sceneIdx >= DATA.mini.length) {
      App.levelComplete('mini', 5,
        () => { this.sceneIdx = 0; this.solved = 0; this.order = App.shuffle([...Array(DATA.mini.length).keys()]); this.loadScene(); },
        null, false);
    } else { this.loadScene(); }
  }
};
