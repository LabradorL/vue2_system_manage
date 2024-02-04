/*
 * @Author: lixiaofeng
 * @Date: 2022-09-01 15:14:53
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-11-15 16:41:18
 * @Description: 常见的校验
 * 正则常见的量词
 *    {m,n}   ：表示连续出现最少 m 次，最多 n 次 \d{m,n}
      {m, }   ：表示至少出现m次 \d{m,}
      {m}     ：表示出现m次 \d{m}
      ？      ：等价于{0，1} 表示出现或不出现 \d?
      +       ：等价于{1，} 表示至少出现1次 \d+
      *       ：等价于{0，} 表示出现任意次，可以不出现 \d*
  常见的简写形式
      \d  :表示[0-9]，表示一位数字, \d 和[0,9]不一样， \d 匹配的种类更多,除了半角数字外,还包含全角下的数字,罗马数字等等,都可以匹配成功; 而[0-9] 只匹配半角下的数字。目前还没发现不同，但都建议数字验证使用[0,9]。
      \D  :表示[^0-9]，表示除数字外的任意字符
      \w  :表示[0-9a-zA-Z_]，表示数字、大小写字母和下划线
      \W  :表示[^0-9a-zA-Z_]，非单词字符
 */

/*
 * 使用方法
 * 1. 当判断用
 *    ⑴ 在页面中引入方法  import { isExternal } from '@/utils/validate'
 *    ⑵ 在需要使用的方法中直接使用 例子：isExternal(path)
 * 2. 当验证规则用
 *    ⑴ 在页面中引入方法  import { chineseLenValidator } from '@/utils/validate'
 *    ⑵ 在规则对象中使用  { required: true, validator: chineseLenValidator, min: 2, max: 20, emptyText: '姓名', trigger: 'blur' }
 *    ⑶ 使用正则使用     { required: true, pattern:: 正则表达式, trigger: 'blur' }
 */


/*
 * @Description: 是否以https、mailto、tel开头
 * @Author: lixiaofeng
 * @Date: 2022-10-09
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @函数名称 validateAreaAndBit
 * @description: 校验身份证证号的地址编码和校验位
 * @param {*} code 身份证号
 * @return {*} 返回错误信息 或者 true
 */
function validateAreaAndBit(code) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  if (!city[code.substr(0, 2)]) {
    return '地址编码错误'
  }
  // 18位身份证需要验证最后一位校验位
  code = code.split('')
  // ∑(ai×Wi)(mod 11)
  // 加权因子 从第一位到第十七位的系数（加权因子）分别为
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验位
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
  // 1 将身份证前17位数字和系数相乘的结果相加
  // 2 用加出来的和除以11，看余数是多少
  // 3 余数只可能有 0 1 2 3 4 5 6 7 8 9 10这11个数字。其分别对应的最后一位
  // 身份证的号码为 1 0 X 9 8 7 6 5 4 3 2
  let sum = 0
  let ai = 0
  let wi = 0
  for (let i = 0; i < 17; i++) {
    ai = code[i]
    wi = factor[i]
    sum += ai * wi
  }
  if (parity[sum % 11] !== Number(code[17])) {
    return '证件号码校验位错误'
  }
  return true
  /**
   * @description:
   * @return {*}
   */
}

/**
 * @函数名称 idCardValidator 搭配validateAreaAndBit使用
 * @description: 验证身份证号是否合法
 * @param {*} rule 规则
 * @param {*} value 输入的值
 * @param {*} callback 回调函数
 * @return {*} 验证是否通过
 */
export function idCardValidator(rule, value, callback) {
  // 出生日期在1800~2099年之间
  const IdReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  // 不限制出生年份
  // const IdReg = /^[1-9]\d{5}\d{4}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('身份证号不能为空'))
  }
  // 为非必填
  if (value) {
    if (!IdReg.test(value)) {
      return callback(new Error('请填写正确的身份证号'))
    }
    const valiRes = validateAreaAndBit(value)
    if (valiRes !== true) {
      return callback(new Error(valiRes))
    }
  }
  return callback()
}

/*
 * @Description: 验证手机号
 * @Author: lixiaofeng
 * @Date: 2022-09-09
 */
export function telphoneValidator(rule, value, callback) {
  const phoneReg = /^1[3,4,5,6,7,8,9]\d{9}$/
  // const phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('手机号不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!phoneReg.test(value)) {
      return callback(new Error('请填写正确的手机号'))
    }
  }
  return callback()
}

/*
 * @Description: 验证固话
 * @Author: lixiaofeng
 * @Date: 2022-09-13
 */
export function fixPhoneValidator(rule, value, callback) {
  const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('固定电话不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的固定电话'))
    }
  }
  return callback()
}

/*
 * @Description: 手机号+固话的验证
 * @Author: lixiaofeng
 * @Date: 2022-09-13
 */
export function phoneValidator(rule, value, callback) {
  const reg = /(^([0-9]{3,4}-)?[0-9]{7,8}$)|(^1[3,4,5,6,7,8,9]\d{9}$)/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('联系方式不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的联系方式'))
    }
  }
  return callback()
}

/*
 * @Description: 快递单号验证（笼统的验证）最少10位，最多20位
 * @Author: lixiaofeng
 * @Date: 2022-09-13
 */
export function expressNumValidator(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{10,20}$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('快递单号不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的快递单号'))
    }
  }
  return callback()
}

/*
 * @Description: 邮箱验证
 * @Author: lixiaofeng
 * @Date: 2022-09-14
 */
export function emailValidator(rule, value, callback) {
  const reg = /^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@([a-zA-z\d]+[-.])+[a-zA-Z\d]{2,4}$/
  // const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('邮箱不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的邮箱'))
    }
    return callback()
  }
  return callback()
}

/*
 * @Description: 统一社会信用代码验证
                 统一社会信用代码用18位阿拉伯数字或大写英文字母表示，
                 分别是1位登记管理部门代码、1位机构类别代码、6位登记管理机关行政区划码、9位主体标识码、1位校验码
 * @Author: lixiaofeng
 * @Date: 2022-09-14
 */
export function creditCodeValidator(rule, value, callback) {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('社会信用代码不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的社会信用代码'))
    }
  }
  return callback()
}
/*
* @Description: 组织机构代码验证
                组织机构由八位数字（或大写拉丁字母）本体代码和一位数字（或大写拉丁字母）校验码组成
                为便于人工识别，应使用一个连字符“—”分隔本体代码与校验码。机读时，连字符省略
* @Author: lixiaofeng
* @Date: 2022-09-14
*/
export function organizingCodeValidator(rule, value, callback) {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{10}-[0-9A-HJ-NPQRTUWXY])$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error('组织机构代码不能为空'))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的组织机构代码'))
    }
  }
  return callback()
}

/*
 * @Description: 不能输入汉字
 * @Author: lixiaofeng
 * @Date: 2022-09-14
 */
export function isChineseValidator(rule, value, callback) {
  const reg = /^[^\u4e00-\u9fa5]+$/
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error(rule.message))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('不能输入汉字'))
    }
  }
  return callback()
}
/**
 * @description: 输入指定长度的汉字
 * @param {object} rule 具体规则
 * @param {string} value 输入的值
 * @param {function} callback 回调函数
 * @return {boolean} false true
 */
export function chineseLenValidator(rule, value, callback) {
  const minLen = rule.min || 2
  const maxLen = rule.max || 4
  const reg = new RegExp(`^[\\u4e00-\\u9fa5]{${minLen},${maxLen}}$`)
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error(`${rule.emptyText}不能为空`))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error(`请输入不超过${maxLen}个汉字`))
    }
  }
  return callback()
}

/*
 * @Description: n位整数，m位小数小数验证
 * @Author: lixiaofeng
 * @Date: 2022-09-15
 */
export function numLenValidator(rule, value, callback) {
  // 只能输入数字，不是数字用空替换
  // @input="form.dutyPhone = form.dutyPhone.replace(/[^\d.]/g, '')"
  const maxLen = rule.max || 6
  const minLen = rule.min || 1
  // 非负浮点数  1~6位整数，最多2位小数
  // const reg = /^\d{1,6}(\.\d{1,2})?$/
  // 不超过两位小数的正浮点数
  // const reg = /^([1-9]\d*(\.\d{1,2})?)|(0\.\d{1,2})$/
  // 非负整数
  // const reg = /^\d+$/
  // 非正整数
  // const reg = /^(-\d+|(0+))$/

  const reg = new RegExp('^\\d{' + minLen + ',' + maxLen + '}(.[0-9]{1,2})?$')
  if (!value && rule.required) {
    // 此项为必填
    return callback(new Error(`${rule.emptyText}不能为空`))
  }
  // 校验输入项
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请填写不大于' + maxLen + '位数且最多有两位小数的值'))
    }
  }
  return callback()
}

/*
 * @Description: 密码验证
 * @Author: lixiaofeng
 * @Date: 2022-09-20
 */
export function passwordValidator(rule, value, callback) {
  const maxLen = rule.max || 11
  const minLen = rule.min || 6
  // const reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])[a-zA-Z\d!@#$%^&*?]{6,20}/;
  // const tips = '密码需同时包含数字，小字母，大字母，特殊字符'
  const reg = new RegExp(`^(?=.*\\d)(?=.*[a-zA-Z])[\\da-zA-Z~!@#$%^&*]{${minLen},${maxLen}}$`)
  // const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,11}$/
  const tips = '密码需同时包含数字，字母'

  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  if (!reg.test(value)) {
    return callback(new Error(tips))
  }
  return callback()
}

/**
 * @description: 经度校验， 经度最大值是180
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 */
export function longitudeValidator(rule, value, callback) {
  if (!value && rule.required) {
    return callback(new Error('经度不能为空'))
  }
  if (value) {
    const longitude = /^-?((([0]{1}|[1-9]\d?|1[0-7]\d)(\.\d{1,3})?)|180)$/
    const reg = /^[0-9]+.?[0-9]*$/
    if (!reg.test(value)) {
      return callback(new Error('经度只能输入数字'))
    }
    if (!longitude.test(value)) {
      return callback(new Error(`经度3位整数3位小数`))
    }
  }
  return callback()
}
/**
 * @description: 纬度校验， 经度最大值是90
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 */
export function latitudeValidator(rule, value, callback) {
  if (!value && rule.required) {
    return callback(new Error('纬度不能为空'))
  }
  if (value) {
    const latitude = /^-?(([0]{1}|[1-8]\d?(\.\d{1,3})?)|90)$/
    const reg = /^[0-9]+.?[0-9]*$/
    if (!reg.test(value)) {
      return callback(new Error('纬度只能输入数字'))
    }
    if (!latitude.test(value)) {
      return callback(new Error(`纬度2位整数3位小数`))
    }
  }
  return callback()
}


