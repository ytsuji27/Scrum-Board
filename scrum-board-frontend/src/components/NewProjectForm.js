//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Button, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import '../styles/form.css';
import { PROJECTS_URL, HEADERBODY } from '../constants'

class NewProjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      columnOrder: []
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  postProject = () => {
    let currentuser = this.props.currentUser.id;
    let body = {...this.state, user_id: currentuser};
    let token = this.props.getToken();
    fetch(PROJECTS_URL, {
      method: 'POST',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        name: '',
        description: '',
        columnOrder: []
      })
      this.handleResponse(data);
      this.props.postToProjectUsers(data, this.props.currentUser);
    })
  }

  handleResponse = data => {
    if (data.message) {
      alert(data.message)
    } else {
      this.props.closeNewProjectModal();
      this.props.addNewProject(data);
    }
  }

  render() {
    return (
      <Modal
        open
        closeOnEscape
        closeOnDimmerClick
        onClose={this.props.closeNewProjectModal}
        id='new-project-modal'
      >
        <Modal.Header>Create a new Project</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='Name'
              type='text'
              name='name'
              placeholder='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <div className='required field'>
              <label htmlFor='new-project-modal-description'>Description</label>
              <textarea
                label='Description'
                type='text'
                name='description'
                placeholder='description'
                value={this.state.description}
                onChange={this.handleChange}
                id='new-project-modal-description'
                className='ui input'
                required
              />
            </div>
            <Button color='blue' type='submit' onClick={this.postProject}>
              Create
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}

export default NewProjectForm;
