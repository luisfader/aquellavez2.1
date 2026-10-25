/* ==========================================================
   Aquella vez 2 · Unidad 2 · Preguntas, biografías y números
   Textos del manual de Luis Fader (págs. 13–23).
   ========================================================== */
window.UNIDAD = {
  numero: 2,
  portada: "u2-portada",
  altPortada: "Luis en la Gran Vía de Madrid, junto a una boca de metro",
  lema: "De todas las maravillas del mundo, mi favorita eres tú.",
  siguiente: { href: "index.html#unidades", texto: "Volver a la baraja de unidades" },
  secciones: [
    /* ======================================================
       A. ¿CUÁNTO SABES? (págs. 14–15)
       ====================================================== */
    {
      id: "a", letra: "A", titulo: "¿Cuánto sabes?", corto: "¿Cuánto sabes?",
      ru: "Что ты знаешь об испаноязычном мире?",
      bloques: [
        {
          tipo: "test", num: "1", titulo: "Leer las preguntas y elegir la respuesta correcta", ru: "Прочитайте вопросы и выберите правильный ответ.",
          items: [
            { q: "¿En qué año llegó Cristóbal Colón a América?", opciones: ["1810", "1492", "1914"], r: 1, img: "u2-a-colon", alt: "Las carabelas de Colón llegan a una isla del Caribe", nota: "El 12 de octubre de 1492." },
            { q: "¿Cuál es la capital de Argentina?", opciones: ["Córdoba", "Mendoza", "Buenos Aires"], r: 2, img: "u2-a-tango", alt: "Una pareja baila tango junto al Obelisco de Buenos Aires", nota: "En Buenos Aires está el famoso Obelisco." },
            { q: "¿Cuál es la capital de España?", opciones: ["Madrid", "Barcelona", "Sevilla"], r: 0, img: "u2-a-madrid", alt: "Una bailaora de flamenco frente a la plaza de Cibeles, en Madrid" },
            { q: "¿Qué país hispanohablante está en África?", opciones: ["Marruecos", "Angola", "Guinea Ecuatorial"], r: 2, img: "u2-a-guinea", alt: "Mapa de África con Guinea Ecuatorial marcada", nota: "Guinea Ecuatorial es el único país de África con el español como lengua oficial." },
            { q: "¿Cuál es la capital de México?", opciones: ["Guadalajara", "Ciudad de México", "Monterrey"], r: 1 },
            { q: "¿En qué país están Machu Picchu y la ciudad de Cuzco?", opciones: ["Colombia", "Chile", "Perú"], r: 2, img: "u2-a-machupicchu", alt: "Una llama frente a las ruinas de Machu Picchu" },
            { q: "¿Qué país es famoso por el tango?", opciones: ["Guatemala", "Argentina", "Honduras"], r: 1 },
            { q: "¿Cuál es la capital de Cuba?", opciones: ["Santiago", "San Juan", "La Habana"], r: 2, nota: "San Juan es la capital de Puerto Rico." },
            { q: "¿Qué país hispanohablante tiene el canal que une dos océanos?", opciones: ["Uruguay", "Panamá", "Paraguay"], r: 1, nota: "El canal de Panamá une el océano Atlántico y el Pacífico." },
            { q: "¿Cuál de estos países no tiene salida al mar?", opciones: ["Paraguay", "Chile", "Ecuador"], r: 0, nota: "Bolivia y Paraguay son los dos países de Sudamérica sin mar." },
            { q: "¿Qué país está en el Caribe y comparte una isla con Haití?", opciones: ["Nicaragua", "República Dominicana", "Bolivia"], r: 1, nota: "Haití y la República Dominicana comparten la isla La Española." },
          ],
        },
        {
          tipo: "teoria", titulo: "Interrogativos y fórmula", ru: "Вопросительные слова: какое слово идёт с существительным, а какое — с глаголом.",
          html: `
            <div class="tabla-envoltura"><table class="tabla-formas">
              <tr><th>Fórmula</th><th>Ejemplo</th></tr>
              <tr><td>¿<b>Qué</b> + sustantivo + verbo?</td><td>¿Qué libro lees?</td></tr>
              <tr><td>¿<b>Qué</b> + verbo?</td><td>¿Qué haces?</td></tr>
              <tr><td>¿<b>Cuál</b> + verbo?</td><td>¿Cuál es tu ciudad favorita?</td></tr>
              <tr><td>¿<b>Cuáles</b> + verbo?</td><td>¿Cuáles son tus países favoritos?</td></tr>
              <tr><td>¿<b>Quién</b> + verbo?</td><td>¿Quién es Luis?</td></tr>
              <tr><td>¿<b>Quiénes</b> + verbo?</td><td>¿Quiénes son ellos?</td></tr>
              <tr><td>¿<b>Dónde</b> + verbo?</td><td>¿Dónde vives?</td></tr>
              <tr><td>¿<b>Cuándo</b> + verbo?</td><td>¿Cuándo estudias?</td></tr>
              <tr><td>¿<b>Cómo</b> + verbo?</td><td>¿Cómo estás?</td></tr>
              <tr><td>¿<b>Cuánto</b> + sustantivo + verbo?</td><td>¿Cuánto dinero tienes?</td></tr>
              <tr><td>¿<b>Cuánta</b> + sustantivo + verbo?</td><td>¿Cuánta agua bebes?</td></tr>
              <tr><td>¿<b>Cuántos</b> + sustantivo + verbo?</td><td>¿Cuántos libros tienes?</td></tr>
              <tr><td>¿<b>Cuántas</b> + sustantivo + verbo?</td><td>¿Cuántas lenguas hablas?</td></tr>
              <tr><td>¿<b>Por qué</b> + verbo?</td><td>¿Por qué estudias español?</td></tr>
            </table></div>
            <p>Todos los interrogativos llevan <b>tilde</b>. La respuesta a <i>¿por qué?</i> empieza con <b>porque</b> (junto y sin tilde).</p>`,
        },
        {
          tipo: "huecos", num: "2", titulo: "Completar la entrevista con el interrogativo correcto", ru: "Дополните интервью вопросительными словами. Слова можно использовать несколько раз.",
          imagen: "u2-a-natalia", alt: "Natalia sonríe", reutilizable: true,
          encabezado: "Entrevista a Natalia", textoBanco: "Interrogativos (puedes usarlos más de una vez)",
          banco: [["cuándo", "когда"], ["por qué", "почему"], ["quién", "кто"], ["cuántas", "сколько (ж. р., мн. ч.)"], ["qué", "что, какой"], ["cómo", "как"], ["cuánto", "сколько (м. р.)"], ["dónde", "где"], ["cuáles", "какие (из)"], ["cuánta", "сколько (ж. р.)"], ["cuál", "какой (из)"], ["cuántos", "сколько (м. р., мн. ч.)"]],
          parrafos: [
            "**Periodista:** Hola, Natalia. ¿{{Cómo}} estás?",
            "**Natalia:** Estoy muy bien, gracias.",
            "**Periodista:** ¿{{Dónde}} vives ahora?",
            "**Natalia:** Vivo en Mendoza, Argentina.",
            "**Periodista:** ¿{{Qué}} haces en tu tiempo libre?",
            "**Natalia:** Leo libros, camino por la ciudad y escucho música.",
            "**Periodista:** ¿{{Cuál}} es tu libro favorito?",
            "**Natalia:** Mi libro favorito es _Aquella vez_.",
            "**Periodista:** ¿{{Por qué}} te gusta ese libro?",
            "**Natalia:** Porque tiene amor, [[misterio|тайна]] y viajes.",
            "**Periodista:** ¿{{Cuándo}} estudias español?",
            "**Natalia:** Estudio español por la tarde.",
            "**Periodista:** ¿{{Quién}} es tu profesor?",
            "**Natalia:** Mi profesor es Luis.",
            "**Periodista:** ¿{{Cuántos|Qué}} idiomas hablas?",
            "**Natalia:** Hablo ruso, español e italiano.",
            "**Periodista:** ¿{{Qué}} países quieres visitar?",
            "**Natalia:** Quiero visitar Argentina, España y México.",
            "**Periodista:** ¿{{Cuánto}} tiempo estudias cada día?",
            "**Natalia:** Estudio una hora todos los días.",
            "**Periodista:** ¿{{Qué}} música escuchas normalmente?",
            "**Natalia:** Normalmente escucho música romántica.",
            "**Periodista:** Gracias, Natalia.",
            "**Natalia:** A ustedes.",
          ],
        },
      ],
    },

    /* ======================================================
       B. BIOGRAFÍAS (págs. 16–17)
       ====================================================== */
    {
      id: "b", letra: "B", titulo: "Biografías", corto: "Biografías",
      ru: "Биографии: прошедшее время (pretérito indefinido)",
      lema: "Si mi vida fuera un libro, tú serías mi capítulo favorito.",
      bloques: [
        {
          tipo: "texto", num: "1", titulo: "Leer el texto", ru: "Прочитайте текст о Фриде Кало.",
          imagen: "u2-b-frida", alt: "Retrato de Frida Kahlo con flores en el pelo y un rebozo bordado", capitular: true,
          encabezado: "Frida Kahlo: arte, dolor y revolución",
          parrafos: [
            "Frida Kahlo fue una [[artista|художница]] mexicana. [[Nació|родилась]] en 1907 en Coyoacán, México. Su [[nombre completo|полное имя]] era Magdalena Carmen Frida Kahlo Calderón. Vivió [[gran parte|большую часть]] de su vida en la Casa Azul, una casa muy famosa que hoy es el Museo Frida Kahlo.",
            "Cuando era joven, Frida [[sufrió|пережила]] un [[grave accidente de autobús|серьёзная авария автобуса]]. Durante mucho tiempo tuvo [[dolor|боль]] y [[problemas de salud|проблемы со здоровьем]]. En ese [[período|период]] empezó a pintar [[con más intensidad|ещё усерднее]]. Muchas de sus [[obras|произведения]] hablan de su [[cuerpo|тело]], de su [[sufrimiento|страдание]], de sus emociones y de su [[identidad|идентичность]].",
            "Frida pintó muchos [[autorretratos|автопортреты]]. En ellos aparece con flores, animales, ropa tradicional mexicana y [[símbolos personales|личные символы]]. Su arte tiene [[colores fuertes|яркие цвета]] y muestra el amor por la cultura mexicana, [[indígena|индейская, коренная]] y popular.",
            "Frida Kahlo también tuvo [[ideas políticas de izquierda|левые политические взгляды]]. [[Defendió|защищала]] la Revolución mexicana, [[admiró|восхищалась]] las culturas populares y [[estuvo cerca del comunismo|была близка к коммунизму]]. Su [[esposo|муж]] fue Diego Rivera, un famoso [[pintor muralista|художник-монументалист]] mexicano. Los dos fueron artistas muy importantes de México.",
            "Frida [[murió|умерла]] en 1954, pero su imagen y su obra [[siguen vivas|живы до сих пор]]. Hoy muchas personas la [[recuerdan|помнят]] como una mujer fuerte, original y [[libre|свободная]]. Para muchos, Frida Kahlo es un símbolo del arte mexicano, de la [[lucha personal|личная борьба]] y de la identidad de los [[pueblos|народы]] de Hispanoamérica.",
          ],
        },
        {
          tipo: "abierta", num: "2", titulo: "Responder las preguntas", ru: "Ответьте на вопросы по тексту.",
          imagen: "u2-b-sol", recorte: true, alt: "Un sol mexicano con cara sonriente",
          preguntas: [
            { q: "¿Quién fue Frida Kahlo?", modelo: "Fue una artista mexicana." },
            { q: "¿Dónde nació Frida Kahlo?", modelo: "Nació en Coyoacán, México." },
            { q: "¿En qué año nació?", modelo: "En 1907." },
            { q: "¿Qué problema tuvo Frida cuando era joven?", modelo: "Sufrió un grave accidente de autobús." },
            { q: "¿Qué empezó a hacer con más intensidad después del accidente?", modelo: "Empezó a pintar con más intensidad." },
          ],
        },
        {
          tipo: "vf", num: "3", titulo: "Marcar verdadero (V) o falso (F)", ru: "Верно (V) или неверно (F)?",
          imagen: "u2-b-casa", recorte: true, alt: "La Casa Azul, con flores y cactus",
          items: [
            { t: "Frida Kahlo fue una artista mexicana.", r: true },
            { t: "Frida nació en Coyoacán, México.", r: true },
            { t: "Frida vivió muchos años en la Casa Azul.", r: true },
            { t: "Frida nunca pintó autorretratos.", r: false, nota: "Pintó muchos autorretratos." },
            { t: "Frida no tenía interés por la cultura mexicana.", r: false, nota: "Su arte muestra el amor por la cultura mexicana." },
            { t: "Frida Kahlo tuvo ideas políticas de izquierda.", r: true },
            { t: "Diego Rivera fue su esposo.", r: true },
            { t: "Frida murió en 1971.", r: false, nota: "Murió en 1954." },
          ],
        },
        {
          tipo: "huecos", num: "4", titulo: "Completar el texto con las palabras del recuadro", ru: "Заполните пропуски словами из рамки.",
          imagen: "u2-b-borges", alt: "Jorge Luis Borges ante un laberinto y un minotauro",
          encabezado: "Jorge Luis Borges",
          banco: [["ciego", "слепой"], ["poemas", "стихи"], ["Ginebra", "Женева"], ["1899", "1899"], ["laberintos", "лабиринты"], ["argentino", "аргентинский"], ["Biblioteca Nacional", "Национальная библиотека"], ["cuentos", "рассказы"], ["Europa", "Европа"], ["ensayos", "эссе"], ["Buenos Aires", "Буэнос-Айрес"], ["libros", "книги"]],
          parrafos: [
            "Jorge Luis Borges fue un [[escritor|писатель]] {{argentino}}. Nació en {{Buenos Aires}} en el año {{1899}}.",
            "Cuando era joven, vivió algunos años en {{Europa}} con su familia. Desde pequeño leyó muchos {{libros}} y aprendió varios idiomas.",
            "Borges escribió {{poemas|cuentos|ensayos}}, {{poemas|cuentos|ensayos}} y {{poemas|cuentos|ensayos}}. Sus textos son muy famosos por sus temas [[misteriosos|загадочные]] e inteligentes. En sus obras aparecen muchas veces los sueños, los [[espejos|зеркала]], el tiempo y los {{laberintos}}.",
            "Durante su vida, Borges trabajó como profesor y también fue [[director|директор]] de la {{Biblioteca Nacional}} de Argentina. Con los años, [[quedó|стал]] casi completamente {{ciego}}, pero siguió escribiendo y dando [[conferencias|лекции]].",
            "Jorge Luis Borges murió en {{Ginebra}} en 1986. Hoy es considerado uno de los escritores más importantes de la literatura hispanoamericana.",
          ],
        },
        {
          tipo: "huecos", num: "5", titulo: "Completar el texto con los verbos en pretérito indefinido", ru: "Поставьте глаголы в скобках в pretérito indefinido.",
          imagen: "u2-b-fader", alt: "Retrato del pintor Fernando Fader de joven",
          encabezado: "Fernando Fader",
          parrafos: [
            "Fernando Fader {{nació}} (nacer) en [[Burdeos|Бордо]], Francia, en 1882. Cuando era niño, su familia {{llegó}} (llegar) a Mendoza, Argentina.",
            "De joven, Fader {{estudió}} (estudiar) arte en Europa. Más tarde, {{volvió}} (volver) a Argentina y {{empezó}} (empezar) a pintar [[paisajes|пейзажи]], animales y escenas de la vida [[cotidiana|повседневная]].",
            "En 1905, {{fundó}} (fundar) una [[academia de pintura|школа живописи]] en Mendoza. Después, {{participó}} (participar) en el grupo Nexus, junto con otros artistas argentinos.",
            "Durante algunos años, Fader también {{trabajó}} (trabajar) en los [[negocios|дела, бизнес]] de su familia. Sin embargo, tuvo problemas económicos y {{decidió}} (decidir) [[dedicarse|посвятить себя]] completamente al arte.",
            "Más tarde, por problemas de salud, {{se mudó}} (mudarse) a Córdoba. Allí {{pintó}} (pintar) muchos paisajes del norte cordobés.",
            "Fernando Fader {{murió}} (morir) en Córdoba en 1935. Hoy es recordado como uno de los grandes pintores argentinos.",
          ],
        },
      ],
    },

    /* ======================================================
       C. HABLEMOS DE NÚMEROS (págs. 18–19)
       ====================================================== */
    {
      id: "c", letra: "C", titulo: "Hablemos de números", corto: "Números",
      ru: "Поговорим о числах",
      lema: "Puedo contar las estrellas, pero no cuánto te quiero.",
      bloques: [
        { tipo: "figura", src: "u2-c-infografia", alt: "Infografía: Hispanoamérica en números, con años, habitantes y ciudades", ancha: true },
        {
          tipo: "texto", num: "1", titulo: "Leer el texto", ru: "Прочитайте текст. Обратите внимание на числа.",
          encabezado: "Hispanoamérica en números",
          parrafos: [
            "Hispanoamérica es el [[conjunto|совокупность]] de países americanos donde se habla español. En América hay 18 países hispanohablantes [[independientes|независимые]]. También hay territorios donde se habla español, como Puerto Rico.",
            "La [[historia moderna|новая история]] de Hispanoamérica cambió en 1492, cuando Cristóbal Colón llegó a América. Después, durante los siglos XVI, XVII y XVIII, el español [[se extendió|распространился]] por gran parte del [[continente|континент]].",
            "Hoy, México es el país hispanohablante con más [[habitantes|жители]]. En 2025 tenía aproximadamente 132 millones de personas. Su capital, Ciudad de México, es una de las ciudades más grandes del mundo.",
            "Colombia tiene más de 50 millones de habitantes. Argentina tiene más de 45 millones. Perú tiene más de 34 millones. Chile tiene casi 20 millones. Uruguay es mucho más pequeño: tiene [[alrededor de|около]] 3,4 millones de habitantes.",
            "Hispanoamérica también tiene ciudades muy importantes. Buenos Aires tiene más de 3 millones de habitantes en la ciudad y muchos más en su [[área metropolitana|агломерация]]. Lima, Bogotá, Santiago de Chile y Ciudad de México son grandes centros culturales, políticos y económicos.",
            "El español es una lengua [[enorme|огромный]]. En 2025 había más de 500 millones de [[hablantes nativos|носители языка]] de español en el mundo. Por eso, cuando estudiamos español, no estudiamos solamente una lengua: también entramos en una historia de más de 500 años, muchos países y millones de personas.",
            "Hispanoamérica no es un lugar pequeño. Es un mundo grande, [[diverso|разнообразный]] y lleno de números importantes: años, habitantes, ciudades, distancias, [[fechas históricas|исторические даты]] y culturas diferentes.",
          ],
        },
        {
          tipo: "huecos", num: "2", titulo: "Completar las frases con los números del recuadro", ru: "Дополните предложения числами из рамки.",
          lista: true, textoBanco: "Números",
          banco: ["34", "2025", "3,4", "132", "18", "500", "20", "1492", "45", "50"],
          parrafos: [
            "1. Cristóbal Colón llegó a América en {{1492}}.",
            "2. En América hay {{18}} países hispanohablantes independientes.",
            "3. En {{2025}} había más de {{500}} millones de hablantes nativos de español en el mundo.",
            "4. México tiene aproximadamente {{132}} millones de habitantes.",
            "5. Colombia tiene más de {{50}} millones de habitantes.",
            "6. Argentina tiene más de {{45}} millones de habitantes.",
            "7. Perú tiene más de {{34}} millones de habitantes.",
            "8. Chile tiene casi {{20}} millones de habitantes.",
            "9. Uruguay tiene alrededor de {{3,4}} millones de habitantes.",
          ],
        },
        {
          tipo: "sabias",
          texto: "En español, un **billón** es un millón de millones (1 000 000 000 000). En inglés, «billion» significa solo mil millones, así que hay que tener cuidado al traducir cifras.",
          ru: "Испанское «billón» — это триллион (миллион миллионов). Миллиард по-испански — «mil millones».",
        },
        {
          tipo: "huecos", num: "3", titulo: "Escribir los números en palabras", ru: "Напишите числа словами.",
          imagen: "u2-c-numeros", alt: "Alicia explica los números en español en una pizarra", lista: true,
          parrafos: [
            "1. 1492 → {{mil cuatrocientos noventa y dos}}",
            "2. 2025 → {{dos mil veinticinco}}",
            "3. 18 países → {{dieciocho}} países",
            "4. 500 millones → {{quinientos}} millones",
            "5. 132 millones → {{ciento treinta y dos}} millones",
            "6. 50 millones → {{cincuenta}} millones",
            "7. 45 millones → {{cuarenta y cinco}} millones",
            "8. 34 millones → {{treinta y cuatro}} millones",
            "9. 20 millones → {{veinte}} millones",
            "10. 3,4 millones → {{tres coma cuatro}} millones",
          ],
        },
        {
          tipo: "numerador", titulo: "Escucha cualquier número", etiqueta: "Herramienta",
          ru: "Введите любое число — увидите, как оно пишется и произносится по-испански.",
          inicial: "1907", ejemplos: ["1492", "2026", "132", "3,4", "500000000", "21"],
        },
      ],
    },

    /* ======================================================
       D. GRAMÁTICA (págs. 20–21)
       ====================================================== */
    {
      id: "d", letra: "D", titulo: "Gramática", corto: "Gramática",
      ru: "Грамматика: повторение Unidad 1 и 2",
      lema: "Ayer te soñé, hoy me encantas y siempre te elijo.",
      bloques: [
        {
          tipo: "teoria", titulo: "1. Gustos: gustar, encantar, preferir", imagen: "u2-d-mercado", alt: "Luis y Natalia en un mercado de artesanías",
          html: `
            <p>Usamos <b>gustar</b> para hablar de gustos.</p>
            <ul class="ejemplos"><li>A mí me gusta el café.</li><li>A Natalia le gusta caminar.</li><li>A Luis le gustan los libros.</li></ul>
            <div class="cuadro cuadro--doble">
              <div><p><b>me gusta</b> + singular o infinitivo</p><p><i>Me gusta la música. Me gusta leer.</i></p></div>
              <div><p><b>me gustan</b> + plural</p><p><i>Me gustan las ciudades tranquilas.</i></p></div>
            </div>
            <p><b>encantar</b> = gustar mucho: <i>A Natalia le encanta leer novelas.</i></p>
            <p><b>preferir</b> = elegir una cosa: <i>Luis prefiere los lugares tranquilos.</i></p>
            <h3>2. Verbos de rutina en presente</h3>
            <p>Usamos el presente para hablar de hábitos y rutinas.</p>
            <ul class="ejemplos"><li>Sofía se despierta temprano.</li><li>Después se levanta, se lava la cara y se viste.</li><li>Por la mañana lee y escribe.</li><li>Por la noche cena, escribe en su diario y se acuesta.</li></ul>
            <p><b>Verbos importantes:</b> despertarse, levantarse, lavarse, vestirse, desayunar, salir, caminar, leer, escribir, volver, cenar, acostarse.</p>`,
        },
        {
          tipo: "teoria", titulo: "3. Adverbios de frecuencia",
          html: `
            <p>Los adverbios de frecuencia indican cuántas veces hacemos algo.</p>
            <div class="tabla-envoltura"><table class="tabla-formas">
              <tr><td>100 %</td><td><b>siempre</b></td><td>La mujer de rosa siempre toma té.</td></tr>
              <tr><td>80 %</td><td><b>normalmente / por lo general</b></td><td>Sofía normalmente se despierta temprano.</td></tr>
              <tr><td>70 %</td><td><b>a menudo / muy seguido</b></td><td>Natalia visita cafés a menudo.</td></tr>
              <tr><td>60 %</td><td><b>muchas veces</b></td><td>Muchas veces mira las rosas.</td></tr>
              <tr><td>40 %</td><td><b>a veces</b></td><td>Luis a veces arma el cubo de Rubik.</td></tr>
              <tr><td>10 %</td><td><b>rara vez</b></td><td>Rara vez habla de sus secretos.</td></tr>
              <tr><td>0 %</td><td><b>nunca</b></td><td>Natalia nunca olvida sus sueños.</td></tr>
            </table></div>
            <p>Practica con el deslizador de la <a href="unidad1.html#d">Gramática de la Unidad 1</a>.</p>`,
        },
        {
          tipo: "teoria", titulo: "4. Pretérito indefinido", imagen: "u2-d-cafe", alt: "Luis y Natalia toman café en una terraza", imagenIzq: true,
          ru: "Pretérito indefinido — законченные действия в прошлом.",
          html: `
            <p>Usamos el pretérito indefinido para hablar de <b>acciones terminadas</b> en el pasado.</p>
            <ul class="ejemplos"><li>Ayer Natalia soñó con un tren fantasma.</li><li>Alicia vio algo extraño en las cartas.</li><li>Luis armó el cubo de Rubik.</li><li>Frida Kahlo nació en 1907.</li></ul>
            <div class="tabla-envoltura"><table class="tabla-formas">
              <tr><th>Regulares</th><th>él / ella</th><th>Irregulares</th><th>él / ella</th></tr>
              <tr><td>hablar</td><td><b>habló</b></td><td>nacer</td><td><b>nació</b></td></tr>
              <tr><td>estudiar</td><td><b>estudió</b></td><td>morir</td><td><b>murió</b></td></tr>
              <tr><td>vivir</td><td><b>vivió</b></td><td>ver</td><td><b>vio</b></td></tr>
              <tr><td>escribir</td><td><b>escribió</b></td><td>hacer</td><td><b>hizo</b></td></tr>
              <tr><td></td><td></td><td>tener</td><td><b>tuvo</b></td></tr>
              <tr><td></td><td></td><td>estar</td><td><b>estuvo</b></td></tr>
              <tr><td></td><td></td><td>ir / ser</td><td><b>fue</b></td></tr>
              <tr><td></td><td></td><td>volver</td><td><b>volvió</b></td></tr>
            </table></div>`,
        },
        {
          tipo: "sabias",
          texto: "«Vio», «fue» y «dio» se escriben **sin tilde** porque tienen una sola sílaba. En cambio, «habló», «comió» y «vivió» sí la llevan.",
          ru: "Односложные формы vio, fue, dio пишутся без ударения (tilde).",
        },
        {
          tipo: "teoria", titulo: "5. Interrogativos",
          html: `
            <div class="cuadro cuadro--doble">
              <div><p>¿<b>Qué</b> + sustantivo + verbo? <i>¿Qué libro lees?</i></p>
                <p>¿<b>Qué</b> + verbo? <i>¿Qué haces?</i></p>
                <p>¿<b>Cuál</b> + verbo? <i>¿Cuál es tu ciudad favorita?</i></p>
                <p>¿<b>Quién</b> + verbo? <i>¿Quién es Luis?</i></p>
                <p>¿<b>Dónde</b> + verbo? <i>¿Dónde vive Sofía?</i></p></div>
              <div><p>¿<b>Cuándo</b> + verbo? <i>¿Cuándo estudias?</i></p>
                <p>¿<b>Cómo</b> + verbo? <i>¿Cómo estás?</i></p>
                <p>¿<b>Cuánto/a/os/as</b> + sustantivo + verbo? <i>¿Cuántos libros tienes?</i></p>
                <p>¿<b>Por qué</b> + verbo? <i>¿Por qué estudias español?</i></p>
                <p>Respuesta: <i><b>Porque</b> me gusta la cultura hispánica.</i></p></div>
            </div>
            <h3>6. Números y años</h3>
            <div class="tabla-envoltura"><table class="tabla-formas">
              <tr><td>1492</td><td>mil cuatrocientos noventa y dos</td></tr>
              <tr><td>1907</td><td>mil novecientos siete</td></tr>
              <tr><td>2025</td><td>dos mil veinticinco</td></tr>
              <tr><td>500 millones</td><td>quinientos millones</td></tr>
              <tr><td>132 millones</td><td>ciento treinta y dos millones</td></tr>
              <tr><td>3,4 millones</td><td>tres coma cuatro millones</td></tr>
            </table></div>`,
        },
        {
          tipo: "test", num: "1", titulo: "Repaso rápido", etiqueta: "Para comprobar lo aprendido",
          ru: "Быстрое повторение: выберите правильный вариант.",
          items: [
            { q: "A Natalia le ___ las novelas románticas.", opciones: ["encanta", "encantan", "encanto"], r: 1, nota: "Las novelas es plural: le encantan." },
            { q: "Ayer Alicia ___ algo en las cartas.", opciones: ["vió", "ve", "vio"], r: 2, nota: "«Vio» no lleva tilde." },
            { q: "¿___ es tu ciudad favorita?", opciones: ["Cuál", "Qué", "Quién"], r: 0, nota: "Cuál + verbo." },
            { q: "La mujer de rosa ___ olvida sus sueños.", opciones: ["no nunca", "nunca", "nunca no"], r: 1, nota: "Con «nunca» antes del verbo, no usamos «no»." },
            { q: "¿___ libros tienes?", opciones: ["Cuántas", "Cuánto", "Cuántos"], r: 2, nota: "Libros es masculino plural." },
            { q: "Frida Kahlo ___ en 1907.", opciones: ["nació", "nace", "nacía"], r: 0, nota: "Acción terminada en el pasado: pretérito indefinido." },
            { q: "1907 se lee…", opciones: ["diecinueve cero siete", "mil novecientos siete", "mil nueve cientos siete"], r: 1 },
            { q: "Sofía ___ temprano todos los días.", opciones: ["despierta se", "se despiertan", "se despierta"], r: 2 },
          ],
        },
      ],
    },

    /* ======================================================
       E. CULTURA: MADRID (pág. 22)
       ====================================================== */
    {
      id: "e", letra: "E", titulo: "Cultura", corto: "Cultura",
      ru: "Культура: Мадрид",
      bloques: [
        { tipo: "figura", src: "u2-e-madrid", alt: "Postal de Madrid: la Gran Vía, Cibeles, el Retiro, el Palacio Real, la Puerta del Sol, el Prado, la Plaza Mayor, tapas y churros con chocolate" },
        {
          tipo: "texto", titulo: "Madrid", ru: "Прочитайте текст о Мадриде.", capitular: true,
          imagen: "u2-e-oso", alt: "El oso y el madroño, símbolo de Madrid",
          parrafos: [
            "Madrid es la [[capital|столица]] de España. Está en el centro del país. Es una ciudad grande, [[moderna|современная]] y con mucha historia.",
            "En Madrid viven muchas personas. También llegan turistas y estudiantes de diferentes países. Por eso, en la ciudad se escuchan muchos [[acentos|акценты]] y se conocen muchas culturas.",
            "Una calle muy famosa de Madrid es la Gran Vía. Allí hay [[tiendas|магазины]], teatros, cines, restaurantes y [[edificios|здания]] muy bonitos. Durante el día hay mucho [[movimiento|оживление]], y por la noche la calle también tiene mucha vida.",
            "Madrid también tiene parques. El Parque del Retiro es uno de los más conocidos. Allí [[la gente|люди]] camina, lee, [[hace deporte|занимается спортом]], toma fotos o descansa cerca del [[lago|пруд, озеро]].",
            "La ciudad es muy importante para el arte. En Madrid están el Museo del Prado y el Museo Reina Sofía. En estos museos se pueden ver [[obras|произведения]] de artistas muy famosos.",
            "La comida también es importante en Madrid. Allí se pueden comer [[tapas|закуски]], [[bocadillos de calamares|бутерброды с кальмарами]], [[churros con chocolate|чуррос с горячим шоколадом]] y muchos [[platos tradicionales|традиционные блюда]]. Los bares y cafés son lugares ideales para hablar con amigos.",
            "Madrid es una ciudad especial para estudiar español, porque tiene historia, cultura, arte, comida y mucha vida en la calle.",
          ],
        },
        {
          tipo: "abierta", num: "1", titulo: "Preguntas", ru: "Ответьте на вопросы по тексту.",
          preguntas: [
            { q: "¿Cuál es la capital de España?", modelo: "La capital de España es Madrid." },
            { q: "¿Dónde está Madrid?", modelo: "Está en el centro del país." },
            { q: "¿Qué hay en la Gran Vía?", modelo: "Hay tiendas, teatros, cines, restaurantes y edificios muy bonitos." },
            { q: "¿Qué se puede hacer en el Parque del Retiro?", modelo: "Se puede caminar, leer, hacer deporte, tomar fotos o descansar cerca del lago." },
            { q: "¿Qué museos famosos hay en Madrid?", modelo: "El Museo del Prado y el Museo Reina Sofía." },
            { q: "¿Qué comidas se pueden probar en Madrid?", modelo: "Tapas, bocadillos de calamares, churros con chocolate y muchos platos tradicionales." },
          ],
        },
      ],
    },

    /* ======================================================
       F. HISTORIETA (pág. 23)
       ====================================================== */
    {
      id: "f", letra: "F", titulo: "Historieta", corto: "Historieta",
      ru: "Комикс",
      bloques: [
        {
          tipo: "historieta", num: "1", titulo: "Leer la historieta", ru: "Прочитайте комикс. Нажмите на картинку, чтобы увеличить.",
          src: "u2-f-historieta", alt: "Historieta: dos amigas se hacen preguntas en un café",
        },
        {
          tipo: "abierta", num: "2", titulo: "Ahora tú: entrevista a un compañero", ru: "Задайте вопросы однокласснику и запишите ответы. Используйте вопросительные слова.",
          preguntas: [
            { q: "Escribe cinco preguntas con qué, cuál, dónde, cuándo y por qué.", lineas: 5, modelo: "¿Qué haces los fines de semana? ¿Cuál es tu comida favorita? ¿Dónde vives? ¿Cuándo estudias español? ¿Por qué te gusta viajar?" },
            { q: "Escribe las respuestas de tu compañero.", lineas: 5, modelo: "Los fines de semana paseo por el parque. Mi comida favorita es la pizza. Vivo en Moscú. Estudio español por la tarde. Me gusta viajar porque quiero conocer otras culturas." },
          ],
        },
      ],
    },
  ],
};
