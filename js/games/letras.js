const GameLetras = {
  mode:'upper', idx:0,
  ctx:null, canvas:null,
  drawing:false, lastX:0, lastY:0,
  strokeLength:0, strokeBounds:{minX:9999,maxX:0,minY:9999,maxY:0},

  init(container) {
    this.mode='upper'; this.idx=0; this.strokeLength=0; this.drawing=false;
    this.strokeBounds={minX:9999,maxX:0,minY:9999,maxY:0};
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="ll-up" onclick="GameLetras.setMode('upper')">🔠 Mayús.</button>
        <button class="lvl-btn lvl-med"  id="ll-lo" onclick="GameLetras.setMode('lower')">🔡 Minús.</button>
        <button class="lvl-btn lvl-hard" id="ll-nu" onclick="GameLetras.setMode('nums')">🔢 Números</button>
      </div>
      <div class="dots-info" id="l-info">¡Traza la letra con el dedo!</div>
      <div class="letter-canvas-wrap" id="l-wrap">
        <div class="letter-hint"><div class="letter-hint-char" id="l-hint"></div></div>
        <canvas id="l-canvas"></canvas>
      </div>
      <div style="margin:6px 14px 0">
        <div style="height:10px;background:#e0e0e0;border-radius:10px;overflow:hidden">
          <div id="l-prog-fill" style="height:100%;width:0%;background:linear-gradient(90deg,#6EC6F5,#6BCB77);border-radius:10px;transition:width 0.15s"></div>
        </div>
        <div id="l-prog-label" style="text-align:center;font-family:'Fredoka One',cursive;font-size:0.8rem;color:#aaa;margin-top:3px">
          Dibuja la letra con el dedo ✏️
        </div>
      </div>
      <div class="letter-nav">
        <button class="letter-nav-btn btn-prev-letter" onclick="GameLetras.prev()">◀ Anterior</button>
        <button class="letter-nav-btn btn-clear-letter" onclick="GameLetras.clearCanvas()">🗑️ Limpiar</button>
        <button class="letter-nav-btn btn-next-letter" onclick="GameLetras.next()">Siguiente ▶</button>
      </div>
      <div class="action-row" style="padding-bottom:16px">
        <button class="btn-action btn-check" id="l-done-btn" onclick="GameLetras.celebrate()" style="opacity:0.5">
          🌟 ¡Listo!
        </button>
      </div>`;
    this.setupCanvas();
    this.renderLetter();
  },

  setupCanvas() {
    this.canvas=document.getElementById('l-canvas');
    this.ctx=this.canvas.getContext('2d');
    const wrap=document.getElementById('l-wrap');
    const w=Math.min(wrap.clientWidth,360);
    this.canvas.width=w; this.canvas.height=Math.round(w*0.72);
    // Threshold: need to cover at least 25% of canvas width AND height
    this.minSpread = w * 0.20;

    const add=(ev,fn,opts)=>this.canvas.addEventListener(ev,fn,opts||{});
    add('mousedown',  e=>this.startDraw(e));
    add('mousemove',  e=>this.draw(e));
    add('mouseup',    ()=>{this.drawing=false;});
    add('mouseleave', ()=>{this.drawing=false;});
    add('touchstart', e=>{e.preventDefault();this.startDraw(e.touches[0]);},{passive:false});
    add('touchmove',  e=>{e.preventDefault();this.draw(e.touches[0]);},{passive:false});
    add('touchend',   ()=>{this.drawing=false;});
  },

  getPos(e) {
    const rect=this.canvas.getBoundingClientRect();
    return{
      x:(e.clientX-rect.left)*(this.canvas.width/rect.width),
      y:(e.clientY-rect.top)*(this.canvas.height/rect.height)
    };
  },

  startDraw(e) {
    this.drawing=true;
    const p=this.getPos(e);
    this.lastX=p.x; this.lastY=p.y;
    this.updateBounds(p.x,p.y);
    this.ctx.beginPath(); this.ctx.arc(p.x,p.y,9,0,Math.PI*2);
    this.ctx.fillStyle='#6EC6F5'; this.ctx.fill();
    this.strokeLength+=5;
    this.updateProgress();
  },

  draw(e) {
    if(!this.drawing) return;
    const p=this.getPos(e);
    const dist=Math.hypot(p.x-this.lastX,p.y-this.lastY);
    if(dist<2) return;
    this.updateBounds(p.x,p.y);
    const ctx=this.ctx;
    ctx.beginPath(); ctx.moveTo(this.lastX,this.lastY); ctx.lineTo(p.x,p.y);
    ctx.strokeStyle='#6EC6F5'; ctx.lineWidth=18; ctx.lineCap='round'; ctx.stroke();
    this.lastX=p.x; this.lastY=p.y;
    this.strokeLength+=dist;
    this.updateProgress();
  },

  updateBounds(x,y) {
    const b=this.strokeBounds;
    b.minX=Math.min(b.minX,x); b.maxX=Math.max(b.maxX,x);
    b.minY=Math.min(b.minY,y); b.maxY=Math.max(b.maxY,y);
  },

  // Check if drawing covers enough of the canvas in both dimensions
  hasGoodSpread() {
    const b=this.strokeBounds;
    const spreadX=b.maxX-b.minX;
    const spreadY=b.maxY-b.minY;
    return spreadX>=this.minSpread && spreadY>=this.minSpread;
  },

  updateProgress() {
    // Progress based on BOTH total length AND spatial spread
    const lenPct=Math.min(100,(this.strokeLength/(this.canvas.width*0.5))*100);
    const b=this.strokeBounds;
    const spreadX=Math.max(0,(b.maxX-b.minX)/this.minSpread);
    const spreadY=Math.max(0,(b.maxY-b.minY)/this.minSpread);
    const spreadPct=Math.min(100,Math.min(spreadX,spreadY)*100);
    const pct=Math.min(lenPct,spreadPct);
    document.getElementById('l-prog-fill').style.width=pct+'%';
    const btn=document.getElementById('l-done-btn');
    if(pct>=100){
      document.getElementById('l-prog-label').textContent='¡Pulsa Listo cuando termines! 🌟';
      if(btn){btn.style.opacity='1';btn.style.background='#6BCB77';}
    } else {
      const hint=spreadPct<lenPct?'Traza la letra más grande':'Sigue trazando…';
      document.getElementById('l-prog-label').textContent=`${hint} ${Math.round(pct)}%`;
      if(btn){btn.style.opacity='0.5';btn.style.background='';}
    }
  },

  clearCanvas() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.strokeLength=0;
    this.strokeBounds={minX:9999,maxX:0,minY:9999,maxY:0};
    this.updateProgress();
  },

  currentChar() { return DATA.letras[this.mode][this.idx%DATA.letras[this.mode].length]; },

  renderLetter() {
    this.clearCanvas();
    const ch=this.currentChar();
    document.getElementById('l-hint').textContent=ch;
    document.getElementById('l-info').textContent=`Traza la ${this.mode==='nums'?'cifra':'letra'}: ${ch}`;
    App.speak(ch);
  },

  setMode(m) {
    this.mode=m; this.idx=0;
    ['up','lo','nu'].forEach(l=>document.getElementById('ll-'+l)?.classList.remove('active'));
    document.getElementById('ll-'+({upper:'up',lower:'lo',nums:'nu'}[m]))?.classList.add('active');
    this.renderLetter();
  },

  prev() { this.idx=(this.idx-1+DATA.letras[this.mode].length)%DATA.letras[this.mode].length; this.renderLetter(); },
  next() { this.idx=(this.idx+1)%DATA.letras[this.mode].length; this.renderLetter(); },

  celebrate() {
    const b=this.strokeBounds;
    const spreadX=b.maxX-b.minX;
    const spreadY=b.maxY-b.minY;
    if(this.strokeLength<this.canvas.width*0.4 || spreadX<this.minSpread || spreadY<this.minSpread){
      document.getElementById('l-prog-label').textContent='¡Traza la letra más grande! ✏️';
      const wrap=document.getElementById('l-wrap');
      wrap.style.animation='shake 0.4s';
      setTimeout(()=>wrap.style.animation='',500);
      App.speak('¡Traza la letra más grande!');
      return;
    }
    App.saveScore('letras',Math.min(this.idx+1,5));
    App.confetti();
    // Show feedback first, then speak after it fades so audio doesn't cut
    App.showFeedback(true, ()=>{
      if('speechSynthesis' in window){
        speechSynthesis.cancel();
        setTimeout(()=>{
          const u=new SpeechSynthesisUtterance('¡Muy bien! ¡Qué bonita letra!');
          u.lang='es-ES'; u.rate=0.85; u.pitch=1.15;
          speechSynthesis.speak(u);
        },150);
      }
    });
    setTimeout(()=>this.next(), 2400);
  }
};
