import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth } from "aws-amplify";

import NavBarComponent from './NavBarComponent/NavBarComponent';
import FileUploadComponent from './FileUploadComponent/FileUploadComponent';
import ResultsComponent from './ResultsComponent/ResultsComponent';

class App extends React.Component {
  state = {
    cognito:null
  }

  getCurrentUser() {
    Auth.currentAuthenticatedUser().then(cognito => {
      this.setState({
        cognito
      });
    });
  }

  componentDidMount(){
    this.getCurrentUser()
  }

  render(){
    const { authState } = this.props
    const { cognito } = this.state
    if (authState === 'signedIn' && cognito !== null ) {
      return (
        <div>
          <Router>
            <NavBarComponent userAttributes={cognito.attributes} />
            <Switch>
              <Route path='/' exact component={FileUploadComponent} />
              <Route path='/results' exact component={ResultsComponent} />
            </Switch>
          </Router>
        </div>
      )
    } else {
      return null
    }   
  }
}

export default App;