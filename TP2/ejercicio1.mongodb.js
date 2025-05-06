use ("empresa")

db.createCollection("empleados")

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