use ("empresa")

db.createCollection("clientes")

db.clientes.insertMany([
    { nombre: "Juan", apellido: "Pérez" },
    { nombre: "María", apellido: "González" },
    { nombre: "Carlos", apellido: "Ramírez" },
    { nombre: "Laura", apellido: "Fernández" },
    { nombre: "Ana", apellido: "López" }
])

db.clientes.createIndex({ apellido: 1, nombre: 1 })