import axios from 'axios'

import { BoardType } from '../constants'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchBoards = () => API.get(`/boards`)

export const createBoard = (newBoard: BoardType) => API.post(`/boards/post`, newBoard)
export const updateBoard = (id: string, updatedBoard: BoardType) => API.patch(`/boards/${id}`, updatedBoard)
export const deleteBoard = (id: string) => API.delete(`/boards/delete/${id}`)