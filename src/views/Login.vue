<template>
  <div class="login">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="loginContainer"
    >
      <h2 class="loginTitle">登录</h2>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密  码"
        label-width="80px"
        prop="password"
        class="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="loginBtn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from "../api/data";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { require: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "用户名长度不能小于2位", trigger: "blur" },
        ],
        password: [
          { require: true, message: "请输入密码", trigger: "blur" },
          { min: 2, message: "密码长度不能小于2位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      getUserInfo(this.form).then((res) => {
        if (res.data.code === 20000) {
          this.$store.state.username = res.data.data.username;
          this.$store.state.authority = res.data.data.authority;
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.data.menu);
          this.$store.commit("setToken", res.data.data.token);
          this.$store.commit("addMenu");
          this.$router.push("home");
        } else {
          this.$message.warning(res.data.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url("../assets/images/wallhaven-8xx1ro.jpg");
  background-size: cover;
}
.loginContainer {
  position: absolute;
  top: 35%;
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 40px 40px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
}

.loginTitle {
  padding-bottom: 20px;
  text-align: center;
  color: #505458;
}

.loginBtn {
  margin: 0 auto;
}
</style>