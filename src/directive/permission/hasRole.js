/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:10:27
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 17:25:12
 * @Description: 角色权限处理 v-hasRole
 * example: <el-button v-hasRole="['system:user:add']">新增</el-button>
 */

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const super_admin = "admin"
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值"`)
    }
  }
}
