<template>
    <v-layout align-center justify-center column>
        <span class="display-3 font-weight-light">Bienvenue sur Spotif party</span>
        <span class=" headline font-weight-light">Si vous êtes l'organisateur connectez vous à Spotify.</span>
        <v-btn
                :loading="loading3"
                :disabled="loading3"
                color="green"
                class="white--text"
                @click="loader = 'loading3'"
        >
            <font-awesome-icon :icon="{prefix: 'fab', iconName: 'spotify'}"/>
            Se connecter
        </v-btn>
    </v-layout>

</template>

<script>

    import Spotify from '../services/spotify.service';
    import NavigationService from '../services/spotify.service';

    export default {
        name: "Login",
        data : () => ({
            loader: null,
            loading3: false,
        }),
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
                this.login()
            },
        },
        methods: {
            login () {
                let url = `https://accounts.spotify.com/authorize?client_id=${Spotify.registration.client_id}&redirect_uri=${Spotify.registration.redirect_uri}&scope=${Spotify.registration.scopes}&response_type=token&state=123`
                window.location.replace(url);
            }
        },
        created() {
            let hash = Spotify.getHashParams();
            if(hash.access_token != undefined) {
                Spotify.access_token = hash.access_token;
                this.$router.push('/spotifPlayer')
                NavigationService.drawer = !NavigationService.drawer;
                console.log(NavigationService.drawer)
                this.$emit('nav')
            }
        }
    }
</script>

<style scoped>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>