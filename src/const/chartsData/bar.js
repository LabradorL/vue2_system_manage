/*
 * @Author: lixiaofeng
 * @Date: 2023-04-28 11:51:08
 * @LastEditTime: 2024-01-17 09:44:15
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 关于柱状图的数据和配置
 */
// 饼图数据
export function getBarChartData(params) {
  return new Promise((resolve, reject) => {
    const barChartData = [
      { name: '涉企案件', allCount:0, dataCount: 843, ratio: 0 },
      { name: '社矫再犯罪', allCount:0, dataCount: 226, ratio: 0 },
      { name: '新业态场所未保', allCount:0, dataCount: 160, ratio: 0 },
      { name: '食药案件', allCount:0, dataCount: 136, ratio: 0 },
      { name: '涉车案件', allCount:0, dataCount: 22, ratio: 0 }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: barChartData,
      total: barChartData.length
    }
    resolve(result)
  })
}
export function getMoreBarChartData(params) {
  return new Promise((resolve, reject) => {
    const barChartData = [{
      year: 2019,
      list: [
        { name: '涉企案件', allCount:0, dataCount: 843, ratio: 0 },
        { name: '社矫再犯罪', allCount:0, dataCount: 226, ratio: 0 },
        { name: '新业态场所未保', allCount:0, dataCount: 160, ratio: 0 },
        { name: '食药案件', allCount:0, dataCount: 136, ratio: 0 },
        { name: '涉车案件', allCount:0, dataCount: 22, ratio: 0 }
      ] }, {
      year: 2020,
      list: [
        { name: '涉企案件', allCount:0, dataCount: 843, ratio: 0 },
        { name: '社矫再犯罪', allCount:0, dataCount: 226, ratio: 0 },
        { name: '新业态场所未保', allCount:0, dataCount: 160, ratio: 0 },
        { name: '食药案件', allCount:0, dataCount: 136, ratio: 0 },
        { name: '涉车案件', allCount:0, dataCount: 22, ratio: 0 }
      ] }, {
      year: 2021,
      list: [
        { name: '涉企案件', allCount:0, dataCount: 843, ratio: 0 },
        { name: '社矫再犯罪', allCount:0, dataCount: 226, ratio: 0 },
        { name: '新业态场所未保', allCount:0, dataCount: 160, ratio: 0 },
        { name: '食药案件', allCount:0, dataCount: 136, ratio: 0 },
        { name: '涉车案件', allCount:0, dataCount: 22, ratio: 0 }
      ] }, {
      year: 2022,
      list: [
        { name: '涉企案件', allCount:0, dataCount: 843, ratio: 0 },
        { name: '社矫再犯罪', allCount:0, dataCount: 226, ratio: 0 },
        { name: '新业态场所未保', allCount:0, dataCount: 160, ratio: 0 },
        { name: '食药案件', allCount:0, dataCount: 136, ratio: 0 },
        { name: '涉车案件', allCount:0, dataCount: 22, ratio: 0 }
      ] }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: barChartData,
      total: barChartData.length
    }
    resolve(result)
  })
}

// 柱状图的options配置
export const barOptions = {
  // 柱形图颜色
  color: ['#006EE9FF', '#00CCFFFF', '#F5A43AFF', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
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
  // 图例组件
  legend: {
    // 是否显示图例
    show: false,
    // 图例类型 plain|scroll
    type: 'plain',
    // 图例数据
    data: [],
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
    icon: 'rect',
    // 修改icon图形大小
    // itemHeight: 7,
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
  // 提示框组件
  tooltip: {
    // 触发类型 item | axis | none
    // item 数据项图形触发，如散点图、饼图等无类目轴的图表中使用
    // axis 坐标轴触发，如柱形图、折线图等类目轴的图表中使用
    trigger: 'axis',
    // 坐标指示器配置
    axisPointer: {
      // 指示器类型 shadow line cross none
      type: 'shadow'
    }
    // 提示框浮层的位置 默认跟随鼠标的位置 string | Array[left, top] | Function
    // position: function(point, params, dom, rect, size) {
    //   // point: 鼠标位置，如 [20, 40]。
    //   // params: 同 formatter 的参数相同。
    //   // dom: tooltip 的 dom 对象。
    //   // rect: 只有鼠标在图形上时有效，是一个用x, y, width, height四个属性表达的图形包围盒。
    //   // size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：{contentSize: [width, height], viewSize: [width, height]}。
    //   return [point[0] + 50, 20]
    // }
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
    left: 0,
    right: 50,
    bottom: 10
  },
  xAxis: {
    show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    type: 'category',
    // name:'类别',
    data: [],
    // 坐标轴名称
    name: 'x轴',
    // 坐标轴名称与轴线之间的距离
    nameGap: 5,
    // 坐标轴名称字体样式
    nameTextStyle: {
      color: '#909399'
    },
    boundaryGap: true,
    // x轴文字相关配置
    axisLabel: {
      show: true, // 是否显示坐标轴上的文字
      interval: 0,
      rotate: 20, // 文字倾斜程度
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
    axisTick:{
      show: false // 不显示坐标轴刻度线
    },
    splitLine:{
      show:false // 不显示网格线
    }
  },
  yAxis: {
    show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    // 坐标轴名称
    name: 'y轴',
    // 坐标轴名称字体样式
    nameTextStyle: {
      color: '#909399'
    },
    // 坐标轴名称与轴线之间的距离
    nameGap: 10,
    type: 'log',
    // 数值相差较大时可以使用此属性，使图表数据样式美观
    logBase: 10,
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
    axisTick:{
      show: false // 不显示坐标轴刻度线
    },
    splitLine:{
      show: false // 不显示网格线
    },
    min: 5
  },
  // 数据组件
  series: []
}

export const barSeriesOptions = {
  // 系列名称，用于tooltip的显示
  name: '',
  // 类型
  data: [],
  type: 'bar',
  // barWidth: '50%', // 改变柱子的宽度
  // 不同系列的柱间距离
  barGap: 0,
  // 是否显示每一个柱状图的数据
  label: {
    show: true,
    color: '#000',
    // 数据显示的位置 top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
    position: 'top',
    fontWeigth: 'bloder'
    // 标签文字格式化 string | Function
    // formatter: (params) => {
    //   console.log(params)
    //   return ''
    // }
  },
  // 从option.colord的取色策略 series | data
  // series 同一系列中的所有数据都是用相同的颜色
  // data 每个数据项都使用不同的颜色
  colorBy: 'data',
  // 高亮状态的柱状图样式。
  emphasis: {
    // 图形样式
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  // 是否显示柱条的背景色
  showBackground: false
}

