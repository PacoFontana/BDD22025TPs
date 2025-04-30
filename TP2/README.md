## Ejercicio 1 - MongoDB

### 1) Crud basico.
//SIEMPRE USAMOS EL USE EMPRESA POR ESO NO APARECE EN TODOS LOS CODIGOS
//EN EL EJ 7 Y 8 USAMOS LA BD COLEGIO
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
## Ejercicio 6 - Indices:

Creamos la coleccion y le agregamos clientes:
```javascript
db.clientes.insertMany([
  { nombre: "Juan", apellido: "Pérez" },
  { nombre: "María", apellido: "González" },
  { nombre: "Carlos", apellido: "Ramírez" },
  { nombre: "Laura", apellido: "Fernández" },
  { nombre: "Ana", apellido: "López" }
])
```
Y a continuacion creamos el index:
```javascript
db.clientes.createIndex({ apellido: 1, nombre: 1 })
```


## Ejercicio 7 - Referencias:
```javascript
use universidad
db.createCollection("cursos");
db.createCollection("alumnos");
```

Insertamos cursos:
```javascript
db.cursos.insertMany([
  { _id: ObjectId(), nombre: "Matemática" },
  { _id: ObjectId(), nombre: "Historia" },
  { _id: ObjectId(), nombre: "Programación" }
])
```
Obtenemos el id de los cursos  con .find
```javascript
var idMatematica = db.cursos.findOne({ nombre: "Matemática" })._id;
var idHistoria = db.cursos.findOne({ nombre: "Historia" })._id;
var idProgramacion = db.cursos.findOne({ nombre: "Programación" })._id;
```
Y a continuacion ya podemos agregar los alumnos y ponerle los cursos haciendo referencia a las variables que ya contienen el id:
```javascript
db.alumnos.insertMany([
  {
    nombre: "Juan Pérez",
    edad: 20,
    cursos: [idMatematica, idProgramacion]
  },
  {
    nombre: "Ana Gómez",
    edad: 22,
    cursos: [idHistoria]
  },
  {
    nombre: "Carlos Ruiz",
    edad: 21,
    cursos: [idMatematica, idHistoria, idProgramacion]
  }
])
```
--
## Ejercicio 8 - Uso de $lookup:
```javascript
db.alumnos.aggregate([
  {
    $lookup: {
      from: "cursos",
      localField: "cursos",
      foreignField: "_id",
      as: "alumno"
    }
  }
])
```
---

## Ejercicio 9 - Replicacion y sharding:

Replica set: Se usa para mantener la integridad de la base de datos, es por decir "una copia exacta" de la base de datos pero en otro servidor, esto hace que ante la caida del servidor principal, pase el secundario a ser el nuevo principal y hace que no haya perdida de datos.

Sharding: Fragmentacion traducido al español como su nombre nos indica lo que hace es tiene los datos distribuidos en distintos servidores, se usa generalmente en bases de datos muy grandes.

## Ejercicio 10 - Seguridad y backups
Primero hay que crear el usuurio administrador:
```javascript
use empresa
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [{ role: "readWrite"}]
})
```
Usamos el siguiente comando en la consola
```javascript
mongodump --db empresa --out /backups  //ruta del backup
```
Y para restaurar:
```javascript
mongorestore --db empresa /backups
```
Tambien se puede hacer un drop por si la base de datos ya existe
