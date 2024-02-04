/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-10-26 14:37:44
 * @Description:页面程序入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import scroll from 'vue-seamless-scroll'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss' // common css

import directive from './directive' // directive
import plugins from './plugins' // plugins

import './assets/icons' // icon
import './permission' // permission control

import filters from './filters' // filters 过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

import { parseTime, resetForm, selectDictLabel, selectDictLabels, handleTree } from '@/utils/common'

// 分页组件
import Pagination from '@/components/Pagination'
// 富文本组件
import Editor from '@/components/Editor'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.use(directive)
Vue.use(plugins)
Vue.use(scroll)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
