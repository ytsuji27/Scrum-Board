//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Card, Confirm, Dropdown, Form, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
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
      openConfirmation: false,
      selectedOption: null
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
      { key: 'edit', text: 'Edit', icon: 'edit', value: 'edit'},
      { key: 'delete', text: 'Delete', icon: 'trash alternate outline', value: 'delete' }
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
  handleOptionChange = (ev, { value }) => {
    this.setState({ selectedOption: value })
    if (value === 'edit') {
      this.setState({ showEditForm: true })
    } else if (value === 'delete') {
      this.showConfirmation();
    }
    // Reset dropdown
    this.setState({ selectedOption: null })
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
      <Draggable draggableId={this.props.category.id} index={this.props.index}>
        {provided => (
          <div
            className='container'
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card id='category'>
              <Card.Content id='category-card-header'>
                <Card.Header {...provided.dragHandleProps}>
                  <div id='category-name' className='custom-font'>
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
                      value={this.state.selectedOption}
                      id='category-dropdown-menu'
                    />    
                    <Confirm 
                      open={this.state.openConfirmation} 
                      onCancel={this.handleCancel} 
                      onConfirm={this.handleConfirm} 
                      content='Are you sure? All tasks in this column will be deleted'
                    />
                  </div>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <TaskContainer 
                  category={this.props.category}
                  tasks={this.props.tasks} 
                  getToken={this.props.getToken}
                  removeTaskFromState={this.props.removeTaskFromState}
                  addTaskToState={this.props.addTaskToState}
                  users={this.props.users}
                  taskIds={this.props.category.taskIds}
                  updateTaskInState={this.props.updateTaskInState}
                  removeTaskFromTaskIdsState={this.props.removeTaskFromTaskIdsState}
                />
              </Card.Content>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }

  // ########################### //
  // ######### RENDER ########## //
  // ########################### //
  componentDidMount() {
    this.setState({ taskIds: this.props.category.taskIds })
  }

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
            users={this.props.users}
            addTaskToTaskIdsState={this.props.addTaskToTaskIdsState}
          />
        :
          null
        }
      </>
    )
  }

}

export default Category;