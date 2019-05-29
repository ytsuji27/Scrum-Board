//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
// import { TASKS_URL, HEADERBODY } from '../constants'
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';

class TaskEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.task.content,
      assigned_id: this.props.task.assigned_id
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  submitEdit = () => {
    this.props.editTask(this.state);
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
    } else {
      this.setState({ assigned_id: null })
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
        onClose={this.props.closeTaskEditModal}
        id='task-edit-modal'
        className='khaki'
      >
        <Modal.Content>
            <Form>
              <div className='required field'>
                <label htmlFor='new-task-modal-content'>Content</label>
                <textarea
                  label='Content'
                  type='text'
                  name='content'
                  placeholder='content'
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
                value={this.state.assigned_id}
              />
              <Button id='task-button' color='blue' type='submit' onClick={this.submitEdit}>
                Edit
              </Button>
            </Form>
          </Modal.Content>
      </Modal>
    )
  }

}

export default TaskEditModal;

