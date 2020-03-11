import React from 'react';

import {Redirect} from "react-router-dom";

import {loginUser} from '../Actions/userActions';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import {Header, Message,Form, Grid, Segment} from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css";


class Login extends React.Component {

    state = {           
        username: "",
        password: ""
    }
    
    static propTypes = {
        loginUser : PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password);
    }

    onChange = e =>{
       this.setState({
        [e.target.name] : e.target.value
    });
  }

    render(){
        if(this.props.isAuthenticated){
            return <Redirect to="/home" />;
        }
        return (
          <Grid centered columns={2} style={{marginTop:20}}>
            <Grid.Column>
              <Segment textAlign='center' size={'huge'} style={{marginTop:20}}>
                <Header style={{color:'#00008B'}} as={'h2'}>LOGIN</Header>
                <Segment style={{height: 300}}>
                  <Form size="huge">
                <Form.Input  name="username" onChange={this.onChange} fluid icon='user' iconPosition='left' placeholder='Username'/>
                <Form.Input
                      style={{marginTop:20}}
                      name="password" onChange={this.onChange}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                />
                <Form.Button style={{marginTop:40}} size="large" color='teal' fluid onClick={this.onSubmit}> Sign in</Form.Button>
                </Form>
                </Segment>
              </Segment>
              <Message>
              New to us? <a href='/register'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.userReducer.isAuthenticated
})

export default connect(mapStateToProps, {loginUser})(Login)