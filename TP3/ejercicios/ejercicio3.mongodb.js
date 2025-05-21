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