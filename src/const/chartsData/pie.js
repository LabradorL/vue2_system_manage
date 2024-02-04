/*
 * @Author: lixiaofeng
 * @Date: 2023-04-28 11:51:08
 * @LastEditTime: 2023-09-07 13:52:34
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 关于饼图的数据和配置
 */
// 饼图数据
export function getPieChartData(params) {
  return new Promise((resolve, reject) => {
    const pieChartData = [
      { name: '诈骗案', allCount:0, dataCount: 1130, ratio: 0 },
      { name: '盗窃案', allCount:0, dataCount: 1016, ratio: 0 },
      { name: '其他', allCount:0, dataCount: 323, ratio: 0 },
      { name: '监外执行（社区矫正）检察档案', allCount:0, dataCount: 114, ratio: 0 },
      { name: '危险驾驶案', allCount:0, dataCount: 108, ratio: 0 },
      { name: '食药品案', allCount:0, dataCount: 94, ratio: 0 },
      { name: '涉车案', allCount:0, dataCount: 39, ratio: 0 },
      { name: '绑架案', allCount:0, dataCount: 1, ratio: 0 }
    ]
    const result = {
      code: 200,
      msg: '成功',
      data: pieChartData,
      total: pieChartData.length
    }
    resolve(result)
  })
}

// 饼图的options配置
export const pieOptions = {
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
    trigger: 'item',
    // 提示框文字格式化
    formatter: function(params) {
      // seriesName 系列名称，option.series[0].name的值
      // name 数据名，类目名
      // data 传入的原始数据
      // dataIndex 数据在传入的 data 数组中的 index
      // value 传入的数值
      // marker 对应的图例标记
      // percent 饼图，漏斗图的百分比
      // color 数据图形的颜色
      // seriesType 系列类型
      // seriesIndex 系列在传入的 option.series 中的 index
      const { marker, name, seriesName, value, percent } = params
      return `<div style="color:#666;font-size:14px">${marker}<span>${name}</span><br/> 
        ${seriesName}: <span style="font-weight: 900">${value || 0}</span><br/>
        百分比：<span style="font-weight: 900">${percent}%</span></div>`
    }
  },
  // 图例组件
  legend: {
    // 是否显示图例
    show: true,
    // 图例类型 plain|scroll
    type: 'scroll',
    // 图例数据
    // data: legendData,
    // 排列方向 vertical（垂直）horizontal（水平）
    orient: 'vertical',
    // 图例组件离容器右侧的距离。 值： 'left'|'center'|'right'|%|number|auto
    right: '1%',
    // 图例组件离容器上侧的距离。 值： 'top'|'middle'|'bottom'|%|number|auto
    top: 'middle',
    // 图例组件离容器下侧的距离。
    bottom: 0,
    // 图例组件的宽度 string | number
    width: 10,
    // 图例每项之间的间隔
    itemGap: 10,
    // 图例的公用文本样式。
    textStyle: {
      fontSize: 12, // 字体大小
      color: '#A1E2FF'
    },
    // 图例项的icon circle | rect | roundRect | triangle | diamond | pin | arrow | none | image://url
    icon: 'circle',
    // 修改icon图形大小
    itemHeight: 10,
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
    // grid组件离容器上侧的距离。 值： 'top'|'middle'|'bottom'|%|number
    top: 'top',
    left: 0,
    right: '1%',
    bottom: 10
  },
  // 数据组件
  series: [
    {
      // 系列名称，用于tooltip的显示
      name: '案件数据',
      // 类型
      type: 'pie',
      data: [],
      // 从option.colord的取色策略 series | data
      // series 同一系列中的所有数据都是用相同的颜色
      // data 每个数据项都使用不同的颜色
      colorBy: 'data',
      // pie chart组件离容器左侧的距离
      // 高亮状态的扇区和标签样式。
      emphasis: {
        // 图形样式
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      // 可控制圆饼的大小, [内半径,外半径] ,numbe | string
      radius: ['10%', '50%'],
      // 饼图的中心（圆心）坐标,[x,y]。
      center: ['45%', '50%'],
      // 饼图图形上的文本标签
      label: {
        show: true, // 是否显示文本标签
        // 文本显示宽度
        width: 80,
        // color: '', // 文本颜色
        // 标签位置 outside | inside |inner | center
        position: 'outside'
        // 标签文字格式化 string | Function
        // formatter: (params) => {
        //   console.log(params)
        //   return ''
        // }
      },
      // 标签的视觉引导线配置
      labelLine: {
        show: true, // 是否显示视觉引导线,基于有标签
        // 是否平滑视觉引导线 boolean | number[0,1]
        smooth: false,
        // 引导线的样式
        lineStyle: {
          width: 1
          // color: 'rgba(255,255,255,0.7)' //不配颜色是对应的颜色
        },
        // 视觉引导线第一段的长度
        length: 10,
        // 视觉引导项第二段的长度
        length2: 10

      }
    }
  ]
}
export const threePieData = {
  grid3D: {
    show: false,
    // left:  '-25%',  图例有百分比时使用
    left:  '-17%',
    boxHeight: 0.5752212389380531, // 圆环的高度
    viewControl: {
      // 3d效果可以放大、旋转等，请自己去查看官方配置
      alpha:28, // 角度
      distance:540, // 调整视角到主体的距离，类似调整zoom
      rotateSensitivity: 0, // 设置为0无法旋转
      zoomSensitivity: 0, // 设置为0无法缩放
      panSensitivity: 0, // 设置为0无法平移
      autoRotate: false // 自动旋转
    }
  },
  label: {
    show: true,
    position: 'outside',
    formatter: '{b} \n{c} {d}%'
  },
  labelLine: {
    show: true,
    lineStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    backgroundColor: '#033b77',
    borderColor: '#033b77',
    textStyle: {
      color: '#fff',
      fontSize: 13
    },
    formatter: params => {
      if (
        params.seriesName !== 'mouseoutSeries' &&
          params.seriesName !== 'pie2d'
      ) {
        const tempData = threePieData.series[params.seriesIndex].pieData
        const bfb = tempData ? ((tempData.endRatio - tempData.startRatio) * 100).toFixed(2) : 0
        return (
          `${params.seriesName}<br/>`+
          `${bfb}%</br>`
        )
      }
    }
  },
  xAxis3D: {
    min: -1,
    max: 1
  },
  yAxis3D: {
    min: -1,
    max: 1
  },
  zAxis3D: {
    min: -1,
    max: 1
  },
  series: [
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    },
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    },
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    },
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    },
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    },
    {
      name: '诈骗案',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: [],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1
      },
      itemStyle: {
        color: '#01CBD8',
        opacity: 1
      },
      center: ['10%', '50%']
    }
  ]
}
