import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component,users,...rest }) => (
    <Route
        {...rest}
        render = { 
            props => {
                // console.log(Component)
                // console.log(users);
                // console.log("USER AUTHENTICATED FROM PRIVATE_ROUTE:" + users.isLoading)
                // console.log("USER AUTHENTICATED FROM PRIVATE_ROUTE:" + users.isAuthenticated)
                if (users.isLoading) 
                    return <h2>Loading...</h2>;

                 else 
                 
                    if(!users.isAuthenticated) 
                        return <Redirect to="/login" />

                     else {
                        // console.log('hello from privateroute above <Component {...props}/>');
                        // console.log(<Component {...props}/>);
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