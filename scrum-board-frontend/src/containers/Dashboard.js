//####### IMPORT PACKAGES #######//
import React from 'react';
//####### IMPORT COMPONENTS #######//
import Navbar from './Navbar';
import ProjectContainer from './ProjectContainer';
import MenuBar from '../components/MenuBar';
import CategoryContainer from './CategoryContainer';
import EditProjectForm from '../components/EditProjectForm';
//####### IMPORT MISC #######//
import '../styles/projects.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProject: null,
      editProjectShow: false
    }
  }

  setSelectedProject = (ev, project) => {
    this.setState({ selectedProject: project })
  }

  handleClick = () => {
    this.props.openNewProjectModal();
  }

  setShowPageToProjects = () => {
    this.setState({ selectedProject: null })
  }

  showProjectContainer() {
    return (
      <ProjectContainer
        getToken={this.props.getToken}
        setSelectedProject={this.setSelectedProject}
        currentUser={this.props.currentUser}
        projects={this.props.projects}
      />
    )
  }

  closeEditProjectModal = () => {
    this.setState({ editProjectShow: false })
  }

  openEditProjectModal = () => {
    this.setState({ editProjectShow: true })
  }
  
  showCategoryContainer() {
    return (
      <CategoryContainer
        project={this.state.selectedProject}
        getToken={this.props.getToken}
        currentUser={this.props.currentUser}
        users={this.props.users}
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
          openEditProjectModal={this.openEditProjectModal}
          selectedProject={this.state.selectedProject}
          deleteProject={this.props.deleteProject}
          setShowPageToProjects={this.setShowPageToProjects}
          project={this.state.selectedProject}
        />
        {this.state.selectedProject === null ?
          this.showProjectContainer()
          :
          this.showCategoryContainer()
        }
        {this.state.editProjectShow ?
          <EditProjectForm
            closeEditProjectModal={this.closeEditProjectModal}
            selectedProject={this.state.selectedProject}
            getToken={this.props.getToken}
            removeProjectFromState={this.props.removeProjectFromState}
            addNewProject={this.props.addNewProject}
            setSelectedProject={this.setSelectedProject}
          /> 
          : null
        }
      </>
    )
  }

}

export default Dashboard;