/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:12:52
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-09 15:39:04
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import dict from './modules/dict'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    // dict,
    user,
    tagsView,
    permission,
    settings
  },
  getters
})

export default store
