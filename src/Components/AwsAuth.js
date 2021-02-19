import React from "react";
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

function authenticationFlow(authState) {
  switch(authState) {
    case 'signIn':
      return <SignInComponent override={'SignIn'} />
    case 'signedIn':
      return <App />
    case 'signUp':
      return <SignUpComponent override={'SignUp'} />
    case 'confirmSignUp':
      return <SignUpConfimationComponent override={'ConfirmSignUp'} />
    case 'forgotPassword':
      return <ForgotPasswordComponent override={'ForgotPassword'} />
    default:
      return <SignInComponent override={'SignIn'} />
  }
}

class AwsAuth extends React.Component {
  state = {
    authState:'signIn'
  }
  render() {
    const { authState } = this.state
    return (
      <div className="App" style={sectionStyle}>
        <Grid style={{height: '100vh'}}>
          <Container fluid>
            <Authenticator amplifyConfig={config}
              hideDefault={true}
              authState={authState}
              onStateChange={(authState) => this.setState({authState:authState}) }
            >
              { authenticationFlow(authState) }
            </Authenticator>
          </Container>
        </Grid>
      </div>
    );
  }
}

export default AwsAuth;
