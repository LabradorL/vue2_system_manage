/*
 * @Author: lixiaofeng
 * @Date: 2022-09-30 10:13:55
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-04 10:27:46
 * @Description: 网络请求响应设置
 */
import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import cache from '@/plugins/cache'
import errorCode from '@/utils/errorCode'
import { tansParams } from '@/utils/common'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 50000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get') {
    const timestamp = new Date().getTime()
    if (config.params) {
      config.params.timestamp = timestamp
    } else {
      config.params = { timestamp: timestamp }
    }
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url // 请求地址
      const s_data = sessionObj.data // 请求数据
      const s_time = sessionObj.time // 请求时间
      const interval = 1000 * 5 // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      }
      cache.session.setJSON('sessionObj', requestObj)
    }
  } else {
    if (config.method === 'post') {
      config.data = config.data ? config.data : {}
    }
  }

  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200

  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code === 401) {
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.href = '/index'
      })
    }).catch(() => { })
    return Promise.reject('令牌验证失败')
    // return
  } else if (code === 500 || code === 507) {
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  }
  return res.data
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob',
    timeout: 100000
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}
// 文件下载方法
export function fileDownload(filePathUrl, filename = '未知文件名', type = 'sys') {
  let baseURL = store.state.app.fileServerPath
  let isHasPrefix = filePathUrl.includes(baseURL)
  if (type === 'matter') {
    // 新点那边提供的事项材料下载地址
    baseURL = store.state.app.matterFileServerPath
    isHasPrefix = filePathUrl.includes(baseURL)
  }
  if (type === 'matter') {
    //  新点的文件下载
    if (!isHasPrefix) {
      filePathUrl = baseURL + filePathUrl
    }
    axios.get(filePathUrl, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: 'blob'
    }).then((res) => {
      if (res.status === 200) {
        const content = res.data
        const blob = new Blob([content]) // 谷歌更新后需需要这样传值
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 清除引用
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
      }
    }).catch((r) => {
      console.error(r)
    })
  } else {
    axios.get(filePathUrl, {
      baseUrl: isHasPrefix ? '' : baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: 'blob'
    }).then((res) => {
      if (res.status === 200) {
        const content = res.data
        const blob = new Blob([content]) // 谷歌更新后需需要这样传值
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 清除引用
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
      }
    }).catch((r) => {
      console.error(r)
    })
  }
}
// 导出excel表格
export function exportExcel(url, data, filename) {
  return service.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}

export default service

