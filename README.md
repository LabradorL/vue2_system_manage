# manage_vue

## Project setup 项目克隆结束执行下面命令下载插件
```
npm install
```

### Compiles and hot-reloads for development 插件下载结束执行下面函数进行开发的启动
```
npm run serve
```

### Compiles and minifies for production 为生成打包执行以下命令
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 文件的前缀需要前端拼接
```
1 在store ——> modules ——> app.js中添加获取文件地址的函数
2 把和main同级的permission.js中获取文件地址的代码放开
```

### utils下的common.js的常用函数
```
  1 时间处理函数  parseTime
  2 倒计时间 | 隔天数  countDown
  3 到目前为止过了多长时间(评论)  commentTime
  4 获取地址栏?后的参数  getQueryObject
  5 计算字符串的字节长度  byteLength
  6 深拷贝(函数 null undefined等)  deepClone
  7 将对象格式的数据转为以&连接的字符串  tansParams
  8 将英文字符串的首字母大写  titleCase
  9 将以_连接的字符串转为驼峰写法  camelCase
  10 开始结束时间添加时分秒  changeDateFormat
  11 根据字典数组返回对应的文字描述  selectDictLabel
  12 根据字典数组返回字符串对应的文字描述  selectDictLabels
  13 将一些值转为空  praseStrEmpty
  14 将扁平化数据构造成树形结构数据  handleTree
  15 将树形结构的数据扁平化  ArrayFlattening
  16 将树形结构的数据按层级展示  arrayLevelHandle
  17 文件下载  fileDownload
  18 数字转为汉字格式 toChineseBig
  19 数字以千位符分割 numFormat
  20 保留n位小数 numToFixed
  21 手机号中间四位展示* filterPhoneNumber
  22 将数组对象中相同Key的数据值进行相加 sameKeyDataAdd
  23 将数组对象中相同Key的数据值push到一个数组中 sameKeyDataPush
  24 对表单进行重置、清除校验 resetForm 
  25 对表单的某一项进行校验 validateField 
  26 将对象彻底冻结 constantize
  27 同年显示月日，不同年显示年月日 publishDate
  28 获取当前日期的前n天 getBeforeDate
  29 判断引用数据的类型 judgeDataType
  30 根据源对象的数据进行合并对象 mergeObj
  31 判断两个对象的属性值是否相等 isObjectEqual
  ```

  ### utils下的validate.js的常用函数
```
  1 是否以https、mailto、tel开头  isExternal
  2 身份证号校验  idCardValidator
  3 验证手机号  telphoneValidator
  4 验证固话  fixPhoneValidator
  5 手机号+固话的验证  phoneValidator
  6 快递单号验证（笼统的验证）最少10位，最多20位  expressNumValidator
  7 邮箱验证  emailValidator
  8 统一社会信用代码验证  creditCodeValidator
  9 组织机构代码验证  organizingCodeValidator
  10 不能输入汉字  isChineseValidator
  11 输入指定长度的汉字  chineseLenValidator
  12 n位整数，m位小数小数验证  numLenValidator
  13 密码验证  passwordValidator

  ```

  ### 各功能用到的插件
  ···
    1. qrcodejs2 生成二维码
    2. 
  ···
