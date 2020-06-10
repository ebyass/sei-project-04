import React, { useEffect, useState }  from 'react'
import { getSingleMedium, getSingleUser, addFavourite } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Reviews from '../common/Reviews'
import moment from 'moment'

function MediumShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const { data: user } = useFetch(getSingleUser)
  const [ mediumToMap, setMediumToMap ] = useState([]) //* setting state here
  // eslint-disable-next-line no-unused-vars
  const [ userFavourites, setUpdateFavourites ] = useState([])
  const [ buttonText, setButtonText ] = useState('Add To Favourites')

  useEffect(() => {
    const getGenreOfMedium = medium ? medium.genres.map(item => item) : null //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null

    setMediumToMap(getGenreOfMedium) //* setting getGenreOfMedium to state

    const userFavourites = user ? user.favourites.map(item => item) : null 

    setUpdateFavourites(userFavourites)

  },[medium, user]) //* every time medium  and user change. It will trigger this function to run

  const handleClick = async (e) => {
    const buttonText = 'Added'
    setButtonText(buttonText)
    const favouriteMediumId = e.target.value
    const res = await addFavourite(favouriteMediumId)
    setUpdateFavourites(res.data)
  }

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

          {mediumToMap ? mediumToMap.map(mediumGenre => (  //* like this.state. using mediumToMap from state
            <h1 key={mediumGenre.id}>{mediumGenre.name}</h1> //* this the genre
          )) : null }
          

          <h1>{medium.creator}</h1>
          <h1>{medium.duration}</h1>
          <h1>{medium.price}</h1> 
          <h1>{moment(medium.start_date).format('MMM Do YY')} - {moment(medium.end_date).format('MMM Do YY')}</h1>
          <h1>{medium.art_gallery_location}</h1>
          <h1>{medium.art_gallery}</h1>
          <p>{medium.info}</p>
          <h2>{medium.year}</h2>
          <img src={medium.image} alt={medium.title} />
          {/* <video src={medium.trailer} /> */}
          <br/>
          <button onClick={handleClick} value={medium.id}>{buttonText}</button>

          <Reviews
            mediumId={medium.id}
          />
          
        </div>
      }
    </div>
  )
}
export default MediumShow 