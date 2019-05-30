//####### IMPORT PACKAGES #######//
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Confirm, Menu, Dropdown, Input, Icon, Image, Popup } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';
//####### IMPORT MISC #######//
import '../styles/navbar.css';

let avatarChoice = {
  'option1': option1,
  'option2': option2,
  'option3': option3,
  'option4': option4,
  'option5': option5,
  'option6': option6,
  'option7': option7,
}

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
              <Input icon='search' iconPosition='left' className='search' placeholder='[Under construction]'/>
              <Dropdown.Divider />
              <Dropdown.Header icon='tags' content='Tag Label' />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown icon='search'>
            <Dropdown.Menu>
              <Input icon='search' placeholder='[Under construction]' />
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

  handleAddUser = () => {
    this.props.openAddUserModal();
  }

  setId() {
    if (this.props.usersOnProject.length > 1) {
      return 'project-avatar';
    }
  }

  // Only shows edit and delete function if user created project
  showProjectControl = () => {
    return (
      <>
        <Menu.Item onClick={this.handleProjectEditClick}>
          <Icon name='edit' />
        </Menu.Item>
        <Menu.Item onClick={this.showConfirmation}>
          <Icon name='trash alternate outline' />
        </Menu.Item>
      </>
    )
  }

  showProjectTitleBar() {
    
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item onClick={this.goBackToProjects}>
          <Icon name='chevron left' />
        </Menu.Item>
        <Menu.Item header>{this.props.selectedProject.name}</Menu.Item>
        <Menu.Item>{this.props.selectedProject.description}</Menu.Item>

        <Menu.Item id='avatar-container'>
          {this.props.usersOnProject.map(user => (
            <Popup
            key={user.id}
            content={user.username}
            trigger={<Image src={avatarChoice[user.avatar]} avatar id={this.setId()} />}
            />
            ))}
        </Menu.Item>

        <Menu.Item position='right' onClick={this.handleAddUser}>
          <Icon name='user plus'/>
        </Menu.Item>
        
        {this.props.currentUser.id === this.props.selectedProject.user.id ? 
          this.showProjectControl()
        :
          null
        }
        
        <Confirm 
          open={this.state.openConfirmation} 
          onCancel={this.handleCancel} 
          onConfirm={this.handleConfirm} 
          content='Are you sure? All columns and tasks will be deleted'
        />
      </Menu>
    )
  }

  // ############################ //
  // ####### PROFILE VIEW ####### //
  // ############################ //

  showProfileTitleBar() {
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item onClick={this.goBackToProjects}>
          <Icon name='chevron left' />
        </Menu.Item>
        <Menu.Item header>Profile</Menu.Item>
      </Menu>
    )
  }

  // ############################ //
  // ########## RENDER ########## //
  // ############################ //

  render() {
    let { selectedProject, showProjectsPage, showProfilePage } = this.props
    return (
      <>
        {/* CONDITIONALLY RENDER PAGE */}
        {/* Show Projects Bar */}
        {showProjectsPage ? this.showProjectsBar() : null}
        {/* Show Project Page */}
        {selectedProject !== null ? this.showProjectTitleBar() : null}
        {/* Show Profile page */}
        {showProfilePage ? this.showProfileTitleBar() : null}
      </>

    )
  }

}

export default withRouter(MenuBar);