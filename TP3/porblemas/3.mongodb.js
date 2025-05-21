use ('tiendaOnline')

use('tiendaOnline');
db.ventas.aggregate([
    // hace el "join" entre ventas y clientes con las id
    {$lookup: {
        from: "productos",
        localField: "producto_id",
        foreignField: "_id",
        as: "producto"
    }},

    // "desarma" el array de productos
    {$unwind: "$producto"}, 

    // agrupa por cliente y producto y hace el conteo de las compras y l gastado en total
    {
    $group: {
      _id: {
        cliente: "$cliente.nombre",
        producto: "$producto.nombre",
        categoria: "$producto.categoria"
      },
      cantidad: {$sum: 1},
      totalGastadocliente: {$sum: "$total"},
      primeracompra: {$min: "$fecha"},
      ultimacompra: {$max: "$fecha"}
    }},
    {$group: {
        _id: "$_id.cliente",
        totalGastado: {$sum: "$totalGastadocliente"},
        comprastotal: {$sum: "$cantidad"},
        productoFav: {$first: "$_id.producto"},
        categoriaFav: {$first: "$_id.categoria"},
        primeracompra: {$min: "$primeracompra"},
        ultimacompra: {$max: "$ultimacompra"}
    }},
    // se proyectan los campos que se quieren mostrar
    {$project: {
        _id: 0,
        cliente: "$_id",
        totalGastado: 1,
        comprastotal: 1,
        productoFav: 1,
        categoriaFav: 1,
        primeracompra: 1,
        ultimacompra: 1
    }}
])