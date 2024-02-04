<!--
 * @Author: lixiaofeng
 * @Date: 2023-02-13 22:00:54
 * @LastEditTime: 2023-09-11 15:50:42
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 可以编辑code代码的富文本
-->
<template>
  <div class="app-container">
    <el-button type="text" size="small" @click="addRow()">添加</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column
        prop="username"
        label="姓名"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="shortText"
        label="诗歌名称"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="longText"
        label="内容"
        min-width="300"
        align="left"
      />
      <el-table-column
        prop="phone"
        label="电话"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="profession"
        label="职业"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="time"
        label="时间"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="sex"
        label="性别"
        min-width="80"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <one-column ref="dialogForm" />
  </div>
</template>

<script>
import { getTableList } from '@/api/test'
import OneColumn from './components/dialogForm.vue'
export default {
  // 组件名称
  name: 'CodeEditor',
  // 局部注册的组件
  components: { OneColumn },
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
      // 查询参数
      queryParams: { pageNum: 1, pageSize: 10 }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    getTableList(this.queryParams).then((res) => {
      this.tableData = res.rows || []
    })
  },
  mounted() {
  },
  // 被 keep-alive 缓存的组件激活（显示）时调用。
  activated() {},
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() {},
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {
    handleClick(row) {
      console.log(row)
      row.code = 'let a= 0\nlet b= 10\nlet c = 20\n'
      row.vueCodemirrorCode = 'let a= 0\nlet b= 10\nlet c = 20\n'
      this.$refs.dialogForm.init(row)
    },
    addRow() {
      this.$refs.dialogForm.init()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
