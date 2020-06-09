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
  // console.log('this is single medium', result)
  return result
}



//! POSTS

export const getAllPosts = async () => {
  console.log('gettingAllPostsAPIrunning')
  const result = await axios.get(`${baseUrl}/posts`)
  // console.log(result)
  return result
  
}

export const getSinglePost = async id => {
  // console.log('this is the id', id)
  const result = axios.get(`${baseUrl}/posts/${id}`)
  console.log(result)
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

//! USER

export const getSingleUser = async () => {
  console.log('getting user')
  const result = await axios.get(`${baseUrl}/profile`, withHeaders())
  console.log(result)
  return result
}

//! ADD A FAVOURITE 


export const addFavourite = async () => {
  console.log('adding fave')
  const res = await axios.post(`${baseUrl}/favourites/`, withHeaders())
  console.log(res)
}
