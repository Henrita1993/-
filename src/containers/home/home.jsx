import React,{Component} from 'react';
import "./home.less";

export default class Home extends Component{
  render(){
   const  demo=()=>{
    console.log("this",this)
    }
    return (
      <div className="home" >
      欢迎使用后台管理系统

      </div>
       )
    }
}