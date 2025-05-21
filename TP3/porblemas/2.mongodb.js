use ('tiendaOnline')

db.ventas.aggregate([
    {
        $lookup: {
            from: 'productos',
            localField: 'productoId',
            foreignField: '_id',
            as: 'producto'
        }
    },
    {
        $unwind: '$producto'
    },
    {
        $group: {
            _id: {
                mes: { $month: '$fecha' },
                anio: { $year: '$fecha' }
            },
            totalVentas: { $sum: '$total' },
            productoMasVendido: { $first: '$producto.nombre' }
        }
    },
    {
        $sort: { '_id.anio': 1, '_id.mes': 1 }
    }
])