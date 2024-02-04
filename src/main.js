/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-11-15 09:23:36
 * @Description:页面程序入口
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss' // common css

import directive from './directive' // directive
import plugins from './plugins' // plugins

import './assets/icons' // icon
import './permission' // permission control

import { parseTime, resetForm, selectDictLabel, selectDictLabels, handleTree } from "@/utils/common";

// 分页组件
import Pagination from "@/components/Pagination";
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
