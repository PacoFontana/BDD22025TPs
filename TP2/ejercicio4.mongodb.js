use ("empresa")

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