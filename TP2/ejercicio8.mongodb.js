use ("colegio")

db.alumnos.aggregate([
    {
      $lookup: {
        from: "cursos",
        localField: "cursos",
        foreignField: "_id",
        as: "alumno"
      }
    }
])