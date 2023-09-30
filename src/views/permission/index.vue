<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" @click="fn">添加权限</el-button>
      <el-table
        border
        :header-cell-style="{ background: '#f5f6f8' }"
        :data="list"
        row-key="id"
        default-expand-all
      >
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="add(row.id)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <permissionDailog id="id" :dialog-visible.sync="dialogVisible" />

  </div>
</template>
<script>
import permissionDailog from './permission-dailog'
import { getPermissionList, delPermission } from '@/api/permission'
import { transList } from '@/utils'
export default {
  name: 'Permission',

  components: {
    permissionDailog
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      // 当前点击的id
      id: ''
    }
  },
  created() {
    this.getdate()
  },
  methods: {
    async getdate() {
      const res = await getPermissionList()

      this.list = transList(res)
    },
    async del(id) {
      this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delPermission(id)
        this.$message.success('删除成功')
        this.getdate()
      }).catch(() => {

      })
    },
    fn() {
      console.log('完成')
      this.dialogVisible = true
    },
    add(id) {
      this.id = id
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
  & > .el-button {
    margin-bottom: 10px;
  }
}
</style>
