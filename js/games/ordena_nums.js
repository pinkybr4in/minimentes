const GameOrdenaNums = {
  level:'easy', idx:0, correct:0, order:[],
  selected:[], answered:false,

  init(container) {
    this.level='easy'; this.idx=0; this.correct=0; this.answered=false; this.selected=[];
    container.innerHTML=`
      <div class="game-level-bar">
        <button class="lvl-btn lvl-easy active" id="on-easy" onclick="GameOrdenaNums.setLevel('easy')">🌱 Fácil</button>
        <button class="lvl-btn lvl-med"  id="on-med"  onclick="GameOrdenaNums.setLevel('medium')">🌻 Medio</button>
        <button class="lvl-btn lvl-hard" id="on-hard" onclick="GameOrdenaNums.setLevel('hard')">🚀 Difícil</button>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" id="on-pbar" style="width:0%"></div></div>
        <div class="progress-label" id="on-plabel"></div>
      </div>
      <div id="on-area" style="padding-bottom:30px"></div>`;
    this.startLevel();
  },

  setLevel(lvl) {
    this.level=lvl; this.idx=0; this.correct=0; this.selected=[];
    ['easy','med','hard'].forEach(l=>document.getElementById('on-'+l)?.classList.remove('active'));
    document.getElementById('on-'+({easy:'easy',medium:'med',hard:'hard'}[lvl]))?.classList.add('active');
    this.startLevel();
  },

  startLevel() {
    const items=DATA.ordenaNums[this.level];
    this.order=App.shuffle([...Array(items.length).keys()]);
    this.idx=0; this.correct=0; this.selected=[]; this.answered=false;
    this.loadQuestion();
  },

  loadQuestion() {
    this.answered=false; this.selected=[];
    const items=DATA.ordenaNums[this.level];
    const total=items.length;
    const q=items[this.order[this.idx%total]];
    document.getElementById('on-pbar').style.width=(this.idx/total*100)+'%';
    document.getElementById('on-plabel').textContent=`Pregunta ${this.idx+1} de ${total}`;

    const shuffled=App.shuffle([...q.nums]);
    const colors=['#FF6B6B','#6EC6F5','#FFD93D','#6BCB77','#C77DFF','#FF9F43'];

    // Slots at top (empty)
    const slotsHTML=q.nums.map((_,i)=>
      `<div class="forma-slot" id="onslot-${i}" style="width:52px;height:52px;font-size:1.5rem">_</div>`
    ).join('');

    // Number buttons
    const numsHTML=shuffled.map((n,i)=>
      `<button class="forma-letter-btn" id="onb-${i}" data-num="${n}" data-i="${i}"
        style="background:${colors[i%colors.length]};box-shadow:0 4px 0 rgba(0,0,0,0.2);font-size:1.4rem;width:60px;height:60px"
        onclick="GameOrdenaNums.pick(${n},${i})">${n}</button>`
    ).join('');

    document.getElementById('on-area').innerHTML=`
      <div style="text-align:center;padding:16px 14px 8px">
        <div style="font-family:'Fredoka One',cursive;font-size:1rem;color:#aaa;margin-bottom:12px">
          Ordena los números de menor a mayor ⬆️
        </div>
        <div class="forma-slots" style="margin-bottom:16px">${slotsHTML}</div>
      </div>
      <div class="forma-letters">${numsHTML}</div>
      <div class="action-row">
        <button class="btn-action btn-clear2" onclick="GameOrdenaNums.clearAll()">🔄 Borrar</button>
        <button class="btn-action btn-next" id="on-next" onclick="GameOrdenaNums.next()" style="display:none">Siguiente ➡️</button>
      </div>`;

    App.speak('Ordena los números de menor a mayor');
  },

  pick(num, btnIdx) {
    if(this.answered) return;
    const btn=document.getElementById('onb-'+btnIdx);
    if(!btn||btn.classList.contains('used')) return;

    const slotIdx=this.selected.length;
    const slot=document.getElementById('onslot-'+slotIdx);
    if(!slot) return;

    btn.classList.add('used');
    this.selected.push({num, btnIdx});
    slot.textContent=num; slot.style.color='#333'; slot.style.borderColor='#6EC6F5';

    const q=DATA.ordenaNums[this.level][this.order[this.idx%DATA.ordenaNums[this.level].length]];
    if(this.selected.length===q.nums.length) this.checkOrder(q);
  },

  clearAll() {
    if(this.answered) return;
    this.selected=[];
    const q=DATA.ordenaNums[this.level][this.order[this.idx%DATA.ordenaNums[this.level].length]];
    q.nums.forEach((_,i)=>{
      const s=document.getElementById('onslot-'+i);
      if(s){s.textContent='_';s.style.color='';s.style.borderColor='';}
    });
    document.querySelectorAll('.forma-letter-btn').forEach(b=>b.classList.remove('used'));
  },

  checkOrder(q) {
    this.answered=true;
    const placed=this.selected.map(s=>s.num);
    const correct=[...q.nums].sort((a,b)=>a-b);
    const ok=JSON.stringify(placed)===JSON.stringify(correct);

    document.querySelectorAll('.forma-slot').forEach((s,i)=>{
      s.classList.add(placed[i]===correct[i]?'slot-correct':'slot-wrong');
    });

    if(!ok){
      setTimeout(()=>{
        correct.forEach((n,i)=>{
          const s=document.getElementById('onslot-'+i);
          if(s){s.textContent=n;s.classList.remove('slot-wrong');s.classList.add('slot-correct');}
        });
      },700);
    }

    if(ok){this.correct++;App.confetti();App.speak('¡Muy bien! '+correct.join(', '));}
    else App.speak('El orden es '+correct.join(', '));

    const cb2=document.querySelector('#on-area .btn-clear2');if(cb2)cb2.style.display='none';
    App.showFeedback(ok);
    document.getElementById('on-next').style.display='';
  },

  next() {
    this.idx++;
    const total=DATA.ordenaNums[this.level].length;
    if(this.idx>=total){
      const stars=Math.round((this.correct/total)*5);
      const levels=['easy','medium','hard'];
      const nextLvl=levels[levels.indexOf(this.level)+1];
      App.levelComplete('ordena_nums',stars,
        ()=>GameOrdenaNums.setLevel(this.level),
        nextLvl?()=>GameOrdenaNums.setLevel(nextLvl):null,!!nextLvl);
    } else { this.loadQuestion(); }
  }
};
