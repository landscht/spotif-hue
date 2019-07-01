<template>
    <div>
        <Toolbar></Toolbar>
        <div>
            <v-container grid-list-md text-xs-center pl-0 pr-0 pt-3>
                <v-layout row wrap justify-center>
                    <p class="title">Recherche</p>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    export default {
        name: "Search",
        components: {Toolbar}
    }
</script>

<style scoped>

</style>