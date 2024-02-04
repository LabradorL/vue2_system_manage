<template>
  <div class="writting-box">
    <div v-for="(item,writtingIdx) in writtingList" :key="item.title" class="item-writting">
      <!-- 第一块 -->
      <div class="block-item">
        <div class="clearfix writting-title-box">
          <h1 class="font-size22 fl">{{ item.title }}</h1>
          <div class="yizhu">
            <p class="yizhu-item" @click="clickHandle('isTranslation', writtingIdx)">译</p>
            <p class="yizhu-item">注</p>
          </div>
        </div>

        <div class="writting-author">{{ item.author }}</div>
        <div class="writting-content-box">
          <div v-for="(itemPara,idx) in item.content" :key="item.title + idx">
            <p class="paragraph" v-html="itemPara" />
            <p v-show="item.isTranslation" class="paragraph translate-color" v-html="item.translation[idx]" />
          </div>

        </div>
      </div>
      <!-- 创作背景 -->
      <div v-if="item.literaryBackground && item.literaryBackground.length" class="block-item">
        <div class="block-title">创作背景</div>
        <p v-for="(itemBackground,idx) in item.literaryBackground" :key="item.title + idx + 'literaryBackground'" class="paragraph">{{ itemBackground }}</p>
      </div>
      <!-- 译文 -->
      <div class="block-item">
        <div class="block-title">译文</div>
        <div class="writting-content-box">
          <p v-for="(itemTranslate,idx) in item.translation" :key="item.title + idx + 'translation'" class="paragraph" v-html="itemTranslate" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { writtingList } from '@/api/test'
export default {
  // 组件名称
  name: 'WrittingList',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      writtingList: []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    this.getInfo()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    /** 查询XXXX信息 */
    getInfo() {
      writtingList().then(response => {
        this.writtingList = response.rows
        this.writtingList.forEach(item => {
          this.$set(item, 'isTranslation', false)
          this.$set(item, 'isAnnotation', false)
        })
      })
    },
    clickHandle(type, idx) {
      if (this.writtingList[idx][type]) {
        this.writtingList[idx][type] = false
      } else {
        this.writtingList[idx][type] = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.writting-box {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  font-size: 14px;
  line-height: 200%;
  overflow: hidden;
  color: #0F0F0F;
  font-family: Arial, Helvetica;

}
.item-writting {
  // background-color: rgb(213, 210, 189);
}
.block-item {
  width: 100%;
  box-sizing: border-box;;
  background-color: #F0EFE2;
  border: 1px solid #F0EFE2;
  margin-bottom: 20px;
  padding: 15px 20px 0;
  border-radius: 5px;
}
.writting-title-box {
  margin: 0 0 10px;
}
.yizhu {
  float: right;
  right: 0;
  top:0
}
.yizhu-item {
  display: inline-block;
  width: 25px;
  height: 25px;
  color: #aeaeae;
  text-align: center;
  line-height: 23px;
  border: 2px solid #C5C5C5 ;
  border-radius: 50%;
  margin-left: 15px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.writting-author {
  font-size: 12px;
  color: #65645F;
  margin-bottom: 10px;
}
.writting-content-box {
  color: #0F0F0F;
}
.paragraph {
  text-indent: 2em;
  margin-bottom: 10px;
}
.block-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}
.font-size22 {
  font-size: 22px;
}
h1 {
  margin: 0;
}
.translate-color {
  color: #518564;;
}
.annotation-color {
  color: #af9100;;
}
</style>
