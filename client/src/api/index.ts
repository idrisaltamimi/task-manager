import axios from 'axios'

import { BoardType } from '../constants'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchBoards = () => API.get(`/boards`)

export const postBoard = (newBoard: BoardType) => API.post(`/boards/post`, newBoard)