import React, { Component } from 'react'
import {Switch,HashRouter,Redirect} from 'react-router-dom'
import renderRoutes from '@utils/renderRoute.js'
import {noLayoutRoute,layoutRoute} from '@router'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Redirect from='/' to='/home' exact/>
          {renderRoutes(noLayoutRoute)(layoutRoute)}
        </Switch>
      </HashRouter>
    )
  }
}
export default App