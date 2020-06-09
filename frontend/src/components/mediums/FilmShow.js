import React, { useEffect, useState }  from 'react'
import { getSingleMedium } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'

function FilmShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  // const [ mediumToMap, setMediumToMap ] = useState('')

  console.log('this is medium', medium)

  // useEffect(() => {
  //   const mediumToMap = medium ? medium : null
  //   console.log('this is mediumToMap', mediumToMap)

  //   setMediumToMap(mediumToMap)
  //   console.log('this is setMediumToMap(mediumToMap', setMediumToMap(mediumToMap))
  // },[medium])

  if (error) {
    return <Redirect to="/notfound" />
  }


  // if (!mediumToMap) return 'no data'
  // if (!Array.isArray(medium)) return 'results are not array'
  return (
    <div>
      <h1>Film</h1>

      <br />

      {loading ?
        <Spinner />
        :
        <div>
          <h1>{medium.title}</h1>

          <br />

          {/* {mediumToMap.genres.map(medium => (
            <h1 key={medium.id}>{medium.genres}</h1>
          ))} */}
          
          {medium.map(medium => (
            medium.genres.map(medium => (
              <h1 key={medium.id}>{medium.genre}</h1>
            ))
          ))}

          <h1>{medium.creator}</h1>
          <h1>{medium.duration}</h1>
          <img src={medium.image} alt={medium.title} />
          {/* <video src={medium.trailer} /> */}
        </div>
      }
    </div>
  )
}
export default FilmShow 