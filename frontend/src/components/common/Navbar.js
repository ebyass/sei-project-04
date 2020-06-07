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
    </nav>
  )

}

export default Navbar