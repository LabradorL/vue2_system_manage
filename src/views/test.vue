<!--
 * @Author: lixiaofeng 1091616642@qq.com
 * @Date: 2022-11-20 19:18:15
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-09-19 18:08:24
 * @Description: 测试页面
-->
<template>
  <div class="container width1200">
    <div ref="firstRef" class="first" @mousemove="mouseenter">
      <div ref="followRef" class="second" />
    </div>
    <div id="container" ref="cssTestRef3" class="element">
      <!-- 动态style -->
      <div ref="cssTestRef1" class="class-name1">
        '那个人老实忠厚，怀抱布匹来换丝。其实不是真的来换丝，是找个机会谈婚事。送郎君渡过淇水，一直送到顿丘。并非我要拖延约定的婚期而不肯嫁，是因为你没有找好媒人。请郎君不要生气，秋天到了来迎娶。',
        '登上那倒塌的墙壁，遥向复关凝神望。复关没有见到盼望的人，眼泪簌簌掉下来。情郎即从复关来，又说又笑喜洋洋。你用龟板占卜，用蓍草占卦，卜筮的结果没有不吉利。你用车来迎娶，我带上嫁妆嫁给你。',
        '桑树还没落叶的时候，桑叶像水浸润过一样有光泽。唉那些斑鸠呀，不要贪吃桑葚。哎年轻的姑娘们呀，不要沉溺在与男子的情爱中。男子沉溺在爱情里，还可以脱身。女子沉溺在爱情里，就无法摆脱了。',
        '桑树落叶的时候，它的叶子枯黄，纷纷掉落了。自从嫁到你家，多年来忍受贫苦的生活。淇水波涛滚滚，水花打湿了车上的布幔。我女子没有什么差错，男子行为却前后不一致了。男人的爱情没有定准，他的感情一变再变。',
        '婚后多年守妇道，繁重家务劳动没有不干的。起早睡迟，朝朝如此，不能计算了。你的心愿实现后，渐渐对我施凶暴。兄弟不知道我的遭遇，见面时都讥笑我啊。静下心来细细想，只能独自伤心。',
        '当初曾相约和你一同过到老，偕老之说徒然使我怨恨罢了。淇水滔滔终有岸，沼泽虽宽终有尽头。回想少时多欢乐，谈笑之间露温柔。海誓山盟犹在耳，哪里料到你会违反誓言。莫再回想背盟事，既已终结便罢休！' '那个人老实忠厚，怀抱布匹来换丝。其实不是真的来换丝，是找个机会谈婚事。送郎君渡过淇水，一直送到顿丘。并非我要拖延约定的婚期而不肯嫁，是因为你没有找好媒人。请郎君不要生气，秋天到了来迎娶。',
        '登上那倒塌的墙壁，遥向复关凝神望。复关没有见到盼望的人，眼泪簌簌掉下来。情郎即从复关来，又说又笑喜洋洋。你用龟板占卜，用蓍草占卦，卜筮的结果没有不吉利。你用车来迎娶，我带上嫁妆嫁给你。',
      </div>
      <!-- 动态数组class -->
      <div ref="cssTestRef2">2</div>
      <!-- 动态对象class -->
      <div ref="cssTestRef3">3</div>
    </div>
    <div ref="userName">{{ form.username }}</div>
    <el-button @click="changeMsg">Change the Message</el-button>
    <el-form ref="form" :model="form" :inline-message="false" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="username">
        <span slot="label">
          <el-tooltip content="姓名的长度不能超过20个字符" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>姓名
        </span>
        <el-input v-model="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别" class="percent100">
          <el-option
            v-for="item in sexOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄" class="custom-style">
          <span slot="append">岁</span>
        </el-input>
      </el-form-item>
      <el-form-item label="文本内容" prop="longText">
        <el-input
          v-model="form.longText"
          type="textarea"
          resize="none"
          :autosize="{ minRow: 5, maxRow: 10 }"
          placeholder="请输入文本内容"
          maxlength="1000"
          minlength="1"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="时间要求" prop="timeArr">
        <el-date-picker
          v-model="form.timeArr"
          value-format="yyyy-MM-dd"
          :picker-options="expireTimeOption"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="percent100"
        />
      </el-form-item>
      <el-form-item label="循环周期" prop="age">
        <el-input v-model.number="form.age" placeholder="请输入循环周期">
          <template slot="append">天</template>
          <template slot="prepend">每</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { deepClone } from '@/utils/common'
export default {
  // 组件名称
  name: 'TestPage',
  beforeRouteEnter(to, from, next) {
    console.log('form', from)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    next()
  },
  // 组件状态值
  data() {
    return {
      // 表单参数
      form: {
        username: ''
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度不超过20个字符' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        longText: [
          { required: true, message: '请输入文本内容', trigger: 'blur' }
        ],
        age: [
          {
            required: true,
            message: '请输入循环周期',
            trigger: 'blur'
          },
          {
            pattern: /^\d+$/,
            message: '循环周期必须为非负整数',
            trigger: 'blur'
          }
        ],
        timeArr: [{ required: true, message: '请选择时间', trigger: 'change' }]
      },
      // 设置可选的时间
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      // 性别字典
      sexOptions: [
        { dictValue: '1', dictLabel: '男' },
        { dictValue: '2', dictLabel: '女' }
      ],
      target: null,
      flag: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  beforeCreate() {
    console.log('test beforeCreate')
  },
  created() {
    console.log('test created')
    const map = new Map()
    map.set('key', 'value')
    map.set('ConardLi', 'coder')

    const set = new Set()
    set.add('ConardLi')
    set.add('coder')

    this.target = {
      field1: 1,
      field2: undefined,
      field3: {
        child: 'child'
      },
      field4: [2, 4, 8],
      objEmpty: {},
      empty: null,
      map,
      set,
      bool: new Boolean(true),
      bool1: false,
      num: new Number(2),
      num1: 100,
      str: new String(2),
      str1: 'afrefr',
      symbol: Object(Symbol(1)),
      date: new Date(),
      reg: /\d+/,
      error: new Error(),
      func1: () => {
        let t = 0
        console.log('coder', t++)
      },
      func2: function(a, b) {
        return a + b
      },
      func3: function() {

      }
    }
    // console.log(this.target)
    // console.log(deepClone(this.target))
    // console.log(JSON.parse(JSON.stringify(this.target)))
  },
  beforeMount() {
    console.log('test beforeMount')
  },
  mounted() {
    console.log('test mounted')
    window.onload = () => {
      const container = document.getElementById('container')
      container.addEventListener('mousemove', (e) => {
        console.log('鼠标在动')
        const rect = e.target.getBoundingClientRect()
        // console.log(rect)
        console.log('getComputedStyle:', window.getComputedStyle(container).borderWidth)
        console.log('getComputedStyle:', window.getComputedStyle(container).color)
        console.log('getComputedStyle:', window.getComputedStyle(container).backgroundColor)
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        container.style.setProperty('--x', x + 'px')
        container.style.setProperty('--y', y + 'px')
      })
    }
    const elementRef = this.$refs.cssTestRef1
    // 通过类名修改样式(一般是修改的样式较多)
    elementRef.classList.add('class-name2')


    // 获取的到的style都是空字符串
    const elementStyle = elementRef.style

    // 设置单个属性
    elementStyle.height = '500px'

    // 也可以设置可以变化的属性（就是以--开头的css属性）
    elementStyle.setProperty('--panel-color', '#0EFF00')

    // += 是在原来的元素上添加cssText的样式，原来的样式也保留
    // ;padding 前添加一个分号是为了兼容IE，IE不能实现样式累加
    elementStyle.cssText += ';padding:5px; border:1px solid #000; margin:5px;'
  },
  beforeUpdate: function() {
    console.log('test beforeUpdate')
    console.log(this.form.username)
    console.log(this.$refs['userName'].innerHTML)
  },
  updated: function() {
    console.log('test updated')
    console.log(this.form.username)
    console.log(this.$refs['userName'].innerHTML)
    this.$nextTick(function() {
      //  仅在整个视图都被重新渲染之后才会运行的代码
    })
  },
  beforeDestroy() {
    console.log('test beforeDestroy')
  },
  destroyed() {
    console.log('test destroyed')
  },
  // 被 keep-alive 缓存的组件激活（显示）时调用。",
  activated() {
    console.log('test activated')
  },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() {
    console.log('test deactivated')
  },
  // 方法
  methods: {
    mouseenter(e) {
      // console.log(e)
      const rootEl = this.$refs.followRef
      const rect = e.target.getBoundingClientRect()
      // console.log(rect)
      const mouseX = e.clientX
      const mouseY = e.clientY
      const x = e.clientX - rect.left - 250
      const y = e.clientY - rect.top - 200
      rootEl.style.setProperty('--x', x + 'px')
      rootEl.style.setProperty('--y', y + 'px')
      rootEl.style.setProperty('--mouse-x', mouseX)
      rootEl.style.setProperty('--mouse-y', mouseY)
      rootEl.style.setProperty('--panel-color', '#0EFF00')
      rootEl.style.setProperty('--opacity', 0.3)
      this.$refs.firstRef.style.transform = 'perspective(700px) rotateX(-0.10deg) rotateY(-2.0deg)'
      // this.$refs.firstRef.$el.style.cssText ='transform: perspective(700px) rotateX(-0.10deg) rotateY(-20deg)'
    },
    changeMsg() {
      // this.form.username = 'lxf'
      const that = this
      this.$nextTick(function() {
        //  仅在整个视图都被重新渲染之后才会运行的代码
        console.log(that.$refs['userName'].innerHTML + 'changeMsg')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.container {
  // background: #f5f5f5;
  .header {
    padding: 0 20px;
    background: #f8f8f8;
    overflow: hidden;
  }
  .content {
    display: flex;
    height: calc(100vh - 230px);
    .left {
      width: 300px;
      background: #fff;
      margin-right: 20px;
      .title {
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        border: 1px solid #e1e2e8;
      }
      .type-box {
        color: #222a35;
        cursor: pointer;
        li {
          height: 60px;
          line-height: 60px;
          border: 1px solid #e1e2e8;
          text-align: center;
          border-top-width: 0px;
          border-radius: 5px;
        }
        .active {
          background: #2aa795;
          color: #fff;
        }
      }
    }
    .right {
      width: 100%;
      background: #fff;
      padding: 0 20px 20px 50px;
      overflow: auto;
      .el-divider {
        width: 300px;
        margin: 24px auto;
      }
      .question {
        height: 40px;
        line-height: 40px;
        position: relative;
        padding: 0 10px 0 30px;
        background: #2aa795;
        color: #fff;
        &:after {
          content: "Q";
          position: absolute;
          top: 6px;
          left: -32px;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 50%;
          background: #409eff;
        }
      }
      .answer {
        position: relative;
        padding: 10px 10px 10px 30px;
        line-height: 22px;
        background: #f5f5f5;
        margin-top: 10px;
        font-size: 14px;
        &:after {
          content: "A";
          position: absolute;
          bottom: 6px;
          left: -32px;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 50%;
          background: #f5f5f5;
        }
        .collapse {
          position: absolute;
          right: 10px;
          bottom: 5px;
          color: #409eff;
          cursor: pointer;
          font-size: 14px;
        }
        .oneRow {
        }
      }
      .oneRow {
        width: 100%;
        height: 22px;
        overflow: hidden;
        white-space: nowrap;
        padding-right: 30px;
        text-overflow: ellipsis;
      }
    }
  }
}

.first {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  transform: perspective(700px) rotateX(-0.63deg) rotateY(-1.07deg);
  background-color: skyblue;
}
.second {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  &::before {
    background-color: var(--panel-color);
    border-radius: 350px;
    content: "";
    filter: blur(180px);
    height: 400px;
    left: var(--x);
    top: var(--y);
    mix-blend-mode: normal;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transform: translate(
      calc(var(--mouse-x) - 50%),
      calc(var(--mouse-y) - 50%)
    );
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    width: 500px;
    will-change: transform, opacity;
    z-index: 0;
  }
}
.second:hover::before {
  opacity: var(--opacity);
}

#container {
  width: 1200px;
  height: 300px;
  border: 20px solid skyblue;
  margin-left: 10px;
  margin-bottom: 700px;
  background-color: #202344;
  position: relative;
  --x: 0px;
  --y: 0px;
  overflow: auto;
  // box-sizing: content-box;
  .test-getBoundingClientRect {
    height: 100%;
    overflow: auto;
    color: #fff;
    line-height: 22px;
  }
}
// #container:before {
//   content: "";
//   position: absolute;
//   left: var(--x);
//   top: var(--y);
//   width: 0;
//   height: 0;
//   background: radial-gradient(circle closest-side, pink, transparent);
//   transform: translate(-50%, -50%);
// }
// #container:hover:before {
//   width: 50px;
//   height: 50px;
// }

.class-name1 {
  height: 180px;
  line-height: 30px;
  background: rgb(210, 240, 41);
}
.class-name3 {
  background: greenyellow;
}
</style>

