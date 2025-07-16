const express = require('express');
const connectDB = require('./bd');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

connectDB()

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});