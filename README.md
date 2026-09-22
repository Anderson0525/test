# Test HTML/CSS/JS Project

## 📋 Descripción del Proyecto

Este es un clon de la **Epic Games Store** construido con tecnologías web estáticas: **HTML5**, **CSS3** y **JavaScript (ES6+)**. El proyecto simula una tienda de videojuegos con las siguientes funcionalidades:

- **Página principal** con encabezado interactivo
- **Carrusel hero** con promociones de juegos destacados
- **Sistema de filtros** por género, características y plataforma
- **Cuadrícula de juegos** con tarjetas dinámicas
- **Funcionalidad de búsqueda** en tiempo real
- **Sistema de autenticación** con Firebase
- **Diseño responsive** para escritorio, tablets y móviles

## 🏗️ Arquitectura del Proyecto

```
test/
├── index.html          → Estructura principal del sitio web
├── styles.css          → Todos los estilos visuales (tema oscuro, layout, responsive)
├── script.js           → Lógica interactiva: carrusel, búsqueda, renderizado de juegos
├── login.js            → Autenticación de usuarios con Firebase Authentication
├── README.md           → Este archivo de documentación
├── comandos.md         → Guía técnica de Metasploit/Pivoting (documentación adicional)
├── Epic.ico            → Favicon del sitio
├── Epic.png            → Logo principal de Epic Games
├── nintendo.png        → Imagen de respaldo para juegos sin imagen
├── build/              → Directorio de compilación
├── imagenes/           → Carpeta de imágenes de juegos
│   ├── blackwukong.png
│   ├── eldenring.png
│   ├── ciberpunk.png
│   ├── harrypotter.png
│   ├── Baldurs.png
│   ├── RedDead.png
│   ├── TheWitcher.png
│   ├── gtav.png
│   ├── assassin.png
│   ├── fortnitehero.png
│   ├── rocketleague.png
│   ├── genshin.png
│   ├── apex.png
│   ├── resident-evil.png
│   └── GhostFace.png
└── .vscode/            → Configuración de VS Code
```

## 📁 Detalle de Archivos

### `index.html` - Estructura Principal

Es el esqueleto de la página web. Define:

| Sección | Descripción |
|---------|-------------|
| **Header** | Barra superior fija con logo, menú de navegación, buscador y botones de acción |
| **Categories Nav** | Barra horizontal con 7 categorías de juegos (Novedades, Ofertas, Gratis, etc.) |
| **Hero Carousel** | Banner giratorio con 3 slides mostrando juegos destacados de forma automática |
| **Sidebar** | Panel lateral con filtros de Género, Características y Plataforma |
| **Main Content** | Tres secciones de juegos: Destacados, Ofertas y Gratis esta semana |

### `styles.css` - Hoja de Estilos

Define todo el diseño visual del sitio:

| Concepto | Descripción |
|----------|-------------|
| **Tema Oscuro** | Paleta de colores oscuros con variables CSS (--bg-primary, --accent-blue, etc.) |
| **CSS Grid** | Layout de dos columnas: sidebar (240px) + contenido principal |
| **Flexbox** | Alineación de elementos en header, carrusel y filtros |
| **Carrusel** | Sistema de slides con opacidad y transiciones suaves |
| **Tarjetas de Juegos** | Diseño de cards con efectos hover, zoom de imagen y animación de entrada |
| **Responsive** | 3 breakpoint: Desktop (>1024px), Tablet (≤1024px), Móvil (≤768px) |
| **Animaciones** | Keyframes fadeIn para entrada suave de tarjetas |

### `script.js` - Lógica de Interacción

Contiene toda la funcionalidad del lado del cliente:

| Función/Característica | Descripción |
|------------------------|-------------|
| **`gamesData`** | Objeto con 13 juegos organizados en 3 categorías (featured, sales, free) |
| **`createGameCard(game)`** | Función que genera el HTML de una tarjeta de juego dinámicamente |
| **`renderGames()`** | Renderiza todos los juegos en sus secciones correspondientes |
| **`goToSlide(index)`** | Cambia la diapositiva activa del carrusel |
| **`nextSlide()`** | Avanza al siguiente slide (ciclo circular con operador módulo %) |
| **Auto-play** | Cambio automático de slides cada 5 segundos con `setInterval` |
| **Búsqueda** | Filtra tarjetas de juegos en tiempo real según título o desarrollador |
| **Descarga** | Redirige al navegador para descargar el instalador .exe |
| **Efectos hover** | Movimiento ascendente de tarjetas al pasar el ratón |

### `login.js` - Autenticación con Firebase

Implementa el sistema de inicio de sesión:

| Componente | Descripción |
|------------|-------------|
| **Firebase SDK** | Importa módulos desde CDN de Google (firebase-app.js, firebase-auth.js) |
| **firebaseConfig** | Configuración del proyecto Firebase con API Key, Auth Domain, Project ID, etc. |
| **`initializeApp()`** | Conecta la aplicación al proyecto de Firebase |
| **`getAuth()`** | Obtiene la instancia de autenticación para operaciones de login |
| **`signInWithEmailAndPassword()`** | Autentica al usuario con email y contraseña contra Firebase Auth |
| **Manejo de errores** | try-catch con async/await para manejar credenciales incorrectas |
| **Redirección** | Tras login exitoso, redirige a index.html |

### `comandos.md` - Guía Técnica Adicional

Documentación sobre técnicas de **pivoting y escaneo de red** usando Metasploit:

- AutoRoute para enrutamiento de redes internas
- Servidor proxy SOCKS5 con Metasploit
- Configuración de Proxychains en Kali Linux
- Escaneo de hosts con Nmap a través del túnel
- Gestión de sesiones en Metasploit

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Abrir directamente
```bash
# Simplemente abre index.html en tu navegador
# (doble clic o File → Open)
```

### Opción 2: Servidor local (recomendado)
```bash
# macOS / Linux
python3 -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

### Opción 3: Con Node.js
```bash
npx serve .
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica de la página
- **CSS3** - Estilos con variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+** - Template literals, arrow functions, async/await, fetch
- **Firebase Authentication** - Servicio de autenticación de Google
- **CDN (Content Delivery Network)** - Carga de módulos Firebase desde servidores de Google

## 📄 Licencia

Este es un proyecto de demostración/documentación.

## 👥 Autor

Anderson0525
