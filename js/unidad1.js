/* ==========================================================
   Aquella vez 2 · Unidad 1 · Gustos, rutinas y un viaje misterioso
   Textos del manual de Luis Fader (págs. 1–11).
   ========================================================== */
window.UNIDAD = {
  numero: 1,
  portada: "u1-portada",
  altPortada: "Natalia, con el manual en las manos, en una plaza de Buenos Aires",
  lema: "A veces basta un «me gusta» para que empiece una historia inolvidable.",
  siguiente: { href: "unidad2.html", texto: "Seguir con la Unidad 2" },
  secciones: [
    /* ======================================================
       A. ME GUSTA (págs. 2–3)
       ====================================================== */
    {
      id: "a", letra: "A", titulo: "Me gusta", corto: "Me gusta",
      ru: "Мне нравится: вкусы и увлечения",
      lema: "Me gustan mil cosas, pero contigo todas me encantan.",
      bloques: [
        { tipo: "figura", src: "u1-a-dialogo", alt: "Luis y Natalia pasean por Buenos Aires, toman café y conversan" },
        {
          tipo: "dialogo", num: "1", titulo: "Leer el diálogo", ru: "Прочитайте диалог. Нажмите на подчёркнутое слово, чтобы увидеть перевод.",
          lineas: [
            { p: "Luis", t: "Natalia, [[quiero conocerte|хочу узнать тебя]] [[un poco más|немного лучше]]. ¿Qué te gusta hacer en tu [[tiempo libre|свободное время]]?" },
            { p: "Natalia", t: "Me gustan [[muchas cosas|многое]]. Me gusta [[caminar|гулять, ходить пешком]] por la ciudad, visitar [[cafés tranquilos|тихие кафе]] y [[escuchar|слушать]] música. También [[me encanta|мне очень нравится, обожаю]] leer [[novelas románticas|любовные романы]]." },
            { p: "Luis", t: "[[Qué lindo|Как мило!]]. ¿Y qué [[tipo de música|какую музыку]] escuchas [[normalmente|обычно]]?" },
            { p: "Natalia", t: "[[Depende del día|Зависит от дня]]. Cuando estoy [[tranquila|спокойна]], escucho [[música clásica|классическая музыка]]. Pero cuando estoy [[contenta|довольна, в хорошем настроении]], [[prefiero|предпочитаю]] [[canciones alegres|весёлые песни]]. ¿Y a ti, Luis? ¿Qué te gusta hacer?" },
            { p: "Luis", t: "A mí me gusta [[tocar el piano|играть на пианино]], leer, [[aprender idiomas|учить языки]] y mirar [[partidos de fútbol|футбольные матчи]]. También me gusta [[pasear|гулять, прогуливаться]] [[sin prisa|не спеша]], [[especialmente|особенно]] cuando la ciudad está [[bonita|красивая]]." },
            { p: "Natalia", t: "[[Entonces|значит, тогда]] tenemos [[algo en común|что-то общее]]: [[a los dos|нам обоим]] nos gusta caminar." },
            { p: "Luis", t: "Sí, [[es verdad|это правда]]. ¿Te gusta caminar por [[lugares nuevos|новые места]]?" },
            { p: "Natalia", t: "Sí, mucho. Me gusta [[descubrir|открывать для себя]] [[calles|улицы]], [[plazas|площади]] y [[pequeños restaurantes|маленькие рестораны]]. Pero no me gustan los lugares con [[demasiado ruido|слишком много шума]]." },
            { p: "Luis", t: "[[A mí tampoco|мне тоже нет]]. Prefiero los lugares tranquilos, [[donde se puede hablar|где можно поговорить]] bien." },
            { p: "Natalia", t: "Entonces [[un día|однажды, как-нибудь]] podemos pasear [[juntos|вместе]] por Buenos Aires." },
            { p: "Luis", t: "[[Me encantaría|с удовольствием (мне бы очень хотелось)]]. Podemos [[tomar un café|выпить кофе]], caminar por una [[avenida|проспект]] bonita y [[después|потом]] [[elegir|выбрать]] un lugar para [[cenar|ужинать]]." },
            { p: "Natalia", t: "[[Me parece|мне кажется]] un [[plan perfecto|отличный план]]." },
          ],
        },
        {
          tipo: "vf", num: "2", titulo: "Comprensión del diálogo", ru: "Отметьте: верно (V) или неверно (F).",
          imagen: "u1-a-img39", recorte: true, alt: "Natalia",
          items: [
            { t: "Natalia dice que le gusta caminar por la ciudad.", r: true },
            { t: "Natalia prefiere los lugares con mucho ruido.", r: false, nota: "No le gustan los lugares con demasiado ruido." },
            { t: "Luis dice que le gusta tocar el piano.", r: true },
            { t: "A Luis no le gusta aprender idiomas.", r: false, nota: "A Luis le gusta aprender idiomas." },
            { t: "A los dos les gusta caminar.", r: true },
            { t: "Natalia quiere pasear por Buenos Aires con Luis.", r: true },
          ],
        },
        {
          tipo: "teoria", titulo: "Recuerda: gustar, encantar, preferir", ru: "Глагол gustar согласуется с тем, что нравится, а не с человеком.",
          html: `
            <p><b>Gustar</b> concuerda con lo que gusta, no con la persona.</p>
            <div class="tabla-envoltura"><table class="tabla-formas">
              <tr><th>¿A quién?</th><th>Pronombre</th><th>+ singular o infinitivo</th><th>+ plural</th></tr>
              <tr><td>a mí</td><td><b>me</b></td><td>me gusta el café</td><td>me gustan los libros</td></tr>
              <tr><td>a ti</td><td><b>te</b></td><td>te gusta leer</td><td>te gustan las plazas</td></tr>
              <tr><td>a él, a ella, a usted</td><td><b>le</b></td><td>le gusta caminar</td><td>le gustan las novelas</td></tr>
              <tr><td>a nosotros, a nosotras</td><td><b>nos</b></td><td>nos gusta pasear</td><td>nos gustan los cafés</td></tr>
              <tr><td>a ellos, a ellas, a ustedes</td><td><b>les</b></td><td>les gusta la música</td><td>les gustan los lugares tranquilos</td></tr>
            </table></div>
            <p><b>encantar</b> = gustar mucho: <i>A Natalia le encanta leer novelas.</i></p>
            <p><b>preferir</b> = elegir una cosa: <i>Luis prefiere los lugares tranquilos.</i></p>
            <p>Más en <a href="unidad2.html#d">Gramática de la Unidad 2</a>.</p>`,
        },
        {
          tipo: "huecos", num: "3", titulo: "Completar: G = gustar; E = encantar", ru: "Вставьте gustar (G) или encantar (E) в правильной форме: le gusta, les gustan…",
          imagen: "u1-a-img41", recorte: true, alt: "Una matrioshka y un cubo de Rubik", lista: true,
          parrafos: [
            "1. A Natalia {{le gusta}} caminar. **(G)**",
            "2. A Natalia {{le encantan}} las novelas. **(E)**",
            "3. A Natalia {{le gusta}} la música clásica. **(G)**",
            "4. A Luis {{le gusta}} tocar el piano. **(G)**",
            "5. A los dos {{les gustan}} los lugares tranquilos. **(G)**",
            "6. A Natalia no {{le gustan}} los lugares [[ruidosos|шумные]]. **(G)**",
          ],
        },
        {
          tipo: "abierta", num: "4", titulo: "Responder con tus ideas", ru: "Ответьте своими словами. Ответы сохраняются в этом браузере.",
          imagen: "u1-a-img40", recorte: true, alt: "Luis con un cubo de Rubik",
          preguntas: [
            { q: "¿Qué te gusta hacer en tu tiempo libre?", modelo: "En mi tiempo libre me gusta leer, caminar por el parque y escuchar música." },
            { q: "¿Qué tipo de música escuchas normalmente?", modelo: "Normalmente escucho música pop, pero cuando estoy tranquilo prefiero la música clásica." },
            { q: "¿Prefieres los lugares tranquilos o los lugares con mucho ruido? ¿Por qué?", modelo: "Prefiero los lugares tranquilos, porque allí se puede hablar bien." },
            { q: "¿Te gusta caminar por lugares nuevos?", modelo: "Sí, me encanta descubrir calles, plazas y cafés nuevos." },
            { q: "Invita a una persona a pasear contigo. Escribe una frase.", modelo: "¿Quieres pasear conmigo el sábado por el centro? Después podemos tomar un café." },
          ],
        },
      ],
    },

    /* ======================================================
       B. ¿DÓNDE ESTUVISTE AYER? (págs. 4–5)
       ====================================================== */
    {
      id: "b", letra: "B", titulo: "¿Dónde estuviste ayer?", corto: "¿Dónde estuviste ayer?",
      ru: "Где ты был(а) вчера? Прошедшее время (pretérito indefinido)",
      lema: "Hasta en mis sueños de ayer, el destino me llevaba hacia ti.",
      bloques: [
        {
          tipo: "dialogo", num: "1", titulo: "Leer el diálogo", ru: "Прочитайте диалог.",
          imagen: "u1-b-cartas", alt: "Alicia lee las cartas a Natalia junto a una bola de cristal",
          intro: "Natalia [[fue a visitar|пошла в гости к]] a su amiga Alicia.",
          lineas: [
            { p: "Alicia", t: "[[Ayer|вчера]] [[vi|я увидела (ver)]] algo en [[las cartas|гадальные карты]]." },
            { p: "Natalia", t: "¿[[Qué viste|что ты увидела]]?" },
            { p: "Alicia", t: "Vi a Luis, [[el chico con el que sales|парень, с которым ты встречаешься]]." },
            { p: "Natalia", t: "¡[[Qué curioso|как интересно]]! ¿Y [[qué más|что ещё]] viste?" },
            { p: "Alicia", t: "¡Vi a una mujer [[junto a él|рядом с ним]]!" },
            { p: "Natalia", t: "¿[[De verdad|правда?]]? ¿Y quién [[era|была]] esa mujer?" },
            { p: "Alicia", t: "Era una mujer [[hermosa|красивая]] con un [[manual|учебник]] de español y una [[campera|куртка (в Аргентине)]] [[marrón claro|светло-коричневая]]." },
            { p: "Natalia", t: "¡[[Esa soy yo|да это же я]]! Jajaja, ¡[[me asustaste|ты меня напугала]]!" },
            { p: "Alicia", t: "Sí. [[Puedo decir|могу сказать]] que en las cartas vi una [[pareja|пара]] muy [[feliz|счастливая]]." },
          ],
        },
        {
          tipo: "vf", num: "2", titulo: "Verdadero (V) o falso (F)", ru: "Верно (V) или неверно (F)?",
          items: [
            { t: "Natalia fue a visitar a su amiga Alicia.", r: true },
            { t: "Alicia vio a Roberto en las cartas.", r: false, nota: "Alicia vio a Luis." },
            { t: "Natalia sale con Luis.", r: true },
            { t: "Alicia vio a un hombre junto a Luis.", r: false, nota: "Vio a una mujer junto a él." },
            { t: "La mujer de las cartas tenía un manual de español.", r: true },
            { t: "La mujer llevaba una campera negra.", r: false, nota: "La campera era marrón claro." },
            { t: "Natalia era la mujer de las cartas.", r: true },
            { t: "Al final, Alicia vio una pareja muy feliz.", r: true },
          ],
        },
        {
          tipo: "unir", num: "3", titulo: "Unir cada pregunta con la respuesta correcta", ru: "Соедините каждый вопрос с правильным ответом.",
          items: [
            { q: "¿A quién fue a visitar Natalia?", r: "c" },
            { q: "¿A quién vio Alicia en las cartas?", r: "f" },
            { q: "¿Quién estaba junto a Luis?", r: "d" },
            { q: "¿Qué llevaba la mujer?", r: "e" },
            { q: "¿Quién era esa mujer?", r: "a" },
            { q: "¿Qué vio Alicia al final?", r: "b" },
          ],
          opciones: { a: "Natalia.", b: "Una pareja muy feliz.", c: "A su amiga Alicia.", d: "Una mujer hermosa.", e: "Un manual y una campera marrón claro.", f: "A Luis, el chico con el que sale Natalia." },
        },
        {
          tipo: "formas", titulo: "El verbo ver en pretérito indefinido", etiqueta: "Ponte a prueba",
          ru: "Спрягайте глагол ver в pretérito indefinido. Заполните таблицу и нажмите «Comprobar».",
          encabezados: ["Persona", "Ver"],
          filas: [["yo", "vi"], ["tú / vos", "viste"], ["él / ella / usted", "vio"], ["nosotros / nosotras", "vimos"], ["vosotros / vosotras", "visteis"], ["ellos / ellas / ustedes", "vieron"]],
          pie: "¡Atención! **vi** y **vio** se escriben sin tilde.",
        },
        {
          tipo: "huecos", num: "4", titulo: "Completar el texto con las palabras del recuadro", ru: "Заполните пропуски словами из рамки: нажмите на пропуск, потом на слово (или перетащите слово).",
          imagen: "u1-b-egipto", alt: "Las desventuras de Luis en Egipto: el aeropuerto, el taxi, las pirámides y el camello",
          encabezado: "Las peores vacaciones de Luis en Egipto",
          banco: [["maleta", "чемодан"], ["pirámides", "пирамиды"], ["dinero", "деньги"], ["agua", "вода"], ["taxi", "такси"], ["volvió", "вернулся"], ["calor", "жара"], ["mapa", "карта"], ["vacaciones", "отпуск"], ["restaurante", "ресторан"], ["fotos", "фотографии"], ["noche", "вечер, ночь"], ["hotel", "гостиница"], ["enfermo", "больной"], ["aeropuerto", "аэропорт"], ["camello", "верблюд"]],
          parrafos: [
            "El año pasado Luis [[viajó|поехал]] a Egipto para pasar sus {{vacaciones}}. [[Al principio|сначала]] estaba muy [[contento|доволен]], pero todo [[empezó mal|началось плохо]] en el {{aeropuerto}}. Su [[vuelo|рейс]] [[llegó tarde|прилетел с опозданием]] y, cuando fue a buscar su [[equipaje|багаж]], no encontró su {{maleta}}.",
            "Después tomó un {{taxi}} para ir al {{hotel}}, pero el [[conductor|водитель]] no conocía bien la [[dirección|адрес]]. Luis llegó [[cansado|уставший]] y con mucho {{calor}}. En la habitación no había [[aire acondicionado|кондиционер]] y tampoco había [[suficiente|достаточно]] {{agua}} para beber.",
            "[[Al día siguiente|на следующий день]], Luis visitó las {{pirámides}}. Quería [[sacar|сделать (фото)]] muchas {{fotos}}, pero [[se le olvidó|он забыл]] la cámara en el hotel. Luego [[subió a|сел на]] un {{camello}}, pero el animal caminó muy rápido y Luis [[casi se cayó|чуть не упал]].",
            "Más tarde, Luis [[perdió|потерял]] el {{mapa}} y no pudo encontrar el [[camino correcto|правильная дорога]]. Entró en un {{restaurante}} para [[descansar|отдохнуть]], pero comió algo muy [[picante|острое]] y [[se sintió|почувствовал себя]] {{enfermo}}.",
            "Por la {{noche}}, quiso comprar un [[recuerdo|сувенир]], pero [[descubrió|обнаружил]] que no tenía suficiente {{dinero}}. [[Al final|в конце концов]], Luis {{volvió}} a Argentina muy cansado. Dijo: «Egipto fue [[hermoso|прекрасный]], pero mis vacaciones fueron un [[desastre|катастрофа]]».",
          ],
        },
        {
          tipo: "huecos", num: "5", titulo: "Completar con el verbo estar o ir en pretérito indefinido", ru: "Вставьте глагол estar или ir в pretérito indefinido.",
          antes: `<div class="tabla-envoltura"><table class="tabla-formas">
              <tr><th></th><th>yo</th><th>tú</th><th>él / ella</th><th>nosotros</th><th>ellos / ellas</th></tr>
              <tr><td><b>estar</b></td><td>estuve</td><td>estuviste</td><td>estuvo</td><td>estuvimos</td><td>estuvieron</td></tr>
              <tr><td><b>ir</b></td><td>fui</td><td>fuiste</td><td>fue</td><td>fuimos</td><td>fueron</td></tr>
            </table></div>`,
          lista: true,
          parrafos: [
            "1. El año pasado Luis {{fue}} de vacaciones a Egipto.",
            "2. El primer día, Luis {{estuvo}} tres horas en el aeropuerto buscando su maleta.",
            "3. Después {{fue}} al hotel en taxi, pero el conductor [[se perdió|заблудился]].",
            "4. —¿Dónde {{estuviste}} ayer, Luis? —{{Estuve}} en las pirámides de Guiza.",
            "5. Por la tarde, Luis y el [[guía|гид]] {{fueron}} al [[desierto|пустыня]] en camello.",
            "6. Luis {{estuvo}} enfermo dos días [[por culpa de|из-за]] la comida picante.",
            "7. —¿{{Fuiste}} al Museo Egipcio? —No, no {{fui}} porque no tenía dinero.",
            "8. [[Mientras tanto|тем временем]], Natalia y Alicia {{estuvieron}} en Buenos Aires todo el mes.",
            "9. Cuando Luis volvió, él y Natalia {{fueron}} a un café tranquilo y él le [[contó|рассказал]] todo.",
            "10. Nosotros nunca {{estuvimos}} en Egipto, pero ya conocemos las [[aventuras|приключения]] de Luis.",
          ],
        },
        {
          tipo: "sabias",
          texto: "«Ir» y «ser» tienen el mismo pretérito indefinido: **fui, fuiste, fue…** Solo el contexto los distingue: «Fui a Egipto» (ir) / «Fui muy feliz» (ser).",
          ru: "У глаголов ir (идти, ехать) и ser (быть) одинаковые формы в pretérito indefinido. Различить их можно только по контексту.",
        },
        { tipo: "figura", src: "u1-b-banner", alt: "Siluetas de un tren antiguo, cartas, una bola de cristal y una matrioshka bajo la luna", ancha: true },
      ],
    },

    /* ======================================================
       C. UN DÍA DE MI VIDA (págs. 6–7)
       ====================================================== */
    {
      id: "c", letra: "C", titulo: "Un día de mi vida", corto: "Un día de mi vida",
      ru: "Один день моей жизни: распорядок дня",
      lema: "Mi rutina favorita es despertarme con la ilusión de verte.",
      bloques: [
        {
          tipo: "texto", num: "1", titulo: "Leer el texto", ru: "Прочитайте текст о Софии.",
          imagen: "u1-c-sofia", alt: "Sofía junto a la ventana, con un piano y la nieve del norte", capitular: true,
          encabezado: "Un día en la vida de Sofía",
          parrafos: [
            "Hola, [[me llamo|меня зовут]] Sofía. Vivo en [[el norte|север]], en un lugar tranquilo, [[frío|холодный]] y muy bonito. Mi vida [[parece|кажется]] normal, pero siempre [[siento|чувствую]] que hay una música [[secreta|тайная]] [[cerca de mí|рядом со мной]].",
            "Todos los días [[me despierto|просыпаюсь]] [[temprano|рано]]. Primero abro los ojos y escucho el [[silencio|тишина]] de la mañana. Después [[me levanto|встаю]], [[me lavo la cara|умываюсь]] y [[me visto|одеваюсь]]. Normalmente llevo [[ropa cómoda|удобная одежда]], porque camino mucho [[durante el día|в течение дня]].",
            "Luego [[desayuno|завтракаю]] en la cocina. Tomo [[té caliente|горячий чай]] y como [[pan con mantequilla|хлеб с маслом]]. [[Mientras|пока, в то время как]] desayuno, miro por la [[ventana|окно]]. A veces veo [[nieve|снег]], a veces veo [[niebla|туман]], y a veces el [[cielo|небо]] está [[claro|ясное]] y azul.",
            "Después [[salgo de casa|выхожу из дома]]. Camino por las calles tranquilas y [[saludo|здороваюсь]] a algunas personas. Me gusta caminar [[despacio|медленно]], porque así puedo pensar. Muchas veces escucho una [[melodía|мелодия]] en mi [[cabeza|голова]]. No sé [[de dónde viene|откуда она]], pero siempre [[vuelve|возвращается]].",
            "Por la mañana estudio, leo y escribo en mi [[cuaderno|тетрадь]]. También [[ayudo en casa|помогаю по дому]] y [[ordeno mis cosas|навожу порядок в вещах]]. Cuando tengo tiempo, toco algunas [[notas|ноты]] en el piano. La música [[me calma|меня успокаивает]], pero también me hace [[recordar|вспоминать]] algo que [[todavía no comprendo|ещё не понимаю]].",
            "[[Al mediodía|в полдень]] [[almuerzo|обедаю]] algo [[simple|простое]]. Después [[descanso|отдыхаю]] un poco y leo. Me gustan las historias de viajes, de amor y de [[lugares lejanos|далёкие места]]. A veces [[sueño con|мечтаю о]] conocer a una persona que también [[escuche|слышала бы]] la misma melodía.",
            "Por la tarde salgo [[otra vez|снова]]. Camino cerca del [[río|река]] o por el [[bosque|лес]]. [[Respiro|дышу]] el aire frío y [[observo el paisaje|любуюсь пейзажем]]. El norte es [[silencioso|тихий]], pero nunca está [[vacío|пустой]]. Para mí, cada [[árbol|дерево]], cada [[piedra|камень]] y cada [[nube|облако]] tiene una [[voz|голос]].",
            "Por la noche [[vuelvo a casa|возвращаюсь домой]]. [[Ceno|ужинаю]], preparo un poco de té y escribo en mi [[diario|дневник]]. Escribo [[lo que hago|то, что делаю]], [[lo que siento|то, что чувствую]] y lo que escucho. [[Antes de dormir|перед сном]], miro por la ventana y pienso en la melodía.",
            "[[Finalmente|наконец]] [[me acuesto|ложусь спать]]. [[Cierro los ojos|закрываю глаза]] y [[espero|жду]]. A veces la música [[aparece|появляется]] en mis [[sueños|сны]]. Entonces comprendo que mi vida no es una vida [[común|обычная]]. Algo [[me llama|меня зовёт]] [[desde lejos|издалека]], y yo sé que [[algún día|когда-нибудь]] voy a descubrir qué [[significa|означает]].",
          ],
        },
        { tipo: "figura", src: "u1-c-paisaje", alt: "Siluetas: Sofía lee, toca el piano y pasea por el bosque nevado", ancha: true },
        {
          tipo: "huecos", num: "2", titulo: "Completar el texto con los verbos del recuadro en presente", ru: "Вставьте глаголы из рамки в настоящем времени.",
          encabezado: "El día de Sofía",
          banco: [["sale", "выходит"], ["se viste", "одевается"], ["vuelve", "возвращается"], ["lee", "читает"], ["se despierta", "просыпается"], ["toca", "играет"], ["cena", "ужинает"], ["se lava", "умывает"], ["mira", "смотрит"], ["se acuesta", "ложится спать"], ["desayuna", "завтракает"], ["escribe", "пишет"], ["se levanta", "встаёт"], ["camina", "гуляет"]],
          parrafos: [
            "Sofía vive en el norte, en un lugar frío y tranquilo. Todos los días {{se despierta}} temprano. Primero abre los ojos y escucha el silencio de la mañana. Después {{se levanta}} de la cama, {{se lava}} la cara y {{se viste}} con ropa cómoda.",
            "Luego {{desayuna}} en la cocina. Toma té caliente y come pan con mantequilla. Mientras desayuna, {{mira}} por la ventana. A veces ve nieve y a veces ve las [[montañas|горы]].",
            "Después {{sale}} de casa. Sofía {{camina}} por las calles tranquilas y piensa en una melodía [[misteriosa|загадочная]]. Por la mañana {{lee}} libros y {{escribe}} en su cuaderno.",
            "Cuando tiene tiempo, {{toca}} algunas notas en el piano. La música la calma y la hace soñar.",
            "Por la tarde, Sofía [[pasea|гуляет]] cerca del río. Por la noche {{vuelve}} a casa, {{cena}} algo simple y prepara té.",
            "Antes de dormir, escribe en su diario. Finalmente {{se acuesta}} y cierra los ojos. A veces la melodía aparece en sus sueños.",
          ],
        },
        {
          tipo: "huecos", num: "3", titulo: "Completar libremente con los adverbios del recuadro", ru: "Вставьте наречия из рамки. Каждое — только один раз. Возможны разные варианты.",
          nota: "Usa cada adverbio una sola vez. Puede haber varias respuestas correctas.",
          imagen: "u1-c-rosa", alt: "La mujer de rosa explica los adverbios de frecuencia en la pizarra",
          encabezado: "La mujer de rosa", textoBanco: "Adverbios (cada uno, una sola vez)",
          banco: [["a veces", "иногда"], ["nunca", "никогда"], ["normalmente", "обычно"], ["rara vez", "редко"], ["siempre", "всегда"], ["muchas veces", "много раз"], ["a menudo", "часто"]],
          parrafos: [
            "La mujer de rosa vive en una casa tranquila, con [[flores|цветы]] y libros [[antiguos|старинные]].",
            "{{?}} se despierta temprano y abre la ventana. {{?}} prepara una [[taza|чашка]] de té y lee un libro [[junto a|рядом с]] la mesa.",
            "{{?}} escribe en su cuaderno, porque tiene muchos [[pensamientos|мысли]]. {{?}} camina por el [[jardín|сад]] y mira las [[rosas|розы]].",
            "{{?}} escucha música romántica y [[recuerda|вспоминает]] historias del pasado. La mujer de rosa {{?}} habla de sus [[secretos|секреты]], porque es muy misteriosa.",
            "Pero {{?}} [[olvida|забывает]] sus sueños. Por la noche, escribe en su diario y espera un día bonito.",
          ],
          solucionLibre: ["siempre", "normalmente", "a menudo", "muchas veces", "a veces", "rara vez", "nunca"],
          propuesta: "Siempre se despierta temprano… Normalmente prepara una taza de té… A menudo escribe en su cuaderno… Muchas veces camina por el jardín… A veces escucha música romántica… La mujer de rosa rara vez habla de sus secretos… Pero nunca olvida sus sueños.",
        },
      ],
    },

    /* ======================================================
       D. GRAMÁTICA (págs. 8–9)
       ====================================================== */
    {
      id: "d", letra: "D", titulo: "Gramática", corto: "Gramática",
      ru: "Грамматика: наречия частотности",
      lema: "A veces sueño contigo; siempre te llevo en el corazón.",
      bloques: [
        {
          tipo: "teoria", titulo: "Los adverbios de frecuencia", imagen: "u1-d-img50", alt: "La mujer de rosa escribe en su diario",
          ru: "Наречия частотности показывают, как часто мы что-то делаем.",
          html: `
            <p>Los adverbios de frecuencia indican <b>cuántas veces</b> hacemos una acción.</p>
            <ul class="ejemplos">
              <li>La mujer de rosa <em>siempre</em> toma té por la mañana.</li>
              <li>La mujer de rosa <em>a veces</em> escucha música romántica.</li>
              <li>La mujer de rosa <em>nunca</em> olvida sus sueños.</li>
            </ul>`,
        },
        {
          tipo: "escala", titulo: "1. Los adverbios, de siempre a nunca", ru: "Передвиньте ползунок: от «никогда» (0 %) до «всегда» (100 %).",
          filas: [
            { pct: 100, es: "siempre", ru: "всегда", ej: "La mujer de rosa siempre escribe en su diario." },
            { pct: 80, es: "normalmente / por lo general", ru: "обычно, как правило", ej: "Normalmente lee un libro junto a la ventana." },
            { pct: 70, es: "a menudo / muy seguido", ru: "часто", ej: "A menudo camina por el jardín." },
            { pct: 60, es: "muchas veces", ru: "много раз, часто", ej: "Muchas veces mira las rosas." },
            { pct: 40, es: "a veces", ru: "иногда", ej: "A veces escucha música romántica." },
            { pct: 10, es: "rara vez", ru: "редко", ej: "Rara vez habla de sus secretos." },
            { pct: 0, es: "nunca", ru: "никогда", ej: "Nunca olvida sus sueños." },
          ],
        },
        {
          tipo: "teoria", imagen: "u1-d-img51", alt: "Luis con un cuaderno", imagenIzq: true,
          html: `
            <h3>2. Posición en la frase</h3>
            <p>Normalmente, los adverbios de frecuencia pueden ir:</p>
            <div class="posiciones">
              <div class="posicion"><h5>A) Antes del verbo</h5>
                <p>La mujer de rosa <mark>siempre</mark> prepara té.</p>
                <p>Luis <mark>normalmente</mark> estudia por la mañana.</p>
                <p>Natalia <mark>a veces</mark> camina por la ciudad.</p></div>
              <div class="posicion"><h5>B) Al principio de la frase</h5>
                <p><mark>Siempre</mark> prepara té.</p>
                <p><mark>Normalmente</mark> lee un libro.</p>
                <p><mark>A veces</mark> escucha música.</p></div>
              <div class="posicion"><h5>C) Al final de la frase</h5>
                <p>La mujer de rosa escribe en su diario <mark>muchas veces</mark>.</p>
                <p>Natalia visita cafés tranquilos <mark>a menudo</mark>.</p></div>
            </div>
            <h3>3. Atención: «nunca»</h3>
            <p>Con <b>nunca</b> antes del verbo, el verbo va en forma <b>afirmativa</b>.</p>
            <p class="ru" lang="ru">Если «nunca» стоит перед глаголом, отрицание «no» не нужно.</p>
            <div class="correcto">La mujer de rosa nunca olvida sus sueños.</div>
            <div class="incorrecto">La mujer de rosa nunca no olvida sus sueños.</div>`,
        },
        {
          tipo: "ordenar", num: "1", titulo: "Ordenar las palabras", etiqueta: "Práctica de adverbios de frecuencia",
          ru: "Составьте предложения: нажимайте на слова по порядку.",
          nota: "Toca las palabras en el orden correcto. Para quitar una palabra, tócala en tu frase.",
          items: [
            { palabras: ["siempre", "Sofía", "se despierta", "temprano"], variantes: ["Sofía siempre se despierta temprano", "Siempre Sofía se despierta temprano", "Sofía se despierta temprano siempre", "Sofía se despierta siempre temprano"] },
            { palabras: ["normalmente", "Luis", "desayuna", "en casa"], variantes: ["Luis normalmente desayuna en casa", "Normalmente Luis desayuna en casa", "Luis desayuna en casa normalmente", "Luis desayuna normalmente en casa"] },
            { palabras: ["a menudo", "Natalia", "visita", "librerías"], variantes: ["Natalia a menudo visita librerías", "A menudo Natalia visita librerías", "Natalia visita librerías a menudo", "Natalia visita a menudo librerías"] },
            { palabras: ["a veces", "Alicia", "lee", "por la noche"], variantes: ["Alicia a veces lee por la noche", "A veces Alicia lee por la noche", "Alicia lee por la noche a veces", "Alicia lee a veces por la noche"] },
            { palabras: ["nunca", "Roberto", "olvida", "sus llaves"], variantes: ["Roberto nunca olvida sus llaves", "Nunca Roberto olvida sus llaves"] },
            { palabras: ["rara vez", "Marcos", "llega tarde"], variantes: ["Marcos rara vez llega tarde", "Rara vez Marcos llega tarde", "Marcos llega tarde rara vez"] },
            { palabras: ["muchas veces", "Nátasha", "cocina", "en casa"], variantes: ["Nátasha muchas veces cocina en casa", "Muchas veces Nátasha cocina en casa", "Nátasha cocina en casa muchas veces", "Nátasha cocina muchas veces en casa"] },
          ],
        },
        {
          tipo: "abierta", num: "2", titulo: "Responder las preguntas con frases completas", etiqueta: "Usa adverbios de frecuencia",
          ru: "Ответьте полными предложениями. Используйте наречия частотности.",
          imagen: "u1-d-img245", recorte: true, alt: "Un pequeño zorro",
          ejemplo: "¿Con qué frecuencia tomas té? → **Normalmente tomo té por la mañana.**",
          preguntas: [
            { q: "¿Con qué frecuencia lees libros?", modelo: "Leo libros a menudo, casi todas las noches." },
            { q: "¿Con qué frecuencia escribes en un cuaderno?", modelo: "A veces escribo en un cuaderno cuando estudio español." },
            { q: "¿Con qué frecuencia escuchas música romántica?", modelo: "Rara vez escucho música romántica; prefiero el rock." },
            { q: "¿Con qué frecuencia caminas por la ciudad?", modelo: "Siempre camino por la ciudad los fines de semana." },
          ],
        },
        { tipo: "figura", src: "u1-d-img52", alt: "La mujer de rosa con una rosa en la mano", marco: true },
      ],
    },

    /* ======================================================
       E. CULTURA (pág. 10)
       ====================================================== */
    {
      id: "e", letra: "E", titulo: "Cultura", corto: "Cultura",
      ru: "Культура: Латинская Америка или Испанская Америка?",
      bloques: [
        {
          tipo: "texto", titulo: "¿Latinoamérica o Hispanoamérica?", ru: "Прочитайте текст.",
          imagen: "u1-e-mapa", alt: "Luis señala un mapa de Hispanoamérica",
          parrafos: [
            "Las [[expresiones|выражения]] «Latinoamérica», «América Latina» e «Hispanoamérica» están [[relacionadas|связаны]], pero no son [[sinónimas|синонимы]]. Para hablar [[específicamente|именно]] de los países americanos donde el español es la [[lengua principal|основной язык]], en este manual usamos «Hispanoamérica».",
            "Esta [[denominación|название]] incluye Argentina, México, Colombia, Perú, Chile, Cuba, Venezuela, Paraguay, Uruguay y otros países [[hispanohablantes|испаноязычные]]. También [[se aplica|относится]] a [[territorios|территории]] como Puerto Rico, que no es un [[Estado independiente|независимое государство]]. Brasil [[forma parte de|входит в]] América Latina, pero no de Hispanoamérica, porque en él [[predomina|преобладает]] el portugués. En Haití se habla principalmente [[criollo haitiano|гаитянский креольский язык]] y francés.",
            "Durante el [[siglo XIX|XIX век]], [[pensadores|мыслители]] americanos y europeos [[difundieron|распространили]] la expresión «América Latina», que [[adoptó|приобрело]] diferentes [[sentidos|значения]] culturales y políticos.",
            "«Hispanoamérica» [[se refiere|относится к]] específicamente a los países americanos [[de habla española|испаноязычные]], mientras que «América Latina» [[suele abarcar|обычно охватывает]] una región más [[amplia|широкая]]. En este manual preferimos «Hispanoamérica» para hablar de esa [[comunidad|сообщество]].",
          ],
        },
        {
          tipo: "abierta", num: "1", titulo: "Preguntas de cultura", ru: "Ответьте на вопросы, а потом посмотрите возможные ответы.",
          imagen: "u1-e-img54", recorte: true, alt: "Mapa antiguo con brújula y pluma",
          preguntas: [
            { q: "¿Por qué «Hispanoamérica» es más específico que «América Latina»?", modelo: "Porque se refiere solo a los países americanos de habla española; «América Latina» abarca una región más amplia." },
            { q: "¿Qué significa exactamente «Hispanoamérica»?", modelo: "Los países americanos donde el español es la lengua principal." },
            { q: "¿Por qué Brasil no forma parte de Hispanoamérica?", modelo: "Porque en Brasil predomina el portugués." },
            { q: "¿En qué siglo se difundió el concepto de «América Latina»?", modelo: "En el siglo XIX." },
          ],
        },
        {
          tipo: "elegir", num: "2", titulo: "¿Hispanoamérica o América Latina?", rejilla: true,
          ru: "H — Испанская Америка; L — Латинская Америка, но не Испанская Америка.",
          opciones: [["H", "H", "Hispanoamérica"], ["L", "L", "América Latina, pero no Hispanoamérica"]],
          items: [
            { t: "México", r: "H" }, { t: "Brasil", r: "L", nota: "Se habla portugués." }, { t: "Argentina", r: "H" }, { t: "Cuba", r: "H" },
            { t: "Haití", r: "L", nota: "Criollo haitiano y francés." }, { t: "Colombia", r: "H" }, { t: "Perú", r: "H" }, { t: "Uruguay", r: "H" },
            { t: "Bolivia", r: "H" }, { t: "República Dominicana", r: "H" }, { t: "Chile", r: "H" }, { t: "Venezuela", r: "H" },
          ],
        },
        {
          tipo: "abierta", num: "3", titulo: "¿Qué país de Hispanoamérica te gustaría conocer? ¿Por qué?", ru: "Какую страну Испанской Америки ты хотел(а) бы посетить? Почему?",
          preguntas: [{ q: "Escribe tu respuesta en tres o cuatro frases.", lineas: 4, modelo: "Me gustaría conocer Perú, porque quiero ver Machu Picchu y probar la comida peruana. También me interesa la historia de los incas." }],
        },
      ],
    },

    /* ======================================================
       F. HISTORIETA (pág. 11)
       ====================================================== */
    {
      id: "f", letra: "F", titulo: "Historieta", corto: "Historieta",
      ru: "Комикс",
      bloques: [
        {
          tipo: "historieta", num: "1", titulo: "Leer la historieta", ru: "Прочитайте комикс. Нажмите на картинку, чтобы увеличить.",
          src: "u1-f-historieta", alt: "Historieta: Luis le pregunta a Sofía cómo es la vida en el norte",
        },
        {
          tipo: "abierta", num: "2", titulo: "Y tú, ¿cómo es tu día?", ru: "А как проходит твой день? Расскажите в 4–5 предложениях. Используйте наречия частотности.",
          preguntas: [{ q: "Describe un día normal de tu vida.", lineas: 5, modelo: "Normalmente me despierto a las siete. Siempre desayuno café con pan. Después voy al trabajo en metro. Por la tarde a veces paseo por el parque y por la noche leo un libro." }],
        },
      ],
    },
  ],
};
