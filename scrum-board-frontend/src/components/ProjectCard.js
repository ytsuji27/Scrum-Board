//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';

class ProjectCard extends React.Component {

  render() {
    let { name, description, user } = this.props.project;

    return (
      <div>
        <Card id="card" onClick={this.props.showProject}>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>Created by: {user.username}</Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default ProjectCard;