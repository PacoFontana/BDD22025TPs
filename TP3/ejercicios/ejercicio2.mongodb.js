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
//Agrupa por cada categoria y opera con los precios 


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
//Agrupa por pais y cuenta la cantidad de transacciones y el total de ventas, lo ordena de mayor a menor (descendente)