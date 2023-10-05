import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.less'
import './assets/font/iconfont.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/swiper.css"
Vue.use(VueAwesomeSwiper);
axios.defaults.timeout = 2000
Vue.config.productionTip = false
Vue.prototype.$echarts = window.echarts
Vue.prototype.$http = axios
Vue.prototype.imgserver = 'http://shkjgw.shkjem.com/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
