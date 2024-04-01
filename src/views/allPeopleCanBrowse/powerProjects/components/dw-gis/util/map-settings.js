
function provinceType(type) {
  // console.log(type);
  // console.log()
  return type == '02' ? MapSettings.mapZoom : type === '03' ? 6.5 : 10
}

function cityType(type) {
  return type === '02' ? MapSettings.mapZoom : type === '03' ? 6.5 : 10
}

/* @param funcType 行政级别*/
function mapLevel(funcType) {
  const type = {
    '02': {
      level: 6.5
    },
    '03': {
      level: 8
    },
    '04': {
      level: 10
    },
    'feeder': {
      level: 13
    },
    'tr': {
      level: 13
    }
  }
  return type[funcType]
}
const MapSettings={
  outlineStyle: {
    paint: {
      'line-color': '#0193fc',
      'line-width': 4
    }
  },
  insideStyle:{
    paint: {
      'line-color': '#66FFCC',
      'line-width': 6
    }
  },
  boundaryOption:{
    paint:{
      'line-color':'#bFe5f5',
      'fill-color':'rgb(0,29,54)'
    }
  },
  cityPoint:{
    '武汉市':[114.313, 30.627],
    '黄石市':[115.07, 30.22],
    '十堰市':[110.78, 32.64],
    '宜昌市':[111.29, 30.70],
    '襄阳市':[112.14, 32.04],
    '鄂州市':[114.89, 30.39],
    '荆门市':[112.20, 31.13],
    '孝感市':[113.92, 30.92],
    '荆州市': [112.23, 30.32],
    '黄冈市':[114.87, 30.44],
    '咸宁市': [114.32, 29.83],
    '随州市': [113.37, 31.71],
    '恩施土家族苗族自治州':  [109.48, 30.28],
    '神农架林区': [110.67, 31.74]
  },
  mapCenter: [106.22014954627548, 37.33986129530763], // 设置地图中心点位置
  mapZoom: 6.5,
  mapLevel:(funcType)=>mapLevel(funcType)
}

export default MapSettings
