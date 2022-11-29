import mongoose from 'mongoose'

const columns = {
  id: String,
  name: String,
  subtasks: [{ task: String, id: String }]
}

const boardsSchema = mongoose.Schema({
  id: String,
  name: String,
  columns: [columns]
})

const Boards = mongoose.model('Boards', boardsSchema)

export default Boards