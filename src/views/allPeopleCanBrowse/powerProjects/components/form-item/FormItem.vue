<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-time-picker
      v-if="item.querySetting.type==='timeRange'"
      v-model="form[item.prop]"
      is-range
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
      style="width: 100%"
    />
    <el-cascader
      v-if="item.querySetting.type==='cascade'"
      v-model="form[item.prop]"
      :placeholder="'请搜索或单选'+item.label"
      filterable
      :props="{value:'id',label:'name',children:'children'}"
      style="width: 100%"
      :options="item.querySetting.data"
      @change="item.handle&&item.handle.change"
    />
    <el-date-picker
      v-if="item.querySetting.type==='dateRange'"
      v-model="form[item.prop]"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      style="width: 100%"
      :clearable="item.querySetting.clearable ? item.querySetting.clearable : false"
    />
    <el-input
      v-if="item.querySetting.type==='input'"
      v-model.trim="form[item.prop]"
      :placeholder="'请输入'+item.label"
    />
    <el-input
      v-if="item.querySetting.type==='input1'"
      v-model.trim="form[item.prop]"
      :placeholder="'请输入'+item.querySetting.placeholder"
    />
    <el-select
      v-if="item.querySetting.type==='select'"
      v-model="form[item.prop]"
      clearable
      style="width:100%"
      :placeholder="'请选择'+item.label"
      @change="item.handle&&item.handle.change"
    >
      <el-option
        v-for="(s,index) in item.querySetting.data"
        :key="index"
        :label="s[item.querySetting.selectLabel]"
        :value="s[item.querySetting.selectValue]"
      />
    </el-select>
    <el-select
      v-if="item.querySetting.type==='selectMultiple'"
      v-model="form[item.prop]"
      clearable
      multiple
      style="width:100%"
      :placeholder="'请选择'+item.label"
      @change="item.handle&&item.handle.change"
    >
      <el-option
        v-for="(s,index) in item.querySetting.data"
        :key="index"
        :label="s[item.querySetting.selectLabel]"
        :value="s[item.querySetting.selectValue]"
      />
    </el-select>
    <el-select
      v-if="item.querySetting.type==='selectFilterable'"
      v-model="form[item.prop]"
      clearable
      filterable
      style="width:100%"
      :placeholder="'请选择'+item.label"
      @change="item.handle&&item.handle.change"
    >
      <el-option
        v-for="(s,index) in item.querySetting.data"
        :key="index"
        :label="s[item.querySetting.selectLabel]"
        :value="s[item.querySetting.selectValue]"
      />
    </el-select>
    <el-date-picker
      v-if="item.querySetting.type==='date'"
      v-model="form[item.prop]"
      align="right"
      type="date"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      style="width:100%"
      :placeholder="'请选择'+item.label"
    />

    <el-date-picker
      v-if="item.querySetting.type==='dateTime'"
      v-model="form[item.prop]"
      type="datetime"
      style="width:100%"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      :placeholder="'请选择'+item.label"
      align="right"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'XhbFormItem',
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data(){
    return {
      data: new Date(),
      fm: {}
    }
  },
  created() {

  },
  methods:{
    selectchange(){
      this.$forceUpdate()
    },
    defaultClick() {
      this.$emit('reset', {})
    },
    queryClick() {
      this.$emit('search', this.item)
    }
  }
}

</script>
<style src="./index.css" scoped/>
