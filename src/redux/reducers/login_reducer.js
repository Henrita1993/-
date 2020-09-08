const { SAVE_USER_INFO,DELETE_USER_INFO } = require("../action_types");
// reduce只是根据类型对数据处理，最终得newState，只要函数返回结果，函数名叫啥无所谓
let initState = {
    data:{},
    isLogin:false

}
export default  function test(preState=initState,action){
    const{type,data}=action
    let newState
    switch (type) {
        case SAVE_USER_INFO:
            newState= {data:data,isLogin:true}
            return newState;
        case DELETE_USER_INFO:
            newState= {data:"",isLogin:false}
            return newState;
            
        default:
            return preState;
           
    }

}