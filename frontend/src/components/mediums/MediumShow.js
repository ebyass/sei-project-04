import React, { useEffect, useState }  from 'react'
import { getSingleMedium, getSingleUser, addFavourite, deleteFavourite } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Reviews from '../common/Reviews'
import moment from 'moment'
import { isAuthenticated } from '../../lib/auth'


function MediumShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const { data: user } = useFetch(getSingleUser)
  const [ mediumToMap, setMediumToMap ] = useState([]) //* setting state here
  // eslint-disable-next-line no-unused-vars
  const [ userFavourites, setUpdateFavourites ] = useState([])
  const [ buttonText, setButtonText ] = useState('') 
  const [ isFavourite, setIsFavourite ] = useState(false)
  const [ newFaveId, setNewFaveId ] = useState('')

	

	
  useEffect(() => {
    const getGenreOfMedium = medium ? medium.genres.map(item => item) : null //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null

    setMediumToMap(getGenreOfMedium) //* setting getGenreOfMedium to state

    // setUpdateFavourites( user ? user.favourites.map(item => item.medium) : null) 
    const userFavouritesMedium = user ? user.favourites.map(item => item.medium) : null 
    setUpdateFavourites(userFavouritesMedium)
    console.log('Here', userFavouritesMedium)
		
    const userFavourites = user ? user.favourites.map(item => item) : null 
    console.log('HAHA', userFavourites)

    // setIsFavourite(userFavourites ? userFavourites.map(faveMedium => faveMedium.id === medium.id) : false)
    const isItAlreadyAFave = userFavourites ? userFavourites.some(faveMedium => faveMedium.id === medium.id) : false
    setIsFavourite(isItAlreadyAFave)
		
    // const getFaveId = isItAlreadyAFave ? userFavourites.map(item => (
    //   item.favourites.filter()) : null
    // console.log('THE FAVOURITE ID', getFaveId)

    if (isItAlreadyAFave) {
      setButtonText('Remove from Faves')
      setIsFavourite(true)
			
    } else {
      setButtonText('Add to faves')
      setIsFavourite(false)
    }


  },[medium, user], console.log('page first loadss')) //* every time medium  and user change. It will trigger this function to run

  const handleClick = async (e) => {

    const favouriteMediumId = e.target.value
    // console.log(isItAlreadyAFave)

    if (isFavourite){
      console.log('newFaveId', newFaveId)
      setIsFavourite(true)
      // setButtonText('Remove From Favourites')
      console.log('shoud be removed from favourites')
      const result = await deleteFavourite(newFaveId)

      setUpdateFavourites(result.data)

    } else {
      setIsFavourite(false)
      // setButtonText('Adding To Favourites')
      console.log('shoud be added to favourites')
      const res = await addFavourite(favouriteMediumId)
      const favouriteId = res.data.id
      setUpdateFavourites(res.data)
      setNewFaveId(favouriteId)
      console.log(favouriteId)
			

    }
  
		
    

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
          {isAuthenticated() && <button onClick={handleClick} value={medium.id}>{buttonText}</button>}
          <Reviews
            mediumId={medium.id}
          />
          
        </div>
      }
    </div>
  )
}
export default MediumShow 