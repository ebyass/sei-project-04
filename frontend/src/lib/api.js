import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums`)
}