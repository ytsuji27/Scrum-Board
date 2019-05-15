//####### IMPORT PACKAGES #######//
import React from 'react';

const LOGIN_URL = 'http://localhost:3000/api/v1/login';

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let loginInfo = this.state
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user: loginInfo })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        username: "",
        password: ""
      })
      this.handleResponse(data);
    })
  }

  handleResponse = data => {
    if (data.message) {
      alert(data.message)
    } else {
      this.props.saveToken(data.jwt)
      this.props.setCurrentUser(data.user)
    }
  }

  render() {
    return (
      <>
        Login Form
        <form onSubmit={this.handleSubmit}>
          <input
            type="text" 
            name="username" 
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input 
            type="password" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>

        <button onClick={this.props.switchForm}>
          Don't have an account yet? Click here to create one
        </button>
      </>
    )
  }

}

export default LoginForm;