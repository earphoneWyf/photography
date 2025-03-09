import { login, logout, getInfo, updateAdminInfo } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    id: 1,
    name: '',
    avatar: '',
    password: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  }
}

const actions = {
  // amdin login
  login({ commit }, adminInfo) {
    const { username, password } = adminInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.admin.id)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get admin info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, avatar, password } = data.admin

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_PASSWORD', password)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // update admin info
  updateAdminInfo({ commit }, adminInfo) {
    return new Promise((resolve, reject) => {
      updateAdminInfo(adminInfo).then(response => {
        const { data } = response

        if (!data) {
          return reject('Update failed, please try again.')
        }

        const { username, avatar, password } = data

        commit('SET_NAME', username)
        commit('SET_PASSWORD', password)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // admin logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

