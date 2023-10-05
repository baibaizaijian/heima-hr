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
        <el-table-column label="角色" width="200px">
          <template #default="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <template v-else>{{ row.name }}</template>
          </template>
        </el-table-column>
        <el-table-column label="启用" width="200px">
          <template #default="{row}">
            <el-switch
              v-if="row.isEdit"
              v-model="row.editRow.state"
              :active-value="1"
              :inactive-value="0"
            />
            <el-tag v-else :type="text[row.state][1]">{{ text[row.state][0] ||"未知" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <template v-else>
              {{ row.description }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="put(row)">确认</el-button>
              <el-button size="mini" @click="row.isEdit=false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="btnPermission(row.id)">分配权限</el-button>
              <el-button type="text" @click="Edit(row)">编辑</el-button>
              <el-popconfirm
                title="确定删除吗？"
                @confirm="del(row.id)"
              >
                <template #reference>
                  <el-button type="text" style="margin-left:10px">删除</el-button>
                </template>
              </el-popconfirm>
            </template>

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
        <!--  //激活时的值和取消时的值 -->
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
    <!-- 分配权限弹框 -->
    <el-dialog :visible.sync="assignVisible" title="分配权限" @close="closeAssign">
      <el-tree
        ref="tree"
        :data="permissionData"
        :props="{ label: 'name', children: 'children',}"
        node-key="id"
        :default-checked-keys="permIds"
        show-checkbox
        check-strictly
        default-expand-all
      />
      <el-row type="flex" justify="center" style="width: 87%">
        <el-button type="primary" size="mini" @click="submitAssign">确认</el-button>
        <el-button size="mini" @click="closeAssign">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole, delRole, putRole, getRole, assignRole } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transList } from '@/utils'

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

      assignVisible: false, // 显示分配权限
      permissionData: [], // 权限列表
      permIds: [], // 当前选中权限
      visible: false, // 显示添加角色
      id: '', // 当前分配角色
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
      // 在添加到 data 之前就把 isEdit 加上, 就不属于动态添加属性了
      // rows.forEach(item => {
      //   item.isEdit = false
      // })
      this.list = rows
      // console.log(this.list)
      this.list.forEach(item => {
        // 提供了一个 API: $set() => 数组更新检测, 通过 数组[索引] = xxx 修改时无法响应式, 也是用这个方案解决的
        // 参数1: 要设置属性的对象
        // 参数2: 属性名
        // 参数3: 属性值
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          description: item.description,
          state: item.state,
          name: item.name,
          id: item.id.toString() })
      })
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
    },
    Edit(row) {
      row.isEdit = true
      // 重置数据
      for (const key in row.editRow) {
        row.editRow[key] = row[key]
      }
      /* for (const key in object) {
        if (Object.hasOwnProperty.call(object, key))

        hasOwnProperty：这是 JavaScript 对象的一个方法，
      用于检查对象是否包含指定名称的属性。
      它返回一个布尔值，指示属性是否存在于对象自身。

      call(object, key)：call 是 JavaScript 中用于调用函数的方法。
      在这里，我们使用 call 方法将 hasOwnProperty 方法应用于特定的对象 object 和属性名称 key。
      这样做的好处是，它允许我们在一个对象上调用另一个对象的方法，
      并将第一个对象作为方法的上下文（this）。

      这个条件语句用于检查属性是否是对象自身的属性而不是继承的属性
      {const element = object[key] };
      重新赋值
      } */
    },
    async put(row) {
      if (row.editRow.name && row.editRow.description) {
        try {
          await putRole(row.editRow)
          this.$message.success('修改成功')
          // 如果有相同的属性，后面的属性会覆盖前面的属性。
          Object.assign(row, { isEdit: false, ...row.editRow })
        } catch (error) {
          // console.log(error)
        }
      } else {
        this.$message.warning('请输入角色和描述')
      }
    },
    async btnPermission(id) {
      this.id = id
      this.assignVisible = true
      let res = await getPermissionList()
      res = res.filter(item => item.enVisible === '1')
      // console.log('已开启的', res)
      this.permissionData = transList(res, 0)
      // console.log(this.permissionData)
      const res2 = await getRole(id)
      this.permIds = res2.permIds
      console.log('当前角色', res2.permIds)
    },
    // 关闭分配权限弹框
    closeAssign() {
      this.assignVisible = false
      this.permissionData = [] // 权限列表
      this.permIds = []
      this.id = ''
    },
    // getCheckedKeys若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
    // 提交权限
    async submitAssign() {
      await assignRole({ id: this.id, permIds: this.$refs.tree.getCheckedKeys() })
      this.$message.success('分配成功')
      this.closeAssign()
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
