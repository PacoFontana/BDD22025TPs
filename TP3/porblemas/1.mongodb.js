use ('tiendaOnline')

db.productos.aggregate([
    {
        $project: {
            nombre: 1,
            puntuacionPromedio: { $avg: "$valoraciones.puntuacion" },
            cantidadValoraciones: { $size: "$valoraciones" }
    }},
    {
        $match: {
            cantidadValoraciones: { $gt: 2 }
    }},
    {
        $sort: {
            puntuacionPromedio: -1
        }
    }
])