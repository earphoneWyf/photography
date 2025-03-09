import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/admin/info/${id}`,
    method: 'get'
  })
}

export function updateAdminInfo(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
