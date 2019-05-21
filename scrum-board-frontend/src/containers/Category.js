//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Card, Confirm, Dropdown, Form, Icon } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import TaskContainer from './TaskContainer';
import NewTaskForm from '../components/NewTaskForm';
//####### IMPORT MISC #######//
import { CATEGORIES_URL, HEADERBODY } from '../constants'
import '../styles/containers.css';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      columnName: this.props.category.name,
      showNewTaskForm: false,
      openConfirmation: false
    }
  }

  // ########################### //
  // ####### MENU OPTIONS ###### //
  // ########################### //
  trigger = () => {
    return (
      <span>
        <Icon 
          position='right' 
          name='ellipsis vertical' 
        />
      </span>
    )
  }

  options = () => {
    return [
      { key: 'edit', text: 'Edit', icon: 'edit' },
      { key: 'delete', text: 'Delete', icon: 'trash alternate outline' }
    ]
  }

  // ########################### //
  // ###### NEW TASK MODAL ##### //
  // ########################### //
  closeNewTaskModal = () => {
    this.setState({ showNewTaskForm: false })
  }

  openNewTaskModal = () => {
    this.setState({ showNewTaskForm: true })
  }
  
  // ########################### //
  // ######## EDIT FORM ######## //
  // ########################### //
  handleOptionChange = ev => {
    let choice = ev.currentTarget.children[1].textContent
    console.log(choice)
    if (choice === 'Edit') {
      this.setState({ showEditForm: true })
    } else {
      this.showConfirmation();
      // this.props.deleteCategory(this.props.category);
    }
  }
  
  handleFormChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  
  handleEditSubmit = ev => {
    let token = this.props.getToken();
    fetch(CATEGORIES_URL + `/${this.props.category.id}`, {
      method: 'PATCH',
      headers: {...HEADERBODY, Authorization: `Bearer ${token}`},
      body: JSON.stringify({ name: this.state.columnName })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        showEditForm: false,
        columnName: data.name
      })
    })
  }

  showEditCard = () => {
    return (
      <Form id='new-category-form' onSubmit={this.handleEditSubmit}>
        <Form.Field>
          <Form.Input
            label='Column Name'
            type='text'
            name='columnName' 
            placeholder={this.state.columnName}
            onChange={this.handleFormChange}
            required 
          />
        </Form.Field>
        <Button color='blue' type='submit'>Update</Button>
        <Button onClick={this.hideForm}>Cancel</Button>
      </Form>
    )
  }

  hideForm = () => {
    this.setState({ 
      showEditForm: false,
      columnName: this.props.category.name
    })
  }

  // ########################### //
  // ####### CONFIRMATION ###### //
  // ########################### //
  showConfirmation = () => {
    this.setState({ openConfirmation: true })
  }

  handleCancel = () => {
    this.setState({ openConfirmation: false })
  }

  handleConfirm = () => {
    this.setState({ openConfirmation: false })
    this.props.deleteCategory(this.props.category);
  }

  // ########################### //
  // ####### CATEGORY CARD ##### //
  // ########################### //
  showCategoryCard() {
    return (
      <Card id='category'>
        <Card.Content id='category-card-header'>
          <Card.Header>
            <div id='category-name'>
              {this.state.columnName}
            </div>
            <div id='category-option'>
              <Icon 
                name='add' 
                onClick={this.openNewTaskModal}
              />
              <Dropdown
                trigger={this.trigger()}
                options={this.options()}
                pointing='top left'
                icon={null}
                onChange={this.handleOptionChange}
              />    
              <Confirm 
                open={this.state.openConfirmation} 
                onCancel={this.handleCancel} 
                onConfirm={this.handleConfirm} 
              />
            </div>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <TaskContainer 
            tasks={this.props.tasks} 
            getToken={this.props.getToken}
            removeTaskFromState={this.props.removeTaskFromState}
            addTaskToState={this.props.addTaskToState}
            removeTaskFromState={this.props.removeTaskFromState}
          />
        </Card.Content>
      </Card>
    )
  }

  // ########################### //
  // ######### RENDER ########## //
  // ########################### //
  render() {
    return (
      <>
        {this.state.showEditForm === false ? 
          this.showCategoryCard()
        :
          this.showEditCard()
        }
        {this.state.showNewTaskForm !== false ?
          <NewTaskForm 
            closeNewTaskModal={this.closeNewTaskModal} 
            currentUser={this.props.currentUser}
            currentProject={this.props.category.project}
            currentCategory={this.props.category}
            getToken={this.props.getToken}
            addTaskToState={this.props.addTaskToState}
          />
        :
          null
        }
      </>
    )
  }

}

export default Category;