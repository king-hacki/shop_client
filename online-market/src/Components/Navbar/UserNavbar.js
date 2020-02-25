import React, { Component } from "react";
import {Link} from 'react-router-dom'



import {Menu, Label, Icon} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { logout } from "../../Actions/userActions";

import menu from "../../App.css"
import {Container} from 'semantic-ui-react'

class UserNavbar extends Component {


  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


render() {
  const {activeItem} = this.state;
  return (
      <Menu inverted secondary style={{height: 80}} color={'black'} size={'huge'}>
        <Menu.Item as={Link} to="/home"
              name='Online-market'
              />
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/home"
                name='Home'
                onClick={this.handleItemClick}
                active={activeItem === 'Home'}
          />
          <Menu.Item as={Link} to="/profile"
                name='Profile'
                onClick={this.handleItemClick}
                active={activeItem === 'Profile'}
          />
          <Menu.Item as={Link} to="/ShoppingCart"
                name='Shopping Cart'
                onClick={this.handleItemClick}
                active={activeItem === 'Shopping Cart'}
          >
            <Icon name="cart"/>
            <Label color='red' ></Label>
          </Menu.Item>
          <Menu.Item
                name='Logout'
                active={activeItem === 'Logout'}
                onClick={this.props.logout}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
    total : state.cartReducer.total
})

export default connect(mapStateToProps, {logout})(UserNavbar);