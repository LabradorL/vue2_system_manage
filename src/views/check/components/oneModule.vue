<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-10 16:58:23
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-12-05 15:17:50
 * @Description:单个模块查看
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
    <el-descriptions
      title="基本信息审核"
      :column="1"
      border
      label-class-name="labelClassName"
      content-class-name="contentClassName"
    >
      <template slot="extra">
        <div class="extra">
          <el-button type="primary">自定义头部信息1</el-button>
          <el-button type="primary">自定义头部信息2</el-button>
        </div>
      </template>
      <el-descriptions-item label="企业名称">
        {{ infoData.companyName || '--' }}
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

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getObjData } from '@/api/test'
export default {
  // 组件名称
  name: 'OneModule',
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
      default: '40%'
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
      this.$emit('close', 'oneModulesFlag')
    },
    // 获取表格数据
    getList() {
      this.$modal.loading('加载中')
      // 获取信息
      getObjData(this.params).then((res) => {
        this.infoData = res.data || {}
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
      background: #f7f8fa;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      margin-bottom: 0;
    }
    .labelClassName {
      width: 170px;
      text-align: right;
      padding-right: 15px;
      background-color: #ddefff;
      font-weight: 400;
      color: #333;
      border: 1px solid #b7dcfe;
    }
    .contentClassName {
      font-weight: 400;
      color: #333;
      background-color: #f6faff;
      padding-left: 14px;
      border: 1px solid #b7dcfe;
    }
  }
}
</style>
