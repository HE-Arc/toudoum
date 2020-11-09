<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4">
        <v-card-title>{{titleprops}}</v-card-title>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        titleprops:String,
    },
    data() {
        return {
            settings: [],
            };
    },

    methods: {
        
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
