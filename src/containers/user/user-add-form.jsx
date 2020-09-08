import React,{ PureComponent} from 'react';
import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button,Select } from 'antd';
 import PropTypes from 'prop-types'

const { Option } = Select;
const { Item } = Form;

/*添加用户的form组件 */
 class UserAddForm extends PureComponent{
  demo=()=>{
    const form = this.props.form
   console.log(form.getFieldsValue())

    }

   static propTypes={
     setForm:PropTypes.func.isRequired,
     roles:PropTypes.array.isRequired,

   }

   componentWillMount(){
       //将form传出去
    this.props.setForm(this.props.form)
   }


  render(){
      const {roles}=this.props
    const {getFieldDecorator}=this.props.form
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
   

    return (
        <Form>
        <Button onClick={this.demo}>点我</Button>
        <Item label="用户名" {...layout}>
        {
          getFieldDecorator("username",
          {initialValue:"",
          }
          )(
            <Input placeholder="请输入用户名" />
          )
        }  
        </Item>
  
        <Item label="密码" {...layout}>
       {
        getFieldDecorator("password",
        {initialValue:"",
        }
        )(
          <Input type="password" placeholder="请输入密码" />
        )
      }  
       </Item>
        
        <Item label="手机号" {...layout}>
        {
          getFieldDecorator("phone",
          {initialValue:"",
          }
          )(
            <Input type="number" placeholder="请输入手机号" />
          )
        }  
        </Item>
        <Item label="邮箱" {...layout}>
        {
          getFieldDecorator("email",
          {initialValue:"",
          }
          )(
            <Input placeholder="请输入邮箱" />
          )
        }  
        </Item>
        <Item label="角色" {...layout}>
        {
          getFieldDecorator("role_id",
          {initialValue:"",
          
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

export default Form.create()(UserAddForm)