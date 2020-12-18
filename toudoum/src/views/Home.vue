<template>
    <v-container fill-height fluid>
        <v-row align="start" justify="start">
            <v-col align="center">
                <img alt="Vue logo" src="../assets/logo.png" />
                <p>Home page !</p>
                {{ $typedStore.getters.userFullname }}
            </v-col></v-row
        ></v-container
    >
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Home"
});
</script>
