const GameCuento = {
  storyIdx:0, sceneIdx:0,

  init(container) {
    this.storyIdx=0; this.sceneIdx=0;
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-label" id="cu-plabel" style="font-size:1rem;text-align:center;padding:4px"></div>
      </div>
      <div id="cu-area" style="padding-bottom:30px"></div>`;
    this.loadStory();
  },

  loadStory() {
    this.sceneIdx=0;
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    document.getElementById('cu-plabel').textContent=`📖 ${story.title}`;
    this.showScene(story.scenes[0]);
  },

  // speak() that waits for the first utterance to finish before starting the second
  speakSequence(texts, onDone) {
    if(!('speechSynthesis' in window)) { if(onDone) onDone(); return; }
    speechSynthesis.cancel();
    let i=0;
    const next=()=>{
      if(i>=texts.length){ if(onDone) onDone(); return; }
      const u=new SpeechSynthesisUtterance(texts[i++]);
      u.lang='es-ES'; u.rate=0.82; u.pitch=1.1;
      u.onend=next;
      u.onerror=next;
      speechSynthesis.speak(u);
    };
    // Small delay to let cancel() settle on iOS/Android
    setTimeout(next, 120);
  },

  showScene(scene) {
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    const area=document.getElementById('cu-area');

    if(scene.type==='end'){
      area.innerHTML=`
        <div style="text-align:center;padding:30px 20px">
          <div style="font-size:5rem;animation:bounceIn 0.6s ease">${scene.emoji}</div>
          <div style="font-family:'Fredoka One',cursive;font-size:1.5rem;color:#1a6fa8;margin:12px 0">${scene.text}</div>
          <div style="font-size:0.95rem;color:#888;margin-bottom:24px">${scene.sub||''}</div>
          <div style="display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto">
            ${this.storyIdx<DATA.cuentos.length-1
              ?`<button class="btn-action btn-next" onclick="GameCuento.nextStory()">Siguiente cuento ➡️</button>`:''}
            <button class="btn-action btn-check" onclick="GameCuento.replay()">🔁 Repetir cuento</button>
            <button class="btn-action btn-skip"  onclick="App.goHome()">🏠 Inicio</button>
          </div>
        </div>`;
      App.confetti();
      App.saveScore('cuento',5);
      this.speakSequence([scene.text, scene.sub||'']);
      return;
    }

    // Render scene immediately (buttons disabled until narration ends)
    const choicesHTML=scene.choices.map((c,i)=>`
      <button class="cuento-choice" id="cch-${i}"
        style="background:${ ['#FF6B6B','#6EC6F5','#6BCB77','#C77DFF'][i%4] };box-shadow:0 4px 0 rgba(0,0,0,0.2);opacity:0.5;pointer-events:none"
        onclick="GameCuento.choose(${i})">
        <span style="font-size:1.8rem">${c.emoji}</span>
        <span>${c.text}</span>
      </button>`).join('');

    area.innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.08);text-align:center">
        <div style="font-size:4rem;margin-bottom:12px">${scene.emoji}</div>
        <div style="font-family:'Nunito',sans-serif;font-size:1rem;color:#444;line-height:1.6;margin-bottom:14px" id="cu-text">${scene.text}</div>
        <button id="cu-reread"
          style="background:#6EC6F5;border:none;border-radius:50%;width:44px;height:44px;font-size:1.3rem;cursor:pointer;box-shadow:0 3px 0 #4a9ec9"
          onclick="GameCuento.reread()">🔊</button>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.95rem;color:#aaa;text-align:center;padding:10px 0 6px" id="cu-hint">
        🔊 Escucha el cuento...
      </div>
      <div class="cuento-choices" id="cu-choices">${choicesHTML}</div>`;

    // Narrate, then enable buttons
    this.speakSequence([scene.text], ()=>{
      document.getElementById('cu-hint').textContent=`¿Qué hace ${story.hero}?`;
      document.querySelectorAll('.cuento-choice').forEach(b=>{
        b.style.opacity='1'; b.style.pointerEvents='auto';
      });
    });
  },

  reread() {
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    const scene=story.scenes[this.sceneIdx];
    this.speakSequence([scene.text]);
  },

  choose(i) {
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    const scene=story.scenes[this.sceneIdx];
    const choice=scene.choices[i];

    // Disable all choices immediately
    document.querySelectorAll('.cuento-choice').forEach(b=>{ b.style.opacity='0.5'; b.style.pointerEvents='none'; });
    document.getElementById('cu-hint').textContent=choice.result;

    // Speak result, then advance to next scene
    this.speakSequence([choice.result], ()=>{
      this.sceneIdx++;
      const nextScene=story.scenes[this.sceneIdx];
      if(nextScene) this.showScene(nextScene);
    });
  },

  replay()    { this.loadStory(); },
  nextStory() { this.storyIdx=(this.storyIdx+1)%DATA.cuentos.length; this.loadStory(); }
};
