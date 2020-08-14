import React,{Component} from "react"
import { Form, Input, Button, Checkbox } from 'antd'
import {connect} from "react-redux"
import {createDemo1Aciton,createDemo2Aciton} from "../../redux/action_creators/test_action.js"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less"
import logo from "./imgs/logo.png"
const Item = Form.Item


 class Login extends Component{
  componentDidMount(){
    console.log(this.props);
    console.log(this.form);

}
  handleSubmit=()=>{
  console.log("i submit")
  }
 
  render () {

    // 得到组件值
      const onFinish = values => {
        console.log('Received values of form: ', values);
      };

    return (
      <div className="login">
     
        <header className="header">
        <img src={logo} alt="logo"/>
        <h1>商品管理系统</h1>
        </header>

        <section className="content">
        <h3>用户登录</h3>
        <Form name="normal_login" 
        className="login-form"   
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        >
          <Item 
          name="username"
           /*
                用户名/密码的的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是字母、数字、下划线组成
                */
          rules={[
            {required: true, message: '用户名必须输入'},
            {min:4,message:"必须大于等于4位"},
            {max:12,message:"必须小于等于12位"},
            {pattern:/^\w+$/,message:"必须是字母、数字、下划线组成"}
          
          ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:"rgba(0,0,0,.25)"}} />} placeholder="用户名" />

          </Item>
         
          <Item 
          name="password"
          rules={[
            {required: true, message: '密码必须输入'},
            {min:4,message:"必须大于等于4位"},
            {max:12,message:"必须小于等于12位"},
            {pattern:/^\w+$/,message:"必须是字母、数字、下划线组成"}
          
          ]}
          >
          <Input
          prefix={<LockOutlined className="site-form-item-icon" style={{color:"rgba(0,0,0,.25)"}}/>}
          type="password"
          placeholder="Password"
        />
          </Item>

        <Item>  
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Item>
        <a className="login-form-forgot" href="">
        忘记密码
        </a>
        </Item>
         

          <Item className="form-bottom">
          <Button type="primary" htmlType="submit" className="login-button">
            登录
          </Button>
        
          </Item>
      

        </Form>
        
        </section>

    </div>

    ) 
  }

}
// connect直接使用state里数据
export default connect(
  state => ({demo:state.test}),
  {
    demo1:createDemo1Aciton,
    demo2:createDemo2Aciton
  }
)(Login)

