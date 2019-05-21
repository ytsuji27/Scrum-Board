//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Button, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import '../styles/form.css';
import { PROJECTS_URL, HEADERBODY } from '../constants'

class EditProjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.selectedProject.name,
      description: this.props.selectedProject.description
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  editProject = () => {
    // let currentuser = this.props.currentUser.id;
    // let body = {...this.state, user_id: currentuser};
    let token = this.props.getToken();
    fetch(PROJECTS_URL + `/${this.props.selectedProject.id}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        name: '',
        description: ''
      })
      this.handleResponse(data);
    })
  }

  handleResponse = data => {
    if (data.message) {
      alert(data.message)
    } else {
      this.props.closeEditProjectModal();
      this.props.removeProjectFromState(data);
      this.props.addNewProject(data);
    }
    console.log(data);
  }






  render() {
    return (
      <Modal
        open
        closeOnEscape
        closeOnDimmerClick
        onClose={this.props.closeEditProjectModal}
        id='new-project-modal'
      >
        <Modal.Header>Edit Project</Modal.Header>
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
            <Button color='blue' type='submit' onClick={this.editProject}>
              Save
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}

EditProjectForm.defaultProps = {
  selectedProject: { name: '', description: '' }
};

export default EditProjectForm;
