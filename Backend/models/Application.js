import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  nombre: String,
  correo: String,
  telefono: String,
  experiencia: Number,
  linkedin: String,
  github: String,
  interes: String,
  salario: String,
  incorporacion: String
});

export default mongoose.model("Application", applicationSchema);
