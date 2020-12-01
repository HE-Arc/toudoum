<!-- TEMPLATE -->
<template>
    <v-container>
        <v-dialog v-model="opened" max-width="400px">
            <v-card elevation="4" class="mx-lg-auto">
                <v-card-title class="headline primary">{{ title }}</v-card-title>
                <v-card-text class="pa-5">
                    <slot></slot>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" v-on:click="onButtonClick">{{
                        edit ? "Edit" : "Save"
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        opened: Boolean,
        title: String,
        edit: Boolean,
        onButtonClick: Function
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
