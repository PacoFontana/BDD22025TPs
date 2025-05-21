use ('tiendaOnline')

//Punto 1
db.productos.aggregate([
    {
        $group: {
            _id: "$categoria",
            precioPromedio: { $avg: "$precio" },
            precioMaximo: { $max: "$precio" },
            precioMinimo: { $min: "$precio" }
        }
    }
])

//Punto 2
db.ventas.aggregate([
    {
        $group: {
            _id: "$cliente.pais",
            cantidadTransacciones: { $sum: 1 },
            totalVentas: { $sum: "$total" }
        }
    },
    {
        $sort: { totalVentas: -1 }
    }
])