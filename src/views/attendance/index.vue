<template>
  <div class="container">

    <el-row :gutter="24" class="header" type="flex" justify="end" align="middle">
      <el-col :span="12">
        <div class="box">
          <p>未处理</p>
          <span>0</span>
        </div>

      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end" align="center">
          <el-button type="danger" size="mini">导入</el-button>
          <el-button type="primary" size="mini">设置</el-button>
          <el-button size="mini">历史归档</el-button>
          <el-button type="danger" size="mini">20234报表</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex" justify="end" align="center">
      <el-col :span="3" class="section">
        <p>部门:</p>
      </el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="item in DepartmentList " :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="username"
          label="姓名"
        />
        <el-table-column
          prop="workNumber"
          label="工号"
        />
        <el-table-column
          prop="departmentName"
          label="部门"
        />
        <el-table-column
          prop="mobile"
          label="手机"
        />
      </el-table>

    </el-row>
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { getAttendances } from '@/api/attendances'
export default {
  name: 'Attendance',
  data() {
    return {
      checkList: [], // 勾选部门
      DepartmentList: [], // 部门列表
      Query: {
        page: 1,
        pagesize: 5,
        deptID: ''
      },
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.DepartmentList = await getDepartmentList()
      const res = await getAttendances(this.Query)

      console.log('考勤', res.data.rows)
      this.tableData = res.data.rows
    }

  }
}
</script>
<style lang="scss" scoped>
.container{
padding: 20px 50px;
}
.el-row{
  background-color: #fff;
  margin-bottom: 20px;
  padding:  15px 0;
}
.header{

  .box{
    width: 80px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.section{
  display: flex;
  flex-direction: row-reverse;
  p{
    margin: 0;
    font-size: 14px;
    font-weight: 700;
  }
}
.el-checkbox{
  margin-bottom: 20px;
}
</style>
