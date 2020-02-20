import React, { Component } from "react";
import {NavLink, Link} from 'react-router-dom'

import {Menu, Segment} from 'semantic-ui-react'

import {connect} from 'react-redux'
import { logout } from "../../Actions/userActions";

class AdminNavbar extends Component {

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
                active={activeItem === 'home'}
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
      </Menu>
    );
  }
}

export default connect(null, {logout})(AdminNavbar);