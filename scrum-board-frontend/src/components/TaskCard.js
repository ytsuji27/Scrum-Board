//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card, Image, Label, Popup } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
//####### IMPORT COMPONENTS #######//
import TaskDetailModal from './TaskDetailModal';
import TaskEditModal from './TaskEditModal';
//####### IMPORT MISC #######//
import { HEADERBODY, TASKS_URL } from '../constants';
import '../styles/tasks.css';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';

let avatarChoice = {
  'option1': option1,
  'option2': option2,
  'option3': option3,
  'option4': option4,
  'option5': option5,
  'option6': option6,
  'option7': option7,
}

class TaskCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTaskDetailModal: false,
      showTaskEditModal: false
    }
  }

  getUser = id => {
    let foundUser = this.props.users.find(user => {
      return user.id === id
    })
    return foundUser
  }

  getAvatar = () => {
    let foundUser = this.getUser(this.props.task.assigned_id)
    return avatarChoice[foundUser.avatar];
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
      this.props.updateTaskInState(data)
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
    let { id, content, assigned_id } = this.props.task;

    return (
      <div>
        <Draggable draggableId={id} index={this.props.index}>
          {provided => (
            <div
              className='dnd-container'
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Card 
                id='task-card' 
                className='custom-font' 
                onClick={this.showTaskDetailModal}
              >
                {/* Add label if task is assigned */}
                {assigned_id ? 
                  <Popup
                    id='task-avatar-popup'
                    header={this.getUser(assigned_id).username}
                    key={assigned_id}
                    size='mini'
                    trigger={
                      <Label floating circular id='task-card-avatar'>
                        <Image avatar src={this.getAvatar()} /> 
                      </Label> 
                    }
                  />
                : 
                  null
                }

                <Card.Content className='task-content-wrapper'>
                  <Card.Description className='task-content'>{content}</Card.Description>
                </Card.Content>
              </Card>
            </div>
          )}
        </Draggable>

        {this.state.showTaskDetailModal === true ?
          <TaskDetailModal
            closeTaskDetailModal={this.closeTaskDetailModal}
            task={this.props.task}
            getToken={this.props.getToken}
            removeTaskFromState={this.props.removeTaskFromState}
            showTaskEditModal={this.showTaskEditModal}
            removeTaskFromTaskIdsState={this.props.removeTaskFromTaskIdsState}
          />
        :
          null
        }

        {this.state.showTaskEditModal === true ?
          <TaskEditModal
            closeTaskEditModal={this.closeTaskEditModal}
            editTask={this.editTask}
            task={this.props.task}
            users={this.props.users}
          />
        :
          null
        }
      </div>
    )
  }
}

export default TaskCard;