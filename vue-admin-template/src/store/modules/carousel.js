import { getAllCarousels, addCarousel, deleteCarousel, updateCarouselDisplayStatus } from '@/api/carousel'

const getDefaultState = () => {
  return {
    carousels: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_CAROUSELS: (state, carousels) => {
    state.carousels = carousels
  },
  ADD_CAROUSEL: (state, carousel) => {
    state.carousels.push(carousel)
  },
  DELETE_CAROUSEL: (state, id) => {
    state.carousels = state.carousels.filter(carousel => carousel.id !== id)
  }
  // UPDATE_CAROUSEL_STATUS: (state, updatedCarousel) => {
  //   const index = state.carousels.findIndex(carousel => carousel.id === updatedCarousel.id)
  //   if (index !== -1) {
  //     state.carousels.splice(index, 1, updatedCarousel)
  //   }
  // }
}

const actions = {

  // get all carousels
  getAllCarousels({ commit }) {
    return new Promise((resolve, reject) => {
      getAllCarousels().then(response => {
        const { data } = response
        commit('SET_CAROUSELS', data.carousels)
        resolve(data.carousels)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // add a new carousel
  addCarousel({ commit }, carouselData) {
    return new Promise((resolve, reject) => {
      addCarousel(carouselData).then(response => {
        const { data } = response
        commit('ADD_CAROUSEL', data.carousel)
        resolve(data.carousel)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // delete a carousel
  deleteCarousel({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteCarousel(id).then(response => {
        commit('DELETE_CAROUSEL', id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // update carousel display status
  updateCarouselDisplayStatus({ commit }, carouselData) {
    return new Promise((resolve, reject) => {
      updateCarouselDisplayStatus(carouselData).then(response => {
        const { data } = response
        // commit('UPDATE_CAROUSEL_STATUS', data.carousel)
        resolve(data.carousel)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
