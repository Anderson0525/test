/*
══════════════════════════════════════════════════════════════════════════════
  ARCHIVO: login.js
  DESCRICIÓN: Sistema de autenticación de usuarios usando Firebase
  PROPÓSITO: Permite a los usuarios iniciar sesión en el sitio web
             ("MiTiendaGamer") utilizando su correo electrónico y
             contraseña, mediante Firebase Authentication.

  ¿QUÉ ES FIREBASE?
  Firebase es una plataforma de Google que ofrece servicios backend
  (en la nube) para aplicaciones web y móviles. Firebase Authentication
  es uno de sus servicios que permite manejar el registro e inicio
  de sesión de usuarios de forma segura.

  ARCHIVOS RELACIONADOS:
    - index.html → La página principal a la que se redirige después
      de iniciar sesión correctamente
══════════════════════════════════════════════════════════════════════════════
*/

//
// ═══════════════════════════════════════════
// IMPORTS: Módulos de Firebase
// ═══════════════════════════════════════════
//
// Estos son imports (importaciones) de módulos de Firebase que se cargan
// desde URLs externas (CDN de Google). Son dos funciones específicas:
//
//   1. initializeApp: Función que inicializa una aplicación Firebase con
//     tu configuración única. Cada proyecto de Firebase tiene una
//     configuración diferente que lo identifica.
//
//   2. getAuth: Función que obtiene la instancia de autenticación de
//     Firebase para la aplicación inicializada. Esta instancia permite
//     realizar operaciones de login, registro y gestión de sesiones.
//
//   3. signInWithEmailAndPassword: Función que autentica a un usuario
//     verificando su correo electrónico y contraseña contra la base
//     de datos de Firebase Authentication.
//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

//
// ═══════════════════════════════════════════
// CONFIGURACIÓN DE FIREBASE
// ═══════════════════════════════════════════
//
// firebaseConfig es un objeto que contiene las credenciales únicas de
// tu proyecto de Firebase. Cada proyecto de Firebase tiene un conjunto
// diferente de estos valores. Estos valores identifican tu aplicación
// ante los servidores de Google.
//
// ⚠️ ADVERTENCIA DE SEGURIDAD:
// En un entorno de producción, estas credenciales deberían estar
// protegidas (variables de entorno, archivo .env, etc.). En este caso,
// están directamente en el código JavaScript, lo cual es un riesgo
// de seguridad ya que cualquiera puede verlas abriendo el código fuente
// del navegador.
//
const firebaseConfig = {
    apiKey: "AIzaSyAm_Ww5RzfS9HiF6R5EeysKfnowc9NTNGY",
    // API Key: Clave de API que identifica tu aplicación ante Firebase

    authDomain: "mitiendagamer-4d61e.firebaseapp.com",
    // Auth Domain: Dominio de autenticación asignado por Firebase
    // (ejemplo.firebaseapp.com)

    projectId: "mitiendagamer-4d61e",
    // Project ID: Identificador único de tu proyecto en Firebase

    storageBucket: "mitiendagamer-4d61e.firebasestorage.app",
    // Storage Bucket: Ubicación de almacenamiento de archivos (Firebase Storage)

    messagingSenderId: "1015599533514",
    // Messaging Sender ID: ID para enviar notificaciones push (Firebase Cloud Messaging)

    appId: "1:1015599533514:web:e8fcebb0e2a0962b5c9333",
    // App ID: Identificador de la aplicación web en Firebase

    measurementId: "G-RV2XQ8834B"
    // Measurement ID: ID para Google Analytics (rastreo de uso de la app)
};

//
// ═══════════════════════════════════════════
// INICIALIZACIÓN DE FIREBASE
// ═══════════════════════════════════════════
//
// initializeApp(firebaseConfig): Crea y configura la conexión con
// tu proyecto de Firebase usando los datos de configuración anteriores.
// Es como "conectar" tu sitio web a tu proyecto de Firebase en la nube.
//
// getAuth(app): Obtiene el servicio de autenticación asociado a
// la aplicación que acabas de inicializar. Este objeto 'auth' se
// usará para todas las operaciones de inicio de sesión.
//
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//
// Ahora 'auth' es el objeto que permite interactuar con Firebase Authentication.
// Puedes usar 'auth' para iniciar sesión, registrar usuarios, cerrar sesión,
// etc.

//
// ═══════════════════════════════════════════
// LÓGICA DEL FORMULARIO DE LOGIN
// ═══════════════════════════════════════════
//
// Este bloque de código se ejecuta cuando el usuario envía el formulario
// de inicio de sesión. Se conecta al formulario HTML (que debe tener
// id="login-form") y escucha el evento de "submit" (cuando el usuario
// presiona el botón de enviar o Enter).
//
// CÓMO FUNCIONA EN CADA PASO:
//   Paso 1: Se previene el comportamiento por defecto del formulario
//           (que recargaría la página) con e.preventDefault()
//   Paso 2: Se obtiene el valor del campo de email y del campo de contraseña
//   Paso 3: Se intenta iniciar sesión con esas credenciales
//   Paso 4: Si es exitoso, se muestra un mensaje de bienvenida y se
//           redirige al usuario a index.html
//   Paso 5: Si falla (credenciales incorrectas), se muestra un mensaje de error
//

document.querySelector('#login-form').addEventListener('submit', async (e) => {
    //
    // e.preventDefault(): Evita que el formulario recargue la página
    // al hacer submit. Esto es necesario para poder manejar el login
    // con JavaScript en lugar de que el navegador recargue la página.
    //
    e.preventDefault();

    //
    // Obtiene el email que el usuario escribió en el campo con id="email"
    // document.querySelector('#email') selecciona el elemento del formulario
    // .value obtiene el texto que el usuario escribió en ese campo
    //
    const email = document.querySelector('#email').value;

    //
    // Obtiene la contraseña que el usuario escribió en el campo con id="password"
    //
    const password = document.querySelector('#password').value;

    //
    // BLOQUE try-catch: Intenta ejecutar el código de autenticación.
    // Si algo falla, el bloque catch captura el error y maneja el mensaje.
    //
    // async/await: La palabra "async" declara que esta función es asíncrona
    // (puede esperar a que algo termine en el servidor antes de continuar).
    // "await" pausa la ejecución hasta que la promesa (Promise) se resuelva.
    // Esto hace que el código se vea más limpio que usar .then() y .catch().
    //
    try {
        //
        // signInWithEmailAndPassword(auth, email, password):
        // Esta es la función principal de autenticación. Hace lo siguiente:
        //   1. Envía el email y contraseña a los servidores de Firebase
        //   2. Firebase verifica si esas credenciales son correctas
        //   3. Si son correctas, crea una sesión de usuario activa
        //   4. Si no son correctas, lanza un error
        //
        // La palabra "await" significa que JavaScript espera a que esta
        // operación termine (puede tomar unos segundos por la conexión
        // de red) antes de continuar con el siguiente código.
        //
        await signInWithEmailAndPassword(auth, email, password);

        //
        // Si el código anterior no lanzó ningún error, significa que
        // el inicio de sesión fue EXITOSO.
        //
        alert("¡Bienvenido a MiTiendaGamer!");
        // Muestra una alerta al usuario confirmando que ha iniciado sesión

        //
        // window.location.href = "index.html": Redirige al navegador
        // a la página principal del sitio. El usuario ya está autenticado
        // y puede navegar por la tienda.
        //
        window.location.href = "index.html";

    } catch (error) {
        //
        // Si algo falló durante el inicio de sesión (credenciales incorrectas,
        // error de red, usuario no existe, etc.), el error es capturado aquí.
        //
        alert("Error: Usuario o clave incorrectos");
        // Muestra un mensaje de error al usuario indicando que las credenciales
        // no son válidas.
    }
});
