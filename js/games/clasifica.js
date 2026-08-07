// CLASIFICA - Fixed: no JSON in onclick attrs, use data attributes instead
const GameClasifica = {
  idx:0, correct:0, answered:false, order:[],
  currentQ:null, itemIdx:0, itemResults:[],

  init(container) {
    this.idx=0; this.correct=0; this.answered=false;
    this.order=App.shuffle([...Array(DATA.clasifica.length).keys()]);
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:12px">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="cl-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="cl-plabel"></div>
      </div>
      <div class="game-wrap" style="padding-bottom:30px" id="cl-area"></div>`;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false; this.itemIdx=0; this.itemResults=[];
    const total=DATA.clasifica.length;
    const q=DATA.clasifica[this.order[this.idx%total]];
    this.currentQ=q;
    document.getElementById('cl-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('cl-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const catColors=['#6EC6F5','#6BCB77','#FF9F43','#C77DFF'];
    const catsHTML=q.categories.map((cat,i)=>`
      <div style="background:${catColors[i%catColors.length]};border-radius:14px;padding:10px;text-align:center;min-height:70px;flex:1">
        <div style="font-size:1.8rem">${cat.emoji}</div>
        <div style="font-family:'Fredoka One',cursive;font-size:0.8rem;color:white">${cat.label}</div>
        <div id="cat-items-${i}" style="margin-top:4px;font-size:1.3rem;min-height:24px"></div>
      </div>`).join('');

    document.getElementById('cl-area').innerHTML=`
      <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#555;text-align:center;padding:8px 0 10px">
        ¿A qué grupo pertenece? 🗂️
      </div>
      <div style="display:flex;gap:10px;margin-bottom:14px">${catsHTML}</div>
      <div style="font-size:4.5rem;text-align:center;margin:8px 0" id="cl-item">${q.items[0].emoji}</div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.9rem;color:#aaa;text-align:center;margin-bottom:10px" id="cl-item-label">${q.items[0].label}</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap" id="cl-opts"></div>
      <div class="action-row">
        <button class="btn-action btn-next" id="cl-next" onclick="GameClasifica.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    this.renderItemButtons();
    App.speak(`¿${q.items[0].label} es ${q.categories.map(c=>c.label).join(' o ')}?`);
  },

  renderItemButtons() {
    const q=this.currentQ;
    const item=q.items[this.itemIdx];
    const catColors=['#FF6B6B','#6BCB77','#FF9F43','#C77DFF'];
    const optsHTML=q.categories.map((cat,i)=>
      // Use data-chosen and data-correct attributes - no JSON in onclick
      `<button class="count-btn" data-chosen="${i}" data-correct="${item.category}"
        style="background:${catColors[i%catColors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:0.95rem;height:auto;min-width:80px;padding:10px 14px;border-radius:16px"
        onclick="GameClasifica.classify(this)">
        ${cat.emoji} ${cat.label}
      </button>`
    ).join('');
    document.getElementById('cl-opts').innerHTML=optsHTML;
  },

  classify(btn) {
    const chosen=parseInt(btn.dataset.chosen);
    const correct=parseInt(btn.dataset.correct);
    const q=this.currentQ;
    const item=q.items[this.itemIdx];
    const ok=chosen===correct;

    btn.classList.add(ok?'correct-btn':'wrong-btn');
    if(!ok){
      const cb=document.querySelector(`#cl-opts [data-chosen="${correct}"]`);
      if(cb) cb.classList.add('correct-btn');
    }

    // Place emoji in correct category box
    const catBox=document.getElementById('cat-items-'+correct);
    if(catBox) catBox.textContent+=item.emoji;

    this.itemResults.push(ok);
    document.querySelectorAll('#cl-opts .count-btn').forEach(b=>b.disabled=true);

    setTimeout(()=>{
      this.itemIdx++;
      if(this.itemIdx>=q.items.length){
        this.finishRound(q);
      } else {
        const nextItem=q.items[this.itemIdx];
        document.getElementById('cl-item').textContent=nextItem.emoji;
        document.getElementById('cl-item-label').textContent=nextItem.label;
        this.renderItemButtons();
        App.speak(`¿${nextItem.label} es ${q.categories.map(c=>c.label).join(' o ')}?`);
      }
    },800);
  },

  finishRound(q) {
    const allOk=this.itemResults.every(Boolean);
    const correctCount=this.itemResults.filter(Boolean).length;
    if(allOk){ this.correct++; App.confetti(); }
    App.showFeedback(allOk);
    App.speak(allOk?'¡Perfecto! Todo en su sitio':'¡Bien! '+correctCount+' de '+q.items.length+' correctos');
    document.getElementById('cl-item').textContent='✅';
    document.getElementById('cl-item-label').textContent='';
    document.getElementById('cl-opts').innerHTML='';
    document.getElementById('cl-next').style.display='';
  },

  next() {
    this.idx++;
    if(this.idx>=DATA.clasifica.length){
      const stars=Math.round((this.correct/DATA.clasifica.length)*5);
      App.levelComplete('clasifica',stars,
        ()=>{this.idx=0;this.correct=0;this.order=App.shuffle([...Array(DATA.clasifica.length).keys()]);this.loadQuestion();},
        null,false);
    } else { this.loadQuestion(); }
  }
};
