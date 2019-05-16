//####### IMPORT PACKAGES #######//
import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import logo from '../assets/logo/logo1.jpg';

class Navbar extends React.Component {

  render() {
    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>
          <Menu.Item name='Projects' />

          <Menu.Menu position='right'>
            <Menu.Item name='Profile' />
            <Menu.Item name='Logout' onClick={this.props.logout}/>
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }

}

export default Navbar;
