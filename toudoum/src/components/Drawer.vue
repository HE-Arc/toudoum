<!-- TEMPLATE -->
<template>
    <v-navigation-drawer app>
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img
                        src="https://avatars1.githubusercontent.com/u/19173830?s=460&u=08af2e129410fb95c81af06cfdbd2306288aa8cd&v=4"
                    ></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title"> Lucas Fridez </v-list-item-title>
                    <v-list-item-subtitle>lucas.fridez@he-arc.ch</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-folder</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Files</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Starred</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Drawer"
});
</script>

<!--CSS-->
<style scoped>
</style>
