import gwGis from '../components/gw-gis/index.vue' // 国网地图
import dwGis from '../components/dw-gis/index.vue' // 电网地图
import homeLeft from './home-left/index.vue' // 左侧内容
import homeRight from './home-right/index.vue' // 右侧内容
import homeHead from '../components/home-head/index.vue'
import MapSettings from '../components/dw-gis/util/map-settings'
import pointDialog from './point-dialog/index.vue'
import { mapState } from 'vuex'
export default {
  components: {
    gwGis,
    dwGis,
    homeHead,
    homeLeft,
    homeRight,
    pointDialog
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
      startTime: this.$moment().startOf('month').format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      // 项目环境
      envVariable: process.env.NODE_ENV,

      pageType: 0,
      faultStatisticsHintShow: false, // 故障统计提示信息是否显示
      faultProportionHintShow: false, // 故障占比提示信息是否显示
      indicatorStatisticsHintShow: false, // 故障分析 指标统计提示信息是否显示
      insulationAnalysisHintShow: false, // 绝缘预警 绝缘预警分析提示信息是否显示
      defectProportionHintShow: false, // 绝缘预警 缺陷占比提示信息是否显示
      // 一级宁夏的数据
      cityPoint1: [
        {
          id: '46e5838c6c2705aa016c274b0a36000d',
          type: '03',
          sname: '银川',
          total: 2,
          current: 2,
          peibian: 10,
          lon: '106.319047',
          lat: '38.482612'
        },
        {
          id: '46e5838467ee47970167f29a3d0000f9',
          type: '03',
          sname: '石嘴山',
          total: 1,
          current: 2,
          peibian: 5,
          lon: '106.552102',
          lat: '38.979370'
        },
        {
          id: '46e5838467ee47970167f29b07b500fa',
          type: '03',
          sname: '吴忠',
          total: 3,
          current: 0,
          peibian: '',
          lon: '106.249130',
          lat: '37.299249'
        },

        {
          id: '46e5838467ee47970167f29c0f3000fc',
          type: '03',
          sname: '固原',
          total: 0,
          current: 0,
          peibian: 0,
          lon: '106.249130',
          lat: '35.788969'
        },
        {
          id: '46e5838467ee47970167f29b465400fb',
          type: '03',
          sname: '中卫',
          total: 2,
          current: 0,
          peibian: 0,
          lon: '105.223687',
          lat: '37.126019'
        },
        {
          id: '46e5838467ee47970167f299fb6700f8',
          type: '03',
          sname: '宁东',
          total: 2,
          current: 0,
          peibian: 0,
          lon: '107.043611',
          lat: '37.577274'
        }
      ],
      // 二级石嘴山的数据
      cityPoint2: [
        {
          id: '46e5838c7196839a01719b804a7e03dd',
          type: '04',
          sname: '平罗',
          total: 0,
          current: 0,
          peibian: 0,
          lon: '106.557934',
          lat: '38.908078'
        },
        {
          id: '46e5838c7196839a01719b81e2bc03e3',
          type: '04',
          sname: '红果子',
          total: 0,
          current: 0,
          peibian: 0,
          lon: '106.719615',
          lat: '39.133553'
        },
        {
          id: '46e5838c7196839a01719b814c9d03e1',
          type: '04',
          sname: '大武口',
          total: 1,
          current: 2,
          peibian: 5,
          lon: '106.389536',
          lat: '39.028283'
        },
        {
          id: '46e5838c7196839a01719b80cef003df',
          type: '04',
          sname: '惠农',
          total: 0,
          current: 0,
          peibian: 0,
          lon: '106.783229',
          lat: '39.237095'
        }
      ],
      // 三级大武口的打点数据
      mapPoint: [
        {
          coordinate: [106.27276866850829, 38.92089677961724],
          devId: '3117a8ea-5c1a-408b-9715-0cb301122445',
          devType: '0111',
          gzType: '1',
          sname: '银川市/西夏区/西夏供电所',
          number: '23'
        },
        {
          coordinate: [106.36767778734642, 38.853838023219076],
          devId: 'dd4efbb4128a598cca58b37ad50158dd4ead2473c6',
          devType: '0111',
          gzType: '1',
          sname: '银川市/西夏区/西夏供电所',
          number: '23'
        },
        {
          coordinate: [106.41275492514629, 38.94764303146417],
          devId: 'F0014391-1B10-4E4F-8F01-DD246E872B36-20074',
          devType: '0111',
          gzType: '1',
          sname: '银川市/西夏区/西夏供电所',
          number: '23'
        },

        {
          coordinate: [106.40032072133044, 38.999904023864275],
          devId: 'c61fe126-bc67-4d03-8864-2ba79d01ec79',
          devType: '0305',
          gzType: '1',
          sname: '银川市/西夏区/西夏供电所',
          number: '23'
        },
        {
          coordinate: [106.31068081836297, 38.956521647326966],
          devId: '1e9017bb-3127-4954-bd12-71bba9dbac49',
          devType: '0305',
          gzType: '1',
          sname: '银川市/西夏区/西夏供电所',
          number: '23'
        }
        // {
        //   coordinate: [106.34081684314168, 38.99634499986131],
        //   devId: "F2E2C652-ACC0-4725-B869-6D187BD6174A-90299",
        //   devType: "0111",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.27197808303512, 38.9205299348594],
        //   devId: "2b710d85038a598ccb5584398d01562b70073e0608",
        //   devType: "0111",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.27197808303512, 38.9205299348594],
        //   devId: "302f3aef218a598cca558424600156302e45b263a6",
        //   devType: "0111",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.3709180811892, 38.85310183431801],
        //   devId: "79BD3049-1049-447B-8083-878B480305E7-71766",
        //   devType: "0111",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.31599954165013, 38.96024817191377],
        //   devId: "89de669c-acc3-40f7-9aa6-ad8b15471138",
        //   devType: "0305",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.2963389863682, 38.94168317085878],
        //   devId: "6775932b-cf0f-415b-9a7b-5f798100a566",
        //   devType: "0305",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
        // {
        //   coordinate: [106.37416621013881, 38.984386091014855],
        //   devId: "31d0912aaf8a598c6c75e77496017631cf11ee4236",
        //   devType: "0305",
        //   gzType: "1",
        //   sname: "银川市/西夏区/西夏供电所",
        //   number: "23",
        // },
      ]
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
    // 切换主题
    changeTheme(data) {
      window.document.documentElement.setAttribute('data-theme', data) // 给根节点设置data-theme属性，切换主题色就是修改data-theme的值
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
        this.$refs.homeLeft.init(
          this.startTime,
          this.endTime,
          this.activeOrgId,
          this.activeFuncType
        )
        this.$refs.homeRight.init(
          this.startTime,
          this.endTime,
          this.activeOrgId,
          this.activeFuncType
        )
      })
    },
    // 刷新看板数据
    initBoard() {
      this.$nextTick(() => {
        this.$refs.homeLeft.init(
          this.startTime,
          this.endTime,
          this.activeOrgId,
          this.activeFuncType
        )
        if (this.activeFuncType === '02' || this.activeFuncType === '03') {
          this.$refs.homeRight.init(
            this.startTime,
            this.endTime,
            this.activeOrgId,
            this.activeFuncType
          )
        }
      })
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
      this.initBoard()
      if (this.activeFuncType == '04') {
        this.getFaultMapPoint()
      } else {
        this.getBubbleDistributionDotting()
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
        // 底层打点
        this.getMapDeviceList()
      }
      // 重新刷新看板数据
      // this.initBoard()
    },
    // 地图加载完后执行
    onMapLoaded(params) {
      this.map = params.map
      this.gridLayer = params.gridLayer
      this.zoom = this.map.getZoom()
      this.center = this.map.getCenter()
      // this.map.on("click", function (e) {
      //   console.log(e)
      // });
      // 获取地图气泡数据或者打点数据
      if (this.activeFuncType == '04') {
        this.getMapDeviceList()
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
        const { orgId, funcType, orgName, shortName, lat, lon } = this.userInfo
        // console.log(this.userInfo)
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
          if (funcType == '02') {
            this.$refs.dwGis.setZoomCenter(MapSettings.mapCenter, initZoom)
          } else {
            this.$refs.dwGis.setZoomCenter([lon, lat], initZoom)
          }
        }
        if (this.activeFuncType == '02' || this.activeFuncType == '03') {
          this.getBubbleDistributionDotting()
        } else {
          // 底层打点
          this.getMapDeviceList()
        }
        // 刷新看板数据
        this.initBoard()
      }
    },

    // 气泡打点数据，获取不同城市的数据
    getBubbleDistributionDotting() {
      const param = {
        startTime: this.startTime,
        endTime: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType
      }
      /* 临时演示假数据开始 */
      this.cityPoint =
        this.activeFuncType == '02' ? this.cityPoint1 : this.cityPoint2
      if (process.env.NODE_ENV === 'development') {
        // 国网思级地图(切换本地用)
        this.getMapPointGw()
      } else {
        // 电网一张图(线上用)
        this.getMapPoint()
      }
      /* 临时演示假数据结束 */

      // 接口接入使用以下代码
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
    // 获取地图打点数据
    getMapDeviceList() {
      const param = {
        startDate: this.startTime,
        endDate: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType
      }
      const res = {
        code: 200,
        message: '正确',
        data: [
          {
            devId: '281c5c47028a598ccb580d18270158281c10266ca3',
            devType: '0305',
            sname: '石嘴山供电公司-大武口供电公司-大武口配电运维班',
            lon: null,
            lat: null,
            feederName: '简泉变512简贺线',
            defectType: '短路故障',
            discoverTime: '2024-03-22 15:54:45',
            description:
              '重合闸动作情况：其他。 故障区段： 全线。 故障区域： “10kV贺兰山北路开关站/贺供线913馈线开关” 下游区域发生故障 ',
            status: null,
            feederId: '3799912186113949751',
            faultId: '3860147831130034174',
            firstDevId: null,
            faultTime: '2024-03-22 15:54:45',
            gzType: '1',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-崇岗供电所',
            lon: null,
            lat: null,
            feederName: '下庙变514下乡线',
            defectType: '短路故障',
            discoverTime: '2024-03-24 06:57:56',
            description:
              '重合闸动作情况：就地重合失败。 故障区段： 首区段。 故障区域： “下庙变514下乡线兰丰分支线001#断路器” 与 “下庙变514下乡线兰丰分支028#断路器” 与 “下庙变514下乡线兰丰四队分支001#断路器” 区域发生故障 （与就地分布式配合。）',
            status: null,
            feederId: '3799912186113949891',
            faultId: '3860147831130034176',
            firstDevId: null,
            faultTime: '2024-03-24 06:57:56',
            gzType: '1',
            devId: '4a1ddfa0c28a598cc95637963801564a1db4b43f9e',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-沙湖供电所',
            lon: null,
            lat: null,
            feederName: '西大滩变511车站线',
            defectType: '短路故障',
            discoverTime: '2024-03-17 00:02:47',
            description:
              '收到主配网事故分闸信号，研判为故障区域: “西大滩变511车站线瑞福华分支001#断路器”下游发生短路故障(云主站研判)',
            status: null,
            feederId: '3799912186113949989',
            faultId: '1710605400250296887',
            firstDevId: null,
            faultTime: '2024-03-17 00:02:47',
            gzType: '1',
            devId: '29f02135-010e-49ed-b570-0d3c686eaaca',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-崇岗供电所',
            lon: null,
            lat: null,
            feederName: '崇岗变518崇暖线',
            defectType: '短路故障',
            discoverTime: '2024-03-19 10:58:38',
            description:
              '收到主配网事故分闸信号，研判为故障区域: “崇岗变518崇暖线001#断路器”下游发生短路故障(云主站研判)',
            status: null,
            feederId: '3799912186113949911',
            faultId: '1710817741049174938',
            firstDevId: null,
            faultTime: '2024-03-19 10:58:38',
            gzType: '1',
            devId: '2270DADD-8DC3-4980-9C23-C77335B70DEA-04582',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-崇岗供电所',
            lon: null,
            lat: null,
            feederName: '崇岗变518崇暖线',
            defectType: '短路故障',
            discoverTime: '2024-03-19 10:58:32',
            description:
              '收到主配网事故分闸信号，研判为故障区域: “崇岗变518崇暖线001#断路器”下游发生短路故障(云主站研判)',
            status: null,
            feederId: '3799912186113949911',
            faultId: '1710817741013360508',
            firstDevId: null,
            faultTime: '2024-03-19 10:58:32',
            gzType: '1',
            devId: '2270DADD-8DC3-4980-9C23-C77335B70DEA-04582',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-沙湖供电所',
            lon: null,
            lat: null,
            feederName: '观湖变515观前线',
            defectType: '短路故障',
            discoverTime: '2024-03-07 19:39:59',
            description:
              '重合闸动作情况：重合闸未投或未动作。 故障区段： 全线。 故障区域： “观湖变515观前线七队砖厂分支020#断路器” 下游区域发生故障 （与就地分布式配合。）',
            status: null,
            feederId: '3799912186113949919',
            faultId: '3860147831130034158',
            firstDevId: null,
            faultTime: '2024-03-07 19:39:59',
            gzType: '1',
            devId: '08fcce0a4c8a598c687cf12582017d08fcb2c61e6e',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-沙湖供电所',
            lon: null,
            lat: null,
            feederName: '观湖变515观前线',
            defectType: '短路故障',
            discoverTime: '2024-03-06 15:04:10',
            description:
              '重合闸动作情况：重合闸未投或未动作。 故障区段： 全线。 故障区域： “观湖变515观前线七队砖厂分支020#断路器” 下游区域发生故障 （与就地分布式配合。）',
            status: null,
            feederId: '3799912186113949919',
            faultId: '3860147831130034156',
            firstDevId: null,
            faultTime: '2024-03-06 15:04:10',
            gzType: '1',
            devId: '08fcce0a4c8a598c687cf12582017d08fcb2c61e6e',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-长胜供电所',
            lon: null,
            lat: null,
            feederName: '东郊变5211东明线',
            defectType: '短路故障',
            discoverTime: '2024-03-23 09:06:20',
            description:
              '重合闸动作情况：重合闸未投或未动作。 故障区段： 首区段。 故障区域： “东郊变5211东明线040#断路器” 与 “东郊变5211东明线089#星海湖公司分支断路器” 与 “东郊变5211东明线90#联络简泉变513简林线159#断路器” 区域发生故障 （与就地分布式配合。）',
            status: null,
            feederId: '3799912186113950685',
            faultId: '3860147831130034175',
            firstDevId: null,
            faultTime: '2024-03-23 09:06:20',
            gzType: '1',
            devId: '5f3eb6e2178a598c6c644c845801645f3e9d7a2a1f',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-沙湖供电所',
            lon: null,
            lat: null,
            feederName: '西大滩变511车站线',
            defectType: '短路故障',
            discoverTime: '2024-03-14 17:54:57',
            description:
              '重合闸动作情况：其他。 故障区段： 首区段。 故障区域： “西大滩变511车站线001#断路器” 与 “西大滩变511车站线西大滩家属院分支001#断路器” 与 “甘肃中标能源有限公司分支001#断路器” 与 “西大滩511车站线020#断路器” 区域发生故障 ',
            status: null,
            feederId: '3799912186113949989',
            faultId: '3860147831130034162',
            firstDevId: null,
            faultTime: '2024-03-14 17:54:57',
            gzType: '1',
            devId: '79BD3049-1049-447B-8083-878B480305E7-71766',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-沙湖供电所',
            lon: null,
            lat: null,
            feederName: '西大滩变511车站线',
            defectType: '短路故障',
            discoverTime: '2024-03-15 14:29:38',
            description:
              '重合闸动作情况：其他。 故障区段： 首区段。 故障区域： “西大滩变511车站线001#断路器” 与 “西大滩变511车站线西大滩家属院分支001#断路器” 与 “甘肃中标能源有限公司分支001#断路器” 与 “西大滩511车站线020#断路器” 区域发生故障 ',
            status: null,
            feederId: '3799912186113949989',
            faultId: '3860147831130034164',
            firstDevId: null,
            faultTime: '2024-03-15 14:29:38',
            gzType: '1',
            devId: '79BD3049-1049-447B-8083-878B480305E7-71766',
            devType: '0111',
            infoId: null
          },
          {
            sname: '石嘴山供电公司-大武口供电公司-崇岗供电所',
            lon: null,
            lat: null,
            feederName: '崇岗变516崇开线',
            defectType: '接地故障',
            discoverTime: '2024-03-23 13:04:01',
            description: '崇岗变516崇开线42#之后',
            status: null,
            feederId: '3799912186113949888',
            faultId: '1711170397',
            firstDevId: '3806386110578297581',
            faultTime: '2024-03-23 13:04:01',
            gzType: '2',
            devId: '069586d3-42e2-4dec-907f-7b1cd5688fe5',
            devType: '0811003',
            infoId: null
          }
        ]
      }
      this.mapAllPoint = res.data
      const davList = []
      res.data.forEach((element) => {
        if (element.devId && element.devType) {
          davList.push({
            devId: element.devId,
            devType: element.devType,
            distribution: '0',
            provinceId: '46e5838467ee47970167f27a7fa600c6'
          })
        }
      })
      this.getCoordinates(davList, res.data)
      /* this.$axios
        .post(homApi.getMapDeviceList, param)
        .then(({ code, data }) => {
          if (code == 200 && data && data.length > 0) {
            this.mapAllPoint = data
            const davList = []
            data.forEach((element) => {
              if (element.devId && element.psrType) {
                davList.push({
                  devId: element.devId,
                  devType: element.psrType,
                  distribution: '0',
                  provinceId: '46e5838467ee47970167f27a7fa600c6'
                })
              }
            })
            this.getCoordinates(davList, data)
          } else {
            return this.$message.warning('当前该区域下暂无坐标信息！')
          }
        }) */
    },
    // 国网地图底层打点（组织机构层级为04）
    getMapPointGw() {
      if (this.activeFuncType == '02' || this.activeFuncType == '03') {
        this.$refs.gwGis.clearList('markerList')
        this.$refs.gwGis.clearList('endMarkerList')
        const clickBack = ({ el, item }) => {
          console.log(item)
          // 标识桩打点图标点击事件
          if (item.total == 0 && this.activeFuncType == '03') {
            this.$message.warning('该区域下当前暂无数据！')
          } else {
            // console.log('weweqw',item)
          }
          this.activeOrgId = item.id
          this.activeFuncType = item.type
          const aeraData = {
            id: item.id,
            type: item.type,
            lat: item.lat,
            lon: item.lon,
            shortName: item.sname
          }
          this.$refs.homeHead.$refs.areaNames.emitData(aeraData)
        }
        this.$refs.gwGis.drawCityMarker(_.clone(this.cityPoint), clickBack)
      } else {
        const mapPoint = this.mapPoint
        this.$refs.gwGis.clearList('markerList')
        this.$refs.gwGis.clearList('endMarkerList')
        // bsz:标识桩
        const iconType = ''
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
                this.$refs.gwGis.mapPointClick(element, () => {
                  console.log('某一点的全部信息:', element)
                  this.$refs.pointDialog.dialogShow = true
                  this.$refs.pointDialog.initDialog(this.startTime, this.endTime, element)
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
        const clickBack = ({ el, item }) => {
          // 标识桩打点图标点击事件
          if (item.total == 0 && this.activeFuncType == '03') {
            this.$message.warning('该区域下当前暂无数据！')
          } else {
            // console.log('weweqw',item)
          }
          this.activeOrgId = item.id
          this.activeFuncType = item.type
          const aeraData = {
            id: item.id,
            type: item.type,
            lat: item.lat,
            lon: item.lon,
            shortName: item.sname
          }
          this.$refs.homeHead.$refs.areaNames.emitData(aeraData)
        }
        this.$refs.dwGis.drawCityMarker(_.clone(this.cityPoint), clickBack)
      } else {
        const mapPoint = this.mapPoint
        this.$refs.dwGis.clearList('markerList')
        this.$refs.dwGis.clearList('endMarkerList')

        // bsz:图例标识桩
        const iconType = ''
        this.$refs.dwGis.drawEndMarker(
          _.clone(mapPoint),
          iconType,
          ({ item, i }) => {
            // 标识桩打点图标点击事件
            // console.log('item',item);
            this.mapAllPoint.forEach((element) => {
              if (element.devId == item.devId) {
                element.lon = item.coordinate[0]
                element.lat = item.coordinate[1]
                this.$refs.dwGis.mapPointClick(element, () => {
                  console.log('某一点的全部信息:', element)
                  this.$refs.pointDialog.dialogShow = true
                  this.$refs.pointDialog.initDialog(this.startTime, this.endTime, element)
                })
              }
            })
          }
        )
      }
    },
    // 查询打点的坐标信息
    getCoordinates(devIdData, data) {
      if (process.env.NODE_ENV === 'development') {
        // 思级地图(切换本地用)

        this.mapPoint = [
          {
            coordinate: [106.27276866850829, 38.92089677961724],
            devId: '3117a8ea-5c1a-408b-9715-0cb301122445',
            devType: '0111',
            gzType: '1',
            sname: '银川市/西夏区/西夏供电所',
            number: '23'
          },
          {
            coordinate: [106.36767778734642, 38.853838023219076],
            devId: 'dd4efbb4128a598cca58b37ad50158dd4ead2473c6',
            devType: '0111',
            gzType: '1',
            sname: '银川市/西夏区/西夏供电所',
            number: '23'
          },
          {
            coordinate: [106.41275492514629, 38.94764303146417],
            devId: 'F0014391-1B10-4E4F-8F01-DD246E872B36-20074',
            devType: '0111',
            gzType: '1',
            sname: '银川市/西夏区/西夏供电所',
            number: '23'
          },

          {
            coordinate: [106.40032072133044, 38.999904023864275],
            devId: 'c61fe126-bc67-4d03-8864-2ba79d01ec79',
            devType: '0305',
            gzType: '1',
            sname: '银川市/西夏区/西夏供电所',
            number: '23'
          },
          {
            coordinate: [106.31068081836297, 38.956521647326966],
            devId: '1e9017bb-3127-4954-bd12-71bba9dbac49',
            devType: '0305',
            gzType: '1',
            sname: '银川市/西夏区/西夏供电所',
            number: '23'
          }
          // {
          //   coordinate: [106.34081684314168, 38.99634499986131],
          //   devId: "F2E2C652-ACC0-4725-B869-6D187BD6174A-90299",
          //   devType: "0111",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.27197808303512, 38.9205299348594],
          //   devId: "2b710d85038a598ccb5584398d01562b70073e0608",
          //   devType: "0111",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.27197808303512, 38.9205299348594],
          //   devId: "302f3aef218a598cca558424600156302e45b263a6",
          //   devType: "0111",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.3709180811892, 38.85310183431801],
          //   devId: "79BD3049-1049-447B-8083-878B480305E7-71766",
          //   devType: "0111",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.31599954165013, 38.96024817191377],
          //   devId: "89de669c-acc3-40f7-9aa6-ad8b15471138",
          //   devType: "0305",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.2963389863682, 38.94168317085878],
          //   devId: "6775932b-cf0f-415b-9a7b-5f798100a566",
          //   devType: "0305",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
          // {
          //   coordinate: [106.37416621013881, 38.984386091014855],
          //   devId: "31d0912aaf8a598c6c75e77496017631cf11ee4236",
          //   devType: "0305",
          //   gzType: "1",
          //   sname: "银川市/西夏区/西夏供电所",
          //   number: "23",
          // },
        ]
        this.getMapPointGw()
      } else {
        // 电网一张图(线上用) 通过服务接口查询设备信息
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
                  // 打点额外需要的参数
                  let abnormalType = ''
                  let gzType = ''
                  const serviveType = ''
                  const pmsId = ''
                  if (data) {
                    const itemidx = data.findIndex(
                      (item1) => item1.devId == item.psrId
                    )
                    if (itemidx != -1) {
                      abnormalType = data[itemidx].abnormalType ? data[itemidx].abnormalType : ''
                      gzType = data[itemidx].gzType ? data[itemidx].gzType : ''
                      // serviveType = data[itemidx].devType || "";
                      // pmsId = data[itemidx].pmsId || "";
                    }
                  }
                  mapData.push({
                    coordinate: narimap.Projection.mercatorToWgs84(
                      item.coordinate.split(' ')
                    ),
                    devId: item.psrId,
                    devType: item.psrType,
                    abnormalType: abnormalType,
                    serviveType: serviveType,
                    gzType: gzType,
                    pmsId: pmsId // 线路高亮需要的id
                  })
                })
              })
              console.log('最终打点数据', mapData)
              this.mapPoint = mapData
              // 电网一张图(线上用)
              this.getMapPoint()
            } else {
              return this.$message.warning('当前该区域下暂无坐标信息！')
            }
          },
          (err) => {
            console.log(err)
            // do something
          }
        )
      }
    },
    // 点击列表地图下钻 (线上)
    newListMapPoint(mapList) {
      this.mapAllPoint = mapList
      const davList = []
      mapList.forEach((element) => {
        if (element.devId && element.devType) {
          davList.push({
            devId: element.devId,
            devType: element.devType,
            distribution: '0',
            provinceId: '46e5838467ee47970167f27a7fa600c6'
          })
        }
      })

      this.tableGetCoordinates(davList)
    },
    // 表格的打点
    tableGetCoordinates(devIdData) {
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
                mapData.push({
                  coordinate: narimap.Projection.mercatorToWgs84(
                    item.coordinate.split(' ')
                  ),
                  devId: item.psrId,
                  devType: item.psrType
                })
              })
            })
            const mapPoint = mapData
            if (process.env.NODE_ENV === 'development') {
              this.$refs.gwGis.clearList('markerList')
              this.$refs.gwGis.clearList('endMarkerList')
              this.$refs.gwGis.setZoomCenter(
                [mapPoint[0].coordinate[0], mapPoint[0].coordinate[1]],
                10
              )
              // bsz:标识桩
              const iconType =
                this.pageType == 0 ? 'earlyWarning' : 'malfunction' // earlyWarning--绝缘预警  ,malfunction---故障分析

              this.$refs.gwGis.drawEndMarker(
                _.clone(mapPoint),
                iconType,
                ({ item, i }) => {
                  // 标识桩打点图标点击事件
                  this.mapAllPoint.forEach((element) => {
                    if (element.devId == item.devId) {
                      element.lon = item.coordinate[0]
                      element.lat = item.coordinate[1]
                      if (this.pageType == 0) {
                        this.$refs.gwGis.mapEarlyWarningPointClick(element)
                      } else {
                        this.$refs.dwGis.mapPointClick(element, () => {
                          console.log('某一点的全部信息:', element)
                          this.$refs.pointDialog.dialogShow = true
                          this.$refs.pointDialog.initDialog(this.startTime, this.endTime, element)
                        })
                      }
                    }
                  })
                }
              )
            } else {
              this.$refs.dwGis.clearList('markerList')
              this.$refs.dwGis.clearList('endMarkerList')
              this.$refs.dwGis.setZoomCenter(
                [mapPoint[0].coordinate[0], mapPoint[0].coordinate[1]],
                10
              )
              // bsz:标识桩
              const iconType =
                this.pageType == 0 ? 'earlyWarning' : 'malfunction' // earlyWarning--绝缘预警  ,malfunction---故障分析

              this.$refs.dwGis.drawEndMarker(
                _.clone(mapPoint),
                iconType,
                ({ item, i }) => {
                  // 标识桩打点图标点击事件
                  // console.log('item',item);
                  this.mapAllPoint.forEach((element) => {
                    if (element.devId == item.devId) {
                      element.lon = item.coordinate[0]
                      element.lat = item.coordinate[1]
                      if (this.pageType == 0) {
                        this.$refs.dwGis.mapEarlyWarningPointClick(element)
                      } else {
                        this.$refs.dwGis.mapPointClick(element, () => {
                          console.log('某一点的全部信息:', element)
                          this.$refs.pointDialog.dialogShow = true
                          this.$refs.pointDialog.initDialog(this.startTime, this.endTime, element)
                        })
                      }
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

    // 涉及到的业务规则说明提示信息关闭
    barClick() {
      const lineAbnormal = document.getElementById('lineAbnormalTips')
      const terminalAbnormal = document.getElementById('terminalAbnormalTips')
      if (lineAbnormal) {
        if (!lineAbnormal.contains(event.target)) {
          this.$refs.homeLeft.lineAbnormalTips = false
        }
      }
      if (terminalAbnormal) {
        if (!terminalAbnormal.contains(event.target)) {
          this.$refs.homeLeft.terminalAbnormalTips = false
        }
      }
    },

    // 设备类型（异常）发生变化
    deviceAbnormalTypeChange(val) {
      // this.serviveType = val
      // this.abnormalTypeOptions = this.abnormalTypeObj[val]
      // this.selectAbnoreType = this.abnormalTypeOptions.map(
      //   (item) => item.value
      // )
      // // 目前地图显示的层级和左上角的组织机构不一致
      // if (this.activeFuncType !== this.orgInfo.funcType) {
      //   const zoom = MapSettings.mapLevel(this.activeFuncType).level
      //   if (process.env.NODE_ENV === 'development') {
      //     // 思级地图(切换本地用)
      //     this.$refs.gwGis.setZoomCenter(
      //       [this.orgInfo.lon, this.orgInfo.lat],
      //       zoom
      //     )
      //   } else {
      //     // 电网一张图(线上用)
      //     this.$refs.dwGis.setZoomCenter(
      //       [this.orgInfo.lon, this.orgInfo.lat],
      //       zoom
      //     )
      //   }
      // }
      if (this.activeFuncType == '04') {
        this.getMapDeviceList()
      } else {
        this.getBubbleDistributionDotting()
      }
    },
    // 故障统计提示信息打开
    hintShowOpen(type) {
      switch (type) {
        case 1:
          console.log('111111111111', type)
          // 停电统计
          this.hintShow = true
          break
        case 2:
          console.log('222222222222222', type)
          // 特别关注
          this.faultStatisticsHintShow = true
          // this.hintShow = true
          break
        case 3:
          this.faultProportionHintShow = true
          break
        default:
          this.hintShow = true
          break
      }
    },
    // 绝缘预警、故障分析切换
    pageTypeChange(type) {
      this.pageType = type
      this.$nextTick(function() {
        const initZoom = MapSettings.mapLevel(this.userInfo.funcType).level
        this.startTime = this.$moment().startOf('month').format('YYYY-MM-DD')
        this.endTime = this.$moment().format('YYYY-MM-DD')
        this.$refs.homeHead.nowDate = [
          this.$moment().startOf('month').format('YYYY-MM-DD'),
          this.$moment().format('YYYY-MM-DD')
        ]
        //    防止连续进入出现拖慢速度
        if (this.isDisabled === false) {
          return
        }
        this.isDisabled = false
        setTimeout(() => {
          this.isDisabled = true
        })
        const { orgId, funcType, orgName, shortName, lat, lon } = this.userInfo
        // console.log(this.userInfo)
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
          if (funcType == '02') {
            this.$refs.dwGis.setZoomCenter(MapSettings.mapCenter, initZoom)
          } else {
            this.$refs.dwGis.setZoomCenter([lon, lat], initZoom)
          }
        }

        this.getBubbleDistributionDotting()
        // 刷新看板数据
        this.initBoard()
        // }
      })
      // 初始化数据3
      // this.initBoard();
    },
    // 底层坐标打点
    getFaultMapPoint() {
      const param = {
        startTime: this.startTime,
        endTime: this.endTime,
        orgId: this.activeOrgId,
        funcType: this.activeFuncType
      }
    },
    // 录波文件
    iframeUrl(fileData) {
      // console.log('首页界面',fileData);
      const that = this
      that.$refs.recordingFile.dialogShow = true
      this.$nextTick(() => {
        that.$refs.recordingFile.init(fileData)
      })
    }
  }
}
