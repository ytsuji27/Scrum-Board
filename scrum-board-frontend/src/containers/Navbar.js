//####### IMPORT PACKAGES #######//
import React from 'react';
import { Menu, Segment, Dropdown, Image } from 'semantic-ui-react';
//####### IMPORT IMAGES #######//
import logo from '../assets/logo/logo.png';
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

  constructor(props){
    super(props);
    this.state = {
      selectedOption: null
    }
  }

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
      { key: 'user', text: 'Profile', icon: 'user', value: 'user' },
      { key: 'sign-out', text: 'Log Out', icon: 'sign out', value: 'sign-out' }
    ]
  }

  // Handles choice from dropdown menu
  handleChange = (ev, { value }) => {
    let choice = ev.currentTarget.children[1].textContent;
    if (choice === 'Profile' || choice === 'Log Out') {
      this.setState({ selectedOption: value })
      if (choice === 'Log Out') {
        this.props.logout();
      } else if (choice === 'Profile') {
        this.props.setProfilePage();
      }
      // Reset dropdown
      this.setState({ selectedOption: null })
    }
  }

  render() {
    return (
      <Segment inverted id='navbar-segment'>
        <Menu inverted secondary>
        
          <Menu.Item id='app-logo-item'>
            <img src={logo} alt="logo" className='app-logo' />
          </Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown 
              trigger={this.trigger()} 
              options={this.options()} 
              pointing='top' 
              icon={null} 
              className='profile-avatar'
              onChange={this.handleChange}
              value={this.state.selectedOption}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }

}

export default Navbar;
