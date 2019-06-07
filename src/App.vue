<template>
  <v-app dark>
    <Navigation v-on:nav="activeNav" :drawer="drawer"></Navigation>
    <v-content>
      <v-container fluid>
        <router-view v-on:nav="activeNav"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navigation from "./components/Navigation";
import SpotifyService from './services/spotify.service';

export default {
  name: 'App',
  components: {
    Navigation,
    HelloWorld
  },
  data () {
    return {
      drawer : false
    }
  },
  methods : {
    activeNav() {
      this.drawer = !this.drawer
    },
    waitForSpotifyWebPlaybackSDKToLoad: async function () {
      return new Promise(resolve => {
        if (window.Spotify) {
          resolve(window.Spotify)
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify)
          }
        }
      })
    },
    initiatePlayer: async function () {
      const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad()
      const sdk = new Player({
        name: 'Bastien je ttm bb',
        volume: 1.0,
        getOAuthToken: callback => { callback(SpotifyService.access_token) }
      })
      console.log(JSON.stringify(sdk))
      // Error handling
      sdk.addListener('initialization_error', ({ message }) => { console.log('Initialization_error: ' + message) })
      sdk.addListener('authentication_error', ({ message }) => { console.log('Authentication_error: ' + message) })
      sdk.addListener('account_error', ({ message }) => { console.log('Account_error: ' + message) })
      sdk.addListener('playback_error', ({ message }) => { console.log('Playback_error: ' + message) })
      // Playback status updates
      sdk.addListener('player_state_changed', ({
          position,
          duration,
          track_window: { current_track }
        }) => {
        console.log('Currently Playing', current_track);
        console.log('Position in Song', position);
        console.log('Duration of Song', duration);
        SpotifyService.actualiseInfos(current_track, duration, position)
      });
      // Ready
      sdk.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device Id: ', device_id)
      })
      // Not Ready
      sdk.addListener('not_ready', ({ device_id }) => {
        console.log('Not ready with device Id: ', device_id)
      })
      sdk.connect()
    }
  },
  mounted () {
    window.onSpotifyWebPlaybackSDKReady = () => {}
    this.initiatePlayer()
  }
}
</script>
