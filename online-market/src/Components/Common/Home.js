import React from 'react'

import HomeUser from '../User_page/HomeUser'
import HomeAdmin from '../Admin_page/HomeAdmin.js'

import {connect} from 'react-redux'

class Home extends React.Component {

    render(){
        console.log(this.props.user.role === "ROLE_USER" || this.props.user.role)
        return(
            <div>
                {this.props.user.role === "ROLE_USER" || this.props.user.role === "user" ? <HomeUser /> : <HomeAdmin/>}
            </div>
        );
    } 
}

const mapStateToProps = state => ({
    user: state.userReducer,
});

export default connect(
    mapStateToProps,
)(Home);