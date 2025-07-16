const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller.js');

router.post('/', prestamoController.crearPrestamo);
router.patch('/:id', prestamoController.devolverPrestamo);
router.get('/', prestamoController.obtenerPrestamos);

module.exports = router;