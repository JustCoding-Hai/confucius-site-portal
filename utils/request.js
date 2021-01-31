import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9110',
  timeout: 12000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    //如果cookie包含了token：confucius_jwt_token，则每次请求都设置header携带该信息
    if(cookie.get('confucius_jwt_token')){
      config.headers['token']=cookie.get('confucius_jwt_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
      const res = response.data
    if (res.code === 20000) { // 成功
      if(res.message){
        Message({
          message: res.message,
          type: 'success',
          duration: 5 * 1000
      })
      }
      return response.data
    } else if (res.code === 23004||res.code ===28008) { // 获取用户信息失败
      // 清除cookie
      cookie.set('confucius_jwt_token', '', { domain: 'localhost' })
      Message({
        message: '当前会话超时，请重新登录！',
        type: 'warning',
        duration: 5 * 1000
      })
      return response.data //不显示错误信息
    }else if(res.code===25000){//订单支付中
      return response.data//不显示错误信息
    } else {
      Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err：' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
