import axios from 'axios'

import { newUserType, userType } from '../actions'
import { BoardType } from '../constants'

const API = axios.create({ baseURL: 'http://localhost:5000' })

const savedUser = JSON.parse(localStorage.getItem('profile') || 'null')
const user = savedUser !== 'null' ? null : savedUser

API.interceptors.request.use((req) => {
  if (user) {
    if (req.headers) req.headers.Authorization = `Bearer ${user.token}`
  }

  return req
})

export const fetchBoards = () => API.get(`/boards`)

export const createBoard = (newBoard: BoardType) => API.post(`/boards/post`, newBoard)
export const updateBoard = (id: string, updatedBoard: BoardType) => API.patch(`/boards/${id}`, updatedBoard)
export const deleteBoard = (id: string) => API.delete(`/boards/delete/${id}`)

export const signIn = (user: userType) => API.post(`/auth/signin`, user)
export const signUp = (newUser: newUserType) => API.post(`/auth/signup`, newUser)