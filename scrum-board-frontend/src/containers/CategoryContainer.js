//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Card, Form, Icon } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import Category from './Category';
//####### IMPORT MISC #######//
import { CATEGORIES_URL, HEADERBODY, PROJECTTASKS_URL, PROJECTCATEGORIES_URL } from '../constants';
import '../styles/containers.css';

class CategoryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      categories: [],
      showAddColumnButton: true,
      columnName: ''
    }
  }

  // ########################### //
  // ###### TRIGGER STUFF ###### //
  // ########################### //
  addColumn = () => {
    this.setState({ showAddColumnButton: false })
  }

  addTaskToState = task => {
    let newTasks = [...this.state.tasks, task]
    this.setState({ tasks: newTasks })
  }

  removeTaskFromState = deleteTask => {
    let newTasks = this.state.tasks.filter(task => {
      return task !== deleteTask
    })
    this.setState({ tasks: newTasks })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    this.postCategory();
    this.setState({ showAddColumnButton: true })
  }

  // ########################### //
  // ####### FETCH STUFF ####### //
  // ########################### //
  componentDidMount() {
    this.fetchTasks();
    this.fetchCategories();
  }

  fetchTasks = () => {
    let token = this.props.getToken();
    fetch(PROJECTTASKS_URL + `/${this.props.project.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ tasks: data })
    })
  }

  fetchCategories = () => {
    let token = this.props.getToken();
    fetch(PROJECTCATEGORIES_URL + `/${this.props.project.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ categories: data })
    })
  }

  postCategory = () => {
    let body = {
      name: this.state.columnName,
      project_id: this.props.project.id
    };
    let token = this.props.getToken();
    fetch(CATEGORIES_URL, {
      method: 'POST',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        columnName: ''
      })
      this.fetchCategories();
    })
  }

  deleteCategory = category => {
    let token = this.props.getToken();
    fetch(CATEGORIES_URL + `/${category.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => this.removeCategoryFromState(category))
  }

  removeCategoryFromState = deleteThisCategory => {
    let newCategories = this.state.categories.filter(category => {
      return category !== deleteThisCategory
    })
    this.setState({ categories: newCategories })
  }

  // ########################### //
  // ####### RENDER STUFF ###### //
  // ########################### //

  // Filters out tasks based on category passed in
  getTasks = category => {
    let tasks = this.state.tasks.filter(task => {
      return task.category.id === category.id
    })
    return tasks;
  }

  showCategories = () => {
    return this.state.categories.map((category, index) => {
      return <Category 
               category={category} 
               key={index} 
               tasks={this.getTasks(category)} 
               getToken={this.props.getToken}
               deleteCategory={this.deleteCategory}
               currentUser={this.props.currentUser}
               addTaskToState={this.addTaskToState}
               removeTaskFromState={this.removeTaskFromState}
             />
    })
  }

  showAddColumnButton = () => {
    return (
      <Card id='new-category-button' onClick={this.addColumn}>
        <Card.Content>
          <Icon name='add' /> Add Column
        </Card.Content>
      </Card>
    )
  }

  hideForm = () => {
    this.setState({ showAddColumnButton: true })
  }

  showAddColumnForm = () => {
    return (
      <Form id='new-category-form' onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            label='Column Name'
            type='text'
            name='columnName' 
            placeholder='Column Name'
            onChange={this.handleChange}
            required 
          />
        </Form.Field>
        <Button color='blue' type='submit'>Create</Button>
        <Button onClick={this.hideForm}>Cancel</Button>
      </Form>
    )
  }

  render() {
    return (
      <div id='categories-container'>
        {this.state.categories.length !== 0 ? this.showCategories() : null}
        {this.state.showAddColumnButton ? this.showAddColumnButton() : this.showAddColumnForm()}
      </div>
    )
  }

}

export default CategoryContainer;