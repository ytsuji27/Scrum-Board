//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Header } from 'semantic-ui-react';
//####### IMPORT MISC #######//
import { LOGIN_URL, HEADERBODY } from '../constants.js'

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
      headers: HEADERBODY,
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
        <Header as='h2' textAlign='center'>
          Log in
        </Header>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          {/* <Form.Header>Log in</Form.Header> */}
          <Form.Input 
            label="Username"
            type="text" 
            name="username"
            placeholder="Username" 
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <Form.Input 
            label="Password"
            type="password" 
            name="password" 
            placeholder="Password"
            value={this.state.password} 
            onChange={this.handleChange}
            required
          />
          <Form.Button>Login</Form.Button>
        </Form>

        <div onClick={this.props.switchForm} className='form-toggle-text'>
          Don't have an account yet? Click here to create one
        </div>
      </>
    )
  }

}

export default LoginForm;