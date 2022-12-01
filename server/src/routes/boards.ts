import express from 'express'

import { getBoard, fetchBoards } from '../controllers/boards.js'

const router = express.Router()

router.get('/', fetchBoards)
router.post('/post', getBoard)

export default router