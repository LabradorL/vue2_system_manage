/**
 * 通用js方法封装处理
 */
import axios from 'axios'
// 引用数据类型的具体类型
const REFERENCE = ['Set', 'WeakSet', 'Map', 'WeakMap', 'RegExp', 'Date', 'Error']

/**
 * @函数名称  dealTimeFormat
 * @desc 将不同的时间处理成对象格式的时间 Thu Aug 11 2022 17:25:59 GMT+0800 (中国标准时间)
 * @params {string|object|number} 需要处理的时间
 * @return {object} 返回一个对象格式的时间
 * @example: dealTimeFormat('2022-08-11 10:02:23')
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */
function dealTimeFormat(time) {
  let date = null
  if (typeof time === 'object') {
    // Wed Aug 10 2022 16:53:08 GMT+0800 (中国标准时间)
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      // 2022-08-10  20222-08-10 13:59:59
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  return date
}

/**
 * @函数名称 parseTime 搭配 dealTimeFormat使用
 * @desc 将任意时间转化成指定的时间格式
 * @params {string|object|number}  需要转化的时间 例：{2022-02-04 12:20:02 {y}-{m}-{d}}
 * @params {string} 时间格式  例：{2022-02-04 12:20:02 {y}-{m}-{d}}
 * @return {string}  指定时间格式的字符串 例如 2022-02-04
 * @example: parseTime(2022-02-04 12:20:02,{y}-{m}-{d} {h}:{i}:{s} 星期{a})
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */

export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  const date = dealTimeFormat(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * @函数名称 countDown 搭配dealTimeFormat使用
 * @desc 距离指定时间剩余的时间或者一段时间间隔的天数
 * @params {string|object|number}  开始时间
 * @params {string|object|number}  结束时间,
 * @params {string}  时间格式
 * @return 返回指定的时间格式
 * @example: countDown(new Date(), '2022-08-11 17:25:59', '{m}时{i}分{s}秒')
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */
export function countDown(startTime, endTime, pattern) {
  if (arguments.length <= 1 || !startTime || !endTime) {
    return null
  }
  if (startTime > endTime) {
    return null
  }
  const format = pattern || '{h}:{i}:{s}'
  const start = dealTimeFormat(startTime)
  const end = dealTimeFormat(endTime)
  const lefttime = end.getTime() - start.getTime() // 到结束时间的毫秒数
  const formatObj = {
    d: Math.floor(lefttime / (1000 * 60 * 60 * 24)), // 计算天数
    m: Math.floor(lefttime / (1000 * 60 * 60)), // 计算无天的小时数
    h: Math.floor(lefttime / (1000 * 60 * 60) % 24), // 计算有天的小时数
    i: Math.floor(lefttime / (1000 * 60) % 60), // 计算分钟数
    s: Math.floor(lefttime / 1000 % 60) // 计算秒数
  }
  const time_str = format.replace(/{(d|m|h|i|s)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value >= 0) {
      value = value < 10 ? '0' + value : value
    }
    return value || ''
  })
  return time_str // 返回倒计时的字符串
}

/**
 * @函数名称  formatTime 搭配dealTimeFormat parseTime使用
 * @desc  当前时间距离指定时间过了多长时间
 * @params {string} 具体的时间
 * @params {string} 时间格式
 * @return {string}  返回指定格式的字符串
 * @example: formatTime('2022-08-10 12:20:02, {y}-{m}-{d})
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */
export function commentTime(time, pattern) {
  const pastTime = dealTimeFormat(time)
  const now = Date.now()
  const format = pattern || '{y}-{m}-{d} {h}:{i}'
  const diff = (now - pastTime) / 1000
  if (diff < 30) {
    // 小于30秒
    return '刚刚'
  } else if (diff < 3600) {
    // 小于一小时
    console.log(diff)
    // less 1 hour
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    // 小于一天
    return Math.floor(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    // 小于两天
    return '1天前'
  }
  return parseTime(time, format)
}
/**
 * @函数名称 getQueryObject
 * @desc 获取地址栏?后面的参数
 * @params {string | null}  需要获取参数的地址
 * @return {object}
 * @example: getQueryObject()
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return Object.getOwnPropertyNames(obj).length === 0 ? null : obj
}
/**
 * @函数名称 byteLength
 * @desc 计算传入的字符串的字节长度
 * @params {string}  需要计算字节长度的字符串
 * @return {number}
 * @example: byteLength('hellow,world')
 * @Author: lixiaofeng
 * @Date: 2022-08-10
 * @LastEditTime: 2022-08-10
 * @LastEditors: lixiaofeng
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let len = str.length
  for (let i = len - 1; i >= 0; i--) {
    // 将字母 汉字 数字字符串 转为 ASCII码
    // 1，ASCII码：一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字度节的空间。 共128个字符 值为0-127
    // 2，UTF-8编码：一个英文字符等于一个字节，一个中文（含繁体）等于三个字节。中文标点占三个字节，英文标点占一个字节
    // 3，Unicode编码：一个英文等于两个字节，一个中文（含繁体）等于两个字节。中文标点占两个字节，英文标点占两个字节
    // 4 字符（char）是 Java 中的一种基本数据类型，由 2 个字节组成（ java采用unicode编码，故均占两个字节），范围从 0 开始，到 2^16-1
    const code = str.charCodeAt(i)
    console.log(code)

    if (code > 0x7f && code <= 0x7ff) {
      // 十六进制在 0x7f和 0x7ff 之间的值   十进制是 127 到 2047
      // 表示一个字符是两个字节
      len++
    } else if (code > 0x7ff && code <= 0xffff) {
      // 十六进制在 0x7ff和 0x7ffff 之间的值   十进制是 2047 到 524287
      // 表示一个字符是三个字节
      len += 2
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      // 十六进制在 0xdc00 和 0xdfff 之间的值   十进制是 56320 到 57343
      i--
    }
  }
  return len
}

/**
 * @函数名称 judgeDataType
 * @description: 判断引用数据类型的具体类型
 * @param {*} obj 需要判断的数据
 * @return {*} Object Array Null 'Set', 'WeakSet', 'Map', 'WeakMap', 'RegExp', 'Date', 'Error'
 */
function judgeDataType(obj) {
  // 返回数据类习
  // Object.prototype.toString.call(target).slice(8, -1)
  return Object.prototype.toString.call(obj).replaceAll(new RegExp(/\[|\]|object /g), '')
}

/**
 * @函数名称 deepClone judgeDataType
 * @desc 将传入的数组或者对象克隆后返回一个新的对应数据类型的数据,如果是数组就是全部克隆
 * @params {Array | Object}  source 需要被克隆的数组或者对象
 * @params {Boolean}  isCloneBNull 是否将值为null的也克隆（false 值为null 的不克隆）
 * @return {Array} 返回克隆后的数组 newArray
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-08-11
 * @LastEditTime: 2022-08-11
 * @LastEditors: lixiaofeng
 */
export function deepClone(source, isCloneNull = true) {
  if (
    arguments.length === 0 ||
    !source ||
    source.length === 0
  ) {
    return null
  }
  // 最终返回的数据
  let finalResult = null
  if (Array.isArray(source)) {
    finalResult = []
    isCloneNull = true
  } else {
    finalResult = {}
  }
  for (const key in source) {
    const prop = source[key]
    // typeof 只能判断出基本数据类型，不能判断出引用数据类型的具体类型
    // judgeDataType 函数可以判断出 引用数据类型的具体类型，如Date、Error、RegExp
    const dataType = judgeDataType(prop)
    if (dataType === 'Array' || dataType === 'Object') {
      // 是数组或者对象类型的数据时，继续调用
      finalResult[key] = deepClone(prop, isCloneNull)
    } else if (REFERENCE.includes(dataType)) {
      // 如果是引用数据类型的其他类型时，通过对象原型和构造函数原型对象都有的属性constructor进行创建对应类型的数据
      finalResult[key] = new prop.constructor(prop)
    } else {
      // 基本数据类型和function 直接赋值
      if (dataType === 'Null' && isCloneNull) {
        finalResult[key] = prop
      } else {
        finalResult[key] = prop
      }
    }
  }
  return finalResult
}

/**
 * @函数名称 tansParams
 * @desc 将json格式的数据转换成&连接的请求参数
 * @params {json}
 * @return {String} name=%E4%B8%AD%E5%9B%BD&pageSize=10&pageNum=1& 会多一个&，添加时可使用slice(0,-1)去除
 * @example: tansParams({name:'中国',pageSize: 10,pageNum:1})
 * @Author: lixiaofeng
 * @Date: 2022-08-11
 * @LastEditTime: 2022-08-11
 * @LastEditors: lixiaofeng
 */
export function tansParams(params, propNameKey, isFirst = true) {
  if (!params) return ''
  let result = ''
  if (Array.isArray(params)) {
    // 参数是数组
    for (const key in params) {
      const prop = params[key]
      if (prop !== null && typeof prop !== 'undefined') {
        if (typeof prop === 'object') {
          result += tansParams(prop, propNameKey + '[' + key + ']', false)
        } else {
          const tempParams = propNameKey + '[' + key + ']'
          const subPart = tempParams + '='
          // let subPart = encodeURIComponent(params) + '='
          result += subPart + encodeURIComponent(prop) + '&'
        }
      }
    }
  } else {
    // 参数是对象
    for (const propName of Object.keys(params)) {
      const prop = params[propName]
      if (prop !== null && typeof prop !== 'undefined') {
        if (typeof prop === 'object') {
          result += tansParams(prop, propName, false)
        } else {
          if (isFirst) {
            result +=
              encodeURIComponent(propName) +
              '=' +
              encodeURIComponent(prop) +
              '&'
          } else {
            result +=
              propNameKey +
              '.' +
              propName +
              '=' +
              encodeURIComponent(prop) +
              '&'
          }
        }
      }
    }
  }
  return result
}

/**
 * @函数名称 titleCase
 * @desc 将英文字符串的首字母大写
 * @params {String}
 * @return {String} Box_name
 * @example: titleCase("box_name")
 * @Author: lixiaofeng
 * @Date: 2022-08-18 14:47:02
 */
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
/**
 * @函数名称 camelCase
 * @desc 将以_连接的字符串转为驼峰写法
 * @params {String}
 * @return {String}  boxName
 * @example: camelCase("box_name")
 * @Author: lixiaofeng
 * @Date: 2022-08-18 14:53:36
 */
export function camelCase(str) {
  return str.replace(/_[a-z]/g, (str1) => {
    return str1.substr(-1).toUpperCase()
  })
}

/**
 * @函数名称 changeDateFormat
 * @desc 将传入的开始结束时间的数组添加上时分秒
 * @params {Array}
 * @return {Array} ['2022-01-03 00:00:00','2022-01-04 23:59:59']
 * @example: changeDateFormat(['2022-01-03','2022-01-04'])
 * @Author: lixiaofeng
 * @Date: 2022-08-18 15:22:51
 */

export function changeDateFormat(dateArr) {
  // const startDate = `${dateArr[0].replace(/\-/g, '')}000000`;  // 202201030000
  // const endDate = `${dateArr[1].replace(/\-/g, '')}235959`; // 202201042359
  const startDate = `${dateArr[0]} 00:00:00`
  const endDate = `${dateArr[1]} 23:59:59`
  return [startDate, endDate]
}

/**
 * @函数名称 selectDictLabel
 * @desc 根据传过来的数组将对应的值转为文字描述
 * @params {Array} datas 字典值组成的数组
 * @params {String} value 字典值
 * @params {String} defaultText 默认无值时的返回值
 * @return {String} 是
 * @example: selectDictLabel([{dictValue: '0', dictLabel: '否'},{dictValue: '1', dictLabel: '是'}], '1')
 * @Author: lixiaofeng
 * @Date: 2022-08-18 15:27:15
 */
export function selectDictLabel(datas, value, defaultText = '--') {
  if (value === 0 || value) {
    const actions = []
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue === String(value)) {
        actions.push(datas[key].dictLabel)
        return true
      }
    })
    return actions.length ? actions.join('') : value
  }
  return defaultText
}
/**
 * @函数名称 selectDictLabels
 * @desc 根据传过来的数组将对应的字符串数组转为对应的文字描述
 * @params {Array} datas 字典值组成的数组
 * @params {String} value 字典值组成的字符串
 * @params {String} separator 字符串的分隔符
 * @params {String} defaultText 默认无值时的返回值
 * @return {String} 否，是
 * @example: selectDictLabels([{dictValue: '0', dictLabel: '否'},{dictValue: '1', dictLabel: '是'}], '1,0')
 * @Author: lixiaofeng
 * @Date: 2022-08-18 15:33:00
 */
export function selectDictLabels(
  datas,
  value,
  separator = ',',
  defaultText = '--'
) {
  if (value) {
    const actions = []
    const temp = value.split(separator)
    Object.keys(value.split(separator)).some((val) => {
      Object.keys(datas).some((key) => {
        if (datas[key].dictValue === String(temp[val])) {
          actions.push(datas[key].dictLabel + separator)
        }
      })
    })
    return actions.length ? actions.join('').substring(0, actions.join('').length - 1) : value
  }
  return defaultText
}

/**
 * @函数名称  praseStrEmpty
 * @desc 转换字符串，将 undefined,null等转化为"" 或者指定值
 * @params {String} str 需要转化的值
 * @params {any} defaultValue 将希望转化的值转为 '' | null 等
 * @return {any} null
 * @example: praseStrEmpty('null', null)
 * @Author: lixiaofeng
 * @Date: 2022-08-18 15:49:13
 */
export function praseStrEmpty(str, defaultValue = "''") {
  if (!str || str === 'undefined' || str === 'null') {
    return defaultValue
  }
  return str
}

/**
 * @函数名称 handleTree
 * @desc 将扁平化的数据构造成树型结构数据
 * @params {Array} data 数据源
 * @params {String} id字段 默认 'id'
 * @params {String} parentId 父节点字段 默认 'parentId'
 * @params {String} children 孩子节点字段 默认 'children'
 * @return {Array}
 * @example:
 * data = [{id:'a, parentId:''},{id:'b', parentId:'a'}{id:'c', parentId:'b'}]
 * childrenListMap = {'': [{id:'a, parentId:''}],
 *                    'a': [{id:'b', parentId:'a'}],
 *                    'b': [{id:'c', parentId:'b'}],
 *                   }
 * nodeIds = {'a': {id:'a, parentId:''},
 *            'b': {id:'b', parentId:'a'},
 *            'c': {id:'c', parentId:'b'},
 *           }
 * @Author: lixiaofeng
 * @Date: 2022-08-18 15:55:33
 */
export function handleTree(data, id, parentId, children) {
  // 设置各个字段对应的值
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }
  // 同一级的数据存储在一起,由以parentId值为key组成的数据
  const childrenListMap = {}
  // 以id值为key组成的对象，用于筛选顶级节点
  const nodeIds = {}
  // 顶级节点组成数组
  const tree = []

  for (const item of data) {
    // 父级的id
    const parentId = item[config.parentId] // item.parentId 1 ''
    // 在childrenListMap中不存在key值为item.parentId的值 ，创建并赋值为空数字
    if (childrenListMap[parentId] == null) {
      // childrenListMap.parentId == null
      childrenListMap[parentId] = [] // childrenListMap.parentId == []
    }
    // 所有数据存储在对应的id下
    nodeIds[item[config.id]] = item // nodeIds[1] = item  nodeIds[11] = item
    // 将同一级的数据存储在对应的父级中
    childrenListMap[parentId].push(item) // childrenListMap.parentId.push(item)
  }
  for (const item of data) {
    // 父级的id
    const parentId = item[config.parentId] // item.parentId 1 ''
    // 筛选顶级节点
    if (nodeIds[parentId] == null) {
      // nodeIds.11 == null
      tree.push(item)
    }
  }

  for (const firstNode of tree) {
    adaptToChildrenList(firstNode)
  }

  function adaptToChildrenList(parentNode) {
    // parentNode 父节点的信息 parentNode.id === childrenListMap[parentId的值]
    // childrenListMap[item.id] !== null
    if (childrenListMap[parentNode[config.id]] !== null) {
      // 存在子节点
      // item.children=childrenListMap[item.id]
      parentNode[config.childrenList] = childrenListMap[parentNode[config.id]]
    }
    if (parentNode[config.childrenList]) {
      for (const c of parentNode[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * @函数名称 arrayFlattening
 * @desc 将树形结构的数据扁平化
 * @params {Array} treeData 树形结构的数据
 * @params {Array} resArr 需要返回的数据
 * @return {Array}
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-08-18 16:06:34
 */
export function arrayFlattening(treeData, resArr = []) {
  resArr.push(...resArr)
  treeData.forEach((item) => {
    if (item.children && item.children.length) {
      resArr.push(...arrayFlattening(item.children))
    }
  })
  return resArr
}

/**
 * @函数名称 arrayLevelHandle
 * @desc 将树形结构的数据按层级展示
 * @params {Array} source 数据来源（需处理的数据）
 * @params {Array} resArr 返回的结果
 * @params {Number} level 层级
 * @params {String} label 需显示的内容
 * @params {String} id 数据id（唯一性）
 * @params {String} parentId 父级id
 * @return {Array} [[{id:1, topic:"种植", parentId:-1}][{id: 3,topic: "粮食作物",parentId: 1}]]
 * @example: arrayLevelHandle(
 * [{id:1, topic:"种植", parentId:-1, children: [{id: 3,topic: "粮食作物",parentId: 1,}]}], [], 0, "topic", "id", "parentId")
 * @Author: lixiaofeng
 * @Date: 2022-08-24 09:56:40
 */
export function arrayLevelHandle(
  source,
  resArr = [],
  level = 0,
  label,
  id,
  parentId
) {
  if (arguments.length === 0) {
    return []
  }
  // 设置各个字段对应的值
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    label: label || 'label'
  }
  const arr = []
  source.forEach((element) => {
    if (element.children && element.children.length) {
      // 再来一次
      arrayLevelHandle(element.children, resArr, level + 1, label)
    }
    const params = {
      id: element[config.id],
      parentId: element[config.parentId],
      label: element[config.label]
    }
    arr.push(params)
  })

  if (resArr[level]) {
    resArr[level] = [...resArr[level], ...arr]
  } else {
    resArr[level] = arr
  }
  return resArr
}

/**
 * @函数名称 fileDownload
 * @desc 下载文件， 没有完整路径的需要将注释解开
 * @params {String} filePath 文件地址
 * @params {String} fileName 文件名称  默认值 未知文件名
 * @return {}
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-08-18 16:09:45
 */
// 文件下载方法（只支持ie11及其他）
export function fileDownload(filePathUrl, filename = '未知文件名') {
  // let baseURL = store.state.app.fileServerPath // 文件路径前缀
  // let isHasPrefix = filePathUrl.includes(baseURL)
  // if(!isHasPrefix) {
  //   filePathUrl = baseURL + filePathUrl
  // }
  axios
    .get(filePathUrl, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: 'blob'
    })
    .then((res) => {
      if (res.status === 200) {
        const content = res.data
        const blob = new Blob([content]) // 谷歌更新后需需要这样传值
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 清除引用
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
      }
    })
    .catch((r) => {
      console.error(r)
    })
}

/**
 * @函数名称 toChineseBig  numToChinese
 * @desc 将数字转为对应的汉字，支持9位以上的即亿级的，
 * @params {Number} num 需要转化的数字
 * @params {Boolean} isMoney 是否是钱的格式
 * @return {String} 对应的汉字 十二万零六
 * @example: toChineseBig(120006)
 * @Author: lixiaofeng
 * @Date: 2022-09-01 14:06:34
 */
export function toChineseBig(num, isMoney = false) {
  if (!num) {
    return '零'
  }
  // 将接收到的num转换为字符串
  const strNum = String(num)
  // 定义单位
  let unit = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
  if (isMoney) {
    unit = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']
  }
  // 结果中放一个符号，用来解决最后的零去不掉的问题
  const result = ['@']
  // 单位下标
  let unitNo = 0
  // 从后往前遍历接收到的数据，省略结束条件
  for (let i = strNum.length - 1; ; i--) {
    // 调用转大写函数，将每一个数字转换成中文大写，一次放入一个到结果数组中
    result.unshift(numToChinese(strNum[i]))
    // 如果不大于0
    if (i <= 0) {
      // 结束循环
      break
    }
    // 放入一个数字，放入一个单位
    result.unshift(unit[unitNo])
    // 单位下标加1
    unitNo++
  }
  // 将结果数组转换成字符串，并使用正则替换一些关键位置，让结果符合语法
  if (isMoney) {
    return result
      .join('')
      .replace(/(零[仟佰拾]){1,3}/g, '零')
      .replace(/零{2,}/g, '零')
      .replace(/零([万亿])/g, '$1')
      .replace(/亿万/g, '亿')
      .replace(/零*@/g, '')
  }
  return result
    .join('')
    .replace(/(零[千百十]){1,3}/g, '零')
    .replace(/零{2,}/g, '零')
    .replace(/零([万亿])/g, '$1')
    .replace(/亿万/g, '亿')
    .replace(/零*@/g, '')
}
// 将0~9对应的数字转为汉字 零壹贰叁肆伍陆柒捌玖
function numToChinese(n, isMoney) {
  // var chineseBigNum = '零壹贰叁肆伍陆柒捌玖'
  let chineseBigNum = '零一二三四五六七八九'
  if (isMoney) {
    chineseBigNum = '零壹贰叁肆伍陆柒捌玖'
  }
  return chineseBigNum[n]
}

/**
 * @函数名称 numFormat
 * @desc 数字以千位分隔符分割
 * @params {String} num 数字
 * @return {}
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-09-01 14:53:51
 */
export function numFormat(num) {
  const res = num.toString().replace(/\d+/, function(n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ','
    })
  })
  return res
}

/**
 * @函数名称 numToFixed
 * @desc 保留n位小数
 * @params {Number,String} num, 数字
 * @params {Number} decimalNum, 小数保留的位数, 默认两位
 * @return {}
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-09-22 17:23:31
 */
export function numToFixed(num, decimalNum = 2) {
  return parseFloat(num).toFixed(decimalNum)
}
/**
 * @函数名称 filterPhoneNumber
 * @desc 手机号中间四位展示*
 * @params {}
 * @return {}
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-09-22 18:33:39
 */
export function filterPhoneNumber(phoneNumber) {
  if (phoneNumber && phoneNumber.length !== 11) return ''
  // 中间四位显示*
  const reg = /^(\d{3})\d{4}(\d{4})$/
  // 中间7位显示*
  // const reg = /^(\d{2})\d{7}(\d{2})$/
  phoneNumber = phoneNumber.toString() // 先强制转换成字符串类型
  return phoneNumber.replace(reg, '$1****$2')
}

/**
 * @函数名称 sameKeyDataAdd
 * @desc 将数组对象中相同Key的数据值进行相加
 * @params {Array} data 需要处理的数据 required
 * @params {String} labelKey 需要显示的label的key required
 * @params {String} valueKey 此label下找对应值的key required
 * @params {String} itemKey 需要相加的key值
 * @params {Boolean} isLoop 是否是双重循环
 * @params {String} loopListKey 第二层循环的key值
 * @return {Array} result 符合要求的数据
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-09-22 18:33:39
 */
export function sameKeyDataAdd(data, labelKey, valueKey, itemKey, isLoop = false, loopListKey) {
  if (!data || !labelKey || !valueKey || !itemKey) {
    return []
  }
  if (isLoop && !loopListKey) {
    return []
  }
  // 最终结果的map对象,可以针对展示的内容根据后端返回的数据进行展示，不确定性大，每次返回的数据label不确定
  const resultDataMap = new Map()
  if (isLoop) {
    // 双重循环
    data.forEach(item => {
      item[loopListKey].forEach(secondItem => {
        let num = 0
        // 是否存在某一项数据, 存在取出对应的值
        if (resultDataMap.has(item[labelKey])) {
          num = resultDataMap.get(secondItem[labelKey])
        }
        resultDataMap.set(item[labelKey], num + secondItem[itemKey])
      })
    })
  } else {
    // 单层循环
    data.forEach(item => {
      let num = 0
      // 是否存在某一项数据, 存在取出对应的值
      if (resultDataMap.has(item[labelKey])) {
        num = resultDataMap.get(item[labelKey])
      }
      resultDataMap.set(item[labelKey], num + item[itemKey])
    })
  }
  const resultData = [...resultDataMap].map(([key, value]) => {
    return {
      [labelKey]: key,
      [valueKey]: value
    }
  })
  return resultData
}

/**
 * @函数名称 sameKeyDataPush
 * @desc 将数组对象中相同Key的数据值push到一个数组中
 * @params {Array} data 需要处理的数据 required
 * @params {String} labelKey 需要显示的label的key required
 * @params {String} valueKey 此label下找对应值的key required
 * @params {String} itemKey 需要相加的key值
 * @params {Boolean} isLoop 是否是双重循环
 * @params {String} loopListKey 第二层循环的key值
 * @return {Array} result 符合要求的数据
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-09-22 18:33:39
 */
export function sameKeyDataPush(data, labelKey, valueKey, itemKey, isLoop = false, loopListKey) {
  if (!data || !labelKey || !valueKey || !itemKey) {
    return []
  }
  if (isLoop && !loopListKey) {
    return []
  }
  // 最终结果的map对象,可以针对展示的内容根据后端返回的数据进行展示，不确定性大，每次返回的数据label不确定
  const resultDataMap = new Map()
  if (isLoop) {
    // 双重循环
    data.forEach(item => {
      item[loopListKey].forEach(secondItem => {
        let tempArr = ''
        // 是否存在某一项数据, 存在取出对应的值
        if (resultDataMap.has(secondItem[labelKey])) {
          tempArr = resultDataMap.get(secondItem[labelKey]) + ','
        }
        resultDataMap.set(secondItem[labelKey], tempArr + secondItem[itemKey])
      })
    })
  } else {
    // 单层循环
    data.forEach(item => {
      let tempArr = []
      // 是否存在某一项数据, 存在取出对应的值
      if (resultDataMap.has(item[labelKey])) {
        tempArr = resultDataMap.get(item[labelKey])
      }
      resultDataMap.set(item[labelKey], tempArr.push(item[itemKey]))
    })
  }
  const resultData = [...resultDataMap].map(([key, value]) => {
    return {
      [labelKey]: key,
      [valueKey]: value.split(',')
    }
  })
  return resultData
}


/**
 * @函数名称 resetForm
 * @desc: 对表单进行重置、清除校验
 * @param {string} formRef 表单的ref
 * @param {boolean} isResetForm 是否重置表单字段
 * @return {*}
 */
export function resetForm(formRef, isResetForm = true) {
  this.$refs[formRef].clearValidate()
  if (isResetForm) {
    this.$refs[formRef].resetFields()
  }
}

/**
 * @函数名称 validateField
 * @desc: 对表单的某一项进行校验
 * @param {string} formRef 表单的ref
 * @param {fieldName} fieldName 需要验证的字段名称
 * @return {*}
 */
export function validateField(formRef, fieldName) {
  this.$refs[formRef].validateField(fieldName)
}

/**
 * @函数名称 constantize
 * @desc: 将对象彻底冻结
 *        被冻结后的对象不仅仅是不能修改值，同时也
 *        不能向这个对象添加新的属性
 *        不能修改其已有属性的值
 *        不能删除已有属性
 *        不能修改该对象已有属性的可枚举性、可配置性、可写性
 * @param {Obenct} obj 需要冻结的数据
 * @return {*}
 */
export function constantize(obj) {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}

/**
 * @函数名称 publishDate
 * @description: 根据传入的日期 显示不同格式的日期,搭配parseTime函数使用
 *               同天显示时间
 *               同年显示月-日，
 *               不同年 年-月-日
 * @param {date} date 需要显示的日期
 * @return {String} 09:20/03-21/2023-03-23
 */
export function publishDate(date) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()
  const year = parseTime(date, '{y}')
  const month = parseTime(date, '{m}')
  const day = parseTime(date, '{d}')
  if (currentDay === day) {
    // 同一天
    return parseTime(date, '{h}:{i}')
  } else if (year === currentYear) {
    // 同年
    return `${month}-${day}`
  }
  return `${year}-${month}-${day}`
}

/**
 * @函数名称 getBeforeDate
 * @description: 获取当前日期的前n天, 搭配parseTime函数使用
 * @param {Number} 获取前 n天的日期
 * @return {Date} 2023-02-12
 */
export function getBeforeDate(n) {
  const date = new Date()
  date.setDate(date.getDate() - n)

  return parseTime(date, '{y}-{m}-{d}')
}

/**
 * @函数名称 mergeObj
 * @description: 根据源对象的数据进行合并对象
 *               target对象存在的值使用target，不存在的值使用source对象中的
 * @param {*} source 源对象
 * @param {*} target 目标对象
 * @return {*}
 */
export function mergeObj(source, target) {
  const newObj = {}
  for (const key in source) {
    if (target[key]) {
      newObj[key] = target[key]
    } else {
      newObj[key] = source[key]
    }
  }
  return newObj
}

/**
 * @函数名称 isObjectEqual 搭配judgeDataType使用
 * @description: 判断两个对象的属性值是否相等
 * @param {*} obj1
 * @param {*} obj2
 * @return {*}
 */
export function isObjectEqual(obj1, obj2) {
  // JSON.stringify也可以,但只包含简单类型（如数字、字符串、布尔值和 null）以及其他对象或数
  // if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
  //   return false
  // }
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  let isEqual = true
  for (const key of obj1Keys) {
    // 判断类型是否相同
    if (judgeDataType(obj1[key]) !== judgeDataType(obj2[key])) {
      isEqual = false
    } else if (judgeDataType(obj1[key]) === 'Object') {
      isEqual = isObjectEqual(obj1[key], obj2[key])
    } else if (judgeDataType(obj1[key]) === 'Array') {
      const len = obj1[key].length
      if (len !== obj2[key].length) {
        return false
      }
      for (let i = 0; i < len; i++) {
        isEqual = isObjectEqual(obj1[key][i], obj2[key][i])
        if (!isEqual) {
          break
        }
      }
    } else if (obj1[key] !== obj2[key]) {
      isEqual = false
    }

    if (!isEqual) {
      return false
    }
  }
  return true
}

// 设计稿的尺寸大小
const client = {
  clientWidth: 1920,
  clientHeight: 1010
}
/**
 * 设置大屏缩放，以适应小屏
 * 设计图尺寸（大屏尺寸）
 */
export function initRem() {
  const dom = document.getElementById('remContainer')
  if (dom) {
    // 默认的宽（设计图的宽）
    dom.style.width = `${client.clientWidth}px`
    // 默认的宽（设计图的高）
    dom.style.height = `${client.clientHeight}px`
    // 实际的宽
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    // 实际的高
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    // 与设计图进行对比，看需要缩放多少
    dom.style.transform = `scale(${w / client.clientWidth}, ${h / client.clientHeight})`
    // 以左上角为中心进行缩放
    dom.style.transformOrigin = 'left top'
  }
  // window.addEventListener('resize', function() {
  //   initRem()
  // })
}


/**
 * 设置根基础路径，通过插件，将PX转rem
 * 插件配置的设计图宽要跟这里的client.clientWidth保持一致
 */
export function screenInit() {
  const docEle = document.documentElement
  let clientWidth = docEle.clientWidth
  // let clientHeight = docEle.clientHeight
  if (client) {
    clientWidth = client.clientWidth
    // clientHeight = client.clientHeight
  }
  function setHtmlFontSize() {
    const fontSize = clientWidth / 10
    docEle.style.fontSize = fontSize.toFixed(3) + 'px'
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
}


// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== 'application/json'
}

