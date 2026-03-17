import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Estos son los datos de tu imagen
const firebaseConfig = {
  apiKey: "AIzaSyAm_Ww5RzfS9HiF6R5EeysKfnowc9NTNGY",
  authDomain: "mitiendagamer-4d61e.firebaseapp.com",
  projectId: "mitiendagamer-4d61e",
  storageBucket: "mitiendagamer-4d61e.firebasestorage.app",
  messagingSenderId: "1015599533514",
  appId: "1:1015599533514:web:e8fcebb0e2a0962b5c9333",
  measurementId: "G-RV2XQ8834B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Lógica para el formulario de login
document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("¡Bienvenido a MiTiendaGamer!");
        window.location.href = "index.html"; 
    } catch (error) {
        alert("Error: Usuario o clave incorrectos");
    }
});