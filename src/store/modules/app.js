import Cookies from 'js-cookie'
// import { dictType} from '@/api/menu'
const state = {
  sidebar: {
    // 左侧菜单是否折叠
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 折叠时是否无动画效果
    withoutAnimation: false,
    // 是否隐藏
    hide: false,
    // 文件服务器路径，用于文件路径拼接
    fileServerPath:null,
  },
  // 设备类型
  device: 'desktop',
  // 尺寸大小
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.hide) {
      return false;
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status
  },
  // 获取文件地址前缀
  // SET_MATTERFILESERVERPATH(state, value) {
  //   state.matterFileServerPath = value
  // }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  toggleSideBarHide({ commit }, status) {
    commit('SET_SIDEBAR_HIDE', status)
  }
  // 获取文件地址前缀
  // async getFileServerPath({ commit }) {
  //   const { data } = await dictType().catch(() => {})
  //   commit('SET_FILESERVERPATH', data[0].dictValue)
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
