
<template>
    <v-container class="marginTop">
        <div class="account">
            <Profil :user="user" />
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
    async created() {
        this.user = (await Api.get<IUser[]>("users?by_token=true"))[0];
    },
    data() {
        return {
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