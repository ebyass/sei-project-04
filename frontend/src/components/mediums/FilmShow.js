import React, { useEffect, useState }  from 'react'
import { getSingleMedium, getSingleUser } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Favourites from '../common/Favourites'

function FilmShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const { data: user } = useFetch(getSingleUser)
  const [ mediumToMap, setMediumToMap ] = useState([]) //* setting state here
  const [ userFavourites, setUserFavourites ] = useState([])
	
	
  useEffect(() => {
    const getGenreOfMedium = medium ? medium.genres.map(item => item) : null //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null
    setMediumToMap(getGenreOfMedium) //* setting getGenreOfMedium to state
	
    const userFavourites = user ? user.favourites.map(item => item) : null 
    setUserFavourites(userFavourites) 
    console.log('userfavourites', userFavourites) 
		
		
  },[medium, user]) //* every time medium changes. It will trigger this function to run


  const handleClick = (e) => {
    // setAddToFavourites(true)
    const favouriteMediumId = e.target.value
		
    const alreadyAFave = userFavourites.map(fave => 
      fave.id !== favouriteMediumId
    ) 
    console.log('alreadyaFave', alreadyAFave)
		
    userFavourites.push( favouriteMediumId )
    return setUserFavourites(userFavourites)
		
  }

  console.log('USER FAVES', userFavourites)

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
          < Favourites userFavourites={userFavourites} user={user} />
          <button onClick={handleClick} value={medium.id}>Add to favourites</button>
        </div>
      }
    </div>
  )
}
export default FilmShow 