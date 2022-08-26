<template>
  <header>
    <div class="left-content">
      <!-- 个人中心弹窗 -->
      <el-dialog title="修改密码" :visible.sync="isShow">
        <Form :formLabel="formLabel" :form="form" :inline="true"></Form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
      <!-- 展开/收缩侧边栏 -->
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="small" />

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="tag of tags"
          :key="tag.path"
          :to="{ path: tag.path }"
        >
          <span style="color: #fff">{{ tag.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="right-content">
      <el-dropdown trigger="click" szie="mini">
        <img :src="userImg" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updateUser"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Form from "./Form.vue";
import { updatePassword } from "../api/data";
export default {
  components: { Form },
  name: "Header",
  data() {
    return {
      username: "zuber",
      userImg: require("../assets/images/user.jpg"),
      isShow: false,
      formLabel: [
        {
          model: "oldpsd",
          label: "旧密码",
          type: "input",
        },
        {
          model: "newpsd",
          label: "新密码",
          type: "input",
        },
        {
          model: "reppsd",
          label: "重复密码",
          type: "input",
        },
      ],
      form: {
        oldpsd: "",
        newpsd: "",
        reppsd: "",
      },
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("login");
    },
    updateUser() {
      this.isShow = true;
    },
    confirm() {
      updatePassword(this.form).then((res) => {
        if (res.data.code === 20000) {
          this.$message.success(res.data.data.message);
        } else {
          this.$message.warning(res.data.data.message);
        }
      });
      this.isShow = false;
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tagList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between; //分开布局
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px; //边距增加20px
  }
  span {
    cursor: pointer;
  }
}

.right-content {
  display: flex;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>