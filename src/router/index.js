/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-02-04 10:07:32
 * @Description: 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
    affix: true                     //
  }
 */

// 公共路由
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect')
  //     }
  //   ]
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    hidden: true
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test.vue'),
    hidden: true
  },
  // {
  //   path: '/anchor',
  //   name: 'Anchor',
  //   component: () => import('../views/anchor/index.vue'),
  //   hidden: true
  // },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: false
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: false
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const functionRoutes = [
  {
    path: '/all-people-can-browse-line',
    component: () => import('@/views/allPeopleCanBrowse/echars/line'),
    hidden: false,
    meta: { title: '折线图合集', icon: 'dashboard', affix: true }

  },
  {
    path: '/all-people-can-browse-pie',
    component: () => import('@/views/allPeopleCanBrowse/echars/pie'),
    hidden: false,
    meta: { title: '饼图合集', icon: 'dashboard', affix: true }

  },
  {
    path: '/all-people-can-browse-bar',
    component: () => import('@/views/allPeopleCanBrowse/echars/bar'),
    hidden: false,
    meta: { title: '柱状图合集', icon: 'dashboard', affix: true }

  },
  {
    path: '/all-people-can-browse-graph',
    component: () => import('@/views/allPeopleCanBrowse/echars/graph'),
    hidden: false,
    meta: { title: '关系图合集', icon: 'dashboard', affix: true }

  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  // {
  //   path: '/system/user-auth',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['system:user:edit'],
  //   children: [
  //     {
  //       path: 'role/:userId(\\d+)',
  //       component: () => import('@/views/system/user/authRole'),
  //       name: 'AuthRole',
  //       meta: { title: '分配角色', activeMenu: '/system/user' }
  //     }
  //   ]
  // },

]

// 防止连续点击多次路由报错
const routerPush = VueRouter.prototype.push
const routerReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...functionRoutes]
  // routes
})

export default router

