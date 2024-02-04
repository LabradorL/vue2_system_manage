<template>
  <section class="cube-box">
    <div class="item-face front">前面</div>
    <div class="item-face right-side">右面</div>
    <div class="item-face behind">后面</div>
    <div class="item-face left-side">左面</div>
    <div class="item-face below">下面</div>
    <div class="item-face above">上面</div>
  </section>
</template>

<script>
export default {
  // 组件名称
  name: 'Cube',
  // 局部注册的组件
  components: {},
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
  created() { },
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
body {
  perspective: 1000px;
}
.cube-box {
  position: relative;
  // width: 300px;
  // height: 300px;
  width: 50px;
  height: 50px;
  // margin: 100px auto;
  /* transition: all 10s; */
  transform-style: preserve-3d;
  /* transform: rotate3d(1, 1, 0, 45deg); */
  animation: move 5s linear infinite alternate;
}
/*section:hover {
  transform: rotate3d(1, 1, 0, 360deg);
}*/

.item-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  // line-height: 300px;
  line-height: 50px;
  background-color: purple;
}

.front {
  z-index: 2;
  // transform: rotate(0deg) translateZ(150px);
  transform: rotate(0deg) translateZ(25px);
}

.right-side {
  background-color: blue;
  // transform: rotateY(90deg) translateZ(150px);
  transform: rotateY(90deg) translateZ(25px);
}

.behind {
  background-color: red;
  // transform: rotateY(180deg) translateZ(150px);
  transform: rotateY(180deg) translateZ(25px);
}

.left-side {
  background-color: yellow;
  // transform: rotateY(270deg) translateZ(150px);
  transform: rotateY(270deg) translateZ(25px);
}

.below {
  background-color: green;
  // transform: rotateX(-90deg) translateZ(150px);
  transform: rotateX(-90deg) translateZ(25px);
}

.above {
  background-color: orange;
  // transform: rotateX(90deg) translateZ(150px);
  transform: rotateX(90deg) translateZ(25px);
}

@keyframes move {
  0% {
    transform: rotate3d(1, 1, 0, 45deg);
  }
  100% {
    transform: rotate3d(1, 1, 0, 360deg);
  }
}
</style>
