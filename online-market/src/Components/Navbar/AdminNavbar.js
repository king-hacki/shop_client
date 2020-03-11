import React, { Component } from "react";
import {Link} from 'react-router-dom'

import {Menu} from 'semantic-ui-react'

import {connect} from 'react-redux'
import { logout } from "../../Actions/userActions";

import styled from 'styled-components'

const StyledMenu = styled(Menu)`
    height:80px;
    border-radius: 0px !important; 
`


class AdminNavbar extends Component {

  state = {
    activeItem: ''
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
          <Menu.Item as={Link} to="/createItem"
                name='Create Item'
                onClick={this.handleItemClick}
                active={activeItem === 'Create Item'}
          />
          <Menu.Item as={Link} to="/users"
                name='Database of Users'
                onClick={this.handleItemClick}
                active={activeItem === 'Database of Users'}
          />
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

export default connect(null, {logout})(AdminNavbar);