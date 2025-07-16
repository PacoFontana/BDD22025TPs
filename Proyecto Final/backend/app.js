const express = require('express');
const cors = require('cors');

const librosRouter = require('./routes/libros.routes');
const prestamosRouter = require('./routes/prestamos.routes');
const popularesRouter = require('./routes/populares.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/libros', librosRouter);
app.use('/api/prestamos', prestamosRouter);
app.use('/api/populares', popularesRouter);

module.exports = app;