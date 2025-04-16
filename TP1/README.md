# ✅ Ejercicio 1: Reglas de Integridad

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

```


---

# ✅ Ejercicio 2: Implementación de Restricciones

El objetivo de este ejercicio es crear una tabla `Matriculas` con una **clave foránea** hacia la tabla `Estudiantes`, e **intentar insertar un registro que viole la integridad referencial**, provocando un error.

---

## 🧱 Paso 1: Crear las tablas

```sql
CREATE TABLE Estudiantes (
    estudiante_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    estado ENUM('activo', 'desactivado') DEFAULT 'activo'
);

CREATE TABLE Matriculas (
    matricula_id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT,
    curso VARCHAR(100),
    FOREIGN KEY (estudiante_id) REFERENCES Estudiantes(estudiante_id) ON DELETE CASCADE
);
```

```sql
INSERT INTO Matriculas (estudiante_id, curso)
VALUES (99, 'Bases de Datos');
```

Esto nos va a dar el siguiente error.:
> ![image](https://github.com/user-attachments/assets/bffb028c-2954-43a3-8198-5cee9f76118e)
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (base-de-datos2.matriculas, CONSTRAINT matriculas_ibfk_1 FOREIGN KEY (estudiante_id) REFERENCES estudiantes (estudiante_id))

---

# ✅ Ejercicio 3: Concurrencia
Ejercicio resuelto en clase
---
# ✅ Ejercicio 4: Plan de ejecucion

Para la base de datos con 100.000 registros vamos a usar la de productos que nos subio el profesor.
```sql
    SELECT count(*) FROM productos;
```
![image](https://github.com/user-attachments/assets/cee7b39e-b408-4741-8a4a-7b985fa043d2)


# Análisis de rendimiento con `EXPLAIN` en MySQL

## Consulta:
```sql
SELECT * FROM productos WHERE marca = 'Oscorp';
```

---

## Situación inicial: **Sin índice**

### 🔎 Comando ejecutado:
```sql
EXPLAIN SELECT * FROM productos WHERE marca = 'Oscorp';
```

### 📋 Resultado:

| Campo         | Valor       |
|---------------|-------------|
| `type`        | ALL         |
| `possible_keys` | NULL     |
| `key`         | NULL        |
| `rows`        | 99171       |
| `Extra`       | Using where |

📉 **Rendimiento bajo**: Es ineficiente, especialmente en tablas grandes.

---

##  Mejora aplicada: **Creación del índice**
```sql
CREATE INDEX idx_marca ON productos(marca);
```

---

##  Situación después: **Con índice creado**

### 🔎 Comando ejecutado:
```sql
EXPLAIN SELECT * FROM productos WHERE marca = 'Oscorp';
```

### 📋 Resultado:

| Campo         | Valor         |
|---------------|---------------|
| `type`        | ref           |
| `possible_keys` | idx_marca   |
| `key`         | idx_marca     |
| `rows`        | 18340         |
| `Extra`       | *(vacío)*     |


**Rendimiento mejorado**: Gracias al índice, MySQL localiza los registros más rápido y con menos uso de recursos.

---

##  Conclusión

La creación del índice en `marca` permitió que MySQL pase de hacer un **escaneo completo** a una **búsqueda optimizada usando índice**, reduciendo significativamente la cantidad de filas examinadas y mejorando la eficiencia de la consulta.

---


# ✅ Ejercicio 6: Vistas
```sql
SELECT 
    producto_id, 
    SUM(total_cantidad) AS ventas_totales
FROM vista_ventas_mensuales
GROUP BY producto_id
ORDER BY ventas_totales DESC
LIMIT 5;
```
---
# ✅ Ejercicio 9: Backup y Restore
<a href="https://drive.google.com/file/d/1oiAQmr0HCLfbwzfjGojo1P8ca0gl6n2M/view?usp=sharing" target="_blank">
  <img src="https://media.discordapp.net/attachments/1361782551143776257/1361910135194259557/image.png?ex=68007927&is=67ff27a7&hm=53304a89727d75262f32f75b607c11a6b34b73fa8563d392d958e0705f5f3896&=&format=webp&quality=lossless" alt="Ver Video" width="400"/>
</a>
