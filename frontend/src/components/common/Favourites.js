/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { addFavourite, getAllMediums } from '../../lib/api'

class Favourites extends React.Component {
	state = {
	  user: '',
	  userFavourites: []
	}

	async getData() {
	  try {
	    const userId = this.user
	    console.log(userId)
	  } catch (err) {
	    console.log(err.message)
	  }
	}



	render() {
	  return (
	    <h1>Favourite pages</h1>
	  )
	}




}

export default Favourites