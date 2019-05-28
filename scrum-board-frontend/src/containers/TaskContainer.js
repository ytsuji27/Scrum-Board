//####### IMPORT PACKAGES #######//
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
//####### IMPORT COMPONENTS #######//
import TaskCard from '../components/TaskCard';

class TaskContainer extends React.Component {

  showTasks = () => {
    return (
      <Droppable droppableId={this.props.category.id} type='task'>
        {(provided, snapshot) => (
          <div
            className='task-list'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.props.taskIds.map((taskId, index) => {
              const task = this.props.tasks.find(task => task.id === taskId);
              return <TaskCard 
                      task={task} 
                      index={index}
                      key={task.id} 
                      getToken={this.props.getToken}
                      addTaskToState={this.props.addTaskToState}
                      removeTaskFromState={this.props.removeTaskFromState}
                      users={this.props.users}
                      updateTaskInState={this.props.updateTaskInState}
                      removeTaskFromTaskIdsState={this.props.removeTaskFromTaskIdsState}
              />
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }

  render() {
    return (
      <>
        {/* {this.props.tasks.length !== 0 ? this.showTasks() : null} */}
        {this.showTasks()}
      </>
    )
  }

}

export default TaskContainer;