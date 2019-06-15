<template>
    <v-footer fixed height="auto">
        <v-container class="cont" grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-layout column>
                        <v-layout row justify-center>
                            <v-btn small fab dark color="green" @click="previous">
                                <v-icon dark>skip_previous</v-icon>
                            </v-btn>
                            <v-btn v-if="info.pause" small fab dark color="green" @click="play">
                                <v-icon dark>play_arrow</v-icon>
                            </v-btn>
                            <v-btn v-else small fab dark color="green" @click="pause">
                                <v-icon dark>pause</v-icon>
                            </v-btn>
                            <v-btn small fab dark color="green" @click="next">
                                <v-icon dark>skip_next</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-slider
                                v-model="info.position_track"
                                :max="info.duration_track"
                                :min="0"
                                :step="1"
                                :label="info.position_track | formatDate"
                                @click="playMusic"
                        ></v-slider>
                        <p>Vous écoutez <span class="font-weight-bold">{{info.current_track.name}}</span> de <span class="font-weight-bold">{{info.current_track.artists[0].name}}</span></p>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-footer>
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
        }),
        methods : {
            close() {
                NavigationService.drawer = !NavigationService.drawer
                console.log(NavigationService.drawer)
            },
            previous() {
                Spotify.previousTrack()
            },
            next() {
                Spotify.nextTrack()
            },
            play() {
                this.playStatus = !this.playStatus
                Spotify.playMusic()
            },
            pause() {
                this.playStatus = !this.playStatus
                Spotify.pauseMusic()
            },
            startSlider() {
                clearInterval(this.info.interval)
                this.info.interval = setInterval(function() {
                    this.info.position_track = this.info.position_track + 1000
                }.bind(this), 1000)
            },
            playMusic() {
                Spotify.playMusicInms(this.info.position_track)
            }
        }
    }
</script>

<style scoped>


</style>