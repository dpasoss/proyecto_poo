//En este archivo esta la definición de todas las rutas de la entidad libro
import express from 'express';
import userController from '../controllers/user.cotroller.js';

// Este es el objeto manejador de las rutas de la entidad user
const router = express.Router();

router.get("/", userController.listarUsuarios);

export default router; 

