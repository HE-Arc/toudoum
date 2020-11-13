<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4" v-on:click="goToTask(idprops)">
        <v-card-title class="white--text">{{titleprops}}</v-card-title>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import router from "../router";

export default Vue.extend({
    props: {
        titleprops:String,
        idprops:String
    },
    data() {
        return {
            settings: [],
            };
    },

    methods: {
        goToTask:function (id: string){
            router.push({name: 'Tasks', params: { workbook_id:id }});
        }
    }

});
</script>

<!--CSS-->
<style scoped>
</style>
