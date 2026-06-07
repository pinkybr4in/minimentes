const GameMemoria = {
  level:'easy', cards:[], flipped:[], matched:[], waiting:false, moves:0, stars:0,

  init(container) {
    this.level='easy';
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="me-easy" onclick="GameMemoria.setLevel('easy')">🌱 Fácil (8)</button>
        <button class="lvl-btn lvl-med"  id="me-med"  onclick="GameMemoria.setLevel('medium')">🌻 Medio (12)</button>
        <button class="lvl-btn lvl-hard" id="me-hard" onclick="GameMemoria.setLevel('hard')">🚀 Difícil (16)</button>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#aaa;text-align:center;padding:6px" id="me-info">¡Encuentra las parejas!</div>
      <div id="me-grid" style="padding:8px 14px 30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl;
    ['easy','med','hard'].forEach(l=>document.getElementById('me-'+l)?.classList.remove('active'));
    document.getElementById('me-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    this.flipped=[]; this.matched=[]; this.waiting=false; this.moves=0;
    const counts={easy:8,medium:12,hard:16};
    const n=counts[this.level];
    const pool=App.shuffle([...DATA.memoria]).slice(0,n/2);
    this.cards=App.shuffle([...pool,...pool].map((e,i)=>({emoji:e,id:i,pairId:pool.indexOf(e)})));
    document.getElementById('me-info').textContent='¡Encuentra las parejas!';
    this.render();
  },

  render() {
    const cols=this.level==='hard'?4:4;
    const grid=document.getElementById('me-grid');
    grid.innerHTML=`<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px">
      ${this.cards.map((c,i)=>this.cardHTML(c,i)).join('')}
    </div>`;
  },

  cardHTML(card,i) {
    const isFlipped=this.flipped.includes(i)||this.matched.includes(card.pairId);
    const isMatched=this.matched.includes(card.pairId);
    return `<button class="mem-card ${isFlipped?'mem-flipped':''} ${isMatched?'mem-matched':''}"
      onclick="GameMemoria.flip(${i})" ${isMatched?'disabled':''}>
      <div class="mem-front">🌟</div>
      <div class="mem-back">${card.emoji}</div>
    </button>`;
  },

  flip(i) {
    if(this.waiting) return;
    if(this.flipped.includes(i)) return;
    if(this.matched.includes(this.cards[i].pairId)) return;
    if(this.flipped.length>=2) return;

    this.flipped.push(i);
    this.moves++;
    this.updateCard(i);

    if(this.flipped.length===2){
      const [a,b]=this.flipped;
      if(this.cards[a].pairId===this.cards[b].pairId){
        // Match!
        this.matched.push(this.cards[a].pairId);
        this.flipped=[];
        App.speak('¡Pareja!');
        this.updateCard(a); this.updateCard(b);
        if(this.matched.length===this.cards.length/2){
          setTimeout(()=>this.levelDone(),600);
        }
      } else {
        this.waiting=true;
        setTimeout(()=>{
          this.flipped=[];
          this.waiting=false;
          this.render();
        },1000);
      }
    }
    const counts={easy:8,medium:12,hard:16};
    document.getElementById('me-info').textContent=`Movimientos: ${this.moves} | Parejas: ${this.matched.length}/${counts[this.level]/2}`;
  },

  updateCard(i) {
    const card=this.cards[i];
    const isFlipped=this.flipped.includes(i)||this.matched.includes(card.pairId);
    const isMatched=this.matched.includes(card.pairId);
    const btn=document.querySelector(`#me-grid button:nth-child(${i+1})`);
    if(btn){
      btn.className=`mem-card ${isFlipped?'mem-flipped':''} ${isMatched?'mem-matched':''}`;
      if(isMatched) btn.disabled=true;
    }
  },

  levelDone() {
    const counts={easy:8,medium:12,hard:16};
    const n=counts[this.level]/2;
    // Stars based on moves efficiency
    const ideal=n; const stars=this.moves<=ideal+2?5:this.moves<=ideal+6?4:this.moves<=ideal+10?3:2;
    App.confetti(); App.speak('¡Lo has conseguido!');
    App.levelComplete('memoria',stars,
      ()=>GameMemoria.setLevel(this.level),
      this.level!=='hard'?()=>GameMemoria.setLevel({easy:'medium',medium:'hard'}[this.level]):null,
      this.level!=='hard');
  }
};
