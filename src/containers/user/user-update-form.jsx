import React,{ PureComponent} from 'react';
import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button,Select } from 'antd';
 import PropTypes from 'prop-types'

const { Option } = Select;
const { Item } = Form;

/*添加用户的form组件 */
 class UserUpdateForm extends PureComponent{
  
   static propTypes={
     setForm:PropTypes.func.isRequired,
     roles:PropTypes.array.isRequired,
     user:PropTypes.object.isRequired,
   }

   componentWillMount(){
       //将form传出去
    this.props.setForm(this.props.form)
   }


  render(){
      const {roles,user}=this.props
    const {getFieldDecorator}=this.props.form
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
   

    return (
        <Form>
        <Item label="用户名" {...layout}>
        {
          getFieldDecorator("username",
          {initialValue:user.username,
          }
          )(
            <Input placeholder="请输入用户名" />
          )
        }  
        </Item>
        
        <Item label="手机号" {...layout}>
        {
          getFieldDecorator("phone",
          {initialValue:user.phone,
          }
          )(
            <Input type="number" placeholder="请输入手机号" />
          )
        }  
        </Item>
        <Item label="邮箱" {...layout}>
        {
          getFieldDecorator("email",
          {initialValue:user.email,
          }
          )(
            <Input placeholder="请输入邮箱" />
          )
        }  
        </Item>
        <Item label="角色" {...layout}>
        {
          getFieldDecorator("role_id",
          {initialValue:user.role_id,
          
          }
          )(
              <Select>
              {
                  roles.map(role=><Option value={role._id} key={role._id}>{role.name} </Option> )
              }
              </Select>
          )
        }  
        </Item>
       
        </Form>
    
    )
    }
}

export default Form.create()(UserUpdateForm)