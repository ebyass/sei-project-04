import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import MusicIndex from './components/mediums/MusicIndex'
import Navbar from './components/common/Navbar'
import FilmIndex from './components/mediums/FilmIndex'
import ArtIndex from './components/mediums/ArtIndex'
import FilmShow from './components/mediums/FilmShow'
import ArtShow from './components/mediums/ArtShow'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mediums/:id" component={FilmShow} />
        <Route path="/mediums/:id" component={ArtShow} />
        <Route path="/film" component={FilmIndex} />
        <Route path="/art" component={ArtIndex} />
        <Route path="/music" component={MusicIndex} />
      

      </Switch>
    </BrowserRouter>
  )
}






export default App
