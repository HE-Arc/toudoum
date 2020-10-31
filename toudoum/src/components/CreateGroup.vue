<!-- TEMPLATE -->
<template>
    <v-card elevation="4" class="pa-md-4 mx-lg-auto">
        <v-row> <v-text-field label="Group name" :value="groupName"></v-text-field></v-row>
        <v-row>
            <v-autocomplete
                chips
                clearable
                deletable-chips
                multiple
                :items="usersNames"
            ></v-autocomplete
        ></v-row>
        <v-row > <v-btn color="primary" v-on:click="save">Save</v-btn> </v-row>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { ITask } from "@/models/ITask";
import { IUser } from "@/models/IUser";

export default Vue.extend({
    created() {
        this.getUsersNames();
    },

    // props: {
    //     tasks: Object as () => Array<ITask>
    // },
    data() {
        return {
            settings: [],

            //TODO REPLACE BY GROUP NAME IF IT S A MODIFICATION
            groupName: "",

            //TODO : REQUEST GET USERS
            users: [
                { id: 1, name: "Doe", firstname: "John", email: "john.doe@a.com" },
                { id: 2, name: "Fridez", firstname: "Lucas" },
                { id: 3, name: "Ferreira", firstname: "Julien" },
                { id: 4, name: "Goffinet", firstname: "Edouard" }
            ] as Array<IUser>,
            usersNames: Array<string>()
        };
    },

    methods: {
        getUsersNames: function () {
            for (let i = 0; i < this.users.length; i++) {
                this.usersNames[i] = this.users[i].name + " " + this.users[i].firstname;
            }
        },
        save: function(){
            console.log("TODO: REQUEST POST TO CREATE OR UPDATE A GROUP");
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
