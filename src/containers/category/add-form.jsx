import React,{Component} from 'react';
import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button,Select } from 'antd';
 import PropTypes from 'prop-types'

const { Option } = Select;
const { Item } = Form;


 class AddForm extends Component{
  demo=()=>{
    //   const {categoryName} = this.props.form.getFieldValue()
    // console.log("Category",categoryName)
    console.log("object",this.props)

    // const arr=()=>{
    // return this.props.Category.map(c=>cnam=c._id)
    // }


    }

   static propTypes={
     Category:PropTypes.array.isRequired,
     parentId:PropTypes.string.isRequired,
     setForm:PropTypes.func.isRequired,
   }

   componentWillMount(){
    this.props.setForm(this.props.form)
   }


  render(){
    const {getFieldDecorator}=this.props.form
    const {Category,parentId}=this.props
   

    return (
        <Form>
        <Item>
        {
          getFieldDecorator("parentId",{initialValue:parentId})(
            <Select >
            <Option value='0' >一级分类</Option>

            {
              Category.map(c=><Option value={c._id}>{c.name} </Option> )
            }
            
          </Select>
          )
        }
          
        </Item>
        <Item>
        {
          getFieldDecorator("categoryName",
          {initialValue:"",
          rules:[
            {required:true,message:"分类名称必须输入"}
          ]}
          )(
            <Input placeholder="请输入分类名称" />
          )
        }
        
        </Item>
        <Button onClick={this.demo}>点我啊</Button>
          
  
       
        </Form>
       
      
      


        
    )
    }
}

export default Form.create()(AddForm)