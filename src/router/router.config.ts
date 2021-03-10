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
        component: () => import(/* webpackChunkName:'home'*/'@/views/Home/index.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true, requireAuth: false }
      },
      {
        path: '/fav',
        name: 'Fav',
        component: () => import(/* webpackChunkName:'fav'*/'@/views/Fav/index.vue'),
        meta: { title: '收藏', keepAlive: false, showTab: true, requireAuth: true }
      },
      {
        path: '/building',
        name: 'Building',
        component: () => import(/* webpackChunkName:'building'*/'@/views/Building/index.vue'),
        meta: { title: '教学楼', keepAlive: false, showTab: true, requireAuth: false }
      },
      {
        path: '/classroom',
        name: 'Classroom',
        component: () => import(/* webpackChunkName:'classroom'*/'@/views/Classroom/index.vue'),
        meta: { title: '教室', keepAlive: false, showTab: true, requireAuth: false }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName:'login'*/'@/views/Login/index.vue'),
        meta: { title: '登录', keepAlive: false, showTab: true, requireAuth: false }
      }
    ]
  }
]
