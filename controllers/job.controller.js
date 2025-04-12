import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

// Crear un nuevo trabajo
export const crearTrabajo = async (req, res) => {
  try {
    const nuevoTrabajo = new Job(req.body);
    await nuevoTrabajo.save();
    res.status(201).json(nuevoTrabajo); 
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el trabajo", error });
  }
};

// Obtener todos los trabajos
export const obtenerTrabajos = async (req, res) => {
  try {
    const trabajos = await Job.find();
    res.status(200).json(trabajos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los trabajos", error });
  }
};

// Obtener un trabajo por ID
export const obtenerTrabajoPorId = async (req, res) => {
  try {
    const trabajo = await Job.findById(req.params.id);
    if (!trabajo) return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    res.status(200).json(trabajo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el trabajo", error });
  }
};

// Actualizar un trabajo
export const actualizarTrabajo = async (req, res) => {
  try {
    const trabajoActualizado = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trabajoActualizado) return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    res.status(200).json(trabajoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el trabajo", error });
  }
};

// Eliminar un trabajo
export const eliminarTrabajo = async (req, res) => {
  try {
    const trabajoEliminado = await Job.findByIdAndDelete(req.params.id);
    if (!trabajoEliminado) return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    res.status(200).json({ mensaje: "Trabajo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el trabajo", error });
  }
};

export const aplicarTrabajo = async (req, res) => {
const { userId, jobId } = req.body;

try {
    // Verifica que el usuario exista y sea un solicitante
    const user = await User.findById(userId);
    if (!user || user.rol !== "solicitante") {
    return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    // Verifica que el trabajo exista
    const job = await Job.findById(jobId);
    if (!job) {
    return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    }

    // Verifica si ya aplicó
    const yaAplico = await Application.findOne({ user: userId, job: jobId });
    if (yaAplico) {
    return res.status(400).json({ mensaje: "Ya aplicaste a este trabajo" });
    }

    // Crea nueva aplicación
    const nuevaAplicacion = new Application({ user: userId, job: jobId });
    await nuevaAplicacion.save();

    res.status(201).json({ mensaje: "Aplicación enviada exitosamente" });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al aplicar al trabajo" });
}
};
