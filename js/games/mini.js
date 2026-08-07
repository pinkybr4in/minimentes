// ===== ¿DÓNDE ESTÁ MINI? =====
// Densidad tipo Wally: 150-200 personajes, canvas 2x ancho, objetivo pequeño
const GameMini = {
  sceneIdx:0, targetIdx:0, order:[], solved:0, hintUsed:false, attempts:0,

  init(container) {
    this.sceneIdx=0; this.targetIdx=0; this.solved=0;
    this.order=App.shuffle([...Array(DATA.mini.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="mi-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="mi-plabel"></div>
      </div>
      <div id="mi-area" style="padding-bottom:30px"></div>`;
    this.loadScene();
  },

  loadScene() {
    this.targetIdx=0; this.hintUsed=false; this.attempts=0;
    const total=DATA.mini.length;
    const scene=DATA.mini[this.order[this.sceneIdx%total]];
    document.getElementById('mi-pbar').style.width=(this.sceneIdx/total*100)+'%';
    document.getElementById('mi-plabel').textContent=`Escena ${this.sceneIdx+1} de ${total}`;
    const target=scene.targets[0];

    document.getElementById('mi-area').innerHTML=`
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:white;border-bottom:2px solid #eee;flex-wrap:wrap">
        <div style="font-family:'Fredoka One',cursive;font-size:0.82rem;color:#888">Busca:</div>
        <div id="mi-badge" style="display:flex;align-items:center;gap:6px;background:#FFD93D;border-radius:20px;padding:5px 12px">
          <span style="font-size:1.6rem" id="mi-t-emoji">${target.emoji}</span>
          <span style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#7a5c00" id="mi-t-name">${target.name}</span>
        </div>
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center" id="mi-chips">
          ${scene.targets.map((t,i)=>`<span class="mi-chip" id="mi-chip-${i}" style="font-size:1.2rem;opacity:${i===0?1:0.3}">${t.emoji}</span>`).join('')}
        </div>
      </div>
      <div id="mi-scroll" style="overflow:scroll;-webkit-overflow-scrolling:touch;max-height:55vh;position:relative;background:#eee">
        <canvas id="mi-canvas" style="display:block;touch-action:pan-x pan-y"></canvas>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;gap:8px">
        <div id="mi-msg" style="font-family:'Fredoka One',cursive;font-size:0.82rem;color:#888;flex:1">
          👆 Toca para encontrar a ${target.name}
        </div>
        <button style="font-family:'Fredoka One',cursive;font-size:0.82rem;padding:8px 14px;background:#fff0e0;border:none;border-radius:16px;cursor:pointer;box-shadow:0 3px 0 #e8b87a;color:#cc7a1e"
          onclick="GameMini.showHint()">💡 Pista</button>
        <button class="btn-action btn-next" id="mi-next" onclick="GameMini.nextScene()" style="display:none;padding:8px 14px;font-size:0.82rem">
          Siguiente ➡️
        </button>
      </div>`;

    this.buildAndDraw(scene);
    this.attachTap(scene);
    App.speak('Busca '+target.name+' en el dibujo');
  },

  buildAndDraw(scene) {
    const canvas=document.getElementById('mi-canvas');
    const scroll=document.getElementById('mi-scroll');
    const vw=scroll.clientWidth||320;

    // Canvas is 2.2x wider and 1.7x taller than viewport — must scroll to explore
    const CW=Math.round(vw*2.2);
    const CH=Math.round(vw*1.7);
    canvas.width=CW; canvas.height=CH;
    // CSS: display at 100% width of scroll container (so 1 CSS px = CW/vw canvas px)
    canvas.style.width=CW+'px';
    canvas.style.height=CH+'px';

    const ctx=canvas.getContext('2d');

    // Background
    scene.drawBg(ctx,CW,CH);

    // Grid of distractors — 16 cols x 12 rows = 192 slots
    const COLS=16, ROWS=12;
    const cw=Math.round(CW/COLS), ch=Math.round(CH/ROWS);
    const fontSize=Math.round(cw*0.7);

    for(let row=0;row<ROWS;row++){
      for(let col=0;col<COLS;col++){
        const jx=(Math.random()-0.5)*cw*0.55;
        const jy=(Math.random()-0.5)*ch*0.55;
        const x=Math.round(cw*col+cw/2+jx);
        const y=Math.round(ch*row+ch/2+jy);
        if(x<8||x>CW-8||y<8||y>CH-8) continue;
        const d=scene.distractors[Math.floor(Math.random()*scene.distractors.length)];
        const sz=Math.round(fontSize*(0.7+Math.random()*0.5));
        ctx.save();
        if(Math.random()<0.25){ ctx.translate(x,y);ctx.scale(-1,1);ctx.translate(-x,-y); }
        ctx.font=`${sz}px serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.globalAlpha=0.82+Math.random()*0.18;
        ctx.fillText(d,x,y);
        ctx.restore();
      }
    }

    // Place targets at random positions — smaller than distractors
    const used=[];
    const tSize=Math.round(fontSize*0.75); // 25% smaller → harder to spot
    scene.targets.forEach((t,ti)=>{
      let tx,ty,tries=0;
      do {
        tx=Math.round(CW*(0.06+Math.random()*0.88));
        ty=Math.round(CH*(0.06+Math.random()*0.88));
        tries++;
      } while(tries<80 && used.some(p=>Math.hypot(p.x-tx,p.y-ty)<CW*0.12));
      used.push({x:tx,y:ty});

      ctx.save();
      ctx.font=`${tSize}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.globalAlpha=1;
      ctx.fillText(t.emoji,tx,ty);
      ctx.restore();

      // Store in canvas pixels
      t._x=tx; t._y=ty; t._r=tSize*0.5; t._found=false;
    });

    // Overlays on top (trees, pillars, etc)
    scene.overlays.forEach(ov=>{
      const x=Math.round(ov.rx*CW), y=Math.round(ov.ry*CH);
      ctx.save();
      ctx.font=`${Math.round(CW*ov.size)}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.globalAlpha=ov.alpha||1;
      ctx.fillText(ov.emoji,x,y);
      ctx.restore();
    });
  },

  attachTap(scene) {
    const canvas=document.getElementById('mi-canvas');
    // canvas CSS size = canvas.width px (not scaled down), so 1 CSS px = 1 canvas px
    const getXY=(e)=>{
      const rect=canvas.getBoundingClientRect();
      const src=e.touches?e.changedTouches[0]:e;
      // canvas.style.width = CW px, displayed at actual CW px in scroll container
      // rect gives position in viewport. No scaling needed since CSS px = canvas px.
      return{ x:src.clientX-rect.left, y:src.clientY-rect.top };
    };

    let lastTouch=0;
    const onTap=(e)=>{
      e.stopPropagation();
      const now=Date.now();
      if(now-lastTouch<250) return; // debounce
      lastTouch=now;
      const pos=getXY(e);
      this.checkTap(scene,pos);
    };

    canvas.addEventListener('touchend', onTap, {passive:true});
    canvas.addEventListener('click', onTap);
  },

  checkTap(scene,pos) {
    const target=scene.targets[this.targetIdx];
    if(!target||target._found) return;
    this.attempts++;

    const dx=Math.abs(pos.x-target._x);
    const dy=Math.abs(pos.y-target._y);
    const hitR=Math.max(target._r*2.5, 36); // generous hit zone

    if(dx<hitR && dy<hitR){
      this.onFound(scene,target);
    } else {
      this.onMiss();
    }
  },

  onFound(scene,target) {
    target._found=true;
    const canvas=document.getElementById('mi-canvas');
    const ctx=canvas.getContext('2d');
    // Draw green circle
    ctx.save();
    ctx.beginPath(); ctx.arc(target._x,target._y,target._r*2.5,0,Math.PI*2);
    ctx.strokeStyle='#6BCB77'; ctx.lineWidth=5; ctx.stroke();
    ctx.fillStyle='rgba(107,203,119,0.2)'; ctx.fill();
    ctx.font=`${Math.round(target._r*1.2)}px serif`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('✅',target._x,target._y-target._r*3);
    ctx.restore();

    // Mark chip
    const chip=document.getElementById('mi-chip-'+this.targetIdx);
    if(chip){chip.style.opacity='1';chip.style.textDecoration='line-through';}

    App.confetti();
    App.speak('¡Encontrado! '+target.name);

    this.targetIdx++;
    if(this.targetIdx>=scene.targets.length){
      const stars=this.hintUsed?3:this.attempts<=scene.targets.length*4?5:4;
      App.saveScore('mini',stars);
      document.getElementById('mi-msg').textContent='🎉 ¡Encontraste a todos!';
      document.getElementById('mi-next').style.display='';
      App.speak('¡Increíble! ¡Los encontraste todos!');
    } else {
      const next=scene.targets[this.targetIdx];
      document.getElementById('mi-t-emoji').textContent=next.emoji;
      document.getElementById('mi-t-name').textContent=next.name;
      document.getElementById('mi-badge').style.background='#FF9F43';
      document.getElementById('mi-msg').textContent=`Ahora busca: ${next.emoji} ${next.name}`;
      const nc=document.getElementById('mi-chip-'+this.targetIdx);
      if(nc) nc.style.opacity='1';
      App.speak('Ahora busca '+next.name);
    }
  },

  onMiss() {
    const msg=document.getElementById('mi-msg');
    const prev=msg.textContent; msg.style.color='#FF6B6B';
    msg.textContent='¡No está ahí! Sigue buscando 🔍';
    setTimeout(()=>{msg.style.color='';msg.textContent=prev;},1000);
  },

  showHint() {
    this.hintUsed=true;
    const scene=DATA.mini[this.order[this.sceneIdx%DATA.mini.length]];
    const target=scene.targets[this.targetIdx];
    if(!target||target._found) return;

    const canvas=document.getElementById('mi-canvas');
    const ctx=canvas.getContext('2d');
    ctx.save();
    ctx.beginPath(); ctx.arc(target._x,target._y,target._r*5,0,Math.PI*2);
    ctx.strokeStyle='#FFD93D'; ctx.lineWidth=6; ctx.setLineDash([10,6]); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Scroll canvas so target is visible
    const scroll=document.getElementById('mi-scroll');
    scroll.scrollTo({
      left:Math.max(0,target._x-scroll.clientWidth/2),
      top:Math.max(0,target._y-scroll.clientHeight/2),
      behavior:'smooth'
    });
    document.getElementById('mi-msg').textContent='💡 Mira en esa zona del dibujo…';
    App.speak('Busca por aquí');
  },

  nextScene() {
    this.sceneIdx++;
    // Reset found state on all targets
    const scene=DATA.mini[this.order[(this.sceneIdx-1)%DATA.mini.length]];
    if(scene) scene.targets.forEach(t=>{t._found=false;});
    if(this.sceneIdx>=DATA.mini.length){
      App.levelComplete('mini',5,
        ()=>{this.sceneIdx=0;this.solved=0;this.order=App.shuffle([...Array(DATA.mini.length).keys()]);this.loadScene();},
        null,false);
    } else { this.loadScene(); }
  }
};
