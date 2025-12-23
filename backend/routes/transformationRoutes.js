import express from 'express'
import { addProgress, getProgress,deleteProgress } from '../controllers/transformationController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getProgress)
router.post('/', protect, addProgress) 
router.delete('/:id', protect, deleteProgress)

export default router