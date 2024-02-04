<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-11 18:20:24
 * @LastEditTime: 2023-10-31 14:56:17
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 设计稿为 1920 * 979，这是公共的头部
-->
<template>
  <div class="page-overflow-hidden">
    <div id="remContainer" class="echars-page-wrapper">
      <!-- 头部样式 -->
      <header class="echars-header-box">
        <div class="header-left-box">
          <el-dropdown trigger="click" @command="echartsChange">
            <el-input
              v-model="selectEchartName"
              class="placeholder"
              size="small"
              placeholder="请选择"
              suffix-icon="el-icon-arrow-down"
              readonly
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in navList" :key="item.id" :command="item">
                  {{
                    item.label
                  }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="header-title">{{ title }}</div>
        <div class="header-right-box">
          <div class="date-box">{{ currentDate }}</div>
          <div class="week-box">星期{{ currentWeek }}</div>
        </div>
      </header>
      <div class="split-header-section" />
      <section class="echars-content">
        <!-- <div class="nav-box">
        <div class="nav-list">
          <div v-for="item in navList" :key="item.url" class="nav-item">{{ item.label }}</div>
        </div>
      </div>-->
        <slot />

      </section>
    </div>
  </div>

</template>

<script>
import '../../style/common.scss'
import { initRem } from '@/utils/common'
export default {
  // 组件名称
  name: 'EchartsHeader',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    // 头部的标题
    title: {
      type: String,
      default: ''
    }

  },
  // 组件状态值
  data() {
    return {
      // 当前日期
      currentDate: '',
      // 当前星期
      currentWeek: '',
      selectEchartName: '合集',
      navList: [{
        label: '饼图合集',
        url: '/all-people-can-browse-pie',
        id: '1'
      }, {
        label: '柱状图合集',
        url: '/all-people-can-browse-bar',
        id: '2'
      }, {
        label: '折线图合集',
        url: '/all-people-can-browse-line',
        id: '3'
      }, {
        label: '关系图合集',
        url: '/all-people-can-browse-graph',
        id: '4'
      }],
      routeMap: {
        '/all-people-can-browse-line': '折线图合集',
        '/all-people-can-browse-bar': '柱状图合集',
        '/all-people-can-browse-pie': '饼图合集',
        '/all-people-can-browse-graph': '关系图合集'
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    this.currentDate = this.parseTimeMethod()
    this.currentWeek = this.parseTimeMethod(new Date(), '{a}')
  },
  mounted() {
    initRem()
    this.selectEchartName = this.routeMap[this.$route.path]
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    // 时间处理
    parseTimeMethod(date, pattern) {
      date = date || new Date()
      const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length && value < 10) {
          value = '0' + value
        }
        return value
      })
      return time_str
    },
    // 图表类型发生变化
    echartsChange(item) {
      this.selectEchartName = item.label
      this.$router.push(item.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-overflow-hidden {
  width: 100%;
  // 设计稿的高度
  // height: 1010px;
  height: 100%;
  position: relative;
  bottom: 0;
  z-index: 3;
  background: rgba(0, 71, 89, 1);
  color: #ffffff;
  overflow: hidden;
}
.echars-page-wrapper {
  width: 100%;
  // 设计稿的高度
  // height: 1010px;
  height: 100%;
  // min-height: 1010px;
  position: relative;
  bottom: 0;
  z-index: 3;
  background: rgba(0, 71, 89, 1);
  color: #ffffff;
  // background: url("../images/bg1.png") no-repeat;
  // background-position: left top;
  .echars-header-box {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    .header-left-box {
      position: absolute;
      left: 20px;
      top: 14px;
      width: 120px;
      height: 32px;
      background: #23c7f5;
    }
    .header-title {
      height: 60px;
      line-height: 90px;
      font-size: 35px;
      font-weight: 600;
      color: #23c7f5;
    }
    .header-right-box {
      position: absolute;
      right: 20px;
      top: 14px;
      line-height: 32px;
      font-size: 20px;
      font-weight: 400;
      color: #fff;
      // font-family: '';
      display: flex;
      align-items: center;
      .week-box {
        margin-left: 20px;
      }
    }
  }
  // 分割线
  .split-header-section {
    position: relative;
    height: 28px;
    width: 100%;
    background: url(../../images/split_line.png) no-repeat;
    background-size: 100% 100%;
    z-index: 4;
  }

  // 图表显示部分
  .echars-content {
    width: 100%;
    height: calc(100% - 60px - 28px);
    position: relative;
    .nav-box {
      position: absolute;
      left: 510px;
      right: 510px;
      .nav-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100px;
        .nav-item {
          width: 100px;
          line-height: 50px;
          font-size: 18px;
        }
      }
    }
  }
}

::v-deep .el-dropdown {
  border: 1px solid #51f4f3;
  background: rgba(0, 71, 89, 1);
  color: #fff;
}
.el-dropdown-menu {
  background: rgba(0, 71, 89, 1);
  border: 1px solid #51f4f3;
  .el-dropdown-menu__item {
    color: #fff;
    &:hover {
      background: transparent;
      color: #51f4f3;
    }
  }
  .popper__arrow {
    border-bottom-color: #51f4f3;
  }
  .popper__arrow::after {
    border-bottom-color: #51f4f3;
  }
}
::v-deep .el-input {
  .el-input__inner {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #51f4f3;
    font-size: 14px;
  }
  .el-input__suffix-inner {
    color: #51f4f3;
  }
}

</style>
<style>
.placeholder input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #51f4f3;
}
</style>
