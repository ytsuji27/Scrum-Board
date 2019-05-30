//####### IMPORT PACKAGES #######//
import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';
//####### IMPORT MISC #######//
import '../styles/profilepage.css';
import { TASKS_URL } from '../constants';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  getAvatar = avatar => {
    let avatarChoice = {
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
      'option5': option5,
      'option6': option6,
      'option7': option7,
    }
    return avatarChoice[avatar];
  }

  // ########################### //
  // ####### F E T C H ######### //
  // ########################### //

  fetchTasksForUser() {
    let token = this.props.getToken();
    fetch(TASKS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ tasks: data }))
  }

  componentDidMount() {
    this.fetchTasksForUser();
  }

  // ################################################# //
  filterTasks = project => {
    return this.state.tasks.filter(task => {
      return task.project_id === project.id
    })
  }

  showProjectCards = () => {
    return this.props.allOfUsersProjects.map(project => {
      return this.projectCard(project);
    })
  }

  displayTasksForProject = project => {
    let tasks = this.filterTasks(project);
    if (tasks.length === 0) {
      return this.noTaskMessage();
    } else {
      return tasks.map(task => this.taskCard(task, project))
    }
  }

  projectCard = project => {
    return (
      <Card className='project-card custom-font' key={project.id}>
        <Card.Content className='profile-page-project-card-header' onClick={(ev) => this.props.setSelectedProject(ev, project)}>
          <Card.Header className='custom-font'>{project.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          {this.displayTasksForProject(project)}
        </Card.Content>
      </Card>
    )
  }

  taskCard = (task, project) => {
    if (task.project_id === project.id) {
      return (
        <Card id='profile-page-task-card' className='custom-font' key={task.id}>
          <Card.Content>
            {task.content}
          </Card.Content>
        </Card>
      )
    }
  }

  // ########################### //
  // ######## MESSAGES ######### //
  // ########################### //

  noTaskMessage = () => {
    return (
      <Header as='h5' className='custom-font'>
        No tasks assigned yet
      </Header>
    )
  }

  noProjectsMessage = () => {
    return (
      <Header as='h4' className='profile-page-message'>
        You're not on any projects yet
      </Header>
    )
  }

  // ########################### //
  // ####### R E N D E R ####### //
  // ########################### //

  render() {
    const { avatar, username } = this.props.currentUser;
    
    return (
      <>
        <Header as='h2' className='profile-header'>
          <Image src={this.getAvatar(avatar)} />
          Username: {username}
        </Header>

        <Header as='h3' className='profile-header-h3'>
          Here are all the projects you are on and tasks assigned to you
        </Header>
        <p className='profile-text'>Clicking on a project will take you to that project</p>
        {this.props.allOfUsersProjects.length !== 0 ? 
          this.showProjectCards() : 
          this.noProjectsMessage()
        }
        
      </>
    )
  }

}

export default Profile;