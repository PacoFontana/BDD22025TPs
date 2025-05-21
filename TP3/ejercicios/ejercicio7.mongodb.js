use('tiendaOnline')

//Punto 1
db.productos.aggregate([
    {
        $project: {
            _id: 1,
            nombre: 1,
            categoria: 1,
            precio: 1,
            categoria_producto: {
                $cond: [
                    { $lt: ["$precio", 100] }, "Económico",
                    {
                        $cond: [{
                            $lte: ["$precio", 500]
                        }, "Estandar", "Premium"]
                    }
                ]
            }
        }
}]);


//Punto 2
db.ventas.aggregate([
    {
        $project: {
            _id: 1,
            cliente: 1,
            total: 1,
            clasificacion_venta: {
                $cond: [
                    { $lt: ["$total", 200] }, "Pequeña",
                    {
                        $cond: [{
                            $lte: ["$total", 800]
                        }, "Mediana", "Grande"]
                    }
                ]
            }
        }
    }
]);