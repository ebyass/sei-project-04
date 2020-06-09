import axios from 'axios'

const baseUrl = '/api'

//! MEDIUMS

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums`)
}

export const getSingleMedium = async id => {
  // console.log('this is the id')
  const result = await axios.get(`${baseUrl}/mediums/${id}`)
  // console.log('this is single medium', result)
  return result
}



//! POSTS

export const getAllPosts = async () => {
  console.log('posts')
  const result = await axios.get(`${baseUrl}/posts`)
  // console.log(result)
  return result
  
}

export const getSinglePost = async id => {
  console.log('this is the id', id)
  const result = axios.get(`${baseUrl}/posts/${id}`)
  console.log(result)
  return result
}