<template>
  <div class="app-container line-style-wrapper">
    <div class="flex mb-20 flex-start align-start">
      <!-- 左侧有一个小竖条 -->
      <div class="left-line-box">
        <span class="ml-8">左侧竖条</span>
      </div>
      <!-- 底边有一个小横条 -->
      <div class="bottom-line-box ml-20">
        <span>底部横条</span>
      </div>
      <!-- 外部一圈边框，模块描述在线上 -->
      <div class="line-out-box ml-20">
        <div class="title-desc">描述在线上</div>
        <div class="first-row-indentation">
          首行缩进两个字符是指缩进2个汉字的宽度，可以使用text-indent: 2rem 实现。
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // 组件名称
  name: 'LineStyle',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() { },

  // 被 keep-alive 缓存的组件激活（显示）时调用。
  activated() {},
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() {},
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {}
}
</script>

<style lang="scss" scoped>
.line-style-wrapper {
  line-height: 28px;
  font-size: 16px;
}

// 左侧有一条竖条
.left-line-box {
  position: relative;
  color: #4a4a4a;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  .ml-8 {
    margin-left: 8px;
  }
  &::before {
    content: "";
    width: 6px;
    height: 16px;
    background-color: #f5aa2d;
  }
}

// 底部有横条
.bottom-line-box {
  position: relative;
  color: #000;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  font-weight: 700;
  &::after {
    position: absolute;
    left: 0;
    bottom: -3px;
    content: "";
    width: 100%;
    height: 6px;
    background: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0) 0%,
      #f7931e 100%
    );
  }
}
// 外部一圈边框，模块描述在线上
.line-out-box {
  position: relative;
  width: 300px;
  padding: 14px 10px 10px;
  border: 1px solid rgb(225, 225, 225);
  .title-desc {
    position: absolute;
    display: inline-block;
    top: -14px; //行高的一半
    background-color: white;
    left: 50px;
    font-size: 15px;
    padding: 0 10px;
    font-weight: bold;
    box-sizing: border-box;
  }
}

// 首行缩进
.first-row-indentation {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-indent: 2rem;
}
</style>
