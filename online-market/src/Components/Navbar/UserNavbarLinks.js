import React from 'react'
import {NavLink} from 'react-router-dom'

const UserNavbarLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/login">Sign in</NavLink></li>
            <li><NavLink to="/">Log out</NavLink></li>
        </ul>
    )
}

export default UserNavbarLinks;