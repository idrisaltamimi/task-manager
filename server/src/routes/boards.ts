import express from 'express'

import { createBoard, fetchBoards, updateBoard } from '../controllers/boards.js'

const router = express.Router()

router.get('/', fetchBoards)
router.post('/post', createBoard)
router.patch('/:id', updateBoard)

export default router