import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generar token
const generarJWT = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET, // clave secreta desde .env
    { expiresIn: '1d' } // tiempo de expiración del token (1 día)
  );
};


//Registro de usuario
export const register = async (req, res) => {
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
  
      // Token
      const token = generarJWT(nuevoUsuario);
  
      res.status(201).json({
        msg: 'Usuario registrado correctamente',
        usuario: {
          id: nuevoUsuario._id,
          nombre: nuevoUsuario.nombre,
          correo: nuevoUsuario.correo,
          rol: nuevoUsuario.rol
        },
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  };




//Login
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
  
      const token = generarJWT(usuario);
  
      res.status(200).json({
        msg: 'Login exitoso',
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        },
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  };