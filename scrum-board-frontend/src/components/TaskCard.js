//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import TaskDetailModal from './TaskDetailModal';
import TaskEditModal from './TaskEditModal';
//####### IMPORT MISC #######//
import { HEADERBODY, TASKS_URL } from '../constants';
import '../styles/tasks.css';

class TaskCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTaskDetailModal: false,
      showTaskEditModal: false
    }
  }

  // ########################### //
  // ###### FETCH STUFF ######## //
  // ########################### //
  editTask = body => {
    this.closeTaskEditModal();
    let token = this.props.getToken();
    fetch(TASKS_URL + `/${this.props.task.id}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.props.removeTaskFromState(this.props.task)
      this.props.addTaskToState(data)
    })
  }

  // ########################### //
  // ###### MODAL STUFF ######## //
  // ########################### //
  showTaskDetailModal = () => {
    this.setState({ showTaskDetailModal: true })
  }

  closeTaskDetailModal = () => {
    this.setState({ showTaskDetailModal: false })
  }

  showTaskEditModal = () => {
    this.setState({ showTaskEditModal: true })
  }

  closeTaskEditModal = () => {
    this.setState({ showTaskEditModal: false })
  }

  // ########################### //
  // ######### RENDER ########## //
  // ########################### //
  render() {
    let { content, user } = this.props.task;

    return (
      <div>
        <Card id='task-card' className='custom-font' onClick={this.showTaskDetailModal}>
          <Card.Content>
            <Card.Description>{content}</Card.Description>
          </Card.Content>
        </Card>

        {this.state.showTaskDetailModal === true ?
          <TaskDetailModal
            closeTaskDetailModal={this.closeTaskDetailModal}
            task={this.props.task}
            getToken={this.props.getToken}
            removeTaskFromState={this.props.removeTaskFromState}
            showTaskEditModal={this.showTaskEditModal}
          />
        :
          null
        }

        {this.state.showTaskEditModal === true ?
          <TaskEditModal
            closeTaskEditModal={this.closeTaskEditModal}
            editTask={this.editTask}
            task={this.props.task}
          />
        :
          null
        }
      </div>
    )
  }
}

export default TaskCard;