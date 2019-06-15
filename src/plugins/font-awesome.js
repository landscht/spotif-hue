import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faInstagram, faLinkedin, faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faInstagram, faLinkedin, faGithub, faSpotify, faTrophy, faUsers)

Vue.component('font-awesome-icon', FontAwesomeIcon)