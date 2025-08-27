# Creador Avanzado de Tarjetas de Perfil de Usuario

## Descripción del Proyecto

Este proyecto es una Aplicación de Página Única (SPA) desarrollada con Angular 19 que permite la gestión y visualización de tarjetas de perfil de usuario. La aplicación consume datos de la API pública de Random User Generator, presentándolos en una interfaz atractiva y con múltiples interacciones que mejoran la experiencia de usuario.

## Características Principales

### Obtención y Visualización de Datos
- Carga inicial de tres perfiles aleatorios desde la API
- Visualización en formato de tarjetas con información básica (foto, nombre, país, ciudad, email, teléfono)
- Diseño en grid responsivo y visualmente atractivo

### Interacción y Generación Dinámica
- Función "Generar nuevo perfil" que añade usuarios individuales sin reemplazar los existentes
- Botón "Cargar más perfiles" que obtiene tres usuarios adicionales en cada petición
- Animaciones suaves durante la carga y presentación de nuevos perfiles

### Filtrado y Ordenamiento
- Búsqueda instantánea por nombre o país con actualización dinámica de resultados
- Opciones de ordenamiento por nombre (ascendente/descendente) y país
- Persistencia de las preferencias de ordenamiento entre sesiones

### Detalle de Perfil con Modal
- Modal interactivo al hacer clic en cada tarjeta
- Visualización de información adicional (dirección completa, fecha de nacimiento, zona horaria)
- Animaciones fluidas de apertura y cierre del modal

### Persistencia de Datos
- Almacenamiento de los perfiles generados en localStorage
- Recuperación automática de datos al recargar la página
- Persistencia de preferencias de ordenamiento

### UX/UI Refinado
- Indicadores de carga durante peticiones a la API
- Retroalimentación visual mediante toasts para acciones exitosas o errores
- Diseño completamente responsivo para todos los tamaños de pantalla
- Manejo de estados vacíos y errores con mensajes informativos

### Video demostrativo: 
- Link: https://drive.google.com/file/d/1mhjxVGDsaCgFhOhH7sKFoNwa43YgRXmJ/view?usp=drive_link

## Arquitectura y Organización del Código

El proyecto sigue una estructura modular organizada según las mejores prácticas de Angular:

- **Componentes**: Organizados por funcionalidad (dashboard, tarjetas, modales)
- **Servicios**: Separación clara de responsabilidades (gestión de usuarios, ordenamiento, almacenamiento local)
- **Modelos**: Interfaces TypeScript para definir estructuras de datos
- **Gestión de estado**: Uso de Observables y BehaviorSubjects para mantener el estado de la aplicación

## Estructura del Directorio

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── user-card/
│   │   │   │   ├── user-detail-modal/
│   │   │   │   └── spinner/
│   │   │   └── users-dashboard/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── index.html
│   └── main.ts
├── angular.json
└── package.json
```

## Funcionalidades Técnicas Destacadas

- Implementación de paginación para carga progresiva de perfiles
- Sistema de filtrado en tiempo real con optimización de rendimiento
- Gestión avanzada de llamadas asíncronas a la API
- Manejo de errores y estados de carga para mejorar la experiencia de usuario
- Diseño responsive con breakpoints adaptados a diferentes dispositivos
- Animaciones CSS para transiciones suaves en la interfaz

## Comandos para Ejecutar el Proyecto

### Requisitos previos
- Node.js (versión 16.x o superior)
- npm (versión 8.x o superior)

### Instalación
```bash
cd frontend
npm install
```

### Ejecución en modo desarrollo
```bash
npm start
```
o
```bash
ng serve
```

### Compilación para producción
```bash
npm run build
```

### Ejecución de pruebas
```bash
npm test
```

La aplicación estará disponible en `http://localhost:4200/` después de ejecutar el comando para ejecutar el entorno de desarrollo.
