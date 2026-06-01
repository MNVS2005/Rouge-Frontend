# Rouge - Proyecto Frontend

## Descripción

Rouge es un frontend desarrollado en React para un videojuego estilo roguelike y metroidvania. El proyecto presenta una landing page interactiva con información del juego, sistema de autenticación, descarga protegida y un panel de administración para gestionar archivos y ver actividad.

El objetivo del proyecto es mostrar la presentación del juego, permitir el registro de usuarios, iniciar sesión, habilitar la descarga del juego solo para usuarios autenticados y ofrecer un panel administrativo para controlar la entrega del archivo de juego.

## Características principales

- Página principal con hero, historia, características, controles, enemigos, monedas y diseño visual.
- Autenticación de usuarios con registro e inicio de sesión.
- Descarga del juego disponible solo para usuarios autenticados.
- Panel administrativo protegido para usuarios con rol `ROLE_ADMIN`.
- Conexión a backend a través de `axios` con token Bearer.
- Uso de React Router para rutas de la aplicación.
- Error Boundary para capturar fallos en la UI.
- Interfaz de usuario con modales personalizados para notificaciones.

## Estructura del proyecto

- `src/App.jsx`: componente principal. Define la lógica del home, manejo de descarga y rutas.
- `src/pages/login.jsx`: pantalla de inicio de sesión.
- `src/pages/Register.jsx`: pantalla de registro de usuario.
- `src/pages/Admin.jsx`: panel administrativo con actividad, filtros y gestión de archivo.
- `src/components/Modal.jsx`: componente modal reutilizable para mensajes de éxito/error.
- `src/components/Particles.jsx`: componente para la creacion de la particulas dentro de la pagina web 
- `src/axios.js`: instancia de Axios con baseURL y token Authorization.
- `public/assets/`: carpeta de recursos gráficos y sprites.

## Rutas disponibles

- `/` : página principal.
- `/login` : formulario de inicio de sesión.
- `/register` : formulario de registro de usuario.
- `/admin` : panel administrativo (solo para administradores).

## Integración con backend

El frontend usa la variable de entorno `REACT_APP_API_URL` para conectar con el backend. Asegúrate de definirla en un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=http://localhost:8080
```

### Endpoints usados

- `POST /api/auth/login`: iniciar sesión.
- `POST /api/auth/signup`: registrar nuevo usuario.
- `GET /api/download/status`: comprobar si el archivo de descarga está disponible.
- `GET /api/download/game`: descargar el juego.
- `GET /api/admin/activity`: obtener actividad de usuarios (panel admin).
- `POST /api/download/upload`: subir el archivo de juego desde el panel admin.
- `DELETE /api/download/game`: eliminar el archivo de descarga.

## Requisitos

- Node.js 18+ recomendado.
- NPM o Yarn.
- Backend funcionando y accesible desde la URL configurada en `REACT_APP_API_URL`.

## Instalación

1. Abrir terminal en la carpeta `proyecto`.
2. Ejecutar:

```bash
npm install
```

3. Configurar variable de entorno en `.env`.
4. Iniciar la app:

```bash
npm start
```

5. Abrir el navegador en `http://localhost:3000`.

## Scripts útiles

- `npm start` - inicia el servidor de desarrollo.
- `npm run build` - genera la versión optimizada para producción.
- `npm test` - ejecuta el runner de pruebas.
- `npm run eject` - expone la configuración de Create React App.

## Uso del panel administrativo

- Solo usuarios con rol `ROLE_ADMIN` pueden acceder a `/admin`.
- El panel muestra una lista de actividades del sistema.
- Permite subir un archivo de juego y eliminarlo.
- Comprueba el estado del archivo de descarga antes de permitir descargas.

## Experiencia de usuario

- Usuario no autenticado: puede ver la presentación del juego y la información.
- Usuario autenticado: puede iniciar sesión, ver su nombre y descargar el juego.
- Administrador: puede acceder al panel con métricas y administración del archivo.

## Detalles del juego

Rouge es un juego inspirado en la estética retro pixel art y en la jugabilidad roguelike. Incluye:

- Combate dinámico.
- Exploración de castillo con salas cambiantes.
- Enemigos variados, incluyendo Golem, Slime, Jefe Slime y Rey Golem.
- Monedas y recursos como Restos de Slime, Trozo de Cobre, Trozo de Oro y Ojo de Ahriman.
- Controles de movimiento (`WASD`), salto (`Space`), interacción/pausa (`E`) y ataque (`J`).

## Notas

- Esta aplicación fue creada con Create React App.
- Los assets se cargan desde la carpeta `public/assets`.
- El componente `Modal` usa estado local para mostrar mensajes de confirmación y error.
- El componente `ErrorBoundary` evita que fallos en el render bloqueen toda la aplicación.

## Mejoras futuras sugeridas

- Añadir validación más robusta en formularios de registro e inicio de sesión.
- Incluir mensajes en español más consistentes y accesibles.
- Implementar un sistema de roles completo con permisos en frontend.
- Agregar más escenarios, enemigos y mejoras del juego.
- Añadir pruebas unitarias y de integración para los componentes principales.

---

### Autor

Proyecto final de grado superior de Desarrollo de Aplicaciones Web en el instituto Puig Castellar.
