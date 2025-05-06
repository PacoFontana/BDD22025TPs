use ("empresa")

db.createCollection("ventas")

db.ventas.insertMany([
    { producto: "Laptop", cantidad: 2, precio_unitario: 1200 },
    { producto: "Mouse", cantidad: 10, precio_unitario: 25 },
    { producto: "Teclado", cantidad: 5, precio_unitario: 45 },
    { producto: "Monitor", cantidad: 3, precio_unitario: 300 },
    { producto: "Mouse", cantidad: 7, precio_unitario: 25 },
    { producto: "Laptop", cantidad: 1, precio_unitario: 1200 },
    { producto: "Teclado", cantidad: 4, precio_unitario: 45 },
    { producto: "Monitor", cantidad: 2, precio_unitario: 300 }
])

db.ventas.aggregate([
    {
        $group: {
            _id: "$producto",
            total: { $sum: "$cantidad" }
        }
    }
])
