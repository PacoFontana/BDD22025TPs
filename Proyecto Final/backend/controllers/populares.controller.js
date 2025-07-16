const Prestamo = require('../models/Prestamo.js');
const Libro = require('../models/libro.js');

const librosPopulares = async (req, res) => {
    try {
    const populares = await Prestamo.aggregate([
      { $group: { _id: "$libroId", totalPrestamos: { $sum: 1 } } },
      { $sort: { totalPrestamos: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "libros",
          localField: "_id",
          foreignField: "_id",
          as: "libro"
        }
      },
      { $unwind: "$libro" },
      {
        $project: {
          _id: 0,
          titulo: "$libro.titulo",
          autor: "$libro.autor",
          isbn: "$libro.isbn",
          totalPrestamos: 1
        }
      }
    ]);

    res.status(200).json(populares);
  } catch (error) {
    console.error("Error al generar el reporte de libros populares:", error);
    res.status(500).json({ mensaje: "Error interno al generar el reporte" });
  }
}

module.exports = {
    librosPopulares
};