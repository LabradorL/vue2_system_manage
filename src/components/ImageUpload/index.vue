<template>
  <div class="component-upload-image">
    <el-upload
      ref="uploadImg"
      :action="uploadImgUrl"
      :list-type="listType"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      name="file"
      :on-remove="handleRemove"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :accept="uploadFileTypeStr"
      :on-preview="handlePictureCardPreview"
      :class="{
        hide: fileList.length >= limit,
        'el-upload-list--picture-card': true
      }"
    >
      <div slot="file" slot-scope="{ file }">
        <img
          v-if="file.fileExt === 'pdf'"
          class="el-upload-list__item-thumbnail"
          src="@/assets/images/pdf.png"
          :alt="file.fileName"
        >
        <img
          v-else
          class="el-upload-list__item-thumbnail"
          :src="file.filePath | pathJoint"
          :alt="file.fileName"
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
      <el-button size="mini" type="primary">{{ btnText }}</el-button>
    </el-upload>

    <!-- 上传提示 -->
    <div v-if="showTip" slot="tip" class="el-upload__tip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
      </template>
      的文件
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      title="预览"
      width="800"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="min-height: 300px; max-height: 75vh; overflow: auto">
        <!-- <embed
          v-if="dialogImage.fileExt === 'pdf'"
          :src="dialogImage.filePath | pathJoint"
          style="display: block; max-width: 100%; margin: 0 auto; width: 100%"
        > -->
        <iframe
          v-if="dialogImage.fileExt === 'pdf'"
          class="pdf-style"
          :src="dialogImage.filePath | pathJoint"
        />
        <img
          v-else
          :src="dialogImage.filePath | pathJoint"
          style="display: block; max-width: 100%; margin: 0 auto"
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    value: {
      type: [String, Object, Array],
      default: () => {
        return []
      }
    },
    // 图片数量限制
    limit: {
      type: Number,
      default: 5
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 20
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg']
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 上传按钮文字
    btnText: {
      type: String,
      default: '选取文件'
    },
    // 展示格式
    listType: {
      type: String,
      default: 'picture-card'
    },
    // 数组名称
    listName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogImage: '',
      dialogVisible: false,
      hideUpload: false,
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + '/helper/attachment/uploadAttachment', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [],
      errorImg: '@/assets/images/pdf.png'
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
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              item = { name: item, url: item }
            }
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
    // 删除图片
    handleRemove(file, fileList) {
      const findex = this.fileList.map((f) => f.name).indexOf(file.name)
      this.fileList.splice(findex, 1)
      this.$emit('input', this.fileList, this.listName)
    },
    // 上传成功回调
    handleUploadSuccess(res) {
      // this.fileList.push({ name: res.data.url, url: res.data.url })
      if (res.code === 200) {
        this.fileList.push(res.data)
        this.$emit('input', this.fileList, this.listName)
        this.$message.success('上传成功')
        this.loading.close()
      } else {
        const idx = this.$refs.uploadImg.uploadFiles.findIndex((item) => {
          return item.response.code !== 200
        }) // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        this.$refs.uploadImg.uploadFiles.splice(idx, 1) // 关键作用代码，去除文件列表失败文件
        this.$message.error(res.msg)
        this.loading.close()
      }
    },
    // 上传前loading加载
    handleBeforeUpload(file) {
      let isImg = false
      if (this.fileType.length) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        isImg = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
      } else {
        isImg = file.type.indexOf('image') > -1
      }

      if (!isImg) {
        this.$message.error(
          `文件格式不正确, 请上传${this.fileType.join('/')}图片格式文件!`
        )
        return false
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (file.size === 0) {
          this.$message.error(`不能上传空文件!`)
          return false
        }
        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.fileSize} MB!`)
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
    handleUploadError() {
      const idx = this.$refs.uploadImg.uploadFiles.findIndex((item) => {
        return item.response.code !== 200
      }) // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
      this.$refs.uploadImg.uploadFiles.splice(idx, 1) // 关键作用代码，去除文件列表失败文件
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      this.loading.close()
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImage = file
      this.dialogVisible = true
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (const i in list) {
        strs += list[i].url + separator
      }
      return strs !== '' ? strs.substr(0, strs.length - 1) : ''
    }
  }
}
</script>
<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
::v-deep.hide .el-upload--picture-card {
  display: none;
}
// 去掉动画效果
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: all 0s;
}

::v-deep .el-list-enter,
.el-list-leave-active {
  opacity: 0;
  transform: translateY(0);
}
::v-deep .el-upload-list {
  // height: 80px;
  line-height: 0;
  .el-upload-list__item-thumbnail {
    width: 80px;
    height: 80px;
  }
  .el-upload-list__item-actions {
    position: absolute;
    width: 80px;
    height: 80px;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
  }
  .el-upload-list__item {
    margin: 0 10px 0 0;
    width: 80px;
    height: 80px;
    font-size: 0;
  }
}
::v-deep .el-upload-list__item-actions:hover {
  opacity: 1;
}
.pdf-style {
  display: block;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  min-height: 500px;
}
</style>
