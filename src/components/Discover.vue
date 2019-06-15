<template>
    <v-container grid-list-md text-xs-center pl-0 pr-0 pt-3>
        <v-layout row wrap justify-center>
            <p class="title">Playlists récentes</p>
            <v-flex xs12>
                    <v-card-text class="overflow-hidden py-0">
                        <v-layout row align-content-center class="horiz-scroll">
                            <v-flex
                                    v-for="(playlist, i) in playlists"
                                    :key="i"
                                    px-1
                                    pb-5
                                    pl-4
                            >
                                <div class="pos-relative">
                                    <v-hover>

                                    <v-img
                                            slot-scope="{ hover }"
                                            class="white--text mx-auto"
                                            height="150px"
                                            width="150px"
                                            :src="img_playlists[i]"
                                    >
                                        <router-link :to="'/playlist/' + playlist.id" class="indication">
                                        <v-expand-transition>
                                                <v-layout justify-center align-center
                                                          v-if="hover"
                                                          class="d-flex transition-fast-in-fast-out title darken-2 v-card--reveal white--text"
                                                          style="height: 100%;"
                                                >
                                                    <v-icon dark>play_arrow</v-icon>
                                                </v-layout>
                                            </v-expand-transition>
                                        </router-link>
                                    </v-img>
                                    </v-hover>
                                    <span class="subheading font-weight-light">{{playlist.name}}</span>

                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
            </v-flex>
            <p class="title">Écouté récemment</p>
            <v-flex xs12>
                <v-card-text class="overflow-hidden py-0">
                    <v-layout row align-content-center class="horiz-scroll">
                        <v-flex
                                v-for="(track, i) in currently_playing"
                                :key="i"
                                px-1
                                pb-2
                                pl-4
                        >
                            <div class="pos-relative">
                                <img :src="track.track.album.images[0].url" height="150" width="150">
                                <span class="subheading font-weight-light">{{track.track.name}}</span>

                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import SpotifyService from "../services/spotify.service"

    export default {
        name: "Discover",
        created() {
            SpotifyService.getPlaylist(10).then((data) => {
                this.playlists = data.items
                console.log(data)

                data.items.forEach((item) => {
                    this.img_playlists.push(item.images[0].url)
                })
            })

            SpotifyService.getCurrentlyPlaying().then((data) => {
                this.currently_playing = data.items
            })
        },
        data : () => ({
            playlists : [],
            img_playlists : [],
            currently_playing : []
        })
    }
</script>

<style scoped>

    .overflow-hidden {
        overflow: hidden;
    }
    .horiz-scroll {
        overflow-y: hidden;
        overflow-x: auto;
    }

</style>