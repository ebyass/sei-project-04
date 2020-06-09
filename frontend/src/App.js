import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ErrorPage from './components/common/Error'
import FilmIndex from './components/mediums/FilmIndex'
import ArtIndex from './components/mediums/ArtIndex'
import MusicIndex from './components/mediums/MusicIndex'
import MediumShow from './components/mediums/MediumShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

console.log('%cThis app was built by Eleanor & Yarden, check us out on github:', 'color:#C8A2C8;font-size:20px;font-weight:bold')
console.log('%cEleanor: github.com/ebyass \nYarden: github.com/YBL123', 'color:#8BD6BB;font-size:16px')

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mediums/:id" component={MediumShow} />
        <Route path="/film" component={FilmIndex} />
        <Route path="/art" component={ArtIndex} />
        <Route path="/music" component={MusicIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}






export default App
