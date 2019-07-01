<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md text-xs-center pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Vos titres</p>
                    <v-flex xs12>
                        <v-list two-line class="list">
                            <template v-for="(item, i) in tracks" >
                                <v-list-tile
                                        :key="i"
                                        avatar
                                        @click="playMusic(item.track.album.uri, item.track.uri)"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="item.track.album.images[0].url">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{item.track.name}} <v-icon class="outlined" v-if="item.track.explicit">explicit</v-icon>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.track.artists[0].name"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                </v-list-tile>
                                <v-divider></v-divider>

                            </template>
                        </v-list>
                    </v-flex>
                    <v-btn v-if="nexturl != null" small fab dark color="green" @click="next(nexturl)">
                        <v-icon dark>keyboard_arrow_down</v-icon>
                    </v-btn>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>

    import SpotifyService from "../services/spotify.service"
    import Toolbar from "./Toolbar";

    export default {
        name: "Tracks",
        created() {
          SpotifyService.getTracks().then((data) => {
              console.log(data)
              this.tracks = data.items,
              this.nexturl = data.next
          })
        },
        components: {Toolbar},
        data : () => ({
            tracks : [],
            nexturl : ''
        }),
        methods : {
            next(url) {
                console.log(url)
                fetch( url, {
                    method : 'GET',
                    headers: {
                        'Authorization': `Bearer ${SpotifyService.access_token}`
                    },
                }).then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        this.nexturl = data.next
                        data.items.forEach((data) => {
                            this.tracks.push(data)
                        })
                    })
            },
            playMusic(album_uri, track_uri) {
                SpotifyService.playPlaylistWithMusic(album_uri, track_uri)
            },
        }
    }
</script>

<style scoped>

</style>