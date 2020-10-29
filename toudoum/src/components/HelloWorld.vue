<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col align="center">
                <v-card class="mx-auto" max-width="450">
                    <v-card-title class="primary white--text">
                        <span class="title">Login</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            label="Email"
                            prepend-icon="mdi-email"
                            class="my-5"
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-text-field
                            :append-icon="true ? 'mdi-eye' : 'mdi-eye-off'"
                            type="password"
                            label="Password"
                            prepend-icon="mdi-lock"
                            class="my-5"
                        ></v-text-field>
                    </v-card-text>
                    <v-btn elevation="4" x-large class="primary white--text my-3 mb-5" large rounded
                        >Login</v-btn
                    >
                    <v-spacer></v-spacer>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "HelloWorld"
});
</script>
