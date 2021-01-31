import request from '~/utils/request'
export default {

  getList(searchObj) {
    return request({
      url: '/api/portal/courses',
      method: 'get',
      params: searchObj
    })
  },
  getSubjectNestedList() {
    return request({
        url: '/api/portal/subjects/nested-list',
        method: 'get'
    })
  },
  getById(id) {
    return request({
        url: `/api/portal/courses/${id}`,
        method: 'get'
    })
  },
  getPlayAuth(vid) {
    return request({
        // baseURL: 'http://localhost:8130',
        url: `/api/vod/media/play-auth/${vid}`,
        method: 'get'
    })
  }
}