<!-- TEMPLATE -->
<template>
    <v-container>
        <Modal
            title="Group"
            :onButtonClick="save"
            :onCloseClick="() => (this.isModalOpen = false)"
            :edit="false"
            :opened="isModalOpen"
        >
            <v-text-field label="Group name" v-model="groupName"></v-text-field>
            <v-autocomplete
                chips
                clearable
                deletable-chips
                multiple
                :items="usersNames"
                v-model="usersSelected"
            ></v-autocomplete>
        </Modal>

        <v-list flat subheader three-line>
            <v-btn color="primary" dark absolute top right fab @click="() => (isModalOpen = true)">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-list-item-group>
                <v-row class="d-flex">
                    <v-col
                        sm="12"
                        md="6"
                        lg="4"
                        xl="3"
                        v-for="group in this.groups"
                        v-bind:key="group.id"
                    >
                        <GroupItem
                            :title="group.name"
                            @click="clickOnGroup(group.id + '', group.name)"
                            :numberUsers="14"
                        ></GroupItem>
                    </v-col>
                </v-row>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { IUser } from "@/models/IUser";
import { IGroup } from "@/models/IGroup";
import Modal from "@/components/Modal.vue";
import GroupItem from "@/components/GroupItem.vue";
import Api from "@/api/ApiRequester";

export default Vue.extend({
    components: { Modal, GroupItem },
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
            isModalOpen: false,
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
            this.isModalOpen = true;
            this.groupName = name;
            this.groupId = id;
            this.usersSelected = [];
            Api.get<IUser[]>("users?group_id=" + this.groupId).then((usersAlredySelected) => {
                usersAlredySelected.forEach((u) => {
                    this.usersSelected.push(u.name + " " + u.firstname);
                });
            });
        },

        save: async function () {
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
            this.groups = await Api.get<IGroup[]>("groups?by_token=true");
            this.isModalOpen = false;
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
