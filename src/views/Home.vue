<template>
  <el-row class="Home" :gutter="20">
    <el-col :span="8">
      <!-- 用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userInfo">
            <p class="name">{{ username }}</p>
            <p class="access">{{ authority }}</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间: <span>2022-5-15</span></p>
          <p>上次登录地点: <span>江西</span></p>
        </div>
      </el-card>

      <!-- 表格数据 -->
      <el-card style="margin-top: 15px; height: 320px" shadow="hover">
        <!-- column 例子
        <el-table-column
        prop="name"   列属性
        label="姓名"  标签 -- 列名
        >  
      </el-table-column> -->
        <el-table :data="tableData">
          <!-- 遍历对象和遍历数组一样 -->
          <el-table-column
            v-for="(val, index) of tableLabel"
            :key="index"
            :prop="index"
            :label="val"
            width="70px"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <!-- 订单6小方块 -->
      <div class="num">
        <el-card
          v-for="item of countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表 -->
      <Charts />
    </el-col>
  </el-row>
</template>

<script>
import { getTableData } from "../api/data";
import Charts from "../components/Charts.vue";
export default {
  name: "Home",
  components: { Charts },
  data() {
    return {
      userImg: require("../assets/images/user.jpg"),
      tableData: [],
      tableLabel: {
        name: "商品",
        todayBuy: "日购买",
        monthBuy: "月购买",
        totalBuy: "总购买",
      },
      countData: [],
    };
  },
  created() {
    getTableData().then((res) => {
      const data = res.data;
      this.tableData = data.tableData;
      this.countData = data.countData;
    });
  },
  computed: {
    username() {
      return this.$store.state.username || "Root";
    },
    authority() {
      return this.$store.state.authority || "管理员";
    },
  },
};
</script>

<style lang="less" scoped>
</style>