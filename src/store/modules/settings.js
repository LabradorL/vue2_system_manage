/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:12:52
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-04 18:02:19
 * @Description: 读取系统风格配置
 */
import defaultSettings from '@/settings'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const state = {
  title: '',
  // 主题颜色
  theme: storageSetting.theme || '#EBB675', // '#409EFF',
  // 侧边栏主题
  sideTheme: storageSetting.sideTheme || sideTheme,
  // 是否显示布局配置 默认不显示
  showSettings: showSettings,
  // 是否显示顶部导航 默认不显示
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  // 是否显示已打开的页面 默认显示
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  // 是否固定头部 默认不固定
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  // 是否显示logo 默认显示
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  // 是否显示动态标题 默认不显示
  dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
}
const mutations = {
  // 修改布局设置
  CHANGE_SETTING: (state, { key, value }) => {
    // state中是否包含key属性
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

