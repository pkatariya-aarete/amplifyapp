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
  constructor(props, context) {
    super(props, context);
  }

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
