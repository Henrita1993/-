// reduce里的index就是来汇总reducer
import {combineReducers} from "redux"
import loginReducer from "./login_reducer"
// 全部汇总，最后结果，此处截止。
export default combineReducers({
    userInfo:loginReducer
})