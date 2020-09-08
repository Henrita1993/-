import React,{Component} from "react"
import { Form, Input, Button, Checkbox ,message} from 'antd'
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom';
// 容器组件只要引用action即可
import {saveUserInfoAction} from "../../redux/action_creators/login_action.js"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less"
import logo from "../../assets/images/logo.png"
import {reqLogin} from "../../api/index"
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
const Item = Form.Item


 class Login extends Component{
  componentDidMount(){
    console.log(this.props);

   }
   
 
  render () {

    // 表单提交成功与否得到的promise对象

    const onFinish = async(values) => {
      const {username,password} = values
      console.log(values)

      // 发起登录请求,await得到promise对象 
      let result= await reqLogin(username,password)
      console.log("请求成功返回结果：",result);
      const {status,msg}=result
      //请求成功
      if(status === 0){
        const user = result.data
        console.log("返回的user",user)
        // 保存user到local
        memoryUtils.user= user
        console.log("local里的",memoryUtils.user)

        
        //通过storageUtils将user保存到store里面
        storageUtils.saveUser(user)
        console.log("response success");
        message.success("登录成功",2)
         // 服务器返回的数据交给redux保管
         this.props.saveUserInfo(user)
        // 转到admin页面
        this.props.history.replace("/admin")
      }else{
        // const {msg}=result.data
        message.warning(msg,1)
      }
     
    };

    // 若本身已登录状态，保持登录样子
    if(memoryUtils.user&&memoryUtils.user._id){
      return <Redirect to="/admin"/>
    }


  // 表单提交失败，数据从表单出去失败
    const onFinishFailed = errorInfo => {
      message.error("表单输入有误，请重新输入",2)
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
       onFinishFailed={onFinishFailed}
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
  state => ({}),
  {
    saveUserInfo:saveUserInfoAction

  }
)(Login)

