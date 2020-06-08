import axios from 'axios'

const baseUrl = '/api'

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums`)
}

export const getAllPosts = () => {
  return axios.get(`${baseUrl}/posts`)
}

export const getSinglePost = id => {
  return axios.get(`${baseUrl}/posts/${id}`)
}