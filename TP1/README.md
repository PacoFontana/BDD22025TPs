## ✅ Ejercicio 1: Reglas de Integridad

Para el caso de un sistema de una universidad, si se elimina un estudiante, lo mejor sería **tener una columna `estado`** en lugar de eliminarlo físicamente. Esto permite conservar el historial del estudiante por si en algún momento vuelve a la institución.

La columna `estado` puede tomar los valores `'activo'` o `'desactivado'`.  
Si realmente se desea eliminar por completo al alumno y todo lo relacionado (notas, exámenes, inscripciones, etc.), se puede usar una **clave foránea con `ON DELETE CASCADE`** desde las otras tablas hacia `Estudiantes`.

---


#### 📄 Tabla `Estudiantes` con columna `estado`:

```sql
CREATE TABLE Estudiantes (
    estudiante_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    estado ENUM('activo', 'desactivado') DEFAULT 'activo'
);
