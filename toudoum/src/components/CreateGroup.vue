<!-- TEMPLATE -->
<template>
    <v-card elevation="4" class="pa-md-6 mx-lg-auto">
        <v-row>
            <v-col cols="1"> <v-btn v-on:click="save"  elevation="2" color="primary">Save</v-btn></v-col>
            <v-col > <v-btn v-on:click="dismiss" elevation="2" color="error">Dismiss</v-btn></v-col>
        </v-row>

    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { ITask } from "@/models/ITask";

export default Vue.extend({
    // props: {
    //     tasks: Object as () => Array<ITask>
    // },
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
