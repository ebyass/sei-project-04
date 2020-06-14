/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleUser } from '../../lib/api'
import filmimage from '../../images/filmimage.jpg'
import artimage from '../../images/artimage.jpg'
import musicimage from '../../images/musicimage.jpg'

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
        <div className="fam-title-index-container">
          <h1 className="home-tile-fam">FAM</h1>
        </div>
        <div className="favourite-buttons-container">
          <button style={{ backgroundImage: `url(${filmimage})` }} className="favourites-button film-favourite-image" onClick={this.handleClick} value='2'><h1 className="favourites-button-text">Film</h1></button>
          <button style={{ backgroundImage: `url(${artimage})` }} className="favourites-button art-favourite-image" onClick={this.handleClick} value='1'><h1 className="favourites-button-text">Art</h1></button>
          <button style={{ backgroundImage: `url(${musicimage})` }} className="favourites-button music-favourite-image" onClick={this.handleClick} value='3'><h1 className="favourites-button-text">Music</h1></button>
        </div>
        <div className="favourites-medium-wrap">
          <div className="favourites-mediums-container">
            {buttonClicked ? favesToRender.map((favourite, index) => (

              <div className="favourites-item" key={index}>
                <h1 className="favourite-title">{favourite.title}</h1>
                <h2>{favourite.creator}</h2>
                <h2 className="favourite-duration">{favourite.duration}</h2>
                <Link to={`/mediums/${favourite.id}`}>
                  <img className="favourites-medium-image" src={favourite.image} alt={favourite.title} />
                </Link>
              </div>

            )) : null}
          </div>
        </div>
      </>
    )





  }
}

export default Favourites