/**
 * 通用js方法封装处理
 */

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
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
      // 2022-08-10  20222-08-10 13:59:59
			time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm),'');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
  return date
}

/**
 * @函数名称 parseTime
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
	let date = dealTimeFormat(time)
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
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}
/**
 * @函数名称 countDown
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
export function countDown(startTime,endTime, pattern,) {
  if(arguments.length <= 1 || !startTime || !endTime) {
    return null
  }
  if(startTime > endTime ) {
    return null
  }
  const format = pattern || '{h}:{i}:{s}'
  let start = dealTimeFormat(startTime)
  let end = dealTimeFormat(endTime)
  console.log(typeof end)
  const lefttime = end.getTime() - start.getTime() // 到结束时间的毫秒数
  const formatObj = {
		d: Math.floor(lefttime / (1000 * 60 * 60 * 24)), // 计算天数
    m: Math.floor((lefttime / (1000 * 60 *60))), //计算无天的小时数
		h: Math.floor((lefttime / (1000 * 60 * 60)) % 24), // 计算有天的小时数
		i: Math.floor((lefttime / (1000 * 60)) % 60), // 计算分钟数
		s: Math.floor((lefttime / 1000) % 60) // 计算秒数
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
 * @函数名称  formatTime
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
 export function formatTime(time, pattern) {
  const pastTime = dealTimeFormat(time)
  const now = Date.now()
  const format = pattern || '{y}-{m}-{d} {h}:{i}'
  const diff = (now - pastTime) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    console.log(diff)
    // less 1 hour
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
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
  return Object.getOwnPropertyNames(obj).length==0 ? null : obj
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
  for (var i = len - 1; i >= 0; i--) {
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
    }else if (code > 0x7ff && code <= 0xffff) {
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
 * @函数名称 deepClone
 * @desc 将传入的数组或者对象克隆后返回一个新的对应数据类型的数据,如果是数组就是全部克隆
 * @params {Array | Object}  source 需要被克隆的数组或者对象
 * @params {Boolean}  isAllClone 是否将所有内容都克隆（包含undefined function 等类型，除了null）
 * @params {Boolean}  isCloneBNull 是否将值为null的也克隆（false 值为null 的不克隆）
 * @return {Array} 返回克隆后的数组 newArray
 * @example: ''
 * @Author: lixiaofeng
 * @Date: 2022-08-11
 * @LastEditTime: 2022-08-11
 * @LastEditors: lixiaofeng
 */
 export function deepClone(source, isAllClone = true, isCloneBNull = true) {
    if (arguments.length === 0 || !source || source.length === 0 || Object.getOwnPropertyNames(source).length==0) {
      return null
    }
    // 最终返回的数据
    let finalResult = null
    if (Array.isArray(source)) {
      finalResult = []
      isAllClone = true
      isCloneBNull = true
    } else {
      finalResult = {}
    }
    for(let key in source){
      const prop=source[key];
      switch(typeof prop) {
        case 'string':
        case 'number':
        case 'boolean':
          finalResult[key] = prop
          break;
        case 'function':
        case 'undefined':
          if(isAllClone) {
            finalResult[key] = prop
          }
          break;
        case 'object':
          if(prop === null) {
            if(isCloneBNull) {
              finalResult[key] = prop
            }
          }else {
            finalResult[key] = deepClone(prop, isAllClone)
          }
          break;
        default:
          finalResult[key] = prop
          break;
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
export function tansParams(params,propNameKey,isFirst = true) {
  if (!params) return ''
  let result = ''
  if(Array.isArray(params)) {
    // 参数是数组
    for(const key in params) {
      const prop = params[key]
      if(prop !== null && typeof (prop) !== 'undefined') {
        if(typeof prop === 'object') {
          result += tansParams(prop, propNameKey + '[' + key + ']', false)
        }else {
          const tempParams = propNameKey + '[' + key + ']'
          let subPart = tempParams + '='
          // let subPart = encodeURIComponent(params) + '='
          result += subPart + encodeURIComponent(prop) + '&'
        }
      }
    }

  }else {
    // 参数是对象
    for(const propName of Object.keys(params)) {
      const prop = params[propName]
      if(prop !== null && typeof (prop) !== 'undefined') {
        if(typeof prop === 'object') {
          result += tansParams(prop, propName, false)
        }else {
          if(isFirst) {
            result += encodeURIComponent(propName) + '=' + encodeURIComponent(prop) + '&'
          }else {
            result += propNameKey+ "." + propName + '=' + encodeURIComponent(prop) + '&'
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
  return str.replace(/_[a-z]/g, (str1) => { return str1.substr(-1).toUpperCase()})
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
 export function selectDictLabel(datas, value, defaultText = "--") {
  if (value === 0 || value) {
    const actions = []
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == String(value)) {
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
export function selectDictLabels(datas, value, separator = ",", defaultText = "--") {
  if(value) {
    var actions = []
    var temp = value.split(separator)
    Object.keys(value.split(separator)).some((val) => {
      Object.keys(datas).some((key) => {
        if (datas[key].dictValue == ('' + temp[val])) {
          actions.push(datas[key].dictLabel + separator)
        }
      })
    })
    return actions.length ? actions.join('').substring(0, actions.join('').length - 1) : value
  }else {
    return defaultText
  }
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
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };
  // 同一级的数据存储在一起,由以parentId值为key组成的数据
  let childrenListMap = {};
  // 以id值为key组成的对象，用于筛选顶级节点
  let nodeIds = {};
  // 顶级节点组成数组
  let tree = [];

  for (let item of data) {
    // 父级的id
    let parentId = item[config.parentId]; // item.parentId 1 ''
    // 在childrenListMap中不存在key值为item.parentId的值 ，创建并赋值为空数字
    if (childrenListMap[parentId] == null) { //childrenListMap.parentId == null
      childrenListMap[parentId] = []; // childrenListMap.parentId == []
    }
    // 所有数据存储在对应的id下
    nodeIds[item[config.id]] = item;  // nodeIds[1] = item  nodeIds[11] = item
    // 将同一级的数据存储在对应的父级中
    childrenListMap[parentId].push(item); // childrenListMap.parentId.push(item)
  }
  for (let item of data) {
    // 父级的id
    let parentId = item[config.parentId]; // item.parentId 1 ''
    // 筛选顶级节点
    if (nodeIds[parentId] == null) {  // nodeIds.11 == null
      tree.push(item);
    }
  }

  for (let firstNode of tree) {
    adaptToChildrenList(firstNode);
  }

  function adaptToChildrenList(parentNode) {
    // parentNode 父节点的信息 parentNode.id === childrenListMap[parentId的值]
    //childrenListMap[item.id] !== null
    if (childrenListMap[parentNode[config.id]] !== null) {
      // 存在子节点
      // item.children=childrenListMap[item.id]
      parentNode[config.childrenList] = childrenListMap[parentNode[config.id]];
    }
    if (parentNode[config.childrenList]) {
      for (let c of parentNode[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
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
  treeData.forEach(item => {
    if (item.children && item.children.length) {
      resArr.push(...ArrayFlattening(item.children))
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
 export function arrayLevelHandle(source, resArr = [], level = 0, label, id, parentId) {
  if(arguments.length === 0){return []}
  // 设置各个字段对应的值
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    label: label || "label",
  };
  let arr = [];
  source.forEach((element) => {
    if (element.children && element.children.length) {
      // 再来一次
      arrayLevelHandle(element.children, resArr, level + 1, label);
    }
    const params = {
      id: element[config.id],
      parentId: element[config.parentId],
      label: element[config.label],
    };
    arr.push(params);
  });

  if (resArr[level]) {
    resArr[level] = [...resArr[level], ...arr];
  } else {
    resArr[level] = arr;
  }
  return resArr;
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
  axios.get(filePathUrl, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    responseType: 'blob'
  }).then((res) => {
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
  }).catch((r) => {
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
  if(!num) {
    return '零'
  }
  // 将接收到的num转换为字符串
  let strNum = String(num)
  // 定义单位
  let unit = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
  if(isMoney) {
    unit = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']
  }
  // 结果中放一个符号，用来解决最后的零去不掉的问题
  let result = ['@']
  // 单位下标
  let unitNo = 0
  // 从后往前遍历接收到的数据，省略结束条件
  for (let i = strNum.length - 1;; i--) {
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
  if(isMoney) {
    return result.join('').replace(/(零[仟佰拾]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')
  }else {
    return result.join('').replace(/(零[千百十]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')
  }
}
// 将0~9对应的数字转为汉字 零壹贰叁肆伍陆柒捌玖
function numToChinese(n, isMoney) {
  // var chineseBigNum = '零壹贰叁肆伍陆柒捌玖'
  let chineseBigNum = '零一二三四五六七八九'
  if(isMoney) {
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
 export function numFormat(num){
  let res = num.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){return $1+",";});
  })
  return res;
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
 export function numToFixed(num, decimalNum = 2){
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
  if(phoneNumber && phoneNumber.length !== 11) return ''
  // 中间四位显示*
  const reg = /^(\d{3})\d{4}(\d{4})$/
  // 中间7位显示*
  // const reg = /^(\d{2})\d{7}(\d{2})$/
	phoneNumber = phoneNumber.toString()	//先强制转换成字符串类型
	return phoneNumber.replace(reg, '$1****$2')
}

