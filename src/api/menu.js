/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 16:51:23
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-02-04 14:17:43
 * @Description: 获取路由api
 */
// import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  // return request({
  //   url: '/system/menu/getRouters',
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => {
    const routes = [
      {
        alwaysShow: true,
        children: [
          {
            name: 'NotFindPage1',
            path: 'not-find-page1',
            hidden: false,
            component: 'error/404.vue',
            meta: { title: '错误页', icon: '#', noCache: false }
          },
          {
            name: 'NotPermission',
            path: 'not-permission',
            hidden: false,
            component: 'error/401.vue',
            meta: { title: '无权限页', icon: '#', noCache: false }
          },
          {
            name: 'TestPage',
            path: 'test-page',
            hidden: false,
            component: 'test.vue',
            meta: { title: '测试页面', icon: '#', noCache: false }
          }
        ],
        hidden: false,
        component: 'Layout',
        meta: { title: '错误页管理', icon: '1', noCache: false },
        name: 'ErrorPage',
        path: '/error',
        redirect: 'noRedirect'
      },
      {
        alwaysShow: true,
        children: [
          {
            name: 'CheckComponents',
            path: 'dialog-check1',
            hidden: false,
            component: 'check/index.vue',
            meta: { title: '弹框查看', icon: '#', noCache: false }
          },
          {
            name: 'Tabs',
            path: 'tabs',
            hidden: false,
            component: 'tabs/index.vue',
            meta: { title: '页签', icon: '#', noCache: false }
          },
          {
            name: 'Form',
            path: 'form',
            hidden: false,
            component: 'form/index.vue',
            meta: { title: '表单', icon: '#', noCache: false }
          },
          {
            name: 'NoticeBar',
            path: 'noticeBar',
            hidden: false,
            component: 'notice/index.vue',
            meta: { title: '滚动通知', icon: '#', noCache: false }
          },
          {
            name: 'ScrollLoad',
            path: 'scrollLoad',
            hidden: false,
            component: 'scrollbar/index.vue',
            meta: { title: '滚动加载', icon: '#', noCache: false }
          },
          {
            name: 'CodeShow',
            path: 'codeShow',
            hidden: false,
            component: 'codeEditor/index.vue',
            meta: { title: '代码编辑', icon: '#', noCache: false }
          },
          {
            name: 'Table',
            path: 'table',
            hidden: false,
            component: 'table/index.vue',
            meta: { title: 'table表格常用方法', icon: '#', noCache: false }
          },
          {
            name: 'StatisticsNum',
            path: 'statisticsNum',
            hidden: false,
            component: 'statisticsNum/index.vue',
            meta: { title: '数据统计样式', icon: '#', noCache: false }
          }
        ],
        hidden: false,
        component: 'Layout',
        meta: { title: '组件管理', icon: '1', noCache: false },
        name: 'ComponentsPages',
        path: '/components',
        redirect: 'noRedirect'
      },
      {
        alwaysShow: true,
        name: 'Charts',
        path: '/charts',
        hidden: false,
        component: 'Layout',
        redirect: 'noRedirect',
        meta: { title: '图表集合', icon: '1', noCache: false },
        children: [
          {
            name: 'ThreeDimensionalCharts',
            path: 'threeDimensional',
            hidden: false,
            component: '3DCharts/pie.vue',
            meta: { title: '3D图表集合', icon: '1', noCache: false }
          },
          {
            name: 'TwoDimensionalCharts',
            path: 'twoDimensional',
            hidden: false,
            component: '2DCharts/index.vue',
            meta: { title: '2D图表', icon: '1', noCache: false }
          }
        ]

      }, {
        alwaysShow: true,
        name: 'Style',
        path: '/style',
        hidden: false,
        component: 'Layout',
        redirect: 'noRedirect',
        meta: { title: '常见样式', icon: '1', noCache: false },
        children: [
          {
            name: 'HorizontalVertivalCenter',
            path: 'HorizontalVertivalCenter',
            hidden: false,
            component: 'styleCommon/index.vue',
            meta: { title: '水平垂直方向居中', icon: '1', noCache: false }
          },
          {
            name: 'WidthAndAuto',
            path: 'WidthAndAuto',
            hidden: false,
            component: 'styleCommon/widthAndAuto.vue',
            meta: { title: '列定宽与自适应', icon: '1', noCache: false }
          },
          {
            name: 'LineStyle',
            path: 'lineStyle',
            hidden: false,
            component: 'styleCommon/lineStyle.vue',
            meta: { title: '线条相关样式', icon: '1', noCache: false }
          },
          {
            name: 'CheckInfo',
            path: 'checkInfo',
            hidden: false,
            component: 'styleCommon/checkInfo.vue',
            meta: { title: '查看数据样式', icon: '1', noCache: false }
          },
          {
            name: 'ProportionalScaling',
            path: 'proportionalScaling',
            hidden: false,
            component: 'styleCommon/imgScaling.vue',
            meta: { title: '图片等比例缩放', icon: '1', noCache: false }
          },
          {
            name: 'Rotate',
            path: 'rotate',
            hidden: false,
            component: 'styleCommon/rotate.vue',
            meta: { title: '旋转类样式', icon: '1', noCache: false }
          }
        ]

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
