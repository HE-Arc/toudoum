<!-- TEMPLATE -->
<template>
    <v-app-bar absolute color="primary" height="72" v-if="$typedStore.getters.isLoggedIn">
        <v-app-bar-nav-icon @click="toggleDrawer" color="white"></v-app-bar-nav-icon>

        <v-toolbar-title class="white--text">Toudoum</v-toolbar-title>
    </v-app-bar>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Header",
    methods: {
        toggleDrawer: function() {
            this.$typedStore.commit("DRAWER_TOGGLE")
        }
    }
});
</script>
