<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box customer-scrollbar">
        <div id="graphOne" ref="graphOneRef" class="echarts-content" :style="{height:boxHeight}" />
      </div>
    </template>
    <div v-else class="empty-box">
      <span class="empty-text">暂无数据</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPieChartData } from '@/const/chartsData/pie'
export default {
  // 组件名称
  name: 'GraphOne',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      // 是否有数据
      hasData: false,
      // 连接线的数据
      linkData: [],
      // 节点数据
      nodeData: [],
      // 图表调色盘
      color: ['#00FFFF', '#00FF80', '#FFEA00', '#FF7300', '#9500B3', '#3377FF'],
      // 图表配置
      options: {
        itemStyle: {
          normal: {
            color: '#67C23A'
          },
          shadowBlur: 0
        },
        textStyle: {
          color: '#fff',
          textBorderColor: 'transform',
          fontSize: 13,
          fontWeight: 600
        },
        animationDuration: 500,
        animationEasingUpdate: 'quinticInOut',
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        tooltip: {
          backgroundColor: '#2bb2caff',
          borderColor: '#2bb2caff',
          textStyle: {
            color: '#fff',
            textBorderColor: 'transform',
            fontSize: 12
          },
          formatter: function(params) {
            // 悬浮提示框显示的内容
            if (params.data.islink) {
              return (
                'source：&nbsp' + params.data.source + '<br />' + 'target：&nbsp' + params.data.target
              )
            }
            return ''
          }
        },
        grid: {
          top: 40
        },
        series: [
          {
            type: 'graph',
            coordinateSystem: 'cartesian2d',
            legendHoverLink: false,
            hoverAnimation: true,
            nodeScaleRatio: false,
            // 建头
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            edgeLabel: {
              show: false
            },
            focusNodeAdjacency: true,
            roam: false,
            // 圆形上面的文字
            label: {
              normal: {
                position: 'bottom',
                show: true,
                textStyle: {
                  fontSize: 13,
                  color: '#fff',
                  borderWidth: 0
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#409eff'
              },
              shadowBlur: 0
            },
            lineStyle: {
              normal: {
                show: true,
                width: 2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#36cde6ff' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#36cde6ff' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }

                // curveness: 0.2
              },
              emphasis: {
                color: '#50FCFC',
                width: 2,
                type: 'dashed' // 虚线
              }
            },
            data: [],
            links: []
          }
        ]
      },
      // 图表元素
      echartsDom: '',
      // icon的列表
      imgList: [
        'M1172.985723 682.049233l-97.748643-35.516964a32.583215 32.583215 0 0 0-21.830134 61.582735l25.7398 9.123221-488.744218 238.181638L115.670112 741.349163l47.245961-19.223356a32.583215 32.583215 0 0 0-22.808051-60.604819l-119.579777 47.896905a32.583215 32.583215 0 0 0 0 59.952875l557.820313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.527227-278.584184a32.583215 32.583215 0 0 0-3.258721-59.952875z,M1185.041693 482.966252l-191.587622-68.749123a32.583215 32.583215 0 1 0-21.831133 61.254764l118.927833 43.010323-488.744218 237.855666-471.474695-213.744727 116.973-47.244961a32.583215 32.583215 0 1 0-24.111938-60.604819l-190.609705 75.593537a32.583215 32.583215 0 0 0-20.528246 29.650465 32.583215 32.583215 0 0 0 20.528246 30.30141l557.819313 251.866468a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0 18.24744-30.953354 32.583215 32.583215 0 0 0-21.505161-29.651465z,M32.583215 290.075742l557.819313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0-3.257721-59.952875L626.244463 2.042365a32.583215 32.583215 0 0 0-23.134022 0l-570.527226 228.080502a32.583215 32.583215 0 0 0-19.224357 30.627382 32.583215 32.583215 0 0 0 19.224357 29.325493zM615.817355 67.534767l474.733416 170.408432-488.744218 238.180638-471.474695-215.372588z',
        'M1308.444444 0h-1213.629629C42.477037 0 0 40.96 0 91.401481v841.197038C0 983.04 42.477037 1024 94.814815 1024h1213.629629c52.337778 0 94.814815-40.96 94.814815-91.401481V91.401481C1403.259259 40.96 1360.782222 0 1308.444444 0zM94.814815 36.560593h1213.629629c31.402667 0 56.888889 24.576 56.888889 54.878814v841.121186c0 30.340741-25.486222 54.878815-56.888889 54.878814h-1213.629629c-31.402667 0-56.888889-24.576-56.888889-54.878814V91.439407c0-30.340741 25.486222-54.878815 56.888889-54.878814zM682.666667 113.777778H113.777778v796.444444h568.888889V113.777778zM1147.904 872.296296h-35.422815v37.925926h35.422815v-37.925926zM1077.096296 872.296296h-35.384889v37.925926h35.384889v-37.925926z m-70.807703 0H970.903704v37.925926h35.384889v-37.925926z m-70.769778 0h-35.422815v37.925926h35.422815v-37.925926z m318.577778 0H1183.288889v37.925926H1289.481481v-75.851852h-35.384888v37.925926zM758.518519 872.296296h35.384888v-37.925926H758.518519v37.925926z m35.384888-113.777777H758.518519v37.925925h35.384888v-37.925925zM1289.481481 758.518519h-35.384888v37.925925H1289.481481v-37.925925z m-495.578074-75.851852H758.518519v37.925926h35.384888v-37.925926zM1289.481481 682.666667h-35.384888v37.925926H1289.481481v-37.925926z m-495.578074-75.851852H758.518519v37.925926h35.384888v-37.925926zM1289.481481 606.814815h-35.384888v37.925926H1289.481481v-37.925926z m-495.578074-75.851852H758.518519v37.925926h35.384888v-37.925926zM1289.481481 530.962963h-35.384888v37.925926H1289.481481v-37.925926z m-495.578074-75.851852H758.518519v37.925926h35.384888v-37.925926zM1289.481481 455.111111h-35.384888v37.925926H1289.481481v-37.925926z m-495.578074-75.851852H758.518519v37.925926h35.384888v-37.925926zM1289.481481 379.259259h-35.384888v37.925926H1289.481481v-37.925926zM793.903407 303.407407H758.518519v37.925926h35.384888V303.407407zM1289.481481 303.407407h-35.384888v37.925926H1289.481481V303.407407zM793.903407 227.555556H758.518519v37.925925h35.384888V227.555556zM1289.481481 227.555556h-35.384888v37.925925H1289.481481V227.555556zM864.711111 113.777778H758.518519v75.851852h35.384888V151.703704H864.711111V113.777778z m389.385482 37.925926v37.925926H1289.481481V151.703704h-35.384888z m-318.577778-37.925926h-35.422815v37.925926h35.422815V113.777778z m70.769778 0H970.903704v37.925926h35.384889V113.777778zM1077.096296 113.777778h-35.384889v37.925926h35.384889V113.777778z m70.807704 0h-35.422815v37.925926h35.422815V113.777778z m70.769778 0H1183.288889v37.925926h35.384889V113.777778zM864.711111 872.296296h-35.384889v37.925926h35.384889v-37.925926zM1061.925926 606.814815h227.555555v303.407407h-227.555555zz',
        'M1024 708.7c0 36.4-20.5 69.6-53.1 85.9 0 0-261.1 130.3-374.9 186.8-23.9 11.9-52-5.5-52-32.3V456.4c0-20.3 12.7-38.4 31.8-45.2l415.9-148.6c15.6-5.6 32.1 6 32.1 22.6 0.2 105.9 0.2 423.5 0.2 423.5zM480 456.2v490.4c0 27.2-29.1 44.6-53 31.7L50.6 776.2C19.4 759.4 0 726.9 0 691.6c0 0 0.1-304.3 0.3-408 0-16.6 16.5-28.2 32.1-22.5L448.3 411c19 6.9 31.7 24.9 31.7 45.2zM978.9 199.2L544.5 354.4c-21 7.5-43.9 7.5-64.9-0.1L47.5 198.5c-9.4-3.4-10.8-16.1-2.4-21.4 5.4-3.3 11.1-6.2 17.2-8.5l416.1-156c10.9-4.1 22.3-6.1 33.7-6.1 11.4 0 22.7 2 33.5 6.1l415.9 155.1c7.2 2.7 13.9 6.2 20.1 10.3 8.1 5.5 6.5 17.9-2.7 21.2z'
      ],
      // 头部显示的文字
      titleList: [
        {
          name: '客户端IP',
          linkName: '',
          coordConfig: {
            level: '1'
          },
          value: [0, 200],
          draggable: false,
          fixed: true,
          symbol: 'rect',
          label: {
            normal: {
              position: 'inside',
              show: true,
              textStyle: {
                fontSize: 13,
                color: '#fff',
                borderWidth: 0
              }
            }
          },
          itemStyle: {
            color: 'transparent',
            shadowBlur: 0
          }
        },
        {
          name: '应用用户',
          linkName: '',
          coordConfig: {
            level: '2'
          },
          value: [100, 200],
          draggable: false,
          fixed: true,
          symbol: 'rect',
          label: {
            normal: {
              position: 'inside',
              show: true,
              textStyle: {
                fontSize: 13,
                color: '#fff',
                borderWidth: 0
              }
            }
          },
          itemStyle: {
            color: 'transparent',
            shadowBlur: 0
          }
        },
        {
          name: '应用服务',
          linkName: '',
          coordConfig: {
            level: '3'
          },
          value: [200, 200],
          draggable: false,
          fixed: true,
          symbol: 'rect',
          label: {
            normal: {
              position: 'inside',
              show: true,
              textStyle: {
                fontSize: 13,
                color: '#fff',
                borderWidth: 0
              }
            }
          },
          itemStyle: {
            color: 'transparent',
            shadowBlur: 0
          }
        }
        // {
        //   name: '数据库用户',
        //   linkName: '',
        //   coordConfig: {
        //     level: '4'
        //   },
        //   value: [300, 200],
        //   draggable: false,
        //   fixed: true,
        //   symbol: 'rect',
        //   label: {
        //     normal: {
        //       position: 'inside',
        //       show: true,
        //       textStyle: {
        //         fontSize: 13,
        //         color: '#fff',
        //         borderWidth: 0
        //       }
        //     }
        //   },
        //   itemStyle: {
        //     color: 'transparent',
        //     shadowBlur: 0
        //   }
        // },

        // {
        //   name: '数据库',
        //   linkName: '',
        //   coordConfig: {
        //     level: '5'
        //   },
        //   value: [400, 200],
        //   draggable: false,
        //   fixed: true,
        //   symbol: 'rect',
        //   label: {
        //     normal: {
        //       position: 'inside',
        //       show: true,
        //       textStyle: {
        //         fontSize: 13,
        //         color: '#fff',
        //         borderWidth: 0
        //       }
        //     }
        //   },
        //   itemStyle: {
        //     color: 'transparent',
        //     shadowBlur: 0
        //   }
        // }
      ],
      // 容器的高度
      boxHeight: '100%'

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    // 初始化 获取数据
    initData() {
      if (this.echartsDom) {
        this.echartsDom.clear()
      }
      this.hasData = false
      this.dataList = []
      getPieChartData().then(res => {
        if (res.data.length) {
          this.hasData = true
          res.data = [
            { name: '101.861.101.160', linkName: '192.168.10.217', level: '1' },
            { name: '101.861.101.160', linkName: '192.168.10.218', level: '1' },
            { name: '101.861.101.160', linkName: '192.168.10.216', level: '1' },
            { name: '101.861.101.160', linkName: '192.168.10.213', level: '1' },
            { name: '101.861.101.160', linkName: '192.168.10.208', level: '1' },
            { name: '101.861.101.161', linkName: '101.861.101.106', level: '1' },
            { name: '101.861.101.161', linkName: '101.861.101.103', level: '1' },
            { name: '101.861.101.161', linkName: '101.861.101.109', level: '1' },
            { name: '101.861.101.161', linkName: '101.861.101.108', level: '1' },
            { name: '101.861.101.203', linkName: '172.16.2.55', level: '2' },
            { name: '101.861.101.202', linkName: '172.16.2.56', level: '2' },
            { name: '101.861.101.202', linkName: '172.16.2.55', level: '2' },
            { name: '101.861.101.201', linkName: '172.16.2.55', level: '2' },
            { name: '101.861.101.201', linkName: '172.16.2.57', level: '2' },
            { name: '101.861.101.201', linkName: '172.16.2.58', level: '2' },
            { name: '101.861.101.202', linkName: '172.16.2.59', level: '2' }
          ]
          this.formatData(res.data)
        }
      })
    },
    //  数据进行处理
    formatData(data) {
      this.linkData = []
      this.nodeData = []
      const tempEcharsData = []
      // // 判断节点名称是否重复
      const echarsMap = new Map()
      // // 计算节点位置
      const levelNumMap = new Map()
      // // 获取最大数据量
      let maxNum = 1
      data.forEach((item) => {
        const itemData = {
          name: item.name, // 节点名
          linkTargetName: item.linkName, // 连线目标节点
          linkValue: ' ', // 连线介绍
          coordConfig: {
            level: item.level // 层级
          },
          value: [(Number(item.level) - 1) * 100, 180],
          draggable: false,
          fixed: true,
          // symbol: `image://${imgList[Number(item.level) - 1]}`, //icon是图片
          symbol: `path://${this.imgList[Number(item.level) - 1]}`, // icon是svg的代码
          symbolSize: 40,
          itemStyle: {
            color: this.color[Number(item.level) - 1]
          }
        }
        // 是否存在某个节点，存在说明是从linkname得到的
        if (!echarsMap.has(item.name)) {
          // 不存在直接push
          echarsMap.set(item.name, item.level)
          // 记录每个等级的个数
          if (levelNumMap.has(item.level)) {
            const len = levelNumMap.get(item.level)
            levelNumMap.set(item.level, len + 1)
            itemData.value[1] = 180 - len * 30
            if (len + 1 > maxNum) {
              maxNum = len + 1
            }
          } else {
            levelNumMap.set(item.level, 1)
            itemData.value[1] = 180
          }
          tempEcharsData.push(itemData)
        }

        this.linkData.push({
          source: item.name,
          target: item.linkName,
          islink: true
        })
      })
      data.forEach((item) => {
        if (!echarsMap.has(item.linkName)) {
          // linkname作为节点需要 等级需要加1
          const tempLevel = String(Number(item.level) + 1)
          echarsMap.set(item.linkName, tempLevel)
          let y = 180
          if (levelNumMap.has(tempLevel)) {
            const len = levelNumMap.get(tempLevel)
            levelNumMap.set(tempLevel, len + 1)
            y = 180 - len * 30
            if (len + 1 > maxNum) {
              maxNum = len + 1
            }
          } else {
            levelNumMap.set(tempLevel, 1)
            y = 180
          }

          tempEcharsData.push({
            name: item.linkName, // 节点名
            linkTargetName: item.linkName, // 连线目标节点
            linkValue: ' ', // 连线介绍
            coordConfig: {
              level: tempLevel
            },
            value: [(Number(tempLevel) - 1) * 100, y],
            draggable: false,
            fixed: true,
            // symbol: `image://${imgList[Number(tempLevel) - 1]}`,
            symbol: `path://${this.imgList[Number(tempLevel) - 1]}`, // icon是svg的代码
            symbolSize: 40,
            itemStyle: {
              color: this.color[Number(tempLevel) - 1]
            }
          })
        }
      })

      this.boxHeight = Math.ceil((maxNum + 1) / 7) * 100 + '%'
      this.nodeData = [...this.titleList, ...tempEcharsData]
      this.$nextTick(() => {
        this.renderingEcharts(data)
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.graphOneRef)
      // this.echartsDom = echarts.init(document.getElementById('graphOne'))
      this.options.series[0].data = this.nodeData
      this.options.series[0].links = this.linkData
      this.echartsDom.setOption(this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  overflow: hidden;
  .data-box {
    height: 100%;
    overflow-y: auto;
    .echarts-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
