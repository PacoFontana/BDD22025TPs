use ('tiendaOnline')

//PUnto 1
db.productos.aggregate([
    {
        $match: {
            categoria: "Electrónica",
            precio: { $gt: 500 }
        }
    }
])


//Punto 2
db.ventas.aggregate([
    {
        $match: {
            "cliente.pais": "España",
            estado: "Entregado"
        }
    }
])
