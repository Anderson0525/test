document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const gameCards = document.querySelectorAll('.game-card');
    const buyButtons = document.querySelectorAll('.btn-buy');

    // 1. Filtro de búsqueda en tiempo real
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            
            // Si el título incluye lo que escribimos, se muestra; si no, se oculta
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 2. Interacción de los botones de descarga/compra
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const gameTitle = e.target.closest('.game-card').querySelector('.game-title').textContent;
            
            // Un pequeño aviso para que el usuario sepa que algo está pasando
            console.log(`Iniciando descarga de: ${gameTitle}`);
            
            // Opcional: Podrías cambiar el texto del botón temporalmente
            const originalText = button.textContent;
            button.textContent = "Preparando...";
            button.style.backgroundColor = "#555";

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "";
            }, 2000);
        });
    });

    // 3. Manejo de Filtros (Simulación)
    const checkboxes = document.querySelectorAll('.filter-group input');
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            console.log("Filtro actualizado. En un sistema real, aquí llamaríamos a la base de datos.");
        });
    });
});