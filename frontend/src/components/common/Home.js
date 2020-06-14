import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, Link } from 'react-router-dom'

function Home() {

  //* data in this context is what is being returned from useFetch. What we are doing here is renaming data: with post. So we don't need to use this.state. Everything is on post.
  const { data: post, error } = useFetch(getAllPosts)
  const [ recentPost, setRecentPost ] = useState('') //* setting state here.

  useEffect(() => {
    const max = post ? post.length - 1 : null //* making the result ternary. Doing it here rather than the render, using the varaible to specify. Only creates variable max with post length if post exists. (-1 becaue length is not the same as the index number)

    const recentPost = max ? post[max] : null

    setRecentPost(recentPost) //* sets post with index that has the greatest value to state -> it can be resued using recentPost

  },[post]) //* every time post changes. It will trigger this function to run

  if (error) {
    return <Redirect to="/notfound" />
  }

  return (
    <div className="home-page">
      <h1 className="home-tile-fam">FAM</h1>
      <div className="text-wrap">
        <p className='info-wrapper home-page-p'>
      IN CASE YOU MISSED IT 
          <br/>

Welcome to the FAM Website.
Discover new music, film, art as we share with you all the things we’ve been loving each month.<br/>  
          {/* The landing pages show a selection of our newest obsessions -  */}

Why not sign up so you can Get With It and be part of our conversation. Curate your own favourite lists, leave reviews and become a part of FAM
    
        </p>
      </div>
      {recentPost ? //* use recentPost here instead of loading
      //* anything you put before colon will be loaded. If there's nothing there it render the loading spinner.
        <div>
          <h2 className='info-wrapper index-page-h2'>{recentPost.info}</h2>
          <div className='home-wrapper'>
            <div className='home-item-wrapper'>
              <h3 className='home-medium-main-title-film'>{recentPost.film_title}</h3>
              <Link to={'/film'}>
                <img className='home-image-film responsive-home-image' src={recentPost.image_film} alt={recentPost.title} />
              </Link>
            </div>
            <div className='home-item-wrapper'>
              <h3 className='home-medium-main-title-art'>{recentPost.art_title}</h3>
              <Link to={'/art'}>
                <img className='home-image-art responsive-home-image' src={recentPost.image_art} alt={recentPost.title} />
              </Link>
            </div>
            <div className='home-item-wrapper'>
              <h3 className='home-medium-main-title-music'>{recentPost.music_title}</h3>
              <Link to={'/music'}>
                <img className='home-image-music responsive-home-image' src={recentPost.image_music} alt={recentPost.title}/>
              </Link>
            </div>
          </div>
        </div>
        :
        null
      }
    </div>
  )

}


export default Home
