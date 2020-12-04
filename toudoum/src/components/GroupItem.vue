<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4" @click="$emit('click')">
        <v-card-title class="white--text">{{title}}</v-card-title>
            <v-card-text>
                <v-icon class="mr-1"> mdi-account-multiple </v-icon>
                <span class="subheading">{{numberUsers}}</span>
            </v-card-text>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: String,
        numberUsers: Number
    }
});
</script>