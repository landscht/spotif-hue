<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md text-xs-center pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Vos albums</p>
                    <v-flex xs12>
                        <v-list two-line class="list">
                            <template v-for="(item, i) in albums" >
                                <v-list-tile
                                        :key="i"
                                        avatar
                                        @click=""
                                >
                                    <v-list-tile-avatar>
                                        <img :src="item.album.images[0].url">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{item.album.name}}
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.album.artists[0].name"></v-list-tile-sub-title>
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
        name: "Albums",
        components: {Toolbar},
        created() {
            SpotifyService.getAlbums().then((data) => {
                console.log(data)
                this.albums = data.items
                this.nexturl = data.next
            })
        },
        data : () => ({
            albums : [],
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
                            this.albums.push(data)
                        })
                    })
            },
        }
    }
</script>

<style scoped>

</style>