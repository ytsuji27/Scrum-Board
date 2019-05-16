//####### IMPORT PACKAGES #######//
import React from 'react';
//####### IMPORT COMPONENTS #######//
import LoginForm from '../components/LoginForm';
import NewUserForm from '../components/NewUserForm';

class FormContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showForm: 'LoginForm'
    }
  }

  switchForm = () => {
    if (this.state.showForm === 'LoginForm') {
      this.setState({ showForm: 'NewUserForm' })
    } else {
      this.setState({ showForm: 'LoginForm'})
    }
  }

  render() {
    let showPage;
    if (this.state.showForm === 'LoginForm') {
      showPage = <LoginForm
                   saveToken={this.props.saveToken}
                   setCurrentUser={this.props.setCurrentUser}
                   switchForm={this.switchForm}
                 />
    } else {
      showPage = <NewUserForm 
                    saveToken={this.props.saveToken}
                    setCurrentUser={this.props.setCurrentUser}
                    switchForm={this.switchForm}
                 />
    }

    return(
      <div>
        {showPage}
      </div>
    )
  }

}

export default FormContainer;