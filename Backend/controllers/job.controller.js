import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";


// Crear un nuevo trabajo
export const crearTrabajo = async (req, res) => {
  try{
    
    console.log("📦 Datos recibidos para crear trabajo:", req.body);
    const data = await Job.create(req.body);    
    res.status(201).send(data);

}catch(error){
    console.error("❌ Error al crear trabajo:", error);
    res.status(500).send(error); 
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

//Obtener trabajo por ID 
export const obtenerTrabajoPorId = async (req, res) => {
  try {
    const trabajo = await Job.findById(req.params.id);
    if (!trabajo) return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    res.status(200).json(trabajo);
  } catch (error) {
    console.error("❌ Error al obtener trabajo por ID:", error);
    res.status(500).json({ mensaje: "Error al obtener el trabajo", error });
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

//Aplicar trabajo
export const aplicarTrabajo = async (req, res) => {
  const { user, job } = req.body;
  console.log("📥 Datos recibidos en aplicarTrabajo:", req.body);


  try {
    const usuario = await User.findById(user);
    if (!usuario || usuario.rol !== "solicitante") {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    const trabajo = await Job.findById(job);
    if (!trabajo) {
      return res.status(404).json({ mensaje: "Trabajo no encontrado" });
    }

    const yaAplico = await Application.findOne({ user, job });
    if (yaAplico) {
      return res.status(400).json({ mensaje: "Ya aplicaste a este trabajo" });
    }

    const nuevaAplicacion = new Application({
      user,
      job,
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      experiencia: req.body.experiencia,
      linkedin: req.body.linkedin,
      github: req.body.github,
      interes: req.body.interes,
      salario: req.body.salario,
      incorporacion: req.body.incorporacion
    });

    await nuevaAplicacion.save();

    res.status(201).json({ mensaje: "Aplicación enviada exitosamente" });
  } catch (error) {
    console.error("❌ Error al aplicar:", error);
    res.status(500).json({ mensaje: "Error al aplicar al trabajo" });
  }
};


// Buscar trabajos con filtros dinámicos 
export const buscarTrabajos = async (req, res) => {
  try {
    const { titulo, ubicacion, salario, tipoTrabajo, modalidad } = req.query;

    const filtros = {};

    if (titulo) {
      filtros.$or = [
        { titulo: { $regex: titulo, $options: 'i' } },
        { empresa: { $regex: titulo, $options: 'i' } }
      ];
    }
    
    if (ubicacion) filtros.ubicacion = { $regex: ubicacion, $options: 'i' };
    if (salario) filtros.salario = { $gte: parseInt(salario) };
    if (tipoTrabajo) filtros.tipoTrabajo = tipoTrabajo;
    if (modalidad) filtros.modalidad = modalidad;

    const trabajos = await Job.find(filtros).sort({ createdAt: -1 });

    res.status(200).json(trabajos);
  } catch (error) {
    console.error("❌ ERROR en buscarTrabajos:", error); 
    res.status(500).json({ mensaje: "Error al buscar trabajos", error });
  }
};


export const actualizarTrabajo = async(req,res)=>{   
  try{
      const {id}  = req.params;
      const data = await Job.findByIdAndUpdate(id,req.body);
      res.status(200).send(data);

  }catch(error){
      res.status(500).send(error);
  }
};

export const obtenerCandidatosPorTrabajo = async (req, res) => {
  const jobId = req.params.id;

  try {
    const aplicaciones = await Application.find({ job: jobId });
    res.status(200).json({ cantidad: aplicaciones.length });
  } catch (error) {
    console.error("Error al obtener candidatos:", error);
    res.status(500).json({ mensaje: "Error al obtener candidatos", error });
  }
};


export const cambiarEstadoEmpleo = async (req, res) => {
  const { id } = req.params;
  try {
    const empleo = await Job.findById(id);
    if (!empleo) return res.status(404).json({ mensaje: "Empleo no encontrado" });

    empleo.activo = !empleo.activo; // alternar estado
    await empleo.save();

    res.status(200).json({ mensaje: "Estado actualizado", activo: empleo.activo });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado", error });
  }
};




