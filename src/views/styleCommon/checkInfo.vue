<template>
  <div class="app-container">
    <div class="flex">
      <!-- 左侧宽度固定，描述不超过标题 -->
      <ul class="module-box">
        <li v-for="item in dataList" :key="item.title" class="info-desc-item">
          <label class="info-title">{{ item.title }}：</label>
          <p class="info-content">{{ item.content }}</p>
        </li>
      </ul>
      <!-- 左侧宽度不固定，描述不超过标题 -->
      <ul class="left-width-unfixed-box ml-20">
        <li v-for="item in dataList" :key="item.title" class="info-desc-item">
          <label class="info-title">{{ item.title }}：</label>
          <!-- <p class="info-content" :style="{marginLeft: (item.title.length + 1) + 'rem'}">{{ item.content }}</p> -->
          <p class="info-content">{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  // 组件名称
  name: 'CheckInfo',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      dataList: [
        { title: '氓', content: '诗经·国风·卫风〔先秦〕' },
        { title: '氓之蚩蚩', content: '那个人老实忠厚，怀抱布匹来换丝。其实不是真的来换丝，是找个机会谈婚事。送郎君渡过淇水，一直送到顿丘。并非我要拖延约定的婚期而不肯嫁，是因为你没有找好媒人。请郎君不要生气，秋天到了来迎娶。' },
        { title: '乘彼垝垣', content: '登上那倒塌的墙壁，遥向复关凝神望。复关没有见到盼望的人，眼泪簌簌掉下来。情郎即从复关来，又说又笑喜洋洋。你用龟板占卜，用蓍草占卦，卜筮的结果没有不吉利。你用车来迎娶，我带上嫁妆嫁给你。' },
        { title: '桑之未落', content: '' },
        { title: '桑之落矣', content: '桑树落叶的时候，它的叶子枯黄，纷纷掉落了。自从嫁到你家，多年来忍受贫苦的生活。淇水波涛滚滚，水花打湿了车上的布幔。我女子没有什么差错，男子行为却前后不一致了。男人的爱情没有定准，他的感情一变再变。' }
      ]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() { },

  // 被 keep-alive 缓存的组件激活（显示）时调用。
  activated() { },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() { },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {}
}
</script>

<style lang="scss" scoped>
// 左侧宽度固定，右侧描述不超过小标题
.module-box {
  width: 500px;
  .info-desc-item {
    line-height: 24px;
    font-size: 16px;
    overflow: hidden;
    .info-title {
      float: left;
      width: 80px;
      text-align: right;
      font-weight: 600;
    }
    .info-content {
      margin-left: 80px;
    }
  }
}
// 左侧宽度不固定，右侧描述直接换行
.left-width-unfixed-box {
  width: 500px;
  .info-desc-item {
    line-height: 24px;
    font-size: 16px;
    overflow: hidden;
    .info-title {
      float: left;
      // width: 120px;
      text-align: right;
      font-weight: 600;
    }
    .info-content {
      // margin-left: 120px;
    }
  }
}
</style>
