// 包含所有的接口，每个返回值都是promise对象
import ajax from "./ajax"
import {BASE_URL} from "../config"


// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST')

// export const reqLogin = (values)=> myAjax.post(`${BASE_URL}/Login`,values)
// 新增用户
// export const reqAddUser = (user)=> myAjax.post(`${BASE_URL}/AddUser`,user)
//获取一级二级分类列表
// export const reqCategory = ({parentId})=> myAjax.get(BASE_URL+"//manage/category/list",{params:{parentId}})
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', {parentId})



// 更新分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax(BASE_URL + '/manage/category/update', {categoryId,categoryName},"post")
// 添加分类
export const reqAddCategory = (parentId,categoryName)=> ajax(BASE_URL+"/manage/category/add",{parentId,categoryName},"post")
//获取分页列表
export const reqProducts=(pageNum,pageSize)=>ajax(BASE_URL + "/manage/product/list",{pageNum,pageSize})
//按商品名称或者描述搜索
export const reqSearchProducts=(pageNum,pageSize,searchName,searchType)=>ajax(BASE_URL + "/manage/product/search",
{pageNum,
 pageSize,
[searchType]:searchName
})
//根据分类ID获取分类
export const reqCategory=(categoryId)=>ajax(BASE_URL + "/manage/category/info",{categoryId})
// 更新商品状态（上下架）
export const reqUpdateStatus=(productId,status)=>ajax(BASE_URL + "/manage/product/updateStatus",{productId,status},"post")
// 删除图片
export const reqDeleteImg=(name)=>ajax(BASE_URL + "/manage/img/delete",{name},"post")
// 添加商品
export const reqAddProduct=(product)=>ajax(BASE_URL + "/manage/product/add",product,"post")
// 修改商品
export const reqUpdateProduct=(product)=>ajax(BASE_URL + "/manage/product/update",product,"post")
//获取用户列表
export const reqRoles=()=>ajax(BASE_URL + "/manage/role/list")
// 添加角色
export const reqAddRole=(roleName)=>ajax(BASE_URL + "/manage/role/add",{roleName},"post")
//更新角色权限
export const reqUdateRole=(role)=>ajax(BASE_URL + "/manage/role/update",role,"post")
// 获取所有用户列表
export const reqUsers=()=>ajax(BASE_URL + "/manage/user/list")
//删除指定用户
export const reqDeleteUser=(userId)=>ajax(BASE_URL + "/manage/user/delete",{userId},"post") 
//添加用户
export const reqAddUser=(user)=>ajax(BASE_URL + "/manage/user/add",user,"post") 
//修改用户
export const reqUpdateUser=(user)=>ajax(BASE_URL + "/manage/user/update",user,"post") 













