//####### IMPORT PACKAGES #######//
import React from 'react';
import { Menu, Segment, Dropdown, Image } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import logo from '../assets/logo/logo1.jpg';
import option1 from '../assets/avatar/Avatar (1).svg';
import option2 from '../assets/avatar/Avatar (2).svg';
import option3 from '../assets/avatar/Avatar (3).svg';
import option4 from '../assets/avatar/Avatar (4).svg';
import option5 from '../assets/avatar/Avatar (5).svg';
import option6 from '../assets/avatar/Avatar (6).svg';
import option7 from '../assets/avatar/Avatar (7).svg';
//####### IMPORT MISC #######//
import '../styles/navbar.css';

class Navbar extends React.Component {

  // Used in the profile dropdown
  trigger = () => {
    let avatarChoice = {
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
      'option5': option5,
      'option6': option6,
      'option7': option7,
    }
    // Chooses corrent avatar from lookup table
    if (this.props.currentUser) {
      let avatarPic = avatarChoice[this.props.currentUser.avatar]
      return (
        <span>
          <Image avatar src={avatarPic} /> {this.props.currentUser.username}
        </span>
      )
    } else {
      return null
    }
  }

  // Used in the profile dropdown [dropdown options]
  options() {
    return [
      { key: 'user', text: 'Profile', icon: 'user' },
      { key: 'sign-out', text: 'Log Out', icon: 'sign out' }
    ]
  }

  // Handles choice from dropdown menu
  handleChange = ev => {
    let choice = ev.currentTarget.children[1].textContent
    if (choice === 'Log Out') {
      this.props.logout();
    }
  }

  render() {
    return (
      <Segment inverted>
        <Menu inverted secondary>
        
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown 
              trigger={this.trigger()} 
              options={this.options()} 
              pointing='top' 
              icon={null} 
              className='profile-avatar'
              onChange={this.handleChange}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }

}

export default Navbar;
