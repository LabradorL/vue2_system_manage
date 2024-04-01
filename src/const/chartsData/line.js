/*
 * @Author: lixiaofeng
 * @Date: 2023-04-28 11:51:08
 * @LastEditTime: 2024-03-27 19:01:36
 * @LastEditors: 李晓风 1091616642@qq.com
 * @Description: 关于折线图的数据和配置
 */
// 饼图数据
export function getLineChartData(params) {
  return new Promise((resolve, reject) => {
    const lineChartData = [
      {
        name: '涉企挂案',
        monthList: [
          {
            name: '2023年1月',
            dataCount: 100
          },
          {
            name: '2023年2月',
            dataCount: 150
          },
          {
            name: '2023年3月',
            dataCount: 180
          },
          {
            name: '2023年4月',
            dataCount: 200
          },
          {
            name: '2023年5月',
            dataCount: 100
          },
          {
            name: '2023年6月',
            dataCount: 80
          },
          {
            name: '2023年7月',
            dataCount: 100
          },
          {
            name: '2023年8月',
            dataCount: 190
          },
          {
            name: '2023年9月',
            dataCount: 300
          },
          {
            name: '2023年10月',
            dataCount: 180
          },
          {
            name: '2023年11月',
            dataCount: 120
          },
          {
            name: '2023年12月',
            dataCount: 100
          }
        ]
      },
      {
        name: '涉案车辆',
        monthList: [
          {
            name: '2023年1月',
            dataCount: 70
          },
          {
            name: '2023年2月',
            dataCount: 100
          },
          {
            name: '2023年3月',
            dataCount: 130
          },
          {
            name: '2023年4月',
            dataCount: 160
          },
          {
            name: '2023年5月',
            dataCount: 190
          },
          {
            name: '2023年6月',
            dataCount: 210
          },
          {
            name: '2023年7月',
            dataCount: 190
          },
          {
            name: '2023年8月',
            dataCount: 160
          },
          {
            name: '2023年9月',
            dataCount: 190
          },
          {
            name: '2023年10月',
            dataCount: 210
          },
          {
            name: '2023年11月',
            dataCount: 230
          },
          {
            name: '2023年12月',
            dataCount: 260
          }
        ]
      }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: lineChartData,
      total: lineChartData.length
    }
    resolve(result)
  })
}

// 折线图的options配置
export const lineOptions = {
  // 折线图颜色
  color: [
    '#006EE9FF',
    '#00CCFFFF',
    '#F5A43AFF',
    '#5470c6',
    '#5AADD4',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ],
  // 标题组件
  title: {
    show: false,
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
      color: '#ffffff',
      fontSize: 14
    }
  },
  // 提示框组件
  tooltip: {
    // 触发类型 item | axis | none
    // item 数据项图形触发，如散点图、饼图等无类目轴的图表中使用
    // axis 坐标轴触发，如柱形图、折线图等类目轴的图表中使用
    trigger: 'axis'
    // 提示框文字格式化
    // formatter: function(params) {
    //   // seriesName 系列名称，option.series[0].name的值
    //   // name 数据名，类目名
    //   // data 传入的原始数据
    //   // dataIndex 数据在传入的 data 数组中的 index
    //   // value 传入的数值
    //   // marker 对应的图例标记
    //   // color 数据图形的颜色
    //   // seriesType 系列类型
    //   // seriesIndex 系列在传入的 option.series 中的 index
    //   const { marker, name, seriesName, value } = params[0]
    //   return `<div style="color:#666;font-size:14px">${marker}<span>${name}</span><br/>
    //     ${seriesName}: <span style="font-weight: 900">${value || 0}</span><br/>`
    // }
  },
  // 图例组件
  legend: {
    // 是否显示图例
    show: true,
    // 图例类型 plain|scroll
    type: 'plain',
    // 图例数据
    // data: legendData,
    // 排列方向 vertical（垂直）horizontal（水平）
    orient: 'horizontal',
    // 图例组件离容器右侧的距离。 值： 'left'|'center'|'right'|%|number|auto
    right: 'center',
    left: 'center',
    // 图例组件离容器上侧的距离。 值： 'top'|'middle'|'bottom'|%|number|auto
    top: 10,
    // 图例组件离容器下侧的距离。
    bottom: 0,
    // 图例组件的宽度 string | number
    // 图例每项之间的间隔
    itemGap: 10,
    // 图例的公用文本样式。
    textStyle: {
      color: '#A1E2FF',
      fontSize: 12 // 字体大小
    },
    // 图例项的icon circle | rect | roundRect | triangle | diamond | pin | arrow | none | image://url
    icon: 'circle',
    // 修改icon图形大小
    itemHeight: 7,
    // 格式化图例文本
    formatter: function(name) {
      if (!name) return ''
      if (name.length > 5) {
        name = name.slice(0, 5) + '...'
      }
      return name
    },
    // 图例提示框组件，一般搭配图例文本过长
    tooltip: {
      show: true // 是否显示提示框组件
    },
    // type 为scroll有效 按钮与页码之间的距离
    pageButtonItemGap: 5,
    // type 为scroll有效 按钮与图例之间的距离
    pageButtonGap: 10,
    // type 为scroll有效 图例控制块的位置
    pageButtonPosition: 'end', // end | start
    // 图例控制块的图标
    // pageIcons: {},
    // 翻页按钮的大小 number|array<宽,高>
    pageIconSize: 12
  },
  // 坐标系网格组件/grid组件位置/canvan 距离容器的距离
  grid: {
    // 是否显示直角坐标系网格的边框，默认是false
    show: false,
    // grid 区域是否包含坐标轴的刻度线。
    containLabel: true,
    // 网格背景色，默认是透明色，使用此属性，show必须为true
    // backgroundColor: "rgba(0, 0, 0, 1)",
    // grid组件离容器上侧的距离。 值： 'top'|'middle'|'bottom'|%|number
    top: 50,
    left: 20,
    right: 10,
    bottom: 10
  },
  xAxis: {
    show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    type: 'category',
    // name:'类别',
    data: [],
    // 坐标轴名称
    // name: 'x轴',
    // 坐标轴名称与轴线之间的距离
    // nameGap: 5,
    // 左右两侧是否留白
    boundaryGap: true,
    // x轴文字相关配置
    axisLabel: {
      show: true, // 是否显示坐标轴上的文字
      interval: 2, // 间隔几个显示一个label
      rotate: 0, // 文字倾斜程度
      color: '#3FDDFF' // 文字颜色
    },
    // 轴线的相关配置
    axisLine: {
      show: true, // 是否显示坐标轴线
      // 轴线的样式配置
      lineStyle: {
        color: '#3FDDFF'
      },
      symbol: ['none', 'arrow'],
      symbolSize: [8, 8]
    },
    axisTick: {
      show: true // 不显示坐标轴刻度线
    },
    splitLine: {
      show: false // 不显示网格线
    },
    interval: 3
  },
  yAxis: {
    show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    // 坐标轴名称
    name: 'y轴',
    // 坐标轴名称与轴线之间的距离
    nameGap: 10,
    type: 'value',
    // y轴文字相关配置
    axisLabel: {
      show: true, // 是否显示坐标轴上的文字
      color: '#3FDDFF' // 文字颜色
    },
    // 轴线的相关配置
    axisLine: {
      show: true, // 不显示坐标轴线
      // 轴线的样式配置
      lineStyle: {
        color: '#3FDDFF'
      },
      symbol: ['none', 'arrow'],
      symbolSize: [8, 8]
    },
    axisTick: {
      show: false // 不显示坐标轴刻度线
    },
    splitLine: {
      show: false // 不显示网格线
    }
  },
  // 用于区域缩放，一般用户数据过多
  dataZoom: {
    // 数据窗口范围的起始数值 可以是数组下标，也可以是数组本身的值
    startValue: 0,
    // 数据窗口范围的结束数值 可以是数组下标，也可以是数组本身的值
    endValue: 5,
    // 缩放类型 inside slider select
    type: 'inside',
    start: 0, // 默认为0
    end: 100 - 1500 / 31, // 默认为100
    show: true,
    xAxisIndex: [0],
    handleSize: 0, // 滑动条的 左右2个滑动条的大小
    height: 10, // 组件高度
    left: '10%', // 左边的距离
    right: '10%', // 右边的距离
    bottom: 26, // 右边的距离
    borderColor: '#000',
    fillerColor: '#269cdb',
    borderRadius: 5,
    backgroundColor: '#33384b', // 两边未选中的滑动条区域的颜色
    showDataShadow: false, // 是否显示数据阴影 默认auto
    showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
    realtime: true, // 是否实时更新
    filterMode: 'filter'
  },
  // 数据组件
  series: []
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
