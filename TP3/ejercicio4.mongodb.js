use ('tiendaOnline')

//Punto1
db.productos.aggregate([
    {
        $unwind: "$valoraciones"
    },
    {
        $group: {
            _id: "$valoraciones.puntuacion",
            cantValoraciones: { $sum: 1 },
        }
    },
    {
        $sort: { _id: 1 }
    }
])