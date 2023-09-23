<template>
  <!-- v-bind="linkProps(to)" 是 Vue.js 中的动态属性绑定方式，
  用于将 linkProps(to) 函数返回的对象中的属性动态绑定到 HTML 元素上。 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      // 是外部链接，类型就为a标签
      if (this.isExternal) {
        return 'a'
      }
      // 否则就router-link标签
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // 是a标签就加上对应属性
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // router-link 跳转 to 路由地址
      return {
        to: to
      }
    }
  }
}
</script>
