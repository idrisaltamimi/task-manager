import express from 'express'

import { createBoard, fetchBoards, updateBoard, deleteBoard, createTask, updateTask } from '../controllers/boards.js'

const router = express.Router()

router.get('/', fetchBoards)
router.post('/post', createBoard)
router.patch('/:id', updateBoard)
router.delete('/delete/:id', deleteBoard)

router.patch('/task/:id', createTask)
router.patch('/update-task/:id', updateTask)

export default router