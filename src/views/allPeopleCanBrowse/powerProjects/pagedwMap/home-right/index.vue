<template>
  <div id="diversion-analysis-right">
    <!-- 线路异常区域分析 -->
    <div class="abnormal-right-item right-one mb-16">
      <com-title title-name="线路异常区域分析">
        <div slot="headRight" class="head-right-box">
          <div
            v-for="item in lineAbnormalOptions"
            :key="item.type"
            :class="[
              'head-right-unit',
              activeLineAbnormal === item.value ? 'head-right-unit-active' : '',
            ]"
            @click="changeAnomaliesType(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
        <div slot="titleBody" class="left-bottom body-box">
          <div class="left-bottom-list">
            <div
              v-for="(item, index) in lineAbnormalList"
              :key="index"
              class="right-top-item"
            >
              <p class="right-top-item-name">{{ item.shortName }}</p>
              <div class="right-top-item-progress-box">
                <div
                  class="right-top-item-progress"
                  :style="{width: `${lineTotal == 0 ? '0' : ((item.num/lineTotal * 100).toFixed(2))}%`}"
                />
              </div>
              <p class="right-top-item-num">
                {{ item.num }}<span>次</span>
              </p>
            </div>
          </div>
        </div>
      </com-title>
    </div>
    <!-- 具备遥控功能的终端 -->
    <div class="right-two">
      <com-title title-name="具备遥控功能的终端">
        <div slot="titleBody" class="body-box">
          <div class="left-bottom-left">
            <div id="functionalTerminalEchart" />
            <img
              class="left-bottom-echart-bg"
              src="../imgs/right/echart-bg.png"
              alt=""
            >
            <p
              class="left-bottom-echart-icon"
              @click="openTableDialog(1, 0, null)"
            >
              {{ rightTwoCountObj.total || 0 }}
            </p>
          </div>
          <div class="left-bottom-right">
            <div class="left-bottom-item">
              <p class="left-bottom-item-icon" />
              <div class="left-bottom-item-right">
                <p class="left-bottom-item-name">FTU（台）</p>
                <p
                  class="left-bottom-item-num pointer"
                  @click="openTableDialog(1, 1, null)"
                >
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
                <p
                  class="left-bottom-item-num"
                  @click="openTableDialog(1, 2, null)"
                >
                  <span class="pointer">{{
                    rightTwoCountObj.dtuCount || 0
                  }}</span>
                  <span>/</span>
                  <span>{{ rightTwoCountObj.dtuPercent || 0 }}%</span>
                </p>
              </div>
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
  .head-right-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .head-right-unit {
      margin-right: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: bold;
      @include font_color("font_color_white");
      width: 32px;
    }
    .head-right-unit-active {
      @include font_color("font_color_blue");
    }
    .head-right-unit:last-child {
      margin-right: 0px;
    }
    .el-select {
      .el-input__inner {
        border: none;
        font-family: Microsoft YaHei;
        font-size: 14px;
        text-align: right;
      }
      .el-input {
        .el-select__caret {
          // @include font_color("cont_color_blue");
          color: #23c4fd;
        }
      }
    }
  }

  .abnormal-right-item {
    width: 100%;
    height: calc((100% - 16px) / 2);
    .left-bottom-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .right-top-item {
        width: 100%;
        height: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right-top-item-name {
          width: 64px;
          height: 26px;
          position: relative;
          // background: url("../../../assets/img/NX/insulation-warning-name-bg.png");
          // background-size: 100% 100%;
          @include font_color("font_color_white");
          text-align: center;
          line-height: 26px;
          font-size: 16px;
          // font-family: PangMenZhengDao, PangMenZhengDao-3;
          font-weight: 400;
        }
        .right-top-item-num {
          width: 64px;
          height: 26px;
          line-height: 26px;
          text-align: right;
          @include font_color("font_color_blue5");
          font-size: 20px;
          font-family: PangMenZhengDao, PangMenZhengDao;
          font-weight: 400;
          //display: flex;
          //align-items: center;
          //justify-content: end;
          span {
            font-size: 10px;
            margin-left: 4px;
          }
        }
        .right-top-item-progress-box {
          width: calc(100% - 168px);
          .right-top-item-progress {
            height: 6px;
            background: linear-gradient(90deg, #23c4fd 0%, #9de5ff 100%);
            position: relative;
          }
          .right-top-item-progress::before {
            position: absolute;
            right: -1px;
            top: -2px;
            content: "";
            width: 10px;
            height: 10px;
            background: linear-gradient(90deg, #b5ecff 0%, #ffffff 100%);
            border-radius: 50%;
            // z-index: 9;
          }
          .right-top-item-progress::after {
            position: absolute;
            right: 0;
            content: "";
            width: 12px;
            height: 12px;
            background: linear-gradient(
              90deg,
              rgba(181, 236, 255, 0.5) 0%,
              rgba(35, 196, 253, 0.5) 100%
            );
            border-radius: 50%;
            filter: blur(6px);
          }
        }
      }
    }
  }
  .abnormal-right-item.right-one {
    .left-bottom-list {
      .right-top-item {
        .right-top-item-name {
          // background: url("../../../assets/img/NX/insulation-warning-name-bg2.png");
          // background-size: 100% 100%;
          @include font_color("font_color_white");
        }
        .right-top-item-num {
          @include font_color("font_color_yellow");
        }
        .right-top-item-progress-box {
          width: calc(100% - 168px);
          .right-top-item-progress {
            height: 6px;
            background: linear-gradient(90deg, #fdc345 0%, #ffe09c 100%);
            position: relative;
          }
          .right-top-item-progress::before {
            position: absolute;
            right: -1px;
            top: -2px;
            content: "";
            width: 10px;
            height: 10px;
            background: linear-gradient(270deg, #ffe09c 0%, #ffffff 100%);
            border-radius: 50%;
            // z-index: 9;
          }
          .right-top-item-progress::after {
            position: absolute;
            right: 0;
            content: "";
            width: 12px;
            height: 12px;
            background: linear-gradient(
              270deg,
              rgba(255, 224, 156, 0.5) 0%,
              rgba(253, 195, 69, 0.5) 100%
            );
            border-radius: 50%;
            filter: blur(6px);
          }
        }
      }
    }
  }
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
