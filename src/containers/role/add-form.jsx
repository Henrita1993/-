import React,{Component} from 'react';
import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button,Select } from 'antd';
 import PropTypes from 'prop-types'

const { Option } = Select;
const { Item } = Form;
//此表格即 添加角色框，并校对后，发给role组件

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
     setForm:PropTypes.func.isRequired,
   }

   componentWillMount(){
    this.props.setForm(this.props.form)
   }


  render(){
    const {getFieldDecorator}=this.props.form
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
   

    return (
        <Form>
        <Item label="角色名称" {...layout}>
        {
          getFieldDecorator("roleName",
          {initialValue:"",
          rules:[
            {required:true,message:"角色名称必须输入"}
          ]}
          )(
            <Input placeholder="请输入角色名称" />
          )
        }
        
        </Item>
       
        </Form>
       
      
      


        
    )
    }
}

export default Form.create()(AddForm)