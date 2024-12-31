<!--
 * @Author: lixiaofeng
 * @Date: 2022-12-13 11:29:28
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-12-31 15:35:18
 * @Description: 实现滚动加载
                 1 表格的滚动加载
                 2 盒子的滚动加载
                 3 下拉框的滚动加载
-->
<template>
  <div class="app-container">
    <el-button class="mb-10" @click="open = true">点击</el-button>
    <div class="flex border-box height370">
      <div class="font-size-14 flex49 mr-20 box-shadow-3 overflow-hidden pb-10">
        <div class="overflow-auto customer-scrollbar height360" @scroll="watchScroll">
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
      <div class="font-size-14 customer-scrollbar flex49 height370">
        <el-table
          ref="warningTable"
          :data="warningList"
          height="360px"
          width="100%"
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
      // 是否正在加载数据
      isLoading: false,

      // 弹框是否显示
      open: false,
      rules: {},
      form:{
        companyId: '',
        userName: '',
        password: '',
        nickName: '',
        phonenumber: '',
        email: '',
        remark: ''
      },
      // 企业名称列表
      companyList: [],
      // 企业懒加载配置项
      lazyOptions: {
        loadData: this.moreData,
        distance: 30,
        scrollBody: '.el-scrollbar__wrap', // 为el-select 滚动容器的DOM元素的class选择器
        callback: (fn) => {
          // 这里是在组件销毁前, 移除监听事件.
          this.$once('hook:beforeDestroy', () => fn())
        }
      },
      // 下拉框滚动信息（每次请求固定条数）
      selectScrollInfo: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        finished: true, // 是否还可以继续加载
        switch: true // 是否在加载中，上锁，防止重复请求
      },

      // 诗歌列表
      writtingList: [],
      // 盒子滚动信息(一次请求所有数据)
      boxScrollInfo: {
        total: 0,
        pageNum: 0,
        pageSize: 15,
        finished: true, // 是否还可以继续加载
        switch: true, // 是否在加载中，上锁，防止重复请求
        startNum: 4, // 一次全请求，默认第一次显示条数
        dataListAll: []
      },

      // 列表数据
      warningList: [],
      // 警告总条数
      warningTotal: 0,
      // 表格框滚动信息
      tableScrollInfo: {}

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
    // 获取更多的数据(下拉框的滚动加载)
    moreData() {
      if (!this.selectScrollInfo.finished && !this.selectScrollInfo.switch) {
        this.selectScrollInfo.switch = true
        // 第一种是全部获取
        // 第二种是分页获取
        this.isLoading = true
        this.getCompanyList()
      }
    },
    // 获取更多的企业列表信息(分页获取)
    getCompanyList() {
      writtingList().then((res) => {
        if (res.code === 200) {
          res.data = [{ companyName: '55企业名称', id: '1016d1ea757246ac8af3cd590bc509d8' },
            { companyName: '企业名称lxf2', id: 'cd1b0edeb7214a8a87bd89cb50048aaa' },
            { companyName: '水调歌头', id: 'f1754abf4e4147c4ad241034722cb463' },
            { companyName: '出师表', id: '1016d1ea757246ac8af3cd590bc509d7' },
            { companyName: '岳阳楼记', id: '1016d1ea757246ac8af3cd590bc509d6' },
            { companyName: '长恨歌', id: '1016d1ea757246ac8af3cd590bc509d5' },
            { companyName: '蜀道难', id: '1016d1ea757246ac8af3cd590bc509d4' },
            { companyName: '桃花源记', id: '1016d1ea757246ac8af3cd590bc509d3' },
            { companyName: '爱莲说', id: '1016d1ea757246ac8af3cd590bc509d2' },
            { companyName: '醉翁亭记', id: '1016d1ea757246ac8af3cd590bc509d1' }
          ]
          res.total = 40
          if (res.data && res.data.length > 0) {
            this.companyList = this.companyList.concat(res.data)
            // this.companyList = [...this.companyList, ...res.data]
            this.selectScrollInfo.total = res.total
            if (res.data.length < this.selectScrollInfo.pageSize || this.companyList.length >= this.selectScrollInfo.total) {
              // 返回结果条数少于请求条数，认为已结束
              // 目前数据条数等于总条数，认为已结束
              this.selectScrollInfo.finished = true
            } else {
              this.selectScrollInfo.finished = false
              this.selectScrollInfo.pageNum += 1 // 页码加1
              this.selectScrollInfo.switch = false // 还可以继续加载，改变锁状态
            }
          }
        }
      })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false
        })
    },

    // 获取诗歌列表（一次性全部获取）
    getWrittingList() {
      const temp = this.boxScrollInfo
      this.isLoading = true
      temp.dataListAll = []
      temp.total = 0
      temp.pageNum = 0
      writtingList().then((res) => {
        temp.dataListAll = res.rows
        temp.total = 80
      }).catch(() =>{
      }).finally(() => {
        this.isContinueGetData()
        this.isLoading = false
      })
    },
    // 监听滚动事件(盒子滚动)
    watchScroll(e) {
      const scrollTop = e.target.scrollTop // listBox 滚动条向上卷曲出去的长度，随滚动变化
      const clientHeight = e.target.clientHeight // listBox 的视口可见高度，固定不变
      const scrollHeight = e.target.scrollHeight // listBox 的整体高度，随数据加载变化
      const saveHeight = 30 // 安全距离，距离底部XX时，触发加载
      const tempVal = scrollTop + clientHeight + saveHeight // 向上卷曲距离 + 视口可见高度 + 安全距离
      // 如果不加入 saveHeight 安全距离，在 scrollTop + clientHeight == scrollHeight 时，触发加载
      // 加入安全距离，相当于在 scrollTop + clientHeight >= scrollHeight - 30 时，触发加载，比前者更早触发
      if (tempVal >= scrollHeight) {
        const temp = this.boxScrollInfo
        console.log('滚动到底了')
        if (!temp.finished && !temp.switch) {
          temp.switch = true // 加锁，防止重复触发
          // 数据加载未结束 && 未加锁
          temp.pageNum++
          this.isContinueGetData()
        }
      }
    },
    // 是否继续加载数据
    isContinueGetData(){
      const temp = this.boxScrollInfo
      if (temp.total > temp.startNum && this.writtingList.length < temp.total) {
        temp.finished = false
        temp.switch = false
        const numIdx = temp.startNum + temp.pageNum * temp.pageSize
        this.writtingList = temp.dataListAll.slice(0, numIdx)
      } else {
        this.finished = true
        this.writtingList = temp.dataListAll
      }
    },

    // 获取报警列表()
    getWarningList() {
      this.isLoading = true
      getTableList().then((res) => {
        this.warningList = [...this.warningList, ...res.rows]
        this.warningTotal = 60
        this.isLoading = false
      })
    },
    // 警告列表滚动加载函数(表格的滚动加载)
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
        // el-table__body-wrapper元素实际的高度（可视高度，随数据加载变化）
        const tableBodyWrapperHeight = tableBodyWrapper.offsetHeight
        // el-table__body的高度(固定不变)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.height370 {
  height: 370px;
}
.height360 {
  height: 360px;
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
