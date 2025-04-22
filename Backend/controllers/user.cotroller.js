import User from '../models/User.js';

const userController = {
  // Obtener todos los usuarios
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await User.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
  },

  // Obtener usuario por ID
  obtenerUsuarioPorId: async (req, res) => {
    try {
      const usuario = await User.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el usuario", error });
    }
  },

  // Eliminar usuario por ID
  eliminarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await User.findByIdAndDelete(id);
      if (!eliminado) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
    }
  },

  // Actualizar usuario
  actualizarUsuario: async (req, res) => {
    try {
      const usuarioActualizado = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar usuario", error });
    }
  }
};

export default userController;



