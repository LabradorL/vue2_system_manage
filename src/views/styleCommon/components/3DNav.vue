<template>
  <ul>
    <template v-for="(item) in navList">
      <li :key="item.id" class="li" @click="jump(item.path)">
        <div class="box">
          <div class="front">{{ item.name }}</div>
          <div class="bottom">{{ item.name }}</div>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'ThreeDNav',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      navList: [
        { path: '/all-people-can-browse-pie', name: '饼图图表合集' }
      ]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    // this.getList()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    // 获取列表
    getList() {
      getTableList(this.queryParams).then((res) => {
        this.tableData = res.rows || []
      })
    },
    jump(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  height: 35px;
}
.li {
  /* 让子元素有透视感,因为.box转转需要透视，所以给li加*/
  perspective: 1000px;
  list-style: none;
  float: left;
  width: 120px;
  height: 35px;
  margin: 0 10px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  /* 让子元素保留3d立体环境，否则就只有2维空间的,三维的就不会显示 */
  transform-style: preserve-3d;
}

.front,
.bottom {
  /* 让多个盒子重叠在一起 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 35px;
}

.front {
  background-color: skyblue;
  transform: translate3d(0,0,'17.5px');
}

.bottom {
  background-color: yellowgreen;
  transform: rotateX(-90deg) translate3d(0,0,17.5px);
}

.box:hover {
  transform: rotateX(90deg);
}
</style>
