<template>
  <el-cascader
    size="mini"
    :value="value"
    :options="list"
    :props="props"
    separator="-"
    @change="hChange"
  />
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { transList } from '@/utils'
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      list: [],
      props: {
        value: 'id',
        label: 'name'
      }

    }
  },
  created() {
    this.loadDate()
  },
  methods: {
    async loadDate() {
      this.list = transList(await getDepartmentList())
    },
    hChange(val) {
      // 俩方法都是用来获取最后一个元素的
      // console.log(val[val.length - 1])
      // console.log([...val].pop())
      this.$emit('input', val[val.length - 1])
    }
  }

}
</script>

<style>

</style>
