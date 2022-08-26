<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <!-- 遍历formLabel 根据类型显示不同的form框-->
    <el-form-item
      v-for="item of formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-else-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <el-select
        v-else-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="opt of item.opts"
          :key="opt.label"
          :label="opt.label"
          :value="opt.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    // 表单标签
    formLabel: Array,
    // 表单数据
    form: Object,
    // 行内表单模式 false:一行一个item true:flex布局
    inline: Boolean,
  },
  watch: {
    form: {
      deep: true, //深度监视，监视对象内部的属性
      handler() {},
    },
  },
};
</script>

<style lang="less">
</style>