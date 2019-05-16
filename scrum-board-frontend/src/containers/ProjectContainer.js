//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import ProjectCard from '../components/ProjectCard';
//####### IMPORT MISC #######//
import { PROJECTS_URL } from '../constants.js'
import '../styles/projects.css';

class ProjectContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    let token = this.props.getToken();
      fetch(PROJECTS_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ projects: data })
      })
  }

  render() {
    return (
      <Card.Group>
        {this.state.projects.map((project, index) => {
          return <ProjectCard key={index} project={project} showProject={this.props.showProject}/>
        })}
      </Card.Group>
    )
  }

}

export default ProjectContainer;