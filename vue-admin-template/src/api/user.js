import request from '@/utils/request'

export function getAllUsers() {
  return request({
    url: '/user/getAllUsers',
    method: 'get'
  })
}

export function updateUserStatus(data) {
  return request({
    url: '/user/updateUserStatus',
    method: 'put',
    data
  })
}
