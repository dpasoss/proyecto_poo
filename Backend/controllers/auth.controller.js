import User from '../models/User.js';

// Registro de usuario
export const register = async (req, res) => {
  console.log(req.body);
  const { nombre, correo, contraseña, rol, datosCandidato, datosEmpleador } = req.body;

  try {
    // Validar si ya existe
    const existeUsuario = await User.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new User({
      nombre,
      correo,
      contraseña,
      rol,
      datosCandidato: rol === 'candidato' ? datosCandidato : undefined,
      datosEmpleador: rol === 'empleador' ? datosEmpleador : undefined
    });

    await nuevoUsuario.save();

    res.status(201).json({
      msg: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Login
export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.compararPassword(contraseña);

    if (!passwordValida) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      msg: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

export default {
  register,
  login
}