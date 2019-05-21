//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import { TASKS_URL, HEADERBODY } from '../constants'

class TaskEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.task.content
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  submitEdit = () => {
    this.props.editTask(this.state);
  }

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
                placeholder='Assign task (optional) [UNDER CONSTRUCTION]'
                fluid
                search
                selection
              />
              <Button color='blue' type='submit' onClick={this.submitEdit}>
                Edit
              </Button>
            </Form>
          </Modal.Content>
      </Modal>
    )
  }

}

export default TaskEditModal;

