<template>
  <div class="container">
    <div class="app-container">
      <el-button style="margin-bottom: 10px" type="primary" size="mini" @click="visible=true">添加角色</el-button>
      <!-- :header-cell-style="{ 'background-color': '#f5f6f8' }" -->
      <el-table border :data="list">
        <el-table-column align="center" label="序号" width="50px">
          <template #default="row">
            {{ row.$index + 1+(q.page-1)*q.pagesize }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色" width="200px" />
        <el-table-column prop="state" label="启用" width="200px">
          <template #default="{row}">
            <el-tag :type="text[row.state][1]">{{ text[row.state][0] ||"未知" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text">分配权限</el-button>
            <el-button type="text">编辑</el-button>
            <el-popconfirm
              title="确定删除吗？"
              @confirm="del(row.id)"
            >
              <el-button slot="reference" type="text" style="margin-left:10px">删除</el-button>
            </el-popconfirm>
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
    <el-dialog title="新增角色" width="34%" :visible.sync="visible" @close="close">
      <el-form ref="form" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="form.name" size="mini" style="width: 90%" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch
            v-model="form.state"
            :active-value="1"
            :inactive-value="0"
          />

        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            size="mini"
            :rows="3"
            resize="none"
            :show-word-limit="true"
            :maxlength="10"
            style="width: 90%"
          />

        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center" style="width: 87%">
            <el-button type="primary" size="mini" @click="submit">确认</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole, delRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      q: {
        page: 1,
        pagesize: 10
      },
      total: null,
      // 表单数据
      list: [],
      text: {
        0: ['未启用', 'danger'],
        1: ['已启用', 'success']
      },
      visible: false,
      form: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const { rows, total } = await getRoleList(this.q)
      this.list = rows
      // console.log(this.list)
      this.total = total
    },
    hChange(e) {
      this.q.page = e
      this.getDate()
    },
    close() {
      this.visible = false
      this.$refs.form.resetFields()
    },
    async del(id) {
      await delRole(id)
      this.$message.success('删除完成')
      this.getDate()
    },
    async submit() {
      await this.$refs.form.validate()
      await addRole(this.form)
      this.close()
      this.$message.success('添加成功')
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
