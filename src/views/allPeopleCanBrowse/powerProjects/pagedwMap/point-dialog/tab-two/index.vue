<template>
  <div class="tab-three">
    <div class="tab-three-head">
      <div class="tab-search-left">
        <span class="tab-search-name">停电时间：</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-button size="medium" class="ems-button-search" @click="queryClick()">查询</el-button>
      </div>
      <!-- <p class="dialog-table-head"><img src="@/assets/img/NX/icon-add.png" alt="">导出</p> -->
    </div>
    <div class="tab-three-bottom">
      <eleTable
        ref="eleTable"
        class="tab-three-table"
        :table-data="tableData"
        :columns="tableColumns"
        :is-selection="false"
        :pagination="pagination"
        :emptytext="emptytext"
        @page-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss">

</style>
