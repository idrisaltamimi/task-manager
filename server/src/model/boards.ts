import mongoose from 'mongoose'

const subtask = {
  name: String,
  isCompleted: Boolean
}

const task = {
  name: String,
  description: String,
  status: String,
  subtasks: [subtask]
}

const column = {
  name: String,
  tasks: [task]
}

const boardsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  columns: [column],
  createdAt: {
    type: Date,
    default: new Date()
  },
})

const Boards = mongoose.model('Boards', boardsSchema)

export default Boards