<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-14 17:40:46
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-02-03 15:25:33
 * @Description: 不用样式的tabs
-->
<template>
  <div :class="tabsType === 'line' ? '' : 'app-container'">
    <card-tabs v-show="tabsType === 'card'" />
    <line-tabs v-show="tabsType === 'line'" />
    <btns-tabs v-show="tabsType === 'btns'" />
    <div>
      <el-button type="primary" @click="switchover('card')">第一种</el-button>
      <el-button type="success" @click="switchover('line')">第二种</el-button>
      <el-button type="info" @click="switchover('btns')">第三种</el-button>
    </div>
  </div>
</template>

<script>
import CardTabs from './components/card.vue'
import LineTabs from './components/line.vue'
import BtnsTabs from './components/btns.vue'
export default {
  // 组件名称
  name: 'Tabs',
  // 局部注册的组件
  components: { CardTabs, LineTabs, BtnsTabs },
  // 组件状态值
  data() {
    return {
      tabsType: 'card'
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  beforeCreate(){
    console.log('tabs beforeCreate')
  },
  created() {
    this.tableData = [
      {
        id: '00b9dde3e0e4e0438520353892cd3012',
        time: '2022-11-10 17:24:01',
        text: '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟年？',
        path: '@/assets/images/login-background.jpg',
        status: '3',
        shortText: '岳阳楼记',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765'
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3013',
        time: '2022-11-10 17:24:01',
        text: '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。',
        status: '4',
        path: '@/assets/images/video.mp4',
        shortText: '雨霖铃·寒蝉凄切',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765'
      }
    ]
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
  activated(){
    console.log('tabs activated')
  },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated(){
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

<style lang="scss" scoped></style>
