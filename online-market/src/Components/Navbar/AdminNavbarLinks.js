import React from 'react'
import {NavLink} from 'react-router-dom'

import {logout} from '../../Actions/userActions'

import {connect} from 'react-redux'

const AdminNavbarLinks = ({logout}) => {
    return(
        <ul className="right">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/createItem">New Item</NavLink></li>
            <li><NavLink to="/users">Database of users</NavLink></li>
            <li><NavLink to="/login" onClick={logout}>Log Out</NavLink></li>
        </ul>
    )
}

export default connect(null, {logout})(AdminNavbarLinks);