<template>
  <div
    class=""
    style="
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div v-show="mapLeave == 0" id="mapEchart" class="content-center-top" />

    <!-- <div class="map-return" v-show="mapType == 1" @click="returnMap()">返回 <img src="../../assets/img/home/icon-map-return.png" alt=""></div> -->
  </div>
</template>
<script>
// import cityToCode from '../../JSON/cityToCode.json'
import cityLine from '../../JSON/cityLineMap.json'
import ningxia from '../../JSON/ningxia.json'
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
      mapType: 0, // 地图等级，0-承德市 1-区县
      legendName: 0,
      mapLeave: 0,
      mapGaoxinNum: 100,
      mapSection: [[0, 100], [101, 200], [201, 500], [500, 1000], [1000]],
      symbolImg: '',
      cityDataList: [
        {
          I_VALUE: 354,
          coord: '2323',
          funcType: '03',
          CITY: '银川市',
          coord: [106.347233, 38.2883]
        },
        {
          I_VALUE: 5120,
          coord: '2323',
          funcType: '03',
          CITY: '石嘴山市',
          coord: [106.376173, 39.01333]
        },
        {
          I_VALUE: 20,
          coord: '2323',
          funcType: '03',
          CITY: '吴忠市',
          coord: [106.199409, 37.986165]
        },
        {
          I_VALUE: 120,
          coord: '2323',
          funcType: '03',
          CITY: '中卫市',
          coord: [105.189568, 37.514951]
        },
        {
          I_VALUE: 645,
          coord: '2323',
          funcType: '03',
          CITY: '固原市',
          coord: [106.285241, 36.004561]
        }
      ]
    }
  },
  mounted() {
    this.initMap('宁夏回族自治区', this.cityDataList, this.mapSection)
  },
  methods: {
    initMap(mapName, cityDataList, mapSection) {
      const that = this
      if (mapSection) {
        that.mapSection = mapSection
      }

      // const name = cityToCode[mapName]
      // const url = 'json/map/' + name + '.json'
      // 请求到的数据
      const response = ningxia
      const dom = document.getElementById('mapEchart')
      that.$echarts.registerMap(mapName, response)
      that.$echarts.registerMap('niXiaMapLine', cityLine)
      const myChart = that.$echarts.init(dom)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
      const dataList = []
      cityDataList.forEach(function(item, index) {
        // //console.log(item);

        if (item.I_VALUE <= that.mapSection[0][1]) {
          dataList.push({
            value: item.I_VALUE,
            name: item.CITY,
            orgId: item.orgId,
            funcType: item.funcType,
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
          })
        } else if (
          item.I_VALUE >= that.mapSection[1][0] &&
          item.I_VALUE <= that.mapSection[1][1]
        ) {
          dataList.push({
            value: item.I_VALUE,
            name: item.CITY,
            orgId: item.orgId,
            funcType: item.funcType,
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
                  height: 27
                },
                hr: {
                  borderColor: '#1061FF',
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
                    offset: 0.6,
                    color: 'rgba(0, 234, 255, 0.1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 234, 255, 0.8)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#1061FF',
              borderWidth: 1
            }
          })
        } else if (
          item.I_VALUE >= that.mapSection[2][0] &&
          item.I_VALUE <= that.mapSection[2][1]
        ) {
          dataList.push({
            value: item.I_VALUE,
            name: item.CITY,
            orgId: item.orgId,
            funcType: item.funcType,
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
                  borderColor: '#00FFD5',
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
                    offset: 0.6,
                    color: 'rgba(16, 97, 255, 0.1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(16, 97, 255, 0.7)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#00FFD5',
              borderWidth: 1
            }
          })
        } else if (
          item.I_VALUE >= that.mapSection[3][0] &&
          item.I_VALUE <= that.mapSection[3][1]
        ) {
          dataList.push({
            value: item.I_VALUE,
            name: item.CITY,
            orgId: item.orgId,
            funcType: item.funcType,
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
                  borderColor: '#367CFF',
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
                    color: 'rgba(0, 166, 255, 0.1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 166, 255, 0.6)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#367CFF',
              borderWidth: 1
            }
          })
        } else if (item.I_VALUE > that.mapSection[4][0]) {
          dataList.push({
            value: item.I_VALUE,
            name: item.CITY,
            orgId: item.orgId,
            funcType: item.funcType,
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
                  borderColor: '#FDC345',
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
                    color: 'rgba(253, 195, 69, 0.1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(253, 195, 69, 0.6)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#FDC345',
              borderWidth: 1
              // shadowColor:'#FDC345',
              // shadowBlur:10,
              // borderColor: 'rgba(253, 195, 69, 1)',
            }
          })
        }
      })
      const mapImgData = require('../../imgs/map/map-bg.png')
      const domImg = document.createElement('img')
      domImg.style.height =
        domImg.style.width =
        domImg.height =
        domImg.width =
          '100px'
      domImg.src = mapImgData
      const option = {
        color: ['#10A2E8'],
        title: {
          show: false
        },
        tooltip: {
          show: false,
          backgroundColor: 'rgba(50,50,50,0)',
          formatter: function(parmes) {
            // //console.log(parmes);
            let valueData = ''
            const tooltipImg = require('../../imgs/map/icon-tq.png')
            if (parmes.componentType === 'markPoint') {
              valueData = parmes.data.valueData
            } else {
              valueData = parmes.data.value
            }
            let titleName = ''
            if (that.legendName === 0) {
              titleName = '台区数量'
            } else if (that.legendName === 1) {
              titleName = '工单数量'
            } else if (that.legendName === 2) {
              titleName = '终端数量'
            }

            const str = `<div style='width: 200px;height:126px;background: linear-gradient(180deg, #0C4380 0%, #032563 100%);border-top:1px solid #25CAFD;'>
                        <p style='height:42px;width:100%;padding:0 25px;line-height:42px'>${parmes.data.name}</p>
                        <p style='width:100%;  height:1px; background: linear-gradient(90deg, rgba(37,202,253,0) 0%, #25CAFD 50%, rgba(37,202,253,0) 100%);'></p>
                        <div style='width:100%;height:83px;padding:8px 17px;display:flex;'>
                          <img src=${tooltipImg} style='width:64px;height:64px;margin-right:9px;'>
                          <div style="display: flex; flex-direction: column;justify-content: space-around;">
                          <p style='font-size: 14px; font-family: MicrosoftYaHei; line-height: 17px; color: #D0D5D9;'>${titleName}</p>
                          <p style='font-size: 24px; font-family: DIN; font-weight: bold; color: #25CAFD;'>${valueData}
                          <span style='font-size: 14px; font-family: MicrosoftYaHei;color: #D0D5D9;'>个</span> </p></div>
                        </div>
                      </div>`
            return str
          }
        },
        grid: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        },
        toolbox: {
          show: false
        },
        geo: {
          silent: true,
          show: false,
          map: 'niXiaMapLine',
          // aspectScale: 0.75, //长宽比
          // zoom: 1.1,
          roam: false,
          itemStyle: {
            areaColor: 'RGBA(14,42,89,2)'
          }
        },
        series: [
          {
            map: 'niXiaMapLine',
            silent: true,
            type: 'map',
            // left:'28%',
            top: '7%',
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: false,
            itemStyle: {
              areaColor: 'transparent',
              shadowColor: '#C8ECFB',
              shadowBlur: 15,
              borderWidth: 3,
              borderColor: '#E8EEF3',
              shadowOffsetY: 5
            }
          },
          {
            top: '7%',
            // left:'28%',
            type: 'map',
            roam: false,
            map: mapName,
            hoverAnimation: false,
            emphasis: {
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
            itemStyle: {
              normal: {
                // label: {show: true},
                color: '#ffffff',
                borderWidth: 0, // 区域边框宽度
                borderColor: '#transparent', // 区域边框颜色
                areaColor: 'transparent'
              },
              emphasis: {
                color: '#ffffff',
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
                }
              }
            },
            label: {
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
            data: dataList
          }
        ]
      }
      myChart.setOption(option)
      myChart.on('click', this.echartsMapClick)
    },
    // 地图点击下钻的方法
    echartsMapClick(row) {
      this.$emit('mapClick', row.data)
    },
    echartsMapClick2(row) {
      if (row.CITY === '高新区') {
        this.mapLeave = 1
      } else {
        this.mapLeave = 0
      }
      this.$emit('mapClick', row)
    },
    returnMap() {
      if (this.mapLeave === 1) {
        this.mapLeave = 0
      }
      this.$emit('returnMap')
    }
  }
}
</script>

<!--css样式-->
<style scoped>
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
}
</style>
