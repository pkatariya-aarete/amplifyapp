import React from "react";
import {
  SignIn, SignUp,
  ForgotPassword,
  ConfirmSignUp,
  Greetings
} from "aws-amplify-react";
import config from "../aws-exports";
import SignInComponent from "./LoginComponent/SignInComponent";
import SignUpComponent from "./LoginComponent/SignUpComponent";
import ForgotPasswordComponent from "./LoginComponent/ForgotPasswordComponent";
import SignUpConfimationComponent from "./LoginComponent/SignUpConfimationComponent";
import FileUploadComponent from "./FileUploadComponent/FileUploadComponent";
import NavBarComponent from "./NavBarComponent/NavBarComponent"
import "../assets/styles/reset.css";
import "./App.css";
import "../assets/styles/style.css";
import { Authenticator } from "aws-amplify-react";

import { Auth } from "aws-amplify";
import { Hub } from 'aws-amplify';

import Background from "../assets/images/ocrbg.png";
var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`,
  position: "absolute"
};

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: ''
    }

    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
      console.log('A new auth event has happened: ', data.payload.data.attributes.preferred_username + ' has ' + data.payload.event);
    })

  }

  onAuthEvent(payload) {
    console.log(payload)
    switch (payload.event) {
      case "configured":
        console.log("Cognito is Configured!");
        break;
      case "signIn":
        console.log("signed in");
        this.getUserData();
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  }

  getUserData = async () => {
    console.log('Executed User Data!');
    const user = await Auth.currentAuthenticatedUser();
    user
      ? this.setState({ user }, () => this.getUserAttributes(this.state.user))
      : this.setState({ user: null });
  };

  getUserAttributes = async authUserData => {
    console.log('Executed get attributes!');
    const attributesArr = await Auth.userAttributes(authUserData);
    const attributesObj = Auth.attributesToObject(attributesArr);
    this.setState({ userAttributes: attributesObj });
  };

  render() {
    return (
      <div className="App" style={sectionStyle}>
        <NavBarComponent />
        <Authenticator
          hide={[SignIn, SignUp, ForgotPassword, ConfirmSignUp, Greetings]}
          amplifyConfig={config}
          authState="signIn"
        >
          <SignInComponent />
          <SignUpComponent />
          <SignUpConfimationComponent />
          <ForgotPasswordComponent />
          <FileUploadComponent />
        </Authenticator>
      </div>
    );
  }
}

export default App;
