const GamePuntos = {
  level:'easy', puzzleIdx:0, nextPoint:1,
  ctx:null, canvas:null, complete:false, touching:false,

  init(container) {
    this.level='easy'; this.puzzleIdx=0; this.nextPoint=1; this.complete=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="pl-easy" onclick="GamePuntos.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="pl-med"  onclick="GamePuntos.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="pl-hard" onclick="GamePuntos.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="p-info">¡Desliza el dedo desde el número 1!</div>
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
    const w=Math.min(wrap.clientWidth,380);
    this.canvas.width=w; this.canvas.height=w;

    const getXY=(e)=>{
      const rect=this.canvas.getBoundingClientRect();
      const scale=this.canvas.width/rect.width;
      const src=e.touches?e.touches[0]:e;
      return{x:(src.clientX-rect.left)*scale, y:(src.clientY-rect.top)*scale};
    };
    const onStart=(e)=>{
      e.preventDefault();
      if(this.complete) return;
      const pos=getXY(e);
      const pts=this.scaledPoints();
      const t=pts.find(p=>p.n===this.nextPoint);
      if(t && Math.hypot(pos.x-t.x,pos.y-t.y)<40) this.touching=true;
    };
    const onMove=(e)=>{
      e.preventDefault();
      if(!this.touching||this.complete) return;
      const pos=getXY(e);
      const pts=this.scaledPoints();
      this.render();
      if(this.nextPoint>1){
        const prev=pts[this.nextPoint-2];
        const ctx=this.ctx;
        ctx.save();
        ctx.beginPath(); ctx.moveTo(prev.x,prev.y); ctx.lineTo(pos.x,pos.y);
        ctx.strokeStyle='rgba(110,198,245,0.5)'; ctx.lineWidth=3;
        ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      }
      const t=pts.find(p=>p.n===this.nextPoint);
      if(t && Math.hypot(pos.x-t.x,pos.y-t.y)<40) this.arrive(pts);
    };
    const onEnd=(e)=>{e.preventDefault(); this.touching=false; this.render();};

    this.canvas.addEventListener('touchstart',onStart,{passive:false});
    this.canvas.addEventListener('touchmove', onMove, {passive:false});
    this.canvas.addEventListener('touchend',  onEnd,  {passive:false});
    this.canvas.addEventListener('mousedown', onStart);
    this.canvas.addEventListener('mousemove', onMove);
    this.canvas.addEventListener('mouseup',   onEnd);
    this.canvas.addEventListener('mouseleave',onEnd);
  },

  scaledPoints() {
    const s=this.canvas.width/300;
    return this.currentPuzzle().points.map(p=>({x:p.x*s,y:p.y*s,n:p.n}));
  },

  arrive(pts) {
    this.nextPoint++;
    const info=document.getElementById('p-info');
    if(this.nextPoint>pts.length){
      this.complete=true; this.touching=false;
      info.textContent=`🎉 ¡${this.currentPuzzle().name} completado!`;
      App.confetti(); App.speak('¡Lo has conseguido!');
      App.saveScore('puntos',Math.min(this.puzzleIdx+1,5));
      document.getElementById('p-next').style.display='';
      this.render();
    } else {
      info.textContent=`¡Bien! Busca el número ${this.nextPoint} 🔍`;
    }
  },

  currentPuzzle() {
    const lvl=DATA.puntos[this.level];
    return lvl[this.puzzleIdx%lvl.length];
  },

  loadPuzzle() {
    this.nextPoint=1; this.complete=false; this.touching=false;
    document.getElementById('p-next').style.display='none';
    const p=this.currentPuzzle();
    // BUGFIX: verify point 1 exists and log if missing
    const hasOne=p.points.some(pt=>pt.n===1);
    if(!hasOne) console.warn('Missing point n=1 in puzzle:', p.name);
    document.getElementById('p-info').textContent=`${p.name} · ¡Desliza desde el 1!`;
    this.render();
  },

  render() {
    const ctx=this.ctx,canvas=this.canvas;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='white'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const pts=this.scaledPoints();

    // Sort to ensure correct draw order
    const sorted=[...pts].sort((a,b)=>a.n-b.n);

    // Completed path
    if(this.nextPoint>1){
      ctx.beginPath();
      const drawn=sorted.filter(p=>p.n<this.nextPoint);
      ctx.moveTo(drawn[0].x,drawn[0].y);
      drawn.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.strokeStyle='#6EC6F5'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke();
    }

    // Complete: close + fill
    if(this.complete){
      ctx.beginPath();
      ctx.moveTo(sorted[0].x,sorted[0].y);
      sorted.forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.closePath();
      ctx.strokeStyle='#6EC6F5'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.stroke();
      ctx.fillStyle='rgba(110,198,245,0.18)'; ctx.fill();
    }

    // Draw ALL dots — use sorted order, find by n
    sorted.forEach(pt=>{
      const done=pt.n<this.nextPoint;
      // Dot
      ctx.beginPath(); ctx.arc(pt.x,pt.y,15,0,Math.PI*2);
      ctx.fillStyle=done?'#6BCB77':'white'; ctx.fill();
      ctx.strokeStyle=done?'#45a352':'#999'; ctx.lineWidth=2.5; ctx.stroke();
      // Number
      ctx.fillStyle=done?'white':'#444';
      ctx.font=`bold 12px Nunito`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(pt.n,pt.x,pt.y);
    });
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
