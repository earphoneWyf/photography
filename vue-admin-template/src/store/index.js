import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import admin from './modules/admin'
import user from './modules/user'
import carousel from './modules/carousel'
import information from './modules/information'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    admin,
    user,
    carousel,
    information
  },
  getters
})

export default store
