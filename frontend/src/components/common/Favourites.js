/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleUser } from '../../lib/api'

class Favourites extends React.Component {
  state = {
    user: null,
    buttonClicked: false,
    categoryId: '',
    favesToRender: []
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
    this.state.buttonClicked = true
    const categoryId = event.target.value
    this.setState({ categoryId: categoryId })

    const userFaves = this.state.user.favourites.map(favourite => (
      favourite.medium
    ))

    const favesToRender = userFaves.filter(medium => (
      medium.category === parseInt(categoryId)
    ))

    await this.setState({ favesToRender: favesToRender })


  }





  render() {

    if (!this.state.favesToRender) return null
    const { buttonClicked, favesToRender } = this.state

    return (
      <>
        <div className="favourite-buttons-container">
          <button className="favourites-button film-favourite-image" onClick={this.handleClick} value='2'>Film</button>
          <button className="favourites-button art-favourite-image" onClick={this.handleClick} value='1'>Art</button>
          <button className="favourites-button music-favourite-image" onClick={this.handleClick} value='3'>Music</button>
        </div>

        <div>
          {buttonClicked ? favesToRender.map((favourite, index) => (

            <div key={index}>
              <h1>{favourite.title}</h1>
              <h2>{favourite.creator}</h2>
              <h2>{favourite.duration}</h2>
              <Link to={`/mediums/${favourite.id}`}>
                <img src={favourite.image} alt={favourite.title} />
              </Link>
            </div>

          )) : null}
        </div>
      </>
    )





  }
}

export default Favourites