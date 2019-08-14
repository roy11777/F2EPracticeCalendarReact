import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import './sass/main.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = { destroy: false }
  }
  // 在index註冊calender在window下面，可在console畫面window.destroy觸發
  destroy = () => {
    this.setState({ destroy: !this.state.destroy })
    console.log('destroy')
  }
  render() {
    return this.state.destroy ? (
      <></>
    ) : (
      <>
        <Router>
          <Switch>
            <Route path="/" component={Mainpage}></Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
