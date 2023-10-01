<template>
  <el-dialog title="新增权限点" :visible="dialogVisible" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="权限名称" label-width="100px" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限标识" label-width="100px" prop="code">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限描述" label-width="100px">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开启" label-width="100px">
        <el-switch
          v-model="form.enVisible"
          active-value="1"
          inactive-value="2"
        />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="submit">确 定</el-button>
      <el-button size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transList } from '@/utils'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
      default: false
    },
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    // 这里需要用到this,必须使用箭头函数
    // 箭头函数放到外部,只能放到data中
    const validatePass = async(rule, value, callback) => {
      let childrenList = transList(await getPermissionList())

      if (this.id) {
        childrenList = childrenList.find(item => item.id === this.id).children
      }

      if (this.form.id) {
        // 如果有 id 说明此时是编辑
        childrenList = childrenList.filter(item => item.id !== this.form.id)
      }
      if (childrenList.some(item => item.code === value)) {
        callback(new Error('权限名称已存在'))
      } else {
        callback()
      }
    }
    const validatePass2 = async(rule, value, callback) => {
      let res = await getPermissionList()
      // 不能直接.map,.map() 方法并不会等待 Promise 对象的结果返回，而是会立即返回一个新的数组,
      if (this.form.id) {
        // 如果有 id 说明此时是编辑
        res = res.filter(item => item.id !== this.form.id)
      }
      if (res.some(item => item.code === value)) {
        callback(new Error('权限标识已存在'))
      } else {
        callback()
      }
    }

    return {
      form: {
        name: '',
        code: '',
        description: '',
        type: '',
        enVisible: 0,
        pid: 0

      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }

        ]

      }

    }
  },
  created() {

  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    async submit() {
      const res = await addPermission(this.form)
      console.log(res)
      this.$emit('updateData')
    }

  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-input{
    width: 500px;
}
</style>
