<!-- TEMPLATE -->
<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-img :alt="`${username} avatar`" :src="imgUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-text="username"></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import router from "../router";

export default Vue.extend({
    props: {
        username: String,
        imgUrl: String
    }
});
</script>

<!--CSS-->
<style scoped>
.all-width {
    flex: 2;
}
</style>
