//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import { TASKS_URL, HEADERBODY } from '../constants'
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';

class NewTaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  postTask = () => {
    let { currentUser, currentProject, currentCategory } = this.props;

    let body = {...this.state, 
                 user_id: currentUser.id,
                 project_id: currentProject.id,
                 category_id: currentCategory.id
               };
    let token = this.props.getToken();
    fetch(TASKS_URL, {
      method: 'POST',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        content: ''
      })
      this.handleResponse(data);
    })
  }

  handleResponse = data => {
    if (data.message) {
      alert(data.message)
    } else {
      this.props.closeNewTaskModal();
      this.props.addTaskToState(data);
    }
  }

  // createOptionsForDropdown = () => {
  //   let options = [];
  //   this.props.users.map(user => {
  //     let userObj = {

  //     }
  //   })
  // }

  render() {
    return (
      <Modal
        open
        closeOnEscape
        closeOnDimmerClick
        onClose={this.props.closeNewTaskModal}
        id='new-task-modal'
      >
        <Modal.Header>Create a new Task</Modal.Header>
        <Modal.Content>
          <Form>
            <div className='required field'>
              <label htmlFor='new-task-modal-content'>Content</label>
              <textarea
                label='Content'
                type='text'
                name='content'
                placeholder='Content'
                value={this.state.content}
                onChange={this.handleChange}
                id='new-task-modal-content'
                className='ui input'
                required
              />
            </div>
            <Dropdown
              placeholder='Assign task (optional) [UNDER CONSTRUCTION]'
              fluid
              search
              selection
              options={this.props.users}
            />
            <Button color='blue' type='submit' onClick={this.postTask}>
              Create
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}

export default NewTaskForm;