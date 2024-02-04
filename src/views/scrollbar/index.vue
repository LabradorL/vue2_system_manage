<!--
 * @Author: lixiaofeng
 * @Date: 2022-12-13 11:29:28
 * @LastEditors: lixf@863jp.com.cn
 * @LastEditTime: 2023-06-30 17:52:44
 * @Description: 实现滚动加载
                 1 表格的滚动加载
                 2 盒子的滚动加载
                 3 下拉框的滚动加载
-->
<template>
  <div class="app-container">
    <el-button class="mb-10" @click="open = true">点击</el-button>
    <div class="flex border-box height395">
      <div class="font-size-14 flex49 mr-20 box-shadow-3 overflow-hidden pb-10">
        <div class="overflow-auto customer-scrollbar height385">
          <div v-for="(item, index) in writtingList" :key="item.title + index">
            <h3 class="writtingList-title" v-text="item.title" />
            <template v-if="typeof item.content === 'string'">
              <p class="writtingList-content" v-html="item.content" />
            </template>
            <template v-else>
              <p v-for="(itemPar,idx) in item.content" :key="item.title + idx" class="writtingList-paragraph" v-html="itemPar" />
            </template>

            <p class="writtingList-translation" v-html="item.translation" />
          </div>
        </div>
      </div>
      <div class="font-size-14 customer-scrollbar flex49 height395">
        <el-table
          ref="warningTable"
          :data="warningList"
          height="395px"
          width="100%"
          class="pt-14"
        >
          <el-table-column
            type="index"
            label="序号"
            width="55"
            align="center"
          />
          <el-table-column
            prop="shortText"
            label="诗歌名称"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="longText" label="诗歌内容" align="center" />
          <el-table-column prop="time" label="创建时间" align="center">
            <template slot-scope="scope">
              {{ parseTime(scope.row.time, '{y}-{m}-{d} {h}:{i}:{s}') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog title="添加" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业名称">
              <!-- :remote-method="remoteMethod" -->
              <el-select
                v-model="form.companyId"
                v-lazy-load="lazyOptions"
                filterable
                remote
                placeholder="请选择企业名称"
                class="percent100"
              >
                <el-option
                  v-for="(item,index) in companyList"
                  :key="item.id + index"
                  :label="item.companyName + index"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户账号"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户账号"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="open = false">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTableList, writtingList } from '@/api/test'
export default {
  // 组件名称
  name: 'ScrollLoad',
  // 局部注册的组件
  components: {},

  // 组件状态值
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表数据
      warningList: [],
      // 诗歌列表
      writtingList: [],
      // 总数量
      total: 0,
      // 查询参数
      queryParams: { pageNum: 1, pageSize: 10 },
      open: false,
      form: {},
      // 企业名称列表
      companyList: [],
      // 列表总条数
      companyTotal: 0,
      // 是否正在加载数据
      isLoading: false,
      rules: {},
      // 企业懒加载配置项
      lazyOptions: {
        loadData: this.moreData,
        distance: 20,
        scrollBody: '.el-scrollbar__wrap', // 为el-select 滚动容器的DOM元素的class选择器
        callback: (fn) => {
          // 这里是在组件销毁前, 移除监听事件.
          this.$once('hook:beforeDestroy', () => fn())
        }
      },
      // 警告总条数
      warningTotal: 0,
      // 诗歌总条数
      writtingTotal: 0
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    this.getWarningList()
    this.getWrittingList()
    this.getCompanyList()
    console.log('created')
  },
  mounted() {
    // 1.在页面挂在阶段监听el-table组件的滚动事件
    this.$refs.warningTable.$refs.bodyWrapper.addEventListener(
      'scroll',
      this.warningTableScroll
    )
  },
  beforeDestroy() {},
  destroyed() {},
  // 被 keep-alive 缓存的组件激活（显示）时调用。",
  activated(){
    console.log('activated')
  },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated(){
    console.log('deactivated')
  },

  // 方法
  methods: {
    // 获取更多的数据
    moreData() {
      if (!this.isLoading && this.companyList.length < this.companyTotal) {
        // 第一种是全部获取
        // 第二种是分页获取
        this.isLoading = true
        this.getCompanyList()
      }
    },
    // 获取更多的企业列表信息
    getCompanyList() {
      const res = [{ companyName: '55企业名称', id: '1016d1ea757246ac8af3cd590bc509d8' },
        { companyName: '企业名称lxf2', id: 'cd1b0edeb7214a8a87bd89cb50048aaa' },
        { companyName: '水调歌头', id: 'f1754abf4e4147c4ad241034722cb463' },
        { companyName: '出师表', id: '1016d1ea757246ac8af3cd590bc509d7' },
        { companyName: '岳阳楼记', id: '1016d1ea757246ac8af3cd590bc509d6' },
        { companyName: '长恨歌', id: '1016d1ea757246ac8af3cd590bc509d5' },
        { companyName: '蜀道难', id: '1016d1ea757246ac8af3cd590bc509d4' },
        { companyName: '桃花源记', id: '1016d1ea757246ac8af3cd590bc509d3' },
        { companyName: '爱莲说', id: '1016d1ea757246ac8af3cd590bc509d2' },
        { companyName: '醉翁亭记', id: '1016d1ea757246ac8af3cd590bc509d1' }]
      this.companyList = [...this.companyList, ...res]
      this.companyTotal = 40
      this.isLoading = false
    },
    // 获取报警列表
    getWarningList() {
      this.isLoading = true
      getTableList().then((res) => {
        this.warningList = [...this.warningList, ...res.rows]
        this.warningTotal = 60
        this.isLoading = false
      })
    },
    // 警告列表滚动加载函数
    warningTableScroll(e) {
      // 获取到table表格（可视）的dom
      const tableBodyWrapper = e.srcElement
      // 表格body内的元素
      const tableBodyWrapperChildren = this.$refs.warningTable.$refs.bodyWrapper.children
      // tableBodyWrapper.offsetHeight tableBodyWrapper.clientHeight  tableBodyWrapper元素实际的高度 不带px
      // tableBodyWrapper.style.height tableBodyWrapper元素实际高度 带px
      // tableBodyWrapper.scrollTop 元素滚出去的高度
      // 元素滚出去1270px 元素实际高度 1621px 可视高度351px
      // 元素滚出去的高度 + tableBodyWrapper的实际高度（可视高度） = el-table__body的高度
      if (tableBodyWrapperChildren.length) {
        // el-table__body-wrapper元素实际的高度（可视高度）
        const tableBodyWrapperHeight = tableBodyWrapper.offsetHeight
        // el-table__body的高度
        const tableBodyHeight = tableBodyWrapperChildren[0].offsetHeight
        // 元素滚出去的高度
        const scrollTop = tableBodyWrapper.scrollTop
        // 距离底部30px时加载数据
        if (tableBodyHeight - scrollTop- tableBodyWrapperHeight <= 30) {
          // 先判断是否还有数据需要加载
          if (this.warningList.length < this.warningTotal && !this.isLoading) {
            // 下面是table数据源中新添加新的数据
          // this.warningPageNum++
            this.getWarningList()
          }
        }
      }
    },
    // 获取诗歌列表
    getWrittingList() {
      this.isLoading = true
      writtingList().then((res) => {
        this.writtingList = res.rows
        this.writtingTotal = 80
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.height395 {
  height: 395px;
}
.height385 {
  height: 385px;
}
.flex49 {
  flex: 0 0 49%;
}

.writtingList-paragraph {
  margin-left: 2rem;
  padding-left: -2rem;
  line-height: 200%;
}
</style>
