<!-- TEMPLATE -->
<template>
    <div>
        <h3>Profil</h3>
        <v-row>
            <v-col>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="user.firstname"
                        label="Firstname"
                        :rules="[rules.required]"
                        required
                    />
                    <v-text-field
                        v-model="user.name"
                        label="Name"
                        :rules="[rules.required]"
                        required
                    />
                    <v-text-field
                        v-model="user.email"
                        label="E-mail"
                        :rules="[rules.required, rules.email]"
                        required
                    />
                    <v-text-field
                        id="pass"
                        v-model="user.password"
                        label="Password"
                        type="password"
                        :rules="[rules.required, rules.min]"
                        required
                    />
                    <v-text-field
                        v-model="user.password_confirmation"
                        label="Password confirmation"
                        type="password"
                        :rules="[rules.required, rules.min, rules.password_conf]"
                        required
                    />

                    <v-btn @click="validate" :disabled="!valid">Sauvegarder</v-btn>
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

                    <clipper-fixed ref="clipper" :src="url" />

                    <v-btn @click="sendPicture">Envoyer</v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue";
import VueRx from "vue-rx";
Vue.use(VueRx);
import Api from "@/api/ApiRequester";
import { IUser } from "@/models/IUser";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { ToudoumError } from "@/api/ToudoumError";
import { FunctionalComponentOptions } from "vue/types/umd";
import { clipperFixed } from "vuejs-clipper";

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

export default (Vue as VueConstructor<
    Vue & {
        $refs: {
            clipper: {
                clip: Function;
            };
        };
    }
>).extend({
    components: {
        clipperFixed
    },

    async created() {
        Api.get<IUser[]>("users?by_token=true").then((u: IUser[]) => {
            const userReceived: IUser = u[0];
            userReceived.password = "";
            userReceived.password_confirmation = "";
            this.user = userReceived;
        });
    },
    data() {
        return {
            img_type: "",
            url: "",
            user: {
                firstname: "",
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            } as IUser,
            labels: { submit: "Validate", cancel: "Dismiss" },
            valid: false,
            rules: {
                required: (value: string) => !!value || "Required",
                email: (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
                min: (v: string) => v.length >= 6 || "Minimum 6 characters",
                password_conf: (value: string) => {
                    const pass = document.getElementById("pass") as HTMLInputElement;
                    if (pass != null) {
                        return (
                            value == pass.value ||
                            "Password and password confirmation must be identics"
                        );
                    } else {
                        return false;
                    }
                }
            }
        };
    },
    methods: {
        validate: async function () {
            try {
                await Api.patch("/users", {
                    name: this.user.name,
                    firstname: this.user.firstname,
                    email: this.user.email,
                    password: this.user.password,
                    password_confirmation: this.user.password_confirmation
                });
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    const errors: Error422 = e.data.errors;
                } else if (e instanceof ToudoumError) {
                    console.log(e.message); // Error (401, 404 or 500,...)
                }
            }
        },
        onChange: function (e: any) {
            this.url = URL.createObjectURL(e);
            this.img_type = e.name.split('.').pop();
        },
        async sendPicture()  {

            try {
                const canvas = this.$refs.clipper.clip();
                 canvas.toBlob(async (blob: any) => {
                    const image: File = new File([blob], "fileName."+this.img_type, { type: "image/"+this.img_type });
                     const formData: FormData = new FormData();
                    formData.append("avatar", image, "avatar."+this.img_type);
                    await Api.formData("/avatar", formData);
                    this.success();
                }, "image/"+this.img_type);

               
            } catch (e) {
                if (e instanceof ToudoumError422) {
                    const errors: Error422 = e.data.errors;
                } else if (e instanceof ToudoumError) {
                    console.log(e.message); // Error (401, 404 or 500,...)
                }
            }
        },
        success: function() {
            this.$typedStore.actions.updateUserAvatar();
        }
    }
});
</script>
