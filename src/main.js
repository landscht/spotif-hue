import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vue-router'
import './plugins/font-awesome'
import './plugins/date-format'
import App from './App.vue'
import Login from "./components/Login";
import VueRouter from "vue-router";
import SpotifHome from "./components/SpotifHome";
import Hue from "./components/Hue";
import Device from "./components/Device";
import Playlist from "./components/Playlist";

Vue.config.productionTip = false

const router = new VueRouter({
  mode : "history",
  hashbang: false,
  routes: [
    { path: '*', redirect: '/login' },
    { path: '/login', component: Login},
    { path: '/spotif', component: SpotifHome},
    { path: '/hue', component: Hue},
    { path: '/device', component: Device},
    { path: '/playlist/:id', component: Playlist}
  ]
})

new Vue({
  router,
  render: h => h(App),
  created: function () {

  }
}).$mount('#app')
