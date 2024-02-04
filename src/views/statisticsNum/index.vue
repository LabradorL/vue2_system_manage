<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-14 17:40:46
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2024-01-10 09:32:39
 * @Description: 不用样式的tabs
-->
<template>
  <div :class="'app-container'">
    <div class="statistical-box">
      <statistics-one label="全部订单" :value="704" />
      <statistics-one label="待支付" :value="16" :color="'#FEC03D'" />
      <statistics-one label="待使用" :value="6" :color="'#FFA94C'" />
      <statistics-one label="已完成未退房" :value="2" :color="'#8167F5'" />
      <statistics-one label="已完成" :value="548" :color="'#4BCED0'" />
      <statistics-one label="退款完成" :value="17" :color="'#FB6260'" />
    </div>
  </div>
</template>
<script>
import StatisticsOne from './components/StatisticsOne.vue'
export default {
  // 组件名称
  name: 'StatisticsNum',
  // 局部注册的组件
  components: { StatisticsOne },
  // 组件状态值
  data() {
    return {
      info: {

      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  beforeCreate() {
    console.log('tabs beforeCreate')
  },
  created() {
    console.log('tabs created')
  },
  beforeMount() {
    console.log('tabs beforeMount')
  },
  mounted() {
    console.log('tabs mounted')
  },
  beforeDestroy() {
    console.log('tabs beforeDestroy')
  },
  destroyed() {
    console.log('tabs destroyed')
  },
  // 被 keep-alive 缓存的组件激活（显示）时调用。",
  activated() {
    console.log('tabs activated')
  },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() {
    console.log('tabs deactivated')
  },

  // 方法
  methods: {
    // 切换样式
    switchover(type) {
      this.tabsType = type
    },
    // 是否可以勾选
    isCheck(row, index) {
      console.log(row)
      if (row.status === '3') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.statistical-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
