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
    user: 'User',
    activeItem: 'upload'
  }

  signOut() {
    Auth.signOut()
      .then(data => {
      })
      .catch(err => console.log(err));
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state;
    const { userAttributes } = this.props;
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
          active={activeItem === 'upload'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ Link } to='/results'
          name='results'
          active={activeItem === 'results'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          // eslint-disable-next-line
          name={`Hello!! ${userAttributes.name}`}
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
  }
}

export default NavBarComponent;