<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Parametres</p>
                    <v-flex xs12>
                        <v-dialog
                                v-model="dialog"
                                width="650"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn flat small icon color="grey" v-on="on">
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
                                    <p class="font-weight-bold">Patch 1.0.1 - 01/07/2019</p>
                                    <p class="font-weight-light">
                                        Ajouts de plusieurs fonctionnalités pour Spotif:<br>
                                        - Page avec toute les playlists de l'utilisateur<br>
                                        - Page avec toutes les musiques sauvegardés par l'utilisateur<br>
                                        - Page avec touts les albums sauvegardés par l'utilisateur<br>
                                        - Possibilité d'obtenir les informations de la musique en cours en cliquant sur la musique du player<br>
                                        - Page pour modifier les parametres de l'application et pour voir le patch notes (aucun paramètre fonctionnel actuellement<br>
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
                        En savoir plus sur l'application<br>
                        <v-switch v-model="night" label="Mode nuit"></v-switch>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>

    import Toolbar from "./Toolbar";
    import SettingsService from "../services/settings.service"

    export default {
        name: "Settings",
        components: {Toolbar},

        data : () => ({
            dialog: false,
            night: SettingsService.night
        }),
    }
</script>

<style scoped>

</style>