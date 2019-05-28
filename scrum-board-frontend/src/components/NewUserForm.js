//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Header } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';
//####### IMPORT MISC #######//
import { USERS_URL, HEADERBODY } from '../constants'
import '../styles/form.css';

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
    this.setState({ avatar: event.currentTarget.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    let loginInfo = this.state
    fetch(USERS_URL, {
      method: 'POST',
      headers: HEADERBODY,
      body: JSON.stringify({ user: loginInfo })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        username: '',
        password: '',
        avatar: ''
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
          Create an account
        </Header>
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
          <label className='avatar-label'>Select an avatar</label>
          <Form.Group id='radioGroup'>
            <label id='avatar'>
              <input
                id='option1'
                type='radio'
                value="option1"
                checked={this.state.avatar === 'option1'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option1'>
                <img src={option1} alt="option1" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option2'
                type='radio'
                value="option2"
                checked={this.state.avatar === 'option2'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option2'>
                <img src={option2} alt="option2" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option3'
                type='radio'
                value="option3"
                checked={this.state.avatar === 'option3'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option3'>
                <img src={option3} alt="option3" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option4'
                type='radio'
                value="option4"
                checked={this.state.avatar === 'option4'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option4'>
                <img src={option4} alt="option4" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option5'
                type='radio'
                value="option5"
                checked={this.state.avatar === 'option5'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option5'>
                <img src={option5} alt="option5" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option6'
                type='radio'
                value="option6"
                checked={this.state.avatar === 'option6'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option6'>
                <img src={option6} alt="option6" className='avatar-img' />
              </label>
            </label>
            <label id='avatar'>
              <input
                id='option7'
                type='radio'
                value="option7"
                checked={this.state.avatar === 'option7'}
                onChange={this.handleRadioChange}
              />
              <label htmlFor='option7'>
                <img src={option7} alt="option7" className='avatar-img' />
              </label>
            </label>
          </Form.Group>
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Form.Button>Create Account</Form.Button>
        </Form>

        <div onClick={this.props.switchForm} className='form-toggle-text'>
          Have an account already? Click here to log in
        </div>
      </>
    )
  }

}

export default NewUserForm;