<template>
    <div>
        <v-toolbar>
            <v-toolbar-side-icon @click="navigation"></v-toolbar-side-icon>
            <v-toolbar-title>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat>item 1</v-btn>
                <v-btn flat>item 2</v-btn>
                <v-btn flat>item 3</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md text-xs-center>
            <v-icon color="white">build</v-icon><p>en cours de développement</p>
        </v-container>
    </div>

</template>

<script>
    export default {
        name: "Hue",
        methods : {
            navigation() {
                this.$emit("nav")
            }
        }
    }
</script>

<style scoped>

</style>