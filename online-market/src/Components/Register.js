import React, {Component} from 'react';
import {Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {registerUser} from '../Actions/userActions'


export class Register extends Component {
    state = {
        email : "",
        firstName: "",
        lastName: "",
        password : "",
        username : ""
    }

    static propTypes = {
        registerUser : PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const {email, firstName, lastName ,password, username} = this.state;
        
        const newUser = {
            email,
            firstName,
            lastName,
            username,
            password
        }

        this.props.registerUser(newUser);
    }

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    });

    render(){
        if(this.props.user_registered){
            return <Redirect to="/login" />;
        }
        const { email,firstName, lastName ,username, password } = this.state;
            return (
                <div className="col-md-6 m-auto">
                  <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                          type="username"
                          className="form-control"
                          name="username"
                          onChange={this.onChange}
                          value={username}
                        />
                      </div>
                      <div className="form-group">
                        <label>first-Name</label>
                        <input
                          type="firstName"
                          className="form-control"
                          name="firstName"
                          onChange={this.onChange}
                          value={firstName}
                          />
                      </div>
                      <div className="form-group">
                        <label>last-Name</label>
                        <input
                          type="lastName"
                          className="form-control"
                          name="lastName"
                          onChange={this.onChange}
                          value={lastName}
                          />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={this.onChange}
                          value={email}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={this.onChange}
                          value={password}
                        />
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      </div>
                      <p>
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </form>
                  </div>
                </div>
              );
            }
          }

const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.isAuthenticated,
    userRegistered: state.userReducer.userRegistered,
})

export default connect(mapStateToProps, {registerUser}) (Register);