const DATA = {

// ===== FRASES (45 fácil, 45 medio, 45 difícil) =====
frases: {
  easy: [
    ["El","gato","duerme"],["La","niña","ríe"],["El","perro","corre"],
    ["El","sol","brilla"],["La","luna","sube"],["El","pez","nada"],
    ["La","vaca","muge"],["El","pato","vuela"],["La","flor","crece"],
    ["El","oso","come"],["La","rana","salta"],["El","tren","pita"],
    ["La","nube","llueve"],["El","gallo","canta"],["La","abeja","zumba"],
    ["El","lobo","aúlla"],["La","oveja","bala"],["El","burro","rebuzna"],
    ["La","paloma","vuela"],["El","ratón","corre"],["La","araña","teje"],
    ["El","caballo","trota"],["La","tortuga","anda"],["El","mono","salta"],
    ["La","jirafa","come"],["El","elefante","bebe"],["La","mariposa","vuela"],
    ["El","cocodrilo","nada"],["La","serpiente","repta"],["El","tigre","ruge"],
    ["La","foca","nada"],["El","loro","habla"],["La","ardilla","trepa"],
    ["El","ciervo","corre"],["La","ballena","nada"],["El","delfín","salta"],
    ["La","lechuza","vuela"],["El","pingüino","camina"],["La","cebra","galopa"],
    ["El","rinoceronte","come"],["La","pantera","corre"],["El","búho","mira"],
    ["La","golondrina","vuela"],["El","camello","anda"],["La","llama","pasta"],
  ],
  medium: [
    ["El","pato","nada","feliz"],["La","mariposa","vuela","alto"],
    ["El","niño","come","pan"],["La","pelota","es","roja"],
    ["El","árbol","es","verde"],["Mi","gato","es","negro"],
    ["El","bebé","llora","mucho"],["La","niña","baila","bien"],
    ["El","perro","ladra","fuerte"],["La","tortuga","anda","despacio"],
    ["El","cielo","es","azul"],["La","leche","es","blanca"],
    ["El","globo","sube","alto"],["Mi","mamá","me","abraza"],
    ["El","cohete","va","lejos"],["La","nieve","es","fría"],
    ["El","fuego","es","caliente"],["La","música","suena","bonita"],
    ["El","libro","es","grande"],["Mi","casa","es","bonita"],
    ["El","chocolate","es","rico"],["La","pizza","sabe","bien"],
    ["El","pájaro","canta","fuerte"],["La","lluvia","cae","despacio"],
    ["Mi","papá","trabaja","mucho"],["El","cocodrilo","mueve","la","cola"],
    ["La","araña","teje","su","tela"],["El","caracol","lleva","su","casa"],
    ["La","hormiga","carga","la","hoja"],["Mi","perro","mueve","el","rabo"],
    ["El","gato","bebe","su","leche"],["La","abeja","hace","la","miel"],
    ["El","sol","calienta","la","tierra"],["La","luna","alumbra","la","noche"],
    ["Mi","abuelo","cuenta","cuentos"],["La","maestra","explica","muy","bien"],
    ["El","bombero","apaga","el","fuego"],["La","doctora","cuida","a","todos"],
    ["Mi","bicicleta","es","muy","rápida"],["El","autobús","lleva","muchos","niños"],
    ["La","manzana","es","muy","dulce"],["El","limón","es","muy","ácido"],
    ["La","sandía","es","de","verano"],["Mi","juguete","es","de","colores"],
    ["El","parque","está","muy","lleno"],
  ],
  hard: [
    ["El","conejo","salta","muy","alto"],["La","tortuga","camina","muy","despacio"],
    ["Mi","mamá","me","da","un","beso"],["El","pez","nada","en","el","mar"],
    ["El","cohete","vuela","por","el","cielo"],["El","elefante","come","muchas","bananas"],
    ["La","mariposa","tiene","alas","bonitas"],["Mi","perro","juega","en","el","jardín"],
    ["El","niño","come","fruta","cada","día"],["La","abeja","hace","miel","muy","dulce"],
    ["Los","pájaros","cantan","en","el","árbol"],["Mi","gato","duerme","en","su","cama"],
    ["El","sol","sale","cada","día","temprano"],["La","luna","brilla","de","noche","mucho"],
    ["El","viento","mueve","las","hojas","verdes"],["Mi","hermana","lee","libros","muy","grandes"],
    ["El","tren","viaja","muy","rápido","hoy"],["La","profesora","enseña","con","mucho","amor"],
    ["Los","niños","juegan","en","el","parque"],["Mi","familia","va","al","campo","hoy"],
    ["El","perro","corre","por","la","playa"],["La","sirena","nada","en","el","mar","azul"],
    ["El","mago","saca","conejos","del","sombrero"],["Mi","abuela","hace","galletas","muy","ricas"],
    ["Los","pollitos","siguen","a","la","gallina"],["La","granja","tiene","muchos","animales","bonitos"],
    ["El","astronauta","viaja","por","el","espacio"],["Mi","pelota","rueda","por","el","pasillo"],
    ["Los","peces","nadan","en","el","acuario"],["La","ballena","salta","fuera","del","agua"],
    ["El","dinosaurio","vivió","hace","mucho","tiempo"],["Mi","cumpleaños","es","en","el","verano"],
    ["Los","coches","circulan","por","la","autopista"],["La","mariposa","posa","en","la","flor"],
    ["El","payaso","hace","reír","a","los","niños"],["Mi","mochila","está","llena","de","libros"],
    ["Los","gatitos","juegan","con","una","pelota"],["La","princesa","vive","en","su","castillo"],
    ["El","dragón","lanza","fuego","por","la","boca"],["Mi","muñeca","tiene","el","pelo","largo"],
    ["Los","caballos","corren","por","el","campo"],["La","tortuga","lleva","su","casa","a","cuestas"],
    ["El","mono","trepa","por","los","árboles","altos"],["La","cigüeña","construye","su","nido","arriba"],
    ["Los","delfines","saltan","en","el","océano","azul"],
  ]
},

// ===== COLOREAR SVGs =====
colorear: [
  {
    name:"🐱 Gatito",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="200" rx="80" ry="70" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="110" r="65" fill="white" stroke="#333" stroke-width="3"/>
      <polygon points="100,60 80,20 120,55" fill="white" stroke="#333" stroke-width="3"/>
      <polygon points="200,60 220,20 180,55" fill="white" stroke="#333" stroke-width="3"/>
      <ellipse cx="125" cy="105" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="175" cy="105" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="127" cy="107" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
      <circle cx="177" cy="107" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
      <polygon points="150,128 143,135 157,135" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M143,135 Q150,145 157,135" fill="none" stroke="#333" stroke-width="2.5"/>
      <line x1="90" y1="125" x2="135" y2="130" stroke="#333" stroke-width="1.5"/>
      <line x1="90" y1="133" x2="135" y2="133" stroke="#333" stroke-width="1.5"/>
      <line x1="165" y1="130" x2="210" y2="125" stroke="#333" stroke-width="1.5"/>
      <line x1="165" y1="133" x2="210" y2="133" stroke="#333" stroke-width="1.5"/>
      <path d="M220,250 Q280,200 260,160" fill="none" stroke="#333" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="110" cy="260" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="190" cy="260" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
    </svg>`
  },
  {
    name:"🌻 Girasol",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="142" y="190" width="16" height="100" rx="8" fill="white" stroke="#333" stroke-width="3"/>
      <ellipse cx="115" cy="230" rx="30" ry="14" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-30 115 230)"/>
      <ellipse cx="185" cy="245" rx="30" ry="14" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(30 185 245)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(45 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(90 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(135 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(180 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(225 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(270 150 150)"/>
      <ellipse cx="150" cy="70" rx="18" ry="32" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(315 150 150)"/>
      <circle cx="150" cy="150" r="42" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="150" r="30" fill="white" stroke="#333" stroke-width="1.5"/>
    </svg>`
  },
  {
    name:"🚂 Tren",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="255" width="280" height="8" rx="4" fill="white" stroke="#333" stroke-width="2"/>
      <line x1="50" y1="255" x2="50" y2="263" stroke="#333" stroke-width="3"/>
      <line x1="100" y1="255" x2="100" y2="263" stroke="#333" stroke-width="3"/>
      <line x1="150" y1="255" x2="150" y2="263" stroke="#333" stroke-width="3"/>
      <line x1="200" y1="255" x2="200" y2="263" stroke="#333" stroke-width="3"/>
      <line x1="250" y1="255" x2="250" y2="263" stroke="#333" stroke-width="3"/>
      <rect x="120" y="180" width="120" height="70" rx="10" fill="white" stroke="#333" stroke-width="3"/>
      <rect x="135" y="192" width="35" height="28" rx="5" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="185" y="192" width="35" height="28" rx="5" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="155" cy="252" r="16" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="215" cy="252" r="16" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="155" cy="252" r="6" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="215" cy="252" r="6" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="30" y="160" width="100" height="90" rx="12" fill="white" stroke="#333" stroke-width="3"/>
      <rect x="45" y="130" width="60" height="35" rx="8" fill="white" stroke="#333" stroke-width="2.5"/>
      <rect x="55" y="138" width="22" height="18" rx="4" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="90" y="110" width="20" height="25" rx="5" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="100" cy="108" rx="14" ry="6" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="100" cy="88" r="10" fill="white" stroke="#ccc" stroke-width="1.5"/>
      <circle cx="65" cy="252" r="18" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="115" cy="252" r="18" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="65" cy="252" r="7" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="115" cy="252" r="7" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    name:"🏠 Casita",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="160" width="200" height="130" rx="5" fill="white" stroke="#333" stroke-width="3"/>
      <polygon points="30,165 150,60 270,165" fill="white" stroke="#333" stroke-width="3"/>
      <rect x="118" y="220" width="64" height="70" rx="8" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="174" cy="258" r="5" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="65" y="185" width="55" height="45" rx="6" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="92" y1="185" x2="92" y2="230" stroke="#333" stroke-width="1.5"/>
      <line x1="65" y1="207" x2="120" y2="207" stroke="#333" stroke-width="1.5"/>
      <rect x="180" y="185" width="55" height="45" rx="6" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="207" y1="185" x2="207" y2="230" stroke="#333" stroke-width="1.5"/>
      <line x1="180" y1="207" x2="235" y2="207" stroke="#333" stroke-width="1.5"/>
      <rect x="195" y="80" width="28" height="60" rx="4" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="80" cy="295" rx="30" ry="8" fill="white" stroke="#333" stroke-width="1.5"/>
      <rect x="76" y="270" width="8" height="26" rx="4" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="80" cy="263" r="16" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    name:"🦋 Mariposa",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="150" rx="8" ry="60" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="150" y1="90" x2="125" y2="55" stroke="#333" stroke-width="2"/>
      <circle cx="123" cy="52" r="5" fill="white" stroke="#333" stroke-width="2"/>
      <line x1="150" y1="90" x2="175" y2="55" stroke="#333" stroke-width="2"/>
      <circle cx="177" cy="52" r="5" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="95" cy="120" rx="60" ry="50" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-15 95 120)"/>
      <ellipse cx="205" cy="120" rx="60" ry="50" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(15 205 120)"/>
      <circle cx="88" cy="112" r="18" fill="white" stroke="#ccc" stroke-width="1.5"/>
      <circle cx="210" cy="112" r="18" fill="white" stroke="#ccc" stroke-width="1.5"/>
      <ellipse cx="100" cy="185" rx="50" ry="40" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(20 100 185)"/>
      <ellipse cx="200" cy="185" rx="50" ry="40" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-20 200 185)"/>
      <circle cx="100" cy="185" r="14" fill="white" stroke="#ccc" stroke-width="1.5"/>
      <circle cx="200" cy="185" r="14" fill="white" stroke="#ccc" stroke-width="1.5"/>
    </svg>`
  },
  {
    name:"🚀 Cohete",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="3" fill="white" stroke="#ccc" stroke-width="1"/>
      <circle cx="260" cy="30" r="2" fill="white" stroke="#ccc" stroke-width="1"/>
      <circle cx="20" cy="120" r="2" fill="white" stroke="#ccc" stroke-width="1"/>
      <circle cx="270" cy="100" r="3" fill="white" stroke="#ccc" stroke-width="1"/>
      <rect x="105" y="100" width="90" height="140" rx="12" fill="white" stroke="#333" stroke-width="3"/>
      <path d="M105,100 Q150,20 195,100" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="135" r="28" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="150" cy="135" r="18" fill="white" stroke="#333" stroke-width="1.5"/>
      <polygon points="105,200 65,250 105,240" fill="white" stroke="#333" stroke-width="2.5"/>
      <polygon points="195,200 235,250 195,240" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="140" cy="252" rx="14" ry="20" fill="white" stroke="#ddd" stroke-width="1.5"/>
      <ellipse cx="160" cy="252" rx="14" ry="20" fill="white" stroke="#ddd" stroke-width="1.5"/>
      <rect x="105" y="165" width="90" height="16" fill="white" stroke="#ccc" stroke-width="1.5"/>
    </svg>`
  },
  {
    name:"🐶 Perrito",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="200" rx="85" ry="72" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="108" r="68" fill="white" stroke="#333" stroke-width="3"/>
      <ellipse cx="100" cy="70" rx="22" ry="38" fill="white" stroke="#333" stroke-width="3" transform="rotate(-15 100 70)"/>
      <ellipse cx="200" cy="70" rx="22" ry="38" fill="white" stroke="#333" stroke-width="3" transform="rotate(15 200 70)"/>
      <ellipse cx="122" cy="108" rx="16" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="178" cy="108" rx="16" ry="18" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="124" cy="110" r="8" fill="white" stroke="#333" stroke-width="1.5"/>
      <circle cx="180" cy="110" r="8" fill="white" stroke="#333" stroke-width="1.5"/>
      <ellipse cx="150" cy="132" rx="22" ry="14" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M138,140 Q150,155 162,140" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="88" y1="128" x2="130" y2="134" stroke="#333" stroke-width="1.5"/>
      <line x1="88" y1="136" x2="130" y2="136" stroke="#333" stroke-width="1.5"/>
      <line x1="170" y1="134" x2="212" y2="128" stroke="#333" stroke-width="1.5"/>
      <line x1="170" y1="136" x2="212" y2="136" stroke="#333" stroke-width="1.5"/>
      <path d="M225,240 Q280,210 265,175" fill="none" stroke="#333" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="108" cy="262" rx="30" ry="20" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="192" cy="262" rx="30" ry="20" fill="white" stroke="#333" stroke-width="2.5"/>
    </svg>`
  },
  {
    name:"🌈 Arcoíris",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,220 Q150,20 280,220" fill="none" stroke="#333" stroke-width="28"/>
      <path d="M20,220 Q150,20 280,220" fill="none" stroke="white" stroke-width="24"/>
      <path d="M38,220 Q150,42 262,220" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M56,220 Q150,64 244,220" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M74,220 Q150,86 226,220" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M92,220 Q150,108 208,220" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M110,220 Q150,130 190,220" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="50" cy="230" rx="35" ry="25" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="30" cy="240" rx="28" ry="20" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="70" cy="242" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="250" cy="230" rx="35" ry="25" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="270" cy="240" rx="28" ry="20" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="230" cy="242" rx="28" ry="18" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    name:"🐠 Pececito",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="140" cy="155" rx="95" ry="60" fill="white" stroke="#333" stroke-width="3"/>
      <polygon points="235,155 285,110 285,200" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="80" cy="140" r="18" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="75" cy="137" r="8" fill="white" stroke="#333" stroke-width="1.5"/>
      <path d="M140,100 Q180,80 220,100" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M140,100 Q180,120 220,100" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M130,210 Q140,240 160,210" fill="none" stroke="#333" stroke-width="2"/>
      <line x1="110" y1="115" x2="110" y2="195" stroke="#333" stroke-width="1.5"/>
      <line x1="145" y1="100" x2="145" y2="210" stroke="#333" stroke-width="1.5"/>
      <line x1="175" y1="100" x2="175" y2="210" stroke="#333" stroke-width="1.5"/>
      <circle cx="70" cy="138" r="3" fill="#333"/>
      <path d="M55,155 Q40,175 55,195 Q80,200 85,175" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    name:"🦁 León",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="140" r="90" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="140" r="62" fill="white" stroke="#333" stroke-width="3"/>
      <ellipse cx="119" cy="138" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="181" cy="138" rx="14" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="121" cy="140" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
      <circle cx="183" cy="140" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
      <ellipse cx="150" cy="160" rx="24" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M136,167 Q150,180 164,167" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="108" cy="55" rx="16" ry="20" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="192" cy="55" rx="16" ry="20" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="88" y1="155" x2="126" y2="162" stroke="#333" stroke-width="1.5"/>
      <line x1="88" y1="163" x2="126" y2="164" stroke="#333" stroke-width="1.5"/>
      <line x1="174" y1="162" x2="212" y2="155" stroke="#333" stroke-width="1.5"/>
      <line x1="174" y1="164" x2="212" y2="163" stroke="#333" stroke-width="1.5"/>
      <ellipse cx="150" cy="255" rx="65" ry="40" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="100" cy="278" rx="25" ry="15" fill="white" stroke="#333" stroke-width="2"/>
      <ellipse cx="200" cy="278" rx="25" ry="15" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M260,200 Q295,230 285,260" fill="none" stroke="#333" stroke-width="6" stroke-linecap="round"/>
      <circle cx="282" cy="265" r="10" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
],

// ===== PUNTOS =====
puntos: {
  easy:[
    {name:"🌟 Estrella",points:[{n:1,x:150,y:40},{n:2,x:190,y:120},{n:3,x:275,y:120},{n:4,x:210,y:175},{n:5,x:235,y:260},{n:6,x:150,y:210},{n:7,x:65,y:260},{n:8,x:90,y:175},{n:9,x:25,y:120},{n:10,x:110,y:120}]},
    {name:"🏠 Casa",points:[{n:1,x:150,y:40},{n:2,x:260,y:130},{n:3,x:260,y:270},{n:4,x:40,y:270},{n:5,x:40,y:130}]},
    {name:"❤️ Corazón",points:[{n:1,x:150,y:80},{n:2,x:200,y:40},{n:3,x:250,y:60},{n:4,x:265,y:110},{n:5,x:230,y:160},{n:6,x:150,y:240},{n:7,x:70,y:160},{n:8,x:35,y:110},{n:9,x:50,y:60},{n:10,x:100,y:40}]},
    {name:"🔶 Diamante",points:[{n:1,x:150,y:30},{n:2,x:270,y:150},{n:3,x:150,y:270},{n:4,x:30,y:150}]},
    {name:"🌙 Luna",points:[{n:1,x:200,y:40},{n:2,x:250,y:90},{n:3,x:260,y:155},{n:4,x:240,y:220},{n:5,x:190,y:265},{n:6,x:130,y:275},{n:7,x:100,y:240},{n:8,x:160,y:215},{n:9,x:185,y:155},{n:10,x:165,y:90}]},
  ],
  medium:[
    {name:"🐟 Pez",points:[{n:1,x:260,y:150},{n:2,x:220,y:100},{n:3,x:170,y:80},{n:4,x:120,y:90},{n:5,x:80,y:130},{n:6,x:70,y:150},{n:7,x:80,y:170},{n:8,x:120,y:210},{n:9,x:170,y:220},{n:10,x:220,y:200},{n:11,x:260,y:150},{n:12,x:290,y:110},{n:13,x:290,y:190}]},
    {name:"🦆 Pato",points:[{n:1,x:150,y:40},{n:2,x:190,y:60},{n:3,x:210,y:90},{n:4,x:200,y:120},{n:5,x:230,y:130},{n:6,x:240,y:110},{n:7,x:260,y:120},{n:8,x:220,y:150},{n:9,x:200,y:180},{n:10,x:220,y:230},{n:11,x:200,y:260},{n:12,x:150,y:265},{n:13,x:100,y:260},{n:14,x:80,y:230},{n:15,x:100,y:180}]},
    {name:"🐌 Caracol",points:[{n:1,x:200,y:200},{n:2,x:240,y:160},{n:3,x:245,y:110},{n:4,x:215,y:70},{n:5,x:165,y:55},{n:6,x:115,y:70},{n:7,x:80,y:110},{n:8,x:75,y:160},{n:9,x:100,y:200},{n:10,x:145,y:218},{n:11,x:185,y:210},{n:12,x:210,y:185},{n:13,x:215,y:155},{n:14,x:195,y:130},{n:15,x:165,y:122}]},
    {name:"🌂 Paraguas",points:[{n:1,x:150,y:40},{n:2,x:220,y:70},{n:3,x:265,y:130},{n:4,x:260,y:175},{n:5,x:210,y:160},{n:6,x:165,y:140},{n:7,x:150,y:170},{n:8,x:135,y:140},{n:9,x:90,y:160},{n:10,x:40,y:175},{n:11,x:35,y:130},{n:12,x:80,y:70}]},
    {name:"🚗 Coche",points:[{n:1,x:60,y:190},{n:2,x:60,y:150},{n:3,x:100,y:110},{n:4,x:170,y:100},{n:5,x:230,y:110},{n:6,x:260,y:150},{n:7,x:260,y:190},{n:8,x:220,y:190},{n:9,x:200,y:210},{n:10,x:170,y:215},{n:11,x:140,y:210},{n:12,x:120,y:190},{n:13,x:100,y:190}]},
  ],
  hard:[
    {name:"🦋 Mariposa",points:[{n:1,x:150,y:80},{n:2,x:120,y:60},{n:3,x:80,y:55},{n:4,x:50,y:80},{n:5,x:40,y:120},{n:6,x:60,y:160},{n:7,x:100,y:180},{n:8,x:140,y:165},{n:9,x:150,y:150},{n:10,x:160,y:165},{n:11,x:200,y:180},{n:12,x:240,y:160},{n:13,x:260,y:120},{n:14,x:250,y:80},{n:15,x:220,y:55},{n:16,x:180,y:60},{n:17,x:150,y:80},{n:18,x:145,y:220},{n:19,x:110,y:260},{n:20,x:150,y:255},{n:21,x:190,y:260},{n:22,x:155,y:220}]},
    {name:"🐘 Elefante",points:[{n:1,x:60,y:80},{n:2,x:100,y:50},{n:3,x:160,y:45},{n:4,x:210,y:60},{n:5,x:250,y:90},{n:6,x:265,y:140},{n:7,x:250,y:190},{n:8,x:220,y:220},{n:9,x:200,y:260},{n:10,x:175,y:285},{n:11,x:155,y:260},{n:12,x:160,y:220},{n:13,x:145,y:260},{n:14,x:125,y:285},{n:15,x:105,y:260},{n:16,x:110,y:220},{n:17,x:90,y:260},{n:18,x:70,y:280},{n:19,x:55,y:255},{n:20,x:65,y:220},{n:21,x:60,y:180},{n:22,x:40,y:140},{n:23,x:45,y:100}]},
    {name:"🏰 Castillo",points:[{n:1,x:40,y:280},{n:2,x:40,y:180},{n:3,x:60,y:180},{n:4,x:60,y:200},{n:5,x:80,y:200},{n:6,x:80,y:180},{n:7,x:100,y:180},{n:8,x:100,y:130},{n:9,x:80,y:100},{n:10,x:80,y:80},{n:11,x:100,y:80},{n:12,x:100,y:100},{n:13,x:130,y:100},{n:14,x:130,y:60},{n:15,x:150,y:40},{n:16,x:170,y:60},{n:17,x:170,y:100},{n:18,x:200,y:100},{n:19,x:200,y:80},{n:20,x:220,y:80},{n:21,x:220,y:100},{n:22,x:200,y:130},{n:23,x:200,y:180},{n:24,x:220,y:180},{n:25,x:220,y:200},{n:26,x:240,y:200},{n:27,x:240,y:180},{n:28,x:260,y:180},{n:29,x:260,y:280}]},
  ]
},

// ===== LETRAS =====
letras: {
  upper:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  lower:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
  nums: ['0','1','2','3','4','5','6','7','8','9']
},

// ===== CONTAR (30 por nivel) =====
contar: {
  easy:[
    {emoji:'🍎',count:3,options:[2,3,5]},{emoji:'⭐',count:2,options:[1,2,4]},
    {emoji:'🐶',count:4,options:[3,4,6]},{emoji:'🌸',count:5,options:[4,5,3]},
    {emoji:'🍕',count:1,options:[1,2,3]},{emoji:'🐸',count:3,options:[2,3,4]},
    {emoji:'🍌',count:2,options:[1,2,5]},{emoji:'🚗',count:4,options:[3,4,5]},
    {emoji:'🦋',count:5,options:[5,3,2]},{emoji:'🎈',count:3,options:[2,3,6]},
    {emoji:'🍦',count:2,options:[1,2,4]},{emoji:'🐱',count:4,options:[3,4,2]},
    {emoji:'🌺',count:5,options:[4,5,6]},{emoji:'🐥',count:3,options:[2,3,5]},
    {emoji:'🍉',count:1,options:[1,2,3]},{emoji:'🎀',count:4,options:[3,4,5]},
    {emoji:'🐠',count:2,options:[1,2,3]},{emoji:'🌈',count:3,options:[2,3,4]},
    {emoji:'🍓',count:5,options:[4,5,3]},{emoji:'🦊',count:4,options:[3,4,6]},
    {emoji:'🐢',count:2,options:[1,2,4]},{emoji:'🌙',count:3,options:[2,3,5]},
    {emoji:'🍇',count:4,options:[3,4,5]},{emoji:'🐧',count:5,options:[4,5,2]},
    {emoji:'🎃',count:3,options:[2,3,4]},{emoji:'🌻',count:2,options:[1,2,5]},
    {emoji:'🍭',count:4,options:[3,4,6]},{emoji:'🐼',count:3,options:[2,3,5]},
    {emoji:'🦄',count:2,options:[1,2,3]},{emoji:'🎯',count:5,options:[4,5,3]},
  ],
  medium:[
    {emoji:'🍊',count:6,options:[5,6,8]},{emoji:'🐱',count:7,options:[6,7,9]},
    {emoji:'🌟',count:8,options:[7,8,6]},{emoji:'🍦',count:9,options:[8,9,7]},
    {emoji:'🐟',count:6,options:[4,6,8]},{emoji:'🎀',count:7,options:[5,7,9]},
    {emoji:'🐝',count:8,options:[6,8,10]},{emoji:'🍓',count:10,options:[8,9,10]},
    {emoji:'⚽',count:6,options:[5,6,7]},{emoji:'🦁',count:9,options:[7,9,11]},
    {emoji:'🌸',count:7,options:[6,7,8]},{emoji:'🍋',count:8,options:[7,8,9]},
    {emoji:'🐰',count:6,options:[5,6,4]},{emoji:'🌍',count:9,options:[8,9,7]},
    {emoji:'🍀',count:7,options:[6,7,9]},{emoji:'🐸',count:10,options:[9,10,8]},
    {emoji:'🎈',count:8,options:[7,8,6]},{emoji:'🦆',count:6,options:[5,6,8]},
    {emoji:'🍄',count:9,options:[8,9,10]},{emoji:'🐙',count:7,options:[6,7,5]},
    {emoji:'🌴',count:8,options:[7,8,10]},{emoji:'🦜',count:6,options:[5,6,7]},
    {emoji:'🍑',count:10,options:[9,10,8]},{emoji:'🐻',count:7,options:[6,7,9]},
    {emoji:'🌊',count:9,options:[8,9,6]},{emoji:'🦊',count:8,options:[7,8,10]},
    {emoji:'🍒',count:6,options:[5,6,8]},{emoji:'🐺',count:7,options:[6,7,5]},
    {emoji:'🌵',count:9,options:[8,9,7]},{emoji:'🦋',count:10,options:[9,10,8]},
  ],
  hard:[
    {emoji:'🍇',count:12,options:[10,12,14]},{emoji:'⭐',count:15,options:[13,15,17]},
    {emoji:'🐣',count:11,options:[10,11,13]},{emoji:'🌸',count:14,options:[12,14,16]},
    {emoji:'🍭',count:13,options:[11,13,15]},{emoji:'🦆',count:10,options:[9,10,12]},
    {emoji:'🎯',count:16,options:[14,16,18]},{emoji:'🐠',count:12,options:[11,12,14]},
    {emoji:'🍄',count:11,options:[10,11,9]},{emoji:'🎪',count:15,options:[13,15,12]},
    {emoji:'🐸',count:14,options:[13,14,16]},{emoji:'🌺',count:13,options:[11,13,15]},
    {emoji:'🍕',count:10,options:[9,10,12]},{emoji:'🦁',count:16,options:[14,16,18]},
    {emoji:'🎠',count:12,options:[11,12,14]},{emoji:'🐋',count:11,options:[10,11,13]},
    {emoji:'🌟',count:15,options:[13,15,17]},{emoji:'🍓',count:14,options:[12,14,16]},
    {emoji:'🦜',count:13,options:[11,13,15]},{emoji:'🎁',count:10,options:[9,10,12]},
    {emoji:'🐬',count:16,options:[14,16,18]},{emoji:'🌈',count:12,options:[11,12,14]},
    {emoji:'🍦',count:11,options:[10,11,9]},{emoji:'🦊',count:15,options:[13,15,17]},
    {emoji:'🎃',count:14,options:[12,14,16]},{emoji:'🐼',count:13,options:[11,13,15]},
    {emoji:'🌻',count:10,options:[9,10,12]},{emoji:'🍋',count:16,options:[14,16,18]},
    {emoji:'🦄',count:12,options:[11,12,14]},{emoji:'🎯',count:15,options:[13,15,17]},
  ]
},

// ===== SOMBRAS (30 animales) =====
sombras:[
  {answer:'🐘',options:['🐘','🦒','🦏'],label:'elefante'},
  {answer:'🦒',options:['🐘','🦒','🐊'],label:'jirafa'},
  {answer:'🐬',options:['🐟','🐬','🦈'],label:'delfín'},
  {answer:'🦁',options:['🐯','🦁','🐻'],label:'león'},
  {answer:'🐊',options:['🦎','🐊','🐸'],label:'cocodrilo'},
  {answer:'🦈',options:['🐟','🦈','🐬'],label:'tiburón'},
  {answer:'🐙',options:['🦑','🐙','🦀'],label:'pulpo'},
  {answer:'🦀',options:['🐙','🦀','🦞'],label:'cangrejo'},
  {answer:'🦋',options:['🐝','🦋','🐞'],label:'mariposa'},
  {answer:'🐸',options:['🐊','🦎','🐸'],label:'rana'},
  {answer:'🦚',options:['🦜','🦚','🐦'],label:'pavo real'},
  {answer:'🦭',options:['🐧','🦭','🐋'],label:'foca'},
  {answer:'🐋',options:['🐬','🦭','🐋'],label:'ballena'},
  {answer:'🦜',options:['🦜','🦚','🐦'],label:'loro'},
  {answer:'🐞',options:['🐝','🦋','🐞'],label:'mariquita'},
  {answer:'🦓',options:['🐴','🦓','🦌'],label:'cebra'},
  {answer:'🐧',options:['🐦','🦅','🐧'],label:'pingüino'},
  {answer:'🦊',options:['🐺','🦊','🐱'],label:'zorro'},
  {answer:'🦅',options:['🦅','🦉','🦜'],label:'águila'},
  {answer:'🦉',options:['🦅','🦉','🐦'],label:'búho'},
  {answer:'🐺',options:['🦊','🐺','🐕'],label:'lobo'},
  {answer:'🦦',options:['🦫','🦦','🐿️'],label:'nutria'},
  {answer:'🦩',options:['🦢','🦩','🕊️'],label:'flamenco'},
  {answer:'🦢',options:['🦢','🦩','🕊️'],label:'cisne'},
  {answer:'🐿️',options:['🦫','🦦','🐿️'],label:'ardilla'},
  {answer:'🦌',options:['🐴','🦓','🦌'],label:'ciervo'},
  {answer:'🦏',options:['🐘','🦛','🦏'],label:'rinoceronte'},
  {answer:'🦛',options:['🐘','🦛','🦏'],label:'hipopótamo'},
  {answer:'🐆',options:['🐆','🐯','🦁'],label:'leopardo'},
  {answer:'🦫',options:['🦦','🦫','🐿️'],label:'castor'},
],

// ===== INGLÉS =====
ingles: {
  transport:[
    {emoji:'🚗',word:'Coche',english:'Car'},
    {emoji:'🚌',word:'Autobús',english:'Bus'},
    {emoji:'✈️',word:'Avión',english:'Airplane'},
    {emoji:'🚂',word:'Tren',english:'Train'},
    {emoji:'🚢',word:'Barco',english:'Ship'},
    {emoji:'🚁',word:'Helicóptero',english:'Helicopter'},
    {emoji:'🚲',word:'Bicicleta',english:'Bicycle'},
    {emoji:'🏍️',word:'Moto',english:'Motorbike'},
    {emoji:'🚒',word:'Bomberos',english:'Fire truck'},
    {emoji:'🚑',word:'Ambulancia',english:'Ambulance'},
    {emoji:'🛸',word:'Cohete',english:'Rocket'},
    {emoji:'⛵',word:'Velero',english:'Sailboat'},
    {emoji:'🚛',word:'Camión',english:'Truck'},
    {emoji:'🚜',word:'Tractor',english:'Tractor'},
    {emoji:'🛺',word:'Taxi',english:'Taxi'},
    {emoji:'🛶',word:'Canoa',english:'Canoe'},
    {emoji:'🚠',word:'Teleférico',english:'Cable car'},
    {emoji:'🛴',word:'Patinete',english:'Scooter'},
    {emoji:'🏄',word:'Tabla de surf',english:'Surfboard'},
    {emoji:'🚀',word:'Nave espacial',english:'Spaceship'},
  ],
  professions:[
    {emoji:'👨‍⚕️',word:'Doctor',english:'Doctor'},
    {emoji:'👩‍🏫',word:'Profesora',english:'Teacher'},
    {emoji:'👮',word:'Policía',english:'Police officer'},
    {emoji:'👨‍🍳',word:'Cocinero',english:'Cook'},
    {emoji:'👩‍🚒',word:'Bombera',english:'Firefighter'},
    {emoji:'👨‍✈️',word:'Piloto',english:'Pilot'},
    {emoji:'👩‍🎨',word:'Pintora',english:'Painter'},
    {emoji:'👨‍🔧',word:'Mecánico',english:'Mechanic'},
    {emoji:'👩‍💻',word:'Programadora',english:'Programmer'},
    {emoji:'👨‍🌾',word:'Granjero',english:'Farmer'},
    {emoji:'👩‍🔬',word:'Científica',english:'Scientist'},
    {emoji:'👨‍⚖️',word:'Juez',english:'Judge'},
    {emoji:'👩‍🎤',word:'Cantante',english:'Singer'},
    {emoji:'👨‍🚀',word:'Astronauta',english:'Astronaut'},
    {emoji:'👩‍🚑',word:'Enfermera',english:'Nurse'},
    {emoji:'👨‍🏗️',word:'Constructor',english:'Builder'},
    {emoji:'👩‍🦰',word:'Dentista',english:'Dentist'},
    {emoji:'🧑‍🎭',word:'Actor',english:'Actor'},
    {emoji:'🧑‍🏋️',word:'Entrenador',english:'Trainer'},
    {emoji:'🧑‍🍼',word:'Cuidador',english:'Caregiver'},
  ],
  animals:[
    {emoji:'🐶',word:'Perro',english:'Dog'},
    {emoji:'🐱',word:'Gato',english:'Cat'},
    {emoji:'🐭',word:'Ratón',english:'Mouse'},
    {emoji:'🐹',word:'Hámster',english:'Hamster'},
    {emoji:'🐰',word:'Conejo',english:'Rabbit'},
    {emoji:'🦊',word:'Zorro',english:'Fox'},
    {emoji:'🐻',word:'Oso',english:'Bear'},
    {emoji:'🐼',word:'Panda',english:'Panda'},
    {emoji:'🐨',word:'Koala',english:'Koala'},
    {emoji:'🐯',word:'Tigre',english:'Tiger'},
    {emoji:'🦁',word:'León',english:'Lion'},
    {emoji:'🐮',word:'Vaca',english:'Cow'},
    {emoji:'🐷',word:'Cerdo',english:'Pig'},
    {emoji:'🐸',word:'Rana',english:'Frog'},
    {emoji:'🐵',word:'Mono',english:'Monkey'},
    {emoji:'🐔',word:'Gallina',english:'Hen'},
    {emoji:'🐧',word:'Pingüino',english:'Penguin'},
    {emoji:'🐦',word:'Pájaro',english:'Bird'},
    {emoji:'🦆',word:'Pato',english:'Duck'},
    {emoji:'🦅',word:'Águila',english:'Eagle'},
    {emoji:'🦉',word:'Búho',english:'Owl'},
    {emoji:'🐊',word:'Cocodrilo',english:'Crocodile'},
    {emoji:'🐢',word:'Tortuga',english:'Turtle'},
    {emoji:'🐍',word:'Serpiente',english:'Snake'},
    {emoji:'🦎',word:'Lagarto',english:'Lizard'},
    {emoji:'🐳',word:'Ballena',english:'Whale'},
    {emoji:'🐬',word:'Delfín',english:'Dolphin'},
    {emoji:'🦈',word:'Tiburón',english:'Shark'},
    {emoji:'🐙',word:'Pulpo',english:'Octopus'},
    {emoji:'🦋',word:'Mariposa',english:'Butterfly'},
  ]
}

}; // end DATA
