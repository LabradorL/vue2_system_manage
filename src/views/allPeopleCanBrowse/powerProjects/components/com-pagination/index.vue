<template>
	<div class="pagination-box">
		<el-pagination
			ref="comPagination"
			background
			prev-text="上一页"
			next-text="下一页"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			:total="total"
			layout=" total,prev, pager, next, jumper,sizes"
		></el-pagination>
	</div>
</template>

<script>
export default {
	name: "ComPagination",
	props: {
		currentPage: {
			required: false,
			default: 1
		},
		pageSize: {
			required: false,
			default: 15
		},
		pageSizes: {
			required: false,
			type: Array,
			default: () => [10, 20, 30, 50]
		},
		total: {
			required: false,
			default: 0
		}
	},
	data () {
		return {};
	},
	methods: {
		//size 变化
		handleSizeChange (val) {
			this.$emit("changeSize", val);
		},
		//当前页变化
		handleCurrentChange (val) {
			this.$emit("changeCurrent", val);
		}
	}

};
</script>

<style scoped>

.pagination-box {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
/*选中状态*/
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
	background: #03547f !important;
}

/deep/ .el-pagination.is-background .el-pager li:not(.active):hover {
	color: #127edb;
}
/*下一页*/
/deep/ .el-pagination.is-background .btn-next {
	background-color: #03547f !important;
	color: #fff !important;
	padding: 0 5px;
}
/*上一页*/
/deep/ .el-pagination.is-background .btn-prev {
	background-color: #03547f !important;
	color: #fff !important;
	padding: 0 5px;
}

/deep/ .el-pagination.is-background .el-pager li {
	margin: 0 5px;
	background-color: #031a46 !important;
	color: #fff;
	min-width: 30px;
	border-radius: 2px;
}
/deep/ .el-pagination__total{
	color: #fff;
}
/deep/ .el-pagination__jump {
	color: #fff;
}
/deep/ .el-input__inner {
	background-color: #031a46;
	border: 1px solid #03547f;
	color: #fff;;
}

.el-pagination__jump {
	margin-left: 0;
}
</style>