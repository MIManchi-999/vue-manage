import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'
import './api/mock'

Vue.config.productionTip = false
Vue.prototype.axios = axios

//Vue.use() 全局注入
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu")
  }
}).$mount('#app')