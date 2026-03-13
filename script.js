document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const msg = document.getElementById('message');
    const btnDescarga = document.querySelector('.btn-descarga');

    // 1. Lógica de validación de usuario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue
        
        const user = document.getElementById('username').value;
        
        if (user === "admin") {
            msg.textContent = "Acceso concedido. Redirigiendo...";
            msg.style.color = "#2ecc71"; // Verde éxito
            // Aquí podrías añadir una redirección a otra página
        } else {
            msg.textContent = "Usuario o contraseña incorrectos.";
            msg.style.color = "#e74c3c"; // Rojo error
        }
    });

    // 2. Interacción extra: Efecto al hacer clic en descarga
    btnDescarga.addEventListener('click', function() {
        console.log("El usuario ha iniciado la descarga del paquete.");
        // Opcional: mostrar un mensaje flotante
        alert("Iniciando descarga del paquete de Proyecto Charrata...");
    });
});
