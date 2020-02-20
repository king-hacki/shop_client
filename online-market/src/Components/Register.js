import React, {Component} from 'react';
import {Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {registerUser} from '../Actions/userActions'
import { toast } from 'react-toastify';

import { Button, Header, Message,Input,Form, Grid, Segment} from 'semantic-ui-react'


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
        if(this.props.userRegistered){
            return <Redirect to="/login" />;
        }
        return(
          <Grid centered columns={2}>
            <Grid.Column>
              <Segment textAlign='center' size={'small'} style={{marginTop:20}}>
                <Header style={{color:'#00008B'}} as={'h2'}>REGISTER</Header>
                <Segment style={{height: 500}}>
                  <Form>
                <Form.Input name="username" onChange={this.onChange} fluid placeholder='E-mail address'/>
                <Form.Input
                      style={{marginTop:20}}
                      name="password" onChange={this.onChange}
                      fluid
                      placeholder='Password'
                      type='password'
                />
                <Form.Input
                      style={{marginTop:20}}
                      name="firstName" onChange={this.onChange}
                      fluid
                      placeholder='First Name'
                />
                <Form.Input
                      style={{marginTop:20}}
                      name="lastName" onChange={this.onChange}
                      fluid
                      placeholder='Last Name'
                />
                <Form.Input
                      style={{marginTop:20}}
                      name="email" onChange={this.onChange}
                      fluid
                      placeholder='E-mail'
                />
                <Form.Button style={{marginTop:15}} color='teal' fluid onClick={this.onSubmit}> Sign Up</Form.Button>
                </Form>
                </Segment>
              </Segment>
              <Message>
              If you are already registered click <a href='/login'>here</a>
              </Message>
            </Grid.Column>
          </Grid>
              );
            }
          }

const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.isAuthenticated,
    userRegistered: state.userReducer.userRegistered,
})

export default connect(mapStateToProps, {registerUser}) (Register);