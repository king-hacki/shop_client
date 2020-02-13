import React from 'react';
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from "react-redux";

import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile'
import Register from './Components/Register'
import PrivateRoute from './Components/PrivateRoute';
import AddNewItem from './Components/AddNewItem'
import DatabaseUsers from './Components/DatabaseUsers'

import store from './store'
import Navbar from './Components/Navbar/Navbar';

import {loadUser} from './Actions/userActions'

import { ToastContainer, toast } from 'react-toastify';


toast.configure();

export default class App extends React.Component {

  componentWillMount(){
    store.dispatch(loadUser())
  }

  notify = () => {toast.error("err.response.data.message", {
    position:toast.POSITION.TOP_CENTER
})
  }

  render(){
    return (
        <Provider store={store}>
          <Router>
          <Navbar />
          <Switch>
             <PrivateRoute exact path="/profile" component={Profile} />
             <PrivateRoute exact path="/home" component={Home} />
             <PrivateRoute exact path="/createItem" component={AddNewItem} />
             <PrivateRoute exact path="/users" component={DatabaseUsers} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} />
          </Switch>
          </Router>
        </Provider>
    );
  }

}


ReactDOM.render(<App />, document.getElementById("root"));

