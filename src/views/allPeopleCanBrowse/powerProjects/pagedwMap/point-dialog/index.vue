<template>
  <comDialog
    :dialogTitle="dialogTitle"
    :dialogVisible="dialogShow"
    @handleClose="handleClose"
  >
    <div class="dialog-box" slot="dialog-body">
      <div class="dialog-left">
        <div class="dialog-left-head">
          <p class="dialog-left-head-name">异常明细</p>
        </div>
        <!-- 左侧内容 -->
        <div class="dialog-left-box">
          <!-- 时间搜索 -->
          <div class="exception-daterange-box">
            <el-date-picker
              @change="getTimeChange"
              class="exception-daterange"
              v-model="nowDate"
              type="daterange"
              align="left"
              :clearable="false"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="timeChange"
            >
            </el-date-picker>
          </div>
          <!-- 异常明细列表 -->
          <div
            class="dialog-left-li"
            v-for="(item, index) in detailList"
            :key="index"
            :class="datailIdx == index ? 'active' : ''"
            @click="detailChange(item, index)"
          >
            <div class="dialog-left-li-head">
              <img
                v-show="datailIdx == index"
                src="../imgs/dialog/icon-detail1.png"
                alt=""
              />
              <img
                v-show="datailIdx != index"
                src="../imgs/dialog/icon-detail2.png"
                alt=""
              />
              <p class="text-overflow" style="width: 100%">{{ item.name }}</p>
            </div>
            <div class="dialog-left-item">
              <span class="dialog-left-item-name">异常类型：</span>
              <div class="dialog-left-item-text">{{ dictFamtter(item.abnormalType) }}</div>
            </div>
            <div class="dialog-left-item">
              <span class="dialog-left-item-name">开始时间：</span>
              <div class="dialog-left-item-text">{{ item.startTime }}</div>
            </div>
            <div class="dialog-left-item">
              <span class="dialog-left-item-name">结束时间：</span>
              <div class="dialog-left-item-text">{{ item.endTime || '-' }}</div>
            </div>
            <!-- <div class="dialog-left-item">
              <span class="dialog-left-item-name">影响用户：</span>
              <div class="dialog-left-item-text1">
                <span>{{ item.userNum }}</span
                >户
              </div>
            </div> -->
          </div>
        </div>
        <!-- 分页 -->
        <div class="detail-pagination-box">
          <com-pagination
            ref="comPagination"
            :currentPage="pagination.pageNum"
            :pageSize="pagination.pageSize"
            :pageSizes="pagination.pageSizes"
            :total="pagination.total"
            :layout="pagination.layout"
            :pagerCount="pagination.pagerCount"
            :prevText="pagination.prevText"
            :nextText="pagination.nextText"
            @page-change="handleCurrentChange"
          ></com-pagination>
        </div>
      </div>
      <!-- 右侧内容区域 -->
      <div class="dialog-right">
        <!-- <div class="dialog-tab">
          <p
            class="dialog-tab-li"
            :class="tabActive == 0 ? 'active' : ''"
            @click="tabClick(0)"
          >
            异常分析
          </p>
          <p
            class="dialog-tab-li"
            :class="tabActive == 1 ? 'active' : ''"
            @click="tabClick(1)"
          >
            历史异常
          </p>
        </div> -->
        <div class="dialog-tab-body">
          <tabOne ref="tabOne"></tabOne>
          <!-- <tabTwo ref="tabTwo" v-show="tabActive == 1"></tabTwo> -->
        </div>
      </div>
    </div>
  </comDialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index.scss";

::v-deep .el-pagination.is-background {
  .el-pager {
    li.number {
      border: 1px solid #21b6ff;
    }
    li:not(.disabled).active {
      background-color: #21b6ff !important;
    }
  }
}
</style>
