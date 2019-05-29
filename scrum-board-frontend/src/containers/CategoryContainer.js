//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Card, Form, Icon } from 'semantic-ui-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
//####### IMPORT COMPONENTS #######//
import Category from './Category';
//####### IMPORT MISC #######//
import { CATEGORIES_URL, HEADERBODY, PROJECTTASKS_URL, PROJECTCATEGORIES_URL, PROJECTS_URL, TASKS_URL } from '../constants';
import '../styles/containers.css';

class CategoryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      categories: [],
      showAddColumnButton: true,
      columnName: '',
      columnOrder: []
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

  updateTaskInState = updateTask => {
    let newTasks = this.state.tasks.filter(task => task.id !== updateTask.id);
    newTasks.push(updateTask);
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
    this.setState({ columnOrder: this.props.project.columnOrder });
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
      project_id: this.props.project.id,
      taskIds: []
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
      // this.fetchCategories();
      this.addNewCategoryToState(data);
      this.patchProject(data);
    })
  }

  patchProject = newCategory => {
    let token = this.props.getToken();
    let body = { columnOrder: this.state.columnOrder };
    fetch(PROJECTS_URL + `/${this.props.project.id}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  addNewCategoryToState = newCategory => {
    let newColumnOrder = [...this.state.columnOrder, newCategory.id];
    let newCategories = [...this.state.categories, newCategory]
    this.setState({ 
      columnOrder: newColumnOrder,
      categories: newCategories 
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
    let newOrder = this.state.columnOrder.filter(categoryId => {
      return categoryId !== deleteThisCategory.id
    })
    this.setState({ 
      categories: newCategories,
      columnOrder: newOrder 
    })
    this.patchProject();
  }

  // ########################### //
  // ####### RENDER STUFF ###### //
  // ########################### //

  // Filters out tasks based on category passed in
  // getTasks = category => {
  //   let tasks = this.state.tasks.filter(task => {
  //     return task.category.id === category.id
  //   })
  //   return tasks;
  // }

  onDragEnd = result => {
    // TO DO reorder column
    const { destination, source, draggableId, type } = result;
    // Does nothing if object is dropped outside
    if (!destination) {
      return;
    }
    // See if location of draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Checks to see what's being dragged
    // IF column, then it updates the columnOrder in Project
    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      this.setState({ columnOrder: newColumnOrder }, () => this.patchProject())
    // IF task, ...
    } else if (type === 'task') {
      let droppedCategory = this.state.categories.find(category => category.id === destination.droppableId)
      let startCategory = this.state.categories.find(category => category.id === source.droppableId)
      // Checks to see if start/end column are the same, if YES 
      // only updates the taskIds for that column
      if (droppedCategory === startCategory) {
        let newCategories = this.state.categories.map(category => {
          if (category.id === startCategory.id) {
            category.taskIds.splice(source.index, 1);
            category.taskIds.splice(destination.index, 0, draggableId);
          }
          return category;
        })
        this.setState({ categories: newCategories }, () => this.patchCategory(startCategory))
      // If NOT the same, then it updates both columns
      } else {
        // Creates a new Categories array to update state
        let newCategories = this.state.categories.map(category => {
          if (category.id === startCategory.id) {
            category.taskIds.splice(source.index, 1);
          } else if (category.id === droppedCategory.id) {
            category.taskIds.splice(destination.index, 0, draggableId);
          }
          return category;
        })
        // Creates a new Tasks array to update state
        let newTasks = this.state.tasks.map(task => {
          if (task.id === draggableId) {
            task.category = droppedCategory;
          }
          return task;
        })
        this.setState({ 
          categories: newCategories,
          tasks: newTasks 
        }, () => {
          this.patchCategory(startCategory);
          this.patchCategory(droppedCategory);
          this.patchTask(draggableId, droppedCategory);
        })
      }
    }
  }

  addTaskToTaskIdsState = (newTask, currentCategory) => {
    let newCategoriesState = this.state.categories.map(category => {
      if (category.id === currentCategory.id) {
        category.taskIds.push(newTask.id);
      }
      return category;
    })
    this.setState({ categories: newCategoriesState }, () => this.patchCategory(currentCategory))
  }

  removeTaskFromTaskIdsState = (deleteTask, currentCategory) => {
    let newCategoriesState = this.state.categories.map(category => {
      if (category.id === currentCategory.id) {
        category.taskIds = category.taskIds.filter(taskId => taskId !== deleteTask.id)
      }
      return category;
    })
    this.setState({ categories: newCategoriesState }, () => this.patchCategory(currentCategory))
  }

  patchTask = (patchTaskId, newCategory) => {
    let token = this.props.getToken();
    // let patchThisTask = this.state.tasks.find(task => task.id === patchTaskId);
    fetch(TASKS_URL + `/${patchTaskId}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify({ category_id: newCategory.id })
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }

  patchCategory = patchCategory => {
    let token= this.props.getToken();
    let patchThisCategory = this.state.categories.filter(category => category.id === patchCategory.id)
    fetch(CATEGORIES_URL + `/${patchCategory.id}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify({ taskIds: patchThisCategory[0].taskIds })
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }

  showCategories = () => {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable 
          droppableId='all-columns' 
          direction='horizontal' 
          type='column'
        >
          {provided => (
            <div 
              className='categories-container-minus-add-button'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const category = this.state.categories.find(category => category.id === columnId)
                return <Category 
                  category={category} 
                  key={category.id}
                  index={index} 
                  tasks={this.state.tasks} 
                  getToken={this.props.getToken}
                  deleteCategory={this.deleteCategory}
                  currentUser={this.props.currentUser}
                  addTaskToState={this.addTaskToState}
                  removeTaskFromState={this.removeTaskFromState}
                  users={this.props.users}
                  removeTaskFromTaskIdsState={this.removeTaskFromTaskIdsState}
                  addTaskToTaskIdsState={this.addTaskToTaskIdsState}
                  updateTaskInState={this.updateTaskInState}
                />
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
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
        {this.state.categories.length > 0 ? this.showCategories() : null}
        {this.state.showAddColumnButton ? this.showAddColumnButton() : this.showAddColumnForm()}
      </div>
    )
  }

}

export default CategoryContainer;