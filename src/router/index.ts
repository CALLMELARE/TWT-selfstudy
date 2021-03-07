import { createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap } from './router.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getQueryParams, phoneModel } from '@/utils'
import store from '@/store'
import { getToken } from '@/utils/auth'

interface IQueryParams {
  code?: string
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: constantRouterMap
})

// 路由开始进入
router.beforeEach((to, from, next) => {
  useDocumentTitle(to.meta.title)
  //! 解决ios微信下，分享签名不成功的问题,将第一次的进入的url缓存起来。
  if (window.entryUrl === undefined) {
    window.entryUrl = location.href.split('#')[0]
  }
  // 访问权限设置
  if (to.meta.requireAuth) {
    const token = getToken()
    // console.log(token);
    if (!token) {
      next({
        path: '/login',
        query: {
          from: to.fullPath
        }
      })
    }
  }
  next()
})

router.afterEach((to, from, next) => {
  let url
  if (phoneModel() === 'ios') {
    url = window.entryUrl
  } else {
    url = window.location.href
  }
  // 保存url
  store.commit('link/SET_INIT_LINK', url)
})

export default router
