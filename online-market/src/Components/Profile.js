import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Profile extends Component {
    
    static propTypes = {
        user : PropTypes.object.isRequired
    }

    render(){
        console.log("PREVIT")
        return(
            <div>
                <h1>Profile</h1>
                <p>{this.props.user.username}</p>
                <p>{this.props.user.email}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user 
});

export default connect(mapStateToProps)(Profile)