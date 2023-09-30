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
      <el-button type="primary" size="mini">确 定</el-button>
      <el-button size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permission'
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
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]

      },
      codeList: []
    }
  },
  async created() {
    const res = await getPermissionList()
    this.codeList = res.map(item => item.code)
    // console.log('全部', this.codeList)
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    }

  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-input{
    width: 500px;
}
</style>
