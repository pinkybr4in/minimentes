const GameFrases = {
  level: 'easy', idx: 0, answer: [], checked: false, correct: 0, total: 0,
  dragging: null, dragClone: null, dragOrigin: null,

  init(container) {
    this.level='easy'; this.idx=0; this.answer=[];
    this.checked=false; this.correct=0;
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="fl-easy" onclick="GameFrases.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="fl-med"  onclick="GameFrases.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="fl-hard" onclick="GameFrases.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="f-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="f-plabel"></div>
      </div>
      <div class="game-wrap">
        <div class="sentence-label">👆 Arrastra las palabras en orden</div>
        <div class="drop-zone" id="f-drop"></div>
        <div class="bank-label">📦 Palabras disponibles</div>
        <div class="word-bank" id="f-bank"></div>
        <div class="action-row">
          <button class="btn-action btn-clear2" id="f-clear" onclick="GameFrases.clear()">🔄 Borrar</button>
          <button class="btn-action btn-check" id="f-check" onclick="GameFrases.check()" disabled>✔️ Comprobar</button>
          <button class="btn-action btn-next" id="f-next" onclick="GameFrases.next()" style="display:none">Siguiente ➡️</button>
        </div>
      </div>`;
    this.loadSentence();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0;
    ['easy','med','hard'].forEach(l=>document.getElementById('fl-'+l)?.classList.remove('active'));
    document.getElementById('fl-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.loadSentence();
  },

  loadSentence() {
    this.answer=[]; this.checked=false; this.dragging=null;
    const sentences=DATA.frases[this.level];
    this.total=sentences.length;
    const sent=sentences[this.idx%sentences.length];
    const shuffled=App.shuffle(sent);
    const pct=(this.idx/this.total)*100;
    document.getElementById('f-pbar').style.width=pct+'%';
    document.getElementById('f-plabel').textContent=`Frase ${this.idx+1} de ${this.total}`;
    const drop=document.getElementById('f-drop');
    drop.innerHTML='<span class="drop-placeholder">Arrastra las palabras aquí...</span>';
    drop.className='drop-zone';
    const bank=document.getElementById('f-bank');
    bank.innerHTML='';
    shuffled.forEach((word,i)=>{
      const btn=document.createElement('button');
      btn.className=`word-tile wc${i%6}`;
      btn.textContent=word;
      btn.dataset.idx=i; btn.dataset.word=word; btn.dataset.color=`wc${i%6}`;
      // Touch drag
      btn.addEventListener('touchstart', e=>this.onTouchStart(e,btn),{passive:false});
      btn.addEventListener('touchmove',  e=>this.onTouchMove(e),{passive:false});
      btn.addEventListener('touchend',   e=>this.onTouchEnd(e,'bank',btn),{passive:false});
      // Click fallback
      btn.addEventListener('click', ()=>{ if(!this.dragging) this.addWord(btn); });
      bank.appendChild(btn);
    });
    document.getElementById('f-check').disabled=true;
    document.getElementById('f-check').style.display='';
    document.getElementById('f-next').style.display='none';
    document.getElementById('f-clear').disabled=false;
    document.getElementById('f-clear').style.background='';
    document.getElementById('f-clear').style.color='';
    document.getElementById('f-clear').textContent='🔄 Borrar';
  },

  // ===== DRAG FROM BANK =====
  onTouchStart(e, btn) {
    if(this.checked || btn.classList.contains('used')) return;
    e.preventDefault();
    this.dragging={btn, origin:'bank'};
    const touch=e.touches[0];
    const clone=btn.cloneNode(true);
    clone.style.cssText=`position:fixed;z-index:999;pointer-events:none;opacity:0.85;transform:scale(1.1);transition:none;`;
    const r=btn.getBoundingClientRect();
    clone.style.left=(touch.clientX-r.width/2)+'px';
    clone.style.top=(touch.clientY-r.height/2)+'px';
    document.body.appendChild(clone);
    this.dragClone=clone;
    btn.classList.add('used');
  },

  onTouchMove(e) {
    if(!this.dragClone) return;
    e.preventDefault();
    const touch=e.touches[0];
    const clone=this.dragClone;
    clone.style.left=(touch.clientX-clone.offsetWidth/2)+'px';
    clone.style.top=(touch.clientY-clone.offsetHeight/2)+'px';
  },

  onTouchEnd(e, origin, btn) {
    if(!this.dragClone||!this.dragging) return;
    e.preventDefault();
    const touch=e.changedTouches[0];
    this.dragClone.remove(); this.dragClone=null;
    // Check if dropped on drop zone
    const dz=document.getElementById('f-drop');
    const dzRect=dz.getBoundingClientRect();
    const inDrop=touch.clientX>=dzRect.left&&touch.clientX<=dzRect.right&&
                 touch.clientY>=dzRect.top&&touch.clientY<=dzRect.bottom;
    if(inDrop && origin==='bank') {
      this.addWord(this.dragging.btn);
    } else {
      // Return to bank
      this.dragging.btn.classList.remove('used');
    }
    this.dragging=null;
  },

  // ===== DRAG FROM ANSWER ZONE (return to bank) =====
  onAnswerTouchStart(e, idx) {
    if(this.checked) return;
    e.preventDefault();
    const item=this.answer[idx];
    // Find the bank btn
    const bankBtn=document.querySelector(`#f-bank .word-tile[data-idx="${item.idx}"]`);
    this.dragging={idx, origin:'answer', item, bankBtn};
    const touch=e.touches[0];
    // Create clone of answer tile
    const tile=e.currentTarget;
    const clone=tile.cloneNode(true);
    clone.style.cssText=`position:fixed;z-index:999;pointer-events:none;opacity:0.85;transform:scale(1.1);transition:none;font-family:'Fredoka One',cursive;font-size:1rem;padding:8px 14px;border-radius:12px;color:white;`;
    const r=tile.getBoundingClientRect();
    clone.style.left=(touch.clientX-r.width/2)+'px';
    clone.style.top=(touch.clientY-r.height/2)+'px';
    document.body.appendChild(clone);
    this.dragClone=clone;
    // Remove from answer immediately, re-render
    this.answer.splice(idx,1);
    if(bankBtn) bankBtn.classList.add('used'); // keep greyed while dragging
    this.renderDrop();
    document.getElementById('f-check').disabled=true;
  },

  onAnswerTouchMove(e) { this.onTouchMove(e); },

  onAnswerTouchEnd(e) {
    if(!this.dragClone||!this.dragging) return;
    e.preventDefault();
    const touch=e.changedTouches[0];
    this.dragClone.remove(); this.dragClone=null;
    const dz=document.getElementById('f-drop');
    const dzRect=dz.getBoundingClientRect();
    const inDrop=touch.clientX>=dzRect.left&&touch.clientX<=dzRect.right&&
                 touch.clientY>=dzRect.top&&touch.clientY<=dzRect.bottom;
    const {item,bankBtn}=this.dragging;
    if(inDrop) {
      // Re-add to answer
      this.answer.push(item);
      if(bankBtn) bankBtn.classList.add('used');
    } else {
      // Return to bank
      if(bankBtn) bankBtn.classList.remove('used');
    }
    this.dragging=null;
    this.renderDrop();
    const tiles=document.querySelectorAll('#f-bank .word-tile');
    const allUsed=[...tiles].every(t=>t.classList.contains('used'));
    document.getElementById('f-check').disabled=!allUsed;
    if(!this.answer.length) document.getElementById('f-drop').className='drop-zone';
  },

  addWord(btn) {
    if(btn.classList.contains('used')||this.checked) return;
    this.answer.push({word:btn.dataset.word,idx:btn.dataset.idx,color:btn.dataset.color});
    btn.classList.add('used');
    this.renderDrop();
    const tiles=document.querySelectorAll('#f-bank .word-tile');
    const allUsed=[...tiles].every(t=>t.classList.contains('used'));
    document.getElementById('f-check').disabled=!allUsed;
    document.getElementById('f-drop').classList.add('has-words');
  },

  removeWord(pos) {
    if(this.checked) return;
    const removed=this.answer.splice(pos,1)[0];
    document.querySelectorAll('#f-bank .word-tile').forEach(b=>{
      if(b.dataset.idx==removed.idx) b.classList.remove('used');
    });
    this.renderDrop();
    document.getElementById('f-check').disabled=true;
    if(!this.answer.length) document.getElementById('f-drop').className='drop-zone';
  },

  renderDrop() {
    const drop=document.getElementById('f-drop');
    drop.innerHTML='';
    if(!this.answer.length){
      drop.innerHTML='<span class="drop-placeholder">Arrastra las palabras aquí...</span>';
      return;
    }
    this.answer.forEach((item,i)=>{
      const t=document.createElement('button');
      t.className=`answer-tile ${item.color}`;
      t.textContent=item.word;
      // Touch drag back to bank
      t.addEventListener('touchstart', e=>this.onAnswerTouchStart(e,i),{passive:false});
      t.addEventListener('touchmove',  e=>this.onAnswerTouchMove(e),{passive:false});
      t.addEventListener('touchend',   e=>this.onAnswerTouchEnd(e),{passive:false});
      // Click fallback
      t.addEventListener('click', ()=>{ if(!this.dragging) this.removeWord(i); });
      drop.appendChild(t);
    });
  },

  clear() { this.loadSentence(); },

  check() {
    this.checked=true;
    const sentences=DATA.frases[this.level];
    const correct=sentences[this.idx%sentences.length];
    const ok=JSON.stringify(this.answer.map(a=>a.word))===JSON.stringify(correct);
    const drop=document.getElementById('f-drop');
    drop.classList.add(ok?'correct':'wrong');
    if(ok){this.correct++;App.confetti();App.speak(correct.join(' '));}
    document.getElementById('f-check').style.display='none';
    if(!ok){
      document.getElementById('f-clear').style.background='#FF6B6B';
      document.getElementById('f-clear').style.color='white';
      document.getElementById('f-clear').textContent='🔄 Reintentar';
    }
    document.getElementById('f-next').style.display='';
    App.showFeedback(ok);
  },

  next() {
    this.idx++;
    if(this.idx>=this.total){
      const stars=Math.round((this.correct/this.total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('frases',stars,
        ()=>GameFrases.setLevel(this.level),
        nextLvl?()=>GameFrases.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadSentence(); }
  }
};
