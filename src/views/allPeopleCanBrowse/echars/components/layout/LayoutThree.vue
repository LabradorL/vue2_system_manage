<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-27 09:39:28
 * @LastEditTime: 2023-10-27 17:47:09
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description:
-->
<template>
  <!-- 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构 -->
  <div class="page-common">
    <div class="left-right-layout-box">
      <div class="module-box-left">
        <div class="left-item mb-20">
          <div class="module-box bg-module">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="left-item mb-20">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="left-item">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="right-layout">
        <div class="right-box">
          <div class="right-box-top">
            <div class="right-box-top-left">
              <div class="middle-box">
                <div class="cout-box">
                  <MiddleEchartThree />
                </div>
                <div class="vistited-box">
                  <div class="module-box module-outline-style">
                    <div class="module-title">饼图合集</div>
                    <div class="echarts-box" />
                  </div>
                </div>
              </div>
            </div>
            <div class="right-box-top-right">
              <div class="module-box module-outline-style">
                <div class="module-title">饼图合集</div>
                <div class="echarts-box" />
              </div>
            </div>
          </div>
          <div class="right-box-bottom">
            <div class="module-box module-outline-style">
              <div class="module-title">饼图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiddleEchartThree from '../middle/MiddleEchartThree.vue'
export default {
  // 组件名称
  name: 'LayoutThree',
  // 局部注册的组件
  components: { MiddleEchartThree },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {}
}
</script>

<style lang="scss" scoped>
.left-right-layout-box {
  display: flex;
  height: 100%;
  .left-item {
    height: 31.5%;
  }
  .right-layout {
    width: 74.47%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    .right-box {
      width: 100%;
      height: 100%;
      .right-box-top {
        height: 63.2%;
        display: flex;
        .right-box-top-left {
          width: 100%;
          height: 100%;
          padding-right: 20px;
          box-sizing: border-box;
          .middle-box {
            width: 100%;
            height: 100%;
            .cout-box {
              height: 45%;
            }
            .vistited-box {
              width: 100%;
              height: 55%;
            }
          }
        }
        .right-box-top-right {
          width: 33.8%;
          height: 100%;
        }
      }
      .right-box-bottom {
        margin-top: 20px;
        height: 33.5%;
      }
    }
  }
}
</style>
