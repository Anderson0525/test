// URL de descarga
const DOWNLOAD_URL = 'https://github.com/Anderson0525/Praticas-VSCODE/archive/refs/heads/main.zip';

// ============================================
// BOTÓN DESCARGAR PRINCIPAL (Header)
// ============================================
const downloadBtn = document.getElementById('downloadBtn');
if(downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        window.location.href = DOWNLOAD_URL;
    });
}

// ============================================
// BOTONES "DESCARGA GRATIS" EN CARRUSEL
// ============================================
document.querySelectorAll('.free-download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = DOWNLOAD_URL;
    });
});

// ============================================
// CARRUSEL
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function goToSlide(index) {
    if(slides.length === 0) return;
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
if(slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// ============================================
// DATOS DE JUEGOS
// ============================================
const gamesData = {
    featured: [
        { 
            title: "Black Myth: Wukong", 
            developer: "imagenes/blackwukong.png", 
            price: 59.99, 
            discount: null, 
            image: "black-wukong.png",
            freeDownload: true
        },
        { 
            title: "Elden Ring", 
            developer: "imagenes/eldenring.png", 
            price: 59.99, 
            discount: 20, 
            image: "elden-ring.png",
            freeDownload: false
        },
        { 
            title: "Cyberpunk 2077", 
            developer: "imagenes/ciberpunk.png", 
            price: 59.99, 
            discount: 50, 
            image: "cyberpunk.png",
            freeDownload: false
        },
        { 
            title: "Hogwarts Legacy", 
            developer: "imagenes/harrypoter.png", 
            price: 59.99, 
            discount: 30, 
            image: "harry-potter.png",
            freeDownload: false
        },
        { 
            title: "Baldur's Gate 3", 
            developer: "imagenes/Baldurs.png", 
            price: 59.99, 
            discount: null, 
            image: "baldurs.png",
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
            image: "nintendo.png",
            freeDownload: false
        },
        { 
            title: "The Witcher 3", 
            developer: "CD Projekt Red", 
            price: 7.99, 
            discount: 80, 
            originalPrice: 39.99, 
            image: "nintendo.png",
            freeDownload: false
        },
        { 
            title: "GTA V", 
            developer: "Rockstar Games", 
            price: 0, 
            discount: null, 
            originalPrice: 29.99, 
            image: "nintendo.png",
            freeDownload: true
        },
        { 
            title: "Assassin's Creed Valhalla", 
            developer: "Ubisoft", 
            price: 14.99, 
            discount: 75, 
            originalPrice: 59.99, 
            image: "nintendo.png",
            freeDownload: false
        }
    ],
    free: [
        { 
            title: "Fortnite", 
            developer: "Epic Games", 
            price: 0, 
            discount: null, 
            image: "nintendo.png",
            freeDownload: true
        },
        { 
            title: "Rocket League", 
            developer: "Psyonix", 
            price: 0, 
            discount: null, 
            image: "nintendo.png",
            freeDownload: true
        },
        { 
            title: "Genshin Impact", 
            developer: "miHoYo", 
            price: 0, 
            discount: null, 
            image: "nintendo.png",
            freeDownload: true
        },
        { 
            title: "Apex Legends", 
            developer: "Respawn", 
            price: 0, 
            discount: null, 
            image: "nintendo.png",
            freeDownload: true
        }
    ]
};

// ============================================
// CREAR TARJETAS DE JUEGOS
// ============================================
function createGameCard(game) {
    const hasDiscount = game.discount !== null && game.discount > 0;
    const finalPrice = hasDiscount ? (game.price * (1 - game.discount / 100)).toFixed(2) : game.price;
    
    const freeDownloadBtn = game.freeDownload ? 
        `<button class="btn-free-download" onclick="window.location.href='${DOWNLOAD_URL}'">Descarga Gratis</button>` : '';
    
    return `
        <div class="game-card">
            <div class="game-image-container">
                <img src="${game.image}" alt="${game.title}" class="game-image" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'; this.parentElement.innerHTML='<div style=\\'color:#666;font-size:48px;\\'>🎮</div>';">
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

// ============================================
// RENDERIZAR JUEGOS
// ============================================
function renderGames() {
    const featuredContainer = document.getElementById('featured-games');
    const saleContainer = document.getElementById('sale-games');
    const freeContainer = document.getElementById('free-games');
    
    if(featuredContainer) featuredContainer.innerHTML = gamesData.featured.map(createGameCard).join('');
    if(saleContainer) saleContainer.innerHTML = gamesData.sales.map(createGameCard).join('');
    if(freeContainer) freeContainer.innerHTML = gamesData.free.map(createGameCard).join('');
}

// ============================================
// INICIALIZAR
// ============================================
renderGames();

// ============================================
// EFECTOS HOVER
// ============================================
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

// ============================================
// BÚSQUEDA
// ============================================
const searchInput = document.querySelector('.search-box input');
if(searchInput) {
    searchInput.addEventListener('input', function(e) {
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
}