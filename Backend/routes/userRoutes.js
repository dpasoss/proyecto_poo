import express from 'express';
import userController from '../controllers/user.cotroller.js';


const router = express.Router();

router.get("/", userController.listarUsuarios);
router.delete("/:id", userController.eliminarUsuario);
router.put("/:id", userController.actualizarUsuario);
router.get("/:id", userController.obtenerUsuarioPorId);




export default router; 

