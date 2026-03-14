document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('gameSearch');
    const cards = document.querySelectorAll('.card');
    const downloadButtons = document.querySelectorAll('.btn-download');

    // 1. Buscador funcional
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(term) ? 'block' : 'none';
        });
    });

    // 2. Animación de barra de progreso y descarga
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const progressBar = btn.querySelector('.progress-bar');
            const btnText = btn.querySelector('.btn-text');
            const downloadLink = btn.getAttribute('data-link');
            
            let progress = 0;
            btnText.textContent = "Preparando...";
            btn.style.pointerEvents = "none"; // Evita múltiples clics

            const interval = setInterval(() => {
                progress += Math.random() * 10; // Sube aleatoriamente para que parezca real
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    btnText.textContent = "¡Listo!";
                    
                    // Inicia la descarga real
                    setTimeout(() => {
                        window.location.href = downloadLink;
                        // Opcional: Reiniciar el botón después de la descarga
                        setTimeout(() => {
                            progressBar.style.width = "0%";
                            btnText.textContent = "Obtener";
                            btn.style.pointerEvents = "auto";
                        }, 2000);
                    }, 500);
                }
                
                progressBar.style.width = progress + "%";
            }, 100); // Velocidad de actualización
        });
    });
});