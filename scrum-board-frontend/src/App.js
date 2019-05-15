import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FormContainer from './containers/FormContainer';

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

  login = user => {
    this.setState({
      currentUser: user,
      loggedIn: true
    })
  }

  render() {
    return (
      <Router>
        <div>
          App
          <Route exact path="/login" render={ props => <FormContainer
                                                           {...props}
                                                           loggedIn={this.state.loggedIn}
                                                           saveToken={this.saveToken}
                                                           login={this.login}
                                                         />}
          />
        </div>
      </Router>
    )
  }

}

export default App;
