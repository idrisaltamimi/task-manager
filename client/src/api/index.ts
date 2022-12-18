import axios from 'axios'

import { newUserType, userType } from '../actions'
import { BoardType } from '../constants'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchBoards = (userId: string) => API.get(`/boards/${userId}`)

export const createBoard = (newBoard: BoardType) => API.post(`/boards/post`, newBoard)
export const updateBoard = (id: string, updatedBoard: BoardType) => API.patch(`/boards/${id}`, updatedBoard)
export const deleteBoard = (id: string) => API.delete(`/boards/delete/${id}`)

export const signIn = (user: userType) => API.post(`/auth/signin`, user)
export const signUp = (newUser: newUserType) => API.post(`/auth/signup`, newUser)