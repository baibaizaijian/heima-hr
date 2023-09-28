<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :http-request="updateImg"

    :before-upload="beforeAvatarUpload"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>

</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
    //   imageUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isImg = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'].includes(file.type)

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImg && isLt2M
    },
    updateImg({ file }) {
      // SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
      const cos = new COS({
        SecretId: 'AKIDsgebgFocP6jLpEayPySpAVokaPF8siPy',
        SecretKey: 'V4Xt9YmsbNzgP5iCf6UvMwTyUwTxJYhf'
      })
      cos.uploadFile({
        Bucket: 'hmhr-1321284989', /* 填写自己的 bucket，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */

      }, (err, data) => {
        if (err) {
          this.$message.error(err.message)
          console.log('上传失败', err)
        } else {
          this.$emit('input', `http://${data.Location}`)
          console.log(data)
        }
      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
