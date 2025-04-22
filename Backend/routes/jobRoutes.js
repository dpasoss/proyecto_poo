import express from 'express';
import {
  crearTrabajo,
  obtenerTrabajos,
  obtenerTrabajoPorId,
  actualizarTrabajo,
  eliminarTrabajo,
  aplicarTrabajo,
  buscarTrabajos,
  obtenerCandidatosPorTrabajo
} from '../controllers/job.controller.js';


const router = express.Router();

router.get('/', obtenerTrabajos);
router.post('/', crearTrabajo);
router.delete('/:id', eliminarTrabajo);
router.post('/aplicar', aplicarTrabajo);
router.get('/buscar', buscarTrabajos);
router.get('/:id', obtenerTrabajoPorId);                    
router.put('/:id', actualizarTrabajo);
router.get('/solicitante/:id', obtenerCandidatosPorTrabajo); 

// router.put('/estado/:id', cambiarEstadoTrabajo);


export default router;
