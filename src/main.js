import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  axios,
  VueAxios,
  render: h => h(App),
}).$mount('#app')
