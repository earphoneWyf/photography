import {
  getAllInformations,
  addInformation,
  deleteInformation,
  updateInformationDisplayStatus
} from '@/api/information'

// 获取默认状态
const getDefaultState = () => {
  return {
    informations: []
  }
}

// 初始状态
const state = getDefaultState()

// 定义 mutations，用于修改 state
const mutations = {
  // 设置全部资讯信息
  SET_INFORMATIONS: (state, informations) => {
    state.informations = informations
  },
  // 新增一条资讯
  ADD_INFORMATION: (state, information) => {
    state.informations.push(information)
  },
  // 删除一条资讯
  DELETE_INFORMATION: (state, id) => {
    state.informations = state.informations.filter(information => information.id !== id)
  },
  // 更新资讯展示状态
  UPDATE_INFORMATION_STATUS: (state, updatedInformation) => {
    const index = state.informations.findIndex(information => information.id === updatedInformation.id)
    if (index !== -1) {
      state.informations.splice(index, 1, updatedInformation)
    }
  }
}

// 定义 actions，用于处理异步操作
const actions = {
  // 获取全部资讯信息
  getAllInformations({ commit }) {
    return new Promise((resolve, reject) => {
      getAllInformations().then(response => {
        const { data } = response
        commit('SET_INFORMATIONS', data.informations)
        resolve(data.informations)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增一条资讯
  addInformation({ commit }, informationData) {
    return new Promise((resolve, reject) => {
      addInformation(informationData).then(response => {
        const { data } = response
        commit('ADD_INFORMATION', data.information)
        resolve(data.information)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除一条资讯
  deleteInformation({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteInformation(id).then(response => {
        commit('DELETE_INFORMATION', id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新资讯展示状态
  updateInformationDisplayStatus({ commit }, informationData) {
    return new Promise((resolve, reject) => {
      updateInformationDisplayStatus(informationData).then(response => {
        const { data } = response
        commit('UPDATE_INFORMATION_STATUS', data.information)
        resolve(data.information)
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
