// reduce里的index就是来汇总reducer
import {combineReducers} from "redux"
import testReducer from "./test_reducer"

export default combineReducers({
    test:testReducer
})