<template>
  <div class="tab-one-box">
    <div :class="['tab-one-top']">
      <!-- 基本信息 -->
      <comTitle titleName="异常信息">
        <div class="body-box" slot="titleBody">
          <!-- <div class="tab-one-item">
            <p class="tab-one-item-name">台区编号</p>
            <p class="tab-one-item-text">{{abnormalInfo.devId || ''}}</p>
          </div> -->
          <div class="tab-one-item">
            <p class="tab-one-item-name">设备名称</p>
            <p class="tab-one-item-text">{{abnormalInfo.name || ''}}</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">所属单位</p>
            <p class="tab-one-item-text">{{abnormalInfo.orgName || ''}}</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">异常类型</p>
            <p class="tab-one-item-text">{{dictFamtter(abnormalInfo.abnormalType) || ''}}</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">{{abnormalTypeMapTable[abnormalInfo.abnormalType]}}</p>
            <p class="tab-one-item-text"><span>{{abnormalInfo.maxLoadRate || ''}}</span></p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">开始时间</p>
            <p class="tab-one-item-text">{{abnormalInfo.startTime || ''}}</p>
          </div>
           <div class="tab-one-item">
            <p class="tab-one-item-name">结束时间</p>
            <p class="tab-one-item-text">{{abnormalInfo.endTime || '-'}}</p>
          </div>
           <div class="tab-one-item">
            <p class="tab-one-item-name">持续时间(分钟)</p>
            <p class="tab-one-item-text">{{abnormalInfo.spanTime || ''}}</p>
          </div>
        </div>
      </comTitle>
    </div>
    <div class="tab-one-bottom-left" style="display:none">
      <comTitle titleName="本次异常">
        <div class="body-box" slot="titleBody">
          <div class="tab-one-item">
            <p class="tab-one-item-name">异常类型</p>
            <p class="tab-one-item-text">231224214</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">最大负载率</p>
            <p class="tab-one-item-text">231224214</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">开始时间</p>
            <p class="tab-one-item-text">231224214</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">结束时间</p>
            <p class="tab-one-item-text">231224214</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">持续时长</p>
            <p class="tab-one-item-text">户</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">影响重要用户</p>
            <p class="tab-one-item-text"><span>233</span>户</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">影响用户</p>
            <p class="tab-one-item-text"><span>233</span>户</p>
          </div>
          <div class="tab-one-item">
            <p class="tab-one-item-name">影响敏感用户</p>
            <p class="tab-one-item-text"><span>233</span>户</p>
          </div>
        </div>
      </comTitle>
    </div>
    <div :class="['tab-one-bottom-right']">
      <comTitle titleName="电流曲线">
        <div class="body-box" slot="titleBody">
          <div class="tab-one-right-top">
            <div class="tab-one-right-item"  v-for="item in abnormalTypeLine[abnormalInfo.abnormalType]" :key="item.title">
              <img
                src="../../imgs/dialog/detail-icon-zdfzl.png"
                alt=""
              />
              <div class="tab-one-right-item-right">
                <div class="tab-one-right-item-head">
                  <p>{{item.title}}</p>
                  <p class="tab-one-right-item-num">{{loadRateInfo[item.fieldName] || ''}}<span>{{item.unit}}</span></p>
                </div>
                <p class="tab-one-right-item-time">
                  发生时间：{{loadRateInfo[item.fieldTime] || ''}}
                </p>
              </div>
            </div>
          </div>
          <div class="tab-one-right-bottom" id="tabOneBottom">
            <div class="tab-one-right-bottom-head">
              <img
                src="../../imgs/dialog/icon-sign.png"
                alt=""
              />
              <p>电流曲线</p>
            </div>
            <div id="oneRightEhart" ref="oneRightEhart"></div>
          </div>
        </div>
      </comTitle>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
<style></style>
