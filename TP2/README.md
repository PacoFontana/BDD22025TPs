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
---
## Ejercicio 4 - Documentos embebidos
```javascript
db.empleados.updateMany(
 {},
{
 $set: {
 direccion: {
calle: "Alsina 211",
ciudad:"Bahia Blanca",
codigo_postal:"8000"
            }
        }
 }
 )
```
---
## Ejercicio 5 - Agregacion

Una vez creada la coleccion y agregadas las ventas:

```javascript
  db.ventas.find(
    {},
    {_id: 0, producto: 1, cantidad: 1}
)

  [
  {
    "producto": "Laptop",
    "cantidad": 2
  },
  {
    "producto": "Mouse",
    "cantidad": 10
  },
  {
    "producto": "Teclado",
    "cantidad": 5
  },
  {
    "producto": "Monitor",
    "cantidad": 3
  },
  {
    "producto": "Mouse",
    "cantidad": 7
  },
  {
    "producto": "Laptop",
    "cantidad": 1
  },
  {
    "producto": "Teclado",
    "cantidad": 4
  },
  {
    "producto": "Monitor",
    "cantidad": 2
  }
]
```
Codigo que muestra que estan los productos.
--
```javascript
db.ventas.aggregate([
    {
        $group: {
            _id: "$producto",
            total: { $sum: "$cantidad" }
        }
    }
])

//Devuelve:
[
  {
    "_id": "Laptop",
    "total": 3
  },
  {
    "_id": "Mouse",
    "total": 17
  },
  {
    "_id": "Teclado",
    "total": 9
  },
  {
    "_id": "Monitor",
    "total": 5
  }
]
```

