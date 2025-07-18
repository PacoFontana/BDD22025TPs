# Sistema de Gestión de Biblioteca

## Descripción

Sistema web realizado para el proyecto final de la materia Base de Datos II
Biblioteca digital con funciones como buscar libros, gestionar prestamos, mostrar libros mas populares, etc

## Arquitectura

- **Frontend**: React con Vite
- **Backend**: Node.js con Express
- **Base de Datos**: MongoDB
- **Comunicación**: API REST

## Estructura del Proyecto

```
Proyecto Final/
├── backend/
│   ├── controllers/
│   │   ├── libro.controller.js
│   │   ├── prestamo.controller.js
│   │   └── populares.controller.js
│   ├── models/
│   │   ├── libro.js
│   │   └── Prestamo.js
│   ├── routes/
│   │   ├── libros.routes.js
│   │   ├── prestamos.routes.js
│   │   └── populares.routes.js
│   ├── app.js
│   ├── bd.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── libroCard.jsx
    │   │   ├── muestraLibros.jsx
    │   │   ├── searchBar.jsx
    │   │   ├── gestionPrestamos.jsx
    │   │   └── librosPopulares.jsx
    │   ├── css/
    │   │   ├── App.css
    │   │   ├── libroCard.css
    │   │   ├── muestraLibros.css
    │   │   ├── searchBar.css
    │   │   ├── gestionPrestamos.css
    │   │   └── librosPopulares.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB
- npm o yarn


### DOTENV
Archivo .env:
MONGODB_URI=mongodb://localhost:27017/biblioteca

PORT=3001

### Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar la base de datos en el archvo `bd.js`

4. Iniciar el servidor:
```bash
npm start
```

El servidor va a estar disponible en `http://localhost:3001`

### Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm run dev
```

La aplicación va a estar disponible en `http://localhost:5173`

## Funcionalidades

### Gestión de Libros

- **Visualización del catálogo**: Lista todos los libros disponibles
- **Búsqueda avanzada**: Búsqueda por título, autor o género
- **Información detallada**: ISBN, disponibilidad, información del libro
- **Inventario en tiempo real**: Actualización automática de cantidades

### Sistema de Préstamos

- **Solicitar préstamo**: Crear nuevos préstamos desde el catálogo
- **Gestión de préstamos activos**: Ver préstamos pendientes de devolución
- **Proceso de devolución**: Devolver libros y actualizar inventario
- **Historial de préstamos**: Ver préstamos completados

### Interfaz de Usuario

- **Navegación por pestañas**: Separación entre catálogo, préstamos y libros populares
- **Búsqueda en tiempo real**: Resultados instantáneos
- **Diseño responsive**: Compatible con dispositivos móviles
- **Estados de carga**: Indicadores visuales durante operaciones

### Libros Populares

- **Ranking automático**: Top 5 libros más prestados
- **Estadísticas visuales**: Número total de préstamos por libro
- **Diseño atractivo**: Cards con gradientes y ranking visual
- **Información completa**: Título, autor, ISBN y estadísticas

## API Endpoints

### Libros

- `GET /api/libros` - Obtener todos los libros
- `GET /api/libros/buscar` - Buscar libros (query params: titulo, autor, genero)
- `GET /api/libros/:isbn` - Obtener libro por ISBN
- `POST /api/libros` - Agregar nuevo libro
- `DELETE /api/libros/:isbn` - Eliminar libro

### Préstamos

- `GET /api/prestamos` - Obtener todos los préstamos
- `POST /api/prestamos` - Crear nuevo préstamo
- `PATCH /api/prestamos/:id` - Devolver préstamo

### Populares

- `GET /api/populares` - Obtener top 5 libros más prestados

## Modelos de Datos

### Libro

```javascript
{
  titulo: String,
  autor: String,
  isbn: String,
  genero: String,
  fechaPublicacion: Date,
  copias: Number,
  disponibles: Number
}
```

### Préstamo

```javascript
{
  libroId: ObjectId,
  usuario: String,
  fechaPrestamo: Date,
  fechaDevolucion: Date,
  estado: Boolean
}
```

## Características Técnicas

### Frontend

- **React 18**
- **Axios**
- **CSS modular**
- **Vite**
- **Componentes reutilizables**

### Backend

- **Express.js**
- **Mongoose**
- **CORS**
- **Validación de datos**
- **Manejo de errores**

## Flujo de Trabajo
### IMPORTANTE
PARA LA CREACION DE LIBROS SE TIENE QUE UTILIZAR POSTMAM O LO QUE LES QUEDE MAS COMODO
1. Con el metodo POST:

{
  "titulo": "Libro de ejemplo 1",
  "autor": "Grupo 32",
  "isbn": "123",
  "genero": "Ejemlo",
  "fechaPublicacion": 1967,
  "copias": 10
}

Se puede usar ese JSON como ejemplo

2. Una vez creado los libros que desee ya puede probar y usar todo dentro de la app

### Préstamo de un Libro

1. Usuario navega al catálogo de libros
2. Busca un libro específico (opcional)
3. Hace clic en "Solicitar Préstamo"
4. Ingresa su nombre en el formulario
5. Confirma el préstamo
6. Sistema actualiza automáticamente la disponibilidad

### Devolución de un Libro

1. Usuario navega a "Gestión de Préstamos"
2. Ve la lista de préstamos activos
3. Hace clic en "Devolver" para el libro correspondiente
4. Confirma la devolución
5. Sistema actualiza el inventario y marca el préstamo como devuelto

## Consideraciones de Desarrollo

### Manejo de Estados

- Estados de carga para mejor UX
- Manejo de errores con mensajes informativos
- Actualización en tiempo real de datos

### Validaciones

- Verificación de disponibilidad antes de préstamos
- Validación de datos de entrada
- Confirmaciones para acciones críticas

## Posibles Mejoras Futuras

- Autenticación de usuarios
- Sistema de reservas
- Notificaciones de vencimiento
- Reportes y estadísticas
- Integración con código de barras
- Sistema de multas por retraso

## Solución de Problemas Comunes

### Error de CORS
Verificar que el backend esté configurado para permitir peticiones desde el frontend.

### Base de datos no conecta
Verificar que MongoDB esté ejecutándose y la URL de conexión sea correcta.

### Componentes no se actualizan
Verificar que se estén pasando las props correctamente entre componentes.

### Estilos no se aplican
Verificar que los archivos CSS estén correctamente importados en los componentes.

## Licencia

Este proyecto es parte de un trabajo académico para la materia de Base de Datos.
