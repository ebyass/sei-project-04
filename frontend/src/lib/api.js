import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } }
}

//! MEDIUMS

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums`)
}

export const getSingleMedium = async id => {
  // console.log('this is the id')
  const result = await axios.get(`${baseUrl}/mediums/${id}`)
  console.log('this is single medium', result)
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
  // console.log('this is the id', id)
  const result = axios.get(`${baseUrl}/posts/${id}`)
  // console.log(result)
  return result
}

//! REVIEWS

export const createReview = async ( reviewData, mediumId) => {
  const result = await axios.post(`${baseUrl}/reviews/${mediumId}/`, reviewData, withHeaders())
  console.log('createReview result:', result)
  return result
}

export const deleteReview = async ( medium, reviewId ) => {
  console.log('medium in delete', medium)
  console.log('reviewId in delete', reviewId)
  console.log('withHeaders', withHeaders())
  const result = await axios.delete(`${baseUrl}/reviews/${reviewId}/`, withHeaders())
  console.log('deleteReview result:', result)
  return result
}


//! Register

export const registerUser = async data => {
  // console.log('this is the data in registerUser')
  const result = axios.post(`${baseUrl}/register`, data)
  return result
}

//! Login

export const loginUser = async data => {
  // console.log('this is the data in loginUser')
  const result = axios.post(`${baseUrl}/login`, data)
  return result
}
