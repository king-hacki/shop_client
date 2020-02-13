import React, { Component } from "react";
import {Link} from 'react-router-dom'


import NavbarLinks from './AdminNavbarLinks'

class AdminNavbar extends Component {

render() {
  return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">Online-market</Link>
          <NavbarLinks />
        </div>
      </nav>

    );
  }
}

export default AdminNavbar;