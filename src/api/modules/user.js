import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vant/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/vant/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export default {
  login,
  getInfo,
  logout
}
