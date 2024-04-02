<template>
  <div id="content-left-box" class="warning-left-box">
    <!-- 融合终端配变异常分析 -->
    <div class="content-left-li content-left-li-one">
      <com-title title-name="融合终端配变异常分析">
        <div slot="headRight" class="head-right-box">
          <img
            id="terminalAbnormalTips"
            class="head-hint"
            src="../../imgs/common/icon-hint.png"
            alt=""
            @click="showTips('terminalAbnormalTips')"
          >
        </div>

        <div slot="titleBody" class="left-center body-box">
          <div class="total-statistics">
            <div class="left-center-item-left">
              <img
                src="../imgs/left/left-two-total-bg.png"
                alt=""
                class="img-size"
              >
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('terminal','', '0')"
                >
                  {{ terminalAbnormalInfo.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('terminal','', '1')"
                >
                  {{ terminalAbnormalInfo.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
          <div class="left-center-item">
            <div class="left-center-item-left">
              <p class="type">重载</p>
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数：</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('terminal', '2', '0')"
                >
                  {{ terminalAbnormalInfo.heavyoadLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('terminal', '2', '1')"
                >
                  {{ terminalAbnormalInfo.heavyoadLine.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
          <div class="left-center-item">
            <div class="left-center-item-left">
              <p class="type">过载</p>
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数：</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('terminal', '1', '0')"
                >
                  {{ terminalAbnormalInfo.overloadLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('terminal', '1', '1')"
                >
                  {{ terminalAbnormalInfo.overloadLine.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
          <div class="left-center-item">
            <div class="left-center-item-left">
              <p class="type three-type">三相不平衡</p>
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数：</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('terminal', '3', '0')"
                >
                  {{ terminalAbnormalInfo.threePhaseLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('terminal', '3', '1')"
                >
                  {{ terminalAbnormalInfo.threePhaseLine.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
          <div class="left-center-item">
            <div class="left-center-item-left">
              <p class="type">低电压</p>
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数：</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('terminal', '5', '0')"
                >
                  {{ terminalAbnormalInfo.lowPowerLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('terminal', '5', '1')"
                >
                  {{ terminalAbnormalInfo.lowPowerLine.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>

    <!-- 覆盖率统计 -->
    <div class="left-two">
      <com-title title-name="覆盖率统计">
        <div slot="headRight" class="head-right-box">
          <img
            id="hintFaultLineR1"
            class="head-hint"
            src="../../imgs/common/icon-hint.png"
            alt=""
            @click="hintShow(1)"
          >
        </div>
        <div slot="titleBody" class="left-bottom body-box">
          <div class="right-top-item">
            <div class="right-top-item-left">
              <img src="../../imgs/common/icon-monitor-bottom-bg.png" alt="">
              <!-- <p class="right-top-item-left-num">{{runInfo.fdl || 0}}</p> -->
              <p class="right-top-item-left-num">93.78</p>
              <p class="right-top-item-left-name">线路覆盖率</p>
            </div>
            <div class="right-top-item-right">
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  线路数/条 <span>2059</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 93.78%"
                  />
                </div>
              </div>
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  自动化线路数/条 <span>1931</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 6.28%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="right-top-item">
            <div class="right-top-item-left">
              <img src="../../imgs/common/icon-monitor-bottom-bg.png" alt="">
              <p class="right-top-item-left-num">88.06</p>
              <p class="right-top-item-left-name">开关覆盖率</p>
            </div>
            <div class="right-top-item-right">
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  开关数/台 <span>45220</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 88.06%"
                  />
                </div>
              </div>
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  自动化开关数/台 <span>39820</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 11.94%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="right-top-item">
            <div class="right-top-item-left">
              <img src="../../imgs/common/icon-monitor-bottom-bg.png" alt="">
              <p class="right-top-item-left-num">29.95</p>
              <p class="right-top-item-left-name">融合终端覆盖率</p>
            </div>
            <div class="right-top-item-right">
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  配变数/台 <span>172024</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 29.95%"
                  />
                </div>
              </div>
              <div class="right-top-item-right-li">
                <p class="right-top-item-right-li-text">
                  融合终端数/台 <span>51518</span>
                </p>
                <div class="right-top-item-right-li-progressBox">
                  <p
                    class="right-top-item-right-li-progress"
                    style="width: 70.05%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 线路异常分析弹框 -->
    <!-- <lineTableDialog ref="lineTableDialog" @gisMap="gisMap" /> -->

    <!-- 融合终端配变异常分析弹框 -->
    <!-- <fusionTerminalTableDialog
      ref="influenceTqTableDialog"
      @gisMap="gisMap"
    /> -->

    <!-- 线路异常分析提示框 -->
    <div v-show="lineAbnormalTips" class="hint-common left-one-hint">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p><span>总数：</span>当天发生停电总数。</p>
        <p><span>当前：</span>当天发生未复电停电数。</p>
      </div>
    </div>
    <!-- 融合终端配变异常分析提示框 -->
    <div v-show="terminalAbnormalTips" class="hint-common left-two-hint">
      <div class="hint-head"><span />涉及算法和业务规则</div>
      <div class="hint-text2">
        <p><span>总数：</span>当天发生异常总数。</p>
        <p><span>当前：</span>当天发生未结束异常数。</p>
      </div>
    </div>
  </div>
</template>
<script src="./index.js" />

<style lang="scss" scoped>
// @import "./index.scss";
@import "@/assets/styles/themes.scss";

#content-left-box {
  width: 420px;
  height: calc(100% - 40px);
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 40;
}
.warning-left-box {
  .body-box {
    width: 100%;
    height: 100%;
  }
  .content-left-li-one {
    height: calc(55% - 16px);
    margin-bottom: 16px;
  }
  // 线路异常分析
  .left-center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 顶部统计
  .total-statistics {
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    // padding: 12px 20px;
    .left-center-item-left {
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 700;
      font-size: 14px;
      @include font_color("font_color_white");
      text-align: center;
      width: 90px;
      height: 100%;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
      img {
        width: 90px;
        height: 88px;
      }
    }
    .left-center-item-right {
      width: calc(100% - 90px);
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-left: 22px;
      background: url("../imgs/left/left-one-total-bg.png");
      background-size: 100% 100%;
      .left-center-item-li {
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        padding: 5px 0;
      }
      .left-center-item-li-text {
        @include font_color("font_color_white");
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
        font-size: 14px;
      }
      .left-center-item-li-num {
        font-family: PangMenZhengDao;
        font-weight: 400;
        font-size: 20px;
        cursor: pointer;
        span {
          font-family: Microsoft YaHei, Microsoft YaHei;
          font-weight: 400;
          font-size: 10px;
          @include font_color("font_color_blue");
          margin-left: 2px;
        }
      }
      .left-center-item-li-num.color1 {
        @include font_color("font_color_blue");
      }
      .left-center-item-li-num.color2 {
        @include font_color("font_color_yellow");
      }
    }
  }
  .left-center-item {
    width: 100%;
    height: 68px;
    background: url("../imgs/left/left-item-bg.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 12px 20px;
    .left-center-item-left {
      width: 90px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .type {
        // width: 56px;
        width: 100%;
        line-height: 26px;
        // font-family: PangMenZhengDao;
        font-weight: 400;
        font-size: 14px;
        @include font_color("font_color_white");
        text-align: center;
        // background-image: url("../imgs/left/red-bg.png");
        // background-size: 100% 100%;
      }
      .three-type {
        // line-height: 18px;
        // padding: 3px 5px;
      }
    }
    .left-center-item-right {
      width: calc(100% - 90px);
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 22px;
      justify-content: space-around;
      .left-center-item-li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
      }
      .left-center-item-li-text {
        @include font_color("font_color_white");
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 14px;
      }
      .left-center-item-li-num {
        font-family: PangMenZhengDao;
        font-weight: 400;
        font-size: 20px;
        cursor: pointer;
        span {
          font-family: Microsoft YaHei, Microsoft YaHei;
          font-weight: 400;
          font-size: 10px;
          @include font_color("font_color_blue4");
          margin-left: 2px;
        }
      }
      .left-center-item-li-num.color1 {
        @include font_color("font_color_blue");
      }
      .left-center-item-li-num.color2 {
        @include font_color("font_color_yellow");
      }
    }
  }

  // .left-center-item:nth-child(3) {
  //   .left-center-item-left {
  //     .type {
  //       background-image: url("../imgs/left/yellow-bg.png");
  //       background-size: 100% 100%;
  //     }
  //   }
  // }
  // .left-center-item:nth-child(4) {
  //   .left-center-item-left {
  //     .type {
  //       background-image: url("../imgs/left/blue-bg.png");
  //       background-size: 100% 100%;
  //     }
  //   }
  // }


  .left-two {
    width: 100%;
    height: 45%;
    .left-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .right-top-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        .right-top-item-left {
          width: 102px;
          height: 90px;
          position: relative;
          img {
            width: 100%;
            height: 70px;

            z-index: 0;
          }
          .right-top-item-left-num {
            position: absolute;
            top: 10px;
            z-index: 1;
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-family: PangMenZhengDao-Regular, PangMenZhengDao;
            font-weight: 400;
            @include font_color("font_color_blue");
          }
          .right-top-item-left-name {
            width: 100%;
            text-align: center;
            z-index: 1;
            font-size: 14px;
            font-family: Source Han Sans-Bold, Source Han Sans;
            font-weight: 700;
            @include font_color("font_color_white");
          }
        }
        .right-top-item-right {
          width: calc(100% - 118px);
          height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .right-top-item-right-li {
            width: 100%;
            padding-top: 10px;
            .right-top-item-right-li-text {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              @include font_color("font_color_gray");
              margin-bottom: 6px;
              line-height: 14px;
              span {
                font-size: 16px;
                font-family: DIN-Bold, DIN;
                font-weight: 700;
                @include font_color("font_color_white");
              }
            }
            .right-top-item-right-li-progressBox {
              width: 100%;
              height: 10px;
              border-radius: 0px 0px 0px 0px;
              opacity: 1;
              border: 1px solid;
              padding: 2px;
              @include background("background_color_progress1");
              @include border_color("border_color");
              .right-top-item-right-li-progress {
                height: 4px;
                @include background("background_color_progress1_bg");
              }
            }
          }
        }
      }
      // .right-top-item:nth-child(3),.right-top-item:nth-child(4){
      //     .right-top-item-left .right-top-item-left-num{
      //         @include font_color('font_color_yellow');
      //     }
      //     .right-top-item-right{
      //         .right-top-item-right-li .right-top-item-right-li-progressBox{
      //             @include background('background_color_progress2');
      //             @include border_color('border_color2');
      //             .right-top-item-right-li-progress{
      //                 height: 4px;
      //                 @include background('background_color_progress2_bg');
      //             }
      //         }
      //     }
      // }
    }
  }

  .left-one-hint {
    top: 0;
    left: 420px;
  }
  .left-two-hint {
    left: 420px;
    top: 338px;
  }
}
</style>
