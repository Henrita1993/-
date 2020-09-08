import React,{Component} from 'react';
import { Card, Button,Table, Space ,Modal,message} from 'antd';
import {reqUsers,reqDeleteUser,reqAddUser,reqUpdateUser} from "./../../api";
import LinkButton from "../../components/link-button";
import {formateDate} from '../../utils/dateUtils';
import UserAddForm from "./user-add-form"
import UserUpdateForm from "./user-update-form"
const { confirm } = Modal;




export default class User extends Component{
  state={
    users:[],//所有用户列表
    roles:[],//所有角色列表
    isAddShow:false,//是否显示添加用户框
    isUpdateShow:false //修改用户框是否显示
  }
  // 根据role分组，变成 ID：name格式====================================很最重要===============================
  initRoleNames=(roles)=>{
     const roleNames = roles.reduce((pre,role)=>{
       pre[role._id]=role.name
       return pre
     },{}
     )
    //  保存
    this.roleNames=roleNames
  }
 
  // 表格列的初始化
  initColumns=()=>{
     this.columns=[
       {title:"用户名",
       dataIndex:"username",

       },
       {title:"邮箱",
       dataIndex:"email",

       },
       {title:"电话",
       dataIndex:"phone",
       },
       {title:"注册时间",
       dataIndex:"create_time",
       render:formateDate//时间格式化
       },
       {title:"所属角色",
       dataIndex:"role_id",
       render:(role_id)=>this.roleNames[role_id] 
      
       },
       {title:"操作",
       render: (user) => (
         <span>
         <LinkButton onClick={()=>this.showUpdate(user)} > 修改</LinkButton>       
          <LinkButton  onClick={()=>this.deleteUser(user)}   > 删除</LinkButton>
         </span>
       )
      }
     ]
  }
  componentWillMount(){
    this.initColumns()
  }
  
  componentDidMount(){
    this.getUsers()
    console.log("this",this)
  }
  render(){

    const {users,isAddShow,roles,isUpdateShow} = this.state
    const user = this.user //有是修改无则添加
    const title=(<Button type="primary" onClick={()=> this.setState({isAddShow:true})}> 创建用户</Button>)
    return (
      <div>
      <Card title={title}>
        <Table
          dataSource={users} 
          columns={this.columns} 
          bordered 
          rowKey="_id"
          pagination={{defaultPageSize:3 }} 
          />

          <Modal
          title="添加用户" 
          visible={isAddShow}
          onOk={this.addUser}
          onCancel={ this.cancel}
          okText="确定"
          cancelText="取消"
          >
          <UserAddForm setForm={form=>this.form=form}  roles={roles}  />
          </Modal>
          
          <Modal
          title="修改用户" 
          visible={isUpdateShow}
          onOk={this.UpdateUser}
          onCancel={ this.cancel}
          okText="确定"
          cancelText="取消"
          >
          <UserUpdateForm setForm={form=>this.form=form}  roles={roles} user={user} />
          </Modal>

     </Card>

      </div>
     
       )
    }
     // 获取用户列表
  getUsers=async()=>{
    const result = await reqUsers()
    if(result.status===0){
      const {users,roles}=result.data
      //形成角色ID与名对应
      this.initRoleNames(roles)
      this.setState({users,roles})
    }
 }
  // 确定修改用户
  UpdateUser=async()=>{
    this.setState({isUpdateShow:false})
    const user = this.form.getFieldsValue()
    user._id=this.user._id
    console.log("updateuser",user)
    const result = await reqUpdateUser(user)
    this.form.resetFields()

    if(result.status===0){

     message.success("修改用户成功")
     this.getUsers()
    }else{
      message.error(result.msg)
    }
  }
  //删除指定用户
  deleteUser=(user)=>{
    confirm({
      title: `确定要删除${user.username}吗？`,
      onOk:async()=>{
        const result = await reqDeleteUser(user._id)
        if(result.status===0){
        message.success("删除用户成功！")
        this.getUsers()
        }
      },
     
    })
  }
  //确定添加用户
  addUser=async()=>{
    this.setState({isAddShow:false})

    // 1.收集输入数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()

    console.log("adduser",user)
    // 2.提交请求
    const result = await reqAddUser(user)
    if(result.status===0){
    message.success("添加用户成功")
    this.getUsers()
    }else{
      message.error(result.msg) 
    }

  }
  // 修改用户
  showUpdate=(user)=>{
    this.setState({isUpdateShow:true})
    //保存当前处理的user,有是修改 无则添加
    this.user=user
  }
  //取消
  cancel=()=>{
     this.setState({isAddShow:false})
     this.setState({isUpdateShow:false})
     this.form.resetFields()
  }
}