import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['solicitante', 'empleador', 'admin'],
    default: 'solicitante'
  },
  datosCandidato: {
    type: Object,
    default: {}
  },
  datosEmpleador: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
