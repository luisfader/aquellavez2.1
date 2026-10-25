/* ==========================================================
   Aquella vez 2 · datos comunes
   Personajes y catálogo de unidades.
   ========================================================== */
window.AV = window.AV || {};

/* Personajes. "color" es el color de sus frases en el libro.
   "voz" ajusta el tono de la lectura en voz alta. */
AV.personajes = {
  "Luis": {
    img: "p-luis", color: "azul", voz: { tono: 0.85 },
    rol: "El protagonista", ru: "Главный герой",
    desc: "Argentino. Es agente secreto de Sur Místico. Toca el piano, le encanta leer y siempre lleva su cubo de Rubik. Está comprometido con Nátasha, pero tiene una relación especial con Natalia.",
  },
  "Natalia": {
    img: "p-natalia", color: "rosa", voz: { tono: 1.15 },
    rol: "Rusa, de Moscú", ru: "Русская, из Москвы",
    desc: "Ahora vive en Mendoza y estudia español. Le encanta leer novelas y escribir en su cuaderno. Sale con Luis, pero no son novios. Su mejor amiga es Alicia.",
  },
  "Nátasha": {
    img: "p-natasha", color: "violeta", voz: { tono: 1.05 },
    rol: "Serbia", ru: "Сербка",
    desc: "Elegante, organizada y con muchas exigencias. Es la prometida de Luis y le encanta viajar con él. Siempre sabe exactamente lo que quiere.",
  },
  "Roberto": {
    img: "p-roberto", color: "verde", voz: { tono: 0.8 },
    rol: "El hermano de Luis", ru: "Брат Луиса",
    desc: "Arqueólogo y aventurero: ayudó a salvar Venecia y ahora se siente un poco héroe. Vive en un palacio de Venecia con su novia, la veneciana.",
  },
  "La veneciana": {
    img: "p-veneciana", color: "cafe", voz: { tono: 1.1 },
    rol: "Vive en Venecia", ru: "Живёт в Венеции",
    desc: "Es la novia de Roberto y vive con él en un palacio junto a los canales. Todos la llaman simplemente «la veneciana».",
  },
  "Alicia": {
    img: "p-alicia", color: "naranja", voz: { tono: 1.0 },
    rol: "Lee las cartas", ru: "Гадает на картах",
    desc: "Tiene una tienda donde tira las cartas y habla del futuro. Es la mejor amiga de Natalia y la novia de Marcos.",
  },
  "Marcos": {
    img: "p-marcos", color: "cafe", voz: { tono: 0.9 },
    rol: "Detective", ru: "Детектив",
    desc: "Es inteligente, pero se preocupa demasiado: duerme poco y siempre está investigando algún caso. Es el novio de Alicia.",
  },
  "Juan": {
    img: "p-juan", color: "cafe", voz: { tono: 0.75 },
    rol: "Empresario millonario", ru: "Миллионер, предприниматель",
    desc: "Rico, elegante y bastante presumido. Quiere conquistar a Natalia, pero ella prefiere a Luis.",
  },
  "Sofía": {
    img: "p-sofia", color: "cafe", voz: { tono: 1.2 },
    rol: "Vive en el norte", ru: "Живёт на севере",
    desc: "Vive en un lugar frío y tranquilo. Toca el piano y escucha una melodía misteriosa que la llama desde lejos.",
  },
  "La mujer de rosa": {
    img: "p-rosa", color: "rosa", voz: { tono: 1.1 },
    rol: "Misteriosa", ru: "Загадочная",
    desc: "Vive en una casa con flores y libros antiguos. Toma té, escribe en su diario y nunca olvida sus sueños.",
  },
  "Lucrezia Smith": {
    img: "p-lucrezia", color: "cafe", voz: { tono: 1.1 },
    rol: "Viajera y cocinera", ru: "Путешественница и повар",
    desc: "Le encanta viajar y cocinar. Su especialidad es el schnitzel alemán.",
  },
  "Julieta": {
    img: "p-julieta", color: "cafe", voz: { tono: 1.1 },
    rol: "Gran viajera", ru: "Путешественница",
    desc: "Amiga de Roberto. Ha viajado mucho y sueña con ver las pirámides de Egipto.",
  },
  "Sergio": {
    img: "p-sergio", color: "cafe", voz: { tono: 0.7 },
    rol: "El padre de Luis", ru: "Отец Луиса",
    desc: "Está casado con Olga. Desea que sus hijos sean felices y que encuentren su propio camino.",
  },
  "Periodista": { color: "cafe", voz: { tono: 1.05 }, sinRetrato: true },
};

/* Orden en la galería de personajes */
AV.ordenPersonajes = ["Luis", "Natalia", "Nátasha", "Roberto", "La veneciana", "Alicia", "Marcos", "Juan", "Sofía", "La mujer de rosa", "Lucrezia Smith", "Julieta", "Sergio"];

AV.quienEsQuien = [
  "Luis y Nátasha están comprometidos… pero Luis todavía no se lo ha contado a Natalia.",
  "Luis y Natalia salen juntos, pero no son novios: tienen una relación especial.",
  "Roberto y la veneciana son novios y viven en Venecia.",
  "Alicia y Marcos son novios. Alicia es la mejor amiga de Natalia.",
  "Luis y Roberto son hermanos.",
];

AV.familias = [
  ["Familia de Luis", "sus padres, Sergio y Olga; sus hermanos, Roberto, Carlos y Víctor; Luciana, la esposa de Víctor, y Mateo, su hijo."],
  ["Familia de Natalia", "sus padres, Ekaterina y Evgeniy, y sus hermanos, Andrey y Marina."],
];

/* Catálogo de unidades. "palo" es el palo de la baraja española del reverso. */
AV.unidades = [
  { n: 1, titulo: "Gustos, rutinas y un viaje misterioso", ru: "Вкусы, распорядок дня и загадочное путешествие", portada: "u1-portada", disponible: true, pagina: "unidad1.html", palo: "oros",
    apartados: ["Me gusta", "¿Dónde estuviste ayer?", "Un día de mi vida", "Gramática", "Cultura", "Historieta"] },
  { n: 2, titulo: "Preguntas, biografías y números", ru: "Вопросы, биографии и числа", portada: "u2-portada", disponible: true, pagina: "unidad2.html", palo: "copas",
    apartados: ["¿Cuánto sabes?", "Biografías", "Hablemos de números", "Gramática", "Cultura", "Historieta"] },
  { n: 3, titulo: "Familia, carácter y normas", ru: "Семья, характер и правила", palo: "espadas" },
  { n: 4, titulo: "Viajes, alojamiento y experiencias", ru: "Путешествия, жильё и опыт", palo: "bastos" },
  { n: 5, titulo: "Antes y ahora", ru: "Раньше и сейчас", palo: "oros" },
  { n: 6, titulo: "Compras y cocina", ru: "Покупки и кухня", palo: "copas" },
  { n: 7, titulo: "Deseos y subjuntivo", ru: "Желания и сослагательное наклонение", palo: "espadas" },
  { n: 8, titulo: "Planes y perífrasis", ru: "Планы и глагольные перифразы", palo: "bastos" },
  { n: 9, titulo: "Futuro y condiciones", ru: "Будущее и условия", palo: "oros" },
  { n: 10, titulo: "Sentimientos, tiempo y por/para", ru: "Чувства, время и por/para", palo: "copas" },
];
