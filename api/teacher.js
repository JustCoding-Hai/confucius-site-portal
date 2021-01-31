import request from '~/utils/request'

export default{

  getList() {
    return request({
      url: '/api/portal/teachers',
      method: 'get'
    })
  },
  getTeacherInfoById(id) {
    return request({
      url: `/api/portal/teachers/${id}`,
      method: 'get'
    })
  }
}