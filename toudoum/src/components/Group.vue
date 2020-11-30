<!-- TEMPLATE -->
<template>
    <v-container>
        <v-dialog v-model="dialog" max-width="400px">
            <v-card elevation="4" class="mx-lg-auto">
                <v-card-title class="headline grey lighten-2">Group</v-card-title>
                <v-card-text>
                    <v-text-field label="Group name" v-model="groupName"></v-text-field>

                    <v-autocomplete
                        chips
                        clearable
                        deletable-chips
                        multiple
                        :items="usersNames"
                        v-model="usersSelected"
                    ></v-autocomplete>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" v-on:click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-list flat subheader three-line>
            <v-subheader>Groups</v-subheader>
            <v-list-item-group>
                <v-list-item
                    v-for="group in this.groups"
                    v-bind:key="group.id"
                    v-on:click="clickOnGroup(group.id + '', group.name)"
                >
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
            if (u.id != this.$typedStore.getters.userId) {
                this.usersNames.push(u.name + " " + u.firstname);
            }
        });
    },

    data() {
        return {
            settings: [],
            dialog: false,
            groups: {} as IGroup[],

            groupName: "",
            groupId: "",

            users: {} as IUser[],
            usersNames: [] as string[],
            usersSelected: [] as string[]
        };
    },

    methods: {
        add: function () {
            this.groupName = "";
            this.groupId = "";
            this.usersSelected = [];
        },
        clickOnGroup: function (id: string, name: string) {
            this.dialog = true;
            this.groupName = name;
            this.groupId = id;
            this.usersSelected = [];
            Api.get<IUser[]>("users?group_id=" + this.groupId).then((usersAlredySelected) => {
                usersAlredySelected.forEach((u) => {
                    this.usersSelected.push(u.name + " " + u.firstname);
                });
            });
        },

        save: function () {
            const usersIdSelected: number[] = [];
            this.users.forEach((u: IUser) => {
                this.usersSelected.forEach((uSelected) => {
                    if (uSelected == u.name + " " + u.firstname) {
                        usersIdSelected.push(u.id);
                    }
                });
            });
            usersIdSelected.push(this.$typedStore.getters.userId);
            if (this.groupId == "") {
                Api.post("groups", {
                    name: this.groupName,
                    users: usersIdSelected
                });
            } else {
                Api.patch("groups/" + this.groupId, {
                    name: this.groupName,
                    users: usersIdSelected
                });
            }
            this.dialog = false;
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
