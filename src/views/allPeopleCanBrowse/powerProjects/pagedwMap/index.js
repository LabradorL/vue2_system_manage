import gwGis from '../components/gw-gis/index.vue' // 国网地图
import dwGis from '../components/dw-gis/index.vue' // 电网地图
import abnormalHomeLeft from './home-left/index.vue' // 左侧内容
import abnormalHomeRight from './home-right/index.vue' // 右侧内容
// import exceptionAnalysisDetails from '../exception-analysis-details/index.vue' // 异常分析弹框
import homeHead from '../components/home-head/index.vue'
import MapSettings from '../components/dw-gis/util/map-settings'
import dictOptions from '@/const/dicts/index'

// import homApi from '@/api/home.js' // 首页结构
import { mapState } from 'vuex'
// 故障研判 弹框

export default {
  components: {
    gwGis,
    dwGis,
    abnormalHomeLeft,
    homeHead,
    abnormalHomeRight
    // exceptionAnalysisDetails
  },
  data() {
    return {
      // 图层变化变量开始
      isDisabled: true,
      popupDOM: [],
      clickMarkerIndex: -1,
      // 图层变化变量结束
      hintShow: false,
      // 地图城市信息
      cityPoint: [],
      // 通过接口获取的打点信息列表
      mapAllPoint: [],
      // 通过电网一张图获取的打点信息列表
      mapPoint: [],
      // 组织机构层级
      activeFuncType: '02',
      // 组织机构ID
      activeOrgId: '46e5838467ee47970167f27a7fa600c6',
      // 地图层级
      zoom: '',
      // 地图中心
      center: '',
      startTime: this.$moment().format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      orgInfo: {
        orgId: '46e5838467ee47970167f27a7fa600c6',
        funcType: '02',
        lon: 106.278039,
        lat: 38.462941
      },

      // 项目环境
      envVariable: process.env.NODE_ENV,
      // 设备异常类型 线路、配变
      serviveType: '1',
      // 选择的异常类型
      selectAbnoreType: ['1', '2'],
      copyAbnoreType: ['1', '2'],
      // 默认的异常类型(线路异常)
      abnormalTypeOptions: dictOptions.lineAbnormalType,
      // 不同设备类型对应的异常类型
      abnormalTypeObj: {
        1: dictOptions.lineAbnormalType,
        2: dictOptions.abnormalType
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    this.changeTheme('dark')
    this.initMap()
  },
  methods: {
    // 刷新看板数据
    initBoard() {
      this.$nextTick(() => {
        this.$refs.abnormalHomeLeft.init(
          this.startTime,
          this.endTime,
          this.activeOrgId,
          this.activeFuncType
        )
        if (this.activeFuncType == '02' || this.activeFuncType == '03') {
          this.$refs.abnormalHomeRight.init(
            this.startTime,
            this.endTime,
            this.activeOrgId,
            this.activeFuncType
          )
        }
      })
    },
    // 设备类型（异常）发生变化
    deviceAbnormalTypeChange(val) {
      this.serviveType = val
      this.abnormalTypeOptions = this.abnormalTypeObj[val]
      this.selectAbnoreType = this.abnormalTypeOptions.map(
        (item) => item.value
      )
      // 目前地图显示的层级和左上角的组织机构不一致
      if (this.activeFuncType !== this.orgInfo.funcType) {
        const zoom = MapSettings.mapLevel(this.activeFuncType).level
        if (process.env.NODE_ENV === 'development') {
          // 思级地图(切换本地用)
          this.$refs.gwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        } else {
          // 电网一张图(线上用)
          this.$refs.dwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        }
      }
      if (this.activeFuncType == '04') {
        this.getAbnormalMapPoint(null)
      } else {
        this.getBubbleDistributionDotting()
      }
    },
    // 异常类型发生变化
    abnoreTypeChange(val) {
      if (val.length === 0) {
        return this.selectAbnoreType = JSON.parse(
          JSON.stringify(this.copyAbnoreType)
        )
      }
      // 目前地图显示的层级和左上角的组织机构不一致
      if (this.activeFuncType !== this.orgInfo.funcType) {
        const zoom = MapSettings.mapLevel(this.activeFuncType).level
        if (process.env.NODE_ENV === 'development') {
          // 思级地图(切换本地用)
          this.$refs.gwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        } else {
          // 电网一张图(线上用)
          this.$refs.dwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        }
      }
      this.copyAbnoreType = JSON.parse(JSON.stringify(val))
      if (this.activeFuncType == '04') {
        this.getAbnormalMapPoint(null)
      } else {
        this.getBubbleDistributionDotting()
      }
    },
    // 初始化加载
    initMap() {
      this.$nextTick(() => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
          //  思级地图(切换本地用)
          this.$refs.gwGis.initGisMap()
        } else {
          // 电网一张图(线上用)
          this.$refs.dwGis.login()
        }
        // 初始化数据
        // this.$refs.abnormalHomeLeft.init(
        //   this.startTime,
        //   this.endTime,
        //   this.activeOrgId,
        //   this.activeFuncType
        // )
        // this.$refs.abnormalHomeRight.init(
        //   this.startTime,
        //   this.endTime,
        //   this.activeOrgId,
        //   this.activeFuncType
        // )
      })
    },

    // 提示信息关闭
    barClick() {
      const lineAbnormal = document.getElementById('lineAbnormalTips')
      const terminalAbnormal = document.getElementById('terminalAbnormalTips')
      // 频繁预警
      if (lineAbnormal) {
        if (!lineAbnormal.contains(event.target)) {
          this.$refs.abnormalHomeLeft.lineAbnormalTips = false
        }
      }
      if (terminalAbnormal) {
        if (!terminalAbnormal.contains(event.target)) {
          this.$refs.abnormalHomeLeft.terminalAbnormalTips = false
        }
      }
    },
    // 页面主题切换
    changeTheme(data) {
      window.document.documentElement.setAttribute('data-theme', data) // 给根节点设置data-theme属性，切换主题色就是修改data-theme的值
    },
    // 时间切换
    dateChange(time) {
      // console.log('时间选择',time)
      if (time === 'Invalid date') {
        this.startTime = ''
        this.endTime = ''
      }
      this.startTime = time[0]
      this.endTime = time[1]
      // 重新刷新看板数据
      // this.initBoard()
      // 目前地图显示的层级和左上角的组织机构不一致
      if (this.activeFuncType !== this.orgInfo.funcType) {
        const zoom = MapSettings.mapLevel(this.activeFuncType).level
        if (process.env.NODE_ENV === 'development') {
          // 思级地图(切换本地用)
          this.$refs.gwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        } else {
          // 电网一张图(线上用)
          this.$refs.dwGis.setZoomCenter(
            [this.orgInfo.lon, this.orgInfo.lat],
            zoom
          )
        }
      }
      if (this.activeFuncType == '04') {
        this.getAbnormalMapPoint(null)
      } else {
        this.getBubbleDistributionDotting()
      }
    },

    // 地图加载完后执行
    onMapLoaded(params) {
      this.map = params.map
      this.gridLayer = params.gridLayer
      this.zoom = this.map.getZoom()
      this.center = this.map.getCenter()
      this.map.on('zoomend', this.movement)
      if (this.activeFuncType == '04') {
        this.getAbnormalMapPoint(null)
      } else {
        this.getBubbleDistributionDotting()
      }
    },
    // 地图层级变化时的回调函数
    movement() {
      this.$nextTick(() => {
        this.zoom = this.map.getZoom()
        this.center = this.map.getCenter()
      })
      const initZoom = MapSettings.mapLevel(this.userInfo.funcType).level
      if (this.map.getZoom() <= initZoom) {
        //    防止连续进入出现拖慢速度
        if (this.isDisabled === false) {
          return
        }
        this.isDisabled = false
        setTimeout(() => {
          this.isDisabled = true
        })
        const { orgId, funcType, shortName, lat, lon } = this.userInfo
        this.activeOrgId = orgId
        this.activeFuncType = funcType
        if (this.clickMarkerIndex > -1) {
          this.popupDOM['index' + this.clickMarkerIndex].remove()
        }
        const aeraData = {
          id: orgId,
          type: funcType,
          lat: lat,
          lon: lon,
          shortName: shortName
        }
        this.$refs.homeHead.$refs.areaNames.emitData(aeraData)
        if (process.env.NODE_ENV === 'development') {
          // 思级地图(切换本地用)
          this.$refs.gwGis.clearList('markerList')
          this.$refs.gwGis.clearList('endMarkerList')
          if (funcType == '02') {
            this.$refs.gwGis.setZoomCenter(MapSettings.mapCenter, initZoom)
          } else {
            this.$refs.gwGis.setZoomCenter([lon, lat], initZoom)
          }
        } else {
          // 电网一张图(线上用)
          this.$refs.dwGis.clearList('markerList')
          this.$refs.dwGis.clearList('endMarkerList')
          this.$refs.dwGis.clearHighlightFeeder('endMarkerList')
          if (funcType == '02') {
            this.$refs.dwGis.setZoomCenter(MapSettings.mapCenter, initZoom)
          } else {
            this.$refs.dwGis.setZoomCenter([lon, lat], initZoom)
          }
        }
        this.getBubbleDistributionDotting()
        // 刷新看板数据
        // this.initBoard();
      }
    },
    // 国网地图底层打点（组织机构层级为04）
    getMapPointGw() {
      if (this.activeFuncType == '02' || this.activeFuncType == '03') {
        this.$refs.gwGis.clearList('markerList')
        this.$refs.gwGis.clearList('endMarkerList')
        const clickBack = ({ el, item }) => {
          // 标识桩打点图标点击事件
          if (item.num == 0 && this.activeFuncType == '03') {
            this.$message.warning('该区域下当前暂无数据！')
          } else {
            // console.log('weweqw',item)
          }
          this.activeOrgId = item.orgId
          this.activeFuncType = item.funcType
          const aeraData = {
            id: item.orgId,
            type: item.funcType,
            lat: item.lat,
            lon: item.lon,
            shortName: item.shortName
          }
          this.$refs.homeHead.$refs.areaNames.emitData(aeraData)
        }
        this.$refs.gwGis.drawCityMarker(_.clone(this.cityPoint), clickBack)
      } else {
        const mapPoint = this.mapPoint
        this.$refs.gwGis.clearList('markerList')
        this.$refs.gwGis.clearList('endMarkerList')
        // bsz:标识桩 1线路 2 配变
        const iconType = this.serviveType == 1 ? 'line' : 'terminal'
        this.$refs.gwGis.drawEndMarker(
          _.clone(mapPoint),
          iconType,
          ({ item, i }) => {
            // 标识桩打点图标点击事件
            console.log('标识桩打点图标点击事件---item', item)
            // 在这还需要再调用一个查找详情得方法
            this.mapAllPoint.forEach((element) => {
              if (element.devId == item.devId) {
                element.lon = item.coordinate[0]
                element.lat = item.coordinate[1]
                this.$refs.gwGis.mapMalfunctionPointClick(element, () => {
                  console.log('异常详情item', element)
                  this.$refs.exceptionAnalysisDetails.dialogShow = true
                  this.$refs.exceptionAnalysisDetails.initDialog(
                    this.startTime,
                    this.endTime,
                    this.activeOrgId,
                    this.activeFuncType,
                    element
                  )
                })
              }
            })
          }
        )
      }
    },
    // 电网地图底层打点（组织机构层级为04）
    getMapPoint() {
      if (this.activeFuncType == '02' || this.activeFuncType == '03') {
        this.$refs.dwGis.clearList('markerList')
        this.$refs.dwGis.clearList('endMarkerList')
        this.$refs.dwGis.clearHighlightFeeder()
        const clickBack = ({ el, item }) => {
          // 标识桩打点图标点击事件
          if (item.num == 0 && this.activeFuncType == '03') {
            this.$message.warning('该区域下当前暂无数据！')
          } else {
            // console.log('weweqw',item)
          }
          // 标识桩打点图标点击事件
          this.activeOrgId = item.orgId
          this.activeFuncType = item.funcType
          // console.log('点击气泡打点',item)
          // this.merkerEvent(item);
          const aeraData = {
            id: item.orgId,
            type: item.funcType,
            lat: item.lat,
            lon: item.lon,
            shortName: item.shortName
          }
          this.$refs.homeHead.$refs.areaNames.emitData(aeraData)
        }
        this.$refs.dwGis.drawCityMarker(_.clone(this.cityPoint), clickBack)
      } else {
        const mapPoint = this.mapPoint
        this.$refs.dwGis.clearList('markerList')
        this.$refs.dwGis.clearList('endMarkerList')
        this.$refs.dwGis.clearHighlightFeeder()
        // bsz:标识桩 1线路 2 配变
        const iconType = this.serviveType == 1 ? 'line' : 'terminal'
        this.$refs.dwGis.drawEndMarker(
          _.clone(mapPoint),
          iconType,
          ({ item, i }) => {
            // 标识桩打点图标点击事件
            if (iconType === 'line') {
              this.$refs.dwGis.highlightFeeder(item.coordinate, [item.pmsId])
            }
            this.mapAllPoint.forEach((element) => {
              if (element.devId == item.devId) {
                element.lon = item.coordinate[0]
                element.lat = item.coordinate[1]
                this.$refs.dwGis.mapMalfunctionPointClick(element, () => {
                  console.log('异常详情item', element)
                  this.$refs.exceptionAnalysisDetails.dialogShow = true
                  this.$refs.exceptionAnalysisDetails.initDialog(
                    this.startTime,
                    this.endTime,
                    this.activeOrgId,
                    this.activeFuncType,
                    element
                  )
                })
              }
            })
          }
        )
      }
    },
    // 单位切换
    activeArea(data) {
      // console.log('单位切换',data)
      this.merkerEvent(data)
    },
    // 单位发生变化时进行数据刷新和地图绘制
    merkerEvent(item) {
      const { id, type, lon, lat, orgID } = item
      if (id) {
        this.activeOrgId = id
      } else {
        this.activeOrgId = orgID
      }
      this.activeFuncType = type
      this.orgInfo = {
        orgId: this.activeOrgId,
        funcType: this.activeFuncType,
        lon: lon,
        lat: lat
      }
      const zoom = MapSettings.mapLevel(this.activeFuncType).level
      if (process.env.NODE_ENV === 'development') {
        // 思级地图(切换本地用)
        this.$refs.gwGis.setZoomCenter([lon, lat], zoom)
      } else {
        // 电网一张图(线上用)
        this.$refs.dwGis.setZoomCenter([lon, lat], zoom)
      }

      if (this.activeFuncType == '02' || this.activeFuncType == '03') {
        this.getBubbleDistributionDotting()
      } else {
        //    底层打点
        this.getAbnormalMapPoint(null)
      }
      // 重新刷新看板数据
      // this.initBoard()
    },
    // 气泡打点数据，获取不同城市的数据
    getBubbleDistributionDotting() {
      const param = {
        startDate: this.startTime,
        endDate: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType,
        channel: this.serviveType, // 1 : 线路 2 配变，
        type: this.selectAbnoreType.join(',') // 1 重载 2 过载
      }
      // this.$axios
      //   .post(homApi.getMapBubbleList, param)
      //   .then(({ code, data }) => {
      //     this.cityPoint = data
      //     if (process.env.NODE_ENV === 'development') {
      //       // 国网思级地图(切换本地用)
      //       this.getMapPointGw()
      //     } else {
      //       // 电网一张图(线上用)
      //       this.getMapPoint()
      //     }
      //   })
    },
    // 底层坐标打点，获取打点的数据
    getAbnormalMapPoint() {
      const param = {
        startDate: this.startTime,
        endDate: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType,
        channel: this.serviveType, // 1 : 线路 2 配变，
        type: this.selectAbnoreType.join(',') // 1 重载 2 过载 3 三相不平衡 5 低电压
      }
      // this.$axios
      //   .post(homApi.getMapDeviceList, param)
      //   .then(({ code, data }) => {
      //     if (code == 200 && data && data.length > 0) {
      //       this.mapAllPoint = data
      //       const davList = []
      //       data.forEach((element) => {
      //         if (element.devId && element.psrType) {
      //           davList.push({
      //             devId: element.devId,
      //             devType: element.psrType,
      //             distribution: '0',
      //             provinceId: '46e5838467ee47970167f27a7fa600c6'
      //           })
      //         }
      //       })
      //       this.getCoordinates(davList, data)
      //     } else {
      //       return this.$message.warning('当前该区域下暂无异常线路信息！')
      //     }
      //   })
    },
    // 点击列表进行地图下钻 (线上)
    newListMapPoint(mapList) {
      this.mapAllPoint = mapList
      const davList = []
      mapList.forEach((element) => {
        if (element.devId && element.psrType) {
          davList.push({
            devId: element.devId,
            devType: element.psrType,
            distribution: '0',
            provinceId: '46e5838467ee47970167f27a7fa600c6'
          })
        }
      })
      this.tableGetCoordinates(davList, mapList)
    },
    // 表格的打点
    tableGetCoordinates(devIdData, data) {
      const DeviceQuery = new narimap.ResourceQuery.DeviceQuery()
      DeviceQuery.queryDeviceByIds(
        { devIds: devIdData },
        (res) => {
          console.log('传递的参数', devIdData)
          console.log('返回的结果', res)
          const dataList = res.result ? res.result.psrDataList : null
          if (dataList && dataList.length > 0) {
            const mapData = []
            dataList.forEach((element) => {
              element.psrList.forEach((item) => {
                let abnoreType = ''
                let serviveType = ''
                let pmsId = ''
                if (data) {
                  const itemidx = data.findIndex(
                    (item1) => item1.devId == item.psrId
                  )
                  if (itemidx != -1) {
                    abnoreType = data[itemidx].abnormalType || ''
                    serviveType = data[itemidx].devType || ''
                    pmsId = data[itemidx].pmsId || ''
                  }
                }
                mapData.push({
                  coordinate: narimap.Projection.mercatorToWgs84(
                    item.coordinate.split(' ')
                  ),
                  devId: item.psrId,
                  devType: item.psrType,
                  abnoreType: abnoreType,
                  serviveType: serviveType,
                  pmsId: pmsId
                })
              })
            })
            const mapPoint = mapData
            if (process.env.NODE_ENV === 'development') {
              this.$refs.gwGis.clearList('markerList')
              this.$refs.gwGis.clearList('endMarkerList')
              this.$refs.gwGis.clearPopup()
              this.$refs.gwGis.setZoomCenter(
                [mapPoint[0].coordinate[0], mapPoint[0].coordinate[1]],
                10
              )
              // bsz:标识桩 1线路 2 配变
              const iconType = this.serviveType == 1 ? 'line' : 'terminal'
              this.$refs.gwGis.drawEndMarker(
                _.clone(mapPoint),
                iconType,
                ({ item, i }) => {
                  // 标识桩打点图标点击事件
                  this.mapAllPoint.forEach((element) => {
                    if (element.devId == item.devId) {
                      element.lon = item.coordinate[0]
                      element.lat = item.coordinate[1]
                      this.$refs.dwGis.mapMalfunctionPointClick(element, () => {
                        // console.log('故障研判')
                        this.$refs.exceptionAnalysisDetails.dialogShow = true
                        this.$refs.exceptionAnalysisDetails.initDialog(
                          this.startTime,
                          this.endTime,
                          this.activeOrgId,
                          this.activeFuncType,
                          element
                        )
                      })
                    }
                  })
                }
              )
            } else {
              this.$refs.dwGis.clearList('markerList')
              this.$refs.dwGis.clearList('endMarkerList')
              this.$refs.dwGis.clearPopup()
              this.$refs.dwGis.clearHighlightFeeder('endMarkerList')
              this.$refs.dwGis.setZoomCenter(
                [mapPoint[0].coordinate[0], mapPoint[0].coordinate[1]],
                10
              )
              // bsz:标识桩 1线路 2 配变
              const iconType = this.serviveType == 1 ? 'line' : 'terminal'
              this.$refs.dwGis.drawEndMarker(
                _.clone(mapPoint),
                iconType,
                ({ item, i }) => {
                  // 标识桩打点图标点击事件
                  // console.log('item',item);
                  if (iconType === 'line') {
                    this.$refs.dwGis.highlightFeeder(item.coordinate, [
                      item.pmsId
                    ])
                  }
                  this.mapAllPoint.forEach((element) => {
                    if (element.devId == item.devId) {
                      element.lon = item.coordinate[0]
                      element.lat = item.coordinate[1]
                      this.$refs.dwGis.mapMalfunctionPointClick(element, () => {
                        this.$refs.exceptionAnalysisDetails.dialogShow = true
                        this.$refs.exceptionAnalysisDetails.initDialog(
                          this.startTime,
                          this.endTime,
                          this.activeOrgId,
                          this.activeFuncType,
                          element
                        )
                      })
                    }
                  })
                }
              )
            }
          } else {
            return this.$message.warning('当前该区域下暂无坐标信息！')
          }
        },
        (err) => {
          console.log(err)
          // do something
        }
      )
    },
    // 查询打点的坐标信息（直接点击地图）
    getCoordinates(devIdData, data) {
      // 通过服务接口查询设备信息
      const DeviceQuery = new narimap.ResourceQuery.DeviceQuery()
      DeviceQuery.queryDeviceByIds(
        {
          devIds: devIdData
        },
        (res) => {
          console.log('传递的参数', devIdData)
          console.log('返回的结果', res)
          const dataList = res.result ? res.result.psrDataList : null
          if (dataList && dataList.length > 0) {
            const mapData = []
            dataList.forEach((element) => {
              element.psrList.forEach((item) => {
                let abnoreType = ''
                let serviveType = ''
                let pmsId = ''
                if (data) {
                  const itemidx = data.findIndex(
                    (item1) => item1.devId == item.psrId
                  )
                  if (itemidx != -1) {
                    abnoreType = data[itemidx].abnormalType || ''
                    serviveType = data[itemidx].devType || ''
                    pmsId = data[itemidx].pmsId || ''
                  }
                }
                mapData.push({
                  coordinate: narimap.Projection.mercatorToWgs84(
                    item.coordinate.split(' ')
                  ),
                  devId: item.psrId,
                  devType: item.psrType,
                  abnoreType: abnoreType,
                  serviveType: serviveType,
                  pmsId: pmsId
                })
              })
            })
            console.log('最终打点数据', mapData)
            this.mapPoint = mapData
            if (process.env.NODE_ENV === 'development') {
              // 国网思级地图(切换本地用)
              this.getMapPointGw()
            } else {
              // 电网一张图(线上用)
              this.getMapPoint()
            }
          } else {
            return this.$message.warning('当前该区域下暂无异常线路信息！')
          }
        },
        (err) => {
          console.log(err)
          // do something
        }
      )
    },
    // 通过设备获取打点信息
    queryDeviceByDeviceName(stId) {
      const param = {
        startDate: this.startTime,
        endDate: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType,
        channel: this.serviveType, // 1 : 线路 2 配变，
        type: this.selectAbnoreType.join(','), // 1 重载 2 过载 3 三相不平衡 5 低电压
        stId: stId || ''
      }
      // this.$axios
      //   .post(homApi.getMapDeviceList, param)
      //   .then(({ code, data }) => {
      //     if (code == 200 && data && data.length > 0) {
      //       this.newListMapPoint(data)
      //     } else {
      //       return this.$message.warning('当前该区域下暂无异常线路信息！')
      //     }
      //   })
    }
  }
}
