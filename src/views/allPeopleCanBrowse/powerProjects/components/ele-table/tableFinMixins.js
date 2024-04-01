// import httpRequest from '@/server/index';
export default {
  data() {
    return {
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 4,
        pageSizes: [10, 20, 30, 40, 50]
      },
      // 表格数据
      dataList: [],
      // 返回参数字段名
      dataKey: 'dataKey'
    };
  },
  methods: {
    handleQuery() {
      const { pageNum, pageSize } = this.pagination;
      // tableListUrl 封装的接口名
      // httpRequest({
      //   url: `/digital/treeTableController/queryMapTree`,
      //   method: 'post',
      //   data: {
      //     ...this.formData,
      //     pageNum,
      //     pageSize
      //   }
      // }).then(res => {
      //   if (!res) return;
      //   this.pagination.total = res.pageParam ? res.pageParam.total : 0;
      //   this.dataList = res[this.dataKey];
      // });
    },
    // 查询列表
    queryHandle() {
      const data = this.formData;
      // 时间处理
      if (data.timeRange && data.timeRange.length !== 0) {
        data.startTime = data.timeRange[0];
        data.endTime = data.timeRange[1];
      } else {
        data.startTime = null;
        data.endTime = null;
      }
      this.pagination.pageNum = 1;
      this.handleQuery();
    },
    // 重置列表
    resetHandle() {
      const data = this.formData;
      Object.keys(data).forEach(key => {
        data[key] = null;
      });
      this.pagination.pageNum = 1;
      this.handleQuery();
    },
    // 改变页码
    handlePageChange(page) {
      this.pagination.pageNum = page;
      this.handleQuery();
    },
    // 改变页数
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.pageNum = 1;
      this.handleQuery();
    }
  }
};
