import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBarComponent from './NavBarComponent/NavBarComponent';
import FileUploadComponent from './FileUploadComponent/FileUploadComponent';
import ResultsComponent from './ResultsComponent/ResultsComponent';

class App extends React.Component {
  state = {
    authData: null,
    authState: null
  }

  static getDerivedStateFromProps(props, state) {
    let prevState = state
    if (props.authData !== state.authData){
      const { authData } = props
      prevState = {...prevState, authData:authData}
    }
    if (props.authState !== state.authState){
      const { authState } = props
      prevState = {...prevState, authState:authState}
    }
    return prevState
  }


  render(){
    if (this.props.authState === "signedIn") {
      return (
        <div>
          <Router>
            <NavBarComponent authData={this.state.authData} authState={this.state.authState} />  
            <Switch>
              <Route path='/' exact component={FileUploadComponent} />
              <Route path='/results' exact component={ResultsComponent} />
            </Switch>
          </Router>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default App;