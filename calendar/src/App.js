import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import './sass/main.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Mainpage}></Route>
      </Switch>
    </Router>
  )
}

export default App
