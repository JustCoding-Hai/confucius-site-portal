import request from '~/utils/request'
export default {

  getTopBannerAdList() {
    return request({
      // baseURL: 'http://localhost:8150',
      url: '/api/cms/ads/1',
      method: 'get'
    })
  },
  getHotData(){
    return request({
        url: '/api/portal/index/hot-data',
        method: 'get'  
    })
  }
}