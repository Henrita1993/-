import React,{Component} from "react"
import { Layout } from 'antd';
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom';
import {deleteUserInfoAction} from "../../redux/action_creators/login_action.js"
// import {reqCategoryList} from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
// import "./admin.less"
const { Footer, Sider, Content } = Layout;

 class Admin extends Component{
    componentDidMount(){
        console.log(this.props);
    }

    // logOut=()=>{
    // this.props.deleteUserInfo()
    // }
// 请求商品列表
    // demo = async()=>{
    //     let result=await reqCategoryList()
    //     console.log(result)
    
    
    render(){
        //到管理页面，先看 本地是否有user，没有就转到登录页面
        const user = memoryUtils.user//data+status

        if (!user._id){
            return <Redirect to ="/login"/>

        }else{
            return(
                <Layout style={{minHeight:"100%"}}>
                <Sider>
                <LeftNav/>
                </Sider>
                <Layout>
                  <Header>Header</Header>

                  <Content style={{margin:"20px", backgroundColor:"#fff"}} >
                  <Switch > 
                  <Redirect exact from='/' to='/home'/>
                  <Route path='/home' component={Home}/>
                  <Route path='/category' component={Category}/>
                  <Route path='/product' component={Product}/>
                  <Route path='/role' component={Role}/>
                  <Route path='/user' component={User}/>
                  <Route path='/charts/bar' component={Bar}/>
                  <Route path='/charts/line' component={Line}/>
                  <Route path='/charts/pie' component={Pie}/>
                  
                   {/*<Route component={NotFound}/>上面没有一个匹配, 直接显示*/}
                   
                    </Switch>
                 
                    
                  </Content>
                  <Footer style={{backgroundColor:"#aaaaaa"}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
              </Layout>
            )
        }
        // const {data,isLogin} = this.props.userInfo
        // if(!isLogin){
        //     // 自动跳转其他页面，Redirect组件 react-router-dom
           
        // }
       
    }
}



export default connect(
    // 从redux中获取state
    state=>({userInfo:state.userInfo}),
    {
        // 操作redux中state方法
        deleteUserInfo:deleteUserInfoAction
    }

)(Admin)


