<template>
  <div class="app-container">
    <div class="perspectiver">
      <!-- 3D导航栏 -->
      <three-d-navigation class="mb-30" />
      <!-- 正方体 -->
      <cube-com class="mb-30" />
      <!-- 3D平移 -->
      <div class="three-D-transform-box mb-30">
        <div class="three-D-transform">3D平移</div>
      </div>
      <!-- 两面旋转盒子 -->
      <div class="width100 perspective mb-30">
        <div class="both-face-rotate-box">
          <div class="box-item box1" />
          <div class="box-item box2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ThreeDNavigation from '@/views/styleCommon/components/3DNav.vue'
import CubeCom from '@/views/styleCommon/components/cube.vue'
export default {
  // 组件名称
  name: 'Rotate',
  // 局部注册的组件
  components: { ThreeDNavigation, CubeCom },
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
// 3D平移
.three-D-transform-box {
  /*视距(透视)perspective：设置人和物体之间的距离，这个值要给物体的父元素*/
  perspective: 1000px;
  width: 100px;
  .three-D-transform {
    // width: 200px;
    // height: 200px;
    width: 100px;
    height: 100px;
    background-color: purple;
    margin: 0 auto;
    transition: all 1s;
    transform: translateZ(80px);
    transition: all 2s;
    &:hover {
      /*transform: translateX(100px);*/
      /* transform: translateY(100px); */
      transform: translateZ(-100px);
      /* transform: translateX(100px) translateY(100px) translateZ(100px); */
      /*transform: translate3d(x,y,z);*/
      /* transform: translate3d(100px, 100px, 300px); */
      /* 当x y轴上没有移动时，必须写0，不可省略 */
      /* transform: translate3d(0, 0, 100px); */
    }
  }
}

// 两面旋转盒子
.both-face-rotate-box {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  transition: all 2s;
  /* 让背面的粉色盒子保留立体空间 给父级添加的 */
  transform-style: preserve-3d;
  .box-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 20px;
    border-radius: 50%;
  }
  .box1 {
    background-color: skyblue;
    /* z-index: 2; */
  }

  .box2 {
    background-color: pink;
    /*盒子背对背*/
    transform: rotateY(180deg);
    /* 指定元素背面面向用户时是否可见 */
    backface-visibility: hidden;
  }

  &:hover {
    transform: rotateY(180deg);
    /*background-color: pink;*/
  }
}

.perspective {
  /*视距(透视)perspective：设置人和物体之间的距离，这个值要给物体的父元素*/
  perspective: 1000px;
}
.width100 {
  width: 100px;
}

.mb-30 {
  margin-bottom: 30px;
}
</style>
