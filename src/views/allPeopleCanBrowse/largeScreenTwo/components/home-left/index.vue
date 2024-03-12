<template>
  <div id="diversion-analysis-left">
    <!-- 配网规模 -->
    <div class="left-one">
      <com-title title-name="配网规模" additional-body-class="title-body">
        <div slot="titleBody" class="body-box">
          <div class="left-one-item-box">
            <p class="module-title">
              <img
                src="../../imgs/home/center_left_icon.png"
                alt=""
                class="icon-img"
              >
              <span>线路</span>
            </p>
            <div class="left-one-item-content">
              <img
                src="../../imgs/home/left/left_one_one.png"
                class="img-size"
                alt=""
              >
              <div class="data-box">
                <div class="data-box-item">
                  <p class="data-item-title">线路数/条</p>
                  <p class="left-one-num">250</p>
                </div>
                <div class="data-box-item">
                  <p class="data-item-title">自动化线路数/条</p>
                  <p class="left-one-num color-blue">300</p>
                </div>
              </div>
            </div>
          </div>
          <div class="left-one-item-box">
            <p class="module-title">
              <img
                src="../../imgs/home/center_left_icon.png"
                alt=""
                class="icon-img"
              >
              <span>开关</span>
            </p>
            <div class="left-one-item-content">
              <img
                src="../../imgs/home/left/left_one_two.png"
                class="img-size"
                alt=""
              >
              <div class="data-box">
                <div class="data-box-item">
                  <p class="data-item-title">开关数/个</p>
                  <p class="left-one-num">250</p>
                </div>
                <div class="data-box-item">
                  <p class="data-item-title">自动化开关数/个</p>
                  <p class="left-one-num color-blue">300</p>
                </div>
              </div>
            </div>
          </div>
          <div class="left-one-item-box">
            <p class="module-title">
              <img
                src="../../imgs/home/center_left_icon.png"
                alt=""
                class="icon-img"
              >
              <span>配变</span>
            </p>
            <div class="left-one-item-content">
              <img
                src="../../imgs/home/left/left_one_three.png"
                class="img-size"
                alt=""
              >
              <div class="data-box">
                <div class="data-box-item">
                  <p class="data-item-title">配变数/台</p>
                  <p class="left-one-num">250</p>
                </div>
                <div class="data-box-item">
                  <p class="data-item-title">融合终端数/个</p>
                  <p class="left-one-num color-blue">300</p>
                </div>
              </div>
            </div>
          </div>
          <div class="left-one-item-box">
            <p class="module-title">
              <img
                src="../../imgs/home/center_left_icon.png"
                alt=""
                class="icon-img"
              >
              <span>10kV新能源监测</span>
            </p>
            <div class="left-one-item-content">
              <img
                src="../../imgs/home/left/left_one_four.png"
                class="img-size"
                alt=""
              >
              <div class="data-box">
                <div class="data-box-item">
                  <p class="data-item-title">光伏用户/户</p>
                  <p class="left-one-num">250</p>
                </div>
                <div class="data-box-item">
                  <p class="data-item-title">光伏容量/MW</p>
                  <p class="left-one-num color-blue">300</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 二次设备规模 -->
    <div class="left-two">
      <com-title title-name="二次设备规模">
        <div slot="headRight" class="head-right-box">
          <img
            id="equipmentScale"
            class="head-hint"
            src="../../imgs/common/icon-hint.png"
            alt=""
            @click="showTips(1)"
          >
          <el-divider direction="vertical" />
          <div class="head-right-box">
            <p class="head-right-unit">更多</p>
            <img src="../../imgs/common/more.png" alt="" class="more">
          </div>
        </div>
        <div slot="titleBody" class="body-box">
          <div class="left-two-top">
            <div class="title">中压二次设备</div>
            <div class="device-num-box">
              <span class="device-num">72</span>
              <span>台</span>
            </div>
          </div>
          <div class="device-type-box">
            <div class="device-type-item">
              <div class="img-box">
                <img
                  src="../../imgs/home/left/left-two-item-bg.png"
                  alt=""
                  class="icon-img"
                >
              </div>
              <div class="num">21</div>
              <div class="device-type-name">FTU/台</div>
            </div>
            <div class="device-type-item">
              <div class="img-box">
                <img
                  src="../../imgs/home/left/left-two-item-bg.png"
                  alt=""
                  class="icon-img"
                >
              </div>
              <div class="num">36</div>
              <div class="device-type-name">DTU数/台</div>
            </div>
            <div class="device-type-item">
              <div class="img-box">
                <img
                  src="../../imgs/home/left/left-two-item-bg.png"
                  alt=""
                  class="icon-img"
                >
              </div>
              <div class="num">15</div>
              <div class="device-type-name">故障指示器/台</div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 特别关注提示框 -->
    <div v-show="equipmentScaleTipsShow" class="hint-common attention-tips">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p>
          <span>演变为永久接地：</span>未来30天同一馈线有永久接地的告警视为永久接地；
        </p>
        <p>
          <span>绝缘预警有效率：</span>巡查出现场缺陷的数目与预警总数量比值，绝缘预警有效率=巡查出现场缺陷的数量/总的缺陷报警数量*100%；
        </p>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
<style scoped lang="scss">
.el-divider {
  margin: 0 10px;
  background: #6190bb;
}
</style>
