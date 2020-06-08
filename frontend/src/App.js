import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import MusicIndex from './components/mediums/MusicIndex'
import Navbar from './components/common/Navbar'
import FilmIndex from './components/mediums/FilmIndex'
import ArtIndex from './components/mediums/ArtIndex'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/music" component={MusicIndex} />
        <Route path="/film" component={FilmIndex} />
        <Route path="/art" component={ArtIndex} />

      </Switch>
    </BrowserRouter>
  )
}






export default App
