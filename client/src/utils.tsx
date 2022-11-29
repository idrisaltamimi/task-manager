import axios from 'axios'

const api = 'http://localhost:5000'

export const postRequest = async (url: string, postData: any) => {
  const { data } = await axios.post(
    `${api}${url}`, postData
  )
  try {
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getRequest = async (url: string) => {
  const { data } = await axios.post(`${api}${url}`)

  try {
    return data
  } catch (error) {
    console.log(error)
  }
}