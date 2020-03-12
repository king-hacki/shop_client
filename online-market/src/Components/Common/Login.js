import React from 'react';

import {Redirect} from "react-router-dom";

import {loginUser} from '../../Actions/userActions';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import {Header, Message,Form, Grid, Segment} from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css";

import styled from 'styled-components'

const StyledHeader = styled(Header)`
    color:'#00008B'
`

const StyledSegmentFirst = styled(Segment)`
  height:300px !important;
`

const StyledSegmentSecond = styled(Segment)`
  margin-top:20px !important;
`

const StyledFormInput = styled(Form.Input)`
  margin-top:20px !important;
`

const StyledGrid = styled(Grid)`
  margin-top:20px !important;
`

const StyledFormButton = styled(Form.Button)`
  marginTop:40px !important;
`

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
          <StyledGrid centered columns={2}>
            <Grid.Column>
              <StyledSegmentSecond textAlign='center' size={'huge'}>
                <StyledHeader as={'h2'}>LOGIN</StyledHeader>
                <StyledSegmentFirst>
                  <Form size="huge">
                <Form.Input  name="username" onChange={this.onChange} fluid icon='user' iconPosition='left' placeholder='Username'/>
                <StyledFormInput
                      name="password" onChange={this.onChange}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                />
                <Form.Button size="large" color='teal' fluid onClick={this.onSubmit}> Sign in</Form.Button>
                </Form>
                </StyledSegmentFirst>
              </StyledSegmentSecond>
              <Message>
              New to us? <a href='/register'>Sign Up</a>
              </Message>
            </Grid.Column>
          </StyledGrid>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.userReducer.isAuthenticated
})

export default connect(mapStateToProps, {loginUser})(Login)