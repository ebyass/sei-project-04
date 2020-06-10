import React, { useEffect, useState }  from 'react'
import { getSingleMedium } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Reviews from '../common/Reviews'

function MediumShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const [ mediumToMap, setMediumToMap ] = useState([]) //* setting state here

  useEffect(() => {
    const getGenreOfMedium = medium ? medium.genres.map(item => item) : null //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null

    setMediumToMap(getGenreOfMedium) //* setting getGenreOfMedium to state

  },[medium]) //* every time medium changes. It will trigger this function to run


  if (error) {
    return <Redirect to="/notfound" />
  }

  return (
    <div>

      <br />

      {loading ?
        <Spinner />
        :
        <div>

          <h1>{medium.title}</h1>

          <br />

          {mediumToMap ? mediumToMap.map(medium => (  //* like this.state. using mediumToMap from state
            <h1 key={medium.id}>{medium.name}</h1>
          )) : null }
          

          <h1>{medium.creator}</h1>
          <h1>{medium.duration}</h1>
          <h1>{medium.price}</h1> 
          <h1>{medium.start_date}</h1> 
          <h1>{medium.end_date}</h1>
          <h1>{medium.art_gallery_location}</h1>
          <h1>{medium.art_gallery}</h1>
          <p>{medium.info}</p>
          <h2>{medium.year}</h2>
          <img src={medium.image} alt={medium.title} />
          {/* <video src={medium.trailer} /> */}

          <Reviews
            mediumId={medium.id}
          />
          
        </div>
      }
    </div>
  )
}
export default MediumShow 