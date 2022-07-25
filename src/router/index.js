import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/order?doctorid=1658711958274f0sw9Ni8&saleid=1234&proid=1'
  },
  /* 商品详情页（首页） */
  {
    path: '/order',
    name: 'OrderDetail',
    component:() => import('../views/order/index.vue'),
    meta: { title: '药品详情' }
  },
  /* 填写信息/提交订单 */
  {
    path: '/comfirmorder',
    name: 'ConfirmOrder',
    component:() => import('../views/confirmorder/index.vue'),
    meta: { title: '填写信息' }
  },
  /* 物流 */
  {
    path: '/logistics',
    redirect: '/logistics/search'
  },
  /* 物流查询 */
  {
    path: '/logistics/search',
    name: 'LogisticsSearch',
    component:() => import('../views/logistics/search.vue'),
    meta: { title: '物流查询' }
  },
  /* 物流信息 */
  {
    path: '/logistics/info',
    name: 'LogisticsInfo',
    component:() => import('../views/logistics/info.vue'),
    meta: { title: '物流信息' }
  },
  /* 404 */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:() => import('../views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo({ top: 0, behavior: "instant" })
  document.documentElement.scrollTop = document.body.scrollTop = 0
  next()
})

export default router