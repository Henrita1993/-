import {SAVE_USER_INFO,DELETE_USER_INFO} from "../action_types"



// 定义action，告诉数据和类型
export const saveUserInfoAction  = (value)=>{
    // 先本地保存用户信息
    localStorage.setItem("userInfo",JSON.stringify(value))
    return {type:SAVE_USER_INFO,data:value}
}

export const deleteUserInfoAction  = ()=>{
    // 先本地保存用户信息
    localStorage.removeItem("userInfo")
    return {type:DELETE_USER_INFO}
}


