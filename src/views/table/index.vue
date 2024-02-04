<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-15 10:04:43
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-11 17:38:51
 * @Description: table 常使用方法
-->
<template>
  <div class>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
      height="80vh"
      :show-summary="true"
      sum-text="合计文字"
      :span-method="mergeRow"
      :summary-method="handleSummary"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100" align="center" :selectable="isCanCheck" />
      <el-table-column prop="shortText" label="诗歌名称" min-width="80" align="center" />
      <el-table-column label="诗歌信息" min-width="240">
        <el-table-column label="作者" prop="username" align="center" />
        <el-table-column label="其他信息">
          <el-table-column label="朝代" prop="dynasty" align="center" />
          <el-table-column label="背景" prop="status" align="center" />
          <el-table-column label="内容" prop="longText" align="center" />
        </el-table-column>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'Table',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表数据
      tableData: [],
      // 总数量
      total: 0,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // id集合
      ids: [],
      // 性别字典
      sexOptions: [
        { dictValue: '1', dictLabel: '男' },
        { dictValue: '2', dictLabel: '女' }
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getList()
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {
    // 获取列表
    getList() {
      getTableList(this.queryParams).then((res) => {
        this.tableData = res.rows || []
        this.total = res.total || 0
        this.loading = false
      })
    },
    // 性别字典转化
    sexFormatter(row) {
      if (row.sex) {
        return this.selectDictLabel(this.sexOptions, row.sex)
      }
      return '--'
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 复选框是否可以勾选
    isCanCheck(row, index) {
      // 状态为3不可选
      if (row.status === '3') {
        return false
      }
      return true
    },
    // 将行合并
    mergeRow({ row, column, rowIndex, columnIndex }) {
      // 需要合并的列 从0开始
      const mergeRow = [0, 1, 2, 3, 4]
      if (rowIndex === 0) {
        if (mergeRow.includes(columnIndex)) {
          return {
            rowspan: row.total, // 需要合并的行数
            colspan: 1
          }
        }
      } else {
        if (row.shortText === this.tableData[rowIndex - 1].shortText) {
          // 若合并项有总数的，应该把总数设置为0，否则合计总数会多
          // 合并的项实际上展示的是需要合并数据的第一条数据
          if (row.status) {
            row.status = 0
          }
          if (mergeRow.includes(columnIndex)) {
            return [0, 0]
          }
        } else {
          if (mergeRow.includes(columnIndex)) {
            return {
              rowspan: row.total,
              colspan: 1
            }
          }
        }
      }
      return [1, 1]
    },
    // 自定义合计方法
    handleSummary({ columns, data }) {
      // console.log(columns);
      const sums = {}
      // 不需要计算合计总数的列(有些列是数字，但不需要合并的)
      const unSummaryCulumds = ['isUnfold']
      columns.forEach((column, index) => {
        const key = column.property
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[key]))
        if (!unSummaryCulumds.includes(key) && !values.every(value => isNaN(value))) {
          // sums[index] = this.arrSummation(values)
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            }
            return prev
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },

    // 数组求和
    arrSummation(arr) {
      const gentle = arr.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        }
        return prev
      }, 0)
      return gentle
    }

  }
}
</script>

<style lang="scss" scoped></style>
