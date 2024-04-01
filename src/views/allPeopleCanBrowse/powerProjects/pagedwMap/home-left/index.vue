<template>
  <div id="content-left-box" class="warning-left-box">
    <!-- 线路异常分析 -->
    <div class="content-left-li content-left-li-one">
      <com-title title-name="线路异常分析">
        <div slot="headRight" class="head-right-box">
          <img
            id="lineAbnormalTips"
            class="head-hint"
            src="../../imgs/home/center_left_icon.png"
            alt=""
            @click="showTips('lineAbnormalTips')"
          >
        </div>
        <div slot="titleBody" class="left-center body-box">
          <div class="total-statistics">
            <div class="left-center-item-left">
              <img
                src="../imgs/left/left-one-one.png"
                alt=""
                class="img-size"
              >
            </div>
            <div class="left-center-item-right">
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">总数</p>
                <p
                  class="left-center-item-li-num color1"
                  @click="openTable('line','', '0')"
                >
                  {{ lineAbnormalInfo.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('line','', '1')"
                >
                  {{ lineAbnormalInfo.nowNum || 0 }}<span>次</span>
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
                  @click="openTable('line','2', '0')"
                >
                  {{ lineAbnormalInfo.heavyoadLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('line','2', '1')"
                >
                  {{ lineAbnormalInfo.heavyoadLine.nowNum || 0 }}<span>次</span>
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
                  @click="openTable('line','1', '0')"
                >
                  {{ lineAbnormalInfo.overloadLine.totalNum || 0 }}<span>次</span>
                </p>
              </div>
              <div class="left-center-item-li">
                <p class="left-center-item-li-text">当前：</p>
                <p
                  class="left-center-item-li-num color2"
                  @click="openTable('line','1', '1')"
                >
                  {{ lineAbnormalInfo.overloadLine.nowNum || 0 }}<span>次</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 融合终端配变异常分析 -->
    <div class="content-left-li content-left-li-two">
      <com-title title-name="融合终端配变异常分析">
        <div slot="headRight" class="head-right-box">
          <img
            id="terminalAbnormalTips"
            class="head-hint"
            src="../../imgs/home/center_left_icon.png"
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
  .content-left-top {
    width: 100%;
    height: calc(50% - 20px);
    margin-bottom: 20px;
  }
  .content-left-bottom {
    width: 100%;
    height: 50%;
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
        @include font_color("font_color_blue4");
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

  .left-one-hint {
    top: 0;
    left: 420px;
  }
  .left-two-hint {
    left: 420px;
    top: 338px;
  }
}
.warning-left-box {
  .body-box {
    width: 100%;
    height: 100%;
  }
  .content-left-li {
    width: 100%;
    height: calc((100% - 32px) / 3);
  }
  .content-left-li-one {
    height: 322px;
  }
  .content-left-li-two {
    height: calc(100% - 322px - 16px);
  }
}
</style>
