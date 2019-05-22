//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';

class ProjectCard extends React.Component {

  render() {
    let { name, description, user } = this.props.project;

    return (
      <div>
        <Card id="card" className='custom-font' onClick={this.props.setSelectedProject}>
          <Card.Content>
            <Card.Header className='custom-font'>{name}</Card.Header>
            <Card.Meta>Created by: {user.username}</Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default ProjectCard;