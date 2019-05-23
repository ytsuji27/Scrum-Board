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
      content: '',
      assigned_id: null
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  // ########################### //
  // ########## FETCH ########## //
  // ########################### //
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
        content: '',
        assigned_id: null
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

  // ########################### //
  // ######## DROPDOWN ######### //
  // ########################### //
  handleAssignedChange = ev => {
    let selectedUsername = ev.currentTarget.children[1].innerText;
    if (selectedUsername !== '(Nobody)') {
      let selectedUser = this.props.users.find(user => {
        return user.username === selectedUsername
      })
      this.setState({ assigned_id: selectedUser.id })
    }
  }

  createOptionsForDropdown = () => {
    // Final options array. Include blank as option
    let options = [
      {
        key: null,
        text: '(Nobody)',
        value: null,
        image: { avatar: false }
      }
    ];
    // Lookup table to associate avatar str in user w/ pic
    let avatarChoice = {
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
      'option5': option5,
      'option6': option6,
      'option7': option7,
    }
    // Map over users and create objects for dropdown
    this.props.users.map(user => {
      let avatarPic = avatarChoice[user.avatar]
      let userObj = {
        key: user.username,
        text: user.username,
        value: user.id,
        image: { avatar: true, src: avatarPic }
      }
      return options.push(userObj);
    })
    return options;
  }

  // ########################### //
  // ######### RENDER ########## //
  // ########################### //
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
              placeholder='Assign task (optional)'
              fluid
              search
              selection
              options={this.createOptionsForDropdown()}
              onChange={this.handleAssignedChange}
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