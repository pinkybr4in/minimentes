const GamePuntos = {
  level:'easy', puzzleIdx:0, nextPoint:1,
  ctx:null, canvas:null, complete:false,
  isDrawing:false, lastX:0, lastY:0,

  init(container) {
    this.level='easy'; this.puzzleIdx=0; this.nextPoint=1; this.complete=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="pl-easy" onclick="GamePuntos.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="pl-med"  onclick="GamePuntos.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="pl-hard" onclick="GamePuntos.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="p-info">¡Desliza el dedo desde el 1!</div>
      <div class="dots-canvas-wrap" id="p-wrap"><canvas id="p-canvas"></canvas></div>
      <div class="action-row" style="padding-bottom:10px">
        <button class="btn-action btn-clear2" onclick="GamePuntos.restart()">🔄 Reiniciar</button>
        <button class="btn-action btn-next" id="p-next" onclick="GamePuntos.nextPuzzle()" style="display:none">Siguiente ➡️</button>
      </div>`;
    this.setupCanvas();
    this.loadPuzzle();
  },

  setupCanvas() {
    this.canvas=document.getElementById('p-canvas');
    this.ctx=this.canvas.getContext('2d');
    const wrap=document.getElementById('p-wrap');
    const w=Math.min(wrap.clientWidth,360);
    this.canvas.width=w; this.canvas.height=w;

    this.canvas.addEventListener('touchstart', e=>{e.preventDefault();this.handleStart(e.touches[0]);},{passive:false});
    this.canvas.addEventListener('touchmove',  e=>{e.preventDefault();this.handleMove(e.touches[0]);},{passive:false});
    this.canvas.addEventListener('touchend',   e=>{e.preventDefault();this.handleEnd();},{passive:false});
    this.canvas.addEventListener('mousedown',  e=>this.handleStart(e));
    this.canvas.addEventListener('mousemove',  e=>this.handleMove(e));
    this.canvas.addEventListener('mouseup',    ()=>this.handleEnd());
    this.canvas.addEventListener('mouseleave', ()=>this.handleEnd());
  },

  getPos(e) {
    const rect=this.canvas.getBoundingClientRect();
    const scale=this.canvas.width/rect.width;
    return{x:(e.clientX-rect.left)*scale, y:(e.clientY-rect.top)*scale};
  },

  currentPuzzle() {
    const lvl=DATA.puntos[this.level];
    return lvl[this.puzzleIdx%lvl.length];
  },

  scalePoint(pt) {
    const s=this.canvas.width/300;
    return{x:pt.x*s, y:pt.y*s, n:pt.n};
  },

  loadPuzzle() {
    this.nextPoint=1; this.complete=false; this.isDrawing=false;
    document.getElementById('p-next').style.display='none';
    document.getElementById('p-info').textContent=`${this.currentPuzzle().name} · ¡Desliza desde el 1!`;
    this.render();
  },

  render() {
    const ctx=this.ctx, canvas=this.canvas;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='white'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const puzzle=this.currentPuzzle();
    const pts=puzzle.points.map(p=>this.scalePoint(p));

    // Draw completed lines
    if(this.nextPoint>1){
      ctx.beginPath();
      ctx.moveTo(pts[0].x,pts[0].y);
      for(let i=1;i<Math.min(this.nextPoint-1,pts.length);i++) ctx.lineTo(pts[i].x,pts[i].y);
      ctx.strokeStyle='#6EC6F5'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.stroke();
    }

    // BUGFIX: if complete, close the path AND draw the last segment
    if(this.complete){
      ctx.beginPath();
      pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.closePath();
      ctx.strokeStyle='#6EC6F5'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.stroke();
      ctx.fillStyle='rgba(110,198,245,0.15)'; ctx.fill();
    }

    // Draw dots — all look the same (white + number), done ones green
    pts.forEach((pt,i)=>{
      const done=i+1<this.nextPoint;
      ctx.beginPath(); ctx.arc(pt.x,pt.y,14,0,Math.PI*2);
      ctx.fillStyle=done?'#6BCB77':'white'; ctx.fill();
      ctx.strokeStyle=done?'#45a352':'#aaa'; ctx.lineWidth=2.5; ctx.stroke();
      ctx.fillStyle=done?'white':'#555';
      ctx.font=`bold 12px Nunito`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(pt.n,pt.x,pt.y);
    });
  },

  handleStart(e) {
    if(this.complete) return;
    const pos=this.getPos(e);
    const pts=this.currentPuzzle().points.map(p=>this.scalePoint(p));
    const target=pts.find(p=>p.n===this.nextPoint);
    if(!target) return;
    const dist=Math.hypot(pos.x-target.x,pos.y-target.y);
    if(dist<34){
      this.isDrawing=true;
      this.lastX=target.x; this.lastY=target.y;
    }
  },

  handleMove(e) {
    if(!this.isDrawing||this.complete) return;
    const pos=this.getPos(e);
    const pts=this.currentPuzzle().points.map(p=>this.scalePoint(p));
    const target=pts.find(p=>p.n===this.nextPoint);
    if(!target) return;

    // Draw a preview line from last confirmed point to finger
    this.render();
    const ctx=this.ctx;
    // Draw preview line
    const confirmed=pts[this.nextPoint-2]||pts[0];
    ctx.beginPath();
    ctx.moveTo(confirmed.x, confirmed.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle='rgba(110,198,245,0.5)'; ctx.lineWidth=3; ctx.lineDash=[6,4];
    ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]);

    // Check if close enough to next point
    const distToNext=Math.hypot(pos.x-target.x,pos.y-target.y);
    if(distToNext<34) {
      this.nextPoint++;
      this.isDrawing=false;
      const info=document.getElementById('p-info');
      if(this.nextPoint>pts.length){
        this.complete=true;
        info.textContent=`🎉 ¡${this.currentPuzzle().name} completado!`;
        App.confetti(); App.speak('¡Lo has conseguido!');
        App.saveScore('puntos',Math.min(this.puzzleIdx+1,5));
        document.getElementById('p-next').style.display='';
      } else {
        info.textContent=`¡Bien! Ahora busca el número ${this.nextPoint} 🔍`;
        // Auto-start next drag from the point just landed
        this.isDrawing=true;
      }
      this.render();
    }
  },

  handleEnd() {
    this.isDrawing=false;
    this.render(); // remove preview line
  },

  restart() { this.loadPuzzle(); },

  nextPuzzle() {
    this.puzzleIdx++;
    const lvl=DATA.puntos[this.level];
    if(this.puzzleIdx>=lvl.length){
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('puntos',5,
        ()=>GamePuntos.setLevel(this.level),
        nextLvl?()=>GamePuntos.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadPuzzle(); }
  },

  setLevel(lvl) {
    this.level=lvl; this.puzzleIdx=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('pl-'+l)?.classList.remove('active'));
    document.getElementById('pl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadPuzzle();
  }
};
