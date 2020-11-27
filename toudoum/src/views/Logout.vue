<template>
    <v-container fill-height fluid class="pa-0 background">
        <v-row align="center" justify="center">
            <v-col align="center">
                <v-card class="mx-auto" max-width="450">
                    <v-card-title class="primary white--text">
                        <span class="title">Logout</span>
                    </v-card-title>
                    <v-card-text>
                        <p class="my-5">You have been correctly logged out.</p>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn
                        elevation="4"
                        x-large
                        class="primary white--text mb-5 mt-0"
                        large
                        rounded
                        to="/Login"
                        >Go to Login</v-btn
                    >
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ToudoumError } from "@/api/ToudoumError";

export default Vue.extend({
    name: "Logout",
    mounted: async function () {
        try {
            await Api.logout();
            this.$typedStore.actions.logout();
        } catch (e) {
            if (e instanceof ToudoumError) {
                console.log(e.message); // Error (401, 404 or 500,...)
            }
        }
    }
});
</script>
