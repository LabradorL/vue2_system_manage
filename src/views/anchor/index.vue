<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-26 11:06:18
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-09-27 14:40:23
 * @Description:
-->
<template>
  <div class="container">
    <div style="height: 200px; text-align: center">头部</div>
    <anchor
      v-model="anchor"
      class="height"
      @input="
        (val) => {
          anchor = val
        }
      "
    >
      <anchor-item
        label="文章一"
        name="1"
        class="anchor-item"
        style="background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章二"
        name="2"
        class="anchor-item"
        style="height: 400px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            rows="3"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章三"
        name="3"
        class="anchor-item"
        style="height: 500px; background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="3"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章四"
        name="4"
        class="anchor-item"
        style="height: 600px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="4"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章五"
        name="5"
        class="anchor-item"
        style="background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章六"
        name="6"
        class="anchor-item"
        style="height: 400px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            rows="3"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章七"
        name="7"
        class="anchor-item"
        style="height: 500px; background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="3"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章八"
        name="8"
        class="anchor-item"
        style="height: 600px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="4"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章九"
        name="9"
        class="anchor-item"
        style="background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十"
        name="10"
        class="anchor-item"
        style="height: 400px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            rows="3"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十一"
        name="11"
        class="anchor-item"
        style="height: 500px; background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="3"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十二"
        name="12"
        class="anchor-item"
        style="height: 600px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="4"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十三"
        name="13"
        class="anchor-item"
        style="background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十四"
        name="14"
        class="anchor-item"
        style="height: 400px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            rows="3"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十五"
        name="15"
        class="anchor-item"
        style="height: 500px; background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="3"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十六"
        name="16"
        class="anchor-item"
        style="height: 600px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="4"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十七"
        name="17"
        class="anchor-item"
        style="background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十八"
        name="18"
        class="anchor-item"
        style="height: 400px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            rows="3"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章十九"
        name="19"
        class="anchor-item"
        style="height: 500px; background: skyblue"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="3"
          />
        </div>
      </anchor-item>
      <anchor-item
        label="文章二十"
        name="20"
        class="anchor-item"
        style="height: 600px; background: yellowgreen"
      >
        <div class="text">
          <el-input
            type="textarea"
            value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
            rows="4"
          />
        </div>
      </anchor-item>
    </anchor>
  </div>
</template>

<script>
import Anchor from './commponts/anchor.vue'
import AnchorItem from './commponts/anchorItem.vue'
export default {
  name: 'AnchorName',
  components: { Anchor, AnchorItem },
  data() {
    return {
      anchor: '1'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
.anchor-item {
  margin-bottom: 15px;
  background-color: #fff;
  height: 300px;

  .text {
    padding: 20px;
    width: 600px;
  }
}
.height {
  height: 500px;
  overflow: auto;
}

::v-deep .el-dialog.custom-class {
  background: linear-gradient(to bottom, #f5faff, #e6eeff);
  border-radius: 16px;
  .el-dialog__header {
    height: 38px;
    padding: 10px 0 8px 0;
    .el-dialog__title {
      display: block;
      width: 100%;
      color: #282633;
      line-height: 20px;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
    }
    .el-dialog__headerbtn {
      right: 17px;
      top: 11px;
      .el-dialog__close {
        color: #666a70;
        font-weight: 600;
      }
    }
  }
  .el-dialog__body {
    padding: 0 10px;
  }
  .el-dialog__footer {
  }
}
</style>
