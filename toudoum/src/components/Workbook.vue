<!-- TEMPLATE -->
<template>
    <v-card class="primary" elevation="4" v-on:click="goToTask(id)">
        <v-card-title class="white--text">{{ title }}</v-card-title>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <Avatar
                    :imgUrl="authorAvatar"
                    :fullname="authorName"
                    />
                </v-list-item-avatar>

                <v-list-item-content class="all-width">
                    <v-list-item-title class="white--text">{{ this.authorName }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                    <v-icon class="mr-1"> mdi-file-tree </v-icon>
                    <span class="subheading">{{ this.nbTasks }}</span>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import router from "../router";
import Avatar from "./Avatar.vue";

export default Vue.extend({
    components: {
        Avatar,
    },

    props: {
        title: String,
        id: String,
        authorName: String,
        authorAvatar: String,
        nbTasks: Number
    },
    data() {
        return {
            settings: []
        };
    },

    methods: {
        goToTask: function (id: string) {
            router.push({ name: "Tasks", params: { workbook_id: id } });
        }
    }
});
</script>

<!--CSS-->
<style scoped>
.all-width {
    flex: 2;
}
</style>
