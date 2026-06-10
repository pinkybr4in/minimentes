const GameLaberinto = {
  level:'easy', idx:0, correct:0,
  playerX:0, playerY:0, exitX:0, exitY:0,
  grid:[], cols:0, rows:0, CELL:50,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="lb-easy" onclick="GameLaberinto.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="lb-med"  onclick="GameLaberinto.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="lb-hard" onclick="GameLaberinto.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="lb-info">Mueve el 🟡 hasta la ⭐</div>
      <div id="lb-canvas-wrap" style="display:flex;justify-content:center;padding:8px 14px 4px;overflow:hidden">
        <canvas id="lb-canvas" style="border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12);display:block"></canvas>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,64px);gap:6px;padding:10px 0 4px;margin:0 auto;width:fit-content">
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,-1)">⬆️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(-1,0)">⬅️</button>
        <div style="width:64px;height:64px;display:flex;align-items:center;justify-content:center;font-size:2rem">🟡</div>
        <button class="lab-btn" onclick="GameLaberinto.move(1,0)">➡️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,1)">⬇️</button>
        <div></div>
      </div>
      <div class="action-row" style="padding:6px 14px 30px">
        <button class="btn-action btn-clear2" onclick="GameLaberinto.resetPlayer()">🔄 Reiniciar</button>
        <button class="btn-action btn-next" id="lb-next" onclick="GameLaberinto.nextMaze()" style="display:none">Siguiente ➡️</button>
      </div>`;
    this.loadMaze();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('lb-'+l)?.classList.remove('active'));
    document.getElementById('lb-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadMaze();
  },

  loadMaze() {
    document.getElementById('lb-next').style.display='none';
    document.getElementById('lb-info').textContent='Mueve el 🟡 hasta la ⭐';
    const mazes=DATA.laberintos[this.level];
    const maze=mazes[this.idx%mazes.length];
    this.grid=maze.grid.map(row=>[...row]);
    this.rows=this.grid.length; this.cols=this.grid[0].length;
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.exitX=maze.exit[0]; this.exitY=maze.exit[1];
    // Fit cell size to screen
    const wrapW=document.getElementById('lb-canvas-wrap').clientWidth-28;
    const C=Math.floor(Math.min(50, wrapW/this.cols));
    this.CELL=Math.max(C,32);
    const canvas=document.getElementById('lb-canvas');
    canvas.width=this.cols*this.CELL;
    canvas.height=this.rows*this.CELL;
    this.render();
  },

  move(dx,dy) {
    const nx=this.playerX+dx, ny=this.playerY+dy;
    if(ny<0||ny>=this.rows||nx<0||nx>=this.cols) return;
    if(this.grid[ny][nx]===1) return;
    this.playerX=nx; this.playerY=ny;
    this.render();
    if(nx===this.exitX&&ny===this.exitY){
      this.correct++;
      App.confetti(); App.speak('¡Lo has conseguido!');
      App.saveScore('laberinto',Math.min(this.idx+1,5));
      document.getElementById('lb-info').textContent='🎉 ¡Encontraste la salida!';
      document.getElementById('lb-next').style.display='';
    }
  },

  resetPlayer() {
    const maze=DATA.laberintos[this.level][this.idx%DATA.laberintos[this.level].length];
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.render();
    document.getElementById('lb-info').textContent='Mueve el 🟡 hasta la ⭐';
  },

  render() {
    const canvas=document.getElementById('lb-canvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const C=this.CELL;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<this.rows;y++){
      for(let x=0;x<this.cols;x++){
        const isWall=this.grid[y][x]===1;
        const isExit=x===this.exitX&&y===this.exitY;
        const isPlayer=x===this.playerX&&y===this.playerY;

        if(isWall){
          ctx.fillStyle='#3D2C1E';
          ctx.fillRect(x*C,y*C,C,C);
          // Subtle highlight top
          ctx.fillStyle='rgba(255,255,255,0.07)';
          ctx.fillRect(x*C+1,y*C+1,C-2,Math.floor(C*0.4));
        } else if(isExit){
          // Yellow exit cell
          ctx.fillStyle='#fffbe0';
          ctx.fillRect(x*C,y*C,C,C);
          // Draw star shape (canvas primitives, no emoji)
          this.drawStar(ctx, x*C+C/2, y*C+C/2, C*0.38, C*0.16, '#FFD93D');
        } else {
          ctx.fillStyle='#f0ede6';
          ctx.fillRect(x*C,y*C,C,C);
          ctx.strokeStyle='rgba(0,0,0,0.04)';
          ctx.lineWidth=1;
          ctx.strokeRect(x*C,y*C,C,C);
        }

        // Draw player as yellow circle with face
        if(isPlayer){
          const cx=x*C+C/2, cy=y*C+C/2, r=C*0.35;
          ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
          ctx.fillStyle='#FFD93D'; ctx.fill();
          ctx.strokeStyle='#c9a820'; ctx.lineWidth=2; ctx.stroke();
          // Eyes
          ctx.fillStyle='#333';
          ctx.beginPath(); ctx.arc(cx-r*0.3,cy-r*0.15,r*0.12,0,Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(cx+r*0.3,cy-r*0.15,r*0.12,0,Math.PI*2); ctx.fill();
          // Smile
          ctx.beginPath();
          ctx.arc(cx,cy,r*0.35,0.2*Math.PI,0.8*Math.PI);
          ctx.strokeStyle='#333'; ctx.lineWidth=1.5; ctx.stroke();
        }
      }
    }
  },

  drawStar(ctx, cx, cy, outerR, innerR, color) {
    ctx.beginPath();
    for(let i=0;i<10;i++){
      const angle=-Math.PI/2 + i*Math.PI/5;
      const r=i%2===0?outerR:innerR;
      if(i===0) ctx.moveTo(cx+Math.cos(angle)*r, cy+Math.sin(angle)*r);
      else ctx.lineTo(cx+Math.cos(angle)*r, cy+Math.sin(angle)*r);
    }
    ctx.closePath();
    ctx.fillStyle=color; ctx.fill();
    ctx.strokeStyle='#c9a820'; ctx.lineWidth=1.5; ctx.stroke();
  },

  nextMaze() {
    this.idx++;
    const mazes=DATA.laberintos[this.level];
    if(this.idx>=mazes.length){
      const stars=Math.round((this.correct/mazes.length)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('laberinto',stars,
        ()=>GameLaberinto.setLevel(this.level),
        nextLvl?()=>GameLaberinto.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadMaze(); }
  }
};
