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
    <AddDept :pid="currentID" :show-dialog.sync="showDialog" @updateData="getDate()" />
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
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

    hCommand(type, id) {
      if (type === 'add') {
        // 弹出 dialog
        this.showDialog = true
        this.currentID = id
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
