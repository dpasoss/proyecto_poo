//Configuración de conexión a MongoDB Atlas 
import mongoose from "mongoose";
import 'dotenv/config.js';

export const dbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Conectado correctamente a MongoDB Atlas');
    } catch (error) {
      console.error('❌ Error de conexión a MongoDB:', error);
    }
  };

