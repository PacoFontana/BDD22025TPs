use ("empresa")

db.empleados.find({
    edad: { $gte: 25, $lte: 40 }
  })