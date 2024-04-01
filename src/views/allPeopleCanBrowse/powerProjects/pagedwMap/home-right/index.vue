<template>
  <div id="diversion-analysis-right">
    <!-- 遥控指标统计 -->

    <!-- 具备遥控功能的终端 -->
    <div class="right-two">
      <com-title title-name="具备遥控功能的终端">
        <div slot="titleBody" class="body-box">
          <div class="left-bottom-left">
            <div id="functionalTerminalEchart" />
            <img class="left-bottom-echart-bg" src="../imgs/right/echart-bg.png" alt="">
            <p class="left-bottom-echart-icon" @click="openTableDialog(1, 0, null)">{{ rightTwoCountObj.total || 0 }}</p>
          </div>
          <div class="left-bottom-right">
            <div class="left-bottom-item">
              <p class="left-bottom-item-icon" />
              <div class="left-bottom-item-right">
                <p class="left-bottom-item-name">FTU（台）</p>
                <p class="left-bottom-item-num pointer" @click="openTableDialog(1, 1, null)">
                  <span>{{ rightTwoCountObj.ftuCount || 0 }}</span>
                  <span>/</span>
                  <span>{{ rightTwoCountObj.ftuPercent || 0 }}%</span>
                </p>
              </div>
            </div>
            <div class="left-bottom-item">
              <p class="left-bottom-item-icon" />
              <div class="left-bottom-item-right">
                <p class="left-bottom-item-name">DTU（台）</p>
                <p class="left-bottom-item-num" @click="openTableDialog(1, 2, null)">
                  <span class="pointer">{{ rightTwoCountObj.dtuCount || 0 }}</span>
                  <span>/</span>
                  <span>{{ rightTwoCountObj.dtuPercent || 0 }}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 遥控实验终端数 -->
    <div class="right-three">
      <com-title title-name="遥控试验（年度）">
        <div slot="headRight" class="head-right-box">
          <div class="report" @click="openTableDialog(3)">
            <div class="img-box">
              <!-- <img src="@/assets/img/NX/report_icon.png" alt=""> -->
            </div>
            <span>报表</span>
          </div>
          <el-divider direction="vertical" />
          <img
            id="rightHint2"
            class="head-hint"
            src="../../imgs/common/icon-hint.png"
            alt=""
            @click="showTips(2)"
          >
        </div>
        <div slot="titleBody" class="body-box">
          <div class="right-bottom-top">
            <div class="right-bottom-top-text">
              <p>遥控进度</p>
              <p class="right-bottom-top-num">40.32<span>%</span></p>
            </div>
            <div class="right-bottom-progress-box">
              <div class="right-bottom-progress" />
            </div>
          </div>
          <div class="right-bottom-li">
            <div class="right-bottom-item">
              <div class="right-bottom-item-left">
                <!-- <img src="@/assets/img/NX/right-bottom-li-active.png" alt=""> -->
                <p>已遥控开关数</p>
              </div>
              <p class="right-bottom-item-num" @click="openTableDialog(4, 2, 1)">80<span>台</span></p>
            </div>
            <div class="right-bottom-item">
              <div class="right-bottom-item-left">
                <!-- <img src="@/assets/img/NX/right-bottom-li.png" alt=""> -->
                <p>未遥控开关数</p>
              </div>
              <p class="right-bottom-item-num">80<span>台</span></p>
            </div>
          </div>
        </div>
      </com-title>
    </div>

    <!-- FTU的弹框 -->
    <!--FTU的弹框\ DTU的弹框 -->
    <!-- <rightDtuDialog ref="rightDtuDialog" /> -->
    <!-- 遥控试验弹框 -->
    <!-- <remoteControlReport ref="remoteControlReport" /> -->
    <!-- 已遥控开关 -->
    <!-- <remoteSwitch ref="remoteSwitch" /> -->
    <!-- 遥控指标统计 -->
    <div v-show="rightHint1Show" class="hint-common attention-tips rightHint1">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p>该部分算法待定</p>
        <!-- <p>联络率=具备联络线路数/线路总数; -->
        <!-- <span>中压二次设备：</span> -->
        <!-- </p>
        <p>一键转负荷测试进度=一键转负荷测试线路数/具备联络线路数;</p> -->
      </div>
    </div>
    <!-- 遥控试验终端 -->
    <div v-show="rightHint2Show" class="hint-common attention-tips rightHint2">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p>遥控进度=遥控开关数/(遥控开关数+未遥控开关数);</p>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
#diversion-analysis-right {
  width: 420px;
  // width: 21.87%;
  height: calc(100% - 40px);
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9;
  .body-box {
    width: 100%;
    height: 100%;
  }

  //
  .right-two {
    width: 100%;
    // height: calc((100% - 248px) / 2);
    height: calc((74.89% - 32px) / 2);
    margin: 16px 0;
    .body-box {
      display: flex;
      justify-content: space-between;
    }
    .left-bottom-left {
      width: 48%;
      height: 100%;
      position: relative;
    }
    .left-bottom-right {
      width: calc(52% - 20px);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .left-bottom-echart-bg {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .left-bottom-echart-icon {
      width: 34px;
      height: 34px;
      line-height: 34px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      font-family: PangMenZhengDao;
      @include font_color("font_color_white");
      cursor: pointer;
    }
    #functionalTerminalEchart {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 180px;
      height: 180px;
    }
    .left-bottom-item {
      width: 100%;
      height: 80px;
      @include background("background4");
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      margin-bottom: 20px;

      .left-bottom-item-icon {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .left-bottom-item-name {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      @include font_color("font_color_gray");
      margin-bottom: 10px;
    }
    .left-bottom-item-num {
      font-size: 18px;
      font-family: DIN;
      font-weight: 400;
      @include font_color("font_color_blue");
      cursor: pointer;
    }
    .left-bottom-item:nth-child(1) {
      .left-bottom-item-icon {
        @include background("font_color_blue");
      }
      .left-bottom-item-num {
        @include font_color("font_color_blue");
      }
    }
    .left-bottom-item:nth-child(2) {
      margin-bottom: 0px;
      .left-bottom-item-icon {
        @include background("font_color_yellow");
      }
      .left-bottom-item-num {
        @include font_color("font_color_yellow");
      }
    }
  }
  .right-three {
    width: 100%;
    // height: calc((100% - 248px) / 2);
    height: calc((74.89% - 32px) / 2);
    .head-right-box {
      display: flex;
      align-items: center;
    }
    .report {
      font-family: Microsoft YaHei;
      font-size: 14px;
      display: flex;
      align-items: center;
      .img-box {
        width: 16px;
        height: 16px;
        background: rgba(35, 196, 253, 0.2);
        margin-right: 5px;
        border-radius: 50%;
        text-align: center;
        img {
          width: 75%;
          height: 75%;
        }
      }
    }
    .body-box {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
    .right-bottom-top {
      width: 100%;
      margin-bottom: 15px;
      height: 60px;
      // height: 95px;
      // display: flex;
      // justify-content: space-between;
    }
    .right-bottom-progress-box {
      width: 100%;
      height: 16px;
      background: rgba(23, 123, 104, 0.2);
    }
    .right-bottom-progress {
      border-left: 2px solid;
      @include border_color("font_color_green");
      height: 100%;
      background: linear-gradient(
        270deg,
        #00ffd5 0%,
        rgba(0, 255, 213, 0.2) 100%
      );
    }
    .right-bottom-top-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 700;
      font-size: 14px;
      @include font_color("font_color_white");
      margin-bottom: 12px;
      .right-bottom-top-num {
        font-family: DINPro, DINPro;
        font-weight: 700;
        font-size: 24px;
        @include font_color("font_color_green3");
        span {
          font-weight: 400;
          font-size: 15px;
        }
      }
    }
    .right-bottom-li {
      width: 100%;
      height: calc(100% - 75px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right-bottom-item {
      width: 100%;
      height: 64px;
      background: url("../imgs/right/right-bottom-bg.png") no-repeat;
      background-size: 100% 100%;
      padding-left: 16px;
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;
      .right-bottom-item-left {
        display: flex;
        align-items: center;
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
        font-size: 14px;
        @include font_color("font_color_white");
        img {
          width: 48px;
          height: 48px;
          margin-left: -12px;
          margin-top: 8px;
        }
      }
      .right-bottom-item-num {
        font-family: DINPro, DINPro;
        font-weight: 700;
        font-size: 20px;
        @include font_color("font_color_green3");
        cursor: pointer;
        span {
          font-family: Microsoft YaHei, Microsoft YaHei;
          font-weight: 400;
          font-size: 10px;
          margin-left: 2px;
        }
      }
    }
    .right-bottom-item:nth-child(2) .right-bottom-item-num {
      @include font_color("font_color_white");
    }
  }
  .pointer {
    cursor: pointer;
  }
  .hint-common {
    position: absolute;

    width: 360px;
    height: auto;
    background: #021736;
    box-shadow: inset 0px 0px 20px 0px rgba(35, 196, 253, 0.5);
    @include box_shadow("box_hint_shadow");
    z-index: 99999999;
    border-radius: 10px;
    padding: 20px;
    .hint-head {
      width: 100%;
      height: 14px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(180deg, #a3d4fa 0%, #1c9afa 100%);
        margin-right: 8px;
      }
    }
    .hint-text {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      color: #ccd0d4;
      line-height: 24px;
    }
    .hint-text2 {
      background: linear-gradient(
        180deg,
        rgba(0, 155, 255, 0) 0%,
        rgba(0, 155, 255, 0.05) 100%
      );
      border: 1px solid;
      border-image: linear-gradient(
          180deg,
          rgba(0, 155.00000596046448, 255, 0.4000000059604645),
          rgba(0, 155.00000596046448, 255, 0),
          rgba(0, 155.00000596046448, 255, 0)
        )
        1 1;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      color: #ccd0d4;
      line-height: 24px;
      padding: 16px;
      padding-bottom: 0px;
      span {
        color: #23c4fd;
      }
      p {
        margin-top: 16px;
      }
      p:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
  .rightHint1 {
    right: 420px;
    top: 0px;
  }
  .rightHint2 {
    right: 420px;
    top: calc((74.89% - 32px) / 2 + 25.11% + 32px);
  }
}
</style>
