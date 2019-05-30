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

  showProjects = () => {
    return (
      <Card.Group>
        {this.props.projects.map((project, index) => {
          return <ProjectCard 
          key={index} 
          project={project} 
          setSelectedProject={(ev) => this.props.setSelectedProject(ev, project)}
          />
        })}
      </Card.Group>
    )
  }

  render() {

    return (
      <>
        {this.props.projects.length === 0 ? null : this.showProjects()}
      </>
    )
  }

}

export default ProjectContainer;
