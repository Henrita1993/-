import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Login from "./containers/login/login.jsx"
import Admin from "./containers/admin/admin.jsx"
// import { Button } from "antd"
// import { Button, Tooltip } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';


import "./App.less"

export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <Switch>
      <Route path="/" component={Login}/> 
      <Route path="/admin" component={Admin}/>
      </Switch>
      </BrowserRouter>
    )
  }

}




