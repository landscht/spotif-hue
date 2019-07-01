<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Informations sur {{track.name}}</p>
                    <v-flex xs12 text-xs-center>
                        <img :src="track.album.images[0].url" width="400" height="400"/>
                    </v-flex>
                    <v-flex xs12>
                        <span class="font-weight-bold">Informations</span><v-divider></v-divider>
                        Titre : {{track.name}}<br>
                        De : {{track.artists[0].name}}<br>
                        Durée : {{duration}}<br>
                        <v-dialog
                                v-model="dialog"
                                width="650"
                        >
                            <template v-slot:activator="{ on }">
                                    <a>
                                        <span v-on="on" id="explicit">Explicit</span>
                                    </a>
                            </template>

                            <v-card>
                                <v-card-title
                                        class="headline grey lighten-2"
                                        primary-title
                                >
                                    Informations
                                </v-card-title>

                                <v-card-text>
                                    <p class="font-weight-bold">Contenu explicite</p>
                                    <p class="font-weight-light">
                                        C'est génial d'écouter la musique telle qu'elle a été pensée par l'artiste. Cela implique que Spotify peut parfois inclure du contenu explicite. Un contenu explicite est un contenu possèdant des termes violents, grossiers ou alors que la musique parle de drogue, sexe ou d'armes<br><br>

                                        Soyez à l'affût du tag <span class="font-weight-bold">EXPLICITE</span> dans les informations de la musique.<br><br>

                                        <span class="font-weight-bold">Remarque :</span> nos tags de contenu explicite sont appliqués selon les informations que nous recevons des titulaires des droits. Nous ne pouvons garantir que tout le contenu explicite est marqué comme tel.
                                    </p>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            flat
                                            @click="dialog = false"
                                    >
                                        Fermer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog> : <span v-if="track.explicit" style="color: green;">oui</span><span v-else>non</span><br>
                        Sortie : {{track.album.release_date}}<br>
                        Album : {{track.album.name}}
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>

    import SpotifyService from "../services/spotify.service"
    import Toolbar from "./Toolbar";

    export default {
        name: "InfoTrack",
        components: {Toolbar},
        created() {
            SpotifyService.getTrackId(this.$route.params.id).then((data) => {
                console.log(data)
                this.track = data
                this.duration = SpotifyService.millisToMinutesAndSeconds(data.duration_ms)
            })
        },
        data : () => ({
            track : {},
            duration : ""
        })
    }
</script>

<style scoped>

    #explicit {
        text-decoration: none;
        color: white;
    }

    #explicit:hover {
        opacity: 0.7;
        text-decoration: none;
        color: white;
    }

</style>