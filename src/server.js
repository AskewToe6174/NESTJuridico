require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// opcionales
// const helmet = require('helmet');
// const compression = require('compression');

const { sequelize } = require('./models');
const apiRoutes = require('./routes');  // <-- nuevo index

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(compression());
const corsOptions = {
  origin: ['http://localhost:3001', 'https://mi-front-end.com'], // Lista de orígenes permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true, // Si se van a enviar cookies o cabeceras de autenticación
};


app.use(cors(corsOptions)); // Usa la configuración personalizada

// Health check
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: 'connected' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Rutas módulo jurídico
app.use('/api/v1', apiRoutes);

// Manejo de errores final
app.use((err, req, res, next) => {
  console.error('ERROR API:', err);
  res.status(500).json({ error: { message: err.message || 'Error interno' }});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 API Jurídico escuchando en http://localhost:${port}`);
});
