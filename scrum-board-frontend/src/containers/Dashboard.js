//####### IMPORT PACKAGES #######//
import React from 'react';

class Dashboard extends React.Component {

  render() {


    return (
      <>
        Dashboard!
        <button onClick={this.props.logout}>
          Log Out
        </button>
      </>
    )
  }
}

export default Dashboard;