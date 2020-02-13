import React from 'react'
import {NavLink} from 'react-router-dom'

import {logout} from '../../Actions/userActions'

import {connect} from 'react-redux'

const UserNavbarLinks = ({logout}) => {
    return(
        <ul className="right">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/ShoppingCart">Shopping Cart</NavLink></li>
            <li><NavLink to="/login" onClick={logout}>Log out</NavLink></li>
        </ul>
    )
}

export default connect(null, {logout})(UserNavbarLinks);