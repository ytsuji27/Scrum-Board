//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';
//####### IMPORT MISC #######//
import '../styles/tasks.css';

class TaskCard extends React.Component {

  render() {
    let { content, user } = this.props.task;

    return (
      <div>
        <Card id='task-card'>
          <Card.Content>
            <Card.Description>{content}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default TaskCard;