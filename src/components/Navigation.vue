<template>
    <v-navigation-drawer v-if="drawer" permanent enable-resize-watcher app>
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-btn flat icon color="grey" to="/settings" active-class="green--text">
                        <v-icon dark>settings</v-icon>
                    </v-btn>
                    <v-list-tile-title class="title">
                        Spotif HUE
                    </v-list-tile-title>
                        <v-btn flat icon color="red" @click="deconnect">
                            <v-icon dark>exit_to_app</v-icon>
                        </v-btn>
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