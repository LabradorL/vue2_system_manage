<template>
  <div id="diversion-analysis-left">
    <!-- 配网规模 -->
    <div class="left-one">
      <com-title title-name="配网规模" additional-body-class="title-body">
        <div slot="titleBody" class="body-box">
          <div class="left-two-item">
            <img src="../../imgs/home/left_top_one.png" alt="">
            <p class="left-two-item-name">线路(条)</p>
            <p class="left-two-item-num">200234</p>
          </div>
          <div class="left-two-item">
            <img src="../../imgs/home/left_top_two.png" alt="">
            <p class="left-two-item-name">配变(台)</p>
            <p class="left-two-item-num">6543890</p>
          </div>
          <div class="left-two-item">
            <img src="../../imgs/home/left_top_three.png" alt="">
            <p class="left-two-item-name">站内开关(个)</p>
            <p class="left-two-item-num">32</p>
          </div>
          <div class="left-two-item">
            <img src="../../imgs/home/left_top_four.png" alt="">
            <p class="left-two-item-name">柱上开关(个)</p>
            <p class="left-two-item-num">32</p>
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
            src="../../imgs/common//icon-hint.png"
            alt=""
            @click="showTips(1)"
          >
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
    <!-- 特别关注 -->
    <div class="left-three">
      <com-title title-name="特别关注">
        <div slot="headRight" class="head-right-box">
          <div class="report" @click="showReport">
            <div class="img-box">
              <img src="../../imgs/home/report_icon.png" alt="">
            </div>
            <span>报表</span>
          </div>
          <el-divider direction="vertical" />
          <img
            id="hintSpecialAttention"
            class="head-hint"
            src="../../imgs/common//icon-hint.png"
            alt=""
            @click="showTips(2)"
          >
        </div>
        <div slot="titleBody" class="body-box">
          <div class="left-bottom-item">
            <p class="left-top-left-name">高跳线路</p>
            <img src="../../imgs/home/high_jump_line.png" alt="">
            <p class="left-bottom-num">
              <span class="num">32</span>
              <span class="unit">条</span>
            </p>
          </div>

          <div class="left-bottom-item">
            <p class="left-top-left-name">频停台区</p>
            <img src="../../imgs/home/left_bottom_two.png" alt="">
            <p class="left-bottom-num">
              <span class="num">48</span>
              <span class="unit">个</span>
            </p>
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
    <!-- 特别关注提示框 -->
    <div v-show="attentionTipsShow" class="hint-common attention-tips">
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
  margin: 0 16px;
 background: #6190bb;
}
</style>
