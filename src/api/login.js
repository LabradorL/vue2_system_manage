/*
 * @Author: lixiaofeng
 * @Date: 2022-09-30 10:37:28
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-04 17:53:27
 * @Description: 登录 注册退出的api
 */
// import request from '@/utils/request'

// 登录方法
export function login(username, password, code) {
  // return request({
  //   url: '/auth/login',
  //   headers: {
  //     isToken: false
  //   },
  //   method: 'post',
  //   data: { username, password, code, uuid }
  // })
  console.log(username, password, code)
  return new Promise((resolve, reject)=>{
    const result = {
      code: 200,
      msg: '成功',
      data: {
        access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjEzODJkZTQ4LWJhYmQtNDIyZS05YTQ1LWRmNmIzMDc1Njg2MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.CvWUSgvo8O1nR4dU5VUWUi6zftTU2c_lpPKB8B0BO3RQvVyuYqU9bmmoStIMvoI_4-3O7oeT4D6DMzILAu1_zg',
        expires_in: 720

      }
    }
    resolve(result)
  })
}

// 注册方法
export function register(data) {
  // return request({
  //   url: '/auth/register',
  //   headers: {
  //     isToken: false
  //   },
  //   method: 'post',
  //   data: data
  // })
  return new Promise((resolve, reject)=>{
    console.log(data)
    resolve()
  })
}

// 刷新方法
export function refreshToken() {
  return new Promise((resolve, reject)=>{
    console.log('登录方法的刷新')
    resolve()
  })
}

// 获取用户详细信息
export function getInfo() {
  return new Promise((resolve, reject)=>{
    console.log('获取用户详细信息')
    const result = {
      code: 200,
      msg: '成功',
      user:{
        username: 'admin'
      },
      permissions:['*:*:*'],
      roles:['admin'] }
    resolve(result)
  })
}

// 退出方法
export function logout() {
  return new Promise((resolve, reject)=>{
    console.log('退出登录方法')
    const result = {
      code: 200,
      msg: '成功'
    }
    resolve(result)
  })
}
