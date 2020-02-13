import React from 'react'

import AdminNavbar from './AdminNavbar'
import UserNavbar from './UserNavbar'

import {connect} from 'react-redux'

class Navbar extends React.Component {

    render(){
        return(
            <div>
                {this.props.user.role == "user" ? <UserNavbar /> : <AdminNavbar/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer,
});

export default connect(
    mapStateToProps,
)(Navbar);