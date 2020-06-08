import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'


function Home() {

  //* data in this context is what is being returned from useFetch. What we are doing here is renaming data: with post. So we don't need to use this.state. Everything is on post.
  const { data: post, error } = useFetch(getAllPosts)
  const [ recentPost, setRecentPost ] = useState('') //* setting state here.  

  useEffect(() => {
    const max = post ? post.length - 1 : null //* making the result ternary. Doing it here rather than the render, using the varaible to specify. Only creates variable max with post length if post exists. (-1 becaue length is not the same as the index number)
    console.log('this is the max', max)
    console.log('this is the post in the function', post)
    // console.log('post[2]', post[2])
    const recentPost = max ? post[max] : null
    console.log(recentPost)
    setRecentPost(recentPost) //* sets post with index that has the greatest value to state -> it can be resued using recentPost
  
  },[post]) //* every time post changes. It will trigger this function to run

  if (error) {
    return <Redirect to="/notfound" />
  }

  return (
    <div>
      <h1>FAM</h1>
      <p>
        About 
      best app init
      </p>
      {recentPost ? //* use recentPost here instead of loading
      //* anything you put before colon will be loaded. If there's nothing there it render the loading spinner.
        <div>
          <h1>{recentPost.title}</h1>
          <h2>{recentPost.info}</h2>
          <h3>{recentPost.film_title}</h3>
          <img src={recentPost.image_film} />
          <h3>{recentPost.art_title}</h3>
          <img src={recentPost.image_art} />
          <h3>{recentPost.music_title}</h3>
          <img src={recentPost.image_music} />
        </div>
        :
        <Spinner />
      }
    </div>
  )

}


export default Home

