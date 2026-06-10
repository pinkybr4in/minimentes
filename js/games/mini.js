const GameMini = {
  sceneIdx:0, targetIdx:0, found:[], order:[],
  zoom:false, panX:0, panY:0, solved:0,
  lastTap:0,

  init(container) {
    this.sceneIdx=0; this.targetIdx=0; this.found=[];
    this.order=App.shuffle([...Array(DATA.mini.length).keys()]);
    this.solved=0;
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="mi-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="mi-plabel"></div>
      </div>
      <div id="mi-area" style="padding-bottom:30px"></div>`;
    this.loadScene();
  },

  loadScene() {
    this.found=[]; this.targetIdx=0;
    const total=DATA.mini.length;
    const scene=DATA.mini[this.order[this.sceneIdx%total]];
    document.getElementById('mi-pbar').style.width=(this.sceneIdx/total*100)+'%';
    document.getElementById('mi-plabel').textContent=`Escena ${this.sceneIdx+1} de ${total}`;

    const target=scene.targets[0];
    document.getElementById('mi-area').innerHTML=`
      <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#555;text-align:center;padding:8px 14px 6px">
        Busca: <span style="font-size:1.8rem">${target.emoji}</span>
        <span style="color:#888"> ${target.name}</span>
      </div>
      <div id="mi-hint" style="font-family:'Fredoka One',cursive;font-size:0.82rem;color:#aaa;text-align:center;padding:2px 14px 6px">
        Toca donde está en el dibujo
      </div>
      <div style="position:relative;margin:0 14px;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);cursor:crosshair;touch-action:none" id="mi-scene-wrap">
        <canvas id="mi-canvas" style="display:block;width:100%;touch-action:none"></canvas>
        <div id="mi-found-markers" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none"></div>
      </div>
      <!-- Targets to find -->
      <div style="padding:10px 14px 0">
        <div style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:#aaa;margin-bottom:6px">Encuentra todos:</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap" id="mi-targets-row"></div>
      </div>
      <div class="action-row">
        <button class="btn-action btn-next" id="mi-next" onclick="GameMini.nextScene()" style="display:none">Siguiente ➡️</button>
      </div>`;

    this.drawScene(scene);
    this.renderTargetRow(scene);
    this.setupTap(scene);
    App.speak('Busca ' + target.name + ' en el dibujo');
  },

  drawScene(scene) {
    const canvas=document.getElementById('mi-canvas');
    const wrap=document.getElementById('mi-scene-wrap');
    const W=wrap.clientWidth||300;
    const H=Math.round(W*0.75);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d');

    // Draw background
    ctx.fillStyle=scene.bgColor||'#e8f4fd'; ctx.fillRect(0,0,W,H);

    // Draw scene elements (SVG-like using canvas primitives)
    scene.draw(ctx,W,H);

    // Draw all characters at their positions
    scene.targets.forEach(t=>{
      const x=Math.round(t.rx*W), y=Math.round(t.ry*H);
      ctx.save();
      ctx.font=`${Math.round(W*t.size||W*0.07)}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(t.emoji, x, y);
      ctx.restore();
    });

    // Draw many distractor characters
    scene.distractors.forEach(d=>{
      const x=Math.round(d.rx*W), y=Math.round(d.ry*H);
      ctx.save();
      ctx.font=`${Math.round(W*(d.size||0.07))}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(d.emoji, x, y);
      ctx.restore();
    });
  },

  setupTap(scene) {
    const canvas=document.getElementById('mi-canvas');
    const wrap=document.getElementById('mi-scene-wrap');
    const getXY=(e)=>{
      const rect=canvas.getBoundingClientRect();
      const src=e.touches?e.touches[0]:e;
      return{
        rx:(src.clientX-rect.left)/rect.width,
        ry:(src.clientY-rect.top)/rect.height
      };
    };
    const tap=(e)=>{
      e.preventDefault();
      const pos=getXY(e);
      const target=scene.targets[this.targetIdx];
      if(!target) return;
      const dx=Math.abs(pos.rx-target.rx)*canvas.getBoundingClientRect().width;
      const dy=Math.abs(pos.ry-target.ry)*canvas.getBoundingClientRect().height;
      const hitRadius=Math.round(canvas.getBoundingClientRect().width*0.12);
      if(dx<hitRadius && dy<hitRadius){
        this.onFound(scene, target, pos);
      } else {
        this.onMiss();
      }
    };
    canvas.addEventListener('touchstart', tap, {passive:false});
    canvas.addEventListener('click', tap);
  },

  onFound(scene, target, pos) {
    this.found.push(target.name);
    App.confetti();
    App.speak('¡Encontrado! ' + target.name);
    // Mark with circle on canvas
    const canvas=document.getElementById('mi-canvas');
    const ctx=canvas.getContext('2d');
    const x=Math.round(target.rx*canvas.width), y=Math.round(target.ry*canvas.height);
    ctx.beginPath(); ctx.arc(x,y,canvas.width*0.08,0,Math.PI*2);
    ctx.strokeStyle='#6BCB77'; ctx.lineWidth=4; ctx.stroke();
    ctx.fillStyle='rgba(107,203,119,0.2)'; ctx.fill();
    // Mark in targets row
    const row=document.getElementById('mi-targets-row');
    const chips=row.querySelectorAll('.mi-chip');
    if(chips[this.targetIdx]) chips[this.targetIdx].classList.add('mi-chip-found');
    this.targetIdx++;
    if(this.targetIdx>=scene.targets.length){
      this.solved++;
      document.getElementById('mi-hint').textContent='🎉 ¡Encontraste a todos!';
      document.getElementById('mi-next').style.display='';
      App.speak('¡Muy bien! ¡Los encontraste todos!');
    } else {
      const next=scene.targets[this.targetIdx];
      document.getElementById('mi-hint').textContent=`¡Bien! Ahora busca: ${next.emoji} ${next.name}`;
      App.speak('Ahora busca ' + next.name);
    }
  },

  onMiss() {
    const hint=document.getElementById('mi-hint');
    hint.style.color='#FF6B6B';
    hint.textContent='¡No está ahí! Sigue buscando...';
    setTimeout(()=>{
      hint.style.color='';
      const target=DATA.mini[this.order[this.sceneIdx%DATA.mini.length]].targets[this.targetIdx];
      if(target) hint.textContent=`Busca: ${target.emoji} ${target.name}`;
    },1200);
  },

  renderTargetRow(scene) {
    const row=document.getElementById('mi-targets-row');
    row.innerHTML=scene.targets.map((t,i)=>
      `<div class="mi-chip" style="background:${i===0?'#6EC6F5':'#f0f0f0'};border-radius:20px;padding:6px 12px;font-family:'Fredoka One',cursive;font-size:0.9rem;color:${i===0?'white':'#888'};transition:all 0.3s">
        ${t.emoji} ${t.name}
      </div>`
    ).join('');
  },

  nextScene() {
    this.sceneIdx++;
    if(this.sceneIdx>=DATA.mini.length){
      App.levelComplete('mini',5,
        ()=>{this.sceneIdx=0;this.solved=0;this.order=App.shuffle([...Array(DATA.mini.length).keys()]);this.loadScene();},
        null,false);
    } else { this.loadScene(); }
  }
};
