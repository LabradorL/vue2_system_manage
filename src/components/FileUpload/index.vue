<template>
  <div class="upload-file">
    <el-upload
      ref="uploadFile"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :multiple="multiple"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      :accept="uploadFileTypeStr"
      class="upload-file-uploader"
    >
      <!-- 上传按钮 -->
      <div v-if="!isUpload" class="mr-20">
        <el-button
          size="mini"
          type="primary"
          :disabled="isUpload"
        >选取文件</el-button>
        <slot name="tips" />
      </div>

      <!-- <el-button class="ml0" size="mini" type="success" @click="submitUpload" v-if="!autoUpload">上传到服务器</el-button> -->
      <!-- 上传提示 -->
      <div v-if="showTip" slot="tip" class="el-upload__tip inline-block">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </template>
        的文件
      </div>
    </el-upload>
    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        v-for="(file, index) in fileList"
        :key="file.filePath"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <el-link
          :href="file.filePath | pathJoint"
          :underline="false"
          target="_blank"
        >
          <span class="el-icon-document"> {{ file.fileName }} </span>
        </el-link>
        <div v-if="!isUpload" class="ele-upload-list__item-content-action">
          <el-link
            :underline="false"
            type="danger"
            @click="handleDelete(file, index)"
          >删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'FileUpload',
  props: {
    // 值
    value: {
      type: [String, Object, Array],
      default: () => {
        return []
      }
    },
    // 数量限制
    limit: {
      type: Number,
      default: 5
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 50
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'txt',
        'jpg',
        'jpeg',
        'png',
        'pdf',
        'zip',
        'rar'
      ]
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可以上传
    isUpload: {
      type: Boolean,
      default: false
    },
    // 数组名称
    listName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // uploadFileUrl:
      //   process.env.VUE_APP_BASE_API + '/helper/attachment/uploadAttachment', // 上传的图片服务器地址
      uploadFileUrl: 'https://jsonplaceholder.typicode.com/posts/',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [], // 已上传的文件列表
      fileData: new FormData() // 需要上传的文件列表
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize)
    },
    // 文件上传接受的文件格式
    uploadFileTypeStr() {
      const fileTypeStr = this.fileType.map((item) => {
        return '.' + item
      })
      return fileTypeStr.join(',')
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              item = { name: item, url: item }
            }
            item.uid = item.uid || new Date().getTime() + temp++
            return item
          })
        } else {
          this.fileList = []
          return []
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`
          )
          return false
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (file.size === 0) {
          this.$message.error(`不能上传空文件!`)
          return false
        }
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
    },
    // 上传失败
    handleUploadError(err) {
      console.log(err)
      console.log(this.$refs.uploadFile.uploadFiles)
      const idx = this.$refs.uploadFile.uploadFiles.findIndex((item) => {
        return item.response.code !== 200
      }) // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
      this.$refs.uploadFile.uploadFiles.splice(idx, 1) // 关键作用代码，去除文件列表失败文件
      this.$message.error('上传失败, 请重试')
      this.loading.close()
    },
    // 覆盖文件上传函数
    uploadFile(file) {
      // this.fileData.append('files', file.file);  // append增加数据
      // console.log(this.fileData)
      // this.submitUpload()
    },
    // 将文件上传到服务器
    submitUpload() {
      // this.$refs.upload.submit()
    },
    // 上传成功回调
    handleUploadSuccess(res, file, fileList) {
      console.log('uploadsucess')
      if (res.code === 200) {
        this.fileList.push(res.data)
        /* fileList.forEach((item) => {
          if (!item.fileExt) {
            const fileExtension = item.name.slice(
              item.name.lastIndexOf('.') + 1
            ) // 文件拓展名
            const params = {
              // fileName: that.getFileName(item.name),
              fileName: item.name,
              fileSize: item.size,
              fileExt: fileExtension,
              filePath: item.response ? item.response.data.url : ''
            }
            that.fileList.push(params)
          }
        })*/
        this.$message.success('上传成功')
        this.$emit('fileChange', this.fileList, this.listName)
      } else {
        const idx = this.$refs.uploadFile.uploadFiles.findIndex((item) => {
          return item.response.code !== 200
        }) // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        this.$refs.uploadFile.uploadFiles.splice(idx, 1) // 关键作用代码，去除文件列表失败文件
        this.$message.error(res.msg)
      }
      this.loading.close()
    },
    // 删除文件
    handleDelete(file, index) {
      const findex = this.fileList.map((f) => f.name).indexOf(file.name)
      this.fileList.splice(findex, 1)
      this.$emit('fileChange', this.fileList, this.listName)
    },
    // 获取文件名称
    getFileName(name) {
      const filePathArr = name.split('/')
      if (filePathArr.length) {
        // 如果是Linux系统需要再以\\分割一次
        const fileNameArr = filePathArr[filePathArr.length - 1].split('\\')
        const fileExtAndName = fileNameArr[fileNameArr.length - 1].split('.')
        return fileExtAndName[0]
      }
      return ''

      // if (name.lastIndexOf('/') > -1) {
      //   return name.slice(name.lastIndexOf('/') + 1).toLowerCase()
      // }
      // return ''
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (const i in list) {
        strs += list[i].url + separator
      }
      return strs != '' ? strs.substr(0, strs.length - 1) : ''
    }
  }
}
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.el-upload__tip {
  line-height: 18px;
}
.upload-file-list .el-upload-list__item {
  min-width: 400px;
  border: 1px solid #e4e7ed;
  padding-left: 5px;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
