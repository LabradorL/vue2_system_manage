<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-10 16:58:23
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-11-15 18:32:02
 * @Description:循环查看
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
    <div class="record-content">
      <template v-for="(item, index) in recordList">
        <el-descriptions
          :key="item.id + index + ''"
          :title="'第' + (index + 1) + '次记录反馈'"
          :column="1"
          border
          :colon="false"
          label-class-name="labelClassName"
          content-class-name="contentClassName"
        >
          <el-descriptions-item label="完成时间">
            {{ parseTime(item.time) || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="名称">
            {{ item.shortText || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="照片视频">
            {{ item.area || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            {{ item.longText || '--' }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'LoopModule',
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
      recordList: []
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
      this.$emit('close', 'loopFlag')
    },
    // 获取表格数据
    getList() {
      this.$modal.loading('加载中')
      // 获取信息
      getTableList(this.params).then((res) => {
        this.recordList = res.rows || []
        this.$modal.closeLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-descriptions {
    min-width: 500px;
    .el-descriptions__header {
      background: rgba(231, 240, 255, 1);
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      margin-bottom: 0;
      text-align: center;
      .el-descriptions__title {
        width: 100%;
        font-size: 14px;
        color: #333;
        font-weight: normal;
      }
    }
    .labelClassName {
      width: 120px;
      min-width: 100px;
      text-align: right;
      padding-right: 15px;
      // background-color: #ddefff;
      font-weight: 400;
      color: #333;
      // border: 1px solid #b7dcfe;
    }
    .contentClassName {
      min-width: 200px;
      font-weight: 400;
      color: #333;
      // background-color: #f6faff;
      padding-left: 14px;
      // border: 1px solid #b7dcfe;
    }
  }
}
</style>
