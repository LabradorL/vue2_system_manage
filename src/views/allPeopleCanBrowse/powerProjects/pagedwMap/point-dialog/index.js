import comDialog from "../../components/com-dialog/index.vue";
import comTitle from "../../components/com-title/com-title.vue";
import comPagination from "../../components/com-pagination/index.vue";
import tabOne from "./tab-one/index.vue";
import tabTwo from "./tab-two/index.vue";
// import homApi from "@/api/home";
// import dictOptions from '@/assets/js/dicts'
// import {selectDictLabel} from '@/assets/js/dicts'
export default {
  components: { comDialog, comPagination, tabOne, comTitle, tabTwo },
  data() {
    return {
      dialogTitle: "异常分析详情",
      dialogShow: false,
      tabActive: 0,
      datailIdx: 0,
      detailList: [],
      nowDate: [
        this.$moment().format("YYYY-MM-DD"),
        this.$moment().format("YYYY-MM-DD"),
      ],
      timeChange: {
        disabledDate(date) {
          return date.getTime() > Date.now();
        },
      },
      //分页信息
      pagination: {
        pageNum: 1,
        pageSizes: [5, 10, 15],
        pageSize: 10,
        total: 60,
        layout: "prev,pager,next",
        pagerCount: 5,
        prevText: "<",
        nextText: ">",
      },
      queryParams: {
        channel: null,
        id: null,
        type: null,
      },
    };
  },
  mounted() {},
  methods: {
    initDialog(startTime, endTime, item) {
      // this.dialogTitle = '异常分析详情-' + selectDictLabel(dictOptions.abnormalDevice, item.devType)
      this.startTime = startTime;
      this.endTime = endTime;
      this.datailIdx = 0;
      this.detailList = [];
      this.nowDate = [startTime, endTime];
      this.pagination.total = 0;
      this.pagination.pageNum = 1;
      this.queryParams = {
        channel: item.devType ? item.devType : '',
        id: item.serverTypeID ? item.serverTypeID : '',
        type: item.abnormalType ? item.abnormalType : '',
      };

      this.getData();
    },
    handleClose() {
      this.datailIdx = 0;
      this.detailList = [];
      this.pagination.pageNum = 1;
      this.pagination.total = 0;
      this.dialogShow = false;
    },
    //获取左侧列表
    getData(flag) {
      // flag 是否首次进入
      console.log("异常分析左侧列表");
      let param = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum,
        startDate: this.nowDate ? this.nowDate[0] : "",
        endDate: this.nowDate ? this.nowDate[1] : "",
        ...this.queryParams,
      };
      const data = {
        records: [
          {
            id: "3801319561500824762",
            devId: "3801319561500824762",
            dsName: "固原供电公司",
            xsName: "西吉供电公司",
            gdsName: "田坪供电所",
            name: "张湾变515南岔线姚庄公变",
            abnormalType: 2,
            lon: null,
            lat: null,
            startTime: "2024-03-31 14:52:45",
            endTime: null,
            spanTime: null,
            maxLoadRate: 0.0,
            yxNum: 0,
            orgName: "田坪供电所",
          },
        ],
        total: 1,
        current: 1,
      };
      this.detailList = data.records;
      this.pagination.total = data.total;
      this.pagination.pageNum = data.current;
      this.datailIdx = 0;
      this.$nextTick(() => {
        this.$refs.tabOne.handleOpen(
          this.detailList[0],
          this.nowDate,
          this.queryParams.channel
        );
      });
      // this.$axios
      //   .post(homApi.getAbnoreDetailList, param)
      //   .then(({ code, data }) => {
      //     if (code == 200 && data && data.total) {
      //       this.detailList = data.records;
      //       this.pagination.total = data.total;
      //       this.pagination.pageNum = data.current;
      //       this.datailIdx = 0
      //       this.$nextTick(() => {
      //         this.$refs.tabOne.handleOpen(this.detailList[0], this.nowDate, this.queryParams.channel);
      //       })

      //     }
      //   });
    },
    // 点击左侧某一个卡片
    detailChange(item, index) {
      if (index == this.datailIdx) return;
      this.datailIdx = index;
      this.$refs.tabOne.handleOpen(
        item,
        this.nowDate,
        this.queryParams.channel
      );
    },
    // 时间发生变化
    getTimeChange(res) {
      this.detailList = [];
      this.pagination.pageNum = 1;
      this.pagination.total = 0;
      console.log("选择的时间范围", this.nowDate);
      this.getData(null);
    },
    //分页切换回调
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.getData(null);
    },
    // 异常类型转换
    dictFamtter(val) {
      return '重载'
      // return selectDictLabel(dictOptions.abnormalType, val);
    },
    // tab切换(目前未使用)
    tabClick(type) {
      // this.tabActive = type;
      // this.$nextTick(() => {
      //   if (type == 1) {
      //     this.$refs.tabTwo.faultId = this.faultId;
      //     this.$refs.tabTwo.feederId = this.feederId;
      //     this.$refs.tabTwo.getFaultPointList();
      //   }
      // });
    },
  },
};
