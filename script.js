// Datos de juegos con URLs de imágenes reales
const gamesData = {
    featured: [
        { 
            title: "Black Myth: Wukong", 
            developer: "Game Science", 
            price: 59.99, 
            discount: null, 
            image: "https://cdn1.epicgames.com/spt-assets/764b2d57552c436590f50318bd7587f9/black-myth-wukong-1h9by.png" 
        },
        { 
            title: "Elden Ring", 
            developer: "FromSoftware", 
            price: 59.99, 
            discount: 20, 
            image: "https://cdn1.epicgames.com/offer/b7b42e2078524ab386a8b2a9856e5709/EGS_EldenRing_FromSoftwareInc_S2_1200x1600-41c1b9c15317cd4c514f3d7652c6c9e6" 
        },
        { 
            title: "Cyberpunk 2077", 
            developer: "CD Projekt Red", 
            price: 59.99, 
            discount: 50, 
            image: "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDProjektRed_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5" 
        },
        { 
            title: "Hogwarts Legacy", 
            developer: "Avalanche Software", 
            price: 59.99, 
            discount: 30, 
            image: "https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94f05748d9ba5ca13c32917b2671c" 
        },
        { 
            title: "Baldur's Gate 3", 
            developer: "Larian Studios", 
            price: 59.99, 
            discount: null, 
            image: "https://cdn1.epicgames.com/offer/0c321ac6d7fe4ed694c2a79d79c7b899/EGS_BaldursGate3_LarianStudios_S2_1200x1600-ef7856a4d356" 
        }
    ],
    sales: [
        { 
            title: "Red Dead Redemption 2", 
            developer: "Rockstar Games", 
            price: 19.79, 
            discount: 67, 
            originalPrice: 59.99, 
            image: "https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic_Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399b2a9889" 
        },
        { 
            title: "The Witcher 3", 
            developer: "CD Projekt Red", 
            price: 7.99, 
            discount: 80, 
            originalPrice: 39.99, 
            image: "https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntGameoftheYear_CDProjektRed_S2_1200x1600-53a8fb2c0201cd8aea3c1e0e1056e3a7" 
        },
        { 
            title: "GTA V", 
            developer: "Rockstar Games", 
            price: 14.99, 
            discount: 50, 
            originalPrice: 29.99, 
            image: "https://cdn1.epicgames.com/0584d2013f0149a791e7b9c0b0dd7f55/offer/GTAV_EGS_Artwork_1200x1600_Portrait%20Store%20Banner-1200x1600-382243057711adf80322ed2aeea42191" 
        },
        { 
            title: "Assassin's Creed Valhalla", 
            developer: "Ubisoft", 
            price: 14.99, 
            discount: 75, 
            originalPrice: 59.99, 
            image: "https://cdn1.epicgames.com/400347196e674de89c23cc2a7f2121db/offer/ACV_UCS12039_EGST_BannerBundle_US_860x1148-860x1148-38c1bb4c2f0f3c3e3c3e3c3e3c3e3c3e" 
        }
    ],
    free: [
        { 
            title: "Fortnite", 
            developer: "Epic Games", 
            price: 0, 
            discount: null, 
            image: "https://cdn1.epicgames.com/offer/fn/24BR_S24_EGS_Launcher_Blade_1200x1600_1200x1600-38b5fb0d02f1c1dfe7c5b6e4e85fb1c2" 
        },
        { 
            title: "Rocket League", 
            developer: "Psyonix", 
            price: 0, 
            discount: null, 
            image: "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S2_1200x1600-1453c1d7f2fbe2a57d1f3c3e3c3e3c3e" 
        },
        { 
            title: "Genshin Impact", 
            developer: "miHoYo", 
            price: 0, 
            discount: null, 
            image: "https://cdn1.epicgames.com/offer/879b0d8776ab46a59a129983ba78f0ce/genshin-impact-1200x1600-1200x1600-6c3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e" 
        },
        { 
            title: "Apex Legends", 
            developer: "Respawn", 
            price: 0, 
            discount: null, 
            image: "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_ApexLegends_RespawnEntertainment_S2_1200x1600-1200x1600-687a9f9a3e3e3e3e3e3e3e3e3e3e3e3e" 
        }
    ]
};

// Función para crear tarjeta de juego
function createGameCard(game) {
    const hasDiscount = game.discount !== null;
    const finalPrice = hasDiscount ? (game.price * (1 - game.discount / 100)).toFixed(2) : game.price;
    
    return `
        <div class="game-card">
            <div class="game-image-container">
                <img src="${game.image}" alt="${game.title}" class="game-image" onerror="this.src='https://via.placeholder.com/300x400/2a2a2a/ffffff?text=${encodeURIComponent(game.title)}'">
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

// ============================================
// REDIRECCIÓN DEL BOTÓN DESCARGAR - AQUÍ ESTÁ
// ============================================
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Abre la URL de tu GitHub en la misma pestaña
    window.location.href = 'https://github.com/Anderson0525/Praticas-VSCODE/archive/refs/heads/main.zip';
    
    // Si quieres que abra en nueva pestaña, usa esto en vez de lo de arriba:
    // window.open('https://github.com/Anderson0525/Praticas-VSCODE/archive/refs/heads/main.zip', '_blank');
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