//####### IMPORT PACKAGES #######//
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Confirm, Menu, Dropdown, Input, Icon } from 'semantic-ui-react';
//####### IMPORT MISC #######//
import '../styles/navbar.css';

class MenuBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openConfirmation: false
    }
  }

  // ############################# //
  // ####### PROJECTS VIEW ####### //
  // ############################# //

  handleAddProjectClick = () => {
    this.props.openNewProjectModal();
  }

  
  showProjectsBar() {
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item header>Projects</Menu.Item>
        <Menu.Item>
          <Dropdown multiple icon='filter'>
            <Dropdown.Menu>
              <Input icon='search' iconPosition='left' className='search' />
              <Dropdown.Divider />
              <Dropdown.Header icon='tags' content='Tag Label' />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown icon='search'>
            <Dropdown.Menu>
              <Input icon='search' placeholder='Search...' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item position='right' onClick={this.handleAddProjectClick}>
          <Icon name='add' />
          Add Project
        </Menu.Item>
      </Menu>
    )
  }

  // ############################ //
  // ####### PROJECT VIEW ####### //
  // ############################ //

  handleProjectEditClick = () => {
    this.props.openEditProjectModal();
  }

  showConfirmation = () => {
    this.setState({ openConfirmation: true })
  }

  handleConfirm = () => {
    this.setState({ openConfirmation: false })
    this.props.deleteProject(this.props.selectedProject);
    this.props.setShowPageToProjects();
  }

  handleCancel = () => {
    this.setState({ openConfirmation: false })
  }

  goBackToProjects = () => {
    this.props.setShowPageToProjects();
  }

  showProjectTitleBar() {
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item onClick={this.goBackToProjects}>
          <Icon name='chevron left' />
        </Menu.Item>
        <Menu.Item header>{this.props.selectedProject.name}</Menu.Item>
        <Menu.Item>{this.props.selectedProject.description}</Menu.Item>
        <Menu.Item position='right' onClick={this.handleProjectEditClick}>
          <Icon name='edit' />
        </Menu.Item>
        <Menu.Item onClick={this.showConfirmation}>
          <Icon name='trash alternate outline' />
        </Menu.Item>
        <Confirm open={this.state.openConfirmation} onCancel={this.handleCancel} onConfirm={this.handleConfirm} />
      </Menu>
    )
  }

  // ############################ //
  // ########## RENDER ########## //
  // ############################ //

  render() {
    let { selectedProject } = this.props
    return (
      <>
        {selectedProject === null ?
          this.showProjectsBar()
          : 
          this.showProjectTitleBar() 
        }
      </>

    )
  }

}

export default withRouter(MenuBar);