const express = require('express');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/processRoutes');
const userRoutes = require('./routes/userRoute');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Request-Method'],
  }));
// Rutas
app.use('/api', projectRoutes);
app.use('/api', userRoutes);
//Exportar
module.exports = app;
