<template>
  <div ref="anchor" class="anchor clearfix">
    <ul class="anchor__nav card">
      <li
        v-for="(item, key) in anchorNavData"
        :key="key"
        :class="{ active: value === key, disabled: item.disabled }"
        @click="arrive(key, item)"
      >
        <i v-if="item.icon" :class="item.icon" />
        <span class="ellipsis" :title="item.label">{{ item.label }}</span>
      </li>
    </ul>
    <div class="anchor__content">
      <slot />
    </div>
  </div>
</template>

<script>
// import utils from '@/utils'
// import { getScrollContainer } from '@/utils/dom'
export default {
  name: 'AnchorCommpont',
  props: {
    // 当前楼层
    value: {
      type: String,
      default: ''
    },
    // 滚动的元素，不传默认取离元素最近的可以滚动的元素
    scrollDom: {
      type: String,
      default: ''
    },
    // 固定（position: fixed）在滚动区域类的高度
    fixedHeight: {
      type: Number,
      default: 54
    },
    // 电梯导航上面元素的总体高度，如果电梯导航是第一个元素不用传
    otherHeight: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      anchorNavData: {}, // 电梯楼层高度的映射
      // scrollFunDebounceFun: utils.vueDebounce('scrollFun', 100),
      valueType: 1, // 当前楼层改变的类型，1是组件传递、按钮直达改变，2是通过滚动监听自动改变
      children: []
    }
  },
  computed: {
    scrollWrap() {
      if (this.scrollDom) {
        return document.querySelector(this.scrollDom)
      }
      // return getScrollContainer(this.$refs.anchor, true)
      return this.$refs.anchor
    }
  },
  watch: {
    // 监听楼层变化，当为父组件传递，或者按钮直达时，手动滚动到当前楼层
    value(val) {
      console.log(val + '-----------------')
      // valueType 1是组件传递、按钮直达改变，2是通过滚动监听自动改变
      if (this.valueType === 1 && this.anchorNavData[val]) {
        const scrollTop = this.getAnchorItemInfo(
          this.anchorNavData[val].dom
        ).scrollTop

        this.scrollElement(scrollTop)
      } else {
        this.valueType = 1
      }
    }
  },
  mounted() {
    this.calcChildren()
    this.init()
    let scrollTop = 0

    if (this.anchorNavData[this.value]) {
      scrollTop = this.getAnchorItemInfo(
        this.anchorNavData[this.value].dom
      ).scrollTop
      this.scrollElement(scrollTop)
    } else {
      scrollTop = this.getScrollTop(this.scrollWrap)
      this.getAnchorValue(scrollTop)
    }
    this.scrollWrap.addEventListener('scroll', this.scrollFunDebounce)
  },
  beforeDestroy() {
    this.scrollWrap.removeEventListener('scroll', this.scrollFunDebounce)
  },
  methods: {
    calcChildren() {
      // 获取指定元素的个数
      const children = this.$slots.default.map((item) => item.componentInstance)

      this.children = this.treeDeep(children)
    },
    treeDeep(data, res = []) {
      data.forEach((item) => {
        if (item.$vnode.tag.indexOf('AnchorItem') > -1) {
          res.push(item)
        } else {
          item.$children &&
            item.$children.length &&
            this.treeDeep(item.$children, res)
        }
      })
      return res
    },
    // 初始化，获取电梯按钮数据
    init() {
      this.children.forEach((item) => {
        this.$set(this.anchorNavData, item.name, {
          dom: item.$el,
          label: item.label,
          icon: item.icon,
          disabled: item.disabled
        })
      })
    },
    /**
     *
     * @param {Dom} e
     * @description 获取元素的scrollTop
     */
    getScrollTop(e) {
      if (e.scrollTop !== undefined) {
        return e.scrollTop
      } else if (e.document) {
        return (
          e.document.documentElement.scrollTop ||
          window.pageYOffset ||
          e.document.body.scrollTop ||
          0
        )
      }
      return e.documentElement.scrollTop || e.body.scrollTop || 0
    },
    // 获取AnchorItem dom 的scrollTop,bottom,height
    getAnchorItemInfo(dom) {
      if (!dom) {
        return {}
      }
      // 此时盒子中元素滚出去的高度
      const scrollTop = this.getScrollTop(this.scrollWrap)
      // 获取dom元素的高度、位置信息
      // rect.top：元素上边到视窗上边的距离;
      // rect.right：元素右边到视窗左边的距离;
      // rect.bottom：元素下边到视窗上边的距离;
      // rect.left：元素左边到视窗左边的距离;
      // rect.width：是元素自身的宽度
      // rect.height是元素自身的高度
      const rect = dom.getBoundingClientRect()
      // console.log(rect.top + scrollTop)
      // console.log('top:' + rect.top)
      // console.log(rect)
      // console.log('scrollTop:' + scrollTop)

      return {
        // height1 = rect.top - this.otherHeight 元素到滚动盒子的高度
        // height2 = height1 - this.fixedHeight 元素距离滚动盒子fixedHeight高时表示滚到指定位置
        // height3 = height2 + scrollTop top 值随着位置的移动会发生变化，height3 代表元素顶部最初距离滚动盒子的高度 即offsetTop
        scrollTop: rect.top - this.otherHeight - this.fixedHeight + scrollTop,
        bottom: rect.bottom - this.fixedHeight + scrollTop,
        height: rect.height // dom 元素的高度
      }
    },

    // 滚动的处理函数
    scrollFun(e) {
      console.log('scroll')
      const scrollTop = this.getScrollTop(e.target)

      this.getAnchorValue(scrollTop)
    },
    // 函数防抖
    scrollFunDebounce(e) {
      // this.scrollFunDebounceFun(e)
      this.scrollFun(e)
    },
    // 根据当前高度获取楼层位置，通过计算每个元素在可视区域的高度，与自身实际高度的占比（全部都不在可视区域为0，全部都在则为1），判断当前处在那个楼层
    getAnchorValue(scrollTop) {
      // scrollTop 元素滚动结束的位置
      // console.log('元素滚动结束的位置' + scrollTop)
      const obj = {}
      // 滚动元素盒子的高度，即 scrollWrap css中height 的高度
      const scrollWrapHeight = this.scrollWrap.getBoundingClientRect
        ? this.scrollWrap.getBoundingClientRect().height
        : this.scrollWrap.innerHeight
      const height = scrollWrapHeight + scrollTop - this.fixedHeight

      for (let i = 0; i < this.children.length; i++) {
        const item = this.getAnchorItemInfo(this.children[i].$el)
        // 在滚动元素中显示元素

        let value = 0
        // 得出 在滚动盒子可视区域的元素 开始

        if (scrollTop <= item.scrollTop) {
          // 假如scrollTop 是第五个元素的位置    则从i=4~最后 此判断都为true
          // 从i=4时 height - item.scrollTop <= scrollWrapHeight
          value = height - item.scrollTop
          value = value > item.height ? item.height : value < 0 ? 0 : value
        } else if (scrollTop > item.scrollTop && scrollTop <= item.bottom) {
          // 第五个元素前面的元素显示出来的高度
          value = item.bottom - scrollTop
          // console.log('i:' + i)
          // console.log(value)
        }
        // 得出 在滚动盒子可视区域的元素 结束

        // 元素高度占value高度得占比 占比越高，说明用户看到此元素得内容最多
        value = value / item.height
        if (obj[value] === undefined) {
          obj[value] = [this.children[i].name]
        } else {
          obj[value].push(this.children[i].name)
        }
      }
      // console.log(obj)
      const maxKey = Math.max(...Object.keys(obj))
      // console.log(maxKey)
      // console.log(obj[maxKey])

      this.valueType = 2
      // // 如果占比相同,则取第一个 后期可以修改下 向下滚动取第一个,向上滚动取最后一个
      this.$emit('input', obj[maxKey][0])
    },
    // 直达楼层
    arrive(name, item) {
      if (name === this.value || item.disabled) {
        return
      }
      this.valueType = 1
      this.$emit('input', name)
    },
    // 模拟滚动
    scrollElement(itemScrollTop) {
      const scrollTop = this.getScrollTop(this.scrollWrap)

      this.scrollAnimation(this.scrollWrap, scrollTop, itemScrollTop)
    },
    /**
     *
     * @param {Dom} el 要滚动的元素
     * @param {Number} start 滚动元素的初始位置
     * @param {Number} end 滚动元素的结束位置
     * @description 滚动动画
     */
    scrollAnimation(el, start, end) {
      let step = 0
      // 根据距离计算步长，表现在先快后慢
      const interval = Math.abs(end - start)

      if (interval > 1000) {
        step = 100
      } else if (interval > 500) {
        step = 50
      } else if (interval > 200) {
        step = 30
      } else {
        step = 20
      }
      if (start < end) {
        start = start + step
        if (start > end) {
          start = end
        }
      }
      if (start > end) {
        start = start - step
        if (start < end) {
          start = end
        }
      }
      el.scrollTo(0, start)
      if (start !== end) {
        requestAnimationFrame(() => {
          this.scrollAnimation(el, start, end)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.anchor__nav.card {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 100px;
  z-index: 10;
  float: left;
  width: 200px;
  padding: 15px 20px;

  li {
    line-height: 20px;
    height: 20px;
    width: fit-content;
    user-select: none;
    margin: 20px 0;
    cursor: pointer;
    &:hover {
      color: skyblue;
    }
    &.active {
      color: skyblue;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    i {
      margin-right: 6px;
      vertical-align: top;
    }
    span {
      display: inline-block;
      max-width: 140px;
    }
  }
}
.anchor__content {
  float: right;
  width: calc(100% - 220px);
}
</style>
