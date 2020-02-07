import React from 'react';
import ReactDOM from "react-dom";

import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from "react-redux";

import Home from './Components/Home';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';

import store from './store'
import Navbar from './Components/Navbar';


export default class App extends React.Component {
  render(){
    return (
        <Provider store={store}>
          <Router>
          <Navbar />
          <Switch>
             <PrivateRoute exact path="/" component={Home} />
             <Route exact path="/login" component={Login} />
          </Switch>
          </Router>
        </Provider>
    );
  }

}


ReactDOM.render(<App />, document.getElementById("root"));

