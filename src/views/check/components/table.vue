<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-10 16:56:35
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-11-15 18:01:42
 * @Description: 表格格式的查看
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
    <slot name="search" />
    <el-table v-loading="loading" :data="tableData" height="65vh">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column
        prop="longText"
        label="文字"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="time" label="时间" align="center">
        <template slot-scope="scope">
          {{ parseTime(scope.row.time, '{y}-{m}-{d} {h}:{i}:{s}') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" />
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :background="true"
        :layout="layout"
        :page-size="params.pageSize"
        :current-page="params.pageNum"
        :total="total"
        @size-change="getList"
        @current-change="getList"
      />
    </div>
    <div slot="footer" class="text-center">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'TableCheck',
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
      default: '600px'
    }
  },
  // 组件状态值
  data() {
    return {
      // 加载中
      loading: true,
      // 表格数据
      tableData: [],
      params: {
        pageSize: 10,
        pageNum: 1
      },
      // 总条数
      total: 0,
      // 分页的布局
      layout: 'total, sizes, prev, pager, next, jumper'
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
      this.$emit('close', 'tableCheckFlag')
    },
    // 获取表格数据
    getList() {
      this.loading = true
      // 获取信息
      getTableList(this.params).then((res) => {
        this.tableData = res.rows || []
        this.total = res.total || 0
        this.loading = false
      })
    },
    // 每页的条数发生改变
    handleSizeChange(pagesize) {
      this.params.pageSize = pagesize
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table::before {
  // height: 0;
  background: transparent;
}
</style>
