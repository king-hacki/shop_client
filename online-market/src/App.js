import React from 'react';
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from "react-redux";

import Home from './Components/Common/Home';
import Login from './Components/Common/Login';
import Profile from './Components/User_page/Profile'
import Register from './Components/Common/Register'
import PrivateRoute from './Components/Common/PrivateRoute';
import AddNewItem from './Components/Admin_page/AddNewItem'
import DatabaseUsers from './Components/Admin_page/DatabaseUsers'
import ShoppingCart from './Components/User_page/ShoppingCart'
import store from './store'
import Navbar from './Components/Navbar/Navbar';
import {loadUser} from './Actions/userActions'

import {toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'; 
import 'semantic-ui-css/semantic.min.css'

import Phone from './Components/phone_page/Phone'
import Footer from './Components/Common/Footer';


toast.configure();

export default class App extends React.Component {

  //  don't scroll to the top after render component
  componentDidMount() {
    window.scrollTo(0, 0)
  }

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
             <PrivateRoute path="/home/:id" component={Phone} />
             <PrivateRoute exact path="/createItem" component={AddNewItem} />
             <PrivateRoute exact path="/users" component={DatabaseUsers} />
             <PrivateRoute exact path="/shoppingCart" component={ShoppingCart} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} />
          </Switch>
          <Footer/>
          </Router>
        </Provider>
    );
  }

}


ReactDOM.render(<App />, document.getElementById("root"));

