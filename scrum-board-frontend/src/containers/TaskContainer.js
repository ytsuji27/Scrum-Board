//####### IMPORT PACKAGES #######//
import React from 'react';
//####### IMPORT COMPONENTS #######//
import TaskCard from '../components/TaskCard';

class TaskContainer extends React.Component {

  showTasks = () => {
    return this.props.tasks.map((task, index) => {
      return <TaskCard task={task} key={index} />
    })
  }

  render() {
    return (
      <>
        {this.props.tasks.length !== 0 ? this.showTasks() : null}
      </>
    )
  }

}

export default TaskContainer;