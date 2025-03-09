import { getAllUsers, updateUserStatus } from '@/api/user'

const getDefaultState = () => {
  return {
    users: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_USERS: (state, users) => {
    state.users = users
  }
}

const actions = {

  // get all users
  getAllUsers({ commit }) {
    return new Promise((resolve, reject) => {
      getAllUsers().then(response => {
        const { data } = response
        commit('SET_USERS', data.users)
        resolve(data.users)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // update user status
  updateUserStatus({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      updateUserStatus(userInfo).then(response => {
        const { data } = response
        resolve(data)
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
