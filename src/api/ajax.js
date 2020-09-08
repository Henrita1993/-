// 封装自己的axios

import axios from "axios"
import {message} from "antd"
// 网络进度条
import NProgress from "nprogress"
import "../../node_modules/nprogress/nprogress.css"
// import qs from "querystring"

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    NProgress.start()
    let promise

    // 1. 执行异步ajax请求
    if(type==='GET') { // 发GET请求
      promise = axios.get(url, { // 配置对象
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      message.error('请求出错了: ' + error.message)
    })
    NProgress.done()
  })


}

// 请求拦截器，一发就到这
// axios.interceptors.request.use(function (config) {
//   NProgress.start();

//     // console.log(config)
//     const {method,data}=config
//     if(method.toLowerCase==="post"){
//       // 把data变成字符串传出去
//         if(data instanceof Object){
//             // 将传出数据全部变string格式
//             config.data=qs.stringify(data)
//             // config.data=data

//         }
//     }
   


//     // 切记，一定要有返回值
//     return config
//   }, function (error) {
//     return Promise.reject(error);
//   });

// // 响应拦截器，回来就到这
// axios.interceptors.response.use(function (response) {
// //  若响应成功，给对象
//     NProgress.done();
//     return response;
//   }, function (error) {
//     NProgress.done();
//     //antd错误信息组件提示，响应的错误信息
//     message.error(error.message,2)
//     // 响应失败,就此停住
//     return new Promise(()=>{})
//   });

//   export default axios

// 集中处ajax请求是否成功结果,其他地方直接await 接收promise对象
  // export default function ajax(url,data={},type="GET"){
  //   return new Promise((resolve,reject )=>{
  //     let promise 
  //     // 异步ajax请求
  //     if(type==="GET"){
  //      promise= axios.get(url,{params:data})
  //     }else{
  //       promise=axios.post(url,data)
  //     }

  //     // 若请求成功
  //     promise
  //     .then((response)=>{
  //       resolve(response)
  //     })
  //     .catch(error=>{
  //       message.error("请求出错了"+err.message)
  //     })



  //   })
  // }

