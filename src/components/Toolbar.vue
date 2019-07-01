<template>
    <v-toolbar>
        <v-toolbar-side-icon @click="navigation"></v-toolbar-side-icon>
        <v-form>
            <v-text-field
                    @click="goToSearch"
                    label="Chercher une musique"
                    box
                    v-model="search"
                    append-icon="search"
            ></v-text-field>
            {{search}}
        </v-form>
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
            <v-btn flat active-class="green--text" to="/spotif/discover">Découvrir</v-btn>
            <v-btn flat active-class="green--text" to="/spotif/playlists">Mes playlists</v-btn>
            <v-btn flat active-class="green--text" to="/spotif/tracks">Mes titres</v-btn>
            <v-btn flat active-class="green--text" to="/spotif/albums">Mes albums</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

    import SpotifyService from "../services/spotify.service"

    export default {
        name: "Toolbar",
        created() {
            SpotifyService.me().then((data) => {
                console.log(data)
                this.me = data
            })
        },
        data : () => ({
            me : {},
            search : ''
        }),
        methods : {
            navigation() {
                this.$emit("nav")
            },
            goToSearch() {
                this.$router.push("/spotif/search")
            }
        }
    }
</script>

<style scoped>

</style>