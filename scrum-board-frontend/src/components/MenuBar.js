//####### IMPORT PACKAGES #######//
import React from 'react';
import { Menu, Segment, Dropdown, Image, Input, Search, Button, Icon } from 'semantic-ui-react';
//####### IMPORT MISC #######//
import '../styles/navbar.css';

class MenuBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick = () => {
    console.log('clicked')
    this.props.openNewProjectModal();
  }

  showProjectsBar() {
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item header>Projects</Menu.Item>
        <Menu.Item>
          <Dropdown multiple icon='filter'>
            <Dropdown.Menu>
              <Input icon='search' iconPosition='left' className='search' />
              <Dropdown.Divider />
              <Dropdown.Header icon='tags' content='Tag Label' />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown icon='search'>
            <Dropdown.Menu>
              <Input icon='search' placeholder='Search...' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item position='right' onClick={this.handleClick}>
          <Icon name='add' />
          Add Project
        </Menu.Item>
      </Menu>
    )
  }

  showProjectTitleBar() {
    return (
      <Menu id='project-menu-bar'>
        <Menu.Item header>{this.props.showPage}</Menu.Item>
      </Menu>
    )
  }

  render() {
    let { showPage } = this.props
    return (
      <>
        {showPage === 'Projects' ?
          this.showProjectsBar()
          : 
          this.showProjectTitleBar() 
        }
      </>

    )
  }

}

export default MenuBar;