use ("colegio")

db.createCollection("cursos");
db.createCollection("alumnos");

db.cursos.insertMany([
    { _id: ObjectId(), nombre: "Matemática" },
    { _id: ObjectId(), nombre: "Historia" },
    { _id: ObjectId(), nombre: "Programación" }
])

var idMatematica = db.cursos.findOne({ nombre: "Matemática" })._id;
var idHistoria = db.cursos.findOne({ nombre: "Historia" })._id;
var idProgramacion = db.cursos.findOne({ nombre: "Programación" })._id;

db.alumnos.insertMany([
    {
      nombre: "Juan Pérez",
      edad: 20,
      cursos: [idMatematica, idProgramacion]
    },
    {
      nombre: "Ana Gómez",
      edad: 22,
      cursos: [idHistoria]
    },
    {
      nombre: "Carlos Ruiz",
      edad: 21,
      cursos: [idMatematica, idHistoria, idProgramacion]
    }
])