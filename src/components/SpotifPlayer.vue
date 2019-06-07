<template>
    <v-container grid-list-md>
        <Player></Player>
    </v-container>
</template>

<script>
    import Player from "./Player";

    export default {
        name: "SpotifPlayer",
        components: {Player},
    }
</script>

<style scoped>

</style>