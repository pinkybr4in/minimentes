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
,
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
  {
    name:"🏰 Castillo",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="140" width="240" height="150" rx="4" fill="white" stroke="#333" stroke-width="3"/>
      <rect x="30" y="100" width="60" height="45" rx="4" fill="white" stroke="#333" stroke-width="2.5"/>
      <rect x="210" y="100" width="60" height="45" rx="4" fill="white" stroke="#333" stroke-width="2.5"/>
      <rect x="110" y="80" width="80" height="65" rx="4" fill="white" stroke="#333" stroke-width="2.5"/>
      <rect x="30" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="52" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="74" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="210" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="232" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="254" y="80" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="110" y="58" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="134" y="58" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="158" y="58" width="16" height="24" rx="3" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="118" y="175" width="64" height="75" rx="32" fill="white" stroke="#333" stroke-width="2.5"/>
      <rect x="60" y="165" width="40" height="35" rx="6" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="200" y="165" width="40" height="35" rx="6" fill="white" stroke="#333" stroke-width="2"/>
      <line x1="150" y1="175" x2="150" y2="250" stroke="#333" stroke-width="1.5"/>
    </svg>`
  },
  {
    name:"🌊 Delfín",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,160 Q80,80 160,100 Q230,110 270,150 Q240,190 160,185 Q90,180 40,160Z" fill="white" stroke="#333" stroke-width="3"/>
      <path d="M270,150 Q285,130 295,110 Q280,120 265,130 Q270,140 270,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M270,150 Q285,170 295,190 Q280,178 265,168 Q270,159 270,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M40,160 Q20,140 10,110 Q30,130 50,148Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="70" cy="148" rx="12" ry="14" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="68" cy="146" r="6" fill="white" stroke="#333" stroke-width="1.5"/>
      <path d="M160,100 Q150,60 170,40 Q175,70 165,100Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M100,175 Q90,210 75,230 Q95,215 115,185Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M200,175 Q210,200 225,215 Q205,205 190,180Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M60,158 Q80,155 100,158" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M110,154 Q130,150 150,155" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="65" cy="144" r="2.5" fill="#333"/>
    </svg>`
  },
  {
    name:"🦄 Unicornio",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="165" cy="190" rx="90" ry="65" fill="white" stroke="#333" stroke-width="3"/>
      <circle cx="110" cy="125" r="60" fill="white" stroke="#333" stroke-width="3"/>
      <polygon points="110,65 130,15 125,65" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="80" cy="85" rx="18" ry="28" fill="white" stroke="#333" stroke-width="2.5" transform="rotate(-20 80 85)"/>
      <ellipse cx="88" cy="88" rx="12" ry="20" fill="white" stroke="#ccc" stroke-width="1.5" transform="rotate(-20 88 88)"/>
      <ellipse cx="92" cy="122" rx="13" ry="15" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="94" cy="124" r="7" fill="white" stroke="#333" stroke-width="1.5"/>
      <ellipse cx="145" cy="145" rx="20" ry="12" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M133,152 Q145,165 157,152" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="65" y1="135" x2="115" y2="140" stroke="#333" stroke-width="1.5"/>
      <line x1="65" y1="143" x2="115" y2="143" stroke="#333" stroke-width="1.5"/>
      <line x1="65" y1="143" x2="60" y2="160" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="100" cy="260" rx="22" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="150" cy="265" rx="22" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="200" cy="260" rx="22" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <ellipse cx="240" cy="255" rx="22" ry="16" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M240,200 Q275,190 280,220 Q270,240 255,235" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/>
    </svg>`
  },
  {
    name:"🌴 Palmera",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M140,280 Q145,200 150,150 Q155,200 160,280Z" fill="white" stroke="#333" stroke-width="3"/>
      <line x1="150" y1="170" x2="148" y2="280" stroke="#ccc" stroke-width="2"/>
      <line x1="150" y1="190" x2="152" y2="280" stroke="#ccc" stroke-width="2"/>
      <ellipse cx="220" cy="285" rx="80" ry="18" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M150,150 Q120,100 60,80 Q90,90 110,120 Q130,140 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M150,150 Q90,130 50,150 Q80,140 115,145 Q135,148 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M150,150 Q100,160 70,200 Q100,170 130,158 Q142,154 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M150,150 Q180,100 240,80 Q210,90 190,120 Q170,140 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M150,150 Q210,130 250,150 Q220,140 185,145 Q165,148 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M150,150 Q200,160 230,200 Q200,170 170,158 Q158,154 150,150Z" fill="white" stroke="#333" stroke-width="2.5"/>
      <circle cx="148" cy="165" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="158" cy="175" r="12" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="144" cy="178" r="12" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    name:"🎃 Calabaza",
    svg:`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="135" y="25" width="30" height="40" rx="10" fill="white" stroke="#333" stroke-width="2.5"/>
      <path d="M60,120 Q50,180 70,230 Q100,270 150,275 Q200,270 230,230 Q250,180 240,120 Q220,80 185,75 Q165,60 150,65 Q135,60 115,75 Q80,80 60,120Z" fill="white" stroke="#333" stroke-width="3"/>
      <line x1="150" y1="75" x2="150" y2="270" stroke="#ccc" stroke-width="1.5"/>
      <path d="M115,75 Q105,160 115,255" fill="none" stroke="#ccc" stroke-width="1.5"/>
      <path d="M185,75 Q195,160 185,255" fill="none" stroke="#ccc" stroke-width="1.5"/>
      <polygon points="110,140 130,120 140,140" fill="white" stroke="#333" stroke-width="2.5"/>
      <polygon points="160,140 170,120 190,140" fill="white" stroke="#333" stroke-width="2.5"/>
      <polygon points="120,175 150,155 180,175 165,200 135,200" fill="white" stroke="#333" stroke-width="2.5"/>
      <line x1="120" y1="200" x2="130" y2="215" stroke="#333" stroke-width="2.5"/>
      <line x1="150" y1="200" x2="150" y2="218" stroke="#333" stroke-width="2.5"/>
      <line x1="180" y1="200" x2="170" y2="215" stroke="#333" stroke-width="2.5"/>
    </svg>`
  },
],

// ===== PUNTOS =====
puntos: {
  easy:[
    {name:"⭐ Estrella",points:[{"n":1,"x":150,"y":35},{"n":2,"x":178,"y":111},{"n":3,"x":259,"y":114},{"n":4,"x":196,"y":165},{"n":5,"x":218,"y":243},{"n":6,"x":150,"y":198},{"n":7,"x":82,"y":243},{"n":8,"x":104,"y":165},{"n":9,"x":41,"y":114},{"n":10,"x":122,"y":111}]},
    {name:"🏠 Casa",points:[{"n":1,"x":150,"y":40},{"n":2,"x":255,"y":130},{"n":3,"x":255,"y":270},{"n":4,"x":45,"y":270},{"n":5,"x":45,"y":130},{"n":6,"x":150,"y":40},{"n":7,"x":45,"y":130},{"n":8,"x":255,"y":130}]},
    {name:"🐟 Pez",points:[{"n":1,"x":70,"y":150},{"n":2,"x":100,"y":110},{"n":3,"x":150,"y":90},{"n":4,"x":200,"y":100},{"n":5,"x":240,"y":130},{"n":6,"x":260,"y":150},{"n":7,"x":240,"y":170},{"n":8,"x":200,"y":200},{"n":9,"x":150,"y":210},{"n":10,"x":100,"y":195},{"n":11,"x":70,"y":150},{"n":12,"x":30,"y":110},{"n":13,"x":30,"y":190},{"n":14,"x":70,"y":150}]},
    {name:"🌙 Luna",points:[{"n":1,"x":180,"y":40},{"n":2,"x":220,"y":70},{"n":3,"x":240,"y":115},{"n":4,"x":235,"y":165},{"n":5,"x":215,"y":205},{"n":6,"x":185,"y":235},{"n":7,"x":150,"y":250},{"n":8,"x":120,"y":245},{"n":9,"x":105,"y":230},{"n":10,"x":140,"y":210},{"n":11,"x":165,"y":185},{"n":12,"x":175,"y":150},{"n":13,"x":165,"y":115},{"n":14,"x":140,"y":90},{"n":15,"x":105,"y":70},{"n":16,"x":120,"y":55},{"n":17,"x":150,"y":48},{"n":18,"x":180,"y":40}]},
    {name:"❤️ Corazón",points:[{"n":1,"x":150,"y":230},{"n":2,"x":80,"y":160},{"n":3,"x":45,"y":115},{"n":4,"x":50,"y":75},{"n":5,"x":75,"y":55},{"n":6,"x":110,"y":58},{"n":7,"x":135,"y":78},{"n":8,"x":150,"y":100},{"n":9,"x":165,"y":78},{"n":10,"x":190,"y":58},{"n":11,"x":225,"y":55},{"n":12,"x":250,"y":75},{"n":13,"x":255,"y":115},{"n":14,"x":220,"y":160},{"n":15,"x":150,"y":230}]},
  ],
  medium:[
    {name:"🦆 Pato",points:[{"n":1,"x":100,"y":220},{"n":2,"x":75,"y":190},{"n":3,"x":70,"y":155},{"n":4,"x":85,"y":125},{"n":5,"x":110,"y":110},{"n":6,"x":135,"y":108},{"n":7,"x":155,"y":115},{"n":8,"x":165,"y":128},{"n":9,"x":170,"y":120},{"n":10,"x":185,"y":108},{"n":11,"x":200,"y":112},{"n":12,"x":195,"y":130},{"n":13,"x":175,"y":145},{"n":14,"x":160,"y":160},{"n":15,"x":165,"y":185},{"n":16,"x":170,"y":215},{"n":17,"x":155,"y":240},{"n":18,"x":130,"y":250},{"n":19,"x":105,"y":245},{"n":20,"x":100,"y":220}]},
    {name:"🐢 Tortuga",points:[{"n":1,"x":150,"y":60},{"n":2,"x":195,"y":75},{"n":3,"x":225,"y":110},{"n":4,"x":230,"y":150},{"n":5,"x":210,"y":190},{"n":6,"x":175,"y":215},{"n":7,"x":150,"y":220},{"n":8,"x":125,"y":215},{"n":9,"x":90,"y":190},{"n":10,"x":70,"y":150},{"n":11,"x":75,"y":110},{"n":12,"x":105,"y":75},{"n":13,"x":150,"y":60},{"n":14,"x":90,"y":190},{"n":15,"x":65,"y":215},{"n":16,"x":55,"y":240},{"n":17,"x":80,"y":235},{"n":18,"x":95,"y":215},{"n":19,"x":210,"y":190},{"n":20,"x":235,"y":215},{"n":21,"x":245,"y":240},{"n":22,"x":220,"y":235},{"n":23,"x":205,"y":215},{"n":24,"x":175,"y":215},{"n":25,"x":190,"y":250},{"n":26,"x":165,"y":245},{"n":27,"x":150,"y":220},{"n":28,"x":125,"y":215},{"n":29,"x":110,"y":250},{"n":30,"x":135,"y":245},{"n":31,"x":150,"y":220},{"n":32,"x":205,"y":215},{"n":33,"x":150,"y":220}]},
    {name:"🚗 Coche",points:[{"n":1,"x":60,"y":195},{"n":2,"x":60,"y":155},{"n":3,"x":90,"y":120},{"n":4,"x":120,"y":100},{"n":5,"x":185,"y":100},{"n":6,"x":220,"y":120},{"n":7,"x":250,"y":155},{"n":8,"x":250,"y":195},{"n":9,"x":220,"y":195},{"n":10,"x":210,"y":195},{"n":11,"x":100,"y":195},{"n":12,"x":60,"y":195},{"n":13,"x":60,"y":155},{"n":14,"x":90,"y":120}]},
    {name:"🦋 Mariposa",points:[{"n":1,"x":150,"y":95},{"n":2,"x":130,"y":70},{"n":3,"x":95,"y":55},{"n":4,"x":60,"y":65},{"n":5,"x":38,"y":95},{"n":6,"x":40,"y":130},{"n":7,"x":60,"y":160},{"n":8,"x":95,"y":175},{"n":9,"x":130,"y":168},{"n":10,"x":148,"y":155},{"n":11,"x":150,"y":155},{"n":12,"x":152,"y":168},{"n":13,"x":170,"y":168},{"n":14,"x":205,"y":175},{"n":15,"x":240,"y":160},{"n":16,"x":260,"y":130},{"n":17,"x":262,"y":95},{"n":18,"x":240,"y":65},{"n":19,"x":205,"y":55},{"n":20,"x":170,"y":70},{"n":21,"x":150,"y":95},{"n":22,"x":150,"y":95},{"n":23,"x":150,"y":210},{"n":24,"x":120,"y":240},{"n":25,"x":80,"y":265},{"n":26,"x":60,"y":250},{"n":27,"x":65,"y":220},{"n":28,"x":90,"y":200},{"n":29,"x":130,"y":190},{"n":30,"x":150,"y":210},{"n":31,"x":170,"y":190},{"n":32,"x":210,"y":200},{"n":33,"x":235,"y":220},{"n":34,"x":240,"y":250},{"n":35,"x":220,"y":265},{"n":36,"x":180,"y":240},{"n":37,"x":150,"y":210}]},
    {name:"🌻 Girasol",points:[{"n":1,"x":150,"y":280},{"n":2,"x":148,"y":230},{"n":3,"x":145,"y":200},{"n":4,"x":120,"y":220},{"n":5,"x":95,"y":235},{"n":6,"x":110,"y":210},{"n":7,"x":145,"y":200},{"n":8,"x":175,"y":215},{"n":9,"x":200,"y":225},{"n":10,"x":185,"y":205},{"n":11,"x":155,"y":200},{"n":12,"x":150,"y":170},{"n":13,"x":135,"y":145},{"n":14,"x":150,"y":120},{"n":15,"x":165,"y":145},{"n":16,"x":180,"y":130},{"n":17,"x":175,"y":155},{"n":18,"x":195,"y":155},{"n":19,"x":180,"y":170},{"n":20,"x":195,"y":185},{"n":21,"x":170,"y":180},{"n":22,"x":165,"y":200},{"n":23,"x":150,"y":185},{"n":24,"x":135,"y":200},{"n":25,"x":130,"y":180},{"n":26,"x":105,"y":185},{"n":27,"x":120,"y":170},{"n":28,"x":105,"y":155},{"n":29,"x":125,"y":155},{"n":30,"x":120,"y":130},{"n":31,"x":135,"y":145},{"n":32,"x":150,"y":120}]},
  ],
  hard:[
    {name:"🐘 Elefante",points:[{"n":1,"x":95,"y":80},{"n":2,"x":80,"y":55},{"n":3,"x":105,"y":40},{"n":4,"x":140,"y":38},{"n":5,"x":175,"y":42},{"n":6,"x":205,"y":60},{"n":7,"x":215,"y":85},{"n":8,"x":210,"y":115},{"n":9,"x":215,"y":85},{"n":10,"x":240,"y":75},{"n":11,"x":260,"y":95},{"n":12,"x":255,"y":130},{"n":13,"x":230,"y":150},{"n":14,"x":210,"y":140},{"n":15,"x":210,"y":115},{"n":16,"x":225,"y":160},{"n":17,"x":235,"y":200},{"n":18,"x":230,"y":240},{"n":19,"x":230,"y":240},{"n":20,"x":220,"y":270},{"n":21,"x":205,"y":290},{"n":22,"x":195,"y":270},{"n":23,"x":200,"y":245},{"n":24,"x":180,"y":240},{"n":25,"x":160,"y":238},{"n":26,"x":165,"y":238},{"n":27,"x":170,"y":270},{"n":28,"x":158,"y":290},{"n":29,"x":148,"y":270},{"n":30,"x":150,"y":245},{"n":31,"x":130,"y":240},{"n":32,"x":115,"y":238},{"n":33,"x":115,"y":238},{"n":34,"x":118,"y":270},{"n":35,"x":106,"y":290},{"n":36,"x":96,"y":270},{"n":37,"x":100,"y":245},{"n":38,"x":88,"y":230},{"n":39,"x":75,"y":200},{"n":40,"x":70,"y":165},{"n":41,"x":70,"y":165},{"n":42,"x":50,"y":175},{"n":43,"x":40,"y":195},{"n":44,"x":45,"y":215},{"n":45,"x":60,"y":225},{"n":46,"x":80,"y":215},{"n":47,"x":90,"y":200},{"n":48,"x":95,"y":185},{"n":49,"x":80,"y":150},{"n":50,"x":80,"y":115},{"n":51,"x":95,"y":80}]},
    {name:"🚀 Cohete",points:[{"n":1,"x":150,"y":25},{"n":2,"x":170,"y":55},{"n":3,"x":185,"y":90},{"n":4,"x":192,"y":130},{"n":5,"x":192,"y":130},{"n":6,"x":220,"y":160},{"n":7,"x":240,"y":200},{"n":8,"x":215,"y":200},{"n":9,"x":195,"y":175},{"n":10,"x":192,"y":200},{"n":11,"x":185,"y":220},{"n":12,"x":175,"y":245},{"n":13,"x":165,"y":260},{"n":14,"x":150,"y":270},{"n":15,"x":135,"y":260},{"n":16,"x":125,"y":245},{"n":17,"x":115,"y":220},{"n":18,"x":108,"y":200},{"n":19,"x":85,"y":200},{"n":20,"x":105,"y":160},{"n":21,"x":108,"y":130},{"n":22,"x":115,"y":90},{"n":23,"x":130,"y":55},{"n":24,"x":150,"y":25},{"n":25,"x":150,"y":130},{"n":26,"x":165,"y":145},{"n":27,"x":150,"y":160},{"n":28,"x":135,"y":145},{"n":29,"x":150,"y":130}]},
    {name:"🏰 Castillo",points:[{"n":1,"x":40,"y":280},{"n":2,"x":40,"y":195},{"n":3,"x":40,"y":195},{"n":4,"x":40,"y":175},{"n":5,"x":55,"y":175},{"n":6,"x":55,"y":195},{"n":7,"x":70,"y":195},{"n":8,"x":70,"y":175},{"n":9,"x":85,"y":175},{"n":10,"x":85,"y":195},{"n":11,"x":85,"y":145},{"n":12,"x":75,"y":120},{"n":13,"x":80,"y":95},{"n":14,"x":95,"y":95},{"n":15,"x":100,"y":120},{"n":16,"x":90,"y":145},{"n":17,"x":90,"y":195},{"n":18,"x":110,"y":195},{"n":19,"x":110,"y":155},{"n":20,"x":108,"y":130},{"n":21,"x":108,"y":105},{"n":22,"x":122,"y":105},{"n":23,"x":122,"y":80},{"n":24,"x":137,"y":80},{"n":25,"x":137,"y":55},{"n":26,"x":150,"y":40},{"n":27,"x":163,"y":55},{"n":28,"x":163,"y":80},{"n":29,"x":178,"y":80},{"n":30,"x":178,"y":105},{"n":31,"x":192,"y":105},{"n":32,"x":192,"y":130},{"n":33,"x":190,"y":155},{"n":34,"x":190,"y":195},{"n":35,"x":210,"y":195},{"n":36,"x":210,"y":145},{"n":37,"x":200,"y":120},{"n":38,"x":205,"y":95},{"n":39,"x":220,"y":95},{"n":40,"x":225,"y":120},{"n":41,"x":215,"y":145},{"n":42,"x":215,"y":195},{"n":43,"x":230,"y":195},{"n":44,"x":230,"y":175},{"n":45,"x":245,"y":175},{"n":46,"x":245,"y":195},{"n":47,"x":260,"y":195},{"n":48,"x":260,"y":175},{"n":49,"x":275,"y":175},{"n":50,"x":275,"y":195},{"n":51,"x":275,"y":280},{"n":52,"x":40,"y":280}]},
    {name:"🦁 León",points:[{"n":1,"x":150,"y":45},{"n":2,"x":175,"y":38},{"n":3,"x":200,"y":42},{"n":4,"x":220,"y":58},{"n":5,"x":232,"y":80},{"n":6,"x":235,"y":105},{"n":7,"x":228,"y":130},{"n":8,"x":218,"y":148},{"n":9,"x":228,"y":155},{"n":10,"x":240,"y":170},{"n":11,"x":238,"y":190},{"n":12,"x":225,"y":200},{"n":13,"x":210,"y":198},{"n":14,"x":198,"y":188},{"n":15,"x":192,"y":175},{"n":16,"x":185,"y":185},{"n":17,"x":175,"y":200},{"n":18,"x":165,"y":210},{"n":19,"x":150,"y":215},{"n":20,"x":135,"y":210},{"n":21,"x":125,"y":200},{"n":22,"x":115,"y":185},{"n":23,"x":108,"y":175},{"n":24,"x":102,"y":188},{"n":25,"x":90,"y":198},{"n":26,"x":75,"y":200},{"n":27,"x":62,"y":190},{"n":28,"x":60,"y":170},{"n":29,"x":72,"y":155},{"n":30,"x":82,"y":148},{"n":31,"x":72,"y":130},{"n":32,"x":65,"y":105},{"n":33,"x":68,"y":80},{"n":34,"x":80,"y":58},{"n":35,"x":100,"y":42},{"n":36,"x":125,"y":38},{"n":37,"x":150,"y":45},{"n":38,"x":82,"y":148},{"n":39,"x":70,"y":170},{"n":40,"x":65,"y":200},{"n":41,"x":72,"y":230},{"n":42,"x":88,"y":255},{"n":43,"x":105,"y":270},{"n":44,"x":130,"y":275},{"n":45,"x":150,"y":278},{"n":46,"x":170,"y":275},{"n":47,"x":195,"y":270},{"n":48,"x":212,"y":255},{"n":49,"x":228,"y":230},{"n":50,"x":235,"y":200},{"n":51,"x":228,"y":175},{"n":52,"x":218,"y":148}]},
    {name:"🦒 Jirafa",points:[{"n":1,"x":165,"y":25},{"n":2,"x":178,"y":35},{"n":3,"x":182,"y":55},{"n":4,"x":175,"y":70},{"n":5,"x":168,"y":78},{"n":6,"x":175,"y":70},{"n":7,"x":183,"y":55},{"n":8,"x":190,"y":48},{"n":9,"x":193,"y":60},{"n":10,"x":183,"y":72},{"n":11,"x":168,"y":78},{"n":12,"x":162,"y":62},{"n":13,"x":158,"y":50},{"n":14,"x":165,"y":45},{"n":15,"x":170,"y":58},{"n":16,"x":168,"y":78},{"n":17,"x":162,"y":95},{"n":18,"x":156,"y":125},{"n":19,"x":152,"y":160},{"n":20,"x":150,"y":195},{"n":21,"x":150,"y":195},{"n":22,"x":175,"y":195},{"n":23,"x":205,"y":200},{"n":24,"x":225,"y":210},{"n":25,"x":232,"y":230},{"n":26,"x":228,"y":250},{"n":27,"x":210,"y":265},{"n":28,"x":195,"y":270},{"n":29,"x":190,"y":250},{"n":30,"x":195,"y":230},{"n":31,"x":210,"y":215},{"n":32,"x":210,"y":265},{"n":33,"x":212,"y":285},{"n":34,"x":205,"y":295},{"n":35,"x":195,"y":285},{"n":36,"x":193,"y":265},{"n":37,"x":175,"y":270},{"n":38,"x":160,"y":272},{"n":39,"x":160,"y":272},{"n":40,"x":158,"y":290},{"n":41,"x":150,"y":298},{"n":42,"x":142,"y":288},{"n":43,"x":144,"y":270},{"n":44,"x":130,"y":268},{"n":45,"x":112,"y":262},{"n":46,"x":98,"y":250},{"n":47,"x":98,"y":250},{"n":48,"x":92,"y":270},{"n":49,"x":85,"y":295},{"n":50,"x":78,"y":285},{"n":51,"x":82,"y":262},{"n":52,"x":92,"y":240},{"n":53,"x":90,"y":215},{"n":54,"x":100,"y":200},{"n":55,"x":120,"y":195},{"n":56,"x":150,"y":195},{"n":57,"x":120,"y":195},{"n":58,"x":118,"y":265},{"n":59,"x":115,"y":290},{"n":60,"x":108,"y":280},{"n":61,"x":110,"y":258},{"n":62,"x":112,"y":235}]},
  ],
},{n:2,x:190,y:120},{n:3,x:275,y:120},{n:4,x:210,y:175},{n:5,x:235,y:260},{n:6,x:150,y:210},{n:7,x:65,y:260},{n:8,x:90,y:175},{n:9,x:25,y:120},{n:10,x:110,y:120}]},
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
    {name:"🦕 Dinosaurio",points:[{n:1,x:50,y:200},{n:2,x:60,y:240},{n:3,x:90,y:270},{n:4,x:120,y:265},{n:5,x:130,y:240},{n:6,x:140,y:210},{n:7,x:160,y:200},{n:8,x:190,y:210},{n:9,x:210,y:240},{n:10,x:220,y:265},{n:11,x:250,y:270},{n:12,x:265,y:240},{n:13,x:260,y:200},{n:14,x:240,y:170},{n:15,x:220,y:150},{n:16,x:230,y:120},{n:17,x:250,y:100},{n:18,x:240,y:80},{n:19,x:210,y:90},{n:20,x:200,y:110},{n:21,x:185,y:130},{n:22,x:165,y:140},{n:23,x:145,y:130},{n:24,x:120,y:110},{n:25,x:90,y:120},{n:26,x:70,y:150},{n:27,x:55,y:175}]},
    {name:"🚀 Cohete",points:[{n:1,x:150,y:30},{n:2,x:175,y:60},{n:3,x:190,y:100},{n:4,x:195,y:150},{n:5,x:230,y:180},{n:6,x:255,y:220},{n:7,x:240,y:250},{n:8,x:210,y:235},{n:9,x:195,y:210},{n:10,x:195,y:260},{n:11,x:185,y:280},{n:12,x:165,y:270},{n:13,x:150,y:250},{n:14,x:135,y:270},{n:15,x:115,y:280},{n:16,x:105,y:260},{n:17,x:105,y:210},{n:18,x:90,y:235},{n:19,x:60,y:250},{n:20,x:45,y:220},{n:21,x:70,y:180},{n:22,x:105,y:150},{n:23,x:110,y:100},{n:24,x:125,y:60}]},
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
  {answer:'🐘',options:['🐘','🦒','🦏'],label:'elefante',article:'un'},
  {answer:'🦒',options:['🐘','🦒','🐊'],label:'jirafa',article:'una'},
  {answer:'🐬',options:['🐟','🐬','🦈'],label:'delfín',article:'un'},
  {answer:'🦁',options:['🐯','🦁','🐻'],label:'león',article:'un'},
  {answer:'🐊',options:['🦎','🐊','🐸'],label:'cocodrilo',article:'un'},
  {answer:'🦈',options:['🐟','🦈','🐬'],label:'tiburón',article:'un'},
  {answer:'🐙',options:['🦑','🐙','🦀'],label:'pulpo',article:'un'},
  {answer:'🦀',options:['🐙','🦀','🦞'],label:'cangrejo',article:'un'},
  {answer:'🦋',options:['🐝','🦋','🐞'],label:'mariposa',article:'una'},
  {answer:'🐸',options:['🐊','🦎','🐸'],label:'rana',article:'una'},
  {answer:'🦚',options:['🦜','🦚','🐦'],label:'pavo real',article:'un'},
  {answer:'🦭',options:['🐧','🦭','🐋'],label:'foca',article:'una'},
  {answer:'🐋',options:['🐬','🦭','🐋'],label:'ballena',article:'una'},
  {answer:'🦜',options:['🦜','🦚','🐦'],label:'loro',article:'un'},
  {answer:'🐞',options:['🐝','🦋','🐞'],label:'mariquita',article:'una'},
  {answer:'🦓',options:['🐴','🦓','🦌'],label:'cebra',article:'una'},
  {answer:'🐧',options:['🐦','🦅','🐧'],label:'pingüino',article:'un'},
  {answer:'🦊',options:['🐺','🦊','🐱'],label:'zorro',article:'un'},
  {answer:'🦅',options:['🦅','🦉','🦜'],label:'águila',article:'un'},
  {answer:'🦉',options:['🦅','🦉','🐦'],label:'búho',article:'un'},
  {answer:'🐺',options:['🦊','🐺','🐕'],label:'lobo',article:'un'},
  {answer:'🦦',options:['🦫','🦦','🐿️'],label:'nutria',article:'una'},
  {answer:'🦩',options:['🦢','🦩','🕊️'],label:'flamenco',article:'un'},
  {answer:'🦢',options:['🦢','🦩','🕊️'],label:'cisne',article:'un'},
  {answer:'🐿️',options:['🦫','🦦','🐿️'],label:'ardilla',article:'una'},
  {answer:'🦌',options:['🐴','🦓','🦌'],label:'ciervo',article:'un'},
  {answer:'🦏',options:['🐘','🦛','🦏'],label:'rinoceronte',article:'un'},
  {answer:'🦛',options:['🐘','🦛','🦏'],label:'hipopótamo',article:'un'},
  {answer:'🐆',options:['🐆','🐯','🦁'],label:'leopardo',article:'un'},
  {answer:'🦫',options:['🦦','🦫','🐿️'],label:'castor',article:'un'},
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

// ===== COMPLETA LA PALABRA =====
DATA.completa = {
  easy: [
    {emoji:'🐱',word:'GATO', blanks:[1,3], answers:['A','O'], options:['A','E','O','U']},
    {emoji:'🐶',word:'PERRO',blanks:[1,3], answers:['E','O'], options:['A','E','O','I']},
    {emoji:'🌸',word:'FLOR', blanks:[2,3], answers:['O','R'], options:['A','O','R','E']},
    {emoji:'🌙',word:'LUNA', blanks:[1,3], answers:['U','A'], options:['U','A','E','I']},
    {emoji:'☀️',word:'SOL',  blanks:[1,2], answers:['O','L'], options:['O','L','A','E']},
    {emoji:'🐟',word:'PEZ',  blanks:[1],   answers:['E'],     options:['A','E','I','O']},
    {emoji:'🐸',word:'RANA', blanks:[1,3], answers:['A'],     options:['A','E','O','U']},
    {emoji:'🍎',word:'MANZANA',blanks:[1,3],answers:['A'],    options:['A','E','O','I']},
    {emoji:'🐻',word:'OSO',  blanks:[0,2], answers:['O'],     options:['A','O','E','U']},
    {emoji:'🌊',word:'MAR',  blanks:[1],   answers:['A'],     options:['A','E','O','U']},
    {emoji:'🦁',word:'LEON', blanks:[1,3], answers:['E','O'], options:['A','E','O','U']},
    {emoji:'🍌',word:'PLATANO',blanks:[2,5],answers:['A'],    options:['A','E','O','I']},
    {emoji:'🐘',word:'ELEFANTE',blanks:[0,2],answers:['E'],   options:['A','E','I','O']},
    {emoji:'🦋',word:'MARIPOSA',blanks:[1,5],answers:['A','O'],options:['A','E','O','U']},
    {emoji:'🌻',word:'GIRASOL',blanks:[1,4],answers:['I','A'],options:['A','E','I','O']},
  ],
  medium: [
    {emoji:'🚗',word:'COCHE', blanks:[1,3], answers:['O','H'], options:['O','H','A','E']},
    {emoji:'🌈',word:'ARCOIRIS',blanks:[1,4],answers:['R','I'],options:['R','I','L','E']},
    {emoji:'🐬',word:'DELFIN',blanks:[2,4],answers:['L','I'],options:['L','I','N','E']},
    {emoji:'🦄',word:'UNICORNIO',blanks:[1,5],answers:['N','N'],options:['N','M','R','L']},
    {emoji:'🍕',word:'PIZZA',blanks:[1,3],answers:['I','Z'],options:['I','Z','A','E']},
    {emoji:'🎈',word:'GLOBO',blanks:[1,3],answers:['L','B'],options:['L','B','R','M']},
    {emoji:'🌴',word:'PALMERA',blanks:[1,4],answers:['A','E'],options:['A','E','I','O']},
    {emoji:'🦊',word:'ZORRO',blanks:[1,3],answers:['O'],options:['A','O','E','U']},
    {emoji:'🐼',word:'PANDA',blanks:[1,4],answers:['A'],options:['A','E','O','I']},
    {emoji:'🚀',word:'COHETE',blanks:[1,3],answers:['O','E'],options:['A','O','E','I']},
    {emoji:'🎺',word:'TROMPETA',blanks:[2,5],answers:['O','E'],options:['A','O','E','I']},
    {emoji:'🐙',word:'PULPO',blanks:[1,4],answers:['U','O'],options:['A','U','O','I']},
    {emoji:'🏠',word:'CASTILLO',blanks:[1,5],answers:['A','L'],options:['A','L','E','R']},
    {emoji:'🌺',word:'MARGARITA',blanks:[1,5],answers:['A'],options:['A','E','O','I']},
    {emoji:'🦩',word:'FLAMENCO',blanks:[2,5],answers:['A','E'],options:['A','E','O','I']},
  ],
  hard: [
    {emoji:'🦒',word:'JIRAFA',blanks:[1,3,5],answers:['I','A','A'],options:['A','I','E','O']},
    {emoji:'🐊',word:'COCODRILO',blanks:[1,4,7],answers:['O','D','L'],options:['O','D','L','R']},
    {emoji:'🌋',word:'VOLCAN',blanks:[1,3,5],answers:['O','C','N'],options:['O','C','N','L']},
    {emoji:'🐠',word:'BARRACUDA',blanks:[1,3,5,7],answers:['A','R','C','D'],options:['A','R','C','D']},
    {emoji:'🦋',word:'CRISALIDA',blanks:[2,4,7],answers:['I','A','I'],options:['A','I','E','O']},
    {emoji:'🌍',word:'CONTINENTE',blanks:[1,4,7],answers:['O','I','E'],options:['A','O','I','E']},
    {emoji:'🦅',word:'AGUILA',blanks:[0,2,5],answers:['A','U','A'],options:['A','U','E','I']},
    {emoji:'🏔️',word:'MONTANA',blanks:[1,3,6],answers:['O','T','A'],options:['O','T','A','N']},
    {emoji:'🎪',word:'CIRCO',blanks:[1,3],answers:['I','C'],options:['I','C','O','R']},
    {emoji:'🦁',word:'MELENA',blanks:[1,3,5],answers:['E','E','A'],options:['A','E','I','O']},
  ]
};

// ===== SONIDOS =====
DATA.sonidos = [
  {sound:'guau guau',answer:'perro',correctLabel:'el perro',options:[{emoji:'🐶',label:'perro'},{emoji:'🐱',label:'gato'},{emoji:'🐸',label:'rana'}]},
  {sound:'miau miau',answer:'gato',correctLabel:'el gato',options:[{emoji:'🐱',label:'gato'},{emoji:'🐶',label:'perro'},{emoji:'🐭',label:'ratón'}]},
  {sound:'mu mu',answer:'vaca',correctLabel:'la vaca',options:[{emoji:'🐮',label:'vaca'},{emoji:'🐷',label:'cerdo'},{emoji:'🐑',label:'oveja'}]},
  {sound:'oink oink',answer:'cerdo',correctLabel:'el cerdo',options:[{emoji:'🐷',label:'cerdo'},{emoji:'🐮',label:'vaca'},{emoji:'🐔',label:'gallina'}]},
  {sound:'quiquiriquí',answer:'gallo',correctLabel:'el gallo',options:[{emoji:'🐓',label:'gallo'},{emoji:'🦆',label:'pato'},{emoji:'🐧',label:'pingüino'}]},
  {sound:'cuac cuac',answer:'pato',correctLabel:'el pato',options:[{emoji:'🦆',label:'pato'},{emoji:'🐓',label:'gallo'},{emoji:'🐦',label:'pájaro'}]},
  {sound:'pío pío',answer:'pollito',correctLabel:'el pollito',options:[{emoji:'🐥',label:'pollito'},{emoji:'🦆',label:'pato'},{emoji:'🐦',label:'pájaro'}]},
  {sound:'buaaah',answer:'bebé',correctLabel:'el bebé',options:[{emoji:'👶',label:'bebé'},{emoji:'🧒',label:'niño'},{emoji:'👦',label:'chico'}]},
  {sound:'riiing riiing',answer:'teléfono',correctLabel:'el teléfono',options:[{emoji:'📱',label:'teléfono'},{emoji:'⏰',label:'despertador'},{emoji:'🔔',label:'campana'}]},
  {sound:'toc toc',answer:'puerta',correctLabel:'la puerta',options:[{emoji:'🚪',label:'puerta'},{emoji:'🪟',label:'ventana'},{emoji:'🧱',label:'pared'}]},
  {sound:'splash',answer:'agua',correctLabel:'el agua',options:[{emoji:'💧',label:'agua'},{emoji:'❄️',label:'hielo'},{emoji:'☁️',label:'nube'}]},
  {sound:'aaachís',answer:'estornudo',correctLabel:'el estornudo',options:[{emoji:'🤧',label:'estornudo'},{emoji:'😂',label:'risa'},{emoji:'😴',label:'bostezo'}]},
  {sound:'jiiii jiiii',answer:'caballo',correctLabel:'el caballo',options:[{emoji:'🐴',label:'caballo'},{emoji:'🦌',label:'ciervo'},{emoji:'🦓',label:'cebra'}]},
  {sound:'pum pum pum',answer:'tambor',correctLabel:'el tambor',options:[{emoji:'🥁',label:'tambor'},{emoji:'🎸',label:'guitarra'},{emoji:'🎺',label:'trompeta'}]},
  {sound:'chu chu',answer:'tren',correctLabel:'el tren',options:[{emoji:'🚂',label:'tren'},{emoji:'🚗',label:'coche'},{emoji:'✈️',label:'avión'}]},
  {sound:'bzzzz',answer:'abeja',correctLabel:'la abeja',options:[{emoji:'🐝',label:'abeja'},{emoji:'🦟',label:'mosquito'},{emoji:'🦋',label:'mariposa'}]},
  {sound:'croac croac',answer:'rana',correctLabel:'la rana',options:[{emoji:'🐸',label:'rana'},{emoji:'🐊',label:'cocodrilo'},{emoji:'🦎',label:'lagarto'}]},
  {sound:'aaaahh',answer:'bostezo',correctLabel:'el bostezo',options:[{emoji:'😴',label:'bostezo'},{emoji:'😂',label:'risa'},{emoji:'😱',label:'susto'}]},
  {sound:'niiiii',answer:'sirena',correctLabel:'la sirena',options:[{emoji:'🚨',label:'sirena'},{emoji:'📱',label:'teléfono'},{emoji:'⏰',label:'despertador'}]},
  {sound:'grrr grrr',answer:'oso',correctLabel:'el oso',options:[{emoji:'🐻',label:'oso'},{emoji:'🦁',label:'león'},{emoji:'🐯',label:'tigre'}]},
];

// ===== CÁLCULO (sumas y restas) =====
DATA.calculo = {
  suma:[
    {emoji:'🍎',a:1,b:1,op:'+',answer:2,options:[1,2,3]},
    {emoji:'⭐',a:2,b:1,op:'+',answer:3,options:[2,3,4]},
    {emoji:'🐶',a:2,b:2,op:'+',answer:4,options:[3,4,5]},
    {emoji:'🌸',a:3,b:1,op:'+',answer:4,options:[3,4,5]},
    {emoji:'🍕',a:3,b:2,op:'+',answer:5,options:[4,5,6]},
    {emoji:'🎈',a:4,b:1,op:'+',answer:5,options:[4,5,6]},
    {emoji:'🐱',a:3,b:3,op:'+',answer:6,options:[5,6,7]},
    {emoji:'🍦',a:4,b:2,op:'+',answer:6,options:[5,6,7]},
    {emoji:'🌟',a:5,b:2,op:'+',answer:7,options:[6,7,8]},
    {emoji:'🦋',a:4,b:3,op:'+',answer:7,options:[6,7,8]},
    {emoji:'🍓',a:5,b:3,op:'+',answer:8,options:[7,8,9]},
    {emoji:'🐸',a:6,b:2,op:'+',answer:8,options:[7,8,9]},
    {emoji:'🎀',a:5,b:4,op:'+',answer:9,options:[8,9,10]},
    {emoji:'🐠',a:6,b:3,op:'+',answer:9,options:[8,9,10]},
    {emoji:'🌈',a:5,b:5,op:'+',answer:10,options:[8,9,10]},
  ],
  resta:[
    {emoji:'🍎',a:3,b:1,op:'-',answer:2,options:[1,2,3]},
    {emoji:'⭐',a:4,b:1,op:'-',answer:3,options:[2,3,4]},
    {emoji:'🐶',a:5,b:2,op:'-',answer:3,options:[2,3,4]},
    {emoji:'🌸',a:5,b:1,op:'-',answer:4,options:[3,4,5]},
    {emoji:'🍕',a:6,b:2,op:'-',answer:4,options:[3,4,5]},
    {emoji:'🎈',a:7,b:2,op:'-',answer:5,options:[4,5,6]},
    {emoji:'🐱',a:8,b:2,op:'-',answer:6,options:[5,6,7]},
    {emoji:'🍦',a:9,b:3,op:'-',answer:6,options:[5,6,7]},
    {emoji:'🌟',a:9,b:2,op:'-',answer:7,options:[6,7,8]},
    {emoji:'🦋',a:10,b:3,op:'-',answer:7,options:[6,7,8]},
    {emoji:'🍓',a:10,b:2,op:'-',answer:8,options:[7,8,9]},
    {emoji:'🐸',a:10,b:4,op:'-',answer:6,options:[5,6,7]},
    {emoji:'🎀',a:9,b:4,op:'-',answer:5,options:[4,5,6]},
    {emoji:'🐠',a:8,b:5,op:'-',answer:3,options:[2,3,4]},
    {emoji:'🌈',a:10,b:5,op:'-',answer:5,options:[4,5,6]},
  ],
  mix:[
    {emoji:'🍎',a:2,b:3,op:'+',answer:5,options:[4,5,6]},
    {emoji:'🐶',a:5,b:2,op:'-',answer:3,options:[2,3,4]},
    {emoji:'⭐',a:4,b:4,op:'+',answer:8,options:[7,8,9]},
    {emoji:'🌸',a:8,b:3,op:'-',answer:5,options:[4,5,6]},
    {emoji:'🍕',a:3,b:5,op:'+',answer:8,options:[7,8,9]},
    {emoji:'🎈',a:9,b:4,op:'-',answer:5,options:[4,5,6]},
    {emoji:'🐱',a:6,b:4,op:'+',answer:10,options:[8,9,10]},
    {emoji:'🍦',a:10,b:3,op:'-',answer:7,options:[6,7,8]},
    {emoji:'🌟',a:4,b:6,op:'+',answer:10,options:[8,9,10]},
    {emoji:'🦋',a:7,b:3,op:'-',answer:4,options:[3,4,5]},
    {emoji:'🍓',a:5,b:5,op:'+',answer:10,options:[9,10,11]},
    {emoji:'🐸',a:6,b:4,op:'-',answer:2,options:[1,2,3]},
    {emoji:'🎀',a:3,b:7,op:'+',answer:10,options:[8,9,10]},
    {emoji:'🐠',a:9,b:6,op:'-',answer:3,options:[2,3,4]},
    {emoji:'🌈',a:7,b:3,op:'+',answer:10,options:[9,10,11]},
  ]
};

// ===== COLORES =====
DATA.colores = [
  {emoji:'🌞',name:'sol',article:'el',correct:'amarillo',options:[{label:'amarillo',hex:'#FFD93D'},{label:'azul',hex:'#6EC6F5'},{label:'rojo',hex:'#FF6B6B'}]},
  {emoji:'🌊',name:'mar',article:'el',correct:'azul',options:[{label:'azul',hex:'#6EC6F5'},{label:'verde',hex:'#6BCB77'},{label:'rojo',hex:'#FF6B6B'}]},
  {emoji:'🍎',name:'manzana',article:'la',correct:'rojo',options:[{label:'rojo',hex:'#FF6B6B'},{label:'amarillo',hex:'#FFD93D'},{label:'azul',hex:'#6EC6F5'}]},
  {emoji:'🌿',name:'hierba',article:'la',correct:'verde',options:[{label:'verde',hex:'#6BCB77'},{label:'azul',hex:'#6EC6F5'},{label:'amarillo',hex:'#FFD93D'}]},
  {emoji:'🍇',name:'uva',article:'la',correct:'morado',options:[{label:'morado',hex:'#C77DFF'},{label:'rojo',hex:'#FF6B6B'},{label:'azul',hex:'#6EC6F5'}]},
  {emoji:'🍊',name:'naranja',article:'la',correct:'naranja',options:[{label:'naranja',hex:'#FF9F43'},{label:'amarillo',hex:'#FFD93D'},{label:'rojo',hex:'#FF6B6B'}]},
  {emoji:'🐘',name:'elefante',article:'el',correct:'gris',options:[{label:'gris',hex:'#888888'},{label:'azul',hex:'#6EC6F5'},{label:'verde',hex:'#6BCB77'}]},
  {emoji:'❄️',name:'hielo',article:'el',correct:'blanco',options:[{label:'blanco',hex:'#dddddd'},{label:'azul',hex:'#6EC6F5'},{label:'gris',hex:'#888888'}]},
  {emoji:'🌙',name:'luna',article:'la',correct:'amarillo',options:[{label:'amarillo',hex:'#FFD93D'},{label:'blanco',hex:'#e0e0e0'},{label:'azul',hex:'#6EC6F5'}]},
  {emoji:'🌹',name:'rosa',article:'la',correct:'rojo',options:[{label:'rojo',hex:'#FF6B6B'},{label:'morado',hex:'#C77DFF'},{label:'amarillo',hex:'#FFD93D'}]},
  {emoji:'🐸',name:'rana',article:'la',correct:'verde',options:[{label:'verde',hex:'#6BCB77'},{label:'amarillo',hex:'#FFD93D'},{label:'azul',hex:'#6EC6F5'}]},
  {emoji:'🍋',name:'limón',article:'el',correct:'amarillo',options:[{label:'amarillo',hex:'#FFD93D'},{label:'verde',hex:'#6BCB77'},{label:'naranja',hex:'#FF9F43'}]},
  {emoji:'🐦',name:'cielo',article:'el',correct:'azul',options:[{label:'azul',hex:'#6EC6F5'},{label:'verde',hex:'#6BCB77'},{label:'gris',hex:'#888'}]},
  {emoji:'🐼',name:'panda',article:'el',correct:'blanco y negro',options:[{label:'blanco y negro',hex:'#555'},{label:'marrón',hex:'#a0522d'},{label:'gris',hex:'#888'}]},
  {emoji:'🦊',name:'zorro',article:'el',correct:'naranja',options:[{label:'naranja',hex:'#FF9F43'},{label:'rojo',hex:'#FF6B6B'},{label:'amarillo',hex:'#FFD93D'}]},
  {emoji:'🍫',name:'chocolate',article:'el',correct:'marrón',options:[{label:'marrón',hex:'#a0522d'},{label:'negro',hex:'#333'},{label:'naranja',hex:'#FF9F43'}]},
  {emoji:'🍓',name:'fresa',article:'la',correct:'rojo',options:[{label:'rojo',hex:'#FF6B6B'},{label:'rosa',hex:'#FF6BD6'},{label:'naranja',hex:'#FF9F43'}]},
  {emoji:'🌴',name:'palmera',article:'la',correct:'verde',options:[{label:'verde',hex:'#6BCB77'},{label:'amarillo',hex:'#FFD93D'},{label:'marrón',hex:'#a0522d'}]},
  {emoji:'🦄',name:'unicornio',article:'el',correct:'blanco',options:[{label:'blanco',hex:'#ddd'},{label:'rosa',hex:'#FF6BD6'},{label:'morado',hex:'#C77DFF'}]},
  {emoji:'🐧',name:'pingüino',article:'el',correct:'negro',options:[{label:'negro',hex:'#333'},{label:'gris',hex:'#888'},{label:'azul',hex:'#6EC6F5'}]},
];

// ===== MEMORIA emojis =====
DATA.memoria = ['🐶','🐱','🐻','🦊','🐸','🦋','🌸','⭐','🍎','🚗','🎈','🏠','🌈','🎀','🐬','🦄','🌻','🍕','🎃','🦁','🐘','🐧','🚀','🦒'];

// ===== FORMA LA PALABRA =====
DATA.forma = {
  easy: [
    {emoji:'🐱',word:'GATO', letters:['G','A','T','O','R','S']},
    {emoji:'🐶',word:'PERRO',letters:['P','E','R','O','A','L']},
    {emoji:'🌸',word:'FLOR', letters:['F','L','O','R','A','E']},
    {emoji:'🌙',word:'LUNA', letters:['L','U','N','A','E','O']},
    {emoji:'🍎',word:'PERA', letters:['P','E','R','A','L','O']},
    {emoji:'🐟',word:'PEZ',  letters:['P','E','Z','A','R','T']},
    {emoji:'☀️',word:'SOL',  letters:['S','O','L','A','R','E']},
    {emoji:'🐸',word:'RANA', letters:['R','A','N','A','E','L']},
    {emoji:'🌊',word:'MAR',  letters:['M','A','R','E','S','L']},
    {emoji:'🍌',word:'PINO', letters:['P','I','N','O','A','L']},
    {emoji:'🦁',word:'LEON', letters:['L','E','O','N','R','S']},
    {emoji:'🐻',word:'OSO',  letters:['O','S','O','A','R','E']},
    {emoji:'🌺',word:'ROSA', letters:['R','O','S','A','L','E']},
    {emoji:'🏠',word:'CASA', letters:['C','A','S','A','O','L']},
    {emoji:'🐮',word:'VACA', letters:['V','A','C','A','O','L']},
  ],
  medium: [
    {emoji:'🐬',word:'DELFIN',letters:['D','E','L','F','I','N','A','O']},
    {emoji:'🦒',word:'JIRAFA',letters:['J','I','R','A','F','A','O','E']},
    {emoji:'🚗',word:'COCHE', letters:['C','O','C','H','E','A','R','L']},
    {emoji:'🌈',word:'ARCOIRIS',letters:['A','R','C','O','I','R','I','S','L','E']},
    {emoji:'🍕',word:'PIZZA', letters:['P','I','Z','Z','A','O','R','L']},
    {emoji:'🎈',word:'GLOBO', letters:['G','L','O','B','O','A','R','E']},
    {emoji:'🦊',word:'ZORRO', letters:['Z','O','R','R','O','A','L','E']},
    {emoji:'🐼',word:'PANDA', letters:['P','A','N','D','A','O','R','L']},
    {emoji:'🌴',word:'PALMA', letters:['P','A','L','M','A','O','R','E']},
    {emoji:'🎃',word:'BRUJA', letters:['B','R','U','J','A','O','L','E']},
    {emoji:'🐙',word:'PULPO', letters:['P','U','L','P','O','A','R','E']},
    {emoji:'🦄',word:'POTRO', letters:['P','O','T','R','O','A','L','E']},
    {emoji:'🚀',word:'NAVE',  letters:['N','A','V','E','O','R','L','T']},
    {emoji:'🌻',word:'CAMPO', letters:['C','A','M','P','O','R','L','E']},
    {emoji:'🏰',word:'TORRE', letters:['T','O','R','R','E','A','L','N']},
  ],
  hard: [
    {emoji:'🐊',word:'COCODRILO',letters:['C','O','C','O','D','R','I','L','O','A','E']},
    {emoji:'🌋',word:'VOLCAN',letters:['V','O','L','C','A','N','R','E','T']},
    {emoji:'🦋',word:'MARIPOSA',letters:['M','A','R','I','P','O','S','A','L','E']},
    {emoji:'🐘',word:'ELEFANTE',letters:['E','L','E','F','A','N','T','E','O','R']},
    {emoji:'🌺',word:'MARGARITA',letters:['M','A','R','G','A','R','I','T','A','O']},
    {emoji:'🦩',word:'FLAMENCO',letters:['F','L','A','M','E','N','C','O','R','T']},
    {emoji:'🦅',word:'AGUILA',letters:['A','G','U','I','L','A','O','R','E']},
    {emoji:'🌍',word:'CONTINENTE',letters:['C','O','N','T','I','N','E','N','T','E','A','R']},
    {emoji:'🎪',word:'ESPECTACULO',letters:['E','S','P','E','C','T','A','C','U','L','O','R']},
    {emoji:'🦁',word:'MELENA',letters:['M','E','L','E','N','A','O','R','T']},
  ]
};

// ===== CUENTOS =====
DATA.cuentos = [
  {
    title:'El dragón Pipo',
    hero:'Pipo',
    scenes:[
      {
        type:'choice',
        emoji:'🐉',
        text:'Pipo el dragón se despierta hambriento. Quiere desayunar, pero no sabe qué comer. ¿Qué le recomiendas?',
        choices:[
          {emoji:'🍎',text:'Fruta del bosque',result:'¡Pipo coge manzanas rojas y peras jugosas! Está delicioso.'},
          {emoji:'🍕',text:'Pizza de queso',result:'Pipo sopla fuego y hornea una pizza perfecta. ¡Ñam!'},
          {emoji:'🐟',text:'Peces del río',result:'Pipo vuela al río y pesca peces plateados. ¡Qué rico!'},
        ]
      },
      {
        type:'choice',
        emoji:'🌳',
        text:'Después de desayunar, Pipo quiere jugar. El bosque tiene muchos sitios divertidos. ¿A dónde va?',
        choices:[
          {emoji:'🏔️',text:'A la montaña nevada',result:'¡Pipo desliza por la nieve con su cola. Es rapidísimo!'},
          {emoji:'🌊',text:'Al lago azul',result:'Pipo se zambulle en el lago. ¡Hace unas olas enormes!'},
          {emoji:'🌺',text:'Al prado de flores',result:'Pipo juega entre las flores y las mariposas le hacen cosquillas.'},
        ]
      },
      {
        type:'choice',
        emoji:'😴',
        text:'Ya es tarde y Pipo tiene sueño. Necesita un lugar para dormir. ¿Dónde duerme?',
        choices:[
          {emoji:'🏰',text:'En su cueva secreta',result:'Pipo se acurruca en su cueva con sus tesoros. ¡Está calentito!'},
          {emoji:'☁️',text:'En una nube esponjosa',result:'Pipo flota sobre una nube suave. ¡Qué sueño tan dulce!'},
          {emoji:'🌲',text:'En lo alto de un árbol',result:'Pipo abraza el árbol más alto. Las estrellas le hacen compañía.'},
        ]
      },
      {type:'end',emoji:'🌟',text:'¡Buenas noches, Pipo!',sub:'Has ayudado al dragón a tener un día perfecto.'}
    ]
  },
  {
    title:'La sirena Coral',
    hero:'Coral',
    scenes:[
      {
        type:'choice',
        emoji:'🧜‍♀️',
        text:'Coral la sirena encuentra un cofre en el fondo del mar. Está muy oxidado. ¿Qué hace?',
        choices:[
          {emoji:'🔑',text:'Busca la llave',result:'Coral encuentra la llave entre las algas. ¡El cofre está lleno de perlas!'},
          {emoji:'🪨',text:'Lo abre con una roca',result:'¡Bam! Dentro hay un mapa de un tesoro secreto.'},
          {emoji:'🐙',text:'Pide ayuda al pulpo',result:'El pulpo usa sus tentáculos para abrir el cofre. ¡Hay monedas de oro!'},
        ]
      },
      {
        type:'choice',
        emoji:'🌊',
        text:'Una gran tormenta llega al mar. Las olas son muy grandes. ¿Cómo protege Coral a sus amigos?',
        choices:[
          {emoji:'🏝️',text:'Los lleva a una isla',result:'Coral guía a todos a una islita tranquila. Están a salvo.'},
          {emoji:'🐚',text:'Se esconden en la cueva de coral',result:'La cueva de coral los protege del temporal. ¡Qué valiente es Coral!'},
          {emoji:'🐋',text:'Pide ayuda a la ballena',result:'La ballena gigante los cubre con su aleta. ¡Son amigos para siempre!'},
        ]
      },
      {type:'end',emoji:'🌈',text:'¡El mar vuelve a estar en calma!',sub:'Coral salvó a todos sus amigos del mar.'}
    ]
  },
  {
    title:'El robot Bip',
    hero:'Bip',
    scenes:[
      {
        type:'choice',
        emoji:'🤖',
        text:'Bip el robot se estrena hoy. Quiere aprender algo nuevo. ¿Qué aprende primero?',
        choices:[
          {emoji:'🎨',text:'A pintar cuadros',result:'Bip mezcla colores y pinta un cuadro precioso. ¡Es un artista!'},
          {emoji:'⚽',text:'A jugar al fútbol',result:'Bip da una patada enorme. ¡Goool! Los niños lo celebran.'},
          {emoji:'🎵',text:'A tocar música',result:'Bip aprende a tocar el piano. Toca una canción muy alegre.'},
        ]
      },
      {
        type:'choice',
        emoji:'🏙️',
        text:'Bip ve que una señora mayor necesita ayuda para llevar sus bolsas. ¿Qué hace Bip?',
        choices:[
          {emoji:'💪',text:'Le lleva las bolsas',result:'Bip lleva todas las bolsas a la vez. La señora está muy contenta.'},
          {emoji:'🛒',text:'Le consigue un carrito',result:'Bip encuentra un carrito y se lo da. ¡Qué listo es Bip!'},
          {emoji:'📞',text:'Llama a alguien para ayudar',result:'Bip llama al hijo de la señora. Vienen corriendo a ayudar.'},
        ]
      },
      {type:'end',emoji:'🏆',text:'¡Bip es el mejor robot del mundo!',sub:'Aprendió cosas nuevas y ayudó a los demás.'}
    ]
  }
];
