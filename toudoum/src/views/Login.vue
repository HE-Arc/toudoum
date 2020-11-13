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
                            v-model="email"
                            :disabled="loading"
                            :rules="[rules.email]"
                            prepend-icon="mdi-email"
                            class="my-5"
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-text-field
                            :append-icon="showPassord ? 'mdi-eye' : 'mdi-eye-off'"
                            prepend-icon="mdi-lock"
                            :disabled="loading"
                            :rules="[rules.required, rules.min]"
                            :type="showPassord ? 'text' : 'password'"
                            label="Password"
                            v-model="password"
                            class="my-5"
                            @click:append="showPassord = !showPassord"
                        ></v-text-field>
                    </v-card-text>
                    <v-btn
                        elevation="4"
                        x-large
                        class="primary white--text my-3"
                        large
                        rounded
                        :loading="loading"
                        v-on:click="login"
                        >Login</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn to="/SignUp" text color="accent  mb-5 mt-0"> Create an account </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";

export default Vue.extend({
    name: "Login",
    methods: {
        login: async function () {
            this.loading = true;
            try {
                await Api.login({
                    email: this.email,
                    password: this.password
                });
                this.$router.push({ name: "Workbooks" });
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    console.log(e.data); // Errors with sent data
                } else if (e instanceof ToudoumError) {
                    console.log(e.message); // Error (401, 404 or 500,...)
                }
            } finally {
                this.loading = false;
            }
        }
    },
    data() {
        return {
            loading: false,
            password: "",
            email: "",
            showPassord: false,
            rules: {
                required: (value: string) => !!value || "Required",
                min: (v: string) => v.length >= 6 || "Minimum 6 characters",
                email: (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                }
            }
        };
    }
});
</script>
