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
//muestra el id, el nombre, la categoria, el precio y agrega un nuevo campo que tiene una condicion que dependiendo del precio toma x valor


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

//muestra el id, el cliente, el total y agrega un nuevo campo que tiene una condicion que dependiendo del total toma x valor