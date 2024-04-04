<!--
 * @Author: lixiaofeng
 * @Date: 2022-10-14 14:22:02
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-04-04 10:05:23
 * @Description: 无访问权限页面
-->
<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">401错误!</h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/"> 回首页 </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + Number(new Date())
    }
  },
  mounted() {
    window.document.documentElement.setAttribute('data-theme', 'dark') // 给根节点设置data-theme属性，切换主题色就是修改data-theme的值
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped src='./index.scss'></style>
<style lang="scss" scoped>




</style>
