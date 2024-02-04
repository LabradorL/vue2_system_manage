/*
 * @Author: lixiaofeng
 * @Date: 2022-11-20 19:13:28
 * @LastEditTime: 2023-02-02 11:47:47
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 添加、删除。清空字典
 */
const state = {
  dict: new Array()
}
const mutations = {
  SET_DICT: (state, { key, value }) => {
    if (key !== null && key !== '') {
      state.dict.push({
        key: key,
        value: value
      })
    }
  },
  REMOVE_DICT: (state, key) => {
    try {
      for (let i = 0; i < state.dict.length; i++) {
        if (state.dict[i].key === key) {
          state.dict.splice(i, i)
          return true
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  CLEAN_DICT: (state) => {
    state.dict = new Array()
  }
}

const actions = {
  // 设置字典
  setDict({ commit }, data) {
    commit('SET_DICT', data)
  },
  // 删除字典
  removeDict({ commit }, key) {
    commit('REMOVE_DICT', key)
  },
  // 清空字典
  cleanDict({ commit }) {
    commit('CLEAN_DICT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

