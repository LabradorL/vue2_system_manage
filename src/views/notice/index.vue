<!--
 * @Author: lixiaofeng
 * @Date: 2022-12-05 14:34:42
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-13 18:28:32
 * @Description:滚动通知
-->
<template>
  <div class="app-container">
    <!--  通知消息滚动模板    -->
    <div class="box mb-20">
      <ul ref="con1" class="notice-ul" :class="{ anim: animate == true }">
        <li v-for="item in messageList" :key="item.id">
          <img style="height: 20px" class="mr-5 ml-5" src="@/assets/images/warning.png">
          <span class="notice">{{ item.longText + item.id }}</span>
        </li>
      </ul>
    </div>

    <!-- 跑马灯样式 -->
    <div class="horse-race-lamp-wrapper">
      <div class="horse-race-lamp-box">
        <div class="notice-icon">
          <img style="height: 20px" class src="@/assets/images/warning.png">
        </div>
        <!-- <div class="notice-content">
          <div
            class="notice-text-box"
            :style="{animationPlayState: 'running', animationDuration: `${8 * lampMesList.length}s`}"
          >
            <div
              v-for="item in lampMesList"
              :key="item.id"
              class="notice-text"
            >{{ item.longText + item.id }}</div>
          </div>
        </div>-->
        <div class="notice-content">
          <div
            class="notice-text-box"
            :style="{animationPlayState: 'running', animationDuration: `10s`}"
          >
            <div class="notice-text">我欲乘风归去，又恐琼楼玉宇。高处不胜寒，起舞弄清影，何似在人间。</div>
            <div class="notice-text">转朱阁，低绮户，不应有恨，何事长向别时圆。</div>
            <div class="notice-text">人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟年？</div>
            <!-- <div class="notice-text">寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。</div> -->
          </div>
        </div>
      </div>
    </div>
    <h2>诗词歌赋</h2>
    <writting />
  </div>
</template>

<script>
import { getTableList } from '@/api/test'
import writting from './writting.vue'
export default {
  // 组件名称
  name: 'NoticeBar',
  // 局部注册的组件
  components: { writting },
  // 组件状态值
  data() {
    return {
      // 列表数据
      messageList: [],
      animate: false,
      lampMesList: [],
      lampAnmate: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    getTableList().then((res) => {
      this.messageList = JSON.parse(JSON.stringify(res.rows))
      this.lampMesList = JSON.parse(JSON.stringify(res.rows))
    })
    // 定时触发滚动函数
    setInterval(this.messageScroll, 2000)
    // setInterval(this.raceLampScroll, 8000)
  },
  mounted() {
  },
  beforeDestroy() { },
  destroyed() { },
  // 方法
  methods: {
    // 通知消息滚动函数
    messageScroll() {
      this.animate = true // 开启过渡动画
      setTimeout(() => {
        this.messageList.push(this.messageList[0]) // 将数组的第一个元素追加到数组最后面
        this.messageList.shift() // 然后删除数组的第一个元素
        this.animate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 3500)
    },
    // 跑马灯滚动
    raceLampScroll() {
      this.lampAnmate = true // 开启过渡动画
      setTimeout(() => {
        this.lampMesList.push(this.lampMesList[0]) // 将数组的第一个元素追加到数组最后面
        this.lampMesList.shift() // 然后删除数组的第一个元素
        this.lampAnmate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 9000)
    }
  }
}
</script>

<style lang="scss" scoped>
// 消息通知样式
.box {
  width: 98%;
  height: 64px;
  overflow: hidden;
  margin-left: 1.5%;
  margin-top: 0.533rem;
  background: #f9f9f9;
  border-radius: 0.213rem;
}
.anim {
  transition: all 0.5s;
  margin-top: -30px;
}
.notice-ul li {
  list-style: none;
  line-height: 30px;
  height: 30px;
  font-size: 0;
  white-space: nowrap;
}
.notice {
  vertical-align: middle;
  font-size: 12px;
}

// 跑马灯样式
.horse-race-lamp-wrapper {
  max-width: 1000px;
  height: 32px;
  line-height: 32px;
  background-color: rgb(253, 246, 236);
  overflow: hidden;
  margin-left: 1.5%;
  padding: 0 12px;
  border-radius: 5px;
  .horse-race-lamp-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 0;
    .notice-icon {
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: 5px;
    }
    .notice-content {
      flex: 1;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: hidden;
      text-align: right;
      padding-left: 100%;
      box-sizing: border-box;

      .notice-text-box {
        white-space: nowrap;
        word-break: keep-all;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        animation: move 4s linear infinite;
        // .notice-text {
        //   display: inline-block;
        //   // width: calc(100% - 25px);
        //   width: 100%;
        // }
      }
    }
  }
}

@keyframes move {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-180%, 0, 0);
  }
}
</style>
