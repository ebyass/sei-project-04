import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import MusicIndex from './components/mediums/MusicIndex'
import Navbar from './components/common/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/music" component={MusicIndex} />
      </Switch>
    </BrowserRouter>
  )
}






export default App
