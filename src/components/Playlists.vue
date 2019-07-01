<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md text-xs-center pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Vos playlists</p>
                    <v-flex xs12>
                        <v-list two-line class="list">
                            <template v-for="(item, i) in myPlaylists" >
                                <v-list-tile
                                        :key="i"
                                        avatar
                                        :to="'/spotif/playlist/' + item.id"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="img_playlists[i]">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{item.name}}
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>{{item.tracks.total}} musiques <font-awesome-icon v-if="item.collaborative" style="color: green;" icon="users" size="1x"/>

                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                </v-list-tile>
                                <v-divider></v-divider>

                            </template>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>
<script>

    import SpotifyService from '../services/spotify.service'
    import Toolbar from "./Toolbar";

    export default {
        name: "Playlists",
        components: {Toolbar},
        created() {
            SpotifyService.getPlaylist(50).then((data) => {
                this.myPlaylists = data.items
                console.log(data)

                data.items.forEach((item) => {
                    this.img_playlists.push(item.images[0].url)
                })
            })
        },
        data : () => ({
            myPlaylists : [],
            img_playlists: []
        })
    }
</script>

<style scoped>
    .list {
        padding : 0 !important;
    }
</style>