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

export const getBoard = async (req, res) => {
  const { name } = req.body

  const newTask = new Boards({ name })
  try {
    await newTask.save()

    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message })
  }
}