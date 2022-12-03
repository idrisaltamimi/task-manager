import mongoose from 'mongoose'

const subtask = {
  id: String,
  title: String,
  isCompleted: Boolean
}

const task = {
  id: String,
  title: String,
  description: String,
  status: String,
  subtasks: [subtask]
}

const column = {
  id: String,
  name: String,
  tasks: [task]
}

const boardsSchema = new mongoose.Schema({
  id: String,
  name: String,
  columns: [column],
  createdAt: {
    type: Date,
    default: new Date()
  },
})

const Boards = mongoose.model('Boards', boardsSchema)

export default Boards