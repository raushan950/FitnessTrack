import express from 'express'
import { getAllDiets, getDietById, createDiet, updateDiet, deleteDiet } from '../controllers/dietController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', protect, getAllDiets);
router.get('/:id', protect, getDietById);
router.post('/', protect, createDiet);
router.put('/:id', protect, updateDiet);
router.delete('/:id', protect, deleteDiet);

export default router