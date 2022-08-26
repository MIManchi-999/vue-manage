<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <Tags></Tags>
        <el-main>
          <!-- 路由页面 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
import Tags from "../components/Tags.vue";

export default {
  name: "Main",
  components: {
    Aside,
    Header,
    Tags,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100vh;
}
.el-header {
  background-color: #333;
  height: 50px !important;
}
.el-container {
  height: 100vh;
}
.el-main {
  height: 100%;
  width: 100%;
}
</style>