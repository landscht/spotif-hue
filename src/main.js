import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vue-router'
import './plugins/font-awesome'
import App from './App.vue'
import Login from "./components/Login";
import VueRouter from "vue-router";
import SpotifPlayer from "./components/SpotifPlayer";
import Hue from "./components/Hue";

Vue.config.productionTip = false

const router = new VueRouter({
  mode : "history",
  hashbang: false,
  routes: [
    { path: '*', redirect: '/login' },
    { path: '/login', component: Login},
    { path: '/spotifPlayer', component: SpotifPlayer},
    { path: '/hue', component: Hue}
  ]
})

new Vue({
  router,
  render: h => h(App),
  created: function () {

  }
}).$mount('#app')
