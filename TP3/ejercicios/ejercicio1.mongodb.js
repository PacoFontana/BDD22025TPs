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
// Filtra por categoria electrónica y precio mayor a 500

//Punto 2
db.ventas.aggregate([
    {
        $match: {
            "cliente.pais": "España",
            estado: "Entregado"
        }
    }
])
//Filtra por el pais del clieente y el estado de la venta