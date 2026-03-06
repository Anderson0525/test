document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const msg = document.getElementById('message');

    if (user === "admin") {
        msg.textContent = "Acceso concedido. ¡Bienvenido!";
        msg.style.color = "#2ecc71"; // Verde éxito
    } else {
        msg.textContent = "Usuario incorrecto.";
        msg.style.color = "#e74c3c"; // Rojo error
    }
});
