const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libro.controller.js');

router.post('/', libroController.agregarLibro);
router.get('/buscar', libroController.buscarLibros);
router.get('/', libroController.obtenerLibros);
router.get('/:isbn', libroController.obtenerLibroPorISBN);
router.delete('/:isbn', libroController.borrarLibro);

module.exports = router;