import React from 'react'
import { Link  // , useLocation, useHistory 
} from 'react-router-dom'

function Navbar() {
  // const [navbarOpen, setNavbarOpen] = React.useState(false)
  // const { pathname } = useLocation()
  // const history = useHistory


  return (
    <nav>
      <Link to="/"><h1>Home</h1></Link>
      <Link to="/film"><h1>Film</h1></Link>
      <Link to="/art"><h1>Art</h1></Link>
      <Link to="/music"><h1>Music</h1></Link>
      <Link to="/register"><h1>Register</h1></Link>
      <Link to="/login"><h1>Login</h1></Link>
    </nav>
  )

}

export default Navbar