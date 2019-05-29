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

  getProjects = () => {
    let projectIds = [];
    this.state.tasks.forEach(task => {
      if (projectIds.includes(task.project_id)) {

      }
    })
  }

  showProjectCards = () => {
    return this.props.allOfUsersProjects.map(project => {
      return this.projectCard(project);
    })
  }

  projectCard = project => {
    return (
      <Card className='project-card custom-font' key={project.id}>
        <Card.Content className='profile-page-project-card-header' onClick={(ev) => this.props.setSelectedProject(ev, project)}>
          <Card.Header className='custom-font'>{project.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          {this.state.tasks.length !== 0 ? null : 'No tasks assigned yet'}
          {this.state.tasks.map(task => {
            return this.taskCard(task, project)
          })}
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

  noProjectsMessage = () => {
    return (
      <Header as='h4' className='profile-page-message'>
        You're not on any projects yet
      </Header>
    )
  }

  render() {
    const { avatar, username } = this.props.currentUser;
    
    return (
      <>
        <Header as='h2' className='profile-header'>
          <Image src={this.getAvatar(avatar)} />
          Username: {username}
        </Header>

        <Header as='h3' className='profile-header'>
          Here are all the projects you are on and tasks assigned to you
        </Header>
        {this.props.allOfUsersProjects.length !== 0 ? 
          this.showProjectCards() : 
          this.noProjectsMessage()
        }
        
      </>
    )
  }

}

export default Profile;