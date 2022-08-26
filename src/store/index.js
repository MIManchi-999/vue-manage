import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    //面包屑标签
    tagList: [{
      path: "/home",
      name: "home",
      label: "首页",
      icon: "s-home",
    }, ],
    // 记录当前在那个页面下面
    currentMenu: null,
    token: '',
    menu: [],
    username: '',
    authority: ''
  },
  mutations: {
    //展开菜单
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //改变面包屑标签 val是一个tab
    selectMenu(state, val) {
      if (val.name !== 'home') {
        // 切换页面
        state.currentMenu = val
        const res = state.tagList.findIndex(item => item.name === val.name)
        if (res === -1) {
          state.tagList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    getToken(state) {
      state.token = state.token || Cookie.get('token')
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    setMenu(state, menu) {
      state.menu = menu
      Cookie.set('menu', JSON.stringify(menu))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state) {
      if (!Cookie.get('menu')) {
        return;
      }
      state.menu = JSON.parse(Cookie.get('menu'))
    }
  },
})