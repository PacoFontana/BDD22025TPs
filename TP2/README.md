## Ejercicio 1 - MongoDB

### 1) Crud basico.

```javascript
use empresa
db.empleados.insertMany([
  { nombre: "Diego", edad: 31, puesto: "diseñador gráfico" },
  { nombre: "Sofía", edad: 24, puesto: "analista de datos" },
  { nombre: "Tomás", edad: 21, puesto: "pasante" }
])
db.empleados.updateOne(
  { nombre: "Sofía" },
  { $set: { edad: 25 } }
)
db.empleados.deleteOne({ puesto: "pasante" })
```
## Ejercicio 2 - Búsquedas con operadores

### Consulta todos los empleados cuya edad esté entre 25 y 40 años. Usa operadores relacionales y lógicos.

```javascript
db.empleados.find({
  edad: { $gte: 25, $lte: 40 }
})
```
---
## Ejercicio 3 - Uso de proyección
```javascript
db.empleados.find(
  {},
  { _id: 0, nombre: 1, puesto: 1 }
)
```
