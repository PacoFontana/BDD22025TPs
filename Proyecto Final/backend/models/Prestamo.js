const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    libroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    fechaPrestamo: {
        type: Date,
        default: Date.now,
    },
    fechaDevolucion: {
        type: Date,
        default: null,
    },
    estado: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Prestamo', prestamoSchema);