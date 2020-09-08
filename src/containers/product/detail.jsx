import React,{Component} from 'react';
import{Card,List,Button} from "antd"
import {ArrowLeftOutlined} from '@ant-design/icons'
import {BASE_IMG_URL} from '../../utils/constants.js'
import {reqCategory} from '../../api/index'
const {Item} = List

/*商品管理 主页面*/

export default class ProductDetail extends Component{
  state={
    cName1:"",//一级分类名
    cName2:"",//二级分类名
  }
  //获取所属分类名称--------------------------------------------问题先留着
  getCategory=async()=>{
    const {pCategoryId,categoryId}=this.props.location.state.product
    if(pCategoryId==="0"){//一级分类下商品
      const result = await reqCategory(categoryId)
      const cName1=result.data.name
      this.setState({cName1})
    }
    // }else{//二级分类下商品
    //   const result1 = await reqCategory(pCategoryId)
    //   const result2 = await reqCategory(categoryId)
    //   const cName1=result1.data.name
    //   const cName2=result2.data.name
    //   this.setState({cName1,cName2})
    // }
     
  }
  componentDidMount(){
    // this.getCategory()
   
  }
  
  render(){
    //读取传递过来的数据
    const {name,desc,price,detail,imgs}=this.props.location.state.product
    const {cName1,cName2}=this.state
    const title=(
      <span>
      <ArrowLeftOutlined style={{color:"green",marginRight:10,fontSize:20}} onClick={()=> this.props.history.goBack()} />
      <span>商品详情</span>
      </span>
    )
    const demo=()=>{
      console.log("object",name,desc,price,detail)
    }
   


    return (
      <Card title={title} className="product-detail" >
      <Button onClick={demo}>点我</Button>
      <List bordered 
      
      >
        <Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
        </Item>

        <Item>
            <span className="left">商品描述：</span>
            <span>{desc}</span>
        </Item>

        <Item>
            <span className="left">商品价格：</span>
            <span>{price}</span>
            <span>元</span>


        </Item>

        <Item>
            <span className="left">所属分类：</span>
           {/*<span>{cName1} {cName2?"-->"+cName2 :""}</span>*/} 
        </Item>
        <Item>
            <span className="left">商品图片：</span>
            <span>
            {
              imgs.map(img=>(
                <img
                 key={img}
                 src={BASE_IMG_URL+img} 
                 alt="img" 
                 className="detail-img"></img>
                
              )

              )
            }
            
            <img src="" alt="图片" className="detail-img"></img>
            </span>
        </Item>

        <Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{__html: detail}}></span>
        </Item>
        
      </List>
      
     
     
    </Card>
       )
    }
}