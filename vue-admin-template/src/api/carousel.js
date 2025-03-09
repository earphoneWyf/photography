import request from '@/utils/request'
export function getAllCarousels() {
  return request({
    url: 'carousel/getAllCarousels',
    method: 'get'
  })
}

export function addCarousel(data) {
  return request({
    url: 'carousel/addCarousel',
    method: 'post',
    data
  })
}

export function deleteCarousel(id) {
  return request({
    url: `carousel/deleteCarousel/${id}`,
    method: 'delete'
  })
}

export function updateCarouselDisplayStatus(data) {
  return request({
    url: 'carousel/updateStatus',
    method: 'put',
    data
  })
}
