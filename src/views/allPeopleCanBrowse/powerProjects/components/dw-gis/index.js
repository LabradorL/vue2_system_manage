// import MapSettings from '@/components/dw-gis/util/map-settings'
import MapSettings from './util/map-settings'
import staticHtml from '@/assets/staticData/static-html'

export default {
  name: 'dwGis',
  props: {
    sgMapSdkUrl: {
      require: true,
      type: String,
      default: 'http://10.217.12.220/maps?v=3.1.0',
      description: '地图SDK地址'
    },
    sgMapKey: {
      require: true,
      type: String,
      description: '思极地图key'
    },
    sgMapSn: {
      require: true,
      type: String,
      description: '思极地图sn'
    },
    msServiceUrl: {
      require: true,
      type: String,
      description: 'GIS微服务地址'
    },
    msKey: {
      require: true,
      type: String,
      description: 'GIS微服务key'
    },
    msSecretKey: {
      require: true,
      type: String,
      description: 'GIS微服务sn'
    },
    onMapLoaded: {
      require: false,
      type: Function,
      description: '地图加载回调函数'
    }
  },
  data() {
    return {
      map: null,
      deviceOverView: null,
      cityPoint: [
        { name: `石嘴山`, lon: 106.5521017656838, lat: 38.97937039147686 },
        { name: `银川`, lon: 106.31904655215794, lat: 38.342438202340645 },
        { name: `中卫`, lon: 105.22368704858633, lat: 37.126018682046066 },
        { name: `固原`, lon: 106.24912998810021, lat: 35.788968597747626 },
        { name: `吴忠`, lon: 106.24912998810021, lat: 37.2992492903478 },
        { name: `宁东`, lon: 107.04361130073033, lat: 37.57727461183728 }
      ],
      cityOrgId: {
        银川: 'ff8080814c972f3f014c981aa70e13c3',
        中卫: 'ff8080814c972f3f014c9822363017d3',
        吴忠: 'ff8080814c972f3f014c98244f5d1915',
        固原: 'ff8080814c972f3f014c982693a61a2d',
        宁东: 'ff8080814c972f3f014c981fee3a171d',
        石嘴山: 'ff8080814c972f3f014c981e70b015e3',
        宁夏: '232AF1D001B65527E055000000000001'
      },
      markerList: [], // 气泡打点数据集合
      endMarkerList: [], // 底层坐标打点数据集合
      psrmap: null
    }
  },
  mounted() {},
  methods: {
    dynamicLoadJs(url, callback) {
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      if (typeof callback === 'function') {
        script.onload = script.onreadystatechange = function() {
          if (
            !this.readyState ||
            this.readyState === 'loaded' ||
            this.readyState === 'complete'
          ) {
            callback()
            script.onload = script.onreadystatechange = null
          }
        }
      }
      head.appendChild(script)
    },
    login() {
      const that = this
      narimap.Require(['PSRMap', 'Thematic'], () => {
        if (narimap.Config.examples.notlogin) {
          // 默认打开暗色系地图
          that.initMap(narimap.Config.styles.sjDark)
        } else {
          // 电网GIS地图服务登录
          narimap.SGAuth.login()
            .then(function(result) {
              if (result.success) {
                // console.log('登录成功');
              } else {
                // console.log('登录失败', result);
              }
              // 默认打开暗色系地图
              that.initMap(narimap.Config.styles.sjDark)
            })
            .catch((err) => {
              // console.log('错误', err);
            })
        }
      })
    },
    initMap(styleurl) {
      const that = this
      // console.log(MapSettings.mapCenter)
      that.map = new narimap.Map({
        // 地图绑定的DOM元素ID
        container: 'map',
        // 地图样式
        style: styleurl,
        // 默认缩放层级
        zoom: 6.5,
        // 地图中心点
        center: MapSettings.mapCenter, // [119.45259089995932, 32.93433342834534],
        // 地图默认字体
        localIdeographFontFamily: 'Microsoft YoHei',
        // 行政区边界
        adminBoundary: {
          initOrgIds: ['232AF1D001B65527E055000000000001'], // 省份机构ID
          theme: 'admin_background',
          // boundaryOption参数自定义边框、填充颜色
          boundaryOption: MapSettings.boundaryOption
        }
      })
      that.map.on('load', () => {
        // 添加电网图层
        this.psrmap = new narimap.PSRMap(that.map)
        // console.log(window,'lode window');
        this.psrmap.addPSR()
        this.psrmap.on('click', (features) => {
          console.log(
            '元素信息features：',
            features,
            '地图图层：',
            that.map.getZoom()
          )
        })
        this.psrmap.on('load', () => {
          this.psrmap.filter({
            mode: 'all',
            voltage: [110000, 66000, 35000, 20000, 10000, 400],
            // classid: [200,300, 335, 342, 521],
            visiable: true
          })
        })
        window.markerGroup = new narimap.MarkerGroup(that.map)
        // 初始化电网总览
        // that.initDeviceOverview();
        setTimeout(() => {
          if (this.onMapLoaded) {
            this.onMapLoaded({ map: this.map })
          }
        }, 200)
      })
    },
    initDeviceOverview() {
      // 电网总览分为两个模式，DeviceOverviewMap和DeviceOverviewCard；DeviceOverviewMap为带地图事件的，DeviceOverviewCard不带地图事件

      this.deviceOverView =
        new window.narimap.Components.DeviceOverview.DeviceOverviewMap({
          mode: '11003', // 显示的配电、直流、输电或者变电的数据
          initOrgId: '', // 初始的orgId用于显示的地图位置，为空则是国网，ff80808149f52e24014a039871840007
          initOrgName: '国网', // 省份，全国为 国网 江苏
          map: map, // 地图实例 Object.preventExtensions让对象能删能改，不能添加，因此使map没有响应式
          narimap: window.narimap, // sdk对象
          container: 'deviceOverview', // 自定义的外部容器id
          overviewCenter: [111.44878637408397, 38.032722221564455] // 经纬度中心点
        })
      // deviceOverView = new window.nrgisCommon.DeviceOverview.DeviceOverviewCard({
      //     mode: '11003', // 显示的配电、直流、输电或者变电的数据
      //     initOrgId: '', // 初始的orgId用于显示的地图位置，为空则是国网，ff80808149f52e24014a039871840007
      //     initOrgName: '国网', // 省份，全国为 国网 江苏
      //     container: 'deviceOverview',//自定义的外部容器id
      // })

      this.deviceOverView.create()
    },
    // 旗气泡打点
    drawCityMarker(markerArr, clickBack) {
      if (markerArr) {
        markerArr.forEach((item, i) => {
          const { lat, lon, sname, total, current } = item;
          const el = document.createElement("div");
          const htmlData = `<div class="marker-city-point">
                      <span class="city-point-icon"></span>
                      <span class="city-point-name">${sname}</span>
                      <span class="city-point-num1">${total || 0}</span>
                      <span class="city-point-line">/</span>
                      <span class="city-point-num2">${current || 0}</span>
                      </div>`;
          el.innerHTML = htmlData
          el.style.cursor = 'pointer'
          const marker = new narimap.Marker({
            element: el
          }).setLngLat([lon, lat])
          marker.on('click', () => {
            clickBack({ el, item })
          })
          marker.addTo(this.map)
          this.markerList[i] = marker
        })
      }
    },
    // 最底层打点，第一个参数markerArr点位数据，第二个参数queryType样式的class名称，第三个参数click点击回调方法,第四个参数，鼠标移入后的操作,第五个参数，鼠标移出后的删除操作
    drawEndMarker(markerArr, queryType, clickBack, moveBack, removePoint) {
      if (markerArr) {
        markerArr.forEach((item, i) => {
          const { coordinate } = item
          let iconClass = "map-icon-common red-icon";
          if (item.gzType == "2") {
            iconClass = "map-icon-common red-icon";
          } else if (item.gzType == "1") {
            iconClass = "map-icon-common yellow-icon";
          } else if (item.gzType == "3") {
            iconClass = "map-icon-common deep-blue-icon";
          } else if (item.gzType == "5") {
            iconClass = "map-icon-common blue-icon";
          }
          if (coordinate) {
            const coordinates = coordinate
            const el = document.createElement('div')
            const activeClass = `popup${i}`
            el.className = `${iconClass} ${activeClass}`
            el.style.cursor = 'pointer'
            // el.innerText = '京山示范区'
            const marker = new narimap.Marker({
              element: el
            }).setLngLat(coordinates)
            el.addEventListener('click', () => {
              // console.log('click',item)
              clickBack({ item })
            })
            marker.addTo(this.map)
            this.endMarkerList.push(marker)
          }
        })
      }
    },
    // 清除图层
    clearList(list) {
      // console.log('list',list)
      // console.log('list',this[list])
      if (this[list]) {
        this[list].forEach((item, i) => {
          if ('remove' in item) {
            item.remove()
          }
        })
        this[list] = []
      }
    },
    // 地图故障分析打点
    mapPointClick(item, YXJCclick) {
      // 线路名称
      item.name = item.name == null ? '' : item.name
      // 单位名称
      item.orgName = item.orgName == null ? '' : item.orgName
      // 开始时间
      item.startTime = item.startTime == null ? '' : item.startTime
      // 异常设备
      item.abnormalDevice = item.devType == null ? '' : item.devType
      // 异常类型
      item.abnormalType = item.abnormalType == null ? '' : item.abnormalType
      const popList = document.getElementsByClassName('popup-con-main')
      if (popList.length > 0) {
        for (let i = 0; i < popList.length; i++) {
          popList[i].remove()
        }
      }
      const popupDOM = new narimap.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: {
          bottom: [0, -40]
        },
        className: 'popup-con-main',
        maxWidth: '492px'
      })
      // TODO 后面切换动态弹框
      const html = staticHtml.mapMalfunction(item)
      // console.log(html)
      const coordinates = [item.lon, item.lat]
      popupDOM.setLngLat(coordinates).setHTML(html).addTo(this.map)
      const sgmapPopup = document.querySelector('.sgmap-popup')
      const popCon = document.querySelector('.popup-con')
      if (this.isChildOf(popCon, sgmapPopup)) {
        sgmapPopup.setAttribute('class', 'popup-con-main sgmap-popup')
      }
      // 异常分析弹框打开
      if (document.querySelector('#faultDiagnosis') != null) {
        document
          .querySelector('#faultDiagnosis')
          .addEventListener('click', () => {
            YXJCclick()
            // console.log(1111)
          })
      }
    },
    isChildOf(child, parent) {
      let parentNode
      if (child && parent) {
        parentNode = child.parentNode
        while (parentNode) {
          if (parent === parentNode) {
            return true
          }
          parentNode = parentNode.parentNode
        }
      }
      return false
    },
    initZoomCenter() {
      this.map.flyTo({
        center: MapSettings.mapCenter,
        zoom: MapSettings.mapZoom
      })
    },
    // 地图坐标跳转
    setZoomCenter(coordinates, zoom) {
      this.map.flyTo({ center: coordinates, zoom: zoom })
    },

    // 线路高亮
    highlightFeeder(coordinates, devIds) {
      this.setZoomCenter(coordinates, 15)
      const feederHighLightOptions = {
        devIds: devIds,
        type: 2
      }
      const renderOptions = {
        color: '#FFFF00',
        otherColor: '#999999',
        shadow: {
          shadowColor: '#FFFF00',
          extendWidth: 1,
          blur: 0
        }
      }
      this.psrmap.highlightFeeder(feederHighLightOptions, renderOptions)
    },
    // 清楚高亮
    clearHighlightFeeder() {
      this.psrmap.clearHighlight()
    },
    clearPopup() {
      const popList = document.getElementsByClassName('popup-con-main')
      if (popList.length > 0) {
        for (let i = 0; i < popList.length; i++) {
          popList[i].remove()
        }
      }
    }
  }
}
