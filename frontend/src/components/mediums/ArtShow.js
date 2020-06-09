import React, { useEffect, useState }  from 'react'
import { getSingleMedium } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'

function ArtShow() {
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
          <img src={medium.image} alt={medium.title} />
          {/* <video src={medium.trailer} /> */}
        </div>
      }
    </div>
  )
}
export default ArtShow 