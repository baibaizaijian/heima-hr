<template>
  <el-dialog :title="form.id?'编辑部门': '添加部门'" :visible="showDialog" @close="close">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" style="width:80%" prop="name">
        <el-input v-model.trim="form.name" size="mini" placeholder="2到10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" style="width:80%" prop="code">
        <el-input v-model.trim="form.code" size="mini" placeholder="2到10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" style="width:80%" prop="managerId">
        <el-select v-model="form.managerId" size="mini" placeholder="请选择部门负责人">
          <el-option
            v-for="item in ManagerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" style="width:80%" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" size="mini" placeholder="1到100个字符" :rows="4" />
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-col :span="3">
          <el-button type="primary" size="mini" :loading="loading" @click="submit">确定</el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" @click="close">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartmentList, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    currentid: {
      type: [Number, String], // 更宽松的校验类型, 既可以是 number 又可以是 string 不能为null 因为null不是构造函数
      required: true
    }
  },
  data() {
    return {
      // 加载动画
      loading: false,
      ManagerList: [],
      form: {
        code: null,
        introduce: '',
        managerId: '',
        name: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, {
          min: 2, max: 10, message: '请输入2~10个字符', trigger: 'blur' }, {
          validator: async(rule, value, callback) => {
            // console.log('当前id', this.form.id)
            let res = await getDepartmentList()
            // 判断当前是编辑功能还是添加功能
            // 如何判断当前是编辑呢?
            // console.log('当前id', this.form.id)
            if (this.form.id) {
              // 如果有 id 说明此时是编辑
              res = res.filter(item => item.id !== this.form.id)
            }

            if (res.some(item => item.name === value)) {
              callback(new Error('部门名称已存在'))
            } else {
              callback()
            }
          }, trigger: 'blur'

        }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10个字符', trigger: 'blur' },
          {
            validator: async(rule, value, callback) => {
              let res = await getDepartmentList()
              // 判断当前是编辑功能还是添加功能
              // 如何判断当前是编辑呢?
              // console.log('当前id', this.form.id)
              if (this.form.id) {
              // 如果有 id 说明此时是编辑
                res = res.filter(item => item.id !== this.form.id)
              }

              if (res.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback()
              }
            }, trigger: 'blur'

          }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }],
        managerId: [{ required: true, message: '请选择部门负责人', trigger: 'change' }]

      }

    }
  },
  async created() {
    this.ManagerList = await getManagerList()
  },

  methods: {
    // close 事件在任意会关闭 dialog 的地方都会触发, 例如: 用户点击 x 点击遮罩层
    close() {
      // console.log('有人要关我了!')
      this.$emit('update:showDialog', false)
      this.$refs.form.resetFields()
      // 还原 form 的初始属性
      this.form = {
        code: '',
        introduce: '',
        managerId: '',
        name: ''
      }
    },
    async submit() {
      this.$refs.form.validate(async ok => {
        if (ok) {
          try {
            this.loading = true
            if (this.form.id) {
              // 发编辑请求
              await updateDepartment(this.form)
              this.$message.success('修改部门成功')
            } else {
              // 发添加请求
              await addDepartment({ ...this.form, pid: this.currentid })
              // 成功提示
              this.$message.success('新增部门成功')
            }

            this.$emit('updateData')
            this.close()
          } finally {
            this.loading = false
          }
        }
      })
    },

    async getDetail() {
      const res = await getDepartmentDetail(this.currentid)
      // console.log('子组件:', this.currentid)
      // console.log(res)
      this.form = res
    }

  }
}
</script>

<style>

</style>
