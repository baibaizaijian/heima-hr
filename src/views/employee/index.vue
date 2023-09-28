<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="q.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
        />
        <!-- 树形组件
          default-expand-all 默认展开所有节点
          highlight-current 高亮当前节点
          :expand-on-click-node="false" 点击节点不展开, 只有点击三角箭头才展开
         -->
        <el-tree
          ref="tree"
          node-key="id"
          :data="treeList"
          :props="{ label: 'name' }"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @current-change="hChange"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog=true">excel导入</el-button>
          <el-button size="mini" @click="exExcel">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table
          :data="list"
          :header-cell-style="{ background: '#f5f6f8', height: '60px' }"
        >
          <el-table-column label="头像" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto" />
              <span v-else class="username">{{ row.username?.[0] }}</span>
            </template></el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式">
            <template v-slot="{ row }">
              {{ row.formOfEmployment === 1 ? '正式' : '非正式' }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="操作" width="200px">
            <template #default="{ row }">
              <el-button type="text" @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-popconfirm title="确认删除吗?" class="el-button el-button--text" @confirm="del(row.id)">
                <el-button slot="reference" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" type="flex" justify="end" align="middle">
          <el-pagination
            :total="total"
            :page-size="10"
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </el-row>

      </div>
    </div>
    <importExcelVue :show-excel-dialog.sync="showExcelDialog" :success="loadEmployee" />
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { getEmployeeList, exportExcel, delEmployee } from '@/api/employee'
import { transList } from '@/utils'

import fileSaver from 'file-saver'
import importExcelVue from './components/import-excel.vue'

export default {
  name: 'Employee',
  components: {
    importExcelVue

  },
  data() {
    return {
      // 树型列表数据
      treeList: [],
      // 表格数据
      list: [],
      q: {
        page: 1,
        pagesize: 10,
        keyword: null,
        departmentId: null
      },
      total: null,
      showExcelDialog: false

    }
  },
  watch: {
    'q.keyword'() {
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        this.q.page = 1
        this.loadEmployee()
      })
    }

  },
  async created() {
    await this.loadData()
    // this.loadEmployee()
  },
  methods: {
    async loadData() {
      // 加载树形数据
      this.treeList = transList(await getDepartmentList())
      this.q.departmentId = this.treeList[0].id
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.q.departmentId)
      })
      // 获取员工列表
      this.loadEmployee()
    },
    async loadEmployee() {
      const res = await getEmployeeList(this.q)
      // console.log('员工列表', res)
      this.list = res.rows
      this.total = res.total
    },
    hChange(node) {
      this.q.departmentId = node.id
      // 切换页面从第一页开始加载
      this.q.page = 1
      // console.log(this.q.departmentId)
      this.loadEmployee()
    },
    handleCurrentChange(e) {
      this.q.page = e
      this.loadEmployee()
    },
    // 搜索事件
    hSearch() {
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        this.q.page = 1
        this.loadEmployee()
      })
    },
    // 导出Excel
    async exExcel() {
      const res = await exportExcel()
      console.log(res)
      fileSaver.saveAs(res, '员工表.xlsx')
    },
    async del(id) {
      await delEmployee(id)
      this.$message.success('删除成功')
      // 最后一项,删完跳转上一页
      if (this.list.length === 1 && this.q.page > 1) this.q.page--
      this.loadEmployee()
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
