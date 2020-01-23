import React from "react";
import { Auth, Hub } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import config from "../aws-exports";

import App from './App'
import NavBarComponent from './NavBarComponent/NavBarComponent'
import SignInComponent from "./LoginComponent/SignInComponent";
import SignUpComponent from "./LoginComponent/SignUpComponent";
import ForgotPasswordComponent from "./LoginComponent/ForgotPasswordComponent";
import SignUpConfimationComponent from "./LoginComponent/SignUpConfimationComponent";

import "../assets/styles/reset.css";
import "./App.css";
import "../assets/styles/style.css";
import Background from "../assets/images/ocrbg.png";

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`,
  position: "absolute"
};

class AppWithAuth extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      user: '',
    }
    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
    })
  }

  onAuthEvent(payload) {
    console.log(payload)
    switch (payload.event) {
      case "configured":
        break;
      case "signIn":
        this.getUserData();
        break;
      case "signUp":
        break;
      case "signOut":
        this.setState({ user: null });
        break;
      default:
        return;
    }
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user
      ? this.setState({ user }, () => this.getUserAttributes(this.state.user))
      : this.setState({ user: null });
  };

  getUserAttributes = async authUserData => {
    const attributesArr = await Auth.userAttributes(authUserData);
    const attributesObj = Auth.attributesToObject(attributesArr);
    this.setState({ userAttributes: attributesObj });
  };

  render() {
    return (
      <div className="App" style={sectionStyle}>
        <Authenticator amplifyConfig={config} hideDefault={true} >  
          <NavBarComponent />
          <SignInComponent />
          <SignUpComponent />
          <SignUpConfimationComponent />
          <ForgotPasswordComponent />
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
