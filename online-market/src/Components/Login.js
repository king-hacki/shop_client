import React from 'react';

import {Link, Redirect} from "react-router-dom";

import {loginUser} from '../Actions/userActions';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import { Button, Header, Message,Input,Form, Grid, Segment} from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css";


import "../App.css";

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
        console.log(this.state)
        this.props.loginUser(this.state.username, this.state.password);
    }

    onChange = e =>{
      console.log(e.target.name)
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
                  <Form>
                <Form.Input name="username" onChange={this.onChange} fluid icon='user' iconPosition='left' placeholder='Username'/>
                <Form.Input
                      style={{marginTop:20}}
                      name="password" onChange={this.onChange}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                />
                <Form.Button style={{marginTop:115}} color='teal' fluid onClick={this.onSubmit}> Sign in</Form.Button>
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