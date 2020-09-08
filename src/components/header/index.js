import React,{Component} from 'react';
import { Modal, Button } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';


import {withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig';
// import {button} from 'antd';
import "./index.less"

 class Header extends Component{
   path =this.props.location.pathname

   //获得原标题
   getTitle= ()=>{
    const path =this.props.location.pathname
    let title
    menuList.forEach(item => {
      if(item.key===path){
        title = item.title 
      }else if(item.children) {
       const ico= item.children.find(ico=>ico.key===path)
       if(ico){
        title = ico.title
       }
      }
    })
    return title
    }

    //退出登录
    state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    //删除user数据
    storageUtils.removeUser()
    memoryUtils.user={}

    // 跳到登录页面
    this.props.history.replace("/login")
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
    //退出登录结束
   
    
    demo = ()=>{
    let title= this.getTitle()
    console.log("title",title)
    }

    componentDidMount(){


    }
    render(){
      const title = this.getTitle()
      const userName=memoryUtils.user.username
      return (
        <div className="header">
        <div className="header-top">
        <div >
        <span>欢迎,&nbsp; {userName} </span>
        <span>
        <Button className="logoutButton" type="primary" onClick={this.showModal}>
         退出
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
          cancelText={"取消"}
          okText={"确定"}


        >
          <p>确定退出吗？</p>
          
        </Modal>
        </span>
        </div>
        </div>
        <div className="header-bottom">
        <div className="bottom-left">{title}</div>
        <div className="bottom-right">
          <span>2020-8-17</span>
          <img src="" alt="天气"></img>
          <span>晴</span>
          <button onClick={this.demo}></button>
        </div>
        </div>
       </div>
         )
      }

 }
   
  
  



  


export default withRouter(Header)