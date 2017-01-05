// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueWebsocket from 'vue-websocket'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import './base/css/photon.min.css'
import routes from './routes'

Vue.use(VueWebsocket, 'ws://localhost:9001')
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  components: { App },
  router
})
