const GameCuento = {
  storyIdx:0, sceneIdx:0, choicesMade:[],

  init(container) {
    this.storyIdx=0; this.sceneIdx=0; this.choicesMade=[];
    container.innerHTML=`
      <div class="progress-bar-wrap" style="padding-top:10px">
        <div class="progress-label" id="cu-plabel" style="font-size:1rem"></div>
      </div>
      <div id="cu-area" style="padding-bottom:30px"></div>`;
    this.loadStory();
  },

  loadStory() {
    this.sceneIdx=0; this.choicesMade=[];
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    document.getElementById('cu-plabel').textContent=`📖 ${story.title}`;
    this.loadScene(story.scenes[0]);
  },

  loadScene(scene) {
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    const area=document.getElementById('cu-area');

    if(scene.type==='end'){
      App.confetti(); App.speak(scene.text);
      area.innerHTML=`
        <div style="text-align:center;padding:30px 20px">
          <div style="font-size:5rem;animation:bounceIn 0.6s ease">${scene.emoji}</div>
          <div style="font-family:'Fredoka One',cursive;font-size:1.5rem;color:#1a6fa8;margin:12px 0">${scene.text}</div>
          <div style="font-size:0.95rem;color:#888;margin-bottom:20px">${scene.sub||''}</div>
          <div style="display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto">
            ${this.storyIdx<DATA.cuentos.length-1
              ?`<button class="btn-action btn-next" onclick="GameCuento.nextStory()">Siguiente cuento ➡️</button>`
              :''}
            <button class="btn-action btn-check" onclick="GameCuento.replay()">🔁 Repetir cuento</button>
            <button class="btn-action btn-skip" onclick="App.goHome()">🏠 Inicio</button>
          </div>
        </div>`;
      App.saveScore('cuento',5);
      return;
    }

    App.speak(scene.text);
    const choicesHTML=scene.choices.map((c,i)=>`
      <button class="cuento-choice" onclick="GameCuento.choose(${i})"
        style="background:${ ['#FF6B6B','#6EC6F5','#6BCB77','#C77DFF'][i%4] };box-shadow:0 4px 0 rgba(0,0,0,0.2)">
        <span style="font-size:1.8rem">${c.emoji}</span>
        <span>${c.text}</span>
      </button>`).join('');

    area.innerHTML=`
      <div style="background:white;margin:8px 14px;border-radius:20px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.08);text-align:center">
        <div style="font-size:4rem;margin-bottom:12px">${scene.emoji}</div>
        <div style="font-family:'Nunito',sans-serif;font-size:1rem;color:#444;line-height:1.6;margin-bottom:16px">${scene.text}</div>
        <button onclick="App.speak('${scene.text.replace(/'/g,"\\'")}');this.style.transform='scale(0.9)';setTimeout(()=>this.style.transform='',200)"
          style="background:#6EC6F5;border:none;border-radius:50%;width:44px;height:44px;font-size:1.3rem;cursor:pointer;box-shadow:0 3px 0 #4a9ec9">🔊</button>
      </div>
      <div style="font-family:'Fredoka One',cursive;font-size:0.95rem;color:#aaa;text-align:center;padding:10px 0 6px">¿Qué hace ${story.hero}?</div>
      <div class="cuento-choices">${choicesHTML}</div>`;
  },

  choose(i) {
    const story=DATA.cuentos[this.storyIdx%DATA.cuentos.length];
    const scene=story.scenes[this.sceneIdx];
    const choice=scene.choices[i];
    this.choicesMade.push(i);

    // Show result briefly then go to next scene
    const area=document.getElementById('cu-area');
    const resultDiv=document.createElement('div');
    resultDiv.style.cssText='text-align:center;padding:16px;font-family:Fredoka One,cursive;font-size:1.1rem;color:#45a352;background:#f0fff4;border-radius:16px;margin:8px 14px';
    resultDiv.textContent=choice.result;
    area.appendChild(resultDiv);
    App.speak(choice.result);

    setTimeout(()=>{
      this.sceneIdx++;
      const nextScene=story.scenes[this.sceneIdx]||story.scenes[story.scenes.length-1];
      this.loadScene(nextScene);
    },1800);
  },

  replay() { this.loadStory(); },

  nextStory() {
    this.storyIdx=(this.storyIdx+1)%DATA.cuentos.length;
    this.loadStory();
  }
};
