//####### IMPORT PACKAGES #######//
import React from 'react';
import { Confirm, Icon, Menu, Modal } from "semantic-ui-react";
//####### IMPORT MISC #######//
import '../styles/tasks.css';
import { TASKS_URL } from '../constants';

class TaskDetailModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openConfirmation: false
    }
  }

  // ########################### //
  // ####### CONFIRMATION ###### //
  // ########################### //

  showConfirmation = () => {
    this.setState({ openConfirmation: true })
  }

  handleCancel = () => {
    this.setState({ openConfirmation: false })
  }

  handleConfirm = () => {
    this.setState({ openConfirmation: false })
    this.deleteTask();
  }

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
      this.props.removeTaskFromTaskIdsState(this.props.task, this.props.task.category)
      this.props.closeTaskDetailModal();
      this.props.removeTaskFromState(this.props.task)
    })
  }

  // ########################### //
  // ########## RENDER ######### //
  // ########################### //

  render() {
    let { assigned, content, user } = this.props.task

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
            <Menu.Item onClick={this.showConfirmation}>
              <Icon name='trash alternate outline' />
            </Menu.Item>
          </Menu>
        </Modal.Header>
        <Modal.Content className='khaki task-detail-container'>
          <Modal.Description className='task-detail-description'>
            <p className='task-detail-descrition-content'>{content}</p>
            <p className='task-detail-descrition-creator'>Created by: {user.username}</p>
            <p className='task-detail-descrition-assigned'>Assigned to: {assigned ? assigned.username : 'Nobody yet'}</p>
          </Modal.Description>
        </Modal.Content>
        <Confirm 
          open={this.state.openConfirmation} 
          onCancel={this.handleCancel} 
          onConfirm={this.handleConfirm} 
          content='Are you sure?'
        />
      </Modal>
    )
  }

}

export default TaskDetailModal;