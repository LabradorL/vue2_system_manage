<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :append-to-body="true"
    :fullscreen="fullscreen"
    :before-close="handleClose"
  >
    <div slot="title" class="el-dialog-quan">
      <p class="el-dialog-title">{{ dialogTitle }}</p>
      <!--                <p>{{ dialogTitle1 }}-{{ item.name }}</p>-->
      <!--                <p>{{title}}</p>-->
      <img class="el-dialog-fullscreen-img" src="../../imgs/dialog/icon-full-screen.png" alt="" @click="fullscreen=!fullscreen">

    </div>
    <div class="dialog-body" :class="footerShow?'':'all'">
      <slot name="dialog-body" />
    </div>
    <div v-if="footerShow" class="dialog-footer">
      <div class="dialog-btn-close" @click="handleClose">取消</div>
      <div class="dialog-btn-save-box" @click="formSave">保存</div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props:{
    // 是否需要底部按钮
    footerShow: {
      type: Boolean,
      required: false,
      default: false
    },
    dialogTitle:{
      type: String,
      required: false,
      default: function(){
        return ''
      }
    },
    dialogVisible:{
      type: Boolean,
      required: false,
      default: false
    }

  },
  data(){
    return {
      fullscreen:true
      // dialogVisible:true
    }
  },
  mounted(){},
  methods:{
    // 关闭弹框,handleClose
    handleClose(){
      this.$emit('handleClose')
      this.fullscreen=true
    },
    // 点击保存按钮
    formSave(){
      this.$emit('formSave')
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "@/assets/styles/mixin.scss";
::v-deep .el-dialog{
  width: 1600px  !important;
  height: 800px !important;
  max-height: 800px !important;
  // background: initial !important;
  // box-shadow: inset 0px 0px 60px 0px rgba(102,255,204,0.2);
  opacity: 1;
  background: linear-gradient(180deg, #00060E 0%, #012645 100%);

  // border: 1px solid;
  // border-image: linear-gradient(180deg, rgba(102.00000151991844, 255, 204.00000303983688, 0), rgba(102.00000151991844, 255, 204.00000303983688, 1)) 1 1;
  // background-image: url('../../assets/img/ShanXi/dialog-bg.png');
  // background-size: 100% 100%;
  &::after{
    position: absolute;
    bottom: 0;
    background: url('../../imgs/dialog/dialog-bottom-bg.png');
    background-size: 100% auto;
    content: '';
    width: 100%;
    height: 80px;
    z-index: -1;
  }
}
::v-deep .el-dialog.is-fullscreen{
  width: 100%  !important;
  height: 100% !important;
  max-height: 100% !important;
}
::v-deep .el-dialog .el-dialog__header{
  text-align: center;
  width: 100%;
  height: 59px;
  background: linear-gradient(270deg, rgba(39,140,255,0.2196) 0%, rgba(57,111,255,0.1608) 100);
  border-radius: 0px 0px 0px 0px;
  background-color:initial !important;
  background-image: url('../../imgs/dialog/dialog-head-bg.png');
  background-size: 100% 100%;
  padding: 0 20px;
  line-height: 59px;
}
.el-dialog-quan{
  position: relative;
}
.el-dialog-fullscreen-img{
  position: absolute;
  right: 40px;
  width: 30px;
  height: 30px;
  top: 16px;
  cursor: pointer;
}
.el-dialog-title{
  text-align: center;
  font-size: 24px;
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
}
::v-deep .el-dialog__headerbtn{
  // width: 20px;
  // height: 20px;
  // top: 18px;
  // background-image: url('../../assets/img/ShanXi/dialog-close.png');
  // background-size: 100% 100%;
  font-size: 24px;
}

::v-deep .el-dialog .el-dialog__body{
  background: initial !important;
  padding: 20px;
  height: calc(100% -  59px) !important;
}
::v-deep .el-dialog .el-dialog__title{
  text-align: center;
  font-size: 24px;
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
}
//
.dialog-body{
  width: 100%;
  height: calc(100% -  59px);
  overflow-y: auto;
}
.dialog-body.all{
  height: 100%;
}
.dialog-footer{
  width: 100%;
  height: 56px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.dialog-btn-close{
  width: 80px;
  height: 36px;
  @include background_color('background_color_pagination_bg');
  @include box_shadow('box_dialog_shadow');
  border-radius: 6px 6px 6px 6px;
  text-align: center;
  line-height: 36px;
  margin-right: 16px;
  @include font_color('font_color_green');
  box-shadow: inset 0px 0px 20px 0px rgba(102,255,204,0.3);
  cursor: pointer;
}
.dialog-btn-save-box{
  width: 80px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  // margin: auto;
  box-sizing: border-box;

  @include box_shadow('box_dialog_shadow_08');
  border: 1px solid transparent;
  background-image: linear-gradient(#003333,#003333),
    linear-gradient(270deg,
    rgba(102.00000151991844, 255, 204.00000303983688, 0.20000000298023224),
    rgba(102.00000151991844, 255, 204.00000303983688, 1),
    rgba(102.00000151991844, 255, 204.00000303983688, 0.20000000298023224)
    ) !important;
  @include background_color('background_color_pagination_bg');
  background-origin: border-box;
  background-clip: content-box,border-box;
  border-radius: 6px;
  @include font_color('font_color_green');
  cursor: pointer;
}
</style>
