<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件
          default-expand-all 默认展开所有节点
          highlight-current 高亮当前节点
          :expand-on-click-node="false" 点击节点不展开, 只有点击三角箭头才展开
         -->
        <el-tree
          :data="list"
          :props="{ label: 'name' }"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { transList } from '@/utils'
export default {
  name: 'Employee',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      // 加载树形数据
      // const res = await getDepartments()
      // console.log(transListToTree(res))
      this.list = transList(await getDepartmentList())
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
