import React,{Component,useState} from 'react';
import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button,Select,Tree } from 'antd';
 import PropTypes from 'prop-types'
 import menuList from '../../config/menuConfig'
import { TreeNode } from 'antd/lib/tree-select';

const { Option } = Select;
const { Item } = Form;

const treeData =[
    {
        title:"平台权限",
        key:"all",
        children:menuList
    
    }

] 
    

 export default  class AuthForm extends Component{
     state={
        checkedKeys:[]
     }

//接收传入参数role
  static propTypes={
     role:PropTypes.object.isRequired
   }
//    只做一次渲染 根据传入的role确定this.state: checkedKeys

    constructor(props){
        super(props)
        const {menus}= this.props.role
        this.state={
            checkedKeys:menus
        }

    }

    // initeRoles=()=>{
    //     const {menus}= this.props.role
    //     this.setState={
    //         checkedKeys:menus
    //     }
    // }

// 渲染列表
   componentWillMount(){
    //    this.initeRoles()
   }
   //接收的参数变化时候1，刷新状态2.触发下面
   componentWillReceiveProps(nextProps){
       const {menus}=nextProps.role
       this.setState({checkedKeys:menus})
   }

  
  render(){
    const {menus,}=this.props.role
    const {role,}=this.props
    const {checkedKeys}= this.state
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
      


    return (
        <div>
            <Item label="角色名称" {...layout}>
                <Input value={role.name} disabled />
                <Button onClick={this.demo}>点我</Button>
            </Item>
       
            <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
            defaultSelectedKeys={menus}
            // onSelect={this.checkSelect}
           
            treeData={treeData}
          />
         
        </div>   
    )
    }
    onCheck=(checkedKeys) => {
        this.setState({checkedKeys})
      };
    //单选一行------------------------------------------------问题选一行可以被√
    checkSelect=(checkedKey)=>{
       this.setState(state=>({
        checkedKeys:[...state.checkedKeys,checkedKey]
       }))

        console.log("checkedKeys",this.state.checkedKeys)

    }

    //得最新的checkedKeys
    getMenus=()=>{
       return this.state.checkedKeys
    }


}

