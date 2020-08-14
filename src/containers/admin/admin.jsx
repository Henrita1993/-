import React,{Component} from "react"
import {connect} from 'react-redux'
import {createDemo1Aciton} from "../../redux/action_creators/test_action.js"


 class Admin extends Component{
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return(
            <div>
            Admin
            </div>
        )
    }
}

export default connect(
    state=>({peiqi:state.test}),
    {
        demo1:createDemo1Aciton
    }

)(Admin)