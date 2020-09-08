import React,{Component} from 'react';
import { Card, Button,Table, Space ,Modal,message} from 'antd';
// import { Icon } from '@ant-design/compatible';
import {reqRoles,reqAddRole,reqUdateRole} from "./../../api";
import LinkButton from "../../components/link-button";
import {ArrowRightOutlined} from '@ant-design/icons';
import AddForm from './add-form';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils';
import UpdateForm from '../category/update-form';
import {PAGE_SIZE} from '../../utils/constants.js'
import storageUtils from '../../utils/storageUtils';

import {formateDate} from '../../utils/dateUtils';



export default class Role extends Component{
  state={
    roles:[],//所有角色
    role:{},//选中的role
    isShowAdd:false,//是否显示添加界面
    isShowAuth:false//是否显示权限
  }
  constructor(props){

    super(props)
    //auth为整个组件
    this.auth=React.createRef()
  }
   // 初始化所有列，为第一次render准备数据
   initColumns = ()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:formateDate
        
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:formateDate

        
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        
      },
  
    ];
  }
  
// 初始化（列，）
componentWillMount(){
  //列项设置
 this.initColumns()
}
//组件加载完毕
componentDidMount(){
  this.getRoles()

}
  render(){
    const {roles,role,isShowAdd,isShowAuth} = this.state
    const title = (
      <span>
     <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;&nbsp;
     <Button type="primary" disabled={role._id?false:true} onClick={()=>this.setState({isShowAuth:true})}>设置角色权限</Button>
      </span>
    )

    return (
      <div>
      <Card title={title} style={{ width: "100% "}}>
      <Table
      // loading={loading}
       dataSource={roles } 
       columns={this.columns} 
       bordered 
       rowKey="_id"
       pagination={{defaultPageSize:PAGE_SIZE}} 
       rowSelection={{
         type:"radio",
         selectedRowKeys:[role._id],
         onSelect:(role)=>{//手动选择或取消这一行的回调
          this.setState({role})
         }
        }}
       onRow={this.onRow}// 点击行的回调
        
       />
       
       <Modal
       title="添加角色"
       visible={isShowAdd}
       onOk={this.addRole}
       onCancel={()=>{
         this.setState({isShowAdd:false,})
         this.form.resetFields()
       }}
       okText="确定"
       cancelText="取消"
       >
       <AddForm setForm={(form)=>{this.form=form }}  /> 
       </Modal>
        
       <Modal
       title="设置角色权限" 
       visible={isShowAuth}
       onOk={this.updateRole}
       onCancel={()=>{
         this.setState({isShowAuth:false,})
       }}
       okText="确定"
       cancelText="取消"
       >
       <AuthForm role={role} ref={this.auth} /> 
       </Modal>



       </Card>
      </div>
       )
    }
//行状态改变触发
onRow=(role)=>{
  return {onClick: event => {//点击行
    this.setState({role})

  },}
}
//获取用户列表,将所有列表更新后台
getRoles=async()=>{
   let result = await reqRoles()
   if(result.status===0){
     const roles=result.data
     this.setState({roles})
   }
}
//添加角色
addRole=()=>{
  // 表单验证，通过才能往下
  this.form.validateFields(async(error,values)=>{
    if(!error){
      // 消失框
      this.setState({isShowAdd:false})
      // 1.收集数据
      const {roleName} = values
      // 2.添加请求
      let result = await reqAddRole(roleName)
      if(result.status===0){
      // 3、根据结果显示
          message.success("添加角色成功！")
          //重新获取角色列表，更新状态
          this.getRoles()
          
          }else{
            message.error("添加角色失败！")
          }
      
    }
    this.form.resetFields()
}
  )

}

// 修改角色权限
updateRole=async()=>{
  const {role} = this.state
  this.setState({isShowAuth:false})
  //得到最新的role。menu
  const menus=this.auth.current.getMenus()
  role.menus=menus
  role.auth_time=Date.now()
  role.auth_name=memoryUtils.user.username


  // 发送修改指令，
  let result = await reqUdateRole(role)
  
  // 根据反馈显示
  if(result.status===0){
    message.success("修改权限成功！")
    // 如果自己权限修改了，自动退出重新登录
    if(role._id===memoryUtils.user.role_id){
      memoryUtils.user={}
      storageUtils.user={}
      this.props.history.replace("/login")
     message.success("当前用户权限已被修改，请重新登录！")
      

    }else{
      // 本质就是将本地state的role更新
      this.getRoles() 
    }
    
    // this.setState(state=>({
    //   roles:[...state.roles,role]
    // }))
  }else{
    message.error("修改权限失败！")
  }

}


}