const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    genero: {
        type: String,
        required: true,
    },
    fechaPublicacion: {
        type: Date,
        required: true,
    },
    copias: {
        type: Number,
        required: true,
        min: 1,
    },
    disponibles:{
        type: Number,
        required: true,
        min: 0,
    }
});

module.exports = mongoose.model('Libro', libroSchema);