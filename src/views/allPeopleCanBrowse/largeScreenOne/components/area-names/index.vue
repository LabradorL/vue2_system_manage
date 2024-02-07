<template>
  <div v-clickoutside="handleClickOutside" class="area-name-box">
    <div style="display: flex; align-items: center" @click="showCon">
      <span class="short-name">{{ initData["shortName"] }}</span>
      <i v-show="!isShow" class="el-icon-caret-bottom" />
      <i v-show="isShow" class="el-icon-caret-top" />
    </div>
    <!-- <div class="no-data" v-show="isShow&&areaData.length===0">
            暂无数据
        </div> -->
    <div v-show="isShow" class="content-box">
      <div :class="[isShow ? 'slideBottom' : 'slideTop']">
        <div
          v-if="initData['funcType'] != '05'"
          class="head-city"
          @click="back"
        >
          {{ initName }}
        </div>
        <div class="content-bottom">
          <div
            v-if="areaData[0] && areaData[0]['children']"
            class="content-inner"
          >
            <div v-for="(item, i) in areaData" :key="i" class="city-li">
              <div :id="item.id" class="city-l" @click="emitData(item)">
                {{ item.shortName }}
              </div>
              <div v-if="item.funcType === '04'" class="city-r">
                <span
                  v-for="(child, j) in item.children"
                  :id="child.id"
                  :key="j"
                  class="span-name-t"
                  @click="emitData(child)"
                >{{ child.shortName }}</span>
              </div>
              <div v-else class="city-r">
                <span
                  v-for="(child, j) in item.children"
                  :id="child.id"
                  :key="j"
                  class="span-name"
                  @click="emitData(child)"
                >{{ child.shortName }}</span>
              </div>
            </div>
          </div>
          <div v-else class="content-inner">
            <div v-for="(item, i) in areaData" :key="i" class="city-li">
              <div :id="item.orgId" class="city-l" @click="emitData(item)">
                {{ item.shortName }}
              </div>
              <div class="city-r" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clickoutside from 'element-ui/src/utils/clickoutside.js'

export default {
  name: 'AreaNames',
  directives: {
    Clickoutside
  },
  props: {},
  data() {
    return {
      initName: '宁夏',
      allItemData: {},
      initData: {
        shortName: '宁夏'
      },
      fd: {},
      allData: {},
      activeName: '',
      areaData: [],
      isShow: false,
      activeData: {}
      // shortName: ""
    }
  },
  computed: {},
  watch: {
    activeData: {
      handler: function(newVal, oldVal) {
        sessionStorage.setItem('activeOrg', JSON.stringify(newVal))
        this.$emit('activeArea', newVal)
      },
      deep: true,
      immediate: false
    }
    // allData: {
    //     handler: function (newVal, oldVal) {
    //         this.isShow = !this.isShow;
    //         this.$emit("allData", newVal);
    //     }
    //
    // }
  },
  created() {},
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // this.isShow = false;
  },
  methods: {
    handleClickOutside() {
      this.isShow = false
    },
    init() {
      // console.log("areaName----userInfo----" + JSON.stringify(this.userInfo));
      // const param = {
      //   funcType: this.userInfo.funcType,
      //   parentId: this.userInfo.orgId
      // }
      // const url = '/faultanalysis/fault/getOrg'
      // this.$axios.post(url, { params: param }).then((res) => {

      // })
    },
    showCon() {
      this.isShow = !this.isShow
      // let arr = JSON.parse(sessionStorage.getItem('areaData'))
      // const arr = this.areaData
      // if (arr && arr !== 'undefined') {
      //   this.areaData = arr
      // } else {
      //   const params = {
      //     orgId: this.userInfo.orgId,
      //     funcType: this.userInfo.funcType
      //   }
      //   this.getData(params)
      // }
    },
    getData(params) {
    //  获取数据
    },
    emitData(obj, type) {
      // console.log('emitData',obj);
      // const elementsByClassName = document.getElementsByClassName('sgmap-popup')
      // if (elementsByClassName) {
      //   for (let i = 0; i < elementsByClassName.length; i++) {
      //     elementsByClassName[i].remove()
      //   }
      // }
      // const ddd = document.getElementById(this.activeData.id)
      // if (ddd) {
      //   ddd.style.color = ''
      // }
      // this.initData = obj
      // this.activeData = obj
      // document.getElementById(obj.id).style.color = 'chartreuse'
      // this.$nextTick(() => {
      //   this.isShow = false
      // })
    },
    back() {
      // const ddd = document.getElementById(this.activeData.orgId)
      // if (ddd) {
      //   ddd.style.color = ''
      // }
      // this.initData = this.fd
      // this.isShow = false
      // this.$emit('activeArea', this.initData)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-caret-bottom {
  color: #127edb;
}

.el-icon-caret-top {
  color: #127edb;
}

.area-name-box {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #061427;
  box-shadow: inset 0px 0px 10px 0px rgba(54, 124, 255, 0.8);
  border: 1px solid;
  border-color: #187da3;
  border-radius: 4px;
}

.short-name {
  display: inline-block;
  width: 70px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}

.no-data {
  position: absolute;
  top: 48px;
  left: 0;
  width: 200px;
  height: 40px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
  box-sizing: border-box;
  padding: 15px 13px;
  background-color: #0a1530;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
  position: absolute;
  top: 48px;
  left: 0;
  width: 385px;
  min-height: 0;
  max-height: 380px;
  background: #071d41;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
  box-sizing: border-box;
  /*padding: 15px 13px;*/
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  padding: 16px 20px;
}

.content-bottom {
  // padding: 0 13px;
  position: relative;
  width: 100%;
}

.head-city {
  width: 100%;
  padding-bottom: 16px;
  color: #23c4fd;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid;
  color: #06396b;
}

.city-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
}

::-webkit-scrollbar {
  width: 0;
}

.city-l {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 700;
}

.city-r {
  flex: 7;
  display: flex;
  flex-wrap: wrap;
}

.span-name {
  // width: calc(100% / 3);
  margin-right: 20px;
  margin-bottom: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.8);
  -webkit-box-orient: vertical;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
}
.span-name-t {
  font-size: 14px;
  width: calc(100% / 2);
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ccd1da;
  -webkit-box-orient: vertical;
}

.span-name-t:hover {
  color: #23c4fd;
}

.span-name:hover {
  color: #23c4fd;
}

.slideBottom {
  -webkit-animation: slide-bottom 0.5s linear both;
  animation: slide-bottom 0.5s linear both;
  overflow: auto;
}

.slideTop {
  -webkit-animation: slide-top 0.5s linear both;
  animation: slide-top 0.5s linear both;
  overflow: auto;
}

@-webkit-keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
    height: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    height: 380px;
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    height: 380px;
  }
  100% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
    height: 0;
  }
}
</style>
