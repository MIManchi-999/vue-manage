<template>
  <div class="user">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 绑定form标签 form数据 -->
      <Form :formLabel="formLabel" :form="form" :inline="false"></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 主要内容 -->
    <div class="contianer">
      <div class="control">
        <div class="left">
          <el-button type="primary" @click="addUser">添加</el-button>
          <el-button @click="refresh">刷新</el-button>
        </div>
        <div class="right">
          <el-input placeholder="请输入" v-model="keyWord"></el-input>
          <el-button type="primary" @click="getUserList">搜索</el-button>
        </div>
      </div>
      <div class="table">
        <Table
          :tableLabel="tableLabel"
          :tableData="tableData"
          :config="config"
          @changePage="getUserList"
          @edit="editUser"
          @del="delUser"
        ></Table>
      </div>
    </div>
  </div>
</template>

<script>
import { createUser, updateUser, getUsers, deleteUser } from "../api/data";
import Form from "../components/Form.vue";
import Table from "../components/Table.vue";

export default {
  name: "User",
  components: {
    Form,
    Table,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      formLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      form: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      tableLabel: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "sex", label: "性别" },
        { prop: "birth", label: "出生日期", width: 180 },
        { prop: "addr", label: "地址", width: 300 },
      ],
      tableData: [],
      // 分页的配置数据
      config: {
        page: 1,
        total: 20,
      },
      // 关键字 通过keyword索引
      keyWord: "",
    };
  },
  methods: {
    //刷新
    refresh() {
      this.keyWord = "";
      this.getUserList();
    },
    confirm() {
      if (this.operateType === "add") {
        createUser(this.form).then((res) => {
          this.$message({
            type: "success",
            message: res.data.data.message,
          });
          this.getUserList();
        });
      } else if (this.operateType === "edit") {
        updateUser(this.form).then((res) => {
          this.$message({
            type: "success",
            message: res.data.data.message,
          });
          this.getUserList();
        });
      }
      this.isShow = false;
    },
    // 添加用户
    addUser() {
      this.operateType = "add";
      this.form = { name: "", addr: "", age: "", birth: "", sex: "" };
      this.isShow = true;
    },
    // 编辑用户
    editUser(row) {
      this.operateType = "edit";
      this.form = { ...row };
      this.isShow = true;
    },
    // 删除用户
    delUser(row) {
      this.$confirm("此操作将永久删除数据", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        // then 确认的处理
        .then(() => {
          deleteUser({ id: row.id }).then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.getUserList();
          });
        })
        //catch 取消的处理
        .catch(() => {});
    },
    // 获取分页用户信息
    getUserList() {
      if (this.keyWord !== "") {
        this.config.page = 1;
      }
      getUsers({
        keyWord: this.keyWord,
        page: this.config.page,
      }).then((res) => {
        this.tableData = res.data.list.map((user) => {
          user.sex = user.sex === 1 ? "男" : "女";
          return user;
        });
        this.config.total = res.data.count;
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
.user {
  height: 96%;
}
.contianer {
  height: 100%;
}
.table {
  height: 100%;
}
.control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .right {
    display: flex;
    margin: 0 30px;
  }
}
</style>