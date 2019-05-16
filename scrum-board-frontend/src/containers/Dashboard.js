//####### IMPORT PACKAGES #######//
import React from 'react';
import { Header } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import Navbar from './Navbar';
import ProjectContainer from './ProjectContainer';
import '../styles/projects.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPage: 'Projects'
    }
  }

  showProject = ev => {
    let selectedProject = ev.currentTarget.firstElementChild.firstElementChild.textContent
    this.setState({ showPage: selectedProject })
  }

  render() {

    return (
      <>
        <Navbar
          logout={this.props.logout}
        />
        <Header id='header' as='h1'>Projects</Header>
        <ProjectContainer
          getToken={this.props.getToken}
          showProject={this.showProject}
          currentUser={this.props.currentUser}
        />
      </>
    )
  }

}

export default Dashboard;