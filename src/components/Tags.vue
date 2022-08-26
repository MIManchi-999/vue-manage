<template>
  <div class="tags">
    <el-tag
      size="small"
      v-for="(tag, index) of tags"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tags",
  computed: {
    ...mapState({
      tags: (state) => state.tagList,
    }),
  },
  methods: {
    // 改变页面/菜单
    changeMenu(tag) {
      this.$router.push(tag.name);
    },
    handleClose(tag, index) {
      if (this.$route.name === tag.name) {
        this.$router.push(this.tags[index - 1].name);
      }
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  margin-top: 10px;
  margin-left: 20px;
  height: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>