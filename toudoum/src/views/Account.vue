
<template>
    <v-container class="marginTop">
        <div class="account">
            <Profil :v-if="loaded" :user="user" />
        </div>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Profil from "@/components/Profil.vue";   
import Api from "@/api/ApiRequester";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { IUser } from "@/models/IUser";

export default Vue.extend({
    name: "Account",
    components: { Profil },
    created() {
        (Api.get<IUser[]>("users?by_token=true")).then((u: IUser[]) => {
            this.user = u[0];
            this.user.password = ""
            this.user.password_confirmation = ""
            console.log(this.user)
            this.loaded = true;
        });
    },
    data() {
        return {
            loaded: null,
            user: {} as IUser
        };
    }
});
</script>

<style>
.marginTop {
    margin-top: 72px;
}
</style>