// import MapSettings from '@/components/gw-gis/util/map-settings'
import MapSettings from './util/map-settings'
import * as turf from '@turf/turf'
import staticHtml from '@/assets/staticData/static-html'

export default {
  name: 'gwGis',
  props: {
    sgMapSdkUrl: {
      require: true,
      type: String,
      default: 'https://map.sgcc.com.cn/maps?v=3.0.0',
      // default:'http://10.217.12.220/maps?v=3.1.0',
      description: '思极地图SDK地址'
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
      gridLayer: null,
      markerList: [],
      endMarkerList: [],
      msFlag: true,
      sgMapFlag: true,
      layers:
        '300000,' + // 电站
        '',
      token: ''
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
    initGisMap() {
      // console.log(1111)
      const that = this
      this.dynamicLoadJs(that.sgMapSdkUrl, () => {
        egisV2.MicroService.active = true
        SGMap.tokenTask.login(that.sgMapKey, that.sgMapSn).then(function() {
          // that.initMap();
          SGMap.plugin(['SGMap.EleSymbolLayer']).then(function(res) {
            that.sgMapFlag = true
            that.initMap()
            // console.log(22222)
          })
        })
        // 微服务鉴权
        // that.msLogin()
      })
    },
    // 获取出线开关的的坐标
    getKGPosition(psrId) {
      const that = this
      const url =
        that.msServiceUrl + `/queryservice/psrquery/line/${psrId}/pswitch`
      return new Promise((resolve, reject) => {
        get(url, {
          msSecretKey: that.msSecretKey,
          token: egisV2.MicroService.serviceInfo.token
        }).then((res) => {
          return resolve(res)
        })
      })
    },
    msLogin() {
      const that = this
      post(that.msServiceUrl + '/authorityservice/login/integrate', {
        appkey: that.msKey,
        msSecretKey: that.msSecretKey
      })
        .then(
          (res) => {
            if (res.data.success) {
              egisV2.MicroService.serviceInfo.encMode = false
              egisV2.MicroService.serviceInfo.token =
                res.data.resultValue.token
              this.token = res.data.resultValue.token
              egisV2.MicroService.serviceInfo.secretKey = that.msSecretKey
              that.msFlag = true
              that.initMap()
            } else {
              // console.log(res.data.message)
            }
          },
          (err) => {
            // console.log('微服务认证失败')
            // console.log(err)
          }
        )
        .catch((e) => {
          // console.log('微服务异常')
          // console.log(e)
        })
    },
    initZoomCenter() {
      this.map.flyTo({
        center: MapSettings.mapCenter,
        zoom: MapSettings.mapZoom
      })
    },
    setZoomCenter(coordinates, zoom) {
      this.map.flyTo({ center: coordinates, zoom: zoom })
    },
    drawCityMarker(markerArr, clickBack) {
      // console.log('drawCityMarker',markerArr);
      if (markerArr) {
        // console.log('markerArr',markerArr)
        markerArr.forEach((item, i) => {
          const { lat, lon, shortName, num, nowNum } = item
          const el = document.createElement('div')
          const htmlData = `<div class="marker-city-point">
                    <span class="city-point-icon"></span>
                    <span class="city-point-name">${shortName}</span>
                    <span class="city-point-num1">${num || 0}</span>
                    <span class="city-point-line">/</span>
                    <span class="city-point-num2">${nowNum|| 0}</span>
                    </div>`
          el.innerHTML = htmlData
          el.style.cursor = 'pointer'
          const marker = new SGMap.Marker({
            element: el
          }).setLngLat([lon, lat])
          el.addEventListener('click', () => {
            // console.log('click',item)
            clickBack({ el, item })
          })
          // marker.on('click',()=>{
          //     //console.log(1111)
          //     clickBack({el,item});
          // })
          marker.addTo(this.map)
          this.markerList[i] = marker
        })
      }
    },
    // 打点，第一个参数点位数据，第二个参数样式的class名称，第三个参数回调，当点击所打的点位时,第四个参数，鼠标移出后的删除操作
    drawEndMarker(markerArr = [], queryType, clickBack, callBack, removePoint) {
      if (markerArr) {
        markerArr.forEach((item, i) => {
          const { coordinate } = item
          let iconClass = ''
          if (item.abnoreType == '2') {
            iconClass = 'heavy-load'
          } else if (item.abnoreType == '1') {
            iconClass = 'overload'
          } else if (item.abnoreType == '3') {
            iconClass = 'three-phase-unbalance'
          } else if (item.abnoreType == '5') {
            iconClass = 'low-voltage'
          }

          if (coordinate) {
            const coordinates = coordinate
            const el = document.createElement('div')
            const activeClass = `popup${i}`
            el.className = `${iconClass} ${activeClass}`
            el.style.cursor = 'pointer'
            const marker = new SGMap.Marker({
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
    // 画线
    drawAddLine(
      markerArr = [],
      paintConfig = { 'line-color': '#89F2E5', 'line-width': 2 },
      callBack,
      layerId = this.uuId()
    ) {
      // console.log('drawAddLine',markerArr)
      // if (!this.map.getLayer("power-line")) {
      // 画线（通过map实例身上的 addLayer 方法）
      this.map.addLayer({
        id: layerId,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'MultiLineString',
                  // lineString类型的几何对象为2层数组，MultiLineString类型为3层数组
                  coordinates: markerArr
                }
              }
            ]
          }
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: paintConfig
      })
      // }
    },
    removeLineById(lineId) {
      if (this.map.getLayer(lineId)) {
        // 先移除图层，再移除数据源
        this.map.removeLayer(lineId)
        this.map.removeSource(lineId)
      }
    },
    drawMapMarker(markerArr = [], callBack) {
      if (markerArr) {
        markerArr.forEach((item, i) => {
          this.cityMarker({ i, item }, callBack)
        })
      }
    },
    // 气泡大小生成配置
    bubbleSize(size, nameData) {
      const el = document.createElement('div')
      if (!size) {
        el.innerHTML = `<div class="bubble m" style="width: 60px;height: 60px">${nameData}</div>`
      }
      const levelObj = {
        1: `<div class="bubble level1">${nameData}</div>`,
        2: `<div class="bubble level2" style="width: 66px;height: 66px">${nameData}</div>`,
        3: `<div class="bubble level3" style="width: 76px;height: 76px">${nameData}</div>`,
        4: `<div class="bubble level4" style="width: 86px;height: 86px">${nameData}</div>`,
        5: `<div class="bubble level5" style="width: 96px;height: 96px">${nameData}</div>`
      }
      el.innerHTML = levelObj[size]
      el.style.cursor = 'pointer'
      return el
    },
    // 绘制市级marker打点图层
    cityMarker({ i, item }, callBack) {
      // console.log(item)
      const { lat, lon, shortName, countNum, level } = item
      const el = this.bubbleSize(level, `<p>${shortName}</p><p>${countNum}</p>`)
      const marker = new SGMap.Marker({
        element: el
      }).setLngLat([lon, lat])
      const c = callBack
      el.addEventListener('click', () => {
        c({ el, item })
        el.removeEventListener('click', c)
      })
      marker.addTo(this.map)
      this.markerList[i] = marker
    },
    clearList(list) {
      // console.log('list',list)
      // console.log('list',this[list])
      if (this[list]) {
        this[list].forEach((item, i) => {
          // console.log("item",item)
          if ('remove' in item) {
            // console.log(111)
            item.remove()
          }
        })
        this[list] = []
      }
    },
    // 绘制热力图
    drawHeatMap(markerArr = [], callBack) {
      this.clearHeatMap()
      if (markerArr) {
        let point
        const features = []
        let minV, maxV
        markerArr.forEach((item, i) => {
          const { lon, lat, countNum } = item
          if (i == 0) {
            minV = countNum
            maxV = countNum
          } else if (minV > countNum) {
            minV = countNum
          } else if (maxV < countNum) {
            maxV = countNum
          }
          point = turf.point([Number(lon), Number(lat)])
          point.properties = { value: countNum }
          features.push(point)
        })
        // //console.log(markerArr)
        // console.log('max:' + maxV + ',min:' + minV)
        const heatData = this.uuId()
        this.map.addSource(heatData, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        })
        // 建两个图层：一个热力图图层，一个为放大到一定的zoom层级后展示各个数据点的图层
        this.map.addLayer({
          id: 'heatMapLayerId',
          type: 'heatmap',
          source: heatData,
          maxzoom: 13,
          paint: {
            /**
             * 数据点的影响力，weight=10的点相当于十个weight=1的点
             * 下述为插值表达式，输入是点geojson的properties的mag，输出随mag线性增大
             * 表示correlation从0变化到5时，heatmap-weight从0变化到1
             */
            // qyltodo
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              0,
              0,
              1500,
              0.6
            ],
            /**
             * 热力图强度，类似heatmap-weight
             * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为1，zoom为12时值为3
             */
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              17,
              1
            ],
            /**
             * 像素的颜色，必须以heatmap-density（热力图像素的密度）为输入
             * 下述为插值表达式，输出随heatmap-density变化而变化
             */
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(255, 0, 0, 0)',
              0.1,
              '#8DD8FC',
              0.2,
              '#89F2E5',
              0.3,
              '#FEF079',
              0.4,
              '#F8B633',
              0.5,
              '#F98B2A',
              0.6,
              '#f35e29'
              // 0.9,
              // "#EF4526",
              // 1,
              // "#BD211F"
            ],
            /**
             * 该值越大，热力图越平滑，信息越不详细。
             * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为8，zoom为9时值为20
             */
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              5,
              17,
              50
            ],
            /**
             * 透明度，输出为1则不透明
             * 下述为插值表达式，输出随zoom线性变化，zoom为5时值为0.8，zoom为12时值为0.4
             */
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              0.8,
              17,
              0.8
            ]
          }
        })

        this.map.addLayer({
          id: 'earthquakesPoint',
          type: 'circle',
          source: heatData,
          minzoom: 13,
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              1,
              20,
              12
            ],
            'circle-color': '#8DD8FC',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9,
              0,
              20,
              1
            ]
          }
        })
      }
    },
    // 清除热力图
    clearHeatMap() {
      if (this.map.getLayer('heatMapLayerId')) {
        this.map.removeLayer('heatMapLayerId')
      }
      if (this.map.getLayer('earthquakesPoint')) {
        this.map.removeLayer('earthquakesPoint')
      }
    },
    // 初始化地图
    initMap() {
      const that = this
      if (!this.msFlag || !this.sgMapFlag) {
        return
      }
      // let itemStyle = sessionStorage.getItem("gis-style-key")
      // let path = "Satellite512";
      const path = 'StreetsDark'
      /* if (itemStyle) {
                path = itemStyle;
            }*/
      this.map = egisV2.createMap({
        container: 'map',
        style: 'aegis://styles/aegis/' + path,
        zoom: MapSettings.mapZoom,
        preserveDrawingBuffer: true,
        maxZoom: 30,
        // minZoom: 7,
        center: MapSettings.mapCenter,
        localIdeographFontFamily: 'Microsoft YoHei'
      })
      this.map.on('load', (e) => {
        let timer = 0
        if (path === 'Satellite512') {
          timer = 500
        }
        setTimeout(() => {
          new SGMap.EleSymbolLayer({ mobile: true, type: 'all' })
          // eleSymbolLayer.on('click',function () {
          //     //console.log("点击事件")
          // })
          // 绘制湖北省边界线
          // this.drawProvinceLine()
          // 绘制各地市边界线
          // this.drawCityLine()
          this.initGridLayer()
          setTimeout(() => {
            if (this.onMapLoaded) {
              this.onMapLoaded({ map: this.map, gridLayer: this.gridLayer })
            }
          }, 200)
        }, timer)
      })

      this.map.on('click', (e) => {
        var features = this.map.queryRenderedFeatures(e.point)
        const data = features.filter((d) => {
          return 'oid' in d.properties && 'sbzlx' in d.properties
        })
        if (data.length > 0) {
          get(
            that.msServiceUrl +
              `/queryservice/psrquery/object/${data[0].properties.layerid}/${data[0].properties.oid}`,
            {
              appkey: that.msKey,
              msSecretKey: that.msSecretKey,
              token: this.token
            }
          ).then((res) => {
            // console.log(res)
          })
        }
      })
    },

    styleChangeAfter() {
      document.getElementById('map').innerHTML = ''
      this.map.off('load')
      this.$nextTick(() => {
        this.initMap()
      })
    },
    geoLineStr({ map, coordinates, style = {}, layerId = this.uuId() }) {
      // console.log('geoLineStr',coordinates)
      map.addLayer({
        id: layerId,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates
                }
              }
            ]
          }
        },
        ...style
      })
    },
    uuId() {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = '-'
      return s.join('')
    },
    drawProvinceLine() {
      const option = {
        map: this.map,
        coordinates: MapSettings.outLine,
        style: MapSettings.outlineStyle
      }
      this.geoLineStr(option)
    },
    drawCityLine() {
      const inside = MapSettings.inside
      for (const key in inside) {
        if (inside.hasOwnProperty(key)) {
          const option = {
            map: this.map,
            coordinates: inside[key],
            style: MapSettings.insideStyle
          }
          this.geoLineStr(option)
        }
      }

      // let lineData = MapSettings.lineData;
      // let option1 = {
      //     map: this.map,
      //     coordinates: lineData['lineData'],
      //     style: MapSettings.insideStyle
      // };
      // this.geoLineStr(option1);
    },
    initGridLayer() {
      const that = this
      this.gridLayer = new egisV2.layer.GridVectorLayer({
        map: that.map,
        url: that.msServiceUrl + '/mapservice/mapexport/vecformat',
        method: 'POST',
        data: {
          layers: that.layers,
          displayfilter: [{ 300000: 'dydj != 8' }],
          mapid: 110,
          maptype: 1001,
          disschema: 1
        }
      })
      this.gridLayer.on(
        egisV2.event.GridVectorLayerEvent.BEFORE_RENDER,
        (e) => {
          // //console.log('渲染开始:' + new Date().getTime())
          // //console.log(e)
        }
      )
      this.gridLayer.on(
        egisV2.event.GridVectorLayerEvent.AFTER_RENDER,
        (e) => {}
      )
      this.gridLayer.on('click', (e) => {
        // console.log("点击矢量图事件")
      })
      this.gridLayer.render()
      this.gridLayer.setVisible(true)
    },

    // 地图故障分析打点
    mapMalfunctionPointClick(item, YXJCclick) {
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
      const popupDOM = new SGMap.Popup({
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
      // 故障研判弹框打开
      if (document.querySelector('#faultDiagnosis') != null) {
        document
          .querySelector('#faultDiagnosis')
          .addEventListener('click', () => {
            console.log('...............................')
            YXJCclick()
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
