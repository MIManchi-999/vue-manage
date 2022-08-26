<template>
  <div class="table">
    <el-table :data="tableData" height="95%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="(item, index) of tableLabel"
        :key="index"
        :label="item.label"
        :width="item.width ? item.width : 120"
        :prop="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <!-- 
        @current-change=changePage绑定改变分页函数(获取分页)
        :current-page.sync="config.page" 绑定当前页
        :page-size="20" 分页每页个数
       -->
      <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableLabel: Array,
    tableData: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDel(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  height: calc(100% - 62px);
  width: 100%;
  background-color: white;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>