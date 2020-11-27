
<template>
    <v-container class="marginTop">
        <h1>Profile</h1>
        <v-card elevation="4" class="pa-6">
            <div class="account">
                <Profil :user="user" />
            </div>
        </v-card>
        <v-card elevation="4" class="pa-6 mt-12">
            <Group/>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Profil from "@/components/Profil.vue";
import Group from "@/components/Group.vue";
import Api from "@/api/ApiRequester";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { IUser } from "@/models/IUser";

export default Vue.extend({
    name: "Account",
    components: { Profil,Group },
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