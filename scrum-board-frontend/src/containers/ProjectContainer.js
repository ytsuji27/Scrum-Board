//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import ProjectCard from '../components/ProjectCard';
//####### IMPORT MISC #######//
import '../styles/projects.css';

class ProjectContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <Card.Group>
        {this.props.projects.map((project, index) => {
          return <ProjectCard key={index} project={project} showProject={this.props.showProject}/>
        })}
      </Card.Group>
    )
  }

}

export default ProjectContainer;
