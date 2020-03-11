import React, { Component } from "react";
import {Link} from 'react-router-dom'

import {Menu, Label, Icon} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { logout } from "../../Actions/userActions";

import {getShoppingCart} from "../../Actions/cartActions";

import styled from 'styled-components'


const StyledMenu = styled(Menu)`
    height:80px;
    border-radius: 0px !important; 
`


class UserNavbar extends Component {

  state = {
    activeItem: ''
  }

  componentDidMount(){
      this.props.getShoppingCart();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


render() {
  const {activeItem} = this.state;
  return (
      <StyledMenu pointing inverted size={"massive"}>
        <Menu.Item as={Link} to="/home"
              name="online-market"
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
            <Label color='red' floation="true">{this.props.total}</Label>
          </Menu.Item>
          <Menu.Item
                name='Logout'
                active={activeItem === 'Logout'}
                onClick={this.props.logout}
          />
        </Menu.Menu>
      </StyledMenu>
    );
  }
}

const mapStateToProps = state => ({
    total : state.cartReducer.total
})

export default connect(mapStateToProps, {logout, getShoppingCart})(UserNavbar);