<template>
  <div class="container">
    <div class="app-container">
      <!-- data:显示的数据 props:显示数据的规则 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="treeData" :props="defaultProps">
        <template #default="{data}">
          <el-row class="tree">
            <el-col :span="21">{{ data.name }}</el-col>
            <el-col :span="3">
              <el-row type="flex" justify="space-around">
                <span>管理员</span>
                <!-- $event是模板的第一个参数 -->
                <el-dropdown @command="hCommand($event,data.id)">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                    <el-dropdown-item command="del">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <AddDept ref="addDept" :currentid="currentID" :show-dialog.sync="showDialog" @updateData="getDate()" />
  </div>
</template>
<script>
import { getDepartmentList, delDepartment } from '@/api/department'
import { transList } from '@/utils'
import AddDept from './add-dept.vue'
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children', // 表示层级关系的属性名
        label: 'name' // 渲染节点文本的属性名
      },
      showDialog: false,
      // currentId: '' // -1
      currentID: ''// 当前id
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const res = await getDepartmentList()
      this.treeData = transList(res, 0)
      console.log('我要刷刷新')
      // console.log(this.treeData)
    },

    async  hCommand(type, id) {
      if (type === 'add') {
        // 弹出 dialog
        this.showDialog = true
        this.currentID = id
      } else if (type === 'edit') {
        // 点击的是编辑
        // 弹出 dialog
        this.showDialog = true
        // 传递当前被点击的部门 id
        this.currentID = id
        // DOM 更新是异步的, Props 单向数据流的更新也是异步的
        // 结论: props 和 DOM 更新都是异步的
        // 调用子组件获取详情的方法
        // ref 有两个作用:
        // 1. 可用于获取 DOM 元素
        // 2. 可用于获取组件对象
        // console.log('父组件:', this.currentID)
        this.$nextTick(() => {
          this.$refs.addDept.getDetail()
        })
      } else {
        // console.log('我要删除')
        await this.$confirm('确认要删除吗', '确认删除')
        await delDepartment(id)
        this.$message.success('删除成功')
        this.getDate()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tree{
  width: 100%;
}
.app-container{
  padding: 30px 140px;
    font-size: 14px;

}
</style>
