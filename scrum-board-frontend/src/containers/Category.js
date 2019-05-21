//####### IMPORT PACKAGES #######//
import React from 'react';
import { Button, Card, Dropdown, Form, Icon } from 'semantic-ui-react';
//####### IMPORT COMPONENTS #######//
import TaskContainer from './TaskContainer';
//####### IMPORT MISC #######//
import { CATEGORIES_URL, HEADERBODY } from '../constants'
import '../styles/containers.css';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      columnName: this.props.category.name
    }
  }

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

  addTask = () => {
    console.log(`Add task for ${this.props.category.name}`)
  }

  handleOptionChange = ev => {
    let choice = ev.currentTarget.children[1].textContent
    if (choice === 'Edit') {
      this.setState({ showEditForm: true })
    } else {
      this.props.deleteCategory(this.props.category);
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

  showCategoryCard() {
    return (
      <Card id='category'>
        <Card.Content>
          <Card.Header>
            <div id='category-name'>
              {this.state.columnName}
            </div>
            <div id='category-option'>
              <Icon 
                name='add' 
                onClick={this.addTask}
              />
              <Dropdown
                trigger={this.trigger()}
                options={this.options()}
                pointing='top left'
                icon={null}
                onChange={this.handleOptionChange}
              />
            </div>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <TaskContainer tasks={this.props.tasks} />
        </Card.Content>
      </Card>
    )
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

  render() {
    return (
      <>
        {this.state.showEditForm === false ? 
          this.showCategoryCard()
        :
          this.showEditCard()
        }
      </>
    )
  }

}

export default Category;