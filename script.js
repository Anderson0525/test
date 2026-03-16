// URL de descarga
const DOWNLOAD_URL = 'https://github.com/Anderson0525/Praticas-VSCODE/archive/refs/heads/main.zip';

// Datos de juegos
const gamesData = {
    featured: [
        { 
            title: "Black Myth: Wukong", 
            developer: "Game Science", 
            price: 59.99, 
            discount: null, 
            image: "imagenes/blackwukong.png",
            freeDownload: true
        },
        { 
            title: "Elden Ring", 
            developer: "FromSoftware", 
            price: 59.99, 
            discount: 20, 
            image: "imagenes/eldenring.png",
            freeDownload: false
        },
        { 
            title: "Cyberpunk 2077", 
            developer: "CD Projekt Red", 
            price: 59.99, 
            discount: 50, 
            image: "imagenes/ciberpunk.png",
            freeDownload: false
        },
        { 
            title: "Hogwarts Legacy", 
            developer: "Avalanche Software", 
            price: 59.99, 
            discount: 30, 
            image: "imagenes/harrypoter.png",
            freeDownload: false
        },
        { 
            title: "Baldur's Gate 3", 
            developer: "Larian Studios", 
            price: 59.99, 
            discount: null, 
            image: "imagenes/Baldurs.png",
            freeDownload: false
        }
    ],
    sales: [
        { 
            title: "Red Dead Redemption 2", 
            developer: "Rockstar Games", 
            price: 19.79, 
            discount: 67, 
            originalPrice: 59.99, 
            image: "imagenes/RedDead.png",
            freeDownload: false
        },
        { 
            title: "The Witcher 3", 
            developer: "CD Projekt Red", 
            price: 7.99, 
            discount: 80, 
            originalPrice: 39.99, 
            image: "imagenes/TheWitcher3.png",
            freeDownload: false
        },
        { 
            title: "GTA V", 
            developer: "Rockstar Games", 
            price: 0, 
            discount: null, 
            originalPrice: 29.99, 
            image: "imagenes/gtav.png",
            freeDownload: true
        },
        { 
            title: "Assassin's Creed Valhalla", 
            developer: "Ubisoft", 
            price: 14.99, 
            discount: 75, 
            originalPrice: 59.99, 
            image: "imagenes/assassins.png",
            freeDownload: false
        }
    ],
    free: [
        { 
            title: "Fortnite", 
            developer: "Epic Games", 
            price: 0, 
            discount: null, 
            image: "imagenes/fortinehero.png",
            freeDownload: true
        },
        { 
            title: "Rocket League", 
            developer: "Psyonix", 
            price: 0, 
            discount: null, 
            image: "imagenes/roketleague.png",
            freeDownload: true
        },
        { 
            title: "Genshin Impact", 
            developer: "miHoYo", 
            price: 0, 
            discount: null, 
            image: "imagenes/gesthin.png",
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

// Función para crear tarjeta de juego
function createGameCard(game) {
    const hasDiscount = game.discount !== null && game.discount > 0;
    const finalPrice = hasDiscount ? (game.price * (1 - game.discount / 100)).toFixed(2) : game.price;
    
    const freeDownloadBtn = game.freeDownload ? 
        `<button class="btn-free-download" onclick="window.location.href='${DOWNLOAD_URL}'">Descarga Gratis</button>` : '';
    
    return `
        <div class="game-card">
            <div class="game-image-container">
                <img src="${game.image}" alt="${game.title}" class="game-image" onerror="this.src='nintendo.png'">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-developer">${game.developer}</p>
                <div class="game-price-section">
                    ${hasDiscount ? `<span class="discount-badge">-${game.discount}%</span>` : ''}
                    ${hasDiscount ? `<span class="original-price">${game.originalPrice} €</span>` : ''}
                    <span class="current-price ${game.price === 0 ? 'free-tag' : ''}">
                        ${game.price === 0 ? 'Gratis' : finalPrice + ' €'}
                    </span>
                </div>
                ${freeDownloadBtn}
            </div>
        </div>
    `;
}

// Renderizar juegos
function renderGames() {
    document.getElementById('featured-games').innerHTML = gamesData.featured.map(createGameCard).join('');
    document.getElementById('sale-games').innerHTML = gamesData.sales.map(createGameCard).join('');
    document.getElementById('free-games').innerHTML = gamesData.free.map(createGameCard).join('');
}

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

// Auto-play carrusel
setInterval(nextSlide, 5000);

// Botón Descargar principal
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = DOWNLOAD_URL;
});

// Botones Descarga Gratis en hero carousel
document.querySelectorAll('.free-download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = DOWNLOAD_URL;
    });
});

// Inicializar
renderGames();

// Efectos hover para las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Búsqueda funcional
document.querySelector('.search-box input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allCards = document.querySelectorAll('.game-card');
    
    allCards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        const developer = card.querySelector('.game-developer').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || developer.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});