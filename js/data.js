// ===== GAME DATA =====
const DATA = {

  // ===== FRASES =====
  frases: {
    easy: [
      ["El","gato","duerme"],["La","niña","ríe"],["El","perro","corre"],
      ["El","sol","brilla"],["La","luna","sube"],["El","pez","nada"],
      ["La","vaca","muge"],["El","pato","vuela"],["La","flor","crece"],
      ["El","oso","come"],["La","rana","salta"],["El","tren","pita"],
      ["La","nube","llueve"],["El","gallo","canta"],["La","abeja","zumba"],
    ],
    medium: [
      ["El","pato","nada","feliz"],["La","mariposa","vuela","alto"],
      ["El","niño","come","pan"],["La","pelota","es","roja"],
      ["El","árbol","es","verde"],["Mi","gato","es","negro"],
      ["El","bebé","llora","mucho"],["La","niña","baila","bien"],
      ["El","perro","ladra","fuerte"],["La","tortuga","anda","despacio"],
      ["El","cielo","es","azul"],["La","leche","es","blanca"],
      ["El","globo","sube","alto"],["Mi","mamá","me","abraza"],
      ["El","cohete","va","lejos"],
    ],
    hard: [
      ["El","conejo","salta","muy","alto"],["La","tortuga","camina","muy","despacio"],
      ["Mi","mamá","me","da","un","beso"],["El","pez","nada","en","el","mar"],
      ["El","cohete","vuela","por","el","cielo"],["El","elefante","come","muchas","bananas"],
      ["La","mariposa","tiene","alas","bonitas"],["Mi","perro","juega","en","el","jardín"],
      ["El","niño","come","fruta","cada","día"],["La","abeja","hace","miel","muy","dulce"],
      ["Los","pájaros","cantan","en","el","árbol"],["Mi","gato","duerme","en","su","cama"],
      ["El","sol","sale","cada","día","temprano"],["La","luna","brilla","de","noche","mucho"],
      ["El","viento","mueve","las","hojas","verdes"],
    ]
  },

  // ===== COLOREAR - SVG paths =====
  colorear: [
    {
      name: "🐱 Gatito",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="150" cy="200" rx="80" ry="70" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Head -->
        <circle cx="150" cy="110" r="65" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Ears -->
        <polygon points="100,60 80,20 120,55" fill="white" stroke="#333" stroke-width="3"/>
        <polygon points="200,60 220,20 180,55" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Inner ears -->
        <polygon points="101,58 85,28 118,55" fill="white" stroke="#ccc" stroke-width="1"/>
        <polygon points="199,58 215,28 182,55" fill="white" stroke="#ccc" stroke-width="1"/>
        <!-- Eyes -->
        <ellipse cx="125" cy="105" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
        <ellipse cx="175" cy="105" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
        <circle cx="127" cy="107" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
        <circle cx="177" cy="107" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
        <!-- Nose -->
        <polygon points="150,128 143,135 157,135" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Mouth -->
        <path d="M143,135 Q150,145 157,135" fill="none" stroke="#333" stroke-width="2.5"/>
        <!-- Whiskers -->
        <line x1="90" y1="125" x2="135" y2="130" stroke="#333" stroke-width="1.5"/>
        <line x1="90" y1="133" x2="135" y2="133" stroke="#333" stroke-width="1.5"/>
        <line x1="165" y1="130" x2="210" y2="125" stroke="#333" stroke-width="1.5"/>
        <line x1="165" y1="133" x2="210" y2="133" stroke="#333" stroke-width="1.5"/>
        <!-- Tail -->
        <path d="M220,250 Q280,200 260,160" fill="none" stroke="#333" stroke-width="6" stroke-linecap="round"/>
        <!-- Paws -->
        <ellipse cx="110" cy="260" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
        <ellipse cx="190" cy="260" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
      </svg>`
    },
    {
      name: "🌻 Girasol",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Stem -->
        <rect x="142" y="190" width="16" height="100" rx="8" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Leaves -->
        <ellipse cx="115" cy="230" rx="30" ry="14" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-30 115 230)"/>
        <ellipse cx="185" cy="245" rx="30" ry="14" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(30 185 245)"/>
        <!-- Petals -->
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(45 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(90 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(135 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(180 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(225 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(270 150 150)"/>
        <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(315 150 150)"/>
        <!-- Center -->
        <circle cx="150" cy="150" r="42" fill="white" stroke="#333" stroke-width="3"/>
        <circle cx="150" cy="150" r="30" fill="white" stroke="#333" stroke-width="1.5"/>
      </svg>`
    },
    {
      name: "🚂 Tren",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Rails -->
        <rect x="10" y="255" width="280" height="8" rx="4" fill="white" stroke="#333" stroke-width="2"/>
        <line x1="50" y1="255" x2="50" y2="263" stroke="#333" stroke-width="3"/>
        <line x1="100" y1="255" x2="100" y2="263" stroke="#333" stroke-width="3"/>
        <line x1="150" y1="255" x2="150" y2="263" stroke="#333" stroke-width="3"/>
        <line x1="200" y1="255" x2="200" y2="263" stroke="#333" stroke-width="3"/>
        <line x1="250" y1="255" x2="250" y2="263" stroke="#333" stroke-width="3"/>
        <!-- Wagon -->
        <rect x="120" y="180" width="120" height="70" rx="10" fill="white" stroke="#333" stroke-width="3"/>
        <rect x="135" y="192" width="35" height="28" rx="5" fill="white" stroke="#333" stroke-width="2"/>
        <rect x="185" y="192" width="35" height="28" rx="5" fill="white" stroke="#333" stroke-width="2"/>
        <circle cx="155" cy="252" r="16" fill="white" stroke="#333" stroke-width="3"/>
        <circle cx="215" cy="252" r="16" fill="white" stroke="#333" stroke-width="3"/>
        <circle cx="155" cy="252" r="6" fill="white" stroke="#333" stroke-width="2"/>
        <circle cx="215" cy="252" r="6" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Engine -->
        <rect x="30" y="160" width="100" height="90" rx="12" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Cabin -->
        <rect x="45" y="130" width="60" height="35" rx="8" fill="white" stroke="#333" stroke-width="2.5"/>
        <!-- Window -->
        <rect x="55" y="138" width="22" height="18" rx="4" fill="white" stroke="#333" stroke-width="2"/>
        <rect x="83" y="138" width="14" height="18" rx="4" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Chimney -->
        <rect x="90" y="110" width="20" height="25" rx="5" fill="white" stroke="#333" stroke-width="2.5"/>
        <ellipse cx="100" cy="108" rx="14" ry="6" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Smoke -->
        <circle cx="100" cy="88" r="10" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <circle cx="112" cy="72" r="8" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <!-- Wheels -->
        <circle cx="65" cy="252" r="18" fill="white" stroke="#333" stroke-width="3"/>
        <circle cx="115" cy="252" r="18" fill="white" stroke="#333" stroke-width="3"/>
        <circle cx="65" cy="252" r="7" fill="white" stroke="#333" stroke-width="2"/>
        <circle cx="115" cy="252" r="7" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Connector -->
        <rect x="115" y="218" width="20" height="6" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      </svg>`
    },
    {
      name: "🏠 Casita",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- House body -->
        <rect x="50" y="160" width="200" height="130" rx="5" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Roof -->
        <polygon points="30,165 150,60 270,165" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Door -->
        <rect x="118" y="220" width="64" height="70" rx="8" fill="white" stroke="#333" stroke-width="2.5"/>
        <circle cx="174" cy="258" r="5" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Windows -->
        <rect x="65" y="185" width="55" height="45" rx="6" fill="white" stroke="#333" stroke-width="2.5"/>
        <line x1="92" y1="185" x2="92" y2="230" stroke="#333" stroke-width="1.5"/>
        <line x1="65" y1="207" x2="120" y2="207" stroke="#333" stroke-width="1.5"/>
        <rect x="180" y="185" width="55" height="45" rx="6" fill="white" stroke="#333" stroke-width="2.5"/>
        <line x1="207" y1="185" x2="207" y2="230" stroke="#333" stroke-width="1.5"/>
        <line x1="180" y1="207" x2="235" y2="207" stroke="#333" stroke-width="1.5"/>
        <!-- Chimney -->
        <rect x="195" y="80" width="28" height="60" rx="4" fill="white" stroke="#333" stroke-width="2.5"/>
        <!-- Garden -->
        <ellipse cx="80" cy="295" rx="30" ry="8" fill="white" stroke="#333" stroke-width="1.5"/>
        <rect x="76" y="270" width="8" height="26" rx="4" fill="white" stroke="#333" stroke-width="2"/>
        <circle cx="80" cy="263" r="16" fill="white" stroke="#333" stroke-width="2"/>
      </svg>`
    },
    {
      name: "🦋 Mariposa",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="150" cy="150" rx="8" ry="60" fill="white" stroke="#333" stroke-width="2.5"/>
        <!-- Antennae -->
        <line x1="150" y1="90" x2="125" y2="55" stroke="#333" stroke-width="2"/>
        <circle cx="123" cy="52" r="5" fill="white" stroke="#333" stroke-width="2"/>
        <line x1="150" y1="90" x2="175" y2="55" stroke="#333" stroke-width="2"/>
        <circle cx="177" cy="52" r="5" fill="white" stroke="#333" stroke-width="2"/>
        <!-- Upper wings -->
        <ellipse cx="95" cy="120" rx="60" ry="50" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-15 95 120)"/>
        <ellipse cx="205" cy="120" rx="60" ry="50" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(15 205 120)"/>
        <!-- Wing patterns upper -->
        <circle cx="88" cy="112" r="18" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <circle cx="210" cy="112" r="18" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <circle cx="75" cy="138" r="10" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <circle cx="225" cy="138" r="10" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <!-- Lower wings -->
        <ellipse cx="100" cy="185" rx="50" ry="40" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(20 100 185)"/>
        <ellipse cx="200" cy="185" rx="50" ry="40" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-20 200 185)"/>
        <!-- Wing patterns lower -->
        <circle cx="100" cy="185" r="14" fill="white" stroke="#ccc" stroke-width="1.5"/>
        <circle cx="200" cy="185" r="14" fill="white" stroke="#ccc" stroke-width="1.5"/>
      </svg>`
    },
    {
      name: "🚀 Cohete",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Stars -->
        <circle cx="40" cy="40" r="3" fill="white" stroke="#ccc" stroke-width="1"/>
        <circle cx="260" cy="30" r="2" fill="white" stroke="#ccc" stroke-width="1"/>
        <circle cx="20" cy="120" r="2" fill="white" stroke="#ccc" stroke-width="1"/>
        <circle cx="270" cy="100" r="3" fill="white" stroke="#ccc" stroke-width="1"/>
        <circle cx="55" cy="200" r="2" fill="white" stroke="#ccc" stroke-width="1"/>
        <!-- Rocket body -->
        <rect x="105" y="100" width="90" height="140" rx="12" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Nose cone -->
        <path d="M105,100 Q150,20 195,100" fill="white" stroke="#333" stroke-width="3"/>
        <!-- Window -->
        <circle cx="150" cy="135" r="28" fill="white" stroke="#333" stroke-width="2.5"/>
        <circle cx="150" cy="135" r="18" fill="white" stroke="#333" stroke-width="1.5"/>
        <!-- Fins -->
        <polygon points="105,200 65,250 105,240" fill="white" stroke="#333" stroke-width="2.5"/>
        <polygon points="195,200 235,250 195,240" fill="white" stroke="#333" stroke-width="2.5"/>
        <!-- Flames -->
        <ellipse cx="140" cy="252" rx="14" ry="20" fill="white" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="160" cy="252" rx="14" ry="20" fill="white" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="150" cy="258" rx="10" ry="25" fill="white" stroke="#ccc" stroke-width="1"/>
        <!-- Stripe -->
        <rect x="105" y="165" width="90" height="16" rx="0" fill="white" stroke="#ccc" stroke-width="1.5"/>
      </svg>`
    },
  ],

  // ===== PUNTOS (connect the dots) =====
  puntos: {
    easy: [
      {
        name: "🌟 Estrella",
        points: [
          {n:1, x:150, y:40}, {n:2, x:190, y:120}, {n:3, x:275, y:120},
          {n:4, x:210, y:175}, {n:5, x:235, y:260}, {n:6, x:150, y:210},
          {n:7, x:65, y:260},  {n:8, x:90, y:175},  {n:9, x:25, y:120},
          {n:10, x:110, y:120}
        ]
      },
      {
        name: "🏠 Casa",
        points: [
          {n:1, x:150, y:40}, {n:2, x:260, y:130}, {n:3, x:260, y:270},
          {n:4, x:40, y:270}, {n:5, x:40, y:130}
        ]
      },
    ],
    medium: [
      {
        name: "🐟 Pez",
        points: [
          {n:1, x:260, y:150},{n:2, x:220, y:100},{n:3, x:170, y:80},
          {n:4, x:120, y:90}, {n:5, x:80, y:130}, {n:6, x:70, y:150},
          {n:7, x:80, y:170}, {n:8, x:120, y:210},{n:9, x:170, y:220},
          {n:10, x:220, y:200},{n:11, x:260, y:150},{n:12, x:290, y:110},
          {n:13, x:290, y:190}
        ]
      },
      {
        name: "🦆 Pato",
        points: [
          {n:1,x:150,y:40},{n:2,x:190,y:60},{n:3,x:210,y:90},
          {n:4,x:200,y:120},{n:5,x:230,y:130},{n:6,x:240,y:110},
          {n:7,x:260,y:120},{n:8,x:220,y:150},{n:9,x:200,y:180},
          {n:10,x:220,y:230},{n:11,x:200,y:260},{n:12,x:150,y:265},
          {n:13,x:100,y:260},{n:14,x:80,y:230},{n:15,x:100,y:180}
        ]
      }
    ],
    hard: [
      {
        name: "🦋 Mariposa",
        points: [
          {n:1,x:150,y:80},{n:2,x:120,y:60},{n:3,x:80,y:55},
          {n:4,x:50,y:80},{n:5,x:40,y:120},{n:6,x:60,y:160},
          {n:7,x:100,y:180},{n:8,x:140,y:165},{n:9,x:150,y:150},
          {n:10,x:160,y:165},{n:11,x:200,y:180},{n:12,x:240,y:160},
          {n:13,x:260,y:120},{n:14,x:250,y:80},{n:15,x:220,y:55},
          {n:16,x:180,y:60},{n:17,x:150,y:80},{n:18,x:145,y:220},
          {n:19,x:110,y:260},{n:20,x:150,y:255},{n:21,x:190,y:260},{n:22,x:155,y:220}
        ]
      }
    ]
  },

  // ===== LETRAS =====
  letras: {
    upper: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','U','V'],
    lower: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v'],
    nums:  ['1','2','3','4','5','6','7','8','9','0']
  },

  // ===== CONTAR =====
  contar: {
    easy: [
      {emoji:'🍎', count:3, options:[2,3,5]},
      {emoji:'⭐', count:2, options:[1,2,4]},
      {emoji:'🐶', count:4, options:[3,4,6]},
      {emoji:'🌸', count:5, options:[4,5,3]},
      {emoji:'🍕', count:1, options:[1,2,3]},
      {emoji:'🐸', count:3, options:[2,3,4]},
      {emoji:'🍌', count:2, options:[1,2,5]},
      {emoji:'🚗', count:4, options:[3,4,5]},
      {emoji:'🦋', count:5, options:[5,3,2]},
      {emoji:'🎈', count:3, options:[2,3,6]},
    ],
    medium: [
      {emoji:'🍊', count:6, options:[5,6,8]},
      {emoji:'🐱', count:7, options:[6,7,9]},
      {emoji:'🌟', count:8, options:[7,8,6]},
      {emoji:'🍦', count:9, options:[8,9,7]},
      {emoji:'🐟', count:6, options:[4,6,8]},
      {emoji:'🎀', count:7, options:[5,7,9]},
      {emoji:'🐝', count:8, options:[6,8,10]},
      {emoji:'🍓', count:10, options:[8,9,10]},
      {emoji:'⚽', count:6, options:[5,6,7]},
      {emoji:'🦁', count:9, options:[7,9,11]},
    ],
    hard: [
      {emoji:'🍇', count:12, options:[10,12,14]},
      {emoji:'⭐', count:15, options:[13,15,17]},
      {emoji:'🐣', count:11, options:[10,11,13]},
      {emoji:'🌸', count:14, options:[12,14,16]},
      {emoji:'🍭', count:13, options:[11,13,15]},
      {emoji:'🦆', count:10, options:[9,10,12]},
      {emoji:'🎯', count:16, options:[14,16,18]},
      {emoji:'🐠', count:12, options:[11,12,14]},
      {emoji:'🍄', count:11, options:[10,11,9]},
      {emoji:'🎪', count:15, options:[13,15,12]},
    ]
  },

  // ===== SOMBRAS =====
  sombras: [
    {answer:'🐘', options:['🐘','🐬','🦒'], label:'elefante'},
    {answer:'🦒', options:['🐘','🦒','🐊'], label:'jirafa'},
    {answer:'🐬', options:['🐟','🐬','🦈'], label:'delfín'},
    {answer:'🦁', options:['🐯','🦁','🐻'], label:'león'},
    {answer:'🐊', options:['🦎','🐊','🐸'], label:'cocodrilo'},
    {answer:'🦈', options:['🐟','🦈','🐬'], label:'tiburón'},
    {answer:'🐙', options:['🦑','🐙','🦀'], label:'pulpo'},
    {answer:'🦀', options:['🐙','🦀','🦞'], label:'cangrejo'},
    {answer:'🦋', options:['🐝','🦋','🐞'], label:'mariposa'},
    {answer:'🐸', options:['🐊','🦎','🐸'], label:'rana'},
    {answer:'🦚', options:['🦜','🦚','🐦'], label:'pavo real'},
    {answer:'🦭', options:['🐧','🦭','🐋'], label:'foca'},
    {answer:'🐋', options:['🐬','🦭','🐋'], label:'ballena'},
    {answer:'🦜', options:['🦜','🦚','🐦'], label:'loro'},
    {answer:'🐞', options:['🐝','🦋','🐞'], label:'mariquita'},
  ]
};
