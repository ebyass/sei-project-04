import React from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'


function Home() {
  // const history = useHistory()

  //* data in this context is what is being returned from useFetch. What we are doing here is renaming data: with post. So we don't need to use this.state. Everything is on post.
  const { data: post, loading, error } = useFetch(getAllPosts)

  if (error) {
    return <Redirect to="/notfound" />
  }

  // if (!this.state) return null

  console.log('home state', post)


  return (
    <div>
      {loading ?
        <Spinner />
        :
        <h1>{post[0].id}</h1>
      }
    </div>
  )

}


export default Home









//   const { data: post, loading, error } = useFetch(getSinglePost)


//   if (error) {
//     console.log(error.data.message)
//     console.log('this is the posts', post)
    
//     return <Redirect to="/notfound" />
//   }

//   return (
//     <div>
//       {loading ?
//         <Spinner />
//         :
//         post.map(post => (
//           <p key={post.id} {...post.id} />
//         ))
//       }
//     </div>
//   )