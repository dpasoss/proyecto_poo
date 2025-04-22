import mongoose from "mongoose";

export const jobSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  }, 
  ubicacion: {
    type: String,
    required: true,
  },
  salario: {
    type: Number,
    required: true
  },
  tipoTrabajo: {
    type: String,
    enum: ['tiempo completo', 'parcial'],
    default: 'tiempo completo'
  },
  modalidad: {
    type: String,
    enum: ['hibrido', 'onsite'],
    default: 'onsite'
  },
  vencimiento: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;




