use ('tiendaOnline')

//Punto 1
db.productos.aggregate([
  {
    $project: {
      _id: 0,
      nombre: 1,
      precio: 1,
      precioConImpuesto: { $multiply: ["$precio", 1.21] }
    }
  }
]);
//Muestra de los productos solo el nombre. el precio y agrega el campo precioConImpuesto.

//Punto 2
db.ventas.aggregate([
    {
        $project: {
            _id: 1,
            nombreCliente: "$cliente.nombre",
            total: 1,
            descuento: {$multiply: ["$total", 0.9]}
        }
    }
])
//Muestra el id de la venta, el nombre del cliente y el total de la venta. Agrega un campo que muestre el total con un descuento del 10% aplicado.