
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
  },
  mapCenter: [106.22014954627548, 37.33986129530763], // 设置地图中心点位置
  mapZoom: 6.5,
  mapLevel:(funcType)=>mapLevel(funcType)
}

export default MapSettings
