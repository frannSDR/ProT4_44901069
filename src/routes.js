import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router();

router.get('/libros', libro.getAll);
router.get('/libros/:id', libro.getOne);
router.post('/libro', libro.add);
router.delete('/libro', libro.delete);