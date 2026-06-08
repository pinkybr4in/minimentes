const GameLaberinto = {
  level:'easy', idx:0, correct:0,
  playerX:0, playerY:0, grid:[], cols:0, rows:0,
  CELL:60,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="lb-easy" onclick="GameLaberinto.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="lb-med"  onclick="GameLaberinto.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="lb-hard" onclick="GameLaberinto.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="dots-info" id="lb-info">¡Lleva al personaje hasta la salida! ⭐</div>
      <div style="display:flex;justify-content:center;overflow:auto;padding:8px 0">
        <canvas id="lb-canvas" style="border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.12)"></canvas>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px;max-width:240px;margin:0 auto">
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,-1)">⬆️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(-1,0)">⬅️</button>
        <button class="lab-btn" onclick="GameLaberinto.move(0,0)" style="background:#f0f0f0;cursor:default">🐥</button>
        <button class="lab-btn" onclick="GameLaberinto.move(1,0)">➡️</button>
        <div></div>
        <button class="lab-btn" onclick="GameLaberinto.move(0,1)">⬇️</button>
        <div></div>
      </div>
      <div class="action-row">
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
    document.getElementById('lb-info').textContent='¡Lleva al personaje hasta la salida! ⭐';
    const mazes=DATA.laberintos[this.level];
    const maze=mazes[this.idx%mazes.length];
    this.grid=maze.grid.map(row=>[...row]);
    this.rows=this.grid.length; this.cols=this.grid[0].length;
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.exitX=maze.exit[0]; this.exitY=maze.exit[1];
    const C=this.CELL;
    const canvas=document.getElementById('lb-canvas');
    canvas.width=this.cols*C; canvas.height=this.rows*C;
    this.render();
  },

  move(dx, dy) {
    const nx=this.playerX+dx, ny=this.playerY+dy;
    if(ny<0||ny>=this.rows||nx<0||nx>=this.cols) return;
    if(this.grid[ny][nx]===1) return; // wall
    this.playerX=nx; this.playerY=ny;
    this.render();
    if(nx===this.exitX && ny===this.exitY) {
      this.correct++;
      App.confetti(); App.speak('¡Lo has conseguido! ¡Salida!');
      App.saveScore('laberinto',Math.min(this.idx+1,5));
      document.getElementById('lb-info').textContent='🎉 ¡Salida encontrada!';
      document.getElementById('lb-next').style.display='';
    }
  },

  resetPlayer() {
    const mazes=DATA.laberintos[this.level];
    const maze=mazes[this.idx%mazes.length];
    this.playerX=maze.start[0]; this.playerY=maze.start[1];
    this.render();
  },

  render() {
    const canvas=document.getElementById('lb-canvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d'); const C=this.CELL;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<this.rows;y++){
      for(let x=0;x<this.cols;x++){
        const cell=this.grid[y][x];
        if(cell===1){ ctx.fillStyle='#3D2C1E'; }
        else if(x===this.exitX&&y===this.exitY){ ctx.fillStyle='#fff9e0'; }
        else { ctx.fillStyle='#f8f8f8'; }
        ctx.fillRect(x*C,y*C,C,C);
        ctx.strokeStyle='#e0e0e0'; ctx.lineWidth=1;
        ctx.strokeRect(x*C,y*C,C,C);

        if(x===this.exitX&&y===this.exitY){
          ctx.font=`${C*0.6}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
          ctx.fillText('⭐',x*C+C/2,y*C+C/2);
        }
      }
    }
    // Player
    ctx.font=`${C*0.65}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
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
