
<template>
    <div class="account">
        <img alt="Vue logo" src="../assets/logo.png" />
        <p>Account page !</p>
        <Profil :user="user"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profil from "@/components/Profil.vue";
import Api from "@/api/ApiRequester";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { IUser } from '@/models/IUser';

export default Vue.extend({ 
    name: "Account",
    components: {Profil},
    async created(){
        this.user = (await Api.get<IUser[]>("users?by_token=true"))[0];
    },
    data(){
        return{
            user: {} as IUser,
        }
    }
});
</script>
