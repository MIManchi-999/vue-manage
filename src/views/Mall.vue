<template>
  <div class="mall">
    <el-button @click="refresh" class="add">刷新</el-button>
    <el-button type="danger" @click="clearAll" class="add">清空</el-button>
    <div class="table">
      <Table
        :tableLabel="tableLabel"
        :tableData="tableData"
        :config="config"
        @changePage="getGoods"
        @edit="editGoods"
        @del="delGoods"
      ></Table>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import { getGoods, delGoods, clearAll } from "../api/data";
export default {
  name: "mall",
  components: {
    Table,
  },
  data() {
    return {
      tableLabel: [
        { prop: "name", label: "商品名称", width: 180 },
        { prop: "price", label: "商品价格", width: 180 },
        { prop: "count", label: "销售数量", width: 180 },
        { prop: "total", label: "销售总金额", width: 180 },
      ],
      tableData: [],
      config: {
        page: 1,
        total: 20,
      },
    };
  },
  methods: {
    refresh() {
      this.getGoods();
    },
    getGoods() {
      getGoods({ page: this.config.page }).then((res) => {
        this.tableData = res.data.list;
        this.config.total = res.data.count;
      });
    },
    addGoods() {},
    editGoods() {
      this.$message.info("后台数据,无法编辑");
    },
    delGoods(row) {
      this.$confirm("此操作将永久删除数据", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGoods({ id: row.id }).then((res) => {
            this.$message.success(res.data.message);
            this.getGoods();
          });
        })
        .catch(() => {});
    },
    clearAll() {
      this.$confirm("此操作将永久删除数据", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          clearAll().then((res) => {
            this.$message.success(res.data.message);
            this.getGoods();
          });
        })
        .catch(() => {});
    },
  },
  created() {
    this.getGoods();
  },
};
</script>

<style lang="less" scoped>
.mall {
  height: 95%;
}
.add {
  margin-bottom: 5px;
}
.table {
  height: 100%;
}
</style>