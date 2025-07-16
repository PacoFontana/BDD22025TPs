const express = require('express');
const router = express.Router();
const popularesController = require('../controllers/populares.controller.js');

router.get('/', popularesController.librosPopulares);

module.exports = router;