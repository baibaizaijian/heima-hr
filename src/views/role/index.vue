<template>
  <div class="container">
    <div class="app-container">
      <el-button style="margin-bottom: 10px" type="primary" size="mini">添加角色</el-button>
      <!-- :header-cell-style="{ 'background-color': '#f5f6f8' }" -->
      <el-table border :data="list">
        <el-table-column align="center" label="序号" width="50px">
          <template #default="row">
            {{ row.$index + 1+(q.page-1)*q.pagesize }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色" width="200px" />
        <el-table-column prop="state" label="启用" width="200px" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template>
            <span>分配权限</span>
            <span>编辑</span>
            <span>删除</span>

          </template>
        </el-table-column>
      </el-table>
      <el-row style="height: 120px" type="flex" justify="center" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="q.page"
          :page-size="q.pagesize"
          @current-change="hChange"
        />
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      q: {
        page: 1,
        pagesize: 10
      },
      total: null,
      list: []
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const { rows, total } = await getRoleList(this.q)
      this.list = rows
      console.log(this.list)
      this.total = total
    },
    hChange(e) {
      this.q.page = e
      this.getDate()
    }

  }

}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  ::v-deep .el-table .is-leaf {
    background-color: #f5f6f8;
  }
}
</style>
