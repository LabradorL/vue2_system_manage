/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:12:52
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-04-04 10:57:06
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import dict from './modules/dict'
import user from './modules/user'
import mapInfo from './modules/mapInfo'
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
    settings,
    mapInfo
  },
  getters
})

export default store
