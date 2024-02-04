<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-10 16:58:23
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2022-12-02 16:14:17
 * @Description:多个模块查看
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
    <div class="text-danger mb-10">
      使用el-row实现,不能多行显示,但每块大小一致
    </div>
    <div class="modules-box">
      <div class="module-item mb-20 border-none">
        <div class="form-header">标题(来访信息)</div>
        <div class="module-content">
          <el-row type="flex">
            <el-col :span="3">访客姓名：</el-col>
            <el-col :span="9">{{ infoData.username || '--' }}</el-col>
            <el-col :span="3">联系电话：</el-col>
            <el-col :span="9">{{ infoData.phone || '--' }}</el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="3">文案内容：</el-col>
            <el-col :span="9">{{ infoData.shortText || '--' }}</el-col>
            <el-col :span="3">预约来访日期：</el-col>
            <el-col :span="9">
              {{ parseTime(infoData.time, '{y}-{m}-{d}') || '--' }}</el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="3">长文案内容：</el-col>
            <el-col :span="9">{{ infoData.longText || '--' }}</el-col>
            <el-col :span="3">详细地址：</el-col>
            <el-col :span="9"> {{ infoData.address || '--' }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="module-item mb-20">
        <div class="form-header">标题(来访信息)</div>
        <div class="module-content bg-blue">
          <el-row type="flex">
            <el-col :span="4">访客姓名</el-col>
            <el-col :span="8">{{ infoData.username || '--' }}</el-col>
            <el-col :span="4">联系电话</el-col>
            <el-col :span="8">{{ infoData.phone || '--' }}</el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="4">文案内容</el-col>
            <el-col :span="8" :title="infoData.longText || '--'">
              {{ infoData.longText || '--' }}
            </el-col>
            <el-col :span="4">预约来访日期</el-col>
            <el-col :span="8">
              {{ parseTime(infoData.time, '{y}-{m}-{d}') || '--' }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="module-item mb-20">
        <div class="form-header">基本信息审核（el-descriptions实现）</div>
        <div class="module-content bg-blue">
          <el-descriptions
            title=""
            :column="2"
            border
            :colon="false"
            label-class-name="labelClassName"
            content-class-name="contentClassName"
          >
            <el-descriptions-item label="企业名称">
              {{ infoData.longText || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="组织机构代码">
              {{ infoData.organCode || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="所属地区">
              {{ infoData.area || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="法定代表人姓名">
              {{ infoData.username || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="法定代表人证件类型">
              {{ infoData.cardType || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="法定代表人证件号码">
              {{ infoData.idCard || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="法定代表人联系电话">
              {{ infoData.phone || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="详细地址">
              {{ infoData.address || '--' }}
            </el-descriptions-item>
            <el-descriptions-item label="多内容">
              {{ infoData.longText || '--' }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getObjData } from '@/api/test'
export default {
  // 组件名称
  name: 'MoreModule',
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
      default: '60%'
    }
  },
  // 组件状态值
  data() {
    return {
      infoData: {}
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
      this.$emit('close', 'moreModulesFlag')
    },
    // 获取表格数据
    getList() {
      this.$modal.loading('加载中')
      // 获取信息
      getObjData(this.params).then((res) => {
        this.infoData = res.data || []
        this.$modal.closeLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modules-box {
  .module-content {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    .el-col {
      text-align: center;
      height: 100%;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 5px;
      line-height: 24px;
    }
    .el-col-4 {
      min-width: 110px;
    }
    .el-col-8 {
      min-width: 130px;
      text-overflow: ellipsis;
    }
  }
  .bg-blue {
    background: rgba(232, 244, 255, 0.8);
  }
  .border-none {
    .module-content {
      border: none;
      .el-col {
        border: none;
        text-align: left;
        white-space: normal;
      }
      .el-col-3 {
        text-align: right;
        min-width: 110px;
      }
      .el-col-9 {
        min-width: 130px;
      }
    }
  }
}

::v-deep .el-dialog {
  .el-descriptions {
    min-width: 500px;
    .el-descriptions__header {
      background: #f7f8fa;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      margin-bottom: 0;
    }
    .labelClassName {
      width: 170px;
      min-width: 170px;
      text-align: right;
      padding-right: 15px;
      background-color: #ddefff;
      font-weight: 400;
      color: #333;
      border: 1px solid #b7dcfe;
    }
    .contentClassName {
      min-width: 200px;
      font-weight: 400;
      color: #333;
      background-color: #f6faff;
      padding-left: 14px;
      border: 1px solid #b7dcfe;
    }
  }
}
</style>
