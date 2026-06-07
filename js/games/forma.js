const GameForma = {
  level:'easy', idx:0, correct:0, answered:false, order:[],
  selected:[], // letters chosen so far

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false; this.selected=[];
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="fo-easy" onclick="GameForma.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="fo-med"  onclick="GameForma.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="fo-hard" onclick="GameForma.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="fo-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="fo-plabel"></div>
      </div>
      <div id="fo-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0; this.selected=[];
    ['easy','med','hard'].forEach(l=>document.getElementById('fo-'+l)?.classList.remove('active'));
    document.getElementById('fo-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.forma[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.selected=[];
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false; this.selected=[];
    const items=DATA.forma[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('fo-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('fo-plabel').textContent=`Palabra ${this.idx+1} de ${total}`;

    // Shuffle letters (correct + decoys)
    const letters=App.shuffle([...q.letters]);
    const colors=['#FF6B6B','#6EC6F5','#FFD93D','#6BCB77','#C77DFF','#FF9F43','#4a9ec9','#FF6BD6'];

    const lettersHTML=letters.map((l,i)=>
      `<button class="forma-letter-btn" id="fl-${i}" data-letter="${l}" data-li="${i}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2)"
        onclick="GameForma.pickLetter('${l}',${i})">${l}</button>`
    ).join('');

    // Blank slots
    const slotsHTML=q.word.split('').map((_,i)=>
      `<div class="forma-slot" id="fslot-${i}">_</div>`
    ).join('');

    document.getElementById('fo-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-size:5rem;margin-bottom:6px">${q.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:12px">
          Forma la palabra con las letras
        </div>
        <div class="forma-slots">${slotsHTML}</div>
      </div>
      <div class="forma-letters">${lettersHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-clear2" onclick="GameForma.clearLetters()">🔄 Borrar</button>
        <button class="btn-action btn-next" id="fo-next" onclick="GameForma.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak(q.word);
  },

  pickLetter(letter, li) {
    if(this.answered) return;
    const q=DATA.forma[this.level][this.order[this.idx%DATA.forma[this.level].length]];
    if(this.selected.length>=q.word.length) return;

    const btn=document.getElementById('fl-'+li);
    if(btn && btn.classList.contains('used')) return;
    if(btn) btn.classList.add('used');

    this.selected.push({letter,li});
    const slotIdx=this.selected.length-1;
    const slot=document.getElementById('fslot-'+slotIdx);
    if(slot){ slot.textContent=letter; slot.style.color='#333'; slot.style.borderColor='#6EC6F5'; }

    if(this.selected.length===q.word.length) this.checkWord(q);
  },

  clearLetters() {
    if(this.answered) return;
    this.selected=[];
    const q=DATA.forma[this.level][this.order[this.idx%DATA.forma[this.level].length]];
    q.word.split('').forEach((_,i)=>{
      const s=document.getElementById('fslot-'+i);
      if(s){ s.textContent='_'; s.style.color=''; s.style.borderColor=''; }
    });
    document.querySelectorAll('.forma-letter-btn').forEach(b=>b.classList.remove('used'));
  },

  checkWord(q) {
    this.answered=true;
    const formed=this.selected.map(s=>s.letter).join('');
    const ok=formed.toUpperCase()===q.word.toUpperCase();
    const slots=document.querySelectorAll('.forma-slot');
    slots.forEach(s=>s.classList.add(ok?'slot-correct':'slot-wrong'));
    if(ok){ this.correct++; App.confetti(); App.speak('¡Muy bien! '+q.word); }
    else {
      // Show correct word
      setTimeout(()=>{
        q.word.split('').forEach((ch,i)=>{
          const s=document.getElementById('fslot-'+i);
          if(s){ s.textContent=ch; s.classList.remove('slot-wrong'); s.classList.add('slot-correct'); }
        });
      },600);
      App.speak('La palabra es '+q.word);
    }
    App.showFeedback(ok);
    document.querySelector('.btn-clear2').style.display='none';
    document.getElementById('fo-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.forma[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('forma',stars,
        ()=>GameForma.setLevel(this.level),
        nextLvl?()=>GameForma.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
