//####### IMPORT PACKAGES #######//
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
//####### IMPORT COMPONENTS #######//
import FormContainer from './containers/FormContainer';
import Dashboard from './containers/Dashboard';
import history from './history';
//####### IMPORT MISC #######//
import './App.css';

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
    console.log("Log out!")
    this.setState({
      currentUser: null,
      loggedIn: false
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          App
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
                                                      getToken={this.state.getToken}
                                                      logout={this.logout}
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
