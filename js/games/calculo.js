const GameCalculo = {
  mode:'suma', idx:0, correct:0, answered:false,

  init(container) {
    this.mode='suma'; this.idx=0; this.correct=0; this.answered=false;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="ca-sum" onclick="GameCalculo.setMode('suma')">➕ Sumas</button>
        <button class="lvl-btn lvl-med"  id="ca-res" onclick="GameCalculo.setMode('resta')">➖ Restas</button>
        <button class="lvl-btn lvl-hard" id="ca-mix" onclick="GameCalculo.setMode('mix')">🔀 Mezcla</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="ca-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="ca-plabel"></div>
      </div>
      <div id="ca-area" style="padding-bottom:30px"></div>`;
    this.loadQuestion();
  },

  setMode(m) {
    this.mode=m; this.idx=0; this.correct=0;
    ['sum','res','mix'].forEach(l=>document.getElementById('ca-'+l)?.classList.remove('active'));
    document.getElementById('ca-'+({suma:'sum',resta:'res',mix:'mix'}[m]))?.classList.add('active');
    this.loadQuestion();
  },

  currentData() { return DATA.calculo[this.mode]; },

  loadQuestion() {
    this.answered=false;
    const items=this.currentData();
    const total=items.length;
    const q=items[this.idx%total];
    document.getElementById('ca-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('ca-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    // Visual objects
    const isResta=q.op==='-';
    const emoji=q.emoji;
    const leftEmojis=Array(q.a).fill(emoji);
    const rightEmojis=isResta?Array(q.b).fill('❌'):Array(q.b).fill(emoji);
    const leftHTML=leftEmojis.map(e=>`<span style="font-size:2rem">${e}</span>`).join('');
    const rightHTML=rightEmojis.map(e=>`<span style="font-size:2rem">${e}</span>`).join('');

    const opts=App.shuffle([...q.options]);
    const colors=['#FF6B6B','#6EC6F5','#6BCB77'];
    const optsHTML=opts.map((o,i)=>
      `<button class="count-btn" style="background:${colors[i]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.5rem;width:70px;height:70px"
        id="cab-${o}" onclick="GameCalculo.answer(${o},${q.answer})">${o}</button>`
    ).join('');

    const opText=isResta?'quitas':'añades';
    const question=isResta
      ? `Tienes ${q.a} ${emoji} y quitas ${q.b} ❌ ¿Cuántos quedan?`
      : `Tienes ${q.a} ${emoji} y ${opText} ${q.b} más. ¿Cuántos hay?`;

    document.getElementById('ca-area').innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:16px;box-shadow:0 4px 16px rgba(0,0,0,0.08)">
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;min-height:80px">
          <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:160px">${leftHTML}</div>
          <div style="font-family:'Fredoka One',cursive;font-size:2.5rem;color:${isResta?'#FF6B6B':'#6BCB77'}">${q.op}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:160px">${rightHTML}</div>
          <div style="font-family:'Fredoka One',cursive;font-size:2.5rem;color:#aaa">=</div>
          <div style="font-family:'Fredoka One',cursive;font-size:2.5rem;color:#ddd">?</div>
        </div>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.95rem;color:#888;text-align:center;padding:8px 14px">${question}</div>
      <div class="count-options" style="padding:8px 14px;justify-content:center">${optsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-next" id="ca-next" onclick="GameCalculo.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(question);
  },

  answer(val, correct) {
    if(this.answered) return;
    this.answered=true;
    const ok=val===correct;
    const btn=document.getElementById('cab-'+val);
    if(btn) btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){const cb=document.getElementById('cab-'+correct);if(cb)cb.classList.add('correct-btn');}
    if(ok){this.correct++;App.confetti();}
    App.speak(ok?`¡Correcto! Son ${correct}`:`Son ${correct}`);
    App.showFeedback(ok);
    document.querySelectorAll('.count-btn').forEach(b=>b.disabled=true);
    document.getElementById('ca-next').style.display='';
  },

  next() {
    this.idx++;
    const total=this.currentData().length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const modes=['suma','resta','mix'];
      const nextMode=modes[modes.indexOf(this.mode)+1];
      App.levelComplete('calculo',stars,
        ()=>GameCalculo.setMode(this.mode),
        nextMode?()=>GameCalculo.setMode(nextMode):null,!!nextMode);
    } else { this.loadQuestion(); }
  }
};
