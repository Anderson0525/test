document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('gameSearch');
    const cards = document.querySelectorAll('.card');

    // Buscador
    search.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(val) ? 'block' : 'none';
        });
    });

    // Barra de descarga
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
            const bar = btn.querySelector('.progress');
            const txt = btn.querySelector('.text');
            const link = btn.getAttribute('data-link');
            let p = 0;

            btn.style.pointerEvents = "none";
            txt.textContent = "Descargando...";

            const timer = setInterval(() => {
                p += Math.random() * 15;
                if (p >= 100) {
                    p = 100;
                    clearInterval(timer);
                    txt.textContent = "Completado";
                    setTimeout(() => { window.location.href = link; }, 500);
                }
                bar.style.width = p + "%";
            }, 150);
        });
    });
});