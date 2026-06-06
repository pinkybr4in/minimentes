const GameColorear = {
  currentDrawing: 0,
  color: '#FF6B6B',
  brushSize: 14,
  drawing: false,
  lastX: 0, lastY: 0,
  ctx: null, canvas: null,
  eraser: false,
  fillMode: false,

  COLORS: [
    '#FF6B6B','#FF9F43','#FFD93D','#6BCB77','#6EC6F5',
    '#4a9ec9','#C77DFF','#FF6BD6','#333333','#888888',
    '#ffffff','#a0522d','#1a6fa8','#45a352','#c94e4e',
    '#f8c8d4','#b5ead7','#ffdac1','#e2f0cb','#c7ceea'
  ],
  BRUSHES: [8, 14, 22],

  init(container) {
    this.currentDrawing = 0; this.eraser = false; this.fillMode = false;
    this.color = '#FF6B6B';

    const swatchHTML = this.COLORS.map((c, i) =>
      `<div class="color-swatch ${i===0?'active':''}" style="background:${c}" onclick="GameColorear.setColor('${c}', this)"></div>`
    ).join('');

    container.innerHTML = `
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-label" id="c-label">Dibujo 1 de ${DATA.colorear.length}</div>
      </div>
      <div class="color-palette">${swatchHTML}</div>
      <div class="brush-tools">
        <button class="brush-btn active" id="br-0" onclick="GameColorear.setBrush(0,this)">✏️ Fino</button>
        <button class="brush-btn" id="br-1" onclick="GameColorear.setBrush(1,this)">🖌️ Medio</button>
        <button class="brush-btn" id="br-2" onclick="GameColorear.setBrush(2,this)">🖌️ Grueso</button>
        <button class="brush-btn" id="br-fill" onclick="GameColorear.toggleFill(this)">🪣 Rellenar</button>
        <button class="brush-btn" id="br-e" onclick="GameColorear.toggleEraser(this)">🧹 Borrar</button>
      </div>
      <div id="fill-hint" style="display:none;text-align:center;font-family:'Fredoka One',cursive;font-size:0.82rem;color:#6EC6F5;padding:2px 0 4px">
        Toca una zona para rellenarla con color 🪣
      </div>
      <div class="canvas-wrap" id="c-wrap"><canvas id="c-canvas"></canvas></div>
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
    this.canvas.width = w; this.canvas.height = w;

    const events = [
      ['mousedown',  e => this.onDown(e)],
      ['mousemove',  e => this.onMove(e)],
      ['mouseup',    () => { this.drawing = false; }],
      ['mouseleave', () => { this.drawing = false; }],
      ['touchstart', e => { e.preventDefault(); this.onDown(e.touches[0]); }, {passive:false}],
      ['touchmove',  e => { e.preventDefault(); this.onMove(e.touches[0]); }, {passive:false}],
      ['touchend',   () => { this.drawing = false; }],
    ];
    events.forEach(([ev,fn,opts]) => this.canvas.addEventListener(ev, fn, opts||{}));
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return { x: Math.round((e.clientX-rect.left)*scaleX), y: Math.round((e.clientY-rect.top)*scaleY) };
  },

  onDown(e) {
    const pos = this.getPos(e);
    if (this.fillMode) {
      this.floodFill(pos.x, pos.y, this.color);
      return;
    }
    this.drawing = true;
    this.lastX = pos.x; this.lastY = pos.y;
    this.drawDot(pos.x, pos.y);
  },

  onMove(e) {
    if (!this.drawing || this.fillMode) return;
    const pos = this.getPos(e);
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = this.eraser ? 'white' : this.color;
    ctx.lineWidth = this.brushSize;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke();
    this.lastX = pos.x; this.lastY = pos.y;
  },

  drawDot(x, y) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, this.brushSize/2, 0, Math.PI*2);
    ctx.fillStyle = this.eraser ? 'white' : this.color;
    ctx.fill();
  },

  // ===== FLOOD FILL =====
  hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b,255];
  },

  colorsMatch(data, pos, target, tolerance=30) {
    return Math.abs(data[pos]-target[0]) <= tolerance &&
           Math.abs(data[pos+1]-target[1]) <= tolerance &&
           Math.abs(data[pos+2]-target[2]) <= tolerance &&
           Math.abs(data[pos+3]-target[3]) <= tolerance;
  },

  floodFill(startX, startY, fillColor) {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const w = canvas.width, h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const startPos = (startY * w + startX) * 4;
    const targetColor = [data[startPos], data[startPos+1], data[startPos+2], data[startPos+3]];
    const fillRgb = this.hexToRgb(fillColor);

    // Don't fill if clicking on dark outline
    if (targetColor[0] < 60 && targetColor[1] < 60 && targetColor[2] < 60) return;
    // Don't fill if already same color
    if (this.colorsMatch(data, startPos, fillRgb, 10)) return;

    const stack = [[startX, startY]];
    const visited = new Uint8Array(w * h);

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const idx = y * w + x;
      if (visited[idx]) continue;
      const pos = idx * 4;
      if (!this.colorsMatch(data, pos, targetColor)) continue;
      visited[idx] = 1;
      data[pos]   = fillRgb[0];
      data[pos+1] = fillRgb[1];
      data[pos+2] = fillRgb[2];
      data[pos+3] = 255;
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    ctx.putImageData(imgData, 0, 0);
    // Re-draw outlines on top to keep them sharp
    this.redrawOutlines();
  },

  redrawOutlines() {
    // Re-render SVG outlines on top after fill to keep lines crisp
    const drawing = DATA.colorear[this.currentDrawing];
    const svgBlob = new Blob([drawing.svg], {type:'image/svg+xml'});
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    const saved = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
    img.onload = () => {
      // Draw fill layer first, then outlines on top with multiply-like blend
      this.ctx.putImageData(saved, 0, 0);
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = 'source-over';
      URL.revokeObjectURL(url);
    };
    img.src = url;
  },

  setColor(color, el) {
    this.color = color; this.eraser = false;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('br-e')?.classList.remove('active');
  },

  setBrush(idx, el) {
    this.brushSize = this.BRUSHES[idx]; this.eraser = false; this.fillMode = false;
    document.querySelectorAll('.brush-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('fill-hint').style.display = 'none';
  },

  toggleFill(el) {
    this.fillMode = !this.fillMode; this.eraser = false;
    document.querySelectorAll('.brush-btn').forEach(b => b.classList.remove('active'));
    el.classList.toggle('active', this.fillMode);
    document.getElementById('fill-hint').style.display = this.fillMode ? 'block' : 'none';
  },

  toggleEraser(el) {
    this.eraser = !this.eraser; this.fillMode = false;
    el.classList.toggle('active', this.eraser);
    document.querySelectorAll('.brush-btn:not(#br-e)').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    document.getElementById('fill-hint').style.display = 'none';
  },

  clearCanvas() { this.renderDrawing(); },

  renderDrawing() {
    const drawing = DATA.colorear[this.currentDrawing];
    const ctx = this.ctx; const canvas = this.canvas;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const svgBlob = new Blob([drawing.svg], {type:'image/svg+xml'});
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => { ctx.drawImage(img,0,0,canvas.width,canvas.height); URL.revokeObjectURL(url); };
    img.src = url;
    document.getElementById('c-label').textContent =
      `${drawing.name} · Dibujo ${this.currentDrawing+1} de ${DATA.colorear.length}`;
  },

  nextDrawing() {
    this.currentDrawing = (this.currentDrawing+1) % DATA.colorear.length;
    this.renderDrawing();
    App.saveScore('colorear', Math.min(this.currentDrawing+1, 5));
  }
};
