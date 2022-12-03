import mongoose from 'mongoose'

import Boards from '../model/boards.js'

export const fetchBoards = async (req, res) => {
  try {
    const boards = await Boards.find()

    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const createBoard = async (req, res) => {
  const board = req.body

  const newTask = new Boards({ ...board, createdAt: new Date().toISOString() })
  try {
    await newTask.save()

    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message })
  }
}

export const updateBoard = async (req, res) => {
  const { id } = req.params
  const board = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No BOARD with the id ${id}`)

  const updatedBoard = await Boards.findByIdAndUpdate(id, { ...board, id, createdAt: new Date().toISOString() })

  res.json(updatedBoard)
}