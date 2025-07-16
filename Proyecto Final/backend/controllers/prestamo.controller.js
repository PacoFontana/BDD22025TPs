const Prestamo = require('../models/Prestamo.js');
const Libro = require('../models/libro.js');

const crearPrestamo = async (req, res) => {
    try {
        const { libroId, usuario } = req.body;

        const libro = await Libro.findById(libroId);
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        if (libro.disponibles < 1) {
            return res.status(400).json({ error: 'No hay copias disponibles' });
        }

        const nuevoPrestamo = new Prestamo({ libroId, usuario });
        await nuevoPrestamo.save();

        libro.disponibles -= 1;
        await libro.save();

        res.status(201).json({ mensaje: 'Préstamo registrado con éxito', prestamo: nuevoPrestamo });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el préstamo', detalle: error.message });
    }
};

const devolverPrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }

        if (prestamo.estado === true) {
            return res.status(400).json({ error: 'El préstamo ya fue devuelto' });
        }

        prestamo.estado = true;
        prestamo.fechaDevolucion = new Date();
        await prestamo.save();

        const libro = await Libro.findById(prestamo.libroId);
        if (libro) {
            libro.disponibles += 1;
            await libro.save();
        }

        res.status(200).json({ mensaje: 'Préstamo devuelto con éxito', prestamo });
    } catch (error) {
        res.status(500).json({ error: 'Error al devolver el préstamo', detalle: error.message });
    }
};

const obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find().populate('libroId', 'titulo autor');
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los préstamos', detalle: error.message });
    }
};



module.exports = {
    crearPrestamo,
    devolverPrestamo,
    obtenerPrestamos
};