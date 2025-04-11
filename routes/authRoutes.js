import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();


router.get('/test', (req, res) => {
    res.json({ msg: 'Servidor está funcionando' });
  });
  



router.post('/register', register);
router.post('/login', login);



export default router;

