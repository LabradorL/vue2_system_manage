/*
 * @Author: lixiaofeng
 * @Date: 2023-04-28 11:51:08
 * @LastEditTime: 2023-06-07 13:46:59
 * @LastEditors: lixf@863jp.com.cn
 * @Description: 关于折线图的数据和配置
 */
// 饼图数据
export function getMapChartData(params) {
  return new Promise((resolve, reject) => {
    const mapChartData = [
      {
        name: '郑州市',
        value: 100
      }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: mapChartData,
      total: mapChartData.length
    }
    resolve(result)
  })
}

// 折线图的options配置
export const mapOptions = {
  // 标题组件
  title: {
    show: true,
    // 主标题文本，支持使用 \n 换行
    text: 'Referer of a Website',
    // 副标题
    subtext: 'Fake Data',
    // title 组件离容器左侧的距离 left | right | center | % | px
    left: 'center',
    // title 组件离容器上侧的距离 left | right | middle | % | px
    top: 10,
    // 主标题文字的样式
    textStyle: {
      color: '#000',
      fontSize: 14
    }
  },
  // 坐标系网格组件/grid组件位置/canvan 距离容器的距离
  grid: {
    // grid组件离容器顶部的距离。 值： 'top'|'middle'|'bottom'|%|number
    top: 50,
    bottom: 10,
    // grid 组件离容器左侧的距离 left | right | center | % | px
    left: 20,
    right: 10

  },
  // 提示框组件
  tooltip: {
    show: true,
    // 触发类型 item | axis | none
    // item 数据项图形触发，如散点图、饼图等无类目轴的图表中使用
    // axis 坐标轴触发，如柱形图、折线图等类目轴的图表中使用
    trigger: 'item',
    // 额外附加到浮层的 css 样式
    extraCssText: 'background:#fff;',
    // 提示框浮层的边框颜色
    borderColor: 'transparent',
    // 提示框浮层的文本样式
    textStyle: {
      color: '#3FDDFF'
    },
    // 格式化提示框内容
    formatter: (params) => {
      const { name, seriesName, value } = params
      const { marker } = params
      return `<div style="color:#666;font-size:14px">${marker}<span>${name}</span><br/>
        ${seriesName}: <span style="font-weight: 900">${value || 0}</span><br/></div>`
    }
  },
  // 地图图例的配置
  visualMap: [
    {
      // 是否显示地图图例
      show: true,
      // visualMap 类型 continuous（连续型）| piecewise（分段型）
      type: 'continuous',
      // grid 组件离容器左侧的距离 left | right | center | % | px
      right: '5%',
      // grid组件离容器顶部的距离。 值： 'top'|'middle'|'bottom'|%|number
      bottom: 20,
      // 图例方向
      orient: 'horizontal',
      // 图例颜色
      inRange: {
        color: ['#1b84f0', '#0c3b6b']
      },
      label: {
        show: true,
        textStyle: {
          color: '#16CAF9', // 地图初始化区域字体颜色
          fontSize: 20,
          opacity: 1,
          backgroundColor: '#069DFD'
        }
      },
      // visualMap 组件的文字样式
      textStyle: {
        color: '#fff'
      }
    }
  ],
  // 数据组件
  series: [
    {
      // 系列名称
      name: '案件数量',
      // series组件类型
      type: 'map',
      // registerMap  注册时的地图名称
      map: '',
      // 是否开启鼠标缩放和平移漫游 scale | mode | true
      roam: true,
      // 地图 中心位置设置
      layoutCenter: ['45%', '50%'],
      // 地图大小的设置 可百分比 可具体像素值
      layoutSize: '80%',
      // symbol: 'pin',
      // color: '#28E3F2',
      // symbolSize: 30,
      // opacity: 0,
      // 图形上的文本标签，可用于说明图形的一些数据信息
      label: {
        // 是否显示标签
        show: true,
        // 文字的颜色
        textStyle: {
          color: '#fff', // 地图初始化区域字体颜色
          fontSize: 12,
          opacity: 1
          // backgroundColor: '#069DFD'
        },
        // 文字格式化
        formatter: '{b}'
      },
      lineStyle: {
        type: 'solid',
        opacity: 1,
        color: '#fff'
      },
      // 地图区域的多边形 图形样式
      itemStyle: {
        // 图形的透明度 [ default: 1 ]
        opacity: 1,
        // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
        borderWidth: 1,
        // 图形描边的颜色。[ default: #333 ]
        borderColor: '#0c3b6b',
        // 地图区域的颜色
        areaColor: '#1b84f0'
      },
      // 高亮状态下的多边形和标签样式
      emphasis: {
        // 当鼠标放上去  地区区域是否显示名称
        label: {
          show: true,
          // 悬停时标签的文字样式
          textStyle: {
            color: '#069DFD',
            fontSize: 14
          }
        },
        itemStyle: {
          // 图形的透明度 [ default: 1 ]
          opacity: 1,
          // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
          borderWidth: 1,
          // 图形描边的颜色。[ default: #333 ]
          borderColor: '#0c3b6b'
          // 地图区域的颜色
          // areaColor: '#1b84f0'
        }
      },
      data: null
    }
  ]
}

export const lineSeriesOptions = {
  // 系列名称，用于tooltip的显示
  name: '',
  // 数据
  data: [],
  // 类型
  type: 'line',
  // 平滑度，越小表示越接近折线段
  smooth: 0.6,
  // 数据堆叠
  stack: 'all'
}
