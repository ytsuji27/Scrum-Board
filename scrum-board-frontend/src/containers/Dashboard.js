//####### IMPORT PACKAGES #######//
import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import Navbar from './Navbar';
import ProjectContainer from './ProjectContainer';
import MenuBar from '../components/MenuBar';
import ProjectShowPage from '../containers/ProjectShowPage';
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

  handleClick = () => {
    this.props.openNewProjectModal();
  }

  showProjectContainer() {
    return (
      <ProjectContainer
      getToken={this.props.getToken}
      showProject={this.showProject}
      currentUser={this.props.currentUser}
      projects={this.props.projects}
    />
    )
  }

  render() {
    return (
      <>
        <Navbar
          logout={this.props.logout}
          currentUser={this.props.currentUser}
        />
        <MenuBar
          openNewProjectModal={this.props.openNewProjectModal}
          showPage={this.state.showPage}
        />
        {this.state.showPage === 'Projects' ?
          this.showProjectContainer()
          :
          <ProjectShowPage />
        }
      </>
    )
  }

}

export default Dashboard;