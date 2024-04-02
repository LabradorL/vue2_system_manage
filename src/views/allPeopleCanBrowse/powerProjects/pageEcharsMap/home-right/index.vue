<template>
  <div id="diversion-analysis-right">
    <!-- 停电分析 -->
    <div class="right-one">
      <com-title title-name="停电分析（今日）">
        <div
          slot="headRight"
          class="head-right-box"
          @click="getMore('powerFailure')"
        >
          <p class="head-right-unit">更多</p>
          <img src="../../imgs/common/more.png" alt="" class="more">
        </div>
        <div slot="titleBody" class="right-top body-box">
          <div id="rightTop" ref="rightTop" class="right-top-item-echart" />
        </div>
      </com-title>
    </div>
    <!-- 异常分析 -->
    <div class="right-two">
      <com-title title-name="异常分析（今日）">
        <div
          slot="headRight"
          class="head-right-box"
          @click="getMore('abnormalAnalysis')"
        >
          <p class="head-right-unit">更多</p>
          <img src="../../imgs/common/more.png" alt="" class="more">
        </div>
        <div slot="titleBody" class="body-box">
          <div class="right-three-item" style="height: 28.38%;margin-bottom: 25px">
            <div class="right-three-item-left">
              <img src="../../imgs/home/right/right_bottom_one.png" alt="">
              <p class="right-three-name">线路<br>异常</p>
            </div>
            <div class="right-three-item-right">
              <div class="right-three-li">
                <div class="right-center-li-item-left">
                  <p>重</p>
                  <p class="text-right">载</p>
                </div>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
              <div class="right-three-li">
                <div class="right-center-li-item-left">
                  <p>过</p>
                  <p class="text-right">载</p>
                </div>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="right-three-item">
            <div class="right-three-item-left">
              <p class="right-three-name">配变<br>异常</p>
              <img src="../../imgs/home/right/right_bottom_two.png" alt="">
            </div>
            <div class="right-three-item-right">
              <div class="right-three-li">
                <div class="right-center-li-item-left">
                  <p>重</p>
                  <p class="text-right">载</p>
                </div>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
              <div class="right-three-li">
                <div class="right-center-li-item-left">
                  <p>过</p>
                  <p class="text-right">载</p>
                </div>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
              <div class="right-three-li">
                <p class="right-center-li-item-left">三相不平衡</p>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
              <div class="right-three-li">
                <div class="right-center-li-item-left">
                  <p>低</p>
                  <p>电</p>
                  <p>压</p>
                </div>
                <div class="right-center-li-item-right">
                  <p>
                    <span class="">总数：</span>
                    <span class="total-num num">36 </span>
                  </p>
                  <p>
                    <span>当前：</span>
                    <span class="num">20</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 频繁发生故障线路 -->
    <div class="left-two">
      <com-title title-name="频繁发生故障线路">
        <div slot="headRight" class="head-right-box">
          <img
            id="hintFaultLine"
            class="head-hint"
            src="../../imgs/common/icon-hint.png"
            alt=""
            @click="showTips(1)"
          >
          <el-divider direction="vertical" />
          <div class="head-right-box" @click="getMore('faultLine')">
            <p class="head-right-unit">更多</p>
            <img src="../../imgs/common/more.png" alt="" class="more">
          </div>
        </div>
        <div slot="titleBody" class="body-box">
          <div class="left-top-left">
            <img
              src="../../imgs/home/faultDiagnosis-left-center-one.png"
              alt=""
            >
            <p class="left-top-left-name">接地故障</p>
            <p class="left-top-left-num">3000</p>
          </div>
          <div class="left-top-center">
            <img
              src="../../imgs/home/faultDiagnosis-left-center-two.png"
              alt=""
            >
          </div>
          <div class="left-top-right">
            <img
              src="../../imgs/home/faultDiagnosis-left-center-three.png"
              alt=""
            >
            <p class="left-top-left-name">短路故障</p>
            <p class="left-top-left-num">3000</p>
          </div>
        </div>
      </com-title>
    </div>

    <!-- 频繁发生故障线路提示框 -->
    <div v-show="faultLineTipsShow" class="hint-common faultLine-tips">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p>
          <span>演变为永久接地：</span>未来30天同一馈线有永久接地的告警视为永久接地；
        </p>
        <p>
          <span>绝缘预警有效率：</span>巡查出现场缺陷的数目与预警总数量比值，绝缘预警有效率=巡查出现场缺陷的数量/总的缺陷报警数量*100%；
        </p>
        <p>
          <span>缺陷转换率：</span>发展到永久故障数目与总的缺陷报警数目占比，缺陷转换率=发展到永久故障数目/总的缺陷报警数目*100%。
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
