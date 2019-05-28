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
import { PROFILE_URL, PROJECTS_URL, USERS_URL } from './constants'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      loggedIn: false,
      newProjectShow: false,
      projects: [],
      users: []
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
    this.fetchProjects();
    this.fetchUsers();
    // Redirects user to dashboard after successful login
    history.push('/');
  }

  logout = () => {
    this.setState({
      currentUser: null,
      loggedIn: false,
      newProjectShow: false,
      projects: []
    })
    localStorage.removeItem('jwt')
  }

  // Automatically sends user to dashboard if a token is found in local storage
  componentDidMount() {
    if (this.getToken()) {
      this.fetchProfile();
      this.fetchProjects();
      this.fetchUsers();
    }
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
      this.setState({ projects: data })
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

  // Triggered by new Project POST request in NewProjectForm
  addNewProject = project => {
    let newProjects = [...this.state.projects, project]
    this.setState({ projects: newProjects })
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
    let newProjectsArray = this.state.projects.filter(project => {
      return project.id !== deleteThisProject.id;
    })
    this.setState({ projects: newProjectsArray })
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
                                                      projects={this.state.projects}
                                                      deleteProject={this.deleteProject}
                                                      removeProjectFromState={this.removeProjectFromState}
                                                      addNewProject={this.addNewProject}
                                                      users={this.state.users}
                                                      fetchProjects={this.fetchProjects}
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
            /> 
            : null
          }
        </div>
      </Router>
    )
  }

}

export default App;
