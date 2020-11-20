<!-- TEMPLATE -->
<template>
    <v-container>
        <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark absolute top right fab v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
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
                <v-row> <v-btn color="primary" v-on:click="save">Save</v-btn> </v-row>
            </v-card>
        </v-dialog>
        <v-list flat subheader three-line>
            <v-subheader>Groups</v-subheader>
            <v-list-item-group>
                <v-list-item v-for="group in this.groups" v-bind:key="group.id"> 
                {{group.name}}
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { ITask } from "@/models/ITask";
import { IUser } from "@/models/IUser";
import { IGroup } from "@/models/IGroup";
import Api from "@/api/ApiRequester";

export default Vue.extend({
    async created() {
        this.groups = await Api.get<IGroup[]>("groups?by_token=true");
        this.users = await Api.get<IUser[]>("users");
        this.users.forEach((u) => {
            this.usersNames.push(u.name +" "+ u.firstname);
        });
    },

    data() {
        return {
            settings: [],
            dialog: false,
            groups: {} as IGroup[],

            //TODO REPLACE BY GROUP NAME IF IT S A MODIFICATION
            groupName: "",

            users: {} as IUser[],
            usersNames:[]
        };
    },

    methods: {
        save: function () {
            console.log("TODO: REQUEST POST TO CREATE OR UPDATE A GROUP");
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
