<!--
 * @Author: lixiaofeng
 * @Date: 2023-02-13 21:44:09
 * @LastEditTime: 2023-09-11 15:31:40
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: vue-prism-editor vue-prism-editor插件的代码编辑
-->
<template>
  <div>
    <prism-editor v-model="code" class="my-editor height-300" :highlight="highlighter" :line-numbers="lineNumbers" />
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
export default {
  name: 'CodeEditor1',
  components: {
    PrismEditor
  },
  props: {
    codeEditor: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // 双向绑定编辑器内容值属性
    code: '',
    // true为编辑模式， false只展示不可编辑
    lineNumbers: true
  }),
  watch: {
    code(newVal) {
      this.$emit('codeValue', newVal)
    }
  },
  created() {
    if (this.CodeEditor) {
      this.code = this.CodeEditor
    } else {
      this.code = ''
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // returns html
    }
  }
}
</script>

<style lang="css" scoped>
/* required class */
.my-editor {
    background: rgb(65, 54, 114);
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

/* optional */
.prism-editor__textarea:focus {
    outline: none;
}

/* not required: */
.height-300 {
    height: 200px;
}
</style>
