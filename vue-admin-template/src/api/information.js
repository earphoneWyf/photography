import request from '@/utils/request'

// 获取全部资讯信息
export function getAllInformations() {
  return request({
    url: 'information/all',
    method: 'get'
  })
}

// 新增资讯
export function addInformation(data) {
  return request({
    url: 'information/add',
    method: 'post',
    data
  })
}

// 删除资讯
export function deleteInformation(id) {
  return request({
    url: `information/delete/${id}`,
    method: 'delete'
  })
}

// 编辑资讯（编辑某个资讯的是否展示，is_displayed为1/0）
export function updateInformationDisplayStatus(data) {
  return request({
    url: 'information/updateStatus',
    method: 'put',
    data
  })
}
