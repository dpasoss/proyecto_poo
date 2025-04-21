//En este archivo esta la definición de todas las rutas de la entidad usuario
import express from 'express';
import {
    listarUsuarios
  } from '../controllers/user.cotroller.js'; 

// Este es el objeto manejador de las rutas de la entidad user
const router = express.Router();

router.get("/", listarUsuarios);
// router.delete('/:id', eliminarUsuario);
// router.get('/:id', obtenerUsuarioPorId);
// router.put('/:id', actualizarUsuario);
// router.put('/usuarios/:id/estado', cambiarEstadoUsuario);

export default router;

