import React from "react";
import {
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmSignUp,
  Greetings
} from "aws-amplify-react";
import config from "./aws-exports";
import { CustomSignIn } from "./CustomSignIn";
import { CustomSignUp } from "./CustomSignUp";
import { CustomForgotPassword } from "./CustomForgotPassword";
import { CustomConfirmSignUp } from "./CustomConfirmSignUp";
import App from "./App";
import "./assets/styles/reset.css";
import "./App.css";
import "./assets/styles/style.css";
import { Authenticator } from "aws-amplify-react";

import Background from "./assets/images/ocrbg.png";
var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`,
  position: "absolute"
};

class AppWithAuth extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="App" style={sectionStyle}>
        <Authenticator
          hide={[SignIn, SignUp, ForgotPassword, ConfirmSignUp, Greetings]}
          amplifyConfig={config}
          authState="signIn"
        >
          <CustomSignIn />
          <CustomSignUp />
          <CustomForgotPassword />
          <CustomConfirmSignUp />
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
