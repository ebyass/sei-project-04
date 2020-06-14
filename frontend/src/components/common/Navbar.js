import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isAuthenticated } from '../../lib/auth'
import burger from '../../images/burger.svg'

class Navbar extends React.Component{ 
  state = {
    navbarStatus: false,
    navBarAddClass: ''
  }

  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  responsiveNavbarOnClick = () => {
    const newNavbarState = this.state.navbarStatus
    this.setState({ navbarStatus: !newNavbarState })
    if (newNavbarState) {
      this.setState({ navBarAddClass: ' active' }) //* adding className. If navbar is open
    } else {
      this.setState({ navBarAddClass: '' }) //* adding className. else if navbar is closed
    }
    console.log(this.state.navBarAddClass)
  }

  render() {
    const { navBarAddClass } = this.state
    return (
      <menu className={navBarAddClass}>
        <div className="burger-icon" onClick={this.responsiveNavbarOnClick}> 
          <img className="burger-image" src={burger}/>
        </div>
        
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          <Link to="/film">Film</Link>
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          <Link to="/art">Art</Link>
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          <Link to="/music">Music</Link>
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          {isAuthenticated() && <Link to="/profile">My Favourites</Link>}
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          {!isAuthenticated() && <Link to="/register">Register</Link>}
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          {!isAuthenticated() && <Link to="/login">Login</Link>}
        </div>
        <div className="menu-item" onClick={this.responsiveNavbarOnClick}>
          {isAuthenticated() && <Link to="/" onClick={this.handleLogout}>Logout</Link>}
        </div>
      </menu>
    )

  }
}

export default withRouter(Navbar)