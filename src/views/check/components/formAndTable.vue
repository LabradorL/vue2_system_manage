<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :width="dialogWidth"
    append-to-body
    :close-on-click-modal="false"
    custom-class="form-table-dialog"
    :before-close="close"
    :fullscreen="isFull"
  >
    <el-form
      ref="confirmForm"
      :model="form"
      :rules="rules"
      :inline-message="true"
      label-width="0"
      class="table-form"
    >
      <el-table
        :data="form.list"
        style="width: 100%"
        border
        :header-cell-style="{ textAlign: 'center' }"
        header-row-class-name="custom-table-header-style"
        :row-class-name="rowClassName"
        :height="'65vh'"
      >
        <el-table-column prop="time" label="应缴日期" min-width="155">
          <template slot="header">
            <span class="required">*</span>
            <span>应缴日期</span>
          </template>
          <template slot-scope="scope">
            <template
              v-if="dialogType === 'confirm' && scope.row.status !== '3'"
            >
              <el-form-item
                :prop="'list.' + scope.$index + '.time'"
                label-width="0px"
                :rules="rules.time"
              >
                <el-date-picker
                  v-model="scope.row.time"
                  type="date"
                  placeholder="请选择应缴日期"
                  :clearable="false"
                  style="width: 100%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </template>
            <template v-else>
              {{ parseTime(scope.row.time) || '--' }}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="曲目名称" min-width="155">
          <template slot="header">
            <span class="required">*</span>
            <span>曲目名称</span>
          </template>
          <template slot-scope="scope">
            <template
              v-if="dialogType === 'confirm' && scope.row.status !== '3'"
            >
              <el-form-item
                :prop="'list.' + scope.$index + '.shortText'"
                label-width="0px"
                :rules="rules.shortText"
              >
                <el-input
                  v-model="scope.row.shortText"
                  placeholder="请输入曲目名称"
                />
              </el-form-item>
            </template>
            <template v-else>{{ scope.row.shortText || '--' }}</template>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" min-width="155">
          <template slot="header">
            <span class="required">*</span>
            <span>姓名</span>
          </template>
          <template slot-scope="scope">
            <template
              v-if="dialogType === 'confirm' && scope.row.status !== '3'"
            >
              <el-form-item
                :prop="'list.' + scope.$index + '.username'"
                label-width="0px"
                :rules="rules.username"
              >
                <el-input
                  v-model="scope.row.username"
                  placeholder="请输入姓名"
                />
              </el-form-item>
            </template>
            <template v-else>{{ scope.row.username || '--' }}</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="sexFormatter"
          min-width="90"
        />
        <!-- 确认明细且非正常退租时显示 -->
        <template v-if="dialogType === 'confirm' && !isRecedeFrom">
          <el-table-column
            prop="age"
            label="年龄"
            align="center"
            min-width="155"
          />
          <el-table-column prop="profession" label="职业" min-width="160">
            <template slot-scope="scope">
              <template
                v-if="dialogType === 'confirm' && scope.row.status !== '3'"
              >
                <el-form-item
                  :prop="'list.' + scope.$index + '.profession'"
                  label-width="0px"
                  :rules="rules.profession"
                >
                  <el-input
                    v-model="scope.row.profession"
                    placeholder="请输入职业"
                  />
                </el-form-item>
              </template>
              <template v-else>{{ scope.row.profession || '--' }}</template>
            </template>
          </el-table-column>
          <el-table-column prop="hobby" label="爱好" min-width="160">
            <template slot-scope="scope">
              <template
                v-if="dialogType === 'confirm' && scope.row.status !== '3'"
              >
                <el-form-item
                  :prop="'list.' + scope.$index + '.hobby'"
                  label-width="0px"
                  :rules="rules.hobby"
                >
                  <el-input
                    v-model="scope.row.hobby"
                    placeholder="请输入爱好"
                  />
                </el-form-item>
              </template>
              <template v-else>{{ scope.row.hobby || '--' }}</template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'FormAndTable',
  // 局部注册的组件
  components: {},
  props: {
    // 是否显示对话框
    show: {
      type: Boolean,
      default: false
    },
    // 唯一标识,根据id获取信息
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
      default: '查看'
    },
    // 对话框的宽度
    dialogWidth: {
      type: String,
      default: '70%'
    },
    dialogType: {
      type: String,
      default: 'confirm'
    }
  },
  // 组件状态值
  data() {
    return {
      // 确认明细信息
      form: {
        list: [],
        leaseCompanyName: null,
        contractNumber: null
      },
      // 表单规则
      rules: {
        time: [
          { required: true, message: '请选择缴应缴日期', trigger: 'change' }
        ],
        shortText: [
          { required: true, message: '请输入曲目名称', trigger: 'blur' }
          // {
          //   pattern: /^(\-|\+)?\d{1,}(\.[0-9]{1,2})?$/,
          //   message: '最多可输入两位小数'
          // }
        ],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [
          {
            required: !this.isRecedeFrom,
            message: '请输入年龄',
            trigger: 'blur'
          },
          {
            pattern: /^(\-|\+)?\d{1,}$/,
            message: '请输入整数'
          }
        ],
        profession: [
          {
            required: !this.isRecedeFrom,
            message: '请输入职业',
            trigger: 'blur'
          }
        ]
      },
      // 是否正常退租
      isRecedeFrom: false,
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
        this.getList()
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法
  methods: {
    // 关闭对话框
    close() {
      this.$emit('close', 'formAndTableFlag')
    },
    // 获取表格数据
    getList() {
      this.$modal.loading('加载中')
      // 获取信息
      getTableList(this.params).then((res) => {
        this.form.list = res.rows || []
        this.$modal.closeLoading()
      })
    },
    // 性别字典转化
    sexFormatter(row) {
      if (row.sex) {
        return this.selectDictLabel(this.sexOptions, row.sex)
      }
      return '--'
    },
    // 提交数据
    submit() {
      this.$refs['confirmForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          // return
          this.$modal.msgSuccess('确认成功')
          this.$emit('close', 'formAndTableFlag', true)
        }
      })
    },
    // 列表单元格样式
    rowClassName(row) {
      // 状态为3时有类名 readoney
      if (row.row.status === '3') {
        return 'readonly'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .form-table-dialog {
  .el-dialog__body {
    .el-form {
      color: red;
      .el-form-item {
        margin-bottom: 0;
        .el-input__inner {
          // padding-right:8px;
          text-align: center;
        }
      }
      .el-input__prefix {
        display: block;
      }
      .readonly {
        .el-input__inner {
          border: none;
          text-align: center;
          padding: 8px;
        }
        .el-input__prefix {
          display: none;
        }
      }
      .el-input.is-disabled .el-input__inner {
        background: #fff;
        color: #606266;
      }
    }
    .el-table {
      .el-table__cell {
        padding: 5px 0;
        text-align: center;
      }
      .readonly {
        background: #f5f7fa;
        color: #333;
        .el-table__cell {
          padding: 10px;
        }
      }
      .required {
        color: #ff4949;
        margin-right: 4px;
      }
    }
  }
}
</style>
