import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: `${__dirname}/../.env` })

import boardRoutes from './routes/boards.js'

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use(express.json())

app.use('/boards', boardRoutes)

app.get('/', (req, res) => {
  res.send('App is running')
})

const PORT = process.env.PORT || 5000

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
  .catch(error => console.error(error))