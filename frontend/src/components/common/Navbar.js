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
      <nav>
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/film"><h1>Film</h1></Link>
        <Link to="/art"><h1>Art</h1></Link>
        <Link to="/music"><h1>Music</h1></Link>

        {isAuthenticated() && <Link to="/profile"><h1>My Favourites</h1></Link>}

        {!isAuthenticated() && <Link to="/register"><h1>Register</h1></Link>}

        {!isAuthenticated() && <Link to="/login"><h1>Login</h1></Link>}

        {isAuthenticated() && <Link to="/" onClick={this.handleLogout}><h1>Logout</h1></Link>}

      </nav>
    )

  }
}

export default withRouter(Navbar)