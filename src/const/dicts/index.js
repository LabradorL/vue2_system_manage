const dictOptions = {
  // 异常设备
  abnormalDevice: [
    { value: '1', label: '线路' },
    { value: '2', label: '融合终端配变' }
  ],
  // 配变异常类型
  abnormalType: [
    { value: '2', label: '重载' },
    { value: '1', label: '过载' },
    { value: '3', label: '三项不平衡' },
    { value: '5', label: '低电压' }
  ],
  // 线路异常类型
  lineAbnormalType: [
    { value: '2', label: '重载' },
    { value: '1', label: '过载' }
  ]
}

export function selectDictLabel(datas, val) {
  if (val == 0 || val) {
    const actions = []
    Object.keys(datas).some(key => {
      if (datas[key].value === String(val)) {
        actions.push(datas[key].label)
        return true
      }
    })
    return actions.length ? actions.join(',') : val
  }
}

export default dictOptions
