import React,{Component} from 'react';
import {Card,Button,Input,Cascader,Upload,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Form } from '@ant-design/compatible';
import {reqCategorys,reqAddProduct,reqUpdateProduct} from '../../api/index'
import PicturesWall from "./pictures-wall"
import EditorConvertToHTML from "./rich-text-editor"


const {Item} = Form
const { TextArea } = Input;


/*商品管理 添加和修改子路由组件 */

 class ProductAddUpdate extends Component{ 
  state = {
    options:[],
  };
  //父组件用子组件方法
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); //myref.current=picture-wall
    this.editor = React.createRef();//editor.current=rich-text-editor
  }
//提交表格
submit=()=>{
  //通过表单验证才能发送请求
  this.props.form.validateFields(async(err,values)=>{
    if(!err){
      // 1收集数据
      // const categoryId pCategoryId name desc price detail imgs
      const {name, desc ,price ,category} = values
      let pCategoryId , categoryId
      if(category.length===1){ //该商品属于一级分类
        pCategoryId="0"
        categoryId=category[0]
      }else{                   //二级分类
        pCategoryId=category[0]
        categoryId=category[1]
      }
      // 得到已上传文本数组名和原描述
      const imgs = this.myRef.current.getImgs()
      const detail = this.editor.current.getDetail()

      const product = {name, desc ,price ,pCategoryId,categoryId,imgs,detail}
      //如果是修改就添加_id
      if(this.isUpdate){
        product._id=this.product._id
      // 2调接口请求修改/添加

        const result = await reqUpdateProduct(product)
      // 3根据结果提示

        if(result.status===0){
          message.success("修改成功",1)
          this.props.history.goBack()
        }else{
          message.error("修改失败",1)
        }
      }else{//是添加
        const result = await reqAddProduct(product)
        if(result.status===0){
          message.success("添加成功",1)
        }else{
          message.error("添加失败",1)
        }
      }

     
    
    //  console.log("value",value,"imgs",imgs,"detail",detail)

    }
  })

}

  componentWillMount(){
    //取出修改携带的product信息
    const product = this.props.location.state.product || {}
    //保存是否是更新的标识
    this.isUpdate=!!product
    this.product=product || {}
  }

  componentDidMount(){
   this.getCategoeys("0") 
   console.log("this",this.product)
  }
  render(){
    // 验证表格
  const {getFieldDecorator} = this.props.form
  const {isUpdate,product}=this //是否是修改页面 取修改页面传递来的产品信息
  const {pCategoryId,categoryId,imgs,detail} = product

  //接收级联分类的数组
  const category = []
  if(pCategoryId==="0"){//一级分类
    category.push(categoryId)
  }else{
    category.push(pCategoryId)
    category.push(categoryId)

  }

    const title=(
      <span>
      <ArrowLeftOutlined style={{color:"green",marginRight:10,fontSize:20}} onClick={()=> this.props.history.goBack()} />
      <span>{isUpdate===true?"修改商品":"添加商品"}</span>
      </span>
    )
    // 列表左右布局
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    };
    return (
      <Card bordered title={title}>
      <Form {...layout}  >
      <Item  label="商品名称" >
      {
        getFieldDecorator("name",{
          initialValue:product.name,
          rules:[
            {required:true,message:"必须输入商品名称" }
          ]

        })( <Input placeholder="请输入商品名称"/>)
      }
       
      </Item>
      <Item  label="商品描述" >
      {
        getFieldDecorator("desc",{
          initialValue:product.desc,
          rules:[
            {required:true,message:"必须输入商品描述" }
          ]

        })(<TextArea autoSize={{minRows: 2, maxRows: 6 }} placeholder="请输入商品描述"/>)
      }
      
      </Item>
      <Item  label="商品价格" >
      {
        getFieldDecorator("price",{
          initialValue:product.price,
          rules:[
            {required:true,message:"必须输入商品价格" },
            {validator:(_, value) => value*1>0 ? Promise.resolve() : Promise.reject('价格必须大于0')}
          ]

        })(  <Input type="number" placeholder="请输入商品价格" addonAfter="元" />)
      }
      </Item>
      <Item  label="商品分类" >
      {
        getFieldDecorator("category",{
          initialValue:category,
          rules:[
            {required:true,message:"必须选择商品分类" },
          ]

        })( <Cascader options={this.state.options} loadData={this.loadData} placeholder="请选择分类" />)
      }
     
       
      </Item>
      <Item  label="商品图片" >
      <PicturesWall ref={this.myRef} imgs={imgs}></PicturesWall>
      </Item>
      <Item  label="商品详情" labelCol={ {span: 3} } wrapperCol={{span: 20 }} >
     
     
      <EditorConvertToHTML ref={this.editor}  detail={detail}  />
      </Item>
      <Item  >
      <Button type="primary"  onClick={this.submit}>提交</Button>
      <Button onClick={this.demo}>点我</Button>
      </Item>

      </Form>
      </Card>
      
       )
    }
 

//一级加载完后加载二级类别
  loadData =async (selectedOptions) => {
    //当前选中的一级列表项
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //获取二级分类列表
    const subCategory = await this.getCategoeys(targetOption.value)
    console.log("targetOption",subCategory)
    if(subCategory&&subCategory.length>0){
      //生成二级列表的数组
      const childOptions =subCategory.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: true,
       }))

      targetOption.children =  childOptions
      }else{
        //没有二级分类
        targetOption.isLeaf=true
      }
      //所选项停止加载
      targetOption.loading = false;
      // 重新更新options
      this.setState({
        options: [...this.state.options],
      });

  };



 // 根据父ID查到有哪些categorys （一级或是二级种类）
 getCategoeys=async(parentId)=>{
  
    let result = await reqCategorys(parentId)
    if(result.status===0){  
    let categorys=result.data
    if(parentId==="0"){//一级种类
    this.initialOptions(categorys)
    }else{//二级种类
     return categorys
    }
    
    }
 }
 
  //将数组保存到state的option里面
  initialOptions=async(categorys)=>{
    //  根据categorys生成可用的数组
   const options =categorys.map(c=>({
      value: c._id,
      label: c.name,
      isLeaf: false,
     }))

    this.setState({options})
    // 如果是修改时候显示二级列表 -----------------------------------------------------问题
   /* const{isUpdate,product} = this
    const{pCategoryId,categoryId}=product
    if(isUpdate===true&&pCategoryId!="0"){
    const subCategory= await  this.getCategoeys(pCategoryId)
    //生成二级列表的Option
    const childOptions=subCategory.map(c=>({
      value: c._id,
      label: c.name,
      isLeaf: true,
     }))
     const targetOption=options.find(i=>i.valve===pCategoryId)
    targetOption.children= childOptions
    } */
    //关联到一级Option上
    
     
  }
demo =()=>{
   console.log("addupdate",this)
}

 }

export default Form.create()(ProductAddUpdate)
