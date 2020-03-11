import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import {Image, Segment, Dimmer, Loader} from 'semantic-ui-react'

const PrivateRoute = ({component: Component,users,...rest }) => (
    <Route
        {...rest}
        render={ props => {
            if (users.isLoading) {
                return (
                <Segment>
                <Dimmer active inverted>
                  <Loader inverted content='Loading' />
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Segment>
                )
              } else if(!users.isAuthenticated && !users.isLoading){
                return <Redirect to="/login" />
            }else{
                return <Component {...props} />
                }
            }
        }
    />
)

const mapStateToProps = state => ({
    users : state.userReducer
});

export default connect(mapStateToProps)(PrivateRoute);