import React,{Component} from 'react';
import { Card, Button,Table, Space ,Modal,message} from 'antd';
import { Icon } from '@ant-design/compatible';
import {reqCategorys,reqUpdateCategory,reqAddCategory} from "./../../api";
import LinkButton from "../../components/link-button";
import {ArrowRightOutlined} from '@ant-design/icons';
import AddForm from '../category/add-form';
import UpdateForm from '../category/update-form';





export default class Category extends Component{
  state ={
    // Categorys:[],//一级列表数组
    
    Category:[],//一级分类列表
    subCategory: [], // 二级分类列表

    category:{} ,//当前指定品类
   
    loading:false,
    parentId:"0",//当前显示的父级的ID
    parentName:"",
    showStatus:0,//0都不显示 1只显示添加 2只显示分类
  }

// 初始化（列，）
  componentWillMount(){
    //列项设置
   this.initColumns()
  }


  componentDidMount(){
    // 发异步请求表格数据
    this.getCategory() 
  }
 demo=async()=>{
  const result = await reqCategorys(0)
  console.log("result",result)
  
 }
  

  render(){
    //读取状态中数据
    const {Category,loading,parentId,parentName,showStatus,subCategory} = this.state
    const category = this.category || {} //若没有则为空对象
    const title = parentId==="0"?"一级分类列表" : (
      <span>
      <LinkButton onClick={this.showFirstCategory}>一级分类列表</LinkButton>
      <ArrowRightOutlined style={{marginRight:5}}/>
      <span>{parentName}</span>
      </span>
    )
    const extra = (<Button type="primary" size="small" onClick={this.showAddModal}> <Icon type="plus"/>添加</Button>)
  

    return (
      <div>
      <Card title={title} extra={extra} style={{ width: "100% "}}>
      <Table
      loading={loading}
       dataSource={parentId==="0"?Category:subCategory} 
       columns={this.columns} 
       bordered 
       rowKey="_id"
       pagination={{defaultPageSize:3 , showQuickJumper:true}} 
       />

       <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
         <AddForm 
         Category={Category} 
        parentId={parentId} 

        setForm={(form)=>{this.form=form }}  /> 
         
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <UpdateForm categoryName={category.name} 
           setForm={(form)=>{this.form=form }} /> 
          
        </Modal>
    </Card>
    
      </div>
      
       )
  }

    // 初始化所有列，为第一次render准备数据
    initColumns = ()=>{
      this.columns = [
        {
          title: '分类名称',
          width:"70%",
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '操作',
          width:"30%",
          key: 'action',
          //循环遍历的对象
          render: (category) => (
            <Space size="middle">
              <LinkButton onClick={()=>{
              this.showUpdateModal(category)
              }}
              > 修改分类</LinkButton>

              {this.state.parentId==="0"? 
              <LinkButton onClick= {()=>{this.showSubCategory(category) }} >
              查看子分类</LinkButton>:null}
             
            </Space>
          )
        },
    
      ];
    }
    //从服务端 获取一级品类列表或者二级列表数据即根据parentID不同
    getCategory = async(parentId)=>{
      // 发请求前限制loading
      this.setState({loading:true})
       parentId = parentId || this.state.parentId

     const result = await reqCategorys(parentId)
     this.setState({loading:false})
  
     if(result.status===0){
      const Category= result.data
       if (parentId==="0"){
       
        this.setState({Category})
       }else {
        // 保存二级列表
        this.setState({subCategory:Category})

       }
      
     }else{
       message.error("获取分类列表失败")
     }
    }
    //显示二级列表
    showSubCategory=(category)=>{
      console.log("object",category)
      // 更新状态
      this.setState({
        parentId:category._id,
        parentName:category.name
        
      },()=>{
        //显示列表
        this.getCategory()
      })
     
    
    }
//显示一级列表
    showFirstCategory=()=>{
    this.setState({
      parentId:"0",
      parentName:"",
      subCategory:[],},()=>{
    this.getCategory()
    })
    }
//显示添加
    showAddModal=()=>{
      this.setState({showStatus:1})
    }
// 添加商品
    addCategory=()=>{
      this.form.validateFields(async(err,values)=>{
        if(!err){
           //1隐藏对话框
      this.setState({showStatus:0})
      // 2获取数据，提交给服务端返回最新结果
      const {parentId,categoryName} = values
      // 清除数据
      this.form.resetFields()
      const result = await reqAddCategory(parentId,categoryName)
      if (result.status===0){
        // 1.添加的分类是当前分类表下的
        if(parentId===this.state.parentId){
          // 重新展示列表
        this.getCategory()
        }else {//二级页面加一级分类，重新获取一级分类但不用显示列表
          this.getCategory(this.state.parentId) 
        }        
      }
      }
      })
    
    }
//显示修改
     showUpdateModal=(category)=>{
      this.category=category 
      this.setState({showStatus:2}) 
     
    }
// 修改商品
    updateCategory=()=>{
      // 修改模块来的数据表单验证，通过才能处理数据
      this.form.validateFields(async(err,values)=>{  //验证中values有表单字段
        if(!err){
      //  1.隐藏确定框
      this.setState({
        showStatus:0
       })
      //  2.发请求更新分类
      const categoryId=this.category._id
      const {categoryName}=values

      this.form.resetFields()

      let result = await reqUpdateCategory(categoryId,categoryName)
      if (result.status===0){
        //  3.重新显示列表
        this.getCategory()
      }
      }
      }) 
    }
    // 取消按钮
    handleCancel=()=>{
      // 清空缓存数据
      this.form.resetFields()
      this.setState({showStatus:0})    
    }
   
   

}