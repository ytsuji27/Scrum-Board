//####### IMPORT PACKAGES #######//
import React from 'react';
import { Form, Button, Icon, Menu, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import '../styles/tasks.css';
import { TASKS_URL } from '../constants';

class TaskDetailModal extends React.Component {

  editTask = () => {
    this.props.closeTaskDetailModal();
    this.props.showTaskEditModal();
  }

  deleteTask = () => {
    let token = this.props.getToken();
    fetch(TASKS_URL + `/${this.props.task.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => {
      this.props.removeTaskFromState(this.props.task)
    })
  }

  render() {
    let { assigned, category, content, user } = this.props.task

    return (
      <Modal
        open
        closeOnEscape
        closeOnDimmerClick
        onClose={this.props.closeTaskDetailModal}
        id='task-detail-modal'
        className='khaki custom-font'
      >
        <Modal.Header className='khaki' id='task-detail-header'>
          <Menu className='khaki' id='task-detail-menu'>
            <Menu.Item position='right' onClick={this.editTask}>
              <Icon name='edit' />
            </Menu.Item>
            <Menu.Item onClick={this.deleteTask}>
              <Icon name='trash alternate outline' />
            </Menu.Item>
          </Menu>
        </Modal.Header>
        <Modal.Content className='khaki'>
          <Modal.Description>
            <p>{content}</p>
            <p>Created by: {user.username}</p>
            <p>Assigned to: {assigned ? assigned.username : 'Nobody yet'}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }

}

export default TaskDetailModal;