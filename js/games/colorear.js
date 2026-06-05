const GameColorear = {
  currentDrawing: 0,
  color: '#FF6B6B',
  brushSize: 14,
  drawing: false,
  lastX: 0, lastY: 0,
  ctx: null, canvas: null,
  eraser: false,
  painted: 0,

  COLORS: [
    '#FF6B6B','#FF9F43','#FFD93D','#6BCB77','#6EC6F5',
    '#4a9ec9','#C77DFF','#FF6BD6','#333333','#888888',
    '#ffffff','#a0522d','#1a6fa8','#45a352','#c94e4e'
  ],
  BRUSHES: [8, 14, 22],

  init(container) {
    this.currentDrawing = 0; this.painted = 0; this.eraser = false;
    this.color = '#FF6B6B';

    const swatchHTML = this.COLORS.map((c, i) =>
      `<div class="color-swatch ${i===0?'active':''}" style="background:${c}" onclick="GameColorear.setColor('${c}', this)" data-color="${c}"></div>`
    ).join('');

    container.innerHTML = `
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-label" id="c-label">Dibujo 1 de ${DATA.colorear.length}</div>
      </div>
      <div class="color-palette">${swatchHTML}</div>
      <div class="brush-tools">
        <button class="brush-btn active" id="br-0" onclick="GameColorear.setBrush(0,this)">🖌️ Fino</button>
        <button class="brush-btn" id="br-1" onclick="GameColorear.setBrush(1,this)">🖌️ Medio</button>
        <button class="brush-btn" id="br-2" onclick="GameColorear.setBrush(2,this)">🖌️ Grueso</button>
        <button class="brush-btn" id="br-e" onclick="GameColorear.toggleEraser(this)">🧹 Borrar</button>
      </div>
      <div class="canvas-wrap" id="c-wrap">
        <canvas id="c-canvas"></canvas>
      </div>
      <div class="color-tools-row">
        <button class="tool-btn btn-clear-canvas" onclick="GameColorear.clearCanvas()">🗑️ Limpiar</button>
        <button class="tool-btn btn-next-drawing" onclick="GameColorear.nextDrawing()">Siguiente 🖼️</button>
      </div>`;

    this.setupCanvas();
    this.renderDrawing();
  },

  setupCanvas() {
    this.canvas = document.getElementById('c-canvas');
    this.ctx = this.canvas.getContext('2d');
    const wrap = document.getElementById('c-wrap');
    const w = wrap.clientWidth;
    this.canvas.width = w;
    this.canvas.height = w;

    const events = [
      ['mousedown', e => this.startDraw(e)],
      ['mousemove', e => this.draw(e)],
      ['mouseup',   () => { this.drawing = false; }],
      ['touchstart', e => { e.preventDefault(); this.startDraw(e.touches[0]); }, {passive:false}],
      ['touchmove',  e => { e.preventDefault(); this.draw(e.touches[0]); }, {passive:false}],
      ['touchend',   () => { this.drawing = false; }],
    ];
    events.forEach(([ev, fn, opts]) => this.canvas.addEventListener(ev, fn, opts||{}));
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY
    };
  },

  startDraw(e) {
    this.drawing = true;
    const pos = this.getPos(e);
    this.lastX = pos.x; this.lastY = pos.y;
    this.drawDot(pos.x, pos.y);
  },

  draw(e) {
    if (!this.drawing) return;
    const pos = this.getPos(e);
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = this.eraser ? 'white' : this.color;
    ctx.lineWidth = this.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    this.lastX = pos.x; this.lastY = pos.y;
    this.painted++;
    if (this.painted > 500) { this.painted = 0; this.checkCompletion(); }
  },

  drawDot(x, y) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, this.brushSize/2, 0, Math.PI*2);
    ctx.fillStyle = this.eraser ? 'white' : this.color;
    ctx.fill();
  },

  setColor(color, el) {
    this.color = color;
    this.eraser = false;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('br-e')?.classList.remove('active');
  },

  setBrush(idx, el) {
    this.brushSize = this.BRUSHES[idx];
    document.querySelectorAll('.brush-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    this.eraser = false;
    document.getElementById('br-e')?.classList.remove('active');
  },

  toggleEraser(el) {
    this.eraser = !this.eraser;
    el.classList.toggle('active', this.eraser);
    document.querySelectorAll('.brush-btn:not(#br-e)').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  },

  clearCanvas() { this.renderDrawing(); },

  checkCompletion() {
    // Simple check: sample pixels to see coverage
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    let white = 0, colored = 0;
    for (let i = 0; i < data.length; i += 16) {
      const r=data[i], g=data[i+1], b=data[i+2];
      if (r>240&&g>240&&b>240) white++;
      else if (r<30&&g<30&&b<30) {} // black outline, skip
      else colored++;
    }
    if (colored > white * 0.7) { App.confetti(); App.speak('¡Qué bonito dibujo!'); }
  },

  renderDrawing() {
    const drawing = DATA.colorear[this.currentDrawing];
    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw SVG to canvas via Image
    const svgBlob = new Blob([drawing.svg], {type:'image/svg+xml'});
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
    };
    img.src = url;

    document.getElementById('c-label').textContent =
      `${drawing.name} · Dibujo ${this.currentDrawing+1} de ${DATA.colorear.length}`;
  },

  nextDrawing() {
    this.currentDrawing = (this.currentDrawing + 1) % DATA.colorear.length;
    this.renderDrawing();
    App.saveScore('colorear', Math.min((this.currentDrawing+1), 5));
  }
};
