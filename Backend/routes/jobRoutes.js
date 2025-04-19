import express from 'express';
import {
  crearTrabajo,
  obtenerTrabajos,
  obtenerTrabajoPorId,
  actualizarTrabajo,
  eliminarTrabajo,
  aplicarTrabajo,
  buscarTrabajos
} from '../controllers/job.controller.js';


const router = express.Router();

router.get('/', obtenerTrabajos);
router.post('/', crearTrabajo);
router.delete('/:id', eliminarTrabajo);
router.post('/aplicar', aplicarTrabajo);
router.get('/buscar', buscarTrabajos);
router.get('/:id', obtenerTrabajoPorId);
router.put('/:id', actualizarTrabajo);

export default router;
