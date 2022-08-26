import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 异常捕捉
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/Mall.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/other/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/other/PageTwo.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航
router.beforeEach((to, from, next) => {
  // 获取是否存在token
  store.commit('getToken')
  const token = store.state.token;
  if (!token && to.name !== 'login') {
    next('login');
  } else if (token && to.name === 'login') {
    next('home');
  } else {
    next();
  }
})

export default router