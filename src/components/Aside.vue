<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <!-- 这里绑定没有子菜单的属性 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="(item, index) of noChildren"
      :index="index.toString()"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 这里绑定有子菜单的属性 -->
    <el-submenu
      v-for="(item, index) of hasChildren"
      :key="item.path"
      :index="index.toString()"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item
        v-for="(subItem, subindex) of item.children"
        :key="subItem.path"
        :index="'submenu' + subindex.toString()"
        @click="clickMenu(subItem)"
      >
        <span slot="title">{{ subItem.label }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push(item.name);
      this.$store.commit("selectMenu", item);
    },
  },

  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => {
        return !item.children; //返回没有子菜单的item
      });
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => {
        return item.children; //返回有子菜单的item
      });
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>