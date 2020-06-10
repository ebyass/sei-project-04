/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { addFavourite, getAllMediums, getSingleUser } from '../../lib/api'

class Favourites extends React.Component {
	state = {
	  user: null
	}

	async componentDidMount() {
	  try {
	    const userId = this.props.match.params.id
	    const res = await getSingleUser(userId)
	    this.setState({ user: res.data })
	  } catch (err) {
	    console.log(err.response)
	  }
	}

	handleClick = async event => {
	  try {
	    if (event.target.value === 'art') {
	      console.log('art button clicked')
	      console.log('userinfo', this.state.user)
				
	    } else if (event.target.value === 'film') {
	      console.log('film button clicked')
	    } else {
	      console.log('music button clicked')
	    }
	  } catch (err) {
	    console.log(err.message)
	  }
	}






	render() {
	  return (
	    <div>
	    	<button onClick={this.handleClick} value= "film">Film</button>
	      <button onClick={this.handleClick} value="art">Art</button>
	      <button onClick={this.handleClick} value="music">Music</button>
	    </div>
	  )
	}




}

export default Favourites