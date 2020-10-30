<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col align="center">
                <v-card class="mx-auto" max-width="450">
                    <v-card-title class="primary white--text">
                        <span class="title">Sign Up</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            label="Name"
                            v-model="name"
                            :disabled="loading"
                            :rules="[rules.required]"
                            prepend-icon="mdi-card-account-details"
                            :error-messages="errors['name']"
                            class="my-5"
                        ></v-text-field>
                        <v-text-field
                            label="Firstname"
                            v-model="firstname"
                            :disabled="loading"
                            :rules="[rules.required]"
                            prepend-icon="mdi-account-circle"
                            :error-messages="errors['firstname']"
                            class="my-5"
                        ></v-text-field>
                        <v-text-field
                            label="Email"
                            v-model="email"
                            :disabled="loading"
                            :rules="[rules.email]"
                            prepend-icon="mdi-email"
                            :error-messages="errors['email']"
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
                            :error-messages="errors['password']"
                            class="my-5"
                            @click:append="showPassord = !showPassord"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="showPassord ? 'mdi-eye' : 'mdi-eye-off'"
                            prepend-icon="mdi-lock"
                            :disabled="loading"
                            :rules="[rules.required, rules.min]"
                            :type="showPassord ? 'text' : 'password'"
                            label="Password confirmation"
                            v-model="passwordConfirmation"
                            class="my-5"
                            @click:append="showPassord = !showPassord"
                        ></v-text-field>
                    </v-card-text>
                    <v-btn
                        elevation="4"
                        x-large
                        class="primary white--text my-3 mt-0 mb-5"
                        large
                        rounded
                        :loading="loading"
                        v-on:click="signup"
                        >Sign Up</v-btn
                    >
                    <v-spacer></v-spacer>
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

interface Error422 {
    email?: Array<string>;
    name?: Array<string>;
    firstname?: Array<string>;
    password?: Array<string>;
}

interface ErrorState422 {
    email: string;
    name: string;
    firstname: string;
    password: string;
}

export default Vue.extend({
    name: "SignUp",
    methods: {
        signup: async function () {
            this.loading = true;
            try {
                await Api.register({
                    name: this.name,
                    firstname: this.firstname,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation
                });
                this.$router.push({name: "Home"});
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    const errors: Error422 = e.data.errors;
                    this.errors["name"] = errors.name?.[0] ?? "";
                    this.errors["firstname"] = errors.firstname?.[0] ?? "";
                    this.errors["email"] = errors.email?.[0] ?? "";
                    this.errors["password"] = errors.password?.[0] ?? "";
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
            name: "" as string,
            firstname: "" as string,
            email: "" as string,
            password: "" as string,
            passwordConfirmation: "" as string,
            loading: false as boolean,
            showPassord: false as boolean,
            errors: {
                email: "",
                name: "",
                firstname: "",
                password: ""
            } as ErrorState422,
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
