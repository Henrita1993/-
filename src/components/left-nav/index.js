import React,{Component} from 'react';
import { Menu, Button} from 'antd';
import { Icon } from '@ant-design/compatible';
import {Link,withRouter} from 'react-router-dom';
import "./index.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig"
import memoryUtils from "../../utils/memoryUtils"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;


class LeftNav extends Component{
  state = {
    collapsed: false,
  };
  componentDidMount(){
    // console.log("left组件",this);
  }
  // 根据menulist生成左侧菜单
  getMenuNode = (menuList)=>{
    //得到当前请求的路由路径
    const path = this.props.location.pathname
    return(
      menuList.map(item=>{
        // 如果当前用户的item有对应权限，才显示
        if(this.hasAuth(item)){
          if(!item.children){
            // this.openKey=item.find(e=>e.key===this.path)
            return (
              <Menu.Item key={item.key} >
              <Icon type={item.icon}/>
              <Link to={`${item.key}`}>{item.title}</Link>
              </Menu.Item> 
            )
          }else{
            // this.openKey= item.children.find(item=>item.key===this.path)  
            // console.log('openKey',this.openKey);       
            return(
              <SubMenu key={item.key} title={<span>
                 <Icon type={item.icon}/>
                 <span>{item.title}</span>
                 </span> 
                }>
               {this.getMenuNode(item.children)}
             </SubMenu>
            )
          } 

        }


       
      })      
    ) 
  } 
  //判断item对该用户是否有权限
  hasAuth=(item)=>{
     //取当前用户的变量
     const {key , isPubilc} = item
     //当前用户的menus
     const menus =memoryUtils.user.role.menus
     const {username}=memoryUtils.user
    //  1，如果用户为admin 
    //  2.此item。isPubilc为公开
    //  3.用户对此item有权限
    //  4.item 的儿子在用户的menus
    if(item.children){
      return item.children.find(child=>menus.indexOf(child.key)!==-1)
    }else if (username==="admin" || isPubilc || menus.indexOf(key)!==-1 ){
      return true
    }else{
      return false
    }
   
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render(){
    //确定当前页面path 根据key确定高亮
  //  let path= this.props.location.pathname.split("/")[1]
   let path= this.props.location.pathname
   const demo=()=>{
    console.log("this.props",this.props.location.pathname)
   
   }
    return (
      // 导航头部
      <div className="left-nav" >
      <Link to="/" className="left-nav-header">
      <img src={logo} alt="logo"/>
      <h1>硅谷后台</h1>
      </Link>
      <Button onClick={demo}>点我</Button>
      
      <div style={{ width: "100%" }}>
      
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={[`${path}`]} //默认高亮选择此项
          // defaultOpenKeys={`${this.openKey.key}`}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
          className="icons-list"
        >
         {this.getMenuNode(menuList)}
          
          </Menu>
      </div>

      </div>
       )
    }
}




// <Menu.Item key="1" className="icons-list">
//           <IconFont  />
//           <Link to="/admin/home">首页</Link>
//           </Menu.Item>       
//           <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
//             <Menu.Item key="5"><Link to="/admin/category">品类管理</Link></Menu.Item>
//             <Menu.Item key="6"><Link to="/admin/product">商品管理</Link></Menu.Item>         
//           </SubMenu>
        
//           <Menu.Item key="user" icon={<PieChartOutlined />}>
//           <Link to="/admin/user">用户管理</Link>
//           </Menu.Item>        
//           <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
//             <Menu.Item key="9"><Link to="/admin/bar">柱形图</Link></Menu.Item>
//             <Menu.Item key="10"><Link to="/admin/line">折线图</Link></Menu.Item>
//             <Menu.Item key="10"><Link to="/admin/pie">饼图</Link></Menu.Item>      
//           </SubMenu>
        
 
export default withRouter(LeftNav)
