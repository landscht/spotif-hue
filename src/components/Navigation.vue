<template>
    <v-navigation-drawer v-if="drawer" permanent enable-resize-watcher app>
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-dialog
                            v-model="dialog"
                            width="650"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn small fab v-on="on">
                                <v-icon dark>info</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title
                            >
                                Patch notes
                            </v-card-title>

                            <v-card-text>
                                <p class="font-weight-bold">Patch 1.0.0 - 14/06/2019</p>
                                <p class="font-weight-light">
                                    Mise en ligne de l'application sur Heroku app avec les fonctionnalitées suivantes:<br>
                                    - Page de connexion utilisant la connection via l'API Spotify<br>
                                    - Page pour régler l'appareil sur "Spotif Hue"<br>
                                    - Player pour controller la lecture des musiques Spotify (pause, play, suivant, précédent, position)<br>
                                    - Page "Découvrir" qui permet de voir les playlists récentes et les titres récents (aucune fonctionnalités pour les titres récents)<br>
                                    - Page "Playlist" pour voir les détails de la playlist sélectionner (l'image, le titre, la description, l'auteur, les followers, liste avec les titres de la playlist)<br>
                                    - Possibilités de lancer la lecture de la playlist ou de choisir la musique à écouter pour la page "Playlist"<br>
                                    - Page "Mes playslits" pour voir l'ensemble des playlists de l'utilisateur<br>
                                    - Pour les playlists collaborative un classement est disponible sur la page "Playlist" pour voir qui à ajouter le plus de musiques
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
                    </v-dialog>
                    <v-list-tile-title class="title">
                        Spotif HUE
                    </v-list-tile-title>
                    <v-spacer>
                        <v-btn flat icon dark color="red" @click="deconnect">
                            <v-icon dark>exit_to_app</v-icon>
                        </v-btn>
                    </v-spacer>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-0" >
            <v-list-tile
                    v-for="(item, i) in items"
                    :key="i"
                    active-class="green--text"
                    :to="item.path"
            >
                <v-list-tile-action>
                    <font-awesome-icon :icon="item.action"/>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{item.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <Player></Player>
    </v-navigation-drawer>
</template>

<script>

    import Player from "./Player";
    export default {

        name: "Navigation",
        components: {Player},
        props : {
            drawer : Boolean
        },
        data : () => ({
            dialog: false,
            items: [
                {
                    action: {prefix: 'fab', iconName: 'spotify'},
                    title: 'Spotify',
                    path: '/spotif',
                    items: [],
                },
                {
                    action: 'restaurant',
                    title: 'Philips Hue',
                    path: '/hue',
                    items: [],
                },
            ]
        }),
        methods : {
            deconnect() {
                this.$emit('nav')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>