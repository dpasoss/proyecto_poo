// import mongoose from "mongoose";

// export const userSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   correo: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   contraseña: {
//     type: String,
//     required: true
//   },
//   rol: {
//     type: String,
//     enum: ['solicitante', 'empleador', 'admin'],
//     default: 'solicitante'
//   },
//   datosCandidato: {
//     type: Object,
//     default: {}
//   },
//   datosEmpleador: {
//     type: Object,
//     default: {}
//   }
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema);
// export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Definición del esquema
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

// 🧂 Encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});


// 🔐 Método para comparar contraseñas
userSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.contraseña);
};

const User = mongoose.model('User', userSchema);
export default User;
