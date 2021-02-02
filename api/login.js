import request from '~/utils/request'

import cookie from 'js-cookie'

export default {
  submitLogin(user) {
    return request({
      // baseURL: 'http://localhost:8160',
      url: '/api/uc/member/login',
      method: 'post',
      data: user
    })
  },
  getLoginInfo(){
      return request({
        // baseURL: 'http://localhost:8160',
        url: '/api/uc/member/get-login-info',
        method: 'get',
        //每次获取登录信息，则获取cookie的苏剧，更新请求头的token
        headers: {'token': cookie.get('confucius_jwt_token')}
      })
  }
}