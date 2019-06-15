<template>
        <div>
                <v-toolbar>
                        <v-toolbar-side-icon @click="navigation"></v-toolbar-side-icon>

                        <v-text-field
                                        label="Chercher une musique"
                                        box
                                        append-icon="search"
                                ></v-text-field>
                        <v-toolbar-title>
                                <v-avatar
                                        :tile="false"
                                        size="56"
                                        color="grey lighten-4"
                                >
                                        <img :src="me.images[0].url" alt="avatar">
                                </v-avatar>
                                <span class="font-weight-light subheading">{{me.display_name}}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="hidden-sm-and-down">
                                <v-btn flat @click="goToDiscover">Découvrir</v-btn>
                                <v-btn flat @click="goToplaylists">Mes playlists</v-btn>
                                <v-btn flat>Mes titres</v-btn>
                                <v-btn flat>Mes albums</v-btn>
                        </v-toolbar-items>
                </v-toolbar>
                <div>
                                <Discover v-if="discover"></Discover>
                                <Playlists v-if="playlists"></Playlists>
                </div>
        </div>
</template>

<script>
    import Player from "./Player";
    import Discover from "./Discover";
    import SpotifyService from "../services/spotify.service"
    import NavigationService from "../services/navigation.service"
    import Playlists from "./Playlists";

    export default {
        name: "SpotifPlayer",
        components: {Playlists, Discover, Player},
        created() {
                SpotifyService.me().then((data) => {
                        console.log(data)
                        this.me = data
                })
        },
        data : () => ({
                me : {},
                discover : false,
                playlists : true
        }),
            methods : {
                navigation() {
                        this.$emit("nav")
                },
                    goToplaylists() {
                        this.playlists = true
                            this.discover = false
                    },
                    goToDiscover() {
                        this.discover = true,
                                this.playlists = false
                    }
            }
    }
</script>

<style scoped>

</style>