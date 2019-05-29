//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import Navbar from './Navbar';
import ProjectContainer from './ProjectContainer';
import MenuBar from '../components/MenuBar';
import CategoryContainer from './CategoryContainer';
import EditProjectForm from '../components/EditProjectForm';
import Profile from './Profile';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';
//####### IMPORT MISC #######//
import '../styles/projects.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProject: null,
      editProjectShow: false,
      showProfilePage: false,
      showProjectsPage: true,
      showAddUserModal: false,
      pickableUsers: [],
      projectUsers: []
    }
  }

  setSelectedProject = (ev, project) => {
    let pickableUsers = this.setPickableUsers(project);
    let projectsusers = this.getUsersOnProject(pickableUsers);

    this.setState({ 
      selectedProject: project,
      editProjectShow: false,
      showProfilePage: false,
      showProjectsPage: false,
      pickableUsers: pickableUsers,
      projectUsers: projectsusers
    })
  }

  setPickableUsers = project => {
    let userIdsOnProject = [];
    this.props.userProjects.forEach(userProject => {
      if (userProject.project_id === project.id) {
        userIdsOnProject.push(userProject.user_id);
      }
    })
    // Filters out users that are already on the project
    let pickableUsers = this.props.users.filter(user => {
      if (!userIdsOnProject.includes(user.id)) {
        return user;
      }
    })
    // this.setState({ pickableUsers: pickableUsers })
    return pickableUsers;
  }

  getUsersOnProject = pickableUsers => {
    let users = this.props.users.filter(user => {
      if (!pickableUsers.includes(user)) {
        return user;
      }
    })
    return users;
  }

  handleClick = () => {
    this.props.openNewProjectModal();
  }

  setProfilePage = () => {
    this.setState({
      selectedProject: null,
      editProjectShow: false,
      showProfilePage: true,
      showProjectsPage: false
    })
  }

  setShowPageToProjects = () => {
    this.props.fetchProjects();
    this.setState({ 
      selectedProject: null,
      editProjectShow: false,
      showProfilePage: false,
      showProjectsPage: true,
      pickableUsers: [],
      projectUsers: []
    })
  }

  closeEditProjectModal = () => {
    this.setState({ editProjectShow: false })
  }
  
  openEditProjectModal = () => {
    this.setState({ editProjectShow: true })
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

  showCategoryContainer() {
    return (
      <CategoryContainer
        project={this.state.selectedProject}
        getToken={this.props.getToken}
        currentUser={this.props.currentUser}
        users={this.state.projectUsers}
      />
    )
  }

  showEditProjectForm() {
    return (
      <EditProjectForm
        closeEditProjectModal={this.closeEditProjectModal}
        selectedProject={this.state.selectedProject}
        getToken={this.props.getToken}
        removeProjectFromState={this.props.removeProjectFromState}
        addNewProject={this.props.addNewProject}
        setSelectedProject={this.setSelectedProject}
      /> 
    )
  }

  showProfilePage() {
    return (
      <Profile
        currentUser={this.props.currentUser}
        getToken={this.props.getToken}
        allOfUsersProjects={this.props.allOfUsersProjects}
        setSelectedProject={this.setSelectedProject}
      />
    )
  }
  
  closeAddUserModal = () => {
    this.setState({ showAddUserModal: false })
  }

  openAddUserModal = () => {
    this.setState({ showAddUserModal: true })
  }

  postUserProject = ev => {
    let choice = ev.currentTarget.parentElement.firstElementChild.innerText;
    let user = this.props.users.find(user => user.username === choice);
    this.props.postToProjectUsers(this.state.selectedProject, user);
    let newProjectUsers = [...this.state.projectUsers, user]
    this.setState({ projectUsers: newProjectUsers })
    this.closeAddUserModal();
  }

  createOptionsForDropdown = () => {
    // Final options array. Include blank as option
    let options = [];
    // Lookup table to associate avatar str in user w/ pic
    let avatarChoice = {
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
      'option5': option5,
      'option6': option6,
      'option7': option7,
    }

    // Map over users and create objects for dropdown
    this.state.pickableUsers.map(user => {
      let avatarPic = avatarChoice[user.avatar]
      let userObj = {
        key: user.username,
        text: user.username,
        value: user.id,
        image: { avatar: true, src: avatarPic }
      }
      return options.push(userObj);
    })
    return options;
  }

  showAddUserModal() {
    return (
      <Modal
        open
        closeOnEscape
        closeOnDimmerClick
        onClose={this.closeAddUserModal}
        id='add-user-modal'
      >
        <Modal.Header>Add a User to this project</Modal.Header>
        <Modal.Content>
            <Dropdown
              placeholder='Add a user'
              fluid
              search
              selection
              options={this.createOptionsForDropdown()}
            />
            <Button id='add-user-button' color='blue' type='submit' onClick={this.postUserProject}>
              Create
            </Button>
        </Modal.Content>
      </Modal>
    )
  }

  render() {
    return (
      <>
        <Navbar
          logout={this.props.logout}
          currentUser={this.props.currentUser}
          setProfilePage={this.setProfilePage}
        />
        <MenuBar
          openNewProjectModal={this.props.openNewProjectModal}
          openEditProjectModal={this.openEditProjectModal}
          selectedProject={this.state.selectedProject}
          deleteProject={this.props.deleteProject}
          setShowPageToProjects={this.setShowPageToProjects}
          project={this.state.selectedProject}
          showProjectsPage={this.state.showProjectsPage}
          showProfilePage={this.state.showProfilePage}
          postToProjectUsers={this.props.postToProjectUsers}
          openAddUserModal={this.openAddUserModal}
          usersOnProject={this.state.projectUsers}
          currentUser={this.props.currentUser}
        />
        {/* CONDITIONALLY RENDER PAGES */}
        {/* Show Project page */}
        {this.state.selectedProject !== null ? this.showCategoryContainer() : null}
        {/* Show Projects page */}
        {this.state.showProjectsPage ? this.showProjectContainer() : null} 
        {/* Show Profile page */}
        {this.state.showProfilePage ? this.showProfilePage() : null}
        {/* Show Edit Project Form */}
        {this.state.editProjectShow ? this.showEditProjectForm() : null}
        {/* Show Add User Modal */}
        {this.state.showAddUserModal ? this.showAddUserModal() : null}
      </>
    )
  }

}

export default Dashboard;