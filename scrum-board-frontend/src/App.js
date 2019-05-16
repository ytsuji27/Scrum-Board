//####### IMPORT PACKAGES #######//
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
//####### IMPORT COMPONENTS #######//
import FormContainer from './containers/FormContainer';
import Dashboard from './containers/Dashboard';
import history from './history';
//####### IMPORT MISC #######//
import './App.css';
import { PROFILE_URL } from './constants'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      loggedIn: false
    }
  }

  getToken() {
    let token = localStorage.getItem('jwt');
    return token
  }

  saveToken(jwt) {
    return localStorage.setItem('jwt', jwt)
  }

  setCurrentUser = user => {
    this.setState({
      currentUser: user,
      loggedIn: true
    })
    // Redirects user to dashboard after successful login
    history.push('/');
  }

  logout = () => {
    this.setState({
      currentUser: null,
      loggedIn: false
    })
    localStorage.removeItem('jwt')
  }

  // Automatically sends user to dashboard if a token is found in local storage
  componentDidMount() {
    if (this.getToken()) {
      let token = this.getToken();
      fetch(PROFILE_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => this.setCurrentUser(data.user))
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/login" render={ props => <FormContainer
                                                           {...props}
                                                           loggedIn={this.state.loggedIn}
                                                           saveToken={this.saveToken}
                                                           setCurrentUser={this.setCurrentUser}
                                                       />
                                            }
          />
          <Route exact path="/" render={ props => (!this.state.loggedIn ? (
                                                    <Redirect to='/login' />
                                                  ) : (
                                                    <Dashboard
                                                      {...props}
                                                      loggedIn={this.state.loggedIn}
                                                      getToken={this.getToken}
                                                      logout={this.logout}
                                                      currentUser={this.state.currentUser}
                                                    />
                                                  ))
                                        } 
          />
        </div>
      </Router>
    )
  }

}

export default App;
