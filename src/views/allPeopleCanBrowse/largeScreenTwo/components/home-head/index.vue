<template>
  <div id="cont-head">
    <div class="cont-head-left">
      <areaItem
        ref="areaNames"
        class="area-container"
        @activeArea="activeArea"
        @allData="allData"
      />
      <!-- <div class="top-page-time">
        <el-date-picker
          @change="getTimeChange"
          class="time-change"
          v-model="nowDate"
          type="daterange"
          align="left"
          :clearable="false"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="timeChange"
        >
        </el-date-picker>
      </div> -->
    </div>
  </div>
</template>
<script>
import areaItem from '../area-names/index.vue'
export default {
  components: { areaItem },
  data() {
    let _minDate = 0
    const secondDay = 1000 * 60 * 60 * 24
    return {
      isRestart: false,
      pickerMinDate: '',
      minDate: '',

      timeChange: {
        disabledDate(date) {
          return date.getTime() > Date.now()
          // 最多只能两个月得时间
          // if (_minDate>0) {
          //     return date.getTime() > _minDate + 60*secondDay || date.getTime() < _minDate - 60*secondDay || date.getTime() > date.now||date.getTime() > Date.now()
          // }else {
          //     // 未选择时，单独处理禁止选择当天以后的数据
          //     return date.getTime() > Date.now();
          // }
        },
        onPick({ maxDate, minDate }) {
          // console.log('minDate',minDate);
          _minDate = minDate.getTime()
        }
      },
      nowDate: [
        this.$moment().startOf('month').format('YYYY-MM-DD'),
        this.$moment().format('YYYY-MM-DD')
      ],
      input: '',
      isShowList: false,
      infoList: [],
      message: '暂无数据',
      headItemActive: 0
    }
  },
  mounted() {},
  methods: {
    getTimeChange(res) {
      this.$emit('dateChange', this.nowDate)
    },
    activeArea(data) {
      this.$emit('activeArea', data)
    },
    allData(data) {
      this.$emit('allData', data)
    },
    handleClickOutside() {
      this.isShowList = false
    }
  }
}
</script>
<style scoped lang="scss">
#cont-head {
  width: auto;
  height: 50px;
  position: absolute;
  top: 20px;
  left: 456px;
  right: 456px;
  z-index: 33;
  display: flex;
  justify-content: space-between;
  ::v-deep .el-input__inner,
  ::v-deep .el-input__inner:active,
  ::v-deep .el-input__inner:focus,
  ::v-deep .el-input__inner:hover {
    height: 40px !important;
    line-height: 40px !important;
    color: #fff;
    border-color: #187da3;
   background: #061427;
    box-shadow: inset 0px 0px 10px 0px rgba(54, 124, 255, 0.8);;

    &:focus {
      border-right: 1px solid #2491eb;
      outline: 1px solid #2491eb;
    }
  }
  ::v-deep .search-box .el-input__inner {
    border-right: 0px;
  }
  ::v-deep .el-input-group__append {
    background-color: #03547f;
    border: 1px solid #03547f;
  }

  ::v-deep .el-icon-search {
    color: #fff;
    font-size: 16px;

    &:hover {
      color: #2491eb;
    }
  }
  .cont-head-left {
    display: flex;
    .top-page-time {
      width: 250px;
      .el-date-editor--daterange.el-input__inner {
        width: 100%;
      }
    }
  }
  .cont-head-right {
    width: 248px;
    height: 40px;
    display: flex;
    align-items: center;
    background: url("../../imgs/head/head-item-gzfx.png");
    background-size: 100% 100%;
    .cont-head-item1 {
      width: 50%;
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 290;
     color: #fff;
      cursor: pointer;
    }
    .cont-head-item2 {
      width: 50%;
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
     color: #fff;
      font-weight: 700;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 290;
      cursor: pointer;
    }
  }
  .cont-head-right.active1 {
    background: url("../../imgs/head/head-item-jyyj.png");
    background-size: 100% 100%;
    .cont-head-item1 {
      font-weight: 700;
    }
    .cont-head-item2 {
      font-weight: 290;
    }
  }
  .cont-head-right.active2 {
     background: url("../../imgs/head/head-item-gzfx.png");
    background-size: 100% 100%;
    .cont-head-item1 {
      font-weight: 290;
    }
    .cont-head-item2 {
      font-weight: 700;
    }
  }
  .cont-head-btn {
    width: 110px;
    height: 40px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid;
    border-color: #187da3;
   background: #061427;
    box-shadow: inset 0px 0px 10px 0px rgba(54, 124, 255, 0.8);;
    margin-left: 10px;
    text-align: center;
    line-height: 40px;
    color:#23c4fd;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 14px;
      margin-right: 8px;
      height: auto;
    }
  }
}
.area-container {
  width: 100px;
  height: 40px;
  margin-right: 16px;
}

.list {
  min-width: 300px;
  max-width: 300px;
  transform-origin: center top;
  position: absolute;
  top: 50px;
  right: 0;
  max-height: 182px;
  overflow: auto;
  //border: 1px solid var(--titleBorder);
  background-color: #082640;
  box-sizing: border-box;
  border-radius: 4px;

  .data-item {
    font-size: 14px;
    color: #fff;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background-color: #03547f;
    }
  }

  .no-data {
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 14px;
    color: #fff;
    justify-content: center;
  }
}
</style>
