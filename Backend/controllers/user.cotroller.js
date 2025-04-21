import User from '../models/User.js';


// función para obtener la lista de usuarios (GET)
export const listarUsuarios = async(req,res)=>{
    try {
        const data = await User.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const obtenerUsuarioPorId = async (req, res) => {
    try {
      const usuario = await User.findById(req.params.id);
      if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.status(200).json(usuario);
    } catch (error) {
      console.error("❌ Error al obtener usuario por ID:", error);
      res.status(500).json({ mensaje: "Error al obtener el usuario", error });
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
      const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al actualizar el usuario", error });
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
      const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
      if (!usuarioEliminado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.status(200).json({ mensaje: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
    }
};

export default {
    listarUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
}

