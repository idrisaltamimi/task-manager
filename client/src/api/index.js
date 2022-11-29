import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchBoards = () => API.get(`/boards`)

export const postBoard = (newBoard) => API.post(`/boards/post`, newBoard)