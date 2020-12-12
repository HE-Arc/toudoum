<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4" @click="$emit('click')">
        <v-card-title class="white--text">{{title}}</v-card-title>
            <v-card-text>
                <v-icon class="mr-1"> mdi-account-multiple </v-icon>
                <span v-if="numberUsers != 0"  class="subheading">{{numberUsers}}</span>
            </v-card-text>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { IUser } from "@/models/IUser";

export default Vue.extend({

    async created() {
        this.users = await Api.get<IUser[]>("users?group_id=" + this.groupId);
        this.numberUsers = this.users.length;
    },
    props: {
        title: String,
        groupId: Number,
        
    },
    data() {
        return {
        numberUsers: 0,
        users : {} as IUser[],
        }
    }
    
});
</script>