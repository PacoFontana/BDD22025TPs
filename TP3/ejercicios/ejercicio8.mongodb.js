use ('tiendaOnline')

db.ventas.aggregate([
  {
    $group: {
      _id: "$producto_id",
      total_unidades: { $sum: "$cantidad" },
      total_monto: { $sum: "$total" }
    }
  },
  { $sort: { total_unidades: -1 } },
  { $limit: 3 },
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "producto"
    }
  },
  { $unwind: "$producto" },
  {
    $addFields: {
      promedio_valoracion: { $avg: "$producto.valoraciones.puntuacion" }
    }
  },
  {
    $project: {
      _id: 0,
      producto_id: "$_id",
      nombre: "$producto.nombre",
      categoria: "$producto.categoria",
      total_unidades: 1,
      total_monto: 1,
      promedio_valoracion: { $round: ["$promedio_valoracion", 2] }
    }
  }
])

//toma los 3 productos más vendidos y muestra su nombre, categoría, total de unidades vendidas, total de monto vendido y promedio de valoraciones