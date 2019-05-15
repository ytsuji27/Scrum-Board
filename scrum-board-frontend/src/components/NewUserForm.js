//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';

const CREATE_USER_URL = 'http://localhost:3000/api/v1/users'

class NewUserForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      avatar: 'option1'
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioChange = event => {
    this.setState({ avatar: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    let loginInfo = this.state
    fetch(CREATE_USER_URL, {
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
        username: '',
        password: '',
        avatar: ''
      })
      console.log(data)
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
        New User Form
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Group>
            <label>Select an avatar</label>
            <Form.Radio
              label="Option 1"
              value="option1"
              checked={this.state.avatar === 'option1'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 2"
              value="option2"
              checked={this.state.avatar === 'option2'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 3"
              value="option3"
              checked={this.state.avatar === 'option3'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 4"
              value="option4"
              checked={this.state.avatar === 'option4'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 5"
              value="option5"
              checked={this.state.avatar === 'option5'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 6"
              value="option6"
              checked={this.state.avatar === 'option6'}
              onChange={this.handleRadioChange}
            />
            <Form.Radio
              label="Option 7"
              value="option7"
              checked={this.state.avatar === 'option7'}
              onChange={this.handleRadioChange}
            />
          </Form.Group>
          <Button>Create Account</Button>
        </Form>

        <Button onClick={this.props.switchForm}>
          Have an account already? Click here to log in
        </Button>
      </>
    )
  }

}

export default NewUserForm;