<template>
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
            <v-btn flat>Mes playlists</v-btn>
            <v-btn flat>Mes titres</v-btn>
            <v-btn flat>Mes albums</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Toolbar",
        created() {
            SpotifyService.me().then((data) => {
                console.log(data)
                this.me = data
            })
        },
        data : () => ({
            me : {}
        }),
        methods : {
            navigation() {
                this.$emit("nav")
            }
        }
    }
</script>

<style scoped>

</style>