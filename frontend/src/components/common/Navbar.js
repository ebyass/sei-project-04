import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isAuthenticated } from '../../lib/auth'

class Navbar extends React.Component{ 
  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return (
      <menu>

        <div className="menu-item">
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/film">Film</Link>
        </div>
        <div className="menu-item">
          <Link to="/art">Art</Link>
        </div>
        <div className="menu-item">
          <Link to="/music">Music</Link>
        </div>
        <div className="menu-item">
          {isAuthenticated() && <Link to="/profile">My Favourites</Link>}
        </div>
        <div className="menu-item">
          {!isAuthenticated() && <Link to="/register">Register</Link>}
        </div>
        <div className="menu-item">
          {!isAuthenticated() && <Link to="/login">Login</Link>}
        </div>
        <div className="menu-item">
          {isAuthenticated() && <Link to="/" onClick={this.handleLogout}>Logout</Link>}
        </div>
        
      </menu>
    )

  }
}

export default withRouter(Navbar)