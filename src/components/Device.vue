<template>
        <v-layout column align-center>
            <font-awesome-icon class="icon" :icon="{prefix: 'fab', iconName: 'spotify'}"/>
            <span class=" headline font-weight-light">Selectionnez l'appareil "xxx" et continuez.</span>
            <v-btn color="success" v-for="(item, i) in devices" :key="i" @click="setDevice(item.id)">{{item.name}}</v-btn>
            <v-btn color="info" :disabled="disable_button" @click="redirect">Continuer</v-btn>
        </v-layout>
</template>

<script>

    import Spotify from '../services/spotify.service'

    export default {
        name: "Device",
        created() {
            this.interval  = setInterval(function () {Spotify.getDevices().then((data) => {
                console.log(data)
                this.devices = data.devices
            })}.bind(this), 3000)
        },
        data : () => ({
            devices : [],
            disable_button : true,
            interval : null
        }),
        methods : {
            setDevice(id) {
                if(id == Spotify.device_id) {
                    this.disable_button = false
                }else {
                    this.disable_button = true
                }
                Spotify.setDevice(id)
            },
            redirect() {
                clearInterval(this.interval)
                this.$emit("nav")
                this.$emit("toolbar")
                this.$router.push("/spotif")
            }
        }
    }
</script>

<style scoped>
    .icon {
        font-size: 7em;
    }
</style>