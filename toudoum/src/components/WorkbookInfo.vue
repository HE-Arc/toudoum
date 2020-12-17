<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4">
            <Modal
            title="Delete the workbook ?"
            :edit="false"
            :onButtonClick="save"
            :onCloseClick="() => (this.isModalOpen = false)"
            :opened="isModalOpen"
            :del="true"
            >
            </Modal>
        <v-card-title class="white--text">Workbook information</v-card-title>

        <v-card-text>
            <v-list subheader class="background-primary">
                <v-subheader>Author</v-subheader>
                <UserListItem :username="author.name" :imgUrl="author.avatar" />
            </v-list>
            <v-divider></v-divider>
            <v-list subheader class="background-primary">
                <v-subheader>Members</v-subheader>
                <UserListItem
                    v-for="(member, index) in members"
                    :key="index"
                    :username="member.name"
                    :imgUrl="member.avatar"
                />
            </v-list>
        </v-card-text>
        <v-btn color="primary" dark absolute top right fab @click="openModal">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import UserListItem from "@/components/UserListItem.vue";
import Api from "@/api/ApiRequester";
import { IUser } from "../models/IUser";
import { IMember } from "../models/IMember";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
    components: { UserListItem, Modal },
    props: {
        workbookId: Number,
        groupId: Number,
        userId: Number
    },

    async created() {
        Api.get<IUser[]>("users?group_id=" + this.groupId.toString()).then((users: IUser[]) => {
            users.forEach((u: IUser) => {

                this.members.push({
                    name: u.name + " " + u.firstname,
                    avatar:u.avatar
                });

                if (u.id == this.userId) {
                    this.author = {
                        name: u.name + " " + u.firstname,
                        avatar:u.avatar
                    };
                }
            });
        });
    },
    data: () => ({
        members: [] as IMember[],
        author: {} as IMember,
        isModalOpen: false
    }),
    methods:{
        openModal() {
            this.isModalOpen = true;
        },
        save: async function () {
            await Api.delete("workbooks/"+this.workbookId);
            this.isModalOpen = false;
            this.$emit("reload");
        }
    }
});
</script>
