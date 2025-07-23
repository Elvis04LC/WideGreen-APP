# AppWidegreen


**WideGreen-APP** es la aplicación frontend desarrollada en **Angular 16+ standalone** para la plataforma **WideGreen**, un entorno digital de participación ciudadana orientado a la sostenibilidad urbana. Permite a los usuarios explorar eventos ambientales, registrarse, gestionar su perfil, interactuar con publicaciones y visualizar actividades personales sincronizadas con su calendario.

---

## 🛠️ Tecnologías principales

- Angular 16+
- Angular Material
- TypeScript
- RxJS
- Standalone Components
- JWT Authentication
- Formulario reactivo
- SCSS/CSS personalizable
- HTML5 + Flex Layout

---

## 🔐 Seguridad y autenticación

- Inicio de sesión con JWT
- `localStorage` para almacenar el token
- Guards para proteger rutas según autenticación
- Interceptor HTTP para adjuntar el token automáticamente
- Logout con limpieza de sesión

---

## 📌 Funcionalidades principales

### 👤 Autenticación
- Login con email y contraseña
- Decodificación de JWT para extraer datos del usuario
- Acceso restringido según rol (`USER` o `ADMIN`)
- Logout con limpieza de sesión

### 📰 Publicaciones
- Visualizar publicaciones públicas
- Crear publicaciones con imágenes (subida o URL)
- Filtro por categoría
- Comentar publicaciones (solo el autor puede eliminar sus comentarios)

### 📅 Calendario y actividades
- Vista de calendario personal
- Registro y eliminación de actividades
- Sincronización con eventos en los que el usuario está inscrito

### 📍 Eventos
- Listado general de eventos
- Inscripción/cancelación desde la interfaz
- Visualización de organizadores y estadísticas

### 📊 Panel administrador
- Gestión de organizadores
- Registro de eventos y noticias
- Visualización de reportes y métricas

---

## 🚀 Instalación y ejecución

### 🧱 Requisitos
- Node.js v20 o superior
- Angular CLI v16 o superior

### 📦 Instalación
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando para instalar dependencias:

   npm install

### ▶️ Ejecución local
1. Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

   ng serve

2. La aplicación estará disponible en:

   http://localhost:4200

---
---

## 🌐 Despliegue

Esta aplicación está desplegada en **Firebase Hosting** y puede ser accedida públicamente en el siguiente enlace:

🔗 [https://widegreen-app.web.app](https://widegreen-app.web.app)

---
---
## 👨‍💻 Autores

- Elvis Leonardo Larico Chavez (Líder de Proyecto)
- Gabriel Infante
- Lucia Ly
- Maykol García

**Curso:** Arquitectura de Aplicaciones Web  
**Universidad Peruana de Ciencias Aplicadas**
