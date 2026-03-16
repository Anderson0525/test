// Datos de ejemplo para los juegos
const gamesData = {
    featured: [
        { title: "Black Myth: Wukong", developer: "Game Science", price: 59.99, discount: null, image: "linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%)" },
        { title: "Elden Ring", developer: "FromSoftware", price: 59.99, discount: 20, image: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)" },
        { title: "Cyberpunk 2077", developer: "CD Projekt Red", price: 59.99, discount: 50, image: "linear-gradient(135deg, #fcee0a 0%, #ff0066 100%)" },
        { title: "Hogwarts Legacy", developer: "Avalanche Software", price: 59.99, discount: 30, image: "linear-gradient(135deg, #1a0f2e 0%, #0f0518 100%)" },
        { title: "Baldur's Gate 3", developer: "Larian Studios", price: 59.99, discount: null, image: "linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)" }
    ],
    sales: [
        { title: "Red Dead Redemption 2", developer: "Rockstar Games", price: 59.99, discount: 67, originalPrice: 59.99, image: "linear-gradient(135deg, #8b0000 0%, #4a0000 100%)" },
        { title: "The Witcher 3", developer: "CD Projekt Red", price: 39.99, discount: 80, originalPrice: 39.99, image: "linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)" },
        { title: "GTA V", developer: "Rockstar Games", price: 29.99, discount: 50, originalPrice: 29.99, image: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)" },
        { title: "Assassin's Creed Valhalla", developer: "Ubisoft", price: 59.99, discount: 75, originalPrice: 59.99, image: "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)" }
    ],
    free: [
        { title: "Fortnite", developer: "Epic Games", price: 0, discount: null, image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { title: "Rocket League", developer: "Psyonix", price: 0, discount: null, image: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)" },
        { title: "Genshin Impact", developer: "miHoYo", price: 0, discount: null, image: "linear-gradient(135deg, #e17055 0%, #d63031 100%)" },
        { title: "Apex Legends", developer: "Respawn", price: 0, discount: null, image: "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)" }
    ]
};

// Función para crear tarjeta de juego
function createGameCard(game) {
    const hasDiscount = game.discount !== null;
    const finalPrice = hasDiscount ? (game.price * (1 - game.discount / 100)).toFixed(2) : game.price;
    
    return `
        <div class="game-card">
            <div class="game-image" style="background: ${game.image}; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); font-size: 48px;">
                🎮
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-developer">${game.developer}</p>
                <div class="game-price-section">
                    ${hasDiscount ? `<span class="discount-badge">-${game.discount}%</span>` : ''}
                    ${hasDiscount ? `<span class="original-price">${game.originalPrice || game.price} €</span>` : ''}
                    <span class="current-price ${game.price === 0 ? 'free-tag' : ''}">
                        ${game.price === 0 ? 'Gratis' : finalPrice + ' €'}
                    </span>
                </div>
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

// Redirección del botón Descargar
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = 'https://github.com/Anderson0525/Praticas-VSCODE/archive/refs/heads/main.zip';
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