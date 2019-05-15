import React from 'react';
import LoginForm from '../components/LoginForm';

class FormContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showForm: 'LoginForm'
    }
  }

  render() {
    let showPage;
    if (this.state.showForm === 'LoginForm') {
      showPage = <LoginForm
                   saveToken={this.props.saveToken}
                   login={this.props.login}
                 />
    } else {
      showPage = '<CreateUserForm />'
    }

    return(
      <div>
        FormContainer

        {this.props.loggedIn ?
        null
        :
        <LoginForm
          saveToken={this.props.saveToken}
          login={this.props.login}
        />
        }

      </div>
    )
  }

}

export default FormContainer;