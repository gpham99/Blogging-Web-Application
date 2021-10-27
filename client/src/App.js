import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar.jsx';
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'

// Redux
import {Provider} from 'react-redux'
import store from './store'

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

// bring in the dashboard
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

// an attempt to bring in the personal profile
import EditProfile from './components/layout/EditProfile'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []) // runs an effect and clean it only once on mount & unmount, you can use empty dependency arr


  return (
    <Provider store={store}>
        <div className="App">
          <Router>
            <NavBar></NavBar>

            <section className="container">
              <Switch>
                <Route exact path='/' component={LogIn}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/login' component={LogIn}/>
                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              </Switch>
            </section>
          </Router>
        </div>
    </Provider>
  );
}

export default App;