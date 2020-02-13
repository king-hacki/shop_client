import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminNavbarLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/createItem">New Item</NavLink></li>
            <li><NavLink to="/users">Database of users</NavLink></li>
            <li><NavLink to="/">Log out</NavLink></li>
        </ul>
    )
}

export default AdminNavbarLinks;