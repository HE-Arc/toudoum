<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4">
        <v-card-title class="white--text">Workbook information</v-card-title>

        <v-card-text>
            <v-list subheader class="background-primary">
                <v-subheader>Author</v-subheader>
                <UserListItem
                    username="Julien Dos Santos Ferreira"
                    imgUrl="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                />
            </v-list>
            <v-divider></v-divider>
            <v-list subheader class="background-primary">
                <v-subheader>Members</v-subheader>
                <UserListItem
                    v-for="(member, index) in members"
                    :key="index"
                    :username="member.title"
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
import router from "../router";
import Api from "@/api/ApiRequester";
import { IUser } from "../models/IUser";


export default Vue.extend({
    components: { UserListItem },
    props: {
        workbookId: Number,
        groupId: Number,
    },

    async created() {
        console.log(this.groupId);
        Api.get<IUser[]>("users?group_id=" + this.groupId.toString()).then((users: IUser[]) => {
            users.forEach((u: IUser) => {
                this.members.push({ title: u.name+" "+u.firstname, avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light" });
            });
        });
    },
    data: () => ({
        members: []
    })
});
</script>

<!--CSS-->
<style scoped>
.all-width {
    flex: 2;
}
</style>
