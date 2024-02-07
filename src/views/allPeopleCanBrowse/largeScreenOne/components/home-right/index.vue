<template>
  <div id="diversion-analysis-right">
    <!-- 停电分析 -->
    <div class="right-one">
      <com-title title-name="停电分析">
        <div slot="headRight" class="head-right-box">
          <div
            v-for="item in cycleList"
            :key="item.type"
            :class="[
              'head-right-unit',
              activeCycle === item.type ? 'head-right-unit-active' : '',
            ]"
            @click="changeAnalysisCycle(item.type)"
          >
            {{ item.name }}
          </div>
        </div>
        <div slot="titleBody" class="right-top body-box">
          <div id="rightTop" ref="rightTop" class="right-top-item-echart" />
        </div>
      </com-title>
    </div>
    <div class="right-two">
      <com-title title-name="异常分析（今日）">
        <div slot="headRight" class="head-right-box" @click="getMore">
          <p class="head-right-unit">更多</p>
          <img src="../../imgs/common/more.png" alt="" class="more">
        </div>
        <div slot="titleBody" class="body-box">
          <div class="right-three-item">
            <div class="right-three-item-left">
              <img src="../../imgs/home/right_bottom_one.png" alt="">
              <p class="right-three-name">线路负<br>荷监测</p>
            </div>
            <div class="right-three-item-right">
              <div class="right-three-li">
                <p class="right-center-li-item-left">过载</p>
                <p class="right-center-li-item-right">
                  <span class="num">10 </span>
                  <span>条</span>
                </p>
              </div>
              <div class="right-three-li">
                <p class="right-center-li-item-left">重载</p>
                <p class="right-center-li-item-right">
                  <span class="num">36 </span>
                  <span>条</span>
                </p>
              </div>
            </div>
          </div>
          <div class="right-three-item">
            <div class="right-three-item-left">
              <p class="right-three-name">台区负<br>荷监测</p>
              <img src="../../imgs/home/right_bottom_two.png" alt="">
            </div>
            <div class="right-three-item-right">
              <div class="right-three-li">
                <p class="right-center-li-item-left">过载</p>
                <p class="right-center-li-item-right">
                  <span class="num">10 </span>
                  <span>条</span>
                </p>
              </div>
              <div class="right-three-li">
                <p class="right-center-li-item-left">重载</p>
                <p class="right-center-li-item-right">
                  <span class="num">36 </span>
                  <span>条</span>
                </p>
              </div>
              <div class="right-three-li">
                <p class="right-center-li-item-left">三相不平衡</p>
                <p class="right-center-li-item-right">
                  <span class="num">10 </span>
                  <span>条</span>
                </p>
              </div>
            </div>
          </div>
          <div class="right-three-item">
            <div class="right-three-item-left">
              <img src="../../imgs/home/right_bottom_three.png" alt="">
              <p class="right-three-name">台区电<br>压监测</p>
            </div>
            <div class="right-three-item-right">
              <div class="right-three-li">
                <p class="right-center-li-item-left">过载</p>
                <p class="right-center-li-item-right">
                  <span class="num">10 </span>
                  <span>条</span>
                </p>
              </div>
              <div class="right-three-li">
                <p class="right-center-li-item-left">重载</p>
                <p class="right-center-li-item-right">
                  <span class="num">36 </span>
                  <span>条</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </com-title>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
