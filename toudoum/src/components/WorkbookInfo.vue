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
                    v-for="chat in recent"
                    :key="chat.title"
                    :username="chat.title"
                    :imgUrl="chat.avatar"
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

export default Vue.extend({
    components: { UserListItem },
    props: {
        workbookId: Number
    },
    data: () => ({
        recent: [
            {
                active: true,
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                title: "Jason Oner"
            },
            {
                active: true,
                avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                title: "Mike Carlson"
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                title: "Cindy Baker"
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors"
            }
        ]
    })
});
</script>
