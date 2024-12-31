<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-15 17:25:07
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-12-31 16:37:39
 * @Description: 只有一列的表单数据 添加的数据量较少
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :width="dialogWidth"
    append-to-body
    :close-on-click-modal="false"
    :before-close="close"
    :fullscreen="isFull"
  >
    <el-form
      ref="form"
      :model="form"
      :inline-message="false"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="username">
        <span slot="label">
          <el-tooltip content="姓名的长度不能超过20个字符" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          姓名
        </span>
        <el-input v-model="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="form.sex"
          placeholder="请选择性别"
          class="percent100"
        >
          <el-option
            v-for="item in sexOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model="form.age"
          placeholder="请输入年龄"
          class="custom-style"
        >
          <span slot="append">岁</span>
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input
          v-model="form.idCard"
          placeholder="请输入身份证号"
          class="custom-style"
        />
      </el-form-item>
      <el-form-item label="文本内容" prop="longText">
        <el-input
          v-model="form.longText"
          type="textarea"
          resize="none"
          :autosize="{ minRow: 5, maxRow: 10 }"
          placeholder="请输入文本内容"
          maxlength="1000"
          minlength="1"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="时间要求" prop="timeArr">
        <el-date-picker
          v-model="form.timeArr"
          value-format="yyyy-MM-dd"
          :picker-options="expireTimeOption"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="percent100"
        />
      </el-form-item>
      <el-form-item label="循环周期" prop="cycle">
        <el-input v-model.number="form.age" placeholder="请输入循环周期">
          <template slot="append">天</template>
          <template slot="prepend">每</template>
        </el-input>
      </el-form-item>
      <el-form-item label="文件列表" prop="fileList">
        <file-upload :value="form.fileList" :limit="2" @fileChange="getFile" />
      </el-form-item>
      <el-form-item label="图片列表" prop="imgList">
        <image-upload :value="form.imgList" :limit="2" @imgChange="getImg" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确认</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getObjData } from '@/api/test'
import { chineseLenValidator, idCardValidator } from '@/utils/validate.js'
export default {
  // 组件名称
  name: 'OneColumn',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    // 是否显示对话框
    show: {
      type: Boolean,
      default: false
    },
    // // 唯一标识,根据id获取信息
    id: {
      type: [Number, String],
      default: ''
    },
    // dialog 是否全屏
    isFull: {
      type: Boolean,
      default: false
    },
    // 头部的标题
    title: {
      type: String,
      default: '添加XXXX信息'
    },
    // 对话框的宽度
    dialogWidth: {
      type: String,
      default: '30%'
    }
  },
  // 组件状态值
  data() {
    return {
      // 表单参数
      form: {
        age: '',
        sex: '',
        cycle: '',
        fileList: [],
        imgList: []
      },
      // 表单规则
      rules: {
        username: [
          // { required: true, message: '请输入姓名', trigger: 'blur' },
          { required: true, validator: chineseLenValidator, min: 2, max: 20, emptyText: '姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, validator: idCardValidator, emptyText: '身份证号', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        longText: [
          { required: true, message: '请输入文本内容', trigger: 'blur' }
        ],
        age: [
          {
            required: true,
            message: '请输入循环周期',
            trigger: 'blur'
          },
          {
            pattern: /^\d+$/,
            message: '循环周期必须为非负整数',
            trigger: 'blur'
          }
        ],
        timeArr: [{ required: true, message: '请选择时间', trigger: 'change' }]
      },
      choiceDate: '', // 点击选择的日期
      // 设置可选的时间
      expireTimeOption: {
        onPick: ({ maxDate, minDate }) => {
          // 把选择的第一个日期赋值给一个变量。
          this.choiceDate = minDate.getTime()
          // 如何你选择了两个日期了，就把那个变量置空
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          const today = new Date(new Date().setHours(0, 0, 0, 0))
          // 7天的时间戳
          const oneDay = 1 * 24 * 3600 * 1000
          const sixDay = 6 * 24 * 3600 * 1000
          if (this.choiceDate) {
            // 可选择点击日期 前后七天的日期
            // 当前日期 - one = 7天之前
            const minTime = this.choiceDate - sixDay
            // 当前日期 + one = 7天之后
            const maxTime = this.choiceDate + sixDay
            return time.getTime() < minTime || time.getTime() > maxTime || time.getTime() > today.getTime()
          }
          // 只能选择今天之前的日期
          return time.getTime() > today.getTime() - oneDay
        }
      },
      // 性别字典
      sexOptions: [
        { dictValue: '1', dictLabel: '男' },
        { dictValue: '2', dictLabel: '女' }
      ]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    id: {
      handler(val) {
        this.getInfo()
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  // 组件方法
  methods: {
    /** 查询XXXX信息 */
    getInfo() {
      this.$modal.loading('加载中')
      getObjData(this.id).then((response) => {
        this.form = { ...response.data, ...this.form } || null
        console.log(this.form)
        this.$modal.closeLoading()
      })
    },
    /** 关闭对话框 */
    close() {
      this.resetForm('form', true)
      console.log(this.form)
      this.$emit('close', 'oneColumn')
      console.log('关闭页面')
    },
    // 获取上传的文件
    getFile(fileList) {
      console.log(fileList)
      // this.$refs['form'].validateField('fileList')
    },
    // 获取上传的图片
    getImg(imgList) {
      this.$refs['form'].validateField('imgList')
    },
    /** 提交数据 */
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.form)
          getObjData(this.form).then((res) => {
            this.$modal.msgSuccess('提交成功')
            this.resetForm('form', true)
            this.$emit('close', 'oneColumn', true)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
