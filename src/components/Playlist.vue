<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md pt-3>
                <v-layout row wrap>
                    <v-flex xs5>
                        <img :src="playlist.images[0].url" width="300px" height="300px">
                    </v-flex>
                    <v-flex xs7 class="text-xs-center">
                        <p class="font-weight-light display-1 text-md-center">{{playlist.name}}</p>
                        <p class="font-weight-light subheading text-md-center">{{playlist.description}}</p>
                        <v-btn color="success" @click="play">Lire la playlist</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <span class="font-weight-light body-1">{{playlist.tracks.total}} titres - Réalisé par {{playlist.owner.display_name}} - {{playlist.followers.total}} followers</span>
                        <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 v-if="playlist.collaborative">
                        <p style="color: green;">collaborative</p>
                        <p v-for="(item, i) in map.keys()" :key="i">
                            <font-awesome-icon v-if="i == 0" style="color: gold;" icon="trophy" size="1x"/>
                            <font-awesome-icon v-if="i == 1" style="color: #c0c0c0;" icon="trophy" size="1x"/>
                            <font-awesome-icon v-if="i == 2" style="color: #ffaa49;" icon="trophy" size="1x"/>
                            {{item}} - {{map.get(item)}} musiques
                        </p>
                    </v-flex>
                    <v-flex xs12>
                        <v-list two-line class="list">
                            <template v-for="(item, i) in playlist.tracks.items" >
                                <v-list-tile
                                        :key="i"
                                        avatar
                                        @click="playMusic(item.track.uri)"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="item.track.album.images[2].url">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{item.track.name}} <v-icon class="outlined" v-if="item.track.explicit">explicit</v-icon>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.track.artists[0].name"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                    <span v-if="playlist.collaborative" class="font-weight-light body-1">{{item.added_by.id}}</span>
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
        name: "Playlist",
        components: {Toolbar},
        created() {
            SpotifyService.getPlaylistId(this.$route.params.id).then((data) => {
                console.log(data)
                this.playlist = data
                data.tracks.items.forEach((item) => {
                    if(!this.map.has(item.added_by.id)) {
                        this.map.set(item.added_by.id, 1)
                    }else{
                        let cpt = this.map.get(item.added_by.id)
                        cpt++;
                        this.map.set(item.added_by.id, cpt)
                    }
                })
                console.log(this.map)
            })

            SpotifyService.me().then((data) => {
                console.log(data)
                this.me = data
            })
        },
        data : () => ({
            playlist : {},
            me : {},
            map : new Map()
        }),
        methods : {
            navigation() {
                this.$emit("nav")
            },
            playMusic(track_uri) {
                SpotifyService.playPlaylistWithMusic(this.playlist.uri, track_uri)
            },
            play() {
                SpotifyService.playPlaylist(this.playlist.uri)
            }
        }
    }
</script>

<style scoped>
    .list {
        padding : 0 !important;
    }
</style>