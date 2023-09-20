<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="请输入手机号"
            /></el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              show-password
              placeholder="请输入密码"
            /></el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="form.isAgree">
              用户平台使用协议
            </el-checkbox></el-form-item>
          <el-form-item>
            <el-button style="width: 350px" type="primary" :class="{'btn':isValidating }" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      isValidating: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' }],
        // 复选框 el-checkbox 只会校验是否有数据, 不会校验 true / false, 在它眼里, true / false 都是填了内容
        // 自定义校验函数
        // 参数1: 规则自身, 一般不用
        // 参数2: 校验项的数据
        // 参数3: 函数, 直接调用不传参表示通过校验 cb(), 调用传入参数则表示没通过校验 cb(new Error('错误原因'))
        isAgree: [{ validator: (rule, value, callback) => {
          value ? callback() : callback(new Error('您还没有勾选用户协议'))
        }, trigger: 'change' }]
      }
    }
  },
  methods: {
    async login() {
      try {
        // 兜底校验
        await this.$refs.form.validate()
        await this.$store.dispatch('user/login', this.form)
        // 提示用户
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (error) {
        this.isValidating = true
        setTimeout(() => {
          this.isValidating = false
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_.png) no-repeat
      center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
.btn{
    animation: Animation 1s  ;

}
@keyframes Animation {
0% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) ; }
  20%, 40%, 60%, 80% { transform: translateX(10px) ; }
  100% { transform: translateX(0); }
}
</style>
