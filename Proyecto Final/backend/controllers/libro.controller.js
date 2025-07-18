const libro = require('../models/libro.js');

const agregarLibro = async (req, res) => {
    try {
        const { titulo, autor, isbn, genero, fechaPublicacion, copias } = req.body;

        const libroExistente = await libro.findOne({ isbn });
        if (libroExistente) {
            return res.status(400).json({ message: 'El libro ya existe.' });
        }

        const nuevoLibro = new libro({
            titulo,
            autor,
            isbn,
            genero,
            fechaPublicacion,
            copias,
            disponibles: copias
        });

        await nuevoLibro.save();
        res.status(201).json({ message: 'Libro agregado exitosamente', libro: nuevoLibro });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar libro', error: error.message });
    }
}

const obtenerLibros = async (req, res) => {
    try {
        const libros = await libro.find();
        if (libros.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros.' });
        }
        res.status(200).json({ message: 'Libros encontrados', libros });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener libros', error: error.message });
    }
}

const obtenerLibroPorISBN = async (req, res) => {
    try {
        const { isbn } = req.params;
        const libroEncontrado = await libro.findOne({ isbn });
        if (!libroEncontrado) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }
        res.status(200).json({ message: 'Libro encontrado', libro: libroEncontrado });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener libro', error: error.message });
    }
}

const borrarLibro = async (req, res) => {
    try {
        const { isbn } = req.params;
        const libroBorrado = await libro.findOneAndDelete({ isbn });
        if (!libroBorrado) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }
        res.status(200).json({ message: 'Libro borrado exitosamente', libro: libroBorrado });
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar libro', error: error.message });
    }
}

const buscarLibros = async (req, res) => {
    try {
        console.log("filtros:", req.query);
        const { titulo, autor, genero } = req.query;

        const filtro = {};

        if (titulo) {
            filtro.titulo = { $regex: titulo, $options: 'i' };
        }

        if (autor) {
            filtro.autor = { $regex: autor, $options: 'i' };
        }

        if (genero) {
            filtro.genero = genero;
        }

        const libros = await libro.find(filtro);
        res.status(200).json(libros);
    } catch (error) {
        console.error("Error al buscar libros:", error);
        res.status(500).json({ error: 'Error al buscar libros' });
    }
};

module.exports = {
    agregarLibro,
    obtenerLibros,
    obtenerLibroPorISBN,
    borrarLibro,
    buscarLibros
};