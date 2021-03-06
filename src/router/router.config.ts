import { RouteRecordRaw } from 'vue-router'

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/layouts/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true, requireAuth: false }
      },
      {
        path: '/fav',
        name: 'Fav',
        component: () => import('@/views/Fav/index.vue'),
        meta: { title: '收藏', keepAlive: false, showTab: true, requireAuth: true }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue'),
        meta: { title: '登录', keepAlive: false, showTab: true, requireAuth: false }
      }
    ]
  }
]
