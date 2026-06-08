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
      <div class="dots-info" id="lb-info">¡Lleva al pollito hasta la estrella! 🐥→⭐</div>
      <div id="lb-canvas-wrap" style="display:flex;justify-content:center;overflow:hidden;padding:8px 14px 4px">
        <canvas id="lb-canvas" style="border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12);max-width:100%"></canvas>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,60px);gap:8px;padding:10px 0;margin:0 auto;width:fit-content">
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,-1)">⬆️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(-1,0)">⬅️</button>
        <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:1.8rem">🐥</div>
        <button class="lab-btn" onclick="GameLaberinto.move(1,0)">➡️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,1)">⬇️</button>
        <div></div>
      </div>
      <div class="action-row" style="padding:4px 14px 30px">
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
    document.getElementById('lb-info').textContent='¡Lleva al pollito hasta la estrella! 🐥→⭐';
    const mazes=DATA.laberintos[this.level];
    const maze=mazes[this.idx%mazes.length];
    this.grid=maze.grid.map(row=>[...row]);
    this.rows=this.grid.length; this.cols=this.grid[0].length;
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.exitX=maze.exit[0]; this.exitY=maze.exit[1];
    // Fit canvas to screen
    const wrapW=document.getElementById('lb-canvas-wrap').clientWidth-28;
    const C=Math.min(50, Math.floor(wrapW/this.cols));
    this.CELL=C;
    const canvas=document.getElementById('lb-canvas');
    canvas.width=this.cols*C; canvas.height=this.rows*C;
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
      App.confetti(); App.speak('¡Lo has conseguido! ¡Salida encontrada!');
      App.saveScore('laberinto',Math.min(this.idx+1,5));
      document.getElementById('lb-info').textContent='🎉 ¡Salida encontrada!';
      document.getElementById('lb-next').style.display='';
    }
  },

  resetPlayer() {
    const maze=DATA.laberintos[this.level][this.idx%DATA.laberintos[this.level].length];
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.render();
    document.getElementById('lb-info').textContent='¡Lleva al pollito hasta la estrella! 🐥→⭐';
  },

  render() {
    const canvas=document.getElementById('lb-canvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d'); const C=this.CELL;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let y=0;y<this.rows;y++){
      for(let x=0;x<this.cols;x++){
        const cell=this.grid[y][x];
        if(cell===1){
          // Wall — dark with slight texture
          ctx.fillStyle='#3D2C1E';
          ctx.fillRect(x*C,y*C,C,C);
          // Brick highlight
          ctx.fillStyle='rgba(255,255,255,0.05)';
          ctx.fillRect(x*C+1,y*C+1,C-2,C/2-1);
        } else if(x===this.exitX&&y===this.exitY){
          ctx.fillStyle='#fff9e0';
          ctx.fillRect(x*C,y*C,C,C);
          ctx.font=`${Math.round(C*0.65)}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
          ctx.fillText('⭐',x*C+C/2,y*C+C/2);
        } else {
          ctx.fillStyle='#f5f0e8';
          ctx.fillRect(x*C,y*C,C,C);
          // Subtle grid
          ctx.strokeStyle='rgba(0,0,0,0.05)'; ctx.lineWidth=0.5;
          ctx.strokeRect(x*C,y*C,C,C);
        }
      }
    }
    // Player
    ctx.font=`${Math.round(C*0.7)}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🐥',this.playerX*C+C/2,this.playerY*C+C/2);
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
