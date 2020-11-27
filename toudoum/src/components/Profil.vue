<!-- TEMPLATE -->
<template>
    <div>
        <h3>Profil</h3>
        <v-row>
        <v-col>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="user.firstname"
                label="Firstname"
                :rules="[rules.required]"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="user.name"
                label="Name"
                :rules="[rules.required]"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="user.email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                :rules="[rules.required, rules.min, rules.password]"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="user.password_confirmation"
                label="Password confirmation"
                type="password"
                :rules="[rules.required, rules.min, rules.password_conf]"
                required
            >
            </v-text-field>
            <v-btn 
                @click="validate"
                :disabled="!valid"
            >
                Modifier et sauvegarder
            </v-btn>
        </v-form>
        </v-col>
        <v-col>
        <div>
            <v-img
                v:if="url" :src="url"
            ></v-img>
            <v-file-input
            accept="images/*"
            label="Profile's picture"
            @change="onFileChange"
            >
            </v-file-input>
            <v-btn
            @click="sendPicture"
            >
                Envoyer
            </v-btn>
        </div>
        </v-col>
        </v-row>
    </div>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { IUser } from '@/models/IUser';
import { ToudoumError422 } from '@/api/ToudoumError422';
import { ToudoumError } from '@/api/ToudoumError';

interface Error422 {
    email?: Array<string>;
    name?: Array<string>;
    firstname?: Array<string>;
    password?: Array<string>;
    password_confirmation?: Array<string>;
}

interface ErrorState422 {
    email: string;
    name: string;
    firstname: string;
    password: string;
}
export default Vue.extend({
    props: {
        user: {} as () =>  IUser
    },
    data() {
        return {
            url : "",
            file : File,
            valid : false,
            rules: {
                required: (value: string) => !!value || "Required",
                min: (v: string) => v.length >= 6 || "Minimum 6 characters",
                email: (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
                password: (value: string) => {value == this.user.password_confirmation || "Password and password confirmation must be identics"},
                password_conf: (value: string) => value == this.user.password || "Password and password confirmation must be identics"

            }
        };
    },
    methods: {
        validate: async function(){
            try {
                await Api.patch("/users",{
                    name: this.user.name,
                    firstname: this.user.firstname,
                    email: this.user.email,
                    password: this.user.password,
                    password_confirmation: this.user.password_confirmation
                });
                this.succes()
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    const errors: Error422 = e.data.errors;
                } else if (e instanceof ToudoumError) {
                    console.log(e.message); // Error (401, 404 or 500,...)
                }
            }
        },
        onFileChange: function(e : File)
        {
            this.file = e;
            console.log(e)
            this.url = URL.createObjectURL(e)
        },
        sendPicture: async function(){
            try {

                if(this.file != null)
                {
                let formData : FormData = new FormData()
                formData.append('avatar', this.file)
                await Api.formData("/avatar", formData);
                this.succes()
                }
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    const errors: Error422 = e.data.errors;
                } else if (e instanceof ToudoumError) {
                    console.log(e.message); // Error (401, 404 or 500,...)
                }
            }
        },
        succes: function()
        {
            alert("Modification sauvegardé")
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
