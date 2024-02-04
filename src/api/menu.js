/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 16:51:23
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 15:04:15
 * @Description: 获取路由api
 */
import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  // return request({
  //   url: '/system/menu/getRouters',
  //   method: 'get'
  // })
  return new Promise((resolve, reject)=>{
    const routes = [
      {alwaysShow: true,
        children: [
          { name: "NotFindPage1",
            path: "not-find-page1",
            hidden: false,
            component: "error/404.vue",
            meta:{title: "错误页", icon: "#", noCache: false}
          },
          { name: "NotPermission",
            path: "not-permission",
            hidden: false,
            component: "error/401.vue",
            meta:{title: "无权限页", icon: "#", noCache: false}
          }
        ],
        hidden:false,
        component: "Layout",
        meta:{title: "错误页管理", icon: "1", noCache: false},
        name:"ErrorPage",
        path:"/error",
        redirect: "noRedirect"
      }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: routes
    }
    resolve(result)
  })

}
