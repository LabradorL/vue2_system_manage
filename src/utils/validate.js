/*
 * @Author: lixiaofeng
 * @Date: 2022-09-01 15:14:53
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-11-16 14:09:43
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
* @Description: 是否以https、mailto、tel开头
* @Author: lixiaofeng
* @Date: 2022-10-09
*/
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/*
* @Description: 身份证号校验 校验 1800~2099年的身份证号
* @Author: lixiaofeng
* @Date: 2022-09-09
*/
export function idCardValidator(rule, value, callback) {
  // 出生日期在1800~2099年之间
  const IdReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  // 不限制出生年份
  // const reg = /^[1-9]\d{5}\d{4}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if(rule.required) {
     // 此项为必填
    if(!value) {
      return callback(new Error('身份证号不能为空'))
    }else {
      if (!IdReg.test(value)) {
        return callback(new Error('请填写正确的身份证号'))
      }
      return callback()
    }
  }else {
     // 为非必填
    if(value) {
      if (!IdReg.test(value)) {
        return callback(new Error('请填写正确的身份证号'))
      }
      return callback()
    }else {
      return callback()
    }


  }
}

/*
* @Description: 验证手机号
* @Author: lixiaofeng
* @Date: 2022-09-09
*/
export function telphoneValidator(rule, value, callback) {
 const phoneReg = /^1[3,4,5,6,7,8,9]\d{9}$/
 if(rule.required) {
  // 此项为必填
  if(!value) {
    return callback(new Error('手机号不能为空'))
  }else {
    if (!phoneReg.test(value)) {
      return callback(new Error('请填写正确的手机号'))
    }
    return callback()
  }
 }else {
  // 此项为非必填
  if(value) {
    if (!phoneReg.test(value)) {
      return callback(new Error('请填写正确的手机号'))
    }
    return callback()
  }else {
    return callback()
  }
 }
}

/*
* @Description: 验证固话
* @Author: lixiaofeng
* @Date: 2022-09-13
*/
export function fixPhoneValidator(rule, value, callback) {
  const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  if(rule.required) {
   // 此项为必填
   if(!value) {
     return callback(new Error('固定电话不能为空'))
   }else {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的固定电话'))
     }
     return callback()
   }
  }else {
   // 此项为非必填
   if(value) {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的固定电话'))
     }
     return callback()
   }else {
     return callback()
   }
  }
}

/*
* @Description: 手机号+固话的验证
* @Author: lixiaofeng
* @Date: 2022-09-13
*/
export function phoneValidator(rule, value, callback) {
  const reg = /(^([0-9]{3,4}-)?[0-9]{7,8}$)|(^1[3,4,5,6,7,8,9]\d{9}$)/
  if(rule.required) {
   // 此项为必填
   if(!value) {
     return callback(new Error('联系方式不能为空'))
   }else {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的联系方式'))
     }
     return callback()
   }
  }else {
   // 此项为非必填
   if(value) {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的联系方式'))
     }
     return callback()
   }else {
     return callback()
   }
  }
}

/*
* @Description: 快递单号验证（笼统的验证）最少10位，最多20位
* @Author: lixiaofeng
* @Date: 2022-09-13
*/
export function expressNumValidator(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{10,20}$/
  if(rule.required) {
    // 此项为必填
    if(!value) {
      return callback(new Error('快递单号不能为空'))
    }else {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的快递单号'))
    }
    return callback()
    }
  }else {
    // 此项为非必填
    if(value) {
      if (!reg.test(value)) {
        return callback(new Error('请填写正确的快递单号'))
      }
      return callback()
    }else {
      return callback()
    }
  }
}

/*
* @Description: 邮箱验证
* @Author: lixiaofeng
* @Date: 2022-09-14
*/
export function emailValidator(rule, value, callback) {
  const reg = /^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@([a-zA-z\d]+[-.])+[a-zA-Z\d]{2,4}$/
  // const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if(rule.required) {
    // 此项为必填
    if(!value) {
      return callback(new Error('邮箱不能为空'))
    }else {
    if (!reg.test(value)) {
      return callback(new Error('请填写正确的邮箱'))
    }
    return callback()
    }
  }else {
    // 此项为非必填
    if(value) {
      if (!reg.test(value)) {
        return callback(new Error('请填写正确的邮箱'))
      }
      return callback()
    }else {
      return callback()
    }
  }
}

/*
* @Description: 统一社会信用代码验证
* @Author: lixiaofeng
* @Date: 2022-09-14
*/
export function creditCodeValidator(rule, value, callback) {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
  if(rule.required) {
   // 此项为必填
   if(!value) {
     return callback(new Error('社会信用代码不能为空'))
   }else {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的社会信用代码'))
     }
     return callback()
   }
  }else {
   // 此项为非必填
   if(value) {
     if (!reg.test(value)) {
       return callback(new Error('请填写正确的社会信用代码'))
     }
     return callback()
   }else {
     return callback()
   }
  }
}

/*
* @Description: 不能输入汉字
* @Author: lixiaofeng
* @Date: 2022-09-14
*/
export function isChineseValidator(rule, value, callback) {
  const reg = /^[^\u4e00-\u9fa5]+$/
  if(rule.required) {
   // 此项为必填
   if(!value) {
     return callback(new Error('编号不能为空'))
   }else {
     if (!reg.test(value)) {
       return callback(new Error('不能输入汉字'))
     }
     return callback()
   }
  }else {
   // 此项为非必填
   if(value) {
     if (!reg.test(value)) {
       return callback(new Error('不能输入汉字'))
     }
     return callback()
   }else {
     return callback()
   }
  }
}

/*
* @Description: n位整数，m位小数小数验证
* @Author: lixiaofeng
* @Date: 2022-09-15
*/
export function numLenValidator(rule, value, callback) {
  console.log(rule)
  const maxLen = rule.max || '6'
  const minLen = rule.min || '1'
  // 非负浮点数  1~6位整数，最多2位小数
  // const reg = /^\d{1,6}(\.\d{1,2})?$/
  // 非负整数
  // const reg = /^\d+$/
  // 非正整数
  // const reg = /^(-\d+|(0+))$/

  const reg = new RegExp('^\\d{' + minLen + ',' + maxLen + '}(\.[0-9]{1,2})?$')
  console.log(reg)
  if(rule.required) {
   // 此项为必填
   if(!value) {
     return callback(new Error('XXX不能为空'))
   }else {
     if (!reg.test(value)) {
       return callback(new Error('请填写不大于' + maxLen + '位数且最多有两位小数的值'))
     }
     return callback()
   }
  }else {
   // 此项为非必填
   if(value) {
     if (!reg.test(value)) {
       return callback(new Error('请填写不大于6位数且最多有两位小数的值'))
     }
     return callback()
   }else {
     return callback()
   }
  }
}

/*
* @Description: 密码验证
* @Author: lixiaofeng
* @Date: 2022-09-20
*/
export function passwordValidator(rule, value, callback) {
  // const reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])[a-zA-Z\d!@#$%^&*?]{6,20}/;
  // const tips = '密码需同时包含数字，小字母，大字母，特殊字符'
  const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,11}$/;
  const tips = '密码需同时包含数字，字母'
  if(!value) {
    return callback(new Error('密码不能为空'))
  }else {
    if (!reg.test(value)) {
      return callback(new Error(tips))
    }
    return callback()
  }
}
