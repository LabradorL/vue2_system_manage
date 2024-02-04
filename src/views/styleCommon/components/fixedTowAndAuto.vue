<template>
  <div>
    <h3>2.两列定宽，一列自适应</h3>
    <ol class="center-box">
      <li>
        <h4>方法一：float + overflow</h4>
        <div class="fixed-width-auto-box">
          <div class="fixed-width left-fixed-width1">定宽</div>
          <div class="fixed-width right-fixed-width1">定宽</div>
          <div class="auto auto1">自适应</div>

        </div>
      </li>
      <li>
        <h4>方法二：定位 + margin</h4>
        <div class="fixed-width-auto-box fixed-width-auto-box2">
          <div class="fixed-width left-fixed-width2">定宽</div>
          <div class="auto auto2">自适应自适应自适应自适应自适应自适应自适应自适应</div>
          <div class="fixed-width right-fixed-width2">定宽</div>
        </div>
      </li>
      <li>
        <h4>方法三：定位</h4>
        <div class="fixed-width-auto-box fixed-width-auto-box3">
          <div class="fixed-width left-fixed-width3">定宽</div>
          <div class="auto auto3">自适应自适应自适应自适应自适应自适应自适应自适应</div>
          <div class="fixed-width right-fixed-width3">定宽</div>
        </div>
      </li>
      <li>
        <h4>方法四：flex</h4>
        <div class="fixed-width-auto-box fixed-width-auto-box4">
          <div class="fixed-width fixed-width4">定宽</div>
          <div class="auto auto4">自适应自适应自适应自适应自适应自适应自适应自适应</div>
          <div class="fixed-width fixed-width4">定宽</div>
        </div>
      </li>
      <li>
        <h4>方法五：table + table-cell</h4>
        <div class="fixed-width-auto-box fixed-width-auto-box5">
          <div class="fixed-width fixed-width5">定宽</div>
          <div class="auto auto5">自适应自适应自适应自适应自适应自适应自适应自适应</div>
          <div class="fixed-width fixed-width5">定宽</div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'FixedWidthAndAuto',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    // 是否显示对话框
    show: {
      type: Boolean,
      default: false
    },
    // // 唯一标识,根据id获取信息
    id: {
      type:  [Number, String],
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
      default: ''
    },
    // 对话框的宽度
    dialogWidth: {
      type: String,
      default: '600px'
    }
  },
  // 组件状态值
  data() {
    return {
      listOrObj: null
    }
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
.center-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
     margin: 0 10px;
     h4 {
      width: 300px;
     }
  }
}
.fixed-width-auto-box {
  width: 300px;
  height: 200px;
  background: greenyellow;
}
.fixed-width {
  width: 100px;
  height: 200px;
  background: pink;
}
.auto {
  height: 200px;
  background: cyan;
}
.left-fixed-width1 {
  float: left;
  // 正padding和负margin对冲——任意一列高度增高，另一列也增高到同一高度
  // margin-bottom: -300px;
  // padding-block: 300px;
}
.right-fixed-width1 {
  float: right;
  // 正padding和负margin对冲——任意一列高度增高，另一列也增高到同一高度
  // margin-bottom: -300px;
  // padding-block: 300px;
}
.auto1 {
  height: 100%;
  // margin-left: 100px;
  overflow: hidden;
}

.fixed-width-auto-box2 {
  position: relative;
  .left-fixed-width2 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
  }
  .auto2 {
    margin-left: 100px;
    margin-right: 100px;
  }
  .right-fixed-width2 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
  }
}

.fixed-width-auto-box3 {
  position: relative;
  .left-fixed-width3 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
  }
  .auto3 {
    position: absolute;
    left: 100px;
    right: 100px;
    bottom: 0;
    top: 0;
  }
  .right-fixed-width3 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
  }
}
.fixed-width-auto-box4 {
  display: flex;
  .auto4 {
    flex: 1;
  }
}
.fixed-width-auto-box5 {
  display: table;
  // width: 100%;
  .fixed-width5 {
    display: table-cell;
  }
  .auto5 {
    display: table-cell;
  }
}
.fr {
  float:right
}

</style>
