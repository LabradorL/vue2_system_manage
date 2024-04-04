import eleTable from '../../../components/ele-table/index.vue'
// import homApi from '@/api/home'
export default {
  components:{ eleTable },
  data(){
    return {
      value1:'',
      tableColumns:[
        { prop:'name', label:'设备名称', width:'' },
        { prop:'faultType', label:'开始时间', width:'' },
        { prop:'occurTime', label:'结束时间', width:'' },
        { prop:'content', label:'异常类型', width:'' }
      ],
      tableData:[],
      // 分页信息
      pagination: {
        pageNum: 1,
        pageSizes: [15, 30, 50],
        pageSize: 15,
        total: 0
      },
      faultId:'',
      feederId:'',
      emptytext:'暂无数据'
    }
  },
  methods:{
    // 关闭弹框时，数据重置
    closeDialog(){
      if (this.querySearch) {
        for (const key in this.querySearch) {
          if (key != 'searchData'){
            this.$set(this.querySearch, key, '')
          } else {
            this.querySearch.searchData=['', '']
          }
        }
      }
      this.pagination={
        pageNum: 1,
        pageSizes: [15, 30, 50],
        pageSize: 15,
        total: 0
      },
      this.feederId=''
      this.faultId=''
    },
    // 列表selection多选回调方法
    selectionChange() { },
    // 每页条数数据切换
    handleSizeChange(val){
      this.pagination.pageSize=val
      this.pagination.pageNum=1
      this.getFaultPointList()
    },
    // 分页切换回调
    handleCurrentChange(val){
      this.pagination.pageNum=val
      this.getFaultPointList()
    },
    // 研判依据
    getFaultPointList() {
      //
      this.emptytext='正在查询中...'
      const param = {
        pageNo: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        faultId: this.faultId
        // feederId:this.feederId,
        // feederId:'3799912186617266225'
      }
      this.emptytext='暂无数据'
      // this.$axios.post(homApi.getFaultPointList, param).then(({ code, data }) => {
      //     //console.log(' ', data)
      //     if (code == 200) {
      //         this.tableData = data.records;
      //         this.pagination.total=data.total;
      //         this.emptytext='暂无数据';
      //     }
      // })
    }

  }
}
