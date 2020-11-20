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
                <v-row> <v-text-field label="Group name" v-model="groupName"></v-text-field></v-row>
                <v-row>
                    <v-autocomplete
                        chips
                        clearable
                        deletable-chips
                        multiple
                        :items="usersNames"
                        v-model="usersSelected"
                    ></v-autocomplete
                ></v-row>
                <v-row> <v-btn color="primary" v-on:click="save">Save</v-btn> </v-row>
            </v-card>
        </v-dialog>
        <v-list flat subheader three-line>
            <v-subheader>Groups</v-subheader>
            <v-list-item-group>
                <v-list-item v-for="group in this.groups" v-bind:key="group.id">
                    {{ group.name }}
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { IUser } from "@/models/IUser";
import { IGroup } from "@/models/IGroup";
import Api from "@/api/ApiRequester";

export default Vue.extend({
    async created() {
        this.groups = await Api.get<IGroup[]>("groups?by_token=true");
        this.users = await Api.get<IUser[]>("users");
        this.users.forEach((u: IUser) => {
            this.usersNames.push(u.name + " " + u.firstname);
        });
    },

    data() {
        return {
            settings: [],
            dialog: false,
            groups: {} as IGroup[],

            groupName: "",

            users: {} as IUser[],
            usersNames: [] as string[],
            usersSelected: []
        };
    },

    methods: {
        save: function () {
            const usersIdSelected: number[] = []
            this.users.forEach((u: IUser) => {
                this.usersSelected.forEach(uSelected => {
                    if(uSelected == u.name + " " + u.firstname){
                        usersIdSelected.push(u.id);
                    }
                });
                
            });

            console.table(usersIdSelected);
            Api.post("groups", {
                name: this.groupName,
                users: usersIdSelected
            });

            this.dialog = false;
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
