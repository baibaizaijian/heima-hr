import layout from '@/layout'
export default {
  name: 'social',
  path: '/social',
  component: layout,
  children: [{
    path: '',
    name: 'social',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
