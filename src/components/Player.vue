<template>
    <v-container grid-list-md text-xs-center>
        <v-flex xs12>
            Vous écoutez <span class="font-weight-bold">{{info.current_track.name}}</span> de <span class="font-weight-bold">{{info.current_track.artists[0].name}}</span>
        </v-flex>
        <v-flex xs12>
            <v-layout row justify-center>
                <v-btn small fab dark color="green" @click="previous">
                    <v-icon dark>skip_previous</v-icon>
                </v-btn>
                <v-btn v-if="playStatus" small fab dark color="green" @click="play">
                    <v-icon dark>play_arrow</v-icon>
                </v-btn>
                <v-btn v-else small fab dark color="green" @click="pause">
                    <v-icon dark>pause</v-icon>
                </v-btn>
                <v-btn small fab dark color="green" @click="next">
                    <v-icon dark>skip_next</v-icon>
                </v-btn>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-slider
                    v-model="info.position_track"
                    :max="info.duration_track"
                    :min="0"
                    :step="1"
            ></v-slider>
            {{info.position_track}}
        </v-flex>

    </v-container>
</template>

<script>

    import NavigationService from '../services/navigation.service'
    import Spotify from '../services/spotify.service'

    export default {
        name: "Player",
        created() {
            Spotify.playerNow().then((data) => {
                console.log(data)
                this.trackNow = data
            })
        },
        data : () => ({
            playStatus : false,
            info : Spotify.infos,
            interval : null
        }),
        methods : {
            close() {
                NavigationService.drawer = !NavigationService.drawer
                console.log(NavigationService.drawer)
            },
            previous() {
                Spotify.previousTrack()
                this.startSlider()
            },
            next() {
                Spotify.nextTrack()
                this.startSlider()
            },
            play() {
                this.playStatus = !this.playStatus
                Spotify.playMusic()
                this.interval = setInterval(function() {
                    this.setPosition()
                }.bind(this), 1000)
            },
            pause() {
                clearInterval(this.interval)
                this.playStatus = !this.playStatus
                Spotify.pauseMusic()
            },
            startSlider() {
                clearInterval(this.interval)
                this.interval = setInterval(function() {
                    this.info.position_track = this.info.position_track + 1000
                }.bind(this), 1000)
            },
        }
    }
</script>

<style scoped>

</style>