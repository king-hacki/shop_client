import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {savePhoto} from '../Actions/userActions'

class Profile extends Component {
    
    state = {
        file : null
    }

    static propTypes = {
        user : PropTypes.object.isRequired
    }

    onChange = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })

        this.props.savePhoto(this.state.file)        
    }

    render(){
        console.log("PREVIT")
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-centered">
                        <h1>Profile</h1>        
                        <p>{this.props.user.username}</p>
                        <p>{this.props.user.firstName}</p>
                        <p>{this.props.user.lastName}</p>
                        <p>{this.props.user.email}</p>
                        <input type="file" onChange={this.onChange} />
                        <img src = {this.state.file} />

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user 
});

export default connect(mapStateToProps, {savePhoto})(Profile)