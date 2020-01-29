import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import { Menu, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from './assets/doczy-logo.png';

export function NavBarIcon(){
  return(
    <Menu borderless inverted //fixed='top'
      style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
    >
      <Menu.Item position='left'>
        <Image size='medium' src={logo} />
      </Menu.Item>
    </Menu>
    )
  }

class NavBarComponent extends ForgotPassword {
  state= {
    name: '',
    activeItem: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authData){
      const { attributes } = props.authData
      return {name: attributes.name}
    }
    return null
  }

  signOut() {
    Auth.signOut()
      .then(data => {
        this._validAuthStates = ["signIn"];
      })
      .catch(err => console.log(err));
  }

  render(){
    if (this.props.authState === "signedIn") {
      return (
        <Menu borderless inverted //fixed='top'
          style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
        >
          <Menu.Item position='left'>
            <Image size='medium' src={logo} />
          </Menu.Item>
          <Menu.Item as={ Link } to='/'
            position='right'
            name='upload'
            //active={activeItem === 'upload'}
          />
          <Menu.Item as={ Link } to='/results'
            name='results'
            //active={activeItem === 'results'}
          />
          <Menu.Item
            // eslint-disable-next-line
            name={`Hello!! ${this.state.name}`}
          />
          <Menu.Item>
            <Button
              content='Signout'
              icon='power off'
              color='orange'
              onClick={() => this.signOut()}
              
            />
          </Menu.Item>
        </Menu>
      )
    } else {
      NavBarIcon()
    }
  }
}

export default NavBarComponent;