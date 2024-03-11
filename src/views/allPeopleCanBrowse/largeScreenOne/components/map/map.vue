<template>
  <div class="map-box" style=" width: 100%;height: 100%;">
    <div id="mapEchart" class="content-center-top" />
    <div v-show="mapType !== 0" class="map-return" @click="returnMap()">
      <img src="../../imgs/map/icon-map-return.png" alt="" class="return-icon-size">
      <span>返回上一级</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import cityToCode from '../../JSON/cityToCode.json'
// import cityLine from '../../JSON/cityLineMap.json'
export default {
  name: 'Map',
  components: {},
  props: {
    // 传入的经纬度
    lngLat: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      mapType: 0, // 地图等级，0-地市 1-市 2-区县
      legendName: 0,
      // 地图等级
      mapLeave: 0,
      mapGaoxinNum: 100,
      // 图例等级分类
      mapSection: [[0, 100], [101, 200], [201, 500], [500, 1000], [1000]],
      symbolImg: '',
      // 数据列表
      cityDataList: [],
      // 每级地图的名字
      parentMapNameList: ['宁夏回族自治区'],
      mapChart: null,
      cityOrgId: {
        640100: 'ff8080814c972f3f014c981aa70e13c3',
        640500: 'ff8080814c972f3f014c9822363017d3',
        640300: 'ff8080814c972f3f014c98244f5d1915',
        640400: 'ff8080814c972f3f014c982693a61a2d',
        640200: 'ff8080814c972f3f014c981e70b015e3',
        宁夏: '232AF1D001B65527E055000000000001',
        宁东: 'ff8080814c972f3f014c981fee3a171d'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getGeoJson(this.parentMapNameList[this.parentMapNameList.length - 1])
    // this.initMap("宁夏回族自治区", this.cityDataList, this.mapSection);
    })
  },
  methods: {
    initEcharts(mapData, mapJson) {
      const that = this
      const mapName = this.parentMapNameList[this.parentMapNameList.length - 1]
      if (!this.mapChart) {
        const dom = document.getElementById('mapEchart')
        this.mapChart = that.$echarts.init(dom)
        window.addEventListener('resize', function() {
          this.mapChart.resize()
        })
        this.mapChart.on('click', this.echartsMapClick)
      }
      // 注册
      that.$echarts.registerMap(mapName, mapJson)
      const option = {
        color: ['#10A2E8'],
        // 标题
        title: {
          show: false,
          text: mapName,
          left: 'center'
        },
        // 工具栏
        toolbox: {
          show: false,
          feature: {
            myBack: {
              show: false,
              title: '返回',
              icon: 'path://M473.2 276.9v-133c-4-18.4-11.7-27-20.2-30.3-17.2-6.7-37.8 8.5-37.8 8.5L95.9 395.4c-70.1 48.4-4.8 84.7-4.8 84.7L405.5 751c62.9 46 67.7-24.2 67.7-24.2V603.4c319.3-99.2 449.9 297.5 449.9 297.5 12.1 21.8 19.3 0 19.3 0 123.4-595-469.2-624-469.2-624z m0 0',
              iconStyle: {
                color: '#1aaef6',
                borderColor: '#1aaef6'
              },
              onclick: function() {
                const opt = that.getGeoJson(mapName)
                // opt.toolbox.feature.myBack.show = false
                // myChart.setOption(opt)
              }
            }
          }
        },
        geo: {
          show: false,
          silent: true,
          map: mapName,
          // top: 0,
          // bottom: 0,
          roam: false,
          // aspectScale: 0.85,
          // zoom: 0.6,
          itemStyle: {
            // 地图区域的多边形 图形样式
            normal: {
              // 是图形在默认状态下的样式
              borderWidth: 1,
              borderColor: '#75cef9',
              shadowColor: '#5daee2',
              shadowOffsetY: 10,
              shadowOffsetX: 8
            }
          }
        },
        grid: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        },
        series: [
          {
            top: '5%',
            type: 'map',
            roam: false, // 是否开启鼠标缩放和平移漫游
            // 使用 registerMap 注册的地图名称
            map: mapName,
            hoverAnimation: false,
            emphasis: {
              // 鼠标悬停时文字是否显示
              label: {
                show: true
              },
              // 鼠标悬停时地图的颜色
              // itemStyle: {
              //   areaColor: "#ff9a2c",
              // },
              formatter: '{c|{c}}\n{hr|} {b|{b}}',
              rich: {
                c: {
                  fontSize: 24,
                  color: '#B8DBFF',
                  fontFamily: 'PangMenZhengDao',
                  align: 'center',
                  backgroundColor: {
                    image: require('../../imgs/map/map-num-bg.png')
                  },
                  padding: [5, 0],
                  height: 27
                },
                hr: {
                  borderColor: 'rgba(28, 154, 250, 1)',
                  width: 12,
                  borderWidth: 3,
                  height: 40,
                  borderRadius: 6,
                  lineHeight: 40,
                  padding: [-14, 0, -14, 0]
                },
                b: {
                  color: '#FFFFFF',
                  fontSize: 16,
                  height: 40,
                  lineHeight: 40,
                  padding: [0, 0, 0, 5]
                }
              }
            },
            scaleLimit: {
              min: 1,
              max: 1
            },
            // 初始化每一块地图的样式
            itemStyle: {
              normal: {
                // label: {show: true},
                color: '#ffffff',
                borderWidth: 0, // 区域边框宽度
                borderColor: '#transparent', // 区域边框颜色
                areaColor: 'transparent'
                // borderWidth: 1,
                // borderColor: "#75cef9",
                // areaColor: {
                //   type: "linear",
                //   x: 0,
                //   y: 0,
                //   x2: 0,
                //   y2: 800,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: "#0770d5", // 0% 处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: "#43bef6", // 100% 处的颜色
                //     },
                //   ],
                //   global: true,
                // },
              }
              // 鼠标悬停时的样式，优先级高于 series中的emphasis
              // emphasis: {
              //   color: "#ffffff",
              //   areaColor: {
              //     type: "radial",
              //     x: 0.5,
              //     y: 0.5,
              //     r: 0.5,
              //     colorStops: [
              //       {
              //         offset: 0.5,
              //         color: "RGBA(0, 0, 0, 0.2)", // 0% 处的颜色
              //       },
              //       {
              //         offset: 1,
              //         color: "RGBA(31, 100, 187, 1)", // 100% 处的颜色
              //       },
              //     ],
              //     globalCoord: false, // 缺省为 false
              //   },
              // },
            },
            label: {
              show: true,
              formatter: '{c|{c}}\n{hr|} {b|{b}}',
              rich: {
                c: {
                  fontSize: 24,
                  color: '#B8DBFF',
                  fontFamily: 'PangMenZhengDao',
                  align: 'center',
                  backgroundColor: {
                    image: require('../../imgs/map/map-num-bg.png'),
                    size: ['100%', '27']
                  },
                  height: 27
                },
                hr: {
                  borderColor: 'rgba(28, 154, 250, 1)',
                  width: 12,
                  borderWidth: 3,
                  height: 40,
                  borderRadius: 6,
                  lineHeight: 40,
                  padding: [-14, 0, -14, 0]
                },
                b: {
                  color: '#FFFFFF',
                  fontSize: 16,
                  height: 40,
                  lineHeight: 40,
                  padding: [0, 0, 0, 5]
                }
              }
            },
            data: mapData,
            // 层级
            z: 2,
            // 选中模式(单选/多选/关闭)
            selectedMode: 'single'
            //  用于scale 地图的长宽比
            // aspectScale: 0.85,
            // 当前视角的缩放比例。
            // zoom: 0.6,
          }
        ]
      }
      // 这里加true是为了让地图重新绘制，不然如果你有筛选的时候地图会飞出去
      this.mapChart.setOption(option, true)
    },
    // 获取地图数据
    getGeoJson(mapName) {
      // 通过导入获取数据
      // const mapJson = require(`../../JSON/ning-xia/${mapName}.json`)
      // this.getMapData(mapJson)
      // 通过接口获取数据
      const mapCode = cityToCode[mapName]
      const url = 'json/map/' + mapCode + '.json'
      axios.get(url, {}).then((response) => {
        const JSON = response.data
        this.getMapData(JSON)
      })
    },
    // 获取数据
    getMapData(Json) {
      const that = this
      // 通过接口获取数据
      const resultData = Json.features.map((item) => {
        return {
          name: item.properties.name,
          value: Math.ceil(Math.random() * 1000),
          level: item.properties.level,
          cityCode: item.properties.adcode
        }
      })
      const dataList = []
      // 将数据进行处理
      resultData.forEach((item) => {
        const dataItem = {
          value: item.value,
          name: item.name,
          orgId:
            that.cityOrgId[item.cityCode] || 'ff8080814c972f3f014c981fee3a171d',
          funcType: item.funcType || '02',
          label: {
            show: true,
            formatter: '{c|{c}}\n{hr|} {b|{b}}',
            rich: {
              c: {
                fontSize: 24,
                color: '#ffffff',
                fontFamily: 'PangMenZhengDao',
                align: 'center',
                backgroundColor: {
                  image: require('../../imgs/map/map-num-bg.png')
                },
                padding: [5, 0],
                height: 27,
                lineHeight: 27
              },
              hr: {
                borderColor: '#18587D',
                width: 12,
                borderWidth: 3,
                height: 40,
                borderRadius: 6,
                lineHeight: 40,
                padding: [-14, 0, -14, 0]
              },
              b: {
                color: '#FFFFFF',
                fontSize: 16,
                height: 40,
                lineHeight: 40,
                padding: [0, 0, 0, 5]
              }
            }
          },
          itemStyle: {
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0.5,
                  color: 'RGBA(0, 0, 0, 0.2)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'RGBA(31, 100, 187, 1)' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            borderColor: '#18587D',
            borderWidth: 1
          }
        }
        if (item.value <= that.mapSection[0][1]) {
          dataItem.label.rich.hr.borderColor = '#18587D'
          dataItem.itemStyle.areaColor.colorStops = [
            {
              offset: 0,
              color: 'RGBA(24, 88, 125, 0.2)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'RGBA(24, 88, 125, 1)' // 100% 处的颜色
            }
          ]
          dataItem.itemStyle.borderColor = '#18587D'
        } else if (
          item.value >= that.mapSection[1][0] &&
          item.value <= that.mapSection[1][1]
        ) {
          dataItem.label.rich.hr.borderColor = '#1061FF'
          dataItem.itemStyle.areaColor.colorStops = [
            {
              offset: 0.5,
              color: 'RGBA(16, 97, 255, 0.2)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'RGBA(16, 97, 255, 1)' // 100% 处的颜色
            }
          ]
          dataItem.itemStyle.borderColor = '#1061FF'
        } else if (
          item.value >= that.mapSection[2][0] &&
          item.value <= that.mapSection[2][1]
        ) {
          dataItem.label.rich.hr.borderColor = '#00FFD5'
          dataItem.itemStyle.areaColor.colorStops = [
            {
              offset: 0.2,
              color: 'rgba(0, 255, 213, 0.1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 255, 213, 0.7)' // 100% 处的颜色
            }
          ]
          dataItem.itemStyle.borderColor = '#00FFD5'
        } else if (
          item.value >= that.mapSection[3][0] &&
          item.value <= that.mapSection[3][1]
        ) {
          dataItem.label.rich.hr.borderColor = '#367CFF'
          dataItem.itemStyle.areaColor.colorStops = [
            {
              offset: 0.5,
              color: 'rgba(54, 124, 255, 0.1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(54, 124, 255, 0.6)' // 100% 处的颜色
            }
          ]
          dataItem.itemStyle.borderColor = '#367CFF'
        } else if (item.value > that.mapSection[4][0]) {
          dataItem.label.rich.hr.borderColor = '#FDC345'
          dataItem.itemStyle.areaColor.colorStops = [
            {
              offset: 0.5,
              color: 'rgba(253, 195, 69, 0.1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(253, 195, 69, 0.6)' // 100% 处的颜色
            }
          ]
          dataItem.itemStyle.borderColor = '#FDC345'
        }
        dataList.push(dataItem)
      })
      // 去渲染echarts
      this.initEcharts(dataList, Json)
    },
    // 地图点击下钻的方法
    echartsMapClick(row) {
      if (this.mapType >= 2) return
      console.log(row, '地图点击事件的数据')
      this.mapType++
      this.parentMapNameList.push(row.data.name)
      this.getGeoJson(row.data.name)
      this.$emit('mapClick', row.data)
    },
    // 返回
    returnMap() {
      if (this.parentMapNameList.length === 1) return
      this.mapType--
      // 删除最后一位
      this.parentMapNameList.pop()
      this.getGeoJson(
        this.parentMapNameList[this.parentMapNameList.length - 1]
      )
      this.$emit('returnMap')
    }
  }
}
</script>

<!--css样式-->
<style lang='scss' scoped>
.map-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 地图 */
#mapEchart {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 60px;
  right: 13px;
}
#mapEchart > div {
  border: 0px;
}
.content-center-top {
  /* background: url('../../assets/img/NX/diversionAnalysis/center-map-bg.png') no-repeat; */
  /* background-size: 100% 220px; */
  /* background-position-y: bottom; */
}
.map-return {
  position: absolute;
  right: 121px;
  top: 11px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  font-family: Microsoft YaHei;
  color: #17BEFC;
  .return-icon-size {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
}
</style>
