<!-- TEMPLATE -->
<template>
    <v-list-item>
        <v-list-item-avatar>
            <Avatar
                :imgUrl="imgUrl"
                :fullname="username"
            />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-text="username"></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Avatar from "./Avatar.vue";

export default Vue.extend({
    components: {
        Avatar,
    },

    props: {
        username: String,
        imgUrl: String
    }
});
</script>
