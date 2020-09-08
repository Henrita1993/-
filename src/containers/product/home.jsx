import React,{Component} from 'react';
import {Card,Button,Select,Input,Table,message} from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'
const {Option} = Select


/*商品管理 主页面*/

export default class ProductHome extends Component{
  state={
    products:[],
    total:0,//总页面数
    loading:false,
    // 按名称、描述搜索
    searchName:"",
    searchType:"name",
    pageNum:1,//当前所在页面数
  
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  // 初始化table的列
  initColumns=()=>{
    this.columns=[
      {
        title: '商品名称',
        dataIndex: 'name',
        
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        render:(product)=>"$"+product.price
      },
      {
        title: '状态',
        width:100,
        render:(product)=>{ {/*1是在售*/}
        const {status,_id}=product
        const newStatus = status===1?2:1
          return(
            <span>
            <Button type="primary"
             onClick={() => this.updateStatus(_id,newStatus)} 
             >{status===1?"下架":"上架"}</Button> 
            <span>{status===1?"在售":"已下架"}</span>
            </span>
          )
           
        }
      },
      {
        title: '操作',
        width:100,
        render:(product)=>{
          return (
            <span>
           {/*将product对象传到路由组件里的location-state */} 
            <LinkButton onClick={()=>this.props.history.push("/product/detail",{product})}>详情</LinkButton>
            <LinkButton onClick={()=>this.props.history.push("/product/addupdate",{product})}>修改</LinkButton>
            </span>
          )
           
        }
      },
    ]
       
  }

  render(){
    const {products,total,loading,searchType,searchName}=this.state
   
   //表格左边
    const title=(
      <span>
      <Select value={searchType}  style={{ width: 150 }} onChange={value=>this.setState({searchType:value})}>
      <Option value="name">按名称搜索</Option>
      <Option value="dec">按描述搜索</Option> 
      </Select>
      <Input placeholder="关键字" style={{width:"150px",margin:"0 15px"}} value={searchName}  onChange={e=>this.setState({searchName:e.target.value})} />
      <Button type="primary" onClick={()=>{this.getProducts(1)}}>搜索</Button> {/*this指向就用()=>{} */}
      </span> 

    )
    // 表格右边
    const extra=(
      <Button type="primary" onClick={()=>{this.props.history.push("/product/addupdate")}}>
      <PlusOutlined />
      添加商品
      </Button>
      
    )

    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
      <Table bordered loading={loading}
      pagination={{
        current:this.pageNum,
        total,
         defaultPageSize:PAGE_SIZE , 
        showQuickJumper:true,
        onChange: this.getProducts //点击时候传递点击页码
        
      }} //分页器
       rowKey="_id" 
       columns={this.columns} 
       dataSource={products}
        />
      
    </Card>
       )

    }
  //获得指定页数的产品或者按要求搜索
  getProducts = async(pageNum)=>{
    //this.pageNum是当前你想去的页面数
    this.pageNum=pageNum
    this.setState({loading:true,pageNum})
  
    let result
    const {searchName,searchType}=this.state
    if(searchName){
      result = await reqSearchProducts(pageNum,1,searchName,searchType)
    }else{
      result = await reqProducts(pageNum,3)

    }     
    this.setState({loading:false})

    if(result.status===0){
      const {total,list}=result.data
      this.setState({products:list,total})
    }
     
  }
  //更新产品状态
  updateStatus=async(productId,status)=>{

    console.log("object",productId,status,"aaaaaaaaa")
     const result = await reqUpdateStatus(productId,status)
     console.log("result",result)
     if (result.status===0){
       message.success("产品状态更新成功")
       const {pageNum}=this.state
       this.getProducts(pageNum)
     }
  }



}