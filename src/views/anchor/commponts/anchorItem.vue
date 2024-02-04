<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-26 11:05:48
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-09-26 14:50:53
 * @Description: 电梯导航的每一项
-->
<template>
  <div
    class="anchor-item card"
    :class="{ disabled }"
  >
    <slot name="title">
      <div class="anchor-item__title">
        {{ label }}
      </div>
    </slot>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AnchorItem',
  props: {
    // 楼层标题
    label: {
      type: String,
      default: ''
    },
    // 楼层名
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.anchor-item.card {
  padding: 0;
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: visible;
}
.anchor-item__title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  padding: 0 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  &.sticky {
    position: sticky;
    top: 100px;
    z-index: 9;
  }
}
</style>
