<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="option in options"
        :key="option.item.path"
        :value="option.item"
        :label="option.item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js/dist/fuse.min.js'
import path from 'path'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      // 选择的内容
      search: '',
      // 符合搜索要求的列表
      options: [],
      // 可以搜索的数据列表
      searchPool: [],
      // 判断是否添加样式
      show: false,
      // 创建的 Fuse的实例
      fuse: undefined
    }
  },
  computed: {
    // 获取所有路由
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    // 切换搜索栏
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    // 隐藏搜索栏
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    // 选择的内容发生改变
    change(val) {
      const urlPath = val.path
      if (this.$route.path === val.path) return
      if (this.ishttp(val.path)) {
        // http(s):// 路径新窗口打开
        const pindex = urlPath.indexOf('http')
        window.open(urlPath.substr(pindex, urlPath.length), '_blank')
      } else {
        this.$router.push(val.path)
      }
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        // 是否按匹配度对结果列表进行排序
        shouldSort: true,
        // 匹配算法在什么时候放弃搜索 0 完全匹配时放弃 1可以匹配任何内容
        threshold: 0.4,
        // 预期在文本中找到的模式的大致位置
        location: 0,
        // 在匹配位置的多少字符内匹配完成 如果距离为1000，则需要使用0.8的阈值在要找到的位置的800个字符之内进行完全匹配
        distance: 100,
        // 只返回长度不少于此值的匹配项
        maxPatternLength: 32,
        // 只返回长度超过此值的匹配项
        minMatchCharLength: 1,
        // 搜索哪些关键字
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    // 路由扁平化，筛选出在左侧显示的路由列表
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }

        const data = {
          path: !this.ishttp(router.path)
            ? path.resolve(basePath, router.path)
            : router.path,
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    // 搜索符合要求的数据
    querySearch(query) {
      const that = this
      if (query !== '') {
        this.options = this.fuse.search(query)
        this.options = this.options.filter(
          (item) => item.item && item.item.path !== that.$route.path
        )
      } else {
        this.options = []
      }
    },
    // 判断是否以http/https 开始的路径
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
