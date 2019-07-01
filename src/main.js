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
import Discover from "./components/Discover";
import Playlists from "./components/Playlists";
import Tracks from "./components/Tracks";
import Albums from "./components/Albums";
import Search from "./components/Search";
import Settings from "./components/Settings";
import InfoTrack from "./components/InfoTrack";

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
    { path: '/spotif/playlist/:id', component: Playlist},
    { path: '/spotif/discover', component: Discover},
    { path: '/spotif/playlists', component: Playlists},
    { path: '/spotif/tracks', component: Tracks},
    { path: '/spotif/albums', component: Albums},
    { path: '/spotif/search', component: Search},
    { path: '/settings', component: Settings},
    { path: '/spotif/info-track/:id', component: InfoTrack}
  ]
})

new Vue({
  router,
  render: h => h(App),
  created: function () {

  }
}).$mount('#app')
