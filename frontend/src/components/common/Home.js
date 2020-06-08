import React from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'


function Home() {
  const { data: posts, loading, error } = useFetch(getAllPosts)
  
  if (error) {
    return <Redirect to="/notfound" />
  }

  return (
    <div>
      posts.map(post => (
      <h1 key={post.id} {...post} />
      ))
    </div>
  )

}


export default Home




