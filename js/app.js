const App = {
  currentGame: null,
  scores: {},
  GAMES: ['frases','colorear','puntos','letras','contar','sombras','ingles'],

  init() {
    try { this.scores = JSON.parse(localStorage.getItem('mm_scores') || '{}'); } catch(e) { this.scores = {}; }
    this.updateHomeStars();
    setTimeout(() => {
      document.getElementById('splash').classList.add('fade-out');
      setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('homeScreen').classList.remove('hidden');
      }, 600);
    }, 1600);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
  },

  openGame(gameId) {
    this.currentGame = gameId;
    document.getElementById('homeScreen').classList.add('hidden');
    const gc = document.getElementById('gameContainer');
    gc.classList.remove('hidden'); gc.scrollTop = 0;
    const names = {
      frases:'📝 Ordena la Frase', colorear:'🎨 Colorea',
      puntos:'🔢 Une los Puntos', letras:'✏️ Traza la Letra',
      contar:'🔢 ¿Cuántos hay?', sombras:'🌑 ¿Qué Sombra es?',
      ingles:'🇬🇧 ¡Aprende Inglés!'
    };
    document.getElementById('topbarTitle').textContent = names[gameId] || gameId;
    this.updateTopbarScore();
    document.getElementById('gameContent').innerHTML = '';
    const games = {frases:GameFrases,colorear:GameColorear,puntos:GamePuntos,letras:GameLetras,contar:GameContar,sombras:GameSombras,ingles:GameIngles};
    if (games[gameId]) games[gameId].init(document.getElementById('gameContent'));
  },

  goHome() {
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('homeScreen').scrollTop = 0;
    this.updateHomeStars();
  },

  saveScore(gameId, stars) {
    const prev = this.scores[gameId] || 0;
    if (stars > prev) { this.scores[gameId] = stars; localStorage.setItem('mm_scores', JSON.stringify(this.scores)); }
    this.updateTopbarScore();
  },

  updateTopbarScore() {
    const s = this.scores[this.currentGame] || 0;
    document.getElementById('topbarScore').textContent = '⭐ ' + s;
  },

  updateHomeStars() {
    let total = 0;
    this.GAMES.forEach(g => {
      const s = this.scores[g] || 0; total += s;
      const el = document.getElementById('stars-' + g);
      if (el) { el.textContent = s > 0 ? '⭐'.repeat(s) : '☆☆☆☆☆'; el.classList.toggle('has-stars', s > 0); }
    });
    document.getElementById('totalStarsDisplay').textContent = total + ' / 35';
  },

  showFeedback(correct, callback) {
    const fb = document.getElementById('feedbackOverlay');
    const emo_ok  = ['🎉','🌟','🥳','🏆','✨','💫','🎊'];
    const emo_no  = ['💪','🤔','😊','🌈','😅'];
    const txt_ok  = ['¡Genial!','¡Perfecto!','¡Muy bien!','¡Bravo!','¡Súper!','¡Increíble!'];
    const txt_no  = ['¡Inténtalo!','¡Casi!','¡Sigue así!','¡Ánimo!'];
    document.getElementById('feedbackEmoji').textContent = (correct?emo_ok:emo_no)[Math.floor(Math.random()*(correct?emo_ok:emo_no).length)];
    document.getElementById('feedbackText').textContent  = (correct?txt_ok:txt_no)[Math.floor(Math.random()*(correct?txt_ok:txt_no).length)];
    fb.className = 'feedback-overlay show ' + (correct ? 'fb-correct' : 'fb-wrong');
    setTimeout(() => { fb.classList.remove('show'); if (callback) callback(); }, 1500);
  },

  confetti() {
    const c = document.getElementById('confettiContainer'); c.innerHTML = '';
    const cols = ['#FF6B6B','#6EC6F5','#FFD93D','#6BCB77','#C77DFF','#FF9F43','white'];
    for (let i=0;i<55;i++) {
      const p = document.createElement('div'); p.className = 'conf-piece';
      p.style.left = Math.random()*100+'vw';
      p.style.background = cols[Math.floor(Math.random()*cols.length)];
      p.style.animationDuration = (1.5+Math.random()*2)+'s';
      p.style.animationDelay = Math.random()*0.6+'s';
      p.style.borderRadius = Math.random()>0.5?'50%':'2px';
      p.style.width = p.style.height = (8+Math.random()*8)+'px';
      c.appendChild(p);
    }
    setTimeout(()=>c.innerHTML='',4000);
  },

  speak(text, lang='es-ES') {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang; u.rate = 0.85; u.pitch = 1.15;
      speechSynthesis.speak(u);
    }
  },

  shuffle(arr) {
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  },

  levelComplete(gameId, stars, onRestart, onNextLevel, hasNextLevel) {
    const el = document.getElementById('gameContent');
    const pct = stars/5;
    let emoji,title,sub;
    if(pct>=1){emoji='🏆';title='¡Perfecto!';sub='¡Todas correctas! ¡Eres un crack!';}
    else if(pct>=0.6){emoji='🎉';title='¡Muy bien!';sub='¡Lo has hecho genial!';}
    else{emoji='😊';title='¡Buen intento!';sub='¡Practica un poco más!';}
    this.saveScore(gameId, stars);
    this.confetti(); this.speak(title);
    el.innerHTML = `
      <div class="level-complete-screen">
        <div class="lc-emoji">${emoji}</div>
        <div class="lc-title">${title}</div>
        <div class="lc-sub">${sub}</div>
        <div class="lc-stars">${'⭐'.repeat(stars)}</div>
        <div class="lc-btns">
          <button class="btn-action btn-check" onclick="lcRestart()">🔁 Jugar otra vez</button>
          ${hasNextLevel?`<button class="btn-action btn-next" onclick="lcNext()">Siguiente ➡️</button>`:''}
          <button class="btn-action btn-skip" onclick="App.goHome()">🏠 Inicio</button>
        </div>
      </div>`;
    window.lcRestart = onRestart;
    window.lcNext = onNextLevel||(() => {});
  }
};

function openGame(id){App.openGame(id);}
function goHome(){App.goHome();}
window.addEventListener('load', ()=>App.init());
