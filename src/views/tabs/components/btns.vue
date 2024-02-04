<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-15 10:04:43
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-02-03 15:02:11
 * @Description:卡片式的页签 相同的元素创建多次
-->
<template>
  <div class="">
    <el-tabs v-model="tabActive" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      />
    </el-tabs>
    <el-table
      v-loading="loading"
      :data="tableData"
      height="70vh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="55" align="center" label="序号" />
      <el-table-column label="姓名" align="center" prop="username" />
      <el-table-column
        label="性别"
        align="center"
        prop="sex"
        :formatter="sexFormatter"
      />
      <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="职业" align="center" prop="profession" />
      <el-table-column label="录入时间" align="center" prop="time" width="180">
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.time, '{y}-{m}-{d} {h}:{m}:{s}')
          }}</span>
        </template>
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
  name: 'CardTabs',
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
      // 页签列表
      tabList: [
        { title: '即将到期', name: '0' },
        { title: '已到期', name: '1' },
        { title: '履行中', name: '2' },
        { title: '未生效', name: '3' },
        { title: '已失效', name: '4' }
      ],
      // 当前选中的页签
      tabActive: '0',
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
  beforeCreate(){
    console.log('tabs btn beforeCreate')
  },
  created() {
    this.getList()
  },
  beforeMount() {
    console.log('tabs btn beforeMount')
  },
  mounted() {
    console.log('tabs btn mounted')
  },
  beforeDestroy() {
    console.log('tabs btn beforeDestroy')
  },
  destroyed() {
    console.log('tabs btn destroyed')
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
    // 切换页签
    tabClick(e) {
      this.tabActive = e.index
      if (e.index === 0) {
        this.queryParams.userType = null
      }
      if (e.index === 1) {
        this.queryParams.userType = '01'
      }
      if (e.index === 2) {
        this.queryParams.userType = '02'
      }
      this.getList()
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
::v-deep .el-tabs {
  .el-tabs__header {
    .el-tabs__nav {
      .el-tabs__item {
        padding: 0 20px;
        background: #f2f5fa;
        height: 32px;
        margin: 10px;
        line-height: 32px;
        border-radius: 4px;
        text-align: center;
        box-sizing: border-box;
        &:hover {
          background-color: $base-topic-color;
          color: #fff;
        }
      }
      .el-tabs__item.is-active {
        background-color: $base-topic-color;
        color: #fff;
      }
      // 底部的线
      .el-tabs__active-bar {
        display: none;
      }
    }
  }
}
</style>
