import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { dbConnect } from './config/db.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

try {
  // Rutas
  app.use('/api/auth', authRoutes);

  // Conexión a la BD
  dbConnect();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  });

} catch (error) {
  console.error('❌ Error al iniciar el servidor:', error);
}
