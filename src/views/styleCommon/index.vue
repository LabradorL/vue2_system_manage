<template>
  <div class="app-container">
    <!-- 水平垂直居中 -->
    <div>
      <h3>1. 水平垂直居中</h3>
      <ol class="center-box">
        <li>
          <div>
            <h4>方法一：定位 + translate；父子宽高都不确定</h4>
            <div class="parent parent-box2">
              <div class="child child2-item">子元素</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>方法二：定位 + margin: auto；父子宽高都不确定</h4>
            <div class="parent parent-box3">
              <div class="child child3-item">子元素</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>方法三：flex方式，可有多个子元素并且都垂直居中；父高定子宽高都不确定</h4>
            <div class="parent parent-box1">
              <div class="child">子元素</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>方法四：grid方式，可有多个子元素并且都垂直居中；父高定子宽高都不确定</h4>
            <div class="parent parent-box4">
              <div class="child child4-item">子元素</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>方法五：定位 + margin，子元素宽高确定</h4>
            <div class="parent parent-box5">
              <div class="child child5-item">子元素</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>方法六：table-cell，父子元素宽高都确定</h4>
            <div class="parent parent-box6">
              <div class="child child6-item">子元素</div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'CommonCss',
  // 局部注册的组件
  components: { },
  // 组件状态值
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表数据
      tableData: [],
      // 总数量
      total: 0,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // id集合
      ids: [],
      // 查询参数
      queryParams: { pageNum: 1, pageSize: 10 }

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
    // 将数组分区
    function mergeSort(arr) {
      if (arr.length === 1) {
        return arr
      }
      const mid = Math.floor(arr.length / 2)
      const left = arr.slice(0, mid)
      const right = arr.slice(mid, arr.length)
      const orderLeft = mergeSort(left)
      const orderRight = mergeSort(right)
      const res = []
      while (orderLeft.length || orderRight.length) {
        if (orderLeft.length && orderRight.length) {
          res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
        } else if (orderLeft.length) {
          res.push(orderLeft.shift())
        } else if (orderRight.length) {
          res.push(orderRight.shift())
        }
      }
      console.log(res)
      return res
    }
    const arr = [4, 1, 23, 4, 5, 2, 6, 7, 2]
    console.log(mergeSort(arr))
  },

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
.center-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
     margin: 0 10px;
     h4 {
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
     }
  }
}
.parent {
  width: 300px;
  height: 200px;
  background: yellowgreen;
}
.child {
  // width: 200px;
  width: 60%;
  height: 100px;
  background: pink;
}

.parent-box2 {
  position: relative;
  .child2-item {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}


.parent-box3 {
  position: relative;
  .child3-item {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.parent-box1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent-box4 {
  display: grid;
  .child4-item {
    align-self: center;
    justify-self: center;
  }
}

.parent-box5 {
  position: relative;
  .child5-item {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 100px;
    margin-top: -50px;
    margin-left: -100px;
  }
}
.parent-box6 {
  display: table-cell;
  vertical-align: middle;
  // text-align: center;
  .child6-item {
    // display: inline-block;
    margin: 0 auto;
  }
}
</style>
