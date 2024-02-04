<template>
  <div class="middle-box-item">
    <img src="@/assets/images/test/middle_bg.png" class="img_bg1" alt>
    <img src="@/assets/images/test/middle_bg.svg" class="img_bg2" alt>
    <div ref="middleContentRef" class="middle-content circular-box" />
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'EcharsMiddleOne',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      dataTypeList: [],
      // 添加的dom
      domArr: [],
      // 计时器
      timer: null,
      resetTime: 10,
      // 中间容器的大小
      containerSize: {},
      // 中间内容区的ref
      middleContentRef: null

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      // 获取容器的上下左右距离
      this.middleContentRef = this.$refs.middleContentRef
      const containerInfo = this.middleContentRef.getBoundingClientRect()
      this.containerSize = {
        left: 0,
        right: containerInfo.right - containerInfo.left,
        top: 0,
        bottom: containerInfo.bottom - containerInfo.top
      }
      this.getDataTypeInfo()
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(this.timer)
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    init() { },
    // 根据数据，初始化数据的位置，大小
    setSizeAndPositionByData() {
      this.dataTypeList.map((item) => {
        const colorInfo = this.randomColor(item.num)
        const spanDom = document.createElement('div')
        spanDom.style.position = 'absolute'
        spanDom.style.display = 'flex'
        spanDom.style.color = colorInfo.color
        spanDom.style.fontSize = `${this.randomNumber(item.num)}px`
        spanDom.style.width = `${this.randomW(item.num)}px`
        spanDom.style.height = `${this.randomW(item.num)}px`
        spanDom.style.border = `1px solid ${colorInfo.color}`
        spanDom.style.boxShadow = `0px 0px 12px 1px ${colorInfo.color}`
        spanDom.style.background = colorInfo.bg
        const x = this.randomANumber(
          this.containerSize.left,
          this.containerSize.right - this.randomW(item.num)
        )
        const y = this.randomANumber(
          this.containerSize.top,
          this.containerSize.bottom - this.randomW(item.num)
        )
        spanDom.style.left = `${x}px`
        spanDom.style.top = `${y}px`
        // @ts-ignore
        spanDom.local = {
          position: {
            // 位置
            x,
            y,
            width: this.randomW(item.num)
          },
          direction: {
            // 方向 正数往右 负数往左
            x: 1,
            y: 1
          },
          velocity: {
            // 每次位移初速度
            x: -1.5 + Math.random(),
            y: -1.1 + Math.random()
          }
        }
        spanDom.innerHTML = `${item.name}<br/>${item.num}`
        this.middleContentRef.appendChild(spanDom)
        this.domArr.push(spanDom)
      })
    },
    // 根据数据，处理数据的颜色
    randomColor(value) {
      if (value < 60) {
        return {
          bg: this.hexToRgb('#00DEFF'),
          color: '#00DEFF'
        }
      } else if (value >= 60 && value < 120) {
        return {
          bg: this.hexToRgb('#FFC000'),
          color: '#FFC000'
        }
      }
      return {
        bg: this.hexToRgb('#FF5454'),
        color: '#FF5454'
      }
    },
    // 根据数据，处理数据字体大小
    randomNumber(value) {
      if (value < 60) return 16
      else if (value >= 60 && value < 120) return 18
      return 22
    },
    // 根据数据，处理数据宽高
    randomW(value) {
      if (value < 60) return 79
      else if (value >= 60 && value < 120) return 96
      return 128
    },
    // 根据颜色，设置背景色
    hexToRgb(hex) {
      return (
        'rgba(' +
        parseInt('0x' + hex.slice(1, 3)) +
        ',' +
        parseInt('0x' + hex.slice(3, 5)) +
        ',' +
        parseInt('0x' + hex.slice(5, 7)) +
        ',0.2)'
      )
    },
    // 根据最大值，最小值，生成一个随机数
    randomANumber(lowerInteger, upperInteger) {
      const choices = upperInteger - lowerInteger + 1
      return Math.floor(Math.random() * choices + lowerInteger)
    },

    // 设置动画
    renderAni() {
      const that = this
      if (this.resetTime < 100) {
        this.resetTime++
        this.timer = requestAnimationFrame(that.renderAni.bind(that))
        this.resetTime = 0
      }
      // 元素可以移动，可以打开查看效果
      // this.wordFly()
    },

    // 添加动画
    wordFly() {
      this.domArr.map((item) => {
        if (
          item.local.position.x < this.containerSize.left ||
          item.local.position.x + item.local.position.width > this.containerSize.right
        ) { item.local.direction.x = -item.local.direction.x }
        if (
          item.local.position.y < this.containerSize.top ||
          item.local.position.y + item.local.position.width > this.containerSize.bottom
        ) { item.local.direction.y = -item.local.direction.y }
        item.local.position.x += item.local.velocity.x * item.local.direction.x
        item.local.position.y += item.local.velocity.y * item.local.direction.y
        item.style.left = `${item.local.position.x}px`
        item.style.top = `${item.local.position.y}px`
      })
    },
    // 初始化
    initCy() {
      this.setSizeAndPositionByData()
      this.renderAni()
    },
    // 获取数据
    getDataTypeInfo() {
      this.dataTypeList = [
        { name: '敏感访问量', num: 50 },
        { name: '动态数据源数', num: 13 },
        { name: '风险日志总数', num: 136 },
        { name: '静态数据源数', num: 13 }
      ]
      this.initCy()
    }
  }
}
</script>

<style lang="scss" scoped>
.middle-box-item {
  display: flex;
  align-items: center;
  position: relative;
  top: 100px;
  height: calc(100% - 100px);
  .img_bg1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    height: 480px;
  }

  .img_bg2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  .middle-content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    box-sizing: border-box;

    div {
      border-radius: 50%;
      word-break: break-all;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style>
.circular-box div {
  border-radius: 50%;
  word-break: break-all;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
