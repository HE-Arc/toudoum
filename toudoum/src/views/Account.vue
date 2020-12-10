
<template>
    <v-container class="marginTop">

        <h1>Profile</h1>
        <v-card elevation="4" class="pa-3">
            <div class="account">
                <Profil/>
            </div>
        </v-card>
        <h2 class="h5 mt-4">My groups</h2>
        <v-card elevation="4" class="pa-3 mt-4">
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