import React from "react";
import { Hub } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import config from "../aws-exports";
import { Grid, Container } from "semantic-ui-react"

import App from './App'
import SignInComponent from "./LoginComponent/SignInComponent";
import SignUpComponent from "./LoginComponent/SignUpComponent";
import ForgotPasswordComponent from "./LoginComponent/ForgotPasswordComponent";
import SignUpConfimationComponent from "./LoginComponent/SignUpConfimationComponent";

import "../assets/styles/reset.css";
import "./App.css";
import "../assets/styles/style.css";
import "../assets/styles/new_styles.css";
import Background from "../assets/images/ocrbg.png";

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`,
  position: "absolute"
};

export const UserContext = React.createContext();

class AppWithAuth extends React.Component {
  
  componentDidMount() {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
    })
  }
  
  onAuthEvent(payload) {
    switch (payload.event) {
      case "configured":
        break;
      case "signIn":
        break;
      case "signUp":
        break;
      case "signOut":
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="App" style={sectionStyle}>
        <UserContext.Provider value={this.state}>
        <Grid style={{height: '100vh'}}>
          <Container fluid>
            <Authenticator amplifyConfig={config} hideDefault={true} authState="signIn">
              <SignInComponent />
              <SignUpComponent />
              <SignUpConfimationComponent />
              <ForgotPasswordComponent />
              <App />
            </Authenticator>
          </Container>
        </Grid>
        </UserContext.Provider>
      </div>
    );
  }
}

export default AppWithAuth;
