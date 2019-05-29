//####### IMPORT PACKAGES #######//
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
//####### IMPORT COMPONENTS #######//
import FormContainer from './containers/FormContainer';
import Dashboard from './containers/Dashboard';
import history from './history';
import NewProjectForm from './components/NewProjectForm';
//####### IMPORT MISC #######//
import './App.css';
import { HEADERBODY, PROFILE_URL, PROJECTS_URL, USERS_URL, USERPROJECTS_URL } from './constants'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      loggedIn: false,
      newProjectShow: false,
      allProjects: [],
      users: [],
      userProjects: [],
      allOfUsersProjects: []
    }
  }

  // ########################### //
  // ####### LOGIN STUFF ####### //
  // ########################### //
  getToken() {
    let token = localStorage.getItem('jwt');
    return token
  }

  saveToken(jwt) {
    return localStorage.setItem('jwt', jwt)
  }

  setCurrentUser = user => {
    this.setState({
      currentUser: user,
      loggedIn: true
    })
    this.fetchUsers();
    this.comboFetch();
    // Redirects user to dashboard after successful login
    history.push('/');
  }

  logout = () => {
    this.setState({
      currentUser: null,
      loggedIn: false,
      newProjectShow: false,
      allProjects: [],
      users: [],
      userProjects: [],
      allOfUsersProjects: []
    })
    localStorage.removeItem('jwt')
  }

  // Automatically sends user to dashboard if a token is found in local storage
  componentDidMount() {
    if (this.getToken()) {
      this.fetchProfile();
      this.fetchUsers();
      this.comboFetch();
    }
  }
  
  comboFetch = () => {
    let token = this.getToken();
    Promise.all([
      fetch(PROJECTS_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      fetch(USERPROJECTS_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => {
      let projects = data2.filter(userproject => {
        return userproject.user_id === this.state.currentUser.id;
      })
      let finalProjects = projects.map(project => {
        return data1.find(stateProject => stateProject.id === project.project_id)
      })
      this.setState({ allProjects: data1, userProjects: data2, allOfUsersProjects: finalProjects })
    })
  }
  // ########################### //
  // ####### MODAL STUFF ####### //
  // ########################### //
  closeNewProjectModal = () => {
    this.setState({ newProjectShow: false })
  }

  openNewProjectModal = () => {
    this.setState({ newProjectShow: true })
  }
  
  // ########################### //
  // ####### FETCH STUFF ####### //
  // ########################### //

  fetchProjects = () => {
    let token = this.getToken();
    fetch(PROJECTS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      let projects = this.state.userProjects.filter(userproject => {
        return userproject.user_id === this.state.currentUser.id;
      })
      let finalProjects = projects.map(project => {
        return data.find(stateProject => stateProject.id === project.project_id)
      })
      
      this.setState({ allProjects: data, allOfUsersProjects: finalProjects })
    })
  }

  fetchProfile = () => {
    let token = this.getToken();
    fetch(PROFILE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setCurrentUser(data.user))
  }

  fetchUsers = () => {
    let token = this.getToken();
    fetch(USERS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ users: data })
    })
  }

  postToProjectUsers = (project, user) => {
    let token = this.getToken();
    let body = {
      user_id: user.id,
      project_id: project.id
    }
    fetch(USERPROJECTS_URL, {
      method: 'POST',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }

  fetchProjectUsers() {
    let token = this.getToken();
    fetch(USERPROJECTS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ userProjects: data }))
  }

  // Triggered by new Project POST request in NewProjectForm
  addNewProject = project => {
    let newProjects = [...this.state.allProjects, project]
    let newProjectUser = { user_id: this.state.currentUser.id, project_id: project.id }
    let newProjectUsers = [...this.state.userProjects, newProjectUser]
    let newAllOfUsersProjects = [...this.state.allOfUsersProjects, project]
    this.setState({ 
      allProjects: newProjects, 
      userProjects: newProjectUsers, 
      allOfUsersProjects: newAllOfUsersProjects
    })
  }

  // Triggered from MenuBar
  deleteProject = project => {
    let token = this.getToken();
    fetch(PROJECTS_URL + `/${project.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => this.removeProjectFromState(project))
  }

  // Removes deleted project from state, so dash updates on delete
  removeProjectFromState = deleteThisProject => {
    let newProjectsArray = this.state.allProjects.filter(project => {
      return project.id !== deleteThisProject.id;
    })
    let newAllOfUsersProjects = this.state.allOfUsersProjects.filter(project => {
      return project.id !== deleteThisProject.id;
    })
    this.setState({ allProjects: newProjectsArray, allOfUsersProjects: newAllOfUsersProjects })
  }

  // ########################### //
  // ########## RENDER ######### //
  // ########################### //
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/login" render={ props => <FormContainer
                                                           {...props}
                                                           loggedIn={this.state.loggedIn}
                                                           saveToken={this.saveToken}
                                                           setCurrentUser={this.setCurrentUser}
                                                       />
                                            }
          />
          <Route exact path="/" render={ props => (!this.state.loggedIn ? (
                                                    <Redirect to='/login' />
                                                  ) : (
                                                    <Dashboard
                                                      {...props}
                                                      loggedIn={this.state.loggedIn}
                                                      getToken={this.getToken}
                                                      logout={this.logout}
                                                      currentUser={this.state.currentUser}
                                                      openNewProjectModal={this.openNewProjectModal}
                                                      projects={this.state.allOfUsersProjects}
                                                      deleteProject={this.deleteProject}
                                                      removeProjectFromState={this.removeProjectFromState}
                                                      addNewProject={this.addNewProject}
                                                      users={this.state.users}
                                                      fetchProjects={this.fetchProjects}
                                                      postToProjectUsers={this.postToProjectUsers}
                                                      userProjects={this.state.userProjects}
                                                      allOfUsersProjects={this.state.allOfUsersProjects}
                                                    />
                                                  ))
                                        } 
          />
          {this.state.newProjectShow ? 
            <NewProjectForm 
              closeNewProjectModal={this.closeNewProjectModal}
              currentUser={this.state.currentUser}
              getToken={this.getToken}
              addNewProject={this.addNewProject}
              postToProjectUsers={this.postToProjectUsers}
            /> 
            : null
          }
        </div>
      </Router>
    )
  }

}

export default App;
