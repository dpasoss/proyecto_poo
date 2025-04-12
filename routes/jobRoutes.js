import express from 'express';
import {
  crearTrabajo,
  obtenerTrabajos,
  obtenerTrabajoPorId,
  actualizarTrabajo,
  eliminarTrabajo,
  aplicarTrabajo
} from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', obtenerTrabajos);
router.get('/:id', obtenerTrabajoPorId);
router.post('/', crearTrabajo);
router.put('/:id', actualizarTrabajo);
router.delete('/:id', eliminarTrabajo);
router.post('/aplicar', aplicarTrabajo);

export default router;
