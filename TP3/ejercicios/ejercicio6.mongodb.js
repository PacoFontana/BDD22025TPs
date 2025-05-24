use ('tiendaOnline')

//Punto 1
db.ventas.aggregate([
    {
        $project: {
            mes : { $month: "$fecha" },
        }
    },
    {
        $group: {
            _id: "$mes",
            totalVentas: { $sum: 1 }
        }
    },
])
// muestra el mes que mas ventas hubo


//Punto 2
db.ventas.aggregate([
    {
        $project: {
            diaSemana : { $dayOfWeek: "$fecha" },
        }
    },
    {
        $group: {
            _id: "$diaSemana",
            totalVentas: { $sum: 1 }
        }
    },
    {
        $sort: { totalVentas: -1 }
    },
    {
        $limit: 1
    }
])

// muestra el dia de la semana que mas ventas hubo