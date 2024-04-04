<template>
  <div>
    <!-- 使用 v-bind和v-on来传递属性和方法-->
    <!-- <el-table v-bind="$attrs" v-on="$listeners">
       -->
    <!-- <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column> -->
    <!-- <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item"> -->
    <!--        <template v-if="item.render" v-slot="scope">-->
    <!--          &lt;!&ndash; 使用函数式组件进行dom渲染 &ndash;&gt;-->
    <!--          <render-dom :render="() => item.render(scope.row)"></render-dom>-->
    <!--        </template>-->
    <!-- </el-table-column> -->
    <el-table
      ref="elTable"
      :data="tableData"
      :border="true"
      :empty-text="emptytext"
      :row-class-name="tableRowClassName"
      style="height: calc(100% - 50px); width: 100%"
      height="calc(100% - 50px)"
      :row-key="rowKey"
      :expand-row-keys="expandKeyList"
      @selection-change="selectionChange"
      @select="selectListChange"
      @sort-change="sortChange"
      @expand-change="expandChange"
      @row-click="expandChange"
    >
      <el-table-column v-if="isExpand" type="expand">
        <template slot-scope="props">
          <slot name="tableExpand" class="id" :data="props.row" />
        </template>
      </el-table-column>

      <el-table-column v-if="isSelection" type="selection" width="50" />
      <el-table-column v-if="isIndex" label="序号" type="index" width="50" />
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :column-key="item.prop"
        show-overflow-tooltip
        :sortable="item.sortable ? item.sortable : false"
        align="center"
        :width="item.width"
        :min-width="item.minWidth"
      >
        <template #default="scope">
          <slot v-if="item.custom" :name="item.prop" :data="scope.row">{{
            scope.row[item.prop]
          }}</slot>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <slot name="columns" />
    </el-table>
    <el-pagination
      v-if="isPagination"
      class="table-pagination"
      :current-page="pagination.pageNum"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      v-bind="$attrs"
      layout="total, prev, pager, next, sizes"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
/**
 * -表格内容的正常显示;
 * 表格内容需要处理后显示（如时间戳转换，枚举值转换等）;
 * 表格添加标签、按钮或者操作列内容显示;
 * 全选功能;
 * 其他原有的属性，如宽度，内容对齐等等属性可以值接使用
 */
export default {
  name: 'EleTable',
  components: {},
  props: {
    // 列表
    // 表格描述  custom:用来标识是否需要自定义
    columns: {
      type: Array,
      required: true
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 是否显示序号
    isIndex: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否显示多选框
    isSelection: {
      type: Boolean,
      required: false,
      default: true
    },
    // 列表内容区域没有数据展示的内容
    emptytext: {
      request: false,
      type: String,
      default: () => {
        return '暂无数据'
      }
    },
    // 分页配置
    pagination: {
      request: false,
      type: Object,
      default: () => {
        return {}
      }
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    height: {
      request: false,
      type: String,
      default: () => {
        return 'calc(100% - 50px)'
      }
    },
    // 是否展开行
    isExpand: {
      type: Boolean,
      default: true
    },
    // 展开行key取数据的字段名
    rowKey: {
      type: String,
      default: 'id'
    }
  },

  data() {
    return {
      expandKeyList: []
    }
  },
  methods: {
    // pageSize 改变时会触发
    handleSizeChange(args) {
      // console.log('columns',this.columns);
      this.$emit('size-change', args)
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      // console.log('columns',this.columns);
      this.$emit('page-change', val)
    },
    // tableRowClassName 表格隔行变色
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? 'white-row' : 'black-row'
    },
    // 多选方法
    selectionChange(row) {
      this.selectionList = row
      this.$emit('selectionChange', row)
    },
    // 选中某一条
    selectListChange(select, row) {
      this.selectionList = select
      this.$emit('selectChange', select, row)
    },
    // 排序
    // column：当前列
    // prop：当前列需要排序的数据
    // order：排序的规则（升序、降序和默认[默认就是没排序]）
    sortChange(column, prop, order) {
      this.$emit('sortChange', column, prop, order)
    },
    // 展开行展开时触发
    expandChange(row, expandedRows) {
      this.expandKeyList = []
      if (expandedRows.length && row) {
        this.expandKeyList = [row[this.rowKey]]
      }
      this.$emit('expandChange', row, expandedRows)
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/mixin.scss";
.el-table {
  background-color: inherit !important;
}
.el-table__expanded-cell {
  background-color: inherit !important;
}
.el-table--border {
  border: 0px !important;
}
.el-table::before,
.el-table--border::after {
  background-color: inherit !important;
}
.el-table th.el-table__cell,
.el-table tr {
  background-color: inherit;
}
.el-table thead tr {
  background-image: url("../../imgs/dialog/table-head-bg.png");
  background-size: 100% 100%;
}
.el-table th.el-table__cell {
  border-bottom: 0px;
  font-size: 14px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: 700;
  @include font_color("font_color_white");
}
.white-row {
  @include background_color("background_color_pagination_bg2");
}
.black-row {
  @include background_color("background_color_pagination_bg");
}
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: initial;
}
.table-pagination {
  text-align: right;
  margin-top: 14px;
  height: 34px;
  padding: 0px 5px;
}
.el-pagination__total {
  @include font_color("font_color_gray");
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
  width: 44px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  @include background_color("background_color_pagination_bg");
  @include font_color("font_color_blue");
  border-radius: 6px 6px 6px 6px;
  padding: 0px;
  margin: 0 5px;
}
.el-pagination .btn-next:disabled,
.el-pagination .btn-prev:disabled {
  background-color: inherit !important;
}
.el-pager li {
  min-width: 44px;
  height: 34px;
  line-height: 34px;
  @include background_color("background_color_pagination_bg");
  border-radius: 6px 6px 6px 6px;
  @include font_color("font_color_gray");
  margin: 0 5px;
}
.el-pager li.active {
  min-width: 44px;
  height: 34px;
  @include background_color("font_color_blue");
  border-radius: 6px 6px 6px 6px;
  line-height: 34px;
  @include font_color("font_color_black");
}
.el-pagination span.el-pagination__sizes:not([class*="suffix"]) {
  width: 98px;
  height: 34px;
  @include background_color("background_color_pagination_bg");
  border-radius: 6px 6px 6px 6px;
  margin-left: 5px;
  padding-right: 5px;
}
.el-pagination .el-select .el-input .el-input__inner {
  border: 0px;
  background: initial !important;
  height: 34px;
  line-height: 34px;
  @include font_color("font_color_gray");
}
.el-pagination__sizes .el-input .el-input__inner:hover {
  border: 0px;
  background: initial !important;
}
.el-pagination__total {
  line-height: 34px !important;
}
//
.el-table td.el-table__cell {
  border: 0px;
}
.el-table th.el-table__cell.is-leaf {
  border-bottom: 0px;
}
.el-table--border .el-table__cell {
  border-right: 1px solid #396197;
}
.el-table--enable-row-transition .el-table__body td.el-table__cell {
  @include font_color("font_color_white");
}

.el-loading-mask {
  background: rgba(0, 0, 0, 0.3);
}
</style>
