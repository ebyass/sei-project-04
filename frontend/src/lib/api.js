import axios from 'axios'

const baseUrl = '/api'

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums`)
}

export const getAllPosts = async () => {
  console.log('posts')
  const result = await axios.get(`${baseUrl}/posts`)
  console.log(result)
  return result
  
}

export const getSinglePost = id => {
  console.log('this is the id', id)
  const result = axios.get(`${baseUrl}/posts/${id}`)
  console.log(result)
  return result
}