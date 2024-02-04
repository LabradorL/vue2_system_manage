<template>
  <div class="QRCode-box">
    <el-tabs v-model="QRCodeActive" type="border-card">
      <el-tab-pane v-if="showQRCode.ios" name="IOS">
        <span slot="label" class="lable-slot">
          <el-image :src="img.ios" class="img-width" />
          <span :class="QRCodeActive == 'IOS' ? 'primary-color' : ''">IOS下载</span>
        </span>
        <div ref="qrCodeIOS" class="qrcode" />
        <div class="text-center margin-top8-bottom8">扫码下载海星客服IOS移动版</div>
        <div class="text-center">（浏览器扫码，或微信扫码用浏览器打开）</div>
      </el-tab-pane>
      <el-tab-pane v-if="showQRCode.android" name="Android">
        <span slot="label" class="lable-slot">
          <el-image :src="img.android" class="img-width" />
          <span :class="QRCodeActive == 'Android' ? 'primary-color' : ''">Android下载</span>
        </span>
        <div ref="qrCodeAndroid" class="qrcode" />
        <div class="text-center margin-top8-bottom8">扫码下载海星客服Android移动版</div>
        <div class="text-center">（浏览器扫码，或微信扫码用浏览器打开）</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ios from '@/assets/images/icon/ios.png'
import android from '@/assets/images/icon/android.png'
// import QRCode from 'qrcodejs2'
import { getTableList } from '@/api/test'
export default {
  // 组件名称
  name: 'Qrcodejs2Dome',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      img: {
        ios: ios,
        android: android
      },
      QRCodeActive: 'IOS',
      showQRCode: {
        ios: false,
        android: false
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    // this.getQRCodeInfoFun()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    // 获取下载二维码的信息
    // getQRCodeInfoFun() {
    //   getTableList().then(res => {
    //     res.data = [{
    //       type:1,
    //       downloadUrl: 'https://haixing-1316793195.cos.ap-nanjing.myqcloud.com/upload/2024/01/07/13822V10_20240107231013A001.apk'
    //     }]
    //     if (res.data.findIndex(item => item.type === 1) !== -1) {
    //       this.showQRCode.android =
    //         this.QRCodeActive = 'Android'
    //     }
    //     if (res.data.findIndex(item => item.type === 2) !== -1) {
    //       this.showQRCode.ios = true
    //       this.QRCodeActive = 'IOS'
    //     }
    //     this.$nextTick(() => {
    //       res.data.forEach(item => {
    //         const div = document.createElement('div')// 创建一个div,用来生成二维码
    //         // 生成二维码
    //         const qrcode = new QRCode(div, {
    //           text: item.downloadUrl, // 你的扫码内容,填网址
    //           width: 100, // 二维码宽度
    //           height: 100, // 二维码高度
    //           colorDark: '#333333', // 二维码颜色
    //           colorLight: '#ffffff', // 二维码背景色
    //           correctLevel: QRCode.CorrectLevel.H // 从上至下生成码密度越来越高 L - M - Q - H
    //           // 容错率越高,越复杂
    //         })
    //         const logo = new Image()
    //         logo.crossOrigin = 'Anonymous'
    //         logo.src = require('@/assets/images/profile.jpg') // 填入你本地log图片
    //         // 生成log图
    //         logo.onload = () => {
    //           let QRCodeDom = null
    //           if (item.type === 1) {
    //             // android
    //             QRCodeDom = this.$refs.qrCodeAndroid
    //           }
    //           if (item.type === 2) {
    //             // ios
    //             QRCodeDom = this.$refs.qrCodeIOS
    //             this.showQRCode.ios = true
    //           }
    //           const container = QRCodeDom
    //           // 获取页面上的div,可以使用document.querySelector()等等方法,不类推了
    //           if (container.innerHTML != '') {
    //             // 获取页面div , 有则清空已存在的
    //             container.innerHTML = ''
    //           }
    //           const qrImg = qrcode._el.getElementsByTagName('img')[0] // 获取二维码
    //           const canvas = qrcode._el.getElementsByTagName('canvas')[0] // 获取canvas

    //           const ctx = canvas.getContext('2d')
    //           ctx.fillStyle = '#FF0000'
    //           ctx.drawImage(logo, 100 * 0.5 - 18, 100 * 0.5 - 18, 36, 36) // 写入log
    //           qrImg.src = canvas.toDataURL()
    //           container.appendChild(qrcode._el)
    //         }
    //       })
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.QRCode-box {
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 255px;
  width: 60%;
}
.img-width {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.lable-slot {
  display: flex;
  align-items: center;
}
.qrcode {
  position: relative;
  left: 50%;
  transform: translateX(-25%);
}
.margin-top8-bottom8 {
  margin: 8px 0;
}
::v-deep .el-tabs {
  .el-tabs__content {
    padding: 15px 0;
  }
}
</style>
