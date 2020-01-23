import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import signOut from "../../assets/images/Signout-Icon.svg";
import { Menu, Segment, Image, Button } from 'semantic-ui-react';

import logo from './assets/doczy-logo.png';

class NavBarComponent extends ForgotPassword {
  signOut() {
    Auth.signOut()
      .then(data => {
        this._validAuthStates = ["signIn"];
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  render(){
    if (this.props.authState === "signedIn") {
      return (
        <Segment inverted compact
          style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
        >
          <Menu borderless inverted fixed='top'
            style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
          >
            <Menu.Item position='left'>
              <Image size='medium' src={logo} />
            </Menu.Item>
            <Menu.Item position='right'
              name={`Hello\! ${this.props.authData.attributes.preferred_username} `} 
            />
            <Menu.Item>
              <Button
                content='Signout'
                onClick={() => this.signOut()}
                color='orange'
              />
            </Menu.Item>
          </Menu>
        </Segment>
      )
    } else {
      return(
        <Segment inverted compact
          style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
        >
          <Menu borderless inverted fixed='top'
            style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
          >
            <Menu.Item position='left'>
              <Image size='medium' src={logo} />
            </Menu.Item>
          </Menu>
        </Segment>
      )
    }
  }
}

export default NavBarComponent;