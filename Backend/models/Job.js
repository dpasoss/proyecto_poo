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
    enum: ['Tiempo completo', 'Parcial'],
    default: 'Tiempo completo'
  },
  Modalidad: {
    type: String,
    enum: ['Hibrido', 'Remoto', 'Presencial'],
    default: 'Presencial'
  },
  Vencimiento: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;

