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
    enum: ['hibrido', 'onsite', 'remoto'],
    default: 'onsite'
  },
  vencimiento: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
  },

  empresa: {
    type: String,
  },
  
  aplicantes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;




