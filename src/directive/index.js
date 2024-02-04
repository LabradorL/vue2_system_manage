/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:10:27
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-04 17:58:05
 * @Description: 全局注册指令
 */
import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import dialogDrag from './dialog/drag'
import dialogDragWidth from './dialog/dragWidth'
import dialogDragHeight from './dialog/dragHeight'
// import clipboard from './module/clipboard'
import lazyLoad from './module/lazyLoad'

const install = function (Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  // Vue.directive('clipboard', clipboard)
  Vue.directive('dialogDrag', dialogDrag)
  Vue.directive('dialogDragWidth', dialogDragWidth)
  Vue.directive('dialogDragHeight', dialogDragHeight)
  Vue.directive('lazyLoad', lazyLoad)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  Vue.use(install); // eslint-disable-line
}

export default install
