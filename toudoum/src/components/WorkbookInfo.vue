<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4">
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
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import UserListItem from "@/components/UserListItem.vue";
import Api from "@/api/ApiRequester";
import { IUser } from "../models/IUser";
import { IMember } from "../models/IMember";

export default Vue.extend({
    components: { UserListItem },
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
        author: {} as IMember
    })
});
</script>
