import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Login from "./containers/login/login.jsx"
import Admin from "./containers/admin/admin.jsx"
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
// import { Button } from "antd"
// import { Button, Tooltip } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import "./App.less"



export default class App extends Component {
  render(){
    const user=storageUtils.getUser()
    if(user && user._id){
      memoryUtils.user=user
    }
    return (
      <BrowserRouter>    
      <Switch>
      <Route path='/login' component={Login}></Route>
      <Route path='/' component={Admin}></Route>
      </Switch>
      </BrowserRouter>
    )
  }

}




