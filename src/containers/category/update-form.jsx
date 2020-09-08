import React,{Component} from 'react';

 import { Form } from '@ant-design/compatible';
 import '@ant-design/compatible/assets/index.css';
 import { Input, Button } from 'antd';
 import PropTypes from "prop-types"

 const { Item } = Form;

 class UpdateForm extends Component{
  demo=()=>{
  // console.log("thisprops",this.props.form.getFieldValue("categoryName"));
   console.log("this.props",this.props);
  }
  // 接收父组件传来的函数和参数,全部用this.props.form(参数) this.props.setForm(函数)
  static propTypes ={
    categoryName:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount(){
    //将子组件form传出去
    this.props.setForm(this.props.form)
  }
 
  render(){

    const {getFieldDecorator}=this.props.form
    let {categoryName}=this.props

    return (
      <Form>
        <Item  >
        {
          getFieldDecorator("categoryName",{
            initialValue:categoryName,
            rules:[
              {required:true,message:"分类名称必须输入"}
            ]
          })(
            <Input placeholder="请输入分类名称" /> 

          )
        }
         
        </Item>
        <Button onClick={this.demo}>点我</Button>

      </Form>

  
    )
    }
}

export default Form.create()(UpdateForm)
