<template>
  <!-- 根据当前子项hidden是否隐藏,12个路由只显示9个 -->
  <div v-if="!item.hidden">
    <!--  显示条件  a且b且c  &&与-->
    <!-- a.当前项传入函数,只有一个或者没有显示的子路由为true, 否则为false-->
    <!-- onlyOneChild代表就是唯一子代,因为如果有多个显示的子代 a 时就短路了 -->
    <!-- b,唯一子代没有孩子或者是 没有要显示子代,,就是父组件 -->
    <!-- c,当前不是必须显示,  alwaysShow就是必须显示属性-->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- app-link 封装的组件 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    // 唯一的子级
    this.onlyOneChild = null
    return {}
  },
  methods: {
    /** 从子节点数组中过滤出所有没有被隐藏的子节点*/
    hasOneShowingChild(children = [], parent) {
      // 获取没被隐藏的子路由
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false// 如果子节点被隐藏，返回false
        } else {
          // 如果只有一个显示子项，则将使用临时集
          this.onlyOneChild = item// 返回true表示这个子节点是显示的
          return true
        }
      })

      // 当只有一个子路由器，默认显示子路由
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由，则显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
