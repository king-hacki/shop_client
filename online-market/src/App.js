import React from 'react';
import ReactDOM from "react-dom";



import { Provider } from "react-redux";

import Home from './Components/Home'

import store from './store'


export default class App extends React.Component {
  render(){
    return (
        <Provider store={store}>
          <Home></Home>
        </Provider>
    );
  }

}


ReactDOM.render(<App />, document.getElementById("root"));

