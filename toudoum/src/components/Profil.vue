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
                            @click:append="showPassord = !showPassord"
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
            <v-file-input
            id="pick-image"
            accept="images/*"
            label="Profile's picture"
            @change="onChange"
            />

            <clipper-fixed ref="clipper" :src="url"/>
            <button @click="clip" class="btn">clip image</button>
            
            <v-btn @click="sendPicture">Envoyer</v-btn>
        </div>
        </v-col>
        </v-row>
    </div>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import VueRx from 'vue-rx'
Vue.use(VueRx)
import Api from "@/api/ApiRequester";
import { IUser } from '@/models/IUser';
import { ToudoumError422 } from '@/api/ToudoumError422';
import { ToudoumError } from '@/api/ToudoumError';
import { FunctionalComponentOptions } from "vue/types/umd";
import VuejsClipper from 'vuejs-clipper'
import { clipperFixed, clipperPreview } from 'vuejs-clipper'

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
    components: {
        clipperFixed 
        },
    props: {
        user: {} as () =>  IUser
    },
    data() {
        return {
            url : "",
            file : File,
            labels: {submit: "Valider", cancel: "Annuler"},
            valid : false,
            rules: {
                required: (value: string) => !!value || "Required",
                email: (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },

                min: (value: string) => !!value || value.length >= 6 || "Minimum 6 characters",
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
        clip: function(e)
        {
            console.log(e)
        },
        onChange: function(e: File)
        {
            this.file = e
            this.url = URL.createObjectURL(this.file)
        },
        sendPicture: async function(){
            const camelCase = "lol.png"

            try {
                const canvas = this.$refs.clipper.clip()
                canvas.toBlob((blob) => {
                this.file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
                }, 'image/jpeg');
                console.log(canvas)
                const formData: FormData = new FormData()
                formData.append('avatar', canvas(), "lol.png")
                await Api.formData("/avatar", formData);
                this.succes()
                
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
